import React from 'react';


type Props = {
  children: React.ReactNode,
}

const Black: React.FC<Props> = props => {
  return (
    <div style={{backgroundColor: 'black', color: 'white'}}>
      {props.children}
    </div>
  );
}

export default Black;
