"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function createJob(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const organization = formData.get("organization") as string;
  const category = formData.get("category") as string;
  const eligibility = formData.get("eligibility") as string;
  const selectionProcess = formData.get("selectionProcess") as string;
  const howToApply = formData.get("howToApply") as string;
  const description = formData.get("description") as string;
  const applyLink = formData.get("applyLink") as string;
  
  const startDateStr = formData.get("startDate") as string;
  const endDateStr = formData.get("endDate") as string;
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Math.floor(Math.random() * 1000);

  await prisma.job.create({
    data: {
      title, organization, category, slug,
      eligibility, selectionProcess, howToApply,
      description, applyLink, startDate, endDate
    }
  });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateJob(id: string, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const organization = formData.get("organization") as string;
  const category = formData.get("category") as string;
  const eligibility = formData.get("eligibility") as string;
  const selectionProcess = formData.get("selectionProcess") as string;
  const howToApply = formData.get("howToApply") as string;
  const description = formData.get("description") as string;
  const applyLink = formData.get("applyLink") as string;
  
  const startDateStr = formData.get("startDate") as string;
  const endDateStr = formData.get("endDate") as string;
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Math.floor(Math.random() * 1000);

  await prisma.job.update({
    where: { id },
    data: {
      title, organization, category, slug,
      eligibility, selectionProcess, howToApply,
      description, applyLink, startDate, endDate
    }
  });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteJob(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await prisma.job.delete({
    where: { id }
  });

  revalidatePath("/");
  revalidatePath("/admin");
}
