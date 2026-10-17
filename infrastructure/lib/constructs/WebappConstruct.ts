import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cdk from 'aws-cdk-lib';
import { Validations } from 'aws-cdk-lib';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { getSuffix } from '../utils';

interface WebAppConstructProps {
  stage?: string;
  certificate?: acm.ICertificate;
}

export class WebappConstruct extends Construct {
  public readonly bucket: s3.Bucket;
  public readonly distribution: cloudfront.Distribution;

  constructor(scope: Construct, id: string, props: WebAppConstructProps) {
    super(scope, id);

    const isProduction = props.stage === 'production';

    if (isProduction && !props.certificate) {
      throw new Error('WebAppConstruct requires a certificate when stage is production');
    }

    this.bucket = new s3.Bucket(this, 'PTLWebAppBucket', {
      bucketName: `hb-webapp-${getSuffix(this)}`,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
      // Deny requests that do not use HTTPS
      enforceSSL: true,
    });

    this.distribution = new cloudfront.Distribution(this, 'PTLWebAppDistribution', {
      httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(this.bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD_OPTIONS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        originRequestPolicy: cloudfront.OriginRequestPolicy.CORS_S3_ORIGIN,
      },
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.minutes(5),
        },
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.minutes(5),
        },
      ],
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      comment: `HBWebApp-${getSuffix(this)}`,
      domainNames: isProduction ? ['hrambedminton.sk', 'www.hrambedminton.sk'] : undefined,
      certificate: isProduction ? props.certificate : undefined,
      // Only configurable with a custom certificate, the default *.cloudfront.net certificate allows TLS 1.0+
      minimumProtocolVersion: isProduction ? cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021 : undefined,
    });

    Validations.of(this.bucket).acknowledge({
      id: 'AwsSolutions-S1',
      reason:
        'Deferred: no S3 server access logs yet (cost, and they contain IP addresses). Revisit with CloudFront logs.',
    });
    Validations.of(this.distribution).acknowledge({
      id: 'AwsSolutions-CFR1',
      reason: 'Public website for anyone, no geo restriction needed.',
    });
    Validations.of(this.distribution).acknowledge({
      id: 'AwsSolutions-CFR2',
      reason: 'Deferred: no AWS WAF yet (monthly cost). Static site served from S3, the APIs are throttled separately.',
    });
    Validations.of(this.distribution).acknowledge({
      id: 'AwsSolutions-CFR3',
      reason: 'Deferred: no CloudFront access logs yet (cost, and they contain IP addresses). Revisit with S3 logs.',
    });

    if (!isProduction) {
      Validations.of(this.distribution).acknowledge({
        id: 'AwsSolutions-CFR4',
        reason: 'Non-production uses the default *.cloudfront.net certificate, where the TLS version cannot be set.',
      });
    }

    this.bucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ['s3:GetObject'],
        resources: [this.bucket.arnForObjects('*')],
        principals: [new iam.ServicePrincipal('cloudfront.amazonaws.com')],
        conditions: {
          StringEquals: {
            'AWS:SourceArn': `arn:aws:cloudfront::${cdk.Stack.of(this).account}:distribution/${this.distribution.distributionId}`,
          },
        },
      })
    );
  }
}
