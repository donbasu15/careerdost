import prisma from "@/lib/prisma";
import { updateJob } from "@/app/actions/jobActions";
import Link from "next/link";
import { notFound } from "next/navigation";
import SubmitJobButton from "./SubmitJobButton";
import RichTextEditor from "@/components/RichTextEditor";

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await prisma.job.findUnique({ where: { id } });
  if (!job) notFound();

  const updateJobWithId = updateJob.bind(null, job.id);

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
        <h1 className="text-2xl font-bold text-slate-900">Edit Job: {job.title}</h1>
        <Link href="/admin" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
          Cancel & Return
        </Link>
      </div>

      <form action={updateJobWithId} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Job Title</label>
            <input required name="title" defaultValue={job.title} type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Organization</label>
            <input required name="organization" defaultValue={job.organization} type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
            <select required name="category" defaultValue={job.category} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-900">
              <option value="Govt">Government</option>
              <option value="Private">Private</option>
              <option value="PSU">PSU</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Start Date</label>
            <input required name="startDate" defaultValue={job.startDate.toISOString().split("T")[0]} type="date" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">End Date</label>
            <input required name="endDate" defaultValue={job.endDate.toISOString().split("T")[0]} type="date" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" />
          </div>
        </div>

        <div>
           <label className="block text-sm font-semibold text-slate-700 mb-1">Apply Link (External URL)</label>
           <input required name="applyLink" defaultValue={job.applyLink} type="url" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" />
        </div>

        <div className="space-y-6 pt-4 border-t border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Job Details</h3>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Eligibility Criteria</label>
            <RichTextEditor name="eligibility" initialValue={job.eligibility} placeholder="Requirements..." />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Selection Process</label>
            <RichTextEditor name="selectionProcess" initialValue={job.selectionProcess} placeholder="Tier 1, Tier 2 exams..." />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">How to Apply</label>
            <RichTextEditor name="howToApply" initialValue={job.howToApply} placeholder="Step by step guide..." />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Detailed Notification / Description</label>
            <RichTextEditor name="description" initialValue={job.description} placeholder="Full job description with formatting..." />
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <SubmitJobButton />
        </div>
      </form>
    </div>
  );
}
