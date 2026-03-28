import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import AdSlot from "@/components/AdSlot";
import Link from "next/link";
import { formatDistanceToNow, differenceInDays } from "date-fns";
import ReactMarkdown from "react-markdown";
import { CalendarIcon, BuildingIcon, ExternalLinkIcon } from "lucide-react";
import type { Metadata } from 'next';

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await prisma.job.findUnique({ where: { slug } });
  if (!job) return { title: 'Job Not Found' };
  
  const description = job.eligibility.substring(0, 150) + "...";
  return {
    title: `${job.title} | ${job.organization} | CareerDost`,
    description: `Career Dost updates: ${description}`,
    keywords: ["CareerDost", "career dost", job.category, job.organization, "government jobs", "sarkari naukri", "recruitment"],
    openGraph: {
      title: `${job.title} | ${job.organization} | CareerDost`,
      description: `Career Dost updates: ${description}`,
      type: "article",
    },
  };
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await prisma.job.findUnique({
    where: { slug }
  });

  if (!job) return notFound();

  const cleanHtml = (html: string) => html ? html.replace(/&nbsp;/g, ' ') : '';
  const daysRemaining = differenceInDays(new Date(job.endDate), new Date());
  
  const relatedJobs = await prisma.job.findMany({
    where: { category: job.category, id: { not: job.id } },
    take: 3,
    orderBy: { createdAt: "desc" }
  });

  // --- STYLING DEFINITION ---
  // This handles Lists, Tables, and Paragraphs from your DB
  const richTextStyles = `
    text-slate-700 max-w-none break-words
    [&_p]:mb-4 
    [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 
    [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4 
    [&_li]:mb-1
    [&_table]:w-full [&_table]:border-collapse [&_table]:border [&_table]:border-slate-300 [&_table]:my-6
    [&_th]:border [&_th]:border-slate-300 [&_th]:p-3 [&_th]:bg-slate-100 [&_th]:text-left [&_th]:font-bold
    [&_td]:border [&_td]:border-slate-300 [&_td]:p-3 [&_td]:align-top
  `;

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "identifier": { "@type": "PropertyValue", "name": job.organization, "value": job.slug },
    "datePosted": job.createdAt.toISOString(),
    "validThrough": job.endDate.toISOString(),
    "employmentType": "FULL_TIME",
    "hiringOrganization": { "@type": "Organization", "name": job.organization },
    "publisher": { "@type": "Organization", "name": "CareerDost" },
    "jobLocation": { "@type": "Place", "address": { "@type": "PostalAddress", "addressCountry": "IN" } }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="flex-1 space-y-8">
        {/* Header Section */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{job.category}</span>
            {daysRemaining >= 0 ? (
               <span className="text-sm font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-1">
                 <CalendarIcon className="w-4 h-4" /> {daysRemaining} Days Remaining
               </span>
            ) : (
               <span className="text-sm font-semibold bg-red-100 text-red-700 px-3 py-1 rounded-full flex items-center gap-1">Expired</span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{job.title}</h1>
          <div className="flex items-center text-slate-600 gap-2 font-medium bg-slate-50 inline-flex px-4 py-2 rounded-lg">
            <BuildingIcon className="w-5 h-5 text-slate-400" /> {job.organization}
          </div>
        </div>
        
        <AdSlot className="w-full" />
        
        {/* Main Content Section */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">Important Dates</h2>
            <ul className="space-y-3 font-medium text-slate-700">
              <li className="flex justify-between items-center py-2 border-b border-slate-100">
                <span>Application Start</span>
                <span className="text-slate-900">{new Date(job.startDate).toLocaleDateString()}</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-slate-100">
                <span>Last Date to Apply</span>
                <span className="text-red-600 font-bold">{new Date(job.endDate).toLocaleDateString()}</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">Eligibility Criteria</h2>
            <div className={richTextStyles} dangerouslySetInnerHTML={{ __html: cleanHtml(job.eligibility) }} />
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">Selection Process</h2>
            <div className={richTextStyles} dangerouslySetInnerHTML={{ __html: cleanHtml(job.selectionProcess) }} />
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">How to Apply</h2>
            <div className={richTextStyles} dangerouslySetInnerHTML={{ __html: cleanHtml(job.howToApply) }} />
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">Detailed Notification</h2>
            <div className={richTextStyles} dangerouslySetInnerHTML={{ __html: cleanHtml(job.description) }} />
          </section>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:w-80 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 lg:sticky lg:top-24 text-center">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Ready to Apply?</h3>
          <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg">
            Apply Now <ExternalLinkIcon className="w-5 h-5" />
          </a>
          <p className="text-xs text-slate-500 mt-4">You will be redirected to the official website.</p>
        </div>

        <AdSlot />

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Related Jobs</h3>
          {relatedJobs.length > 0 ? (
            <div className="space-y-4">
              {relatedJobs.map((rj) => (
                <Link key={rj.id} href={`/jobs/${rj.slug}`} className="block group border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 line-clamp-2">{rj.title}</h4>
                  <div className="text-xs text-slate-500 mt-1">{rj.organization}</div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 text-center py-4">No related jobs found.</p>
          )}
        </div>
      </div>
    </div>
  );
}