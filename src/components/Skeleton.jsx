export default function Skeleton({ className }) {
  return (
    <div className={`animate-shimmer rounded-lg bg-slate-100 dark:bg-slate-800/50 ${className}`} />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-[#0b253a] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-12 w-12 rounded-xl" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-32" />
      </div>
    </div>
  );
}

export function RowSkeleton() {
  return (
    <tr className="border-b border-slate-50 dark:border-slate-800 last:border-0">
      <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
      <td className="px-6 py-4"><Skeleton className="h-4 w-full max-w-[200px]" /></td>
      <td className="px-6 py-4"><Skeleton className="h-6 w-24 rounded-lg" /></td>
      <td className="px-6 py-4 text-right"><Skeleton className="h-4 w-16 ml-auto" /></td>
    </tr>
  );
}
