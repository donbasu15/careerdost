import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import prisma from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";

export const dynamic = "force-dynamic";

export default async function Home() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return (
    <div className="space-y-8">
      <section className="text-center py-12 md:py-20 bg-white rounded-2xl shadow-sm border border-slate-100 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Find Your Dream <span className="text-blue-600">Govt & Private</span> Job on CareerDost
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          Welcome to <strong className="font-semibold text-slate-800">CareerDost</strong> (Career Dost), the most up-to-date and reliable job portal for government recruitment notifications, private jobs, admit cards, and results.
        </p>
      </section>

      <AdSlot className="my-8" />

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Latest Notifications</h2>
          <span className="text-sm font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            {jobs.length} Jobs
          </span>
        </div>

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
      </section>
    </div>
  );
}
