import Link from "next/link";

const TOOLS = [
  {
    href: "/tools/risk-metrics",
    title: "Risk Metrics",
    desc: "Sharpe, Sortino, VaR, max drawdown, beta",
    color: "emerald",
  },
  {
    href: "/tools/monte-carlo",
    title: "Monte Carlo",
    desc: "10,000 scenario simulation with probability bands",
    color: "blue",
  },
  {
    href: "/tools/efficient-frontier",
    title: "Efficient Frontier",
    desc: "Optimize portfolio weights for max Sharpe ratio",
    color: "violet",
  },
  {
    href: "/tools/dividends",
    title: "Dividend Analysis",
    desc: "DDM valuation, payout ratio, growth rates, calendar",
    color: "amber",
  },
  {
    href: "/tools/screener",
    title: "Scanner & Screener",
    desc: "AI-powered stock scanner with buy/hold/sell signals",
    color: "rose",
  },
  {
    href: "/portfolio",
    title: "My Portfolio",
    desc: "Upload holdings, track P&L, dividend calendar",
    color: "cyan",
  },
];

const colorClasses: Record<string, string> = {
  emerald:
    "border-emerald-500/30 hover:border-emerald-500/60 hover:bg-emerald-500/5",
  blue: "border-blue-500/30 hover:border-blue-500/60 hover:bg-blue-500/5",
  violet:
    "border-violet-500/30 hover:border-violet-500/60 hover:bg-violet-500/5",
  amber: "border-amber-500/30 hover:border-amber-500/60 hover:bg-amber-500/5",
  rose: "border-rose-500/30 hover:border-rose-500/60 hover:bg-rose-500/5",
  cyan: "border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/5",
};

const titleColors: Record<string, string> = {
  emerald: "text-emerald-400",
  blue: "text-blue-400",
  violet: "text-violet-400",
  amber: "text-amber-400",
  rose: "text-rose-400",
  cyan: "text-cyan-400",
};

export default function Home() {
  return (
    <div>
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Investment Command Center
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
          Professional-grade analysis tools for ETFs, mutual funds, and dividend
          stocks. Monte Carlo simulations, portfolio optimization, risk metrics,
          and AI-powered scanning.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className={`group rounded-xl border p-6 transition-all ${colorClasses[tool.color]}`}
          >
            <h3 className={`text-lg font-semibold ${titleColors[tool.color]}`}>
              {tool.title}
            </h3>
            <p className="mt-2 text-sm text-gray-500 group-hover:text-gray-400">
              {tool.desc}
            </p>
          </Link>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-semibold text-white">
          Investment Roadmap
        </h2>
        <div className="grid gap-3 sm:grid-cols-4">
          {[
            {
              href: "/learn/now",
              label: "NOW",
              desc: "Emergency fund",
              bg: "bg-emerald-500/10 border-emerald-500/20",
            },
            {
              href: "/learn/then",
              label: "THEN",
              desc: "Short-term goals",
              bg: "bg-blue-500/10 border-blue-500/20",
            },
            {
              href: "/learn/later",
              label: "LATER",
              desc: "Wealth building",
              bg: "bg-violet-500/10 border-violet-500/20",
            },
            {
              href: "/learn/retirement",
              label: "RETIRE",
              desc: "Long-term planning",
              bg: "bg-amber-500/10 border-amber-500/20",
            },
          ].map((phase) => (
            <Link
              key={phase.href}
              href={phase.href}
              className={`rounded-xl border p-4 text-center transition-all hover:scale-[1.02] ${phase.bg}`}
            >
              <p className="text-lg font-bold text-white">{phase.label}</p>
              <p className="text-xs text-gray-500">{phase.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
