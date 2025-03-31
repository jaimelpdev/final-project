import Link from "next/link";
import React from 'react';

const Header = () => (
  <div className="header">
    <Link href="/">
      <img className="pageLogo" src="/imgs/logo.webp" alt="Logo" />
    </Link>
    <div className="headerCenter">
      <h1>BYTEMASTERS</h1>
    </div>
    <ul className="menu">
      <li className="categoriesHeader">
        <b>
          <Link href="/general/computers">Computers</Link>
        </b>
      </li>
      <li className="categoriesHeader">
        <b>
          <Link href="/general/notebooks">Notebooks</Link>
        </b>
      </li>
      <li className="categoriesHeader">
        <b>
          <Link href="/general/components">Components</Link>
        </b>
      </li>
    </ul>
  </div>
);

export default Header;
