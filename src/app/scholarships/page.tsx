import prisma from "@/lib/prisma";
import ScholarshipCard from "@/components/ScholarshipCard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Scholarships | CareerDost",
  description: "Find the best scholarships to support your education and career goals.",
};

export default async function ScholarshipsPage() {
  const scholarships = await prisma.scholarship.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8 border-b pb-4 text-white">Latest Scholarships</h1>
      {scholarships.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
          <p className="text-slate-500">No scholarships posted yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
          ))}
        </div>
      )}
    </div>
  );
}
