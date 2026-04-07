'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="CareerDost Logo" width={48} height={48} className="h-10 w-auto mix-blend-multiply" />
            <span className="text-xl font-bold tracking-tight text-slate-900">CareerDost</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">Home</Link>
            <Link href="/jobs" className="text-sm font-medium text-slate-600 hover:text-slate-900">All Jobs</Link>
            <Link href="/scholarships" className="text-sm font-medium text-slate-600 hover:text-slate-900">Scholarships</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-slate-100 flex flex-col space-y-4 pb-6">
            <Link 
              href="/" 
              className="text-sm font-medium text-slate-600 hover:text-slate-900 px-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/jobs" 
              className="text-sm font-medium text-slate-600 hover:text-slate-900 px-2"
              onClick={() => setIsMenuOpen(false)}
            >
              All Jobs
            </Link>
            <Link 
              href="/scholarships" 
              className="text-sm font-medium text-slate-600 hover:text-slate-900 px-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Scholarships
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
