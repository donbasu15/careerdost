import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | CareerDost",
  description: "Learn more about CareerDost, your trusted portal for the latest government and private job notifications.",
  alternates: {
    canonical: "/about-us",
  },
};

export default function AboutUs() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">About Us</h1>

      <div className="prose prose-slate max-w-none space-y-6">
        <p className="text-md text-slate-700">
          Welcome to <strong className="font-semibold text-blue-600">CareerDost</strong>, your true friend and guide in your career journey. We are dedicated to providing you the very best platform for finding the latest government and private job notifications, results, admit cards, and career guidance.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Our Mission</h2>
        <p className="text-md text-slate-700">
          Our mission is incredibly simple: to bridge the gap between job seekers and their dream careers. We know how tedious it can be to hunt through multiple websites to find authentic job updates. That is why we consolidate verified, real-time job postings into one clean, accessible platform.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">What We Do</h2>
        <ul className="list-disc pl-6 space-y-2 text-md text-slate-700">
          <li><strong>Latest Job Notifications:</strong> We update our platform daily with the newest government (Sarkari) and private sector job opportunities.</li>
          <li><strong>Admit Cards & Results:</strong> Quick links to download your exam admit cards and check your results without the hassle.</li>
          <li><strong>Accuracy & Trust:</strong> We strive to provide 100% verified and authentic information directly from official sources.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Who We Are</h2>
        <p className="text-md text-slate-700">
          Founded by passionate individuals with a vision to empower job seekers, CareerDost aims to be India's most user-friendly and reliable job portal. We are constantly improving our platform to give you a lightning-fast, mobile-friendly experience so you never miss a golden opportunity.
        </p>

        <div className="mt-12 bg-blue-50 border border-blue-100 p-6 rounded-xl">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Have a question?</h3>
          <p className="mb-4 text-slate-600">We are always here to help you. Reach out to us for any queries or feedback!</p>
          <Link href="/contact-us" className="inline-block bg-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
