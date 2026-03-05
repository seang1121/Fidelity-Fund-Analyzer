"use client";

import { useState } from "react";
import { getRiskMetrics } from "@/lib/api-client";
import { useApi } from "@/hooks/use-api";
import TickerInput from "@/components/ui/ticker-input";
import MetricCard from "@/components/ui/metric-card";
import type { RiskMetricsResponse } from "@/lib/types";
import { formatPct } from "@/lib/utils";

export default function RiskMetricsPage() {
  const [tickers, setTickers] = useState<string[]>([]);
  const { data, loading, error, execute } = useApi(getRiskMetrics);

  async function handleAnalyze() {
    if (tickers.length === 0) return;
    await execute({ tickers });
  }

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-white">Risk Metrics</h1>
      <p className="mb-6 text-gray-400">
        Analyze risk-adjusted returns, drawdowns, and tail risk for any
        portfolio.
      </p>

      <div className="mb-6 rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <TickerInput tickers={tickers} onChange={setTickers} />
        <button
          onClick={handleAnalyze}
          disabled={tickers.length === 0 || loading}
          className="mt-4 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-500 disabled:opacity-40"
        >
          {loading ? "Analyzing..." : "Analyze Risk"}
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {data && <RiskResults data={data} />}
    </div>
  );
}

function RiskResults({ data }: { data: RiskMetricsResponse }) {
  const metrics = [
    {
      label: "Annualized Return",
      value: formatPct(data.annualized_return),
      color: data.annualized_return >= 0 ? "green" : "red",
    },
    {
      label: "Annualized Volatility",
      value: formatPct(data.annualized_volatility),
      color: "amber",
    },
    {
      label: "Sharpe Ratio",
      value: data.sharpe_ratio.toFixed(2),
      subtitle: "> 1.0 is good, > 2.0 is excellent",
      color: data.sharpe_ratio >= 1 ? "green" : "amber",
    },
    {
      label: "Sortino Ratio",
      value: data.sortino_ratio.toFixed(2),
      subtitle: "Penalizes only downside risk",
      color: data.sortino_ratio >= 1 ? "green" : "amber",
    },
    {
      label: "Max Drawdown",
      value: formatPct(data.max_drawdown),
      subtitle: data.max_drawdown_duration_days
        ? `${data.max_drawdown_duration_days} trading days`
        : undefined,
      color: "red",
    },
    {
      label: "Value at Risk (95%)",
      value: formatPct(data.var_95),
      subtitle: "Annualized worst-case at 95% confidence",
      color: "red",
    },
    {
      label: "CVaR / Expected Shortfall",
      value: formatPct(data.cvar_95),
      subtitle: "Average loss beyond VaR threshold",
      color: "red",
    },
    {
      label: "Beta",
      value: data.beta?.toFixed(2) ?? "N/A",
      subtitle: "Sensitivity to S&P 500",
      color: "blue",
    },
  ] satisfies Array<{
    label: string;
    value: string;
    subtitle?: string;
    color: string;
  }>;

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-white">
        Portfolio: {data.tickers.join(", ")}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <MetricCard
            key={m.label}
            label={m.label}
            value={m.value}
            subtitle={m.subtitle}
            color={m.color as "green" | "red" | "amber" | "blue"}
          />
        ))}
      </div>

      {data.treynor_ratio !== null && (
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <MetricCard
            label="Treynor Ratio"
            value={data.treynor_ratio.toFixed(4)}
            subtitle="Excess return per unit of systematic risk"
          />
          <MetricCard
            label="Alpha"
            value={data.alpha?.toFixed(4) ?? "N/A"}
            subtitle="Excess return above CAPM prediction"
            color={
              data.alpha && data.alpha > 0 ? "green" : "red"
            }
          />
          {data.calmar_ratio && (
            <MetricCard
              label="Calmar Ratio"
              value={data.calmar_ratio.toFixed(2)}
              subtitle="Return / Max Drawdown"
            />
          )}
        </div>
      )}
    </div>
  );
}
