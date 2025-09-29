import React from 'react';
import Link from 'next/link';
import { Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-400 border-t border-[#8B5CF6]/30 relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-lg font-bold text-white">Edunexi</p>
            <p className="text-sm">&copy; {currentYear} Edunexi. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">
              <Twitter size={24} />
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              <Linkedin size={24} />
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              <Github size={24} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;