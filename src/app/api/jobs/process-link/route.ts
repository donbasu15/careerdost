import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key is not configured" }, { status: 500 });
    }

    // 1. Scrape the URL
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });
    
    const html = response.data;
    const $ = cheerio.load(html);
    
    // Remove unnecessary elements to reduce text size
    $("script, style, nav, footer, header, iframe, noscript").remove();
    
    const extractedText = $("body").text().replace(/\s+/g, " ").trim();
    const truncatedText = extractedText.substring(0, 40000); // 40k chars max to avoid token limits

    // 2. Process with Gemini
    const prompt = `
      You are an expert HR associate and data extractor. Extract the following job details from the provided webpage text.
      Write readable and well structured content for the job description. With bold, underline, table, list, etc.
      Return ONLY a JSON object (without any markdown code blocks like \`\`\`json) matching this exact structure:
      {
        "title": "Job Title (e.g. SSC CGL 2026)",
        "organization": "Organization Name",
        "category": "Govt or Private or PSU",
        "applyLink": "official website URL to apply for the job",
        "startDate": "YYYY-MM-DD (if not found, use today's date)",
        "endDate": "YYYY-MM-DD (if not found, use a date 30 days from today)",
        "eligibility": "Eligibility Criteria (use clean HTML tags like <ul>, <li>, <strong>, <br>. DO NOT use Markdown symbols like ** or *. Use a professional and conversational tone)",
        "selectionProcess": "Selection Process (use clean HTML tags ONLY, no Markdown)",
        "howToApply": "How to Apply (use clean HTML tags ONLY, no Markdown)",
        "description": "Detailed Notification / Description including a Vacancy Table if available (use clean HTML tables and tags ONLY, no Markdown)"
      }
      
      Webpage Text:
      ${truncatedText}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text();

    // Clean up potential markdown formatting in the response
    let jsonString = aiResponse.trim();
    if (jsonString.startsWith("\`\`\`json")) {
      jsonString = jsonString.slice(7);
    } else if (jsonString.startsWith("\`\`\`")) {
      jsonString = jsonString.slice(3);
    }
    
    if (jsonString.endsWith("\`\`\`")) {
      jsonString = jsonString.slice(0, -3);
    }
    
    jsonString = jsonString.trim();
    const parsedData = JSON.parse(jsonString);

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error("Error processing link:", error);
    return NextResponse.json(
      { error: "Failed to process the link. Please try again or enter details manually." },
      { status: 500 }
    );
  }
}
