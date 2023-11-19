// SideNav.js

import React from 'react';

const SideNav = () => {
  return (
    <div className="flex flex-col sidenav">
      <div className="p-2 flex items-center">
        <a href="/help" className="text-blue-400 text-left whitespace-nowrap">Help</a>
      </div>
      <div className="p-2 flex items-center">
        <a href="/about" className="text-blue-400 text-left whitespace-nowrap">About</a>
      </div>
      <div className="p-2 flex items-center">
        <a href="/privacy" className="text-blue-400 text-left whitespace-nowrap">Privacy</a>
      </div>
      <div className="p-2 flex items-center">
        <a href="/terms" className="text-blue-400 text-left whitespace-nowrap">Terms</a>
      </div>
      <div className="p-2 flex items-center">
        <a href="/refund" className="text-blue-400 text-left whitespace-nowrap">Refund</a>
      </div>
      <div className="p-2 flex items-center">
        <a href="/refer-a-friend" className="text-blue-400 text-left whitespace-nowrap">Refer a Friend</a>
      </div>
      <div className="p-2 flex items-center">
        <a href="/blog" className="text-blue-400 text-left whitespace-nowrap">Blog</a>
      </div>
      <div className="p-2 flex items-center">
        <a href="/how-it-works" className="text-blue-400 text-left whitespace-nowrap">How It Works</a>
      </div>
      <div className="p-2 flex items-center">
        <a href="/contact-us" className="text-blue-400 text-left whitespace-nowrap">Contact Us</a>
      </div>
    </div>
  );
};

export default SideNav;
