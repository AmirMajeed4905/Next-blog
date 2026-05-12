import Link from "next/link";

const skills = [
  "Next.js", "TypeScript", "React", "Node.js",
  "PostgreSQL", "Prisma", "Tailwind CSS", "Docker"
];

const timeline = [
  { year: "2024", title: "Blog Launch", desc: "Is blog ka safar shuru kiya" },
  { year: "2023", title: "Full Stack Journey", desc: "Backend aur frontend dono seekhna shuru kiya" },
  { year: "2022", title: "Coding Start", desc: "Programming ki duniya mein qadam rakha" },
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
            Hamare Baare Mein
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Ideas Share Karna{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-violet-400">
              Hamara Maqsad
            </span>
          </h1>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Ye blog un logon ke liye hai jo technology, programming, aur digital world ke baare mein
            gehri aur honest baatein sunna chahte hain.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Kahani Kya Hai?
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Ye blog ek simple idea se shuru hua — apni learning share karna. Jo cheezein
                seekhi, jo galtiyan ki, jo discoveries hui — sab kuch yahan likhna.
              </p>
              <p className="text-slate-400 leading-relaxed mb-6">
                Har post mein koshish hoti hai ke complex cheezein simple tarike se samjhayein
                jaayein — chahe aap beginner hon ya experienced developer.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-linear-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-lg shadow-purple-900/30"
              >
                Posts Parhen
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
                { label: "Saal Se", value: "2022", icon: "📅" },
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
            <p className="text-slate-400">Jo technologies hum use karte hain</p>
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
            <h2 className="text-3xl font-bold text-white mb-3">Safar</h2>
            <p className="text-slate-400">Kahan se kahan tak aaye</p>
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
              Saath Milein?
            </h2>
            <p className="text-slate-400 mb-8">
              Koi sawaal hai, feedback deni hai ya bas baat karni hai — hum yahan hain.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/blog"
                className="bg-linear-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-medium px-6 py-3 rounded-xl transition-all"
              >
                Blog Parhen
              </Link>
              <Link
                href="/register"
                className="bg-white/5 hover:bg-white/10 border border-purple-800/50 text-slate-300 hover:text-white font-medium px-6 py-3 rounded-xl transition-all"
              >
                Join Karein
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}