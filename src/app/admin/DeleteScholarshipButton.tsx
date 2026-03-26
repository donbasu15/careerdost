"use client";

import { useTransition } from "react";
import { deleteScholarship } from "@/app/actions/scholarshipActions";

export default function DeleteScholarshipButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() => {
        if (confirm("Are you sure you want to delete this scholarship?")) {
          startTransition(async () => {
            await deleteScholarship(id);
          });
        }
      }}
      className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
