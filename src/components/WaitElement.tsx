import React from 'react';


const rep = (n: number): number[] => Array.from(Array(n), (_, i) => i);

const searchElement = (id: string, limit: number = 10) => {
  if (id === '' || limit <= 0) return;
  const w = document.getElementById('wait');
  const e = document.getElementById(id);
  if (e && w) {
    const wRect = w.getBoundingClientRect();
    const eRect = e.getBoundingClientRect();
    w.scrollBy({
      top: eRect.top - wRect.top,
      left: eRect.left,
      behavior: 'smooth',
    });
    return;
  }
  setTimeout(() => searchElement(id, limit - 1), 100);
}

const WaitElement: React.FC<{}> = props => {
  React.useEffect(() => {
    return searchElement('100');
  });

  return (
    <div id='wait' style={{height: '200px', border: 'solid 1px', overflow: 'scroll'}}>
      {
        rep(150).map((i: number) => (
          <div key={i} id={i.toString()} style={{height: `${i}px`}}>
            Element{i}
          </div>
        ))
      }
    </div>
  );
}

export default WaitElement;
