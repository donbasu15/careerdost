"use client";

import { useState } from "react";
import Link from "next/link";
import RichTextEditor from "@/components/RichTextEditor";
import { useRouter } from "next/navigation";
import { Sparkles, Loader2 } from "lucide-react";

export default function NewScholarshipPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    provider: "",
    category: "Merit",
    amount: "",
    startDate: "",
    deadline: "",
    applyLink: "",
    eligibilityCriteria: "",
    howToApply: "",
    benefits: "",
    description: "",
  });

  const [isPublishing, setIsPublishing] = useState(false);
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [aiUrl, setAiUrl] = useState("");
  const [aiError, setAiError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProcessLink = async () => {
    if (!aiUrl) {
      setAiError("Please enter a URL first.");
      return;
    }
    
    setAiError("");
    setIsProcessingAI(true);
    
    try {
      const response = await fetch("/api/scholarships/process-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: aiUrl }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to process link");
      }
      
      setFormData(prev => ({
        ...prev,
        title: data.title || prev.title,
        provider: data.provider || prev.provider,
        category: data.category || prev.category,
        amount: data.amount || prev.amount,
        startDate: data.startDate || prev.startDate,
        deadline: data.deadline || prev.deadline,
        eligibilityCriteria: data.eligibilityCriteria || prev.eligibilityCriteria,
        howToApply: data.howToApply || prev.howToApply,
        benefits: data.benefits || prev.benefits,
        description: data.description || prev.description,
        applyLink: data.applyLink || aiUrl,
      }));
    } catch (error: any) {
      setAiError(error.message || "An unexpected error occurred.");
    } finally {
      setIsProcessingAI(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPublishing(true);
    
    const formDataObj = new FormData(e.currentTarget);
    const dataToSubmit = Object.fromEntries(formDataObj.entries());

    try {
      const response = await fetch("/api/scholarships/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
         const errorData = await response.json();
         console.error("Validation error:", errorData);
         throw new Error("Failed to create scholarship.");
      }
      
      router.push("/admin?tab=scholarships");
      router.refresh();
    } catch (error) {
       console.error(error);
       alert("Error creating scholarship.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 border-t-4 border-t-green-500 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <h1 className="text-2xl font-bold text-slate-900">Post a New Scholarship</h1>
        <Link href="/admin?tab=scholarships" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
          Cancel & Return
        </Link>
      </div>

      {/* AI Automation Section */}
      <div className="bg-green-50/50 p-6 rounded-xl border border-green-100">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-green-100 rounded-lg text-green-600">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Auto-Fill from Scholarship Link</h3>
            <p className="text-sm text-slate-500 mb-4">Paste a scholarship link to automatically extract details using AI.</p>
            
            <div className="flex flex-col md:flex-row gap-3">
              <input 
                type="url" 
                value={aiUrl}
                onChange={(e) => setAiUrl(e.target.value)}
                placeholder="https://example.com/scholarship-post" 
                className="flex-1 px-4 py-2 text-sm border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-slate-900 bg-white" 
              />
              <button 
                type="button"
                onClick={handleProcessLink}
                disabled={isProcessingAI}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-5 py-2 rounded-lg font-medium shadow-sm transition-all flex items-center justify-center min-w-[150px] gap-2"
              >
                {isProcessingAI ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {isProcessingAI ? "Extracting..." : "Auto-Fill details"}
              </button>
            </div>
            {aiError && <p className="text-red-500 text-xs mt-2">{aiError}</p>}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Scholarship Title</label>
            <input required name="title" value={formData.title} onChange={handleChange} type="text" placeholder="e.g. Merit Scholarship 2026" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Provider Organization</label>
            <input required name="provider" value={formData.provider} onChange={handleChange} type="text" placeholder="e.g. Ministry of Education" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-slate-900" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
            <select required name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white text-slate-900">
              <option value="Merit">Merit-based</option>
              <option value="Need">Need-based</option>
              <option value="Minority">Minority</option>
              <option value="International">International</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Amount</label>
            <input required name="amount" value={formData.amount} onChange={handleChange} type="text" placeholder="e.g. $5,000 or Full Tuition" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Start Date</label>
            <input required name="startDate" value={formData.startDate} onChange={handleChange} type="date" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Deadline Date</label>
            <input required name="deadline" value={formData.deadline} onChange={handleChange} type="date" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-slate-900" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Apply Link (External URL)</label>
          <input required name="applyLink" value={formData.applyLink} onChange={handleChange} type="url" placeholder="https://scholarships.gov.in" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-slate-900" />
        </div>

        <div className="space-y-6 pt-4 border-t border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Scholarship Details</h3>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">About the Scholarship</label>
            <RichTextEditor name="description" initialValue={formData.description} placeholder="Full description with formatting..." />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Eligibility Criteria</label>
            <RichTextEditor name="eligibilityCriteria" initialValue={formData.eligibilityCriteria} placeholder="Requirements to apply..." />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Benefits</label>
            <RichTextEditor name="benefits" initialValue={formData.benefits} placeholder="What the scholarship covers..." />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">How to Apply</label>
            <RichTextEditor name="howToApply" initialValue={formData.howToApply} placeholder="Step by step guide..." />
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-slate-100">
          <button 
            type="submit" 
            disabled={isPublishing}
            className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-8 py-3 rounded-xl font-bold shadow-md transition-all flex items-center gap-2"
          >
            {isPublishing ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
            {isPublishing ? "Publishing Scholarship..." : "Publish Scholarship Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
