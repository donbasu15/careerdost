"use client";

import { createScholarship } from "@/app/actions/scholarshipActions";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import RichTextEditor from "@/components/RichTextEditor";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all"
    >
      {pending ? "Publishing Scholarship..." : "Publish Scholarship"}
    </button>
  );
}

export default function NewScholarshipPage() {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 border-t-4 border-t-green-500 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
        <h1 className="text-2xl font-bold text-slate-900">Post a New Scholarship</h1>
        <Link href="/admin?tab=scholarships" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
          Cancel & Return
        </Link>
      </div>

      <form action={createScholarship} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Scholarship Title</label>
            <input required name="title" type="text" placeholder="e.g. Merit Scholarship 2026" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Provider Organization</label>
            <input required name="provider" type="text" placeholder="e.g. Ministry of Education" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-slate-900" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
            <select required name="category" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white text-slate-900">
              <option value="Merit">Merit-based</option>
              <option value="Need">Need-based</option>
              <option value="Minority">Minority</option>
              <option value="International">International</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Amount</label>
            <input required name="amount" type="text" placeholder="e.g. $5,000 or Full Tuition" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Start Date</label>
            <input required name="startDate" type="date" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Deadline Date</label>
            <input required name="deadline" type="date" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-slate-900" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Apply Link (External URL)</label>
          <input required name="applyLink" type="url" placeholder="https://scholarships.gov.in" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-slate-900" />
        </div>

        <div className="space-y-6 pt-4 border-t border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Scholarship Details</h3>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">About the Scholarship</label>
            <RichTextEditor name="description" placeholder="Full description with formatting..." />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Eligibility Criteria</label>
            <RichTextEditor name="eligibilityCriteria" placeholder="Requirements to apply..." />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Benefits</label>
            <RichTextEditor name="benefits" placeholder="What the scholarship covers..." />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">How to Apply</label>
            <RichTextEditor name="howToApply" placeholder="Step by step guide..." />
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
