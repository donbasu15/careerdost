// page for showing all the jobs avilable to apply
import prisma from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export default async function JobsPage() {
    const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });
    return (
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-8 border-b pb-4 text-white">Latest Jobs</h1>
            {jobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-500">No jobs posted yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <Link key={job.id} href={`/jobs/${job.slug}`} className="block group">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 transition-all hover:shadow-md hover:border-blue-200">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {job.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {job.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 font-medium">{job.organization}</p>
                  <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
                    <div>
                      Last Date:{' '}
                      <span className="font-semibold text-slate-900 block mt-1">
                        {new Date(job.endDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        </div>
    );
}