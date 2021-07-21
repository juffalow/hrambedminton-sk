import React from 'react';
import { Helmet } from 'react-helmet';

interface Props {
  title: string;
  description: string;
}

const SEO: React.FC<Props> = (props) => (
  <>
    <Helmet>
      {
        props.title.length === 0 ? (
          <title>HramBedminton.sk</title>
        ) : (
          <title>{props.title} | HramBedminton.sk</title>
        )
      }
      <meta name="description" content={props.description} />
    </Helmet>
    {props.children}
  </>
);

export default SEO;
