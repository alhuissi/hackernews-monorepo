import React from 'react';

const Header: React.FC = () => (
  <header className="text-left font-semibold bg-[#2d2d2d] px-6 py-10">
    <h1 className="text-6xl text-white">{'HN Feed'}</h1>
    <p className="text-md text-white">{'We <3 hacker news!'}</p>
  </header>
);

export default Header;