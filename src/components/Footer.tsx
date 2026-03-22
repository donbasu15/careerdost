export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white py-8 mt-12">
      <div className="container mx-auto px-4 sm:px-6 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} CareerDost. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="#" className="hover:text-slate-900">Privacy Policy</a>
          <a href="#" className="hover:text-slate-900">Terms of Service</a>
          <a href="#" className="hover:text-slate-900">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}
