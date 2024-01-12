import Link from 'next/link';
import React from 'react';

const SideNav = () => {
    return (
        <div className="hidden mx-auto md:block bg-white ">
            <div className="p-2 flex font-bold items-center w-full border border-green-700">
                <Link href="/admin/manage-applications" className="text-blue-800 text-right whitespace-nowrap">Applications</Link>
            </div>
            <div className="p-2 flex font-bold items-center w-full border border-green-700">
                <Link href="/admin/manage-users" className="text-blue-800 text-right whitespace-nowrap">My Users</Link>
            </div>
            <div className="p-2 flex font-bold items-center w-full border border-green-700">
                <Link href="/admin/manage-assignments" className="text-blue-800 text-right whitespace-nowrap">Assignments</Link>
            </div>
            <div className="p-2 flex font-bold items-center w-full border border-green-700">
                <Link href="/privacy" className="text-blue-800 text-right whitespace-nowrap">Messages</Link>
            </div>
            <div className="p-2 flex font-bold items-center w-full border border-green-700">
                <Link href="/terms" className="text-blue-800 text-right whitespace-nowrap">Support</Link>
            </div>
            <div className="p-2 flex font-bold items-center w-full border border-green-700">
                <Link href="/refund" className="text-blue-800 text-right whitespace-nowrap">Suspensions</Link>
            </div>
            <div className="p-2 flex font-bold items-center w-full border border-green-700">
                <Link href="/refer-a-friend" className="text-blue-800 text-right whitespace-nowrap">Chat</Link>
            </div>
            <div className="p-2 flex font-bold items-center w-full border border-green-700">
                <Link href="/blog" className="text-blue-800 text-right whitespace-nowrap">Blog</Link>
            </div>
            <div className="p-2 flex font-bold items-center w-full border border-green-700">
                <Link href="/how-it-works" className="text-blue-800 text-right whitespace-nowrap">Accounts</Link>
            </div>
            <div className="p-2 flex font-bold items-center w-full border border-green-700">
                <Link href="/contact-us" className="text-blue-800 text-right whitespace-nowrap">Contact Us Forms</Link>
            </div>
        </div>
    );
};

export default SideNav;
