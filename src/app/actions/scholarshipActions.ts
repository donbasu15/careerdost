"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function createScholarship(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const provider = formData.get("provider") as string;
  const category = formData.get("category") as string;
  const amount = formData.get("amount") as string;
  
  const eligibilityCriteria = formData.get("eligibilityCriteria") as string;
  const howToApply = formData.get("howToApply") as string;
  const benefits = formData.get("benefits") as string;
  const description = formData.get("description") as string;
  const applyLink = formData.get("applyLink") as string;
  
  const startDateStr = formData.get("startDate") as string;
  const deadlineStr = formData.get("deadline") as string;
  const startDate = new Date(startDateStr);
  const deadline = new Date(deadlineStr);

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Math.floor(Math.random() * 1000);

  await prisma.scholarship.create({
    data: {
      title, provider, category, amount, slug,
      eligibilityCriteria, howToApply, benefits,
      description, applyLink, startDate, deadline
    }
  });

  revalidatePath("/");
  revalidatePath("/scholarships");
  revalidatePath("/admin");
  redirect("/admin?tab=scholarships");
}

export async function updateScholarship(id: string, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const provider = formData.get("provider") as string;
  const category = formData.get("category") as string;
  const amount = formData.get("amount") as string;
  
  const eligibilityCriteria = formData.get("eligibilityCriteria") as string;
  const howToApply = formData.get("howToApply") as string;
  const benefits = formData.get("benefits") as string;
  const description = formData.get("description") as string;
  const applyLink = formData.get("applyLink") as string;
  
  const startDateStr = formData.get("startDate") as string;
  const deadlineStr = formData.get("deadline") as string;
  const startDate = new Date(startDateStr);
  const deadline = new Date(deadlineStr);

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Math.floor(Math.random() * 1000);

  await prisma.scholarship.update({
    where: { id },
    data: {
      title, provider, category, amount, slug,
      eligibilityCriteria, howToApply, benefits,
      description, applyLink, startDate, deadline
    }
  });

  revalidatePath("/");
  revalidatePath("/scholarships");
  revalidatePath("/admin");
  redirect("/admin?tab=scholarships");
}

export async function deleteScholarship(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await prisma.scholarship.delete({
    where: { id }
  });

  revalidatePath("/");
  revalidatePath("/scholarships");
  revalidatePath("/admin");
}
