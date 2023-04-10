import React from "react";
import './Header.less';

import Search from '../search/Search';


const Header = () => {

  return (
    <div className="main-header-container">
      <Search />
    </div>
  );
}

export default Header;