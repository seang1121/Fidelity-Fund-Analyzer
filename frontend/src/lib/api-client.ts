const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function fetchApi<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || `API error ${res.status}`);
  }

  return res.json();
}

// --- Data ---

import type {
  DividendAnalysis,
  HistoryPoint,
  MonteCarloRequest,
  MonteCarloResponse,
  OptimizationRequest,
  OptimizationResponse,
  PortfolioSummary,
  Quote,
  RiskMetricsRequest,
  RiskMetricsResponse,
} from "./types";

export async function getQuote(ticker: string): Promise<Quote> {
  return fetchApi(`/api/quote/${ticker}`);
}

export async function getHistory(
  ticker: string,
  period = "2y"
): Promise<HistoryPoint[]> {
  return fetchApi(`/api/history/${ticker}?period=${period}`);
}

export async function getDividends(ticker: string): Promise<DividendAnalysis> {
  return fetchApi(`/api/dividends/${ticker}`);
}

// --- Analysis ---

export async function getRiskMetrics(
  req: RiskMetricsRequest
): Promise<RiskMetricsResponse> {
  return fetchApi("/api/risk-metrics", {
    method: "POST",
    body: JSON.stringify(req),
  });
}

export async function runMonteCarlo(
  req: MonteCarloRequest
): Promise<MonteCarloResponse> {
  return fetchApi("/api/monte-carlo", {
    method: "POST",
    body: JSON.stringify(req),
  });
}

export async function runOptimization(
  req: OptimizationRequest
): Promise<OptimizationResponse> {
  return fetchApi("/api/optimize", {
    method: "POST",
    body: JSON.stringify(req),
  });
}

// --- Portfolio ---

export async function uploadPortfolio(
  file: File
): Promise<PortfolioSummary> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${API_BASE}/api/portfolio/upload`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || "Upload failed");
  }
  return res.json();
}

export async function getPortfolio(): Promise<PortfolioSummary> {
  return fetchApi("/api/portfolio");
}

// Re-export for use in types import
interface DividendAnalysisRequest {
  ticker: string;
  required_return?: number;
  growth_rate?: number;
}

export async function analyzeDividend(
  req: DividendAnalysisRequest
): Promise<DividendAnalysis> {
  return fetchApi("/api/dividends/analyze", {
    method: "POST",
    body: JSON.stringify(req),
  });
}
