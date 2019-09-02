import React from 'react';

const Redirect: React.FC = (props: any) => {
  // console.log(props.history)

  props.history.goBack();

  return <></>;
};

export default Redirect;
