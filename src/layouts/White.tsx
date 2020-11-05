import React from 'react';


type Props = {
  children: React.ReactNode,
}

const White: React.FC<Props> = props => {
  return (
    <div>
      {props.children}
    </div>
  );
}

export default White;
