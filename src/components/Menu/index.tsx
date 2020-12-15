import React from 'react';
import {Link} from 'react-router-dom';

import style from './index.module.scss';


type Props = {
}

const Menu: React.FC<Props> = props => {
  const navItems = [
    <Link to='/'>Settings</Link>,
    <Link to='/'>Logout</Link>,
  ];
  return (
    <nav className={style.container}>
      <h1>NewProject</h1>
      <ul>
        {
          navItems.map((e, i) => (
            <li key={i} className={style.navItem}>{e}</li>
          ))
        }
      </ul>
    </nav>
  );
}

export default Menu;
