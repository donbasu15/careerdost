import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | CareerDost",
  description: "Get in touch with CareerDost for any queries regarding job notifications, partnerships, or support.",
  alternates: {
    canonical: "/contact-us",
  },
};

export default function ContactUs() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">Contact Us</h1>

      <div className="prose prose-slate max-w-none space-y-6">
        <p className="text-lg text-slate-700">
          We would love to hear from you! Whether you have a question about a job notification, need help navigating the website, or want to discuss partnership opportunities, feel free to reach out.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Email Us</h3>
            <p className="text-slate-600 mb-4">For general queries, support, or feedback, directly email us at:</p>
            <a href="mailto:hk3101058@gmail.com" className="text-blue-600 font-medium hover:underline flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              hk3101058@gmail.com
            </a>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Follow Us</h3>
            <p className="text-slate-600 mb-4">Stay updated with the latest alerts on our social media channels.</p>
            <div className="flex gap-4">
               {/* Add social links here in the future if applicable */}
               <span className="bg-slate-200 text-slate-600 px-3 py-1 rounded text-sm font-medium" ><a href="https://twitter.com/careerdost26" target="_blank">Twitter</a></span>
               <span className="bg-slate-200 text-slate-600 px-3 py-1 rounded text-sm font-medium"><a href="https://www.facebook.com/profile.php?id=61575428664380" target="_blank">Facebook</a></span>
               <span className="bg-slate-200 text-slate-600 px-3 py-1 rounded text-sm font-medium"><a href="https://t.me/careerdost26" target="_blank">Telegram</a></span>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">General Feedback</h2>
          <p className="text-md text-slate-700">
            We are constantly looking to improve CareerDost. If you have any suggestions, or if you noticed any errors in our job updates, please let us know immediately so we can rectify it.
          </p>
        </div>
      </div>
    </div>
  );
}
