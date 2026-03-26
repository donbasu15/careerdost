import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import AdSlot from "@/components/AdSlot";
import Link from "next/link";
import { formatDistanceToNow, differenceInDays } from "date-fns";
import ReactMarkdown from "react-markdown";
import { CalendarIcon, BuildingIcon, ExternalLinkIcon, IndianRupeeIcon, GraduationCapIcon } from "lucide-react";
import type { Metadata } from 'next';

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const scholarship = await prisma.scholarship.findUnique({ where: { slug } });
  if (!scholarship) return { title: 'Scholarship Not Found' };
  
  const description = scholarship.description.substring(0, 150) + "...";
  return {
    title: `${scholarship.title} | ${scholarship.provider} | CareerDost`,
    description: `Career Dost updates: ${description}`,
    keywords: ["CareerDost", "scholarship", scholarship.category, scholarship.provider, "financial aid", "education"],
    openGraph: {
      title: `${scholarship.title} | ${scholarship.provider} | CareerDost`,
      description: `Career Dost updates: ${description}`,
      type: "article",
    },
  };
}

export default async function ScholarshipPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const scholarship = await prisma.scholarship.findUnique({
    where: { slug }
  });

  if (!scholarship || !scholarship.isActive) return notFound();

  // Helper to remove nasty non-breaking spaces from copy-pasting
  const cleanHtml = (html: string) => html ? html.replace(/&nbsp;/g, ' ') : '';

  const daysRemaining = differenceInDays(new Date(scholarship.deadline), new Date());
  
  const relatedScholarships = await prisma.scholarship.findMany({
    where: { category: scholarship.category, id: { not: scholarship.id }, isActive: true },
    take: 3,
    orderBy: { createdAt: "desc" }
  });

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "EducationalOccupationalProgram",
    "name": scholarship.title,
    "description": scholarship.description,
    "provider": {
      "@type": "Organization",
      "name": scholarship.provider,
    },
    "category": scholarship.category,
    "applicationDeadline": scholarship.deadline.toISOString(),
    "financialAidProvided": scholarship.amount,
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="flex-1 space-y-8">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 border-l-4 border-l-green-500">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                {scholarship.category}
              </span>
            </div>
            {daysRemaining >= 0 ? (
               <span className="text-sm font-semibold bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-1">
                 <CalendarIcon className="w-4 h-4" />
                 {daysRemaining} Days Remaining
               </span>
            ) : (
               <span className="text-sm font-semibold bg-red-100 text-red-700 px-3 py-1 rounded-full flex items-center gap-1">
                 Expired
               </span>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{scholarship.title}</h1>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center text-slate-600 gap-2 font-medium bg-slate-50 inline-flex px-4 py-2 rounded-lg">
              <BuildingIcon className="w-5 h-5 text-slate-400" />
              {scholarship.provider}
            </div>
            <div className="flex items-center text-green-700 gap-2 font-bold bg-green-50 inline-flex px-4 py-2 rounded-lg border border-green-200">
              <GraduationCapIcon className="w-5 h-5 text-green-600" />
              {scholarship.amount}
            </div>
          </div>
        </div>
        
        <AdSlot className="w-full" />
        
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-8">
          <section>
            <h2 className="flex items-center text-xl font-bold text-slate-900 mb-4 border-b pb-2">Important Dates</h2>
            <ul className="space-y-3 font-medium text-slate-700">
              <li className="flex justify-between items-center py-2 border-b border-slate-100">
                <span>Application Start</span>
                <span className="text-slate-900">{new Date(scholarship.startDate).toLocaleDateString()}</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-slate-100">
                <span>Deadline</span>
                <span className="text-red-600 font-bold">{new Date(scholarship.deadline).toLocaleDateString()}</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="flex items-center text-xl font-bold text-slate-900 mb-4 border-b pb-2">About the Scholarship</h2>
            <div className="text-slate-700 prose prose-slate max-w-none break-words" dangerouslySetInnerHTML={{ __html: cleanHtml(scholarship.description) }} />
          </section>

          <section>
            <h2 className="flex items-center text-xl font-bold text-slate-900 mb-4 border-b pb-2">Eligibility Criteria</h2>
            <div className="p-4 bg-green-50 border border-green-100 rounded-lg text-slate-700 prose prose-slate max-w-none break-words" dangerouslySetInnerHTML={{ __html: cleanHtml(scholarship.eligibilityCriteria) }} />
          </section>

          <section>
            <h2 className="flex items-center text-xl font-bold text-slate-900 mb-4 border-b pb-2">Benefits</h2>
            <div className="text-slate-700 prose prose-slate max-w-none break-words" dangerouslySetInnerHTML={{ __html: cleanHtml(scholarship.benefits) }} />
          </section>

          <section>
            <h2 className="flex items-center text-xl font-bold text-slate-900 mb-4 border-b pb-2">How to Apply</h2>
            <div className="text-slate-700 prose prose-slate max-w-none break-words" dangerouslySetInnerHTML={{ __html: cleanHtml(scholarship.howToApply) }} />
          </section>
        </div>
      </div>

      <div className="lg:w-80 space-y-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow-sm border border-green-200 lg:sticky lg:top-24">
          <h3 className="text-xl font-black text-green-900 mb-6 border-b border-green-200 pb-4">Quick Info</h3>
          
          <div className="space-y-5 mb-8">
            <div>
              <p className="text-xs text-green-700 uppercase tracking-widest font-bold mb-1">Amount</p>
              <p className="text-2xl font-black text-green-800">{scholarship.amount}</p>
            </div>
            <div>
              <p className="text-xs text-green-700 uppercase tracking-widest font-bold mb-1">Deadline</p>
              <p className="text-lg font-bold text-red-600">
                {new Date(scholarship.deadline).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
          </div>

          <a
            href={scholarship.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
          >
            Apply Now <ExternalLinkIcon className="w-5 h-5" />
          </a>
          <p className="text-xs text-center text-green-700 mt-4 opacity-80">
            You will be redirected to the provider's website.
          </p>
        </div>

        <AdSlot />

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Related Scholarships</h3>
          {relatedScholarships.length > 0 ? (
            <div className="space-y-4">
              {relatedScholarships.map((rs) => (
                <Link key={rs.id} href={`/scholarships/${rs.slug}`} className="block group border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <h4 className="text-sm font-bold text-slate-800 group-hover:text-green-600 line-clamp-2">
                    {rs.title}
                  </h4>
                  <div className="text-xs text-slate-500 mt-1">{rs.provider}</div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 text-center py-4">No related scholarships found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
