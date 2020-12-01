import React from 'react';


type Props = {
  children: React.ReactNode,
}

const DefaultLayout: React.FC<Props> = props => {
  return (
    <div>
      {props.children}
    </div>
  );
}

export default DefaultLayout;
