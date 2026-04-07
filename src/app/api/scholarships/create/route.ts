import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

// Define the schema based on the Prisma model
const scholarshipSchema = z.object({
  title: z.string().min(1, "Title is required"),
  provider: z.string().min(1, "Provider is required"),
  category: z.string().min(1, "Category is required"),
  amount: z.string().min(1, "Amount is required"),
  startDate: z.string().min(1, "Start Date is required"),
  deadline: z.string().min(1, "Deadline is required"),
  eligibilityCriteria: z.string().min(1, "Eligibility Criteria is required"),
  howToApply: z.string().min(1, "How to Apply is required"),
  benefits: z.string().min(1, "Benefits are required"),
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
    const validatedData = scholarshipSchema.parse(body);

    // Create the scholarship
    const newScholarship = await prisma.scholarship.create({
      data: {
        title: validatedData.title,
        slug: generateSlug(validatedData.title),
        provider: validatedData.provider,
        category: validatedData.category,
        amount: validatedData.amount,
        startDate: new Date(validatedData.startDate),
        deadline: new Date(validatedData.deadline),
        eligibilityCriteria: validatedData.eligibilityCriteria,
        howToApply: validatedData.howToApply,
        benefits: validatedData.benefits,
        description: validatedData.description,
        applyLink: validatedData.applyLink || req.url,
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, scholarship: newScholarship }, { status: 201 });
  } catch (error) {
    console.error("Error creating scholarship:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.flatten().fieldErrors }, 
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create scholarship post." },
      { status: 500 }
    );
  }
}
