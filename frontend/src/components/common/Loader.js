import React from 'react';
import * as Semantic from 'semantic-ui-react';

const Loader = props => {
  const { loading, text } = props;
  
  return (
    <Semantic.Dimmer inverted active={loading}>
      <Semantic.Loader inverted>{text}...</Semantic.Loader>
    </Semantic.Dimmer>
  );
}

export default Loader;
