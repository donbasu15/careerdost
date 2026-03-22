import prisma from "@/lib/prisma";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import DeleteJobButton from "./DeleteJobButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const jobs = await prisma.job.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Manage Jobs</h1>
        <Link 
          href="/admin/jobs/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition-colors text-sm"
        >
          + Post New Job
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 text-sm font-semibold text-slate-700">Job Title</th>
              <th className="p-4 text-sm font-semibold text-slate-700">Category</th>
              <th className="p-4 text-sm font-semibold text-slate-700">Posted</th>
              <th className="p-4 text-sm font-semibold text-slate-700">Status</th>
              <th className="p-4 text-sm font-semibold text-slate-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  No jobs posted yet. Create one to get started.
                </td>
              </tr>
            ) : (
              jobs.map((job: any) => (
                <tr key={job.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-slate-900">{job.title}</div>
                    <div className="text-xs text-slate-500 mt-1">{job.organization}</div>
                  </td>
                  <td className="p-4">
                    <span className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded font-medium">
                      {job.category}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-600">
                    {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
                  </td>
                  <td className="p-4">
                    {new Date(job.endDate) >= new Date() ? (
                      <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded">Active</span>
                    ) : (
                      <span className="text-xs font-semibold text-red-700 bg-red-100 px-2 py-1 rounded">Expired</span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-4">
                    <Link href={`/admin/jobs/${job.id}/edit`} className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors inline-block">
                      Edit
                    </Link>
                    <div className="inline-block">
                      <DeleteJobButton id={job.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
