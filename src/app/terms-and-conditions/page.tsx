import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | CareerDost",
  description: "Terms and Conditions for CareerDost detailing user agreements and rules for using the platform.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
};

export default function TermsAndConditions() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">Terms and Conditions for CareerDost</h1>

      <div className="prose prose-slate max-w-none space-y-6">
        <p className="text-md text-slate-700">
          Welcome to CareerDost!
        </p>

        <p className="text-md text-slate-700">
          These terms and conditions outline the rules and regulations for the use of CareerDost's Website, located at <a href="https://careerdost.online" className="text-blue-600 hover:underline">https://careerdost.online</a>.
        </p>

        <p className="text-md text-slate-700">
          By accessing this website we assume you accept these terms and conditions. Do not continue to use CareerDost if you do not agree to take all of the terms and conditions stated on this page.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Cookies</h2>
        <p className="text-md text-slate-700">
          We employ the use of cookies. By accessing CareerDost, you agreed to use cookies in agreement with the CareerDost's Privacy Policy.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">License</h2>
        <p className="text-md text-slate-700">
          Unless otherwise stated, CareerDost and/or its licensors own the intellectual property rights for all material on CareerDost. All intellectual property rights are reserved. You may access this from CareerDost for your own personal use subjected to restrictions set in these terms and conditions.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">User Content</h2>
        <p className="text-md text-slate-700">
          Our platform may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for any content that you post to the website. The information regarding jobs and scholarships provided here is for informational purposes only. While we try to provide accurate information, we advise verifying the details on the respective official sources.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Disclaimer</h2>
        <p className="text-md text-slate-700">
          To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. CareerDost shall not be liable for any special or consequential damages that result from the use of, or the inability to use, the materials on this site or the performance of the products, even if CareerDost has been advised of the possibility of such damages.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Changes to Terms</h2>
        <p className="text-md text-slate-700">
          We reserve the right to amend these terms and conditions at any time. By continuing to use CareerDost, you agree to be bound by the updated terms.
        </p>
      </div>
    </div>
  );
}
