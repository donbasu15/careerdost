import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";


export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white px-6 py-3 rounded-xl flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="CareerDost Logo" width={32} height={32} className="h-8 w-auto bg-white/10 rounded-md p-1" />
          <span className="font-semibold tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            Admin Dashboard Active
          </span>
        </div>
        <a href="/api/auth/signout" className="text-sm text-slate-300 hover:text-white transition-colors">Logout</a>
      </div>
      {children}
    </div>
  );
}
