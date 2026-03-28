"use client";

import React, { useState } from "react";
import { ChevronDown, Search, HelpCircle, MessageCircle } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    category: "General",
    question: "What is CareerDost?",
    answer: "CareerDost is a comprehensive platform providing the latest updates on government jobs, recruitment notifications, and scholarship opportunities across India.",
  },
  {
    id: 2,
    category: "Jobs",
    question: "How often are job listings updated?",
    answer: "We update our job listings daily. Our team constantly monitors official government gazettes and department websites to ensure you get the most recent 'Sarkari Naukri' alerts.",
  },
  {
    id: 3,
    category: "Scholarships",
    question: "Can I apply for multiple scholarships?",
    answer: "Yes, you can apply for as many scholarships as you are eligible for. However, some providers may have rules against holding two major scholarships simultaneously. Always check the 'Terms of Reference' in the description.",
  },
  {
    id: 4,
    category: "Technical",
    question: "Why can't I see the 'Apply Now' button?",
    answer: "If the 'Apply Now' button is missing, the application window might have closed, or the official link hasn't been released yet. Check the 'Important Dates' section on the job page.",
  },
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openId, setOpenId] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 flex items-center justify-center gap-3">
          <HelpCircle className="w-10 h-10 text-blue-600" />
          Frequently Asked Questions
        </h1>
        <p className="text-slate-600 text-lg">
          Everything you need to know about CareerDost jobs and scholarships.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search for questions..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-blue-200 transition-colors"
            >
              <button
                onClick={() => toggleAccordion(faq.id)}
                className="w-full flex items-center justify-between p-5 text-left transition-colors"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-1 block">
                    {faq.category}
                  </span>
                  <span className="text-lg font-bold text-slate-800">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                    openId === faq.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openId === faq.id ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-5 pt-0 border-t border-slate-50 text-slate-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-500">No matching questions found.</p>
          </div>
        )}
      </div>

      {/* Support Footer */}
      <div className="mt-16 bg-blue-600 rounded-3xl p-8 text-center text-white shadow-xl shadow-blue-100">
        <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-80" />
        <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
        <p className="mb-6 opacity-90">
          Our team is here to help you find your dream career.
        </p>
        <button className="bg-white text-blue-600 font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
}