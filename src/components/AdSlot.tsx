interface AdSlotProps {
  className?: string;
  id?: string;
}

export default function AdSlot({ className = "", id }: AdSlotProps) {
  return (
    <div 
      id={id}
      className={`flex items-center justify-center bg-slate-100 border-2 border-dashed border-slate-200 text-slate-400 text-xs font-semibold uppercase tracking-wider rounded-lg p-6 min-h-[100px] w-full ${className}`}
    >
      Advertisement Slot
    </div>
  );
}
