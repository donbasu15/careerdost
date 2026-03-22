"use client";

import { useState } from "react";
import { createJob } from "@/app/actions/jobActions";
import Link from "next/link";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all"
    >
      {pending ? "Publishing Job..." : "Publish Job Post"}
    </button>
  );
}

export default function NewJobPage() {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
        <h1 className="text-2xl font-bold text-slate-900">Post a New Job</h1>
        <Link href="/admin" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
          Cancel & Return
        </Link>
      </div>

      <form action={createJob} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Job Title</label>
            <input required name="title" type="text" placeholder="e.g. SSC CGL 2026" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Organization</label>
            <input required name="organization" type="text" placeholder="e.g. Staff Selection Commission" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
            <select required name="category" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-900">
              <option value="Govt">Government</option>
              <option value="Private">Private</option>
              <option value="PSU">PSU</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Start Date</label>
            <input required name="startDate" type="date" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">End Date</label>
            <input required name="endDate" type="date" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Apply Link (External URL)</label>
          <input required name="applyLink" type="url" placeholder="https://ssc.nic.in/apply" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" />
        </div>

        <div className="space-y-6 pt-4 border-t border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Job Details (Markdown Supported)</h3>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Eligibility Criteria</label>
            <textarea required name="eligibility" rows={3} placeholder="Requirements..." className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm text-slate-900"></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Selection Process</label>
            <textarea required name="selectionProcess" rows={3} placeholder="Tier 1, Tier 2 exams..." className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm text-slate-900"></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">How to Apply</label>
            <textarea required name="howToApply" rows={3} placeholder="Step by step guide..." className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm text-slate-900"></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Detailed Notification / Description</label>
            <textarea required name="description" rows={6} placeholder="Full job description using markdown formatting headers, bold, bullet points..." className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm text-slate-900"></textarea>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
