import React from 'react';
import { LogOutIcon, LayoutDashboard } from 'lucide-react';

export default function Header() {
    return (
        <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200 font-sans">
            <div className="flex items-center">
                <LayoutDashboard className="w-6 h-6 text-black mr-2" />
                <span className="text-xl font-bold text-black">Admin Dashboard</span>
            </div>
            <div className="flex items-center">
                <button className="flex items-center text-red-600 font-bold text-sm bg-white border border-red-600 px-3 py-2 rounded-md transition-all duration-300 hover:bg-red-600 hover:text-white hover:border-red-800">
                    Logout <LogOutIcon className="w-5 h-5 ml-1" />
                </button>
            </div>
        </header>
    );
}
