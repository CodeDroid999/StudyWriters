// SideNav.js

import React from 'react';

const SideNav = () => {
  return (
    <div className="flex flex-col sidenav">
      <div className="p-2 flex items-center">
        <link href="/help" className="text-blue-400 text-left whitespace-nowrap">Help</link>
      </div>
      <div className="p-2 flex items-center">
        <link href="/about" className="text-blue-400 text-left whitespace-nowrap">About</link>
      </div>
      <div className="p-2 flex items-center">
        <link href="/privacy" className="text-blue-400 text-left whitespace-nowrap">Privacy</link>
      </div>
      <div className="p-2 flex items-center">
        <link href="/terms" className="text-blue-400 text-left whitespace-nowrap">Terms</link>
      </div>
      <div className="p-2 flex items-center">
        <link href="/refund" className="text-blue-400 text-left whitespace-nowrap">Refund</link>
      </div>
      <div className="p-2 flex items-center">
        <link href="/refer-a-friend" className="text-blue-400 text-left whitespace-nowrap">Refer a Friend</link>
      </div>
      <div className="p-2 flex items-center">
        <link href="/blog" className="text-blue-400 text-left whitespace-nowrap">Blog</link>
      </div>
      <div className="p-2 flex items-center">
        <link href="/how-it-works" className="text-blue-400 text-left whitespace-nowrap">How It Works</link>
      </div>
      <div className="p-2 flex items-center">
        <link href="/contact-us" className="text-blue-400 text-left whitespace-nowrap">Contact Us</link>
      </div>
    </div>
  );
};

export default SideNav;
