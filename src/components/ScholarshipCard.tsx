import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Scholarship } from "@prisma/client";

export default function ScholarshipCard({ scholarship }: { scholarship: Scholarship }) {
  return (
    <Link href={`/scholarships/${scholarship.slug}`} className="block group">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 transition-all hover:shadow-md hover:border-green-300">
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-1 rounded border border-green-200">
            {scholarship.category}
          </span>
          <span className="text-xs text-slate-400">
            {formatDistanceToNow(new Date(scholarship.createdAt), { addSuffix: true })}
          </span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-green-600 transition-colors line-clamp-2">
          {scholarship.title}
        </h3>
        <p className="text-sm text-slate-600 mt-2 font-medium">{scholarship.provider}</p>
        <div className="mt-6 flex items-center justify-between text-sm">
          <div>
            <span className="text-slate-500 block text-xs uppercase tracking-wider">Amount</span>
            <span className="font-bold text-green-700 block mt-1">
              {scholarship.amount}
            </span>
          </div>
          <div className="text-right">
            <span className="text-slate-500 block text-xs uppercase tracking-wider">Deadline</span>
            <span className="font-semibold text-slate-900 block mt-1 border-b-2 border-red-400">
              {new Date(scholarship.deadline).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
