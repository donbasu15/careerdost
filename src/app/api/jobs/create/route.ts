import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

// Define the schema based on the Prisma model
const jobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  organization: z.string().min(1, "Organization is required"),
  category: z.string().min(1, "Category is required"),
  startDate: z.string().min(1, "Start Date is required"),
  endDate: z.string().min(1, "End Date is required"),
  eligibility: z.string().min(1, "Eligibility is required"),
  selectionProcess: z.string().min(1, "Selection Process is required"),
  howToApply: z.string().min(1, "How to Apply is required"),
  description: z.string().min(1, "Description is required"),
  applyLink: z.string().url("Must be a valid URL").or(z.string().min(1)), // Graceful fallback
});

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "") + "-" + Date.now().toString().slice(-4);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate request body
    const validatedData = jobSchema.parse(body);

    // Create the job
    const newJob = await prisma.job.create({
      data: {
        title: validatedData.title,
        slug: generateSlug(validatedData.title),
        organization: validatedData.organization,
        category: validatedData.category,
        startDate: new Date(validatedData.startDate),
        endDate: new Date(validatedData.endDate),
        eligibility: validatedData.eligibility,
        selectionProcess: validatedData.selectionProcess,
        howToApply: validatedData.howToApply,
        description: validatedData.description,
        applyLink: validatedData.applyLink,
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, job: newJob }, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: (error as z.ZodError).errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to create job post." },
      { status: 500 }
    );
  }
}
