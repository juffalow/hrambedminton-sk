import React, { Suspense } from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loader = () => (
  <div style={{ position: 'absolute', top: '40%', width: '100%', textAlign: 'center' }}>
    <Spinner animation="border" />
  </div>
);

function getLazyComponent(dynamicImportCallback: any) {
  const LazyComponent = React.lazy(dynamicImportCallback);

  return (props: any) => (
    <Suspense fallback={<Loader />}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

export default getLazyComponent;
