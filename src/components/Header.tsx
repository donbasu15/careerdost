import Link from 'next/link';
import { Briefcase } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center flex-wrap justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <Briefcase className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold tracking-tight text-slate-900">CareerDost</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">Home</Link>
          <Link href="/jobs" className="text-sm font-medium text-slate-600 hover:text-slate-900">All Jobs</Link>
          {/* <Link href="/admin" className="text-sm font-medium text-slate-600 hover:text-slate-900">Admin</Link> */}
        </nav>
      </div>
    </header>
  );
}
