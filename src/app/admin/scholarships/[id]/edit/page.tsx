import prisma from "@/lib/prisma";
import { updateScholarship } from "@/app/actions/scholarshipActions";
import Link from "next/link";
import { notFound } from "next/navigation";
import RichTextEditor from "@/components/RichTextEditor";

// Note: In Next.js App Router, combining 'use client' and server components in the exact same file 
// this way via SubmitButton inside a server component works because SubmitButton theoretically could be 
// extracted, though usually we extract client components.
// I will create an inline SubmitButton (but since page.tsx is a Server Component, useFormStatus must be in a Client Component).
// Actually, earlier I used SubmitButton in a "use client" page. But Edit Job Page is Server Component.
// Let's use a standard button without useFormStatus for simplicity here, or extract SubmitButton.

export default async function EditScholarshipPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const scholarship = await prisma.scholarship.findUnique({ where: { id } });
  if (!scholarship) notFound();

  const updateScholarshipWithId = updateScholarship.bind(null, scholarship.id);

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 border-t-4 border-t-green-500 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
        <h1 className="text-2xl font-bold text-slate-900">Edit Scholarship: {scholarship.title}</h1>
        <Link href="/admin?tab=scholarships" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
          Cancel & Return
        </Link>
      </div>

      <form action={updateScholarshipWithId} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Scholarship Title</label>
            <input required name="title" defaultValue={scholarship.title} type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Provider Organization</label>
            <input required name="provider" defaultValue={scholarship.provider} type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-slate-900" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
            <select required name="category" defaultValue={scholarship.category} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white text-slate-900">
              <option value="Merit">Merit-based</option>
              <option value="Need">Need-based</option>
              <option value="Minority">Minority</option>
              <option value="International">International</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Amount</label>
            <input required name="amount" defaultValue={scholarship.amount} type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Start Date</label>
            <input required name="startDate" defaultValue={new Date(scholarship.startDate).toISOString().split("T")[0]} type="date" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Deadline Date</label>
            <input required name="deadline" defaultValue={new Date(scholarship.deadline).toISOString().split("T")[0]} type="date" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-slate-900" />
          </div>
        </div>

        <div>
           <label className="block text-sm font-semibold text-slate-700 mb-1">Apply Link (External URL)</label>
           <input required name="applyLink" defaultValue={scholarship.applyLink} type="url" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-slate-900" />
        </div>

        <div className="space-y-6 pt-4 border-t border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Scholarship Details</h3>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">About the Scholarship</label>
            <RichTextEditor name="description" initialValue={scholarship.description} placeholder="Full description with formatting..." />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Eligibility Criteria</label>
            <RichTextEditor name="eligibilityCriteria" initialValue={scholarship.eligibilityCriteria} placeholder="Requirements to apply..." />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Benefits</label>
            <RichTextEditor name="benefits" initialValue={scholarship.benefits} placeholder="What the scholarship covers..." />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">How to Apply</label>
            <RichTextEditor name="howToApply" initialValue={scholarship.howToApply} placeholder="Step by step guide..." />
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button 
            type="submit" 
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all"
          >
            Update Scholarship
          </button>
        </div>
      </form>
    </div>
  );
}
