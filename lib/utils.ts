export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const categoryColors: Record<string, string> = {
  "Next.js": "bg-blue-900/30 text-blue-300 border-blue-700/30",
  TypeScript: "bg-cyan-900/30 text-cyan-300 border-cyan-700/30",
  Backend: "bg-green-900/30 text-green-300 border-green-700/30",
  Database: "bg-orange-900/30 text-orange-300 border-orange-700/30",
  CSS: "bg-pink-900/30 text-pink-300 border-pink-700/30",
  Security: "bg-purple-900/30 text-purple-300 border-purple-700/30",
  General: "bg-slate-800/50 text-slate-300 border-slate-700/30",
  React: "bg-cyan-900/30 text-cyan-300 border-cyan-700/30",
  DevOps: "bg-orange-900/30 text-orange-300 border-orange-700/30",
};