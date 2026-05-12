import Link from "next/link";

const skills = [
  "Next.js", "TypeScript", "React", "Node.js",
  "PostgreSQL", "Prisma", "Tailwind CSS", "Docker"
];

const timeline = [
  { year: "2024", title: "Blog Launch", desc: "Started this blog journey" },
  { year: "2023", title: "Full Stack Journey", desc: "Started learning both frontend and backend development" },
  { year: "2022", title: "Coding Start", desc: "Entered the world of programming" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0f0f1a]">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="absolute inset-0 bg-linear-to-br from-purple-900/20 via-transparent to-violet-900/10" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-700/40 rounded-full px-4 py-1.5 text-purple-300 text-sm font-medium mb-6">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
            About Us
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Sharing Ideas is{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-violet-400">
              Our Purpose
            </span>
          </h1>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            This blog is for people who want deep and honest insights about technology,
            programming, and the digital world.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                What is this story?
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                This blog started with a simple idea — to share what I learn.
                Everything I study, the mistakes I make, and the things I discover
                are written here.
              </p>
              <p className="text-slate-400 leading-relaxed mb-6">
                Every post tries to explain complex topics in a simple way — whether
                you are a beginner or an experienced developer.
              </p>

              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-linear-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-lg shadow-purple-900/30"
              >
                Read Posts
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Posts", value: "50+", icon: "📝" },
                { label: "Readers", value: "1K+", icon: "👥" },
                { label: "Topics", value: "10+", icon: "🎯" },
                { label: "Since", value: "2022", icon: "📅" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/5 border border-purple-900/30 rounded-2xl p-5 text-center hover:border-purple-600/40 transition-all"
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Tech Stack</h2>
            <p className="text-slate-400">Technologies we use</p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-purple-900/20 border border-purple-700/30 text-purple-300 px-4 py-2 rounded-xl text-sm font-medium hover:bg-purple-900/40 hover:border-purple-600/50 transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Journey</h2>
            <p className="text-slate-400">How it all started</p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-purple-900/50" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="relative z-10 w-16 h-16 bg-[#13131f] border-2 border-purple-700/50 rounded-2xl flex items-center justify-center shrink-0">
                    <span className="text-purple-400 text-sm font-bold">{item.year}</span>
                  </div>

                  <div className="bg-white/5 border border-purple-900/30 rounded-2xl p-5 flex-1 hover:border-purple-700/40 transition-all">
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-linear-to-br from-purple-900/30 to-violet-900/20 border border-purple-800/30 rounded-3xl p-10">
            <h2 className="text-3xl font-bold text-white mb-4">
              Let’s Connect?
            </h2>

            <p className="text-slate-400 mb-8">
              If you have questions, feedback, or just want to talk — we are here.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/blog"
                className="bg-linear-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-medium px-6 py-3 rounded-xl transition-all"
              >
                Read Blog
              </Link>

              <Link
                href="/register"
                className="bg-white/5 hover:bg-white/10 border border-purple-800/50 text-slate-300 hover:text-white font-medium px-6 py-3 rounded-xl transition-all"
              >
                Join Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}