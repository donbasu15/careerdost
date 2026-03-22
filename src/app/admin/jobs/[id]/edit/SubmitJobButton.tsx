"use client";

import { useFormStatus } from "react-dom";

export default function SubmitJobButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all"
    >
      {pending ? "Updating Job..." : "Update Job Post"}
    </button>
  );
}
