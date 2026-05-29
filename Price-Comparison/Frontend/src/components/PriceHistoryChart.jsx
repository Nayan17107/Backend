import { useState } from "react";
import {
  Area, AreaChart, CartesianGrid, Legend,
  ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";

const STORE_COLORS = {
  Flipkart:         { line: "#818CF8", fill: "#818CF822", dot: "#818CF8" },
  Amazon:           { line: "#F472B6", fill: "#F472B622", dot: "#F472B6" },
  Croma:            { line: "#34D399", fill: "#34D39922", dot: "#34D399" },
  "Tata CLiQ":      { line: "#A78BFA", fill: "#A78BFA22", dot: "#A78BFA" },
  "Reliance Digital":{ line: "#38BDF8", fill: "#38BDF822", dot: "#38BDF8" },
  "Vijay Sales":    { line: "#FB923C", fill: "#FB923C22", dot: "#FB923C" },
  Myntra:           { line: "#F43F5E", fill: "#F43F5E22", dot: "#F43F5E" },
  Cashify:          { line: "#06B6D4", fill: "#06B6D422", dot: "#06B6D4" },
};

const FALLBACK_COLOR = { line: "#94A3B8", fill: "#94A3B822", dot: "#94A3B8" };

// ── Mock data for preview ──
const generateMockData = (days) => {
  const stores = ["Flipkart", "Amazon", "Croma"];
  const data = [];
  const now = new Date("2026-05-17");
  const start = new Date(now);
  start.setDate(start.getDate() - days);

  const basePrices = { Flipkart: 115000, Amazon: 118000, Croma: 129999 };
  const currentPrices = { Flipkart: 89999, Amazon: 94999, Croma: 96490 };

  const steps = Math.min(days / 7, 13);
  for (let i = 0; i <= steps; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + Math.round((days / steps) * i));
    const label = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
    const progress = i / steps;
    const entry = { date: label };
    stores.forEach(s => {
      const base = basePrices[s];
      const target = currentPrices[s];
      const noise = (Math.random() - 0.5) * 4000;
      entry[s] = Math.round(base + (target - base) * progress + noise);
    });
    data.push(entry);
  }
  return { stores, data, lowest: { price: 89999, store: "Flipkart", date: "17 May" } };
};

// ── Custom Tooltip ──
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#0D1424", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 16, padding: "14px 18px", minWidth: 190,
      boxShadow: "0 24px 48px rgba(0,0,0,0.6)",
    }}>
      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>
        {label}
      </p>
      {[...payload].sort((a, b) => a.value - b.value).map((entry, i) => {
        const c = STORE_COLORS[entry.name] || FALLBACK_COLOR;
        return (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.line, boxShadow: `0 0 6px ${c.line}` }} />
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>{entry.name}</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 800, color: c.line }}>
              ₹{entry.value.toLocaleString("en-IN")}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// ── Custom Legend ──
const CustomLegend = ({ stores }) => (
  <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", paddingTop: 16 }}>
    {stores.map(store => {
      const c = STORE_COLORS[store] || FALLBACK_COLOR;
      return (
        <div key={store} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 24, height: 2, borderRadius: 2, background: c.line, boxShadow: `0 0 6px ${c.line}88` }} />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", fontWeight: 700 }}>{store}</span>
        </div>
      );
    })}
  </div>
);

// ── Stat pill ──
const StatPill = ({ icon, label, value, color }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 10,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 14, padding: "10px 14px",
    width: "100%",
  }}>
    <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>
    <div style={{ minWidth: 0 }}>
      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", fontWeight: 700, letterSpacing: 0.8 }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 800, color: color || "#fff", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</div>
    </div>
  </div>
);

export default function PriceHistoryChartPreview() {
  const [days, setDays] = useState(90);
  const data = generateMockData(days);

  const allPrices = data.data.flatMap(d => data.stores.map(s => d[s]).filter(Boolean));
  const minP = Math.min(...allPrices);
  const maxP = Math.max(...allPrices);

  const formatY = v => {
    if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`;
    return `₹${(v / 1000).toFixed(0)}K`;
  };

  const yPad = (maxP - minP) * 0.15;
  const yMin = Math.floor((minP - yPad) / 5000) * 5000;
  const yMax = Math.ceil((maxP + yPad) / 5000) * 5000;

  return (
    <div style={{ maxWidth: "100%", overflow: "hidden", fontFamily: "Nunito, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .price-history-shell {
          max-width: 100%;
          overflow: hidden;
        }
        .price-history-card {
          max-width: 100%;
        }
        .day-toggle button {
          min-width: 0;
          flex: 1 1 0;
        }
        @media (max-width: 640px) {
          .chart-card { padding: 16px 14px !important; }
          .chart-header { flex-direction: column !important; align-items: flex-start !important; }
          .chart-title { font-size: 18px !important; }
          .stat-pills { flex-direction: column !important; }
          .stat-pill-item { flex: 1 1 100% !important; }
          .day-toggle { margin-top: 12px !important; width: 100% !important; }
          .chart-container { padding: 16px 4px 4px !important; }
        }
      `}</style>

      <div className="price-history-shell" style={{ margin: "0 auto" }}>

        {/* Card */}
        <div className="price-history-card" style={{
          background: "linear-gradient(160deg, #0D1424 0%, #080C17 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 28, overflow: "hidden",
          boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
        }}>

          {/* Top gradient strip */}
          <div style={{ height: 3, background: "linear-gradient(90deg, #818CF8, #F472B6, #34D399)" }} />

          <div className="chart-card" style={{ padding: "32px 36px" }}>

            {/* Header row */}
            <div className="chart-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: "linear-gradient(135deg, #818CF8, #F472B6)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                    boxShadow: "0 4px 16px rgba(129,140,248,0.4)",
                  }}>📈</div>
                  <h2 className="chart-title" style={{ fontSize: 22, fontWeight: 900, color: "#fff", letterSpacing: -0.5 }}>
                    Price History
                  </h2>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>Tracking</span>
                  <span style={{
                    fontSize: 11, fontWeight: 800, color: "#34D399", letterSpacing: 1,
                    background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.25)",
                    padding: "2px 8px", borderRadius: 20,
                  }}>● LIVE</span>
                </div>
              </div>

              {/* Day toggle pills */}
              <div className="day-toggle" style={{ display: "flex", gap: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 4 }}>
                {[30, 60, 90].map(d => (
                  <button key={d} onClick={() => setDays(d)} style={{
                    padding: "8px 18px", borderRadius: 10, border: "none", cursor: "pointer",
                    fontSize: 13, fontWeight: 800, transition: "all 0.25s ease",
                    background: days === d ? "linear-gradient(135deg, #818CF8, #A78BFA)" : "transparent",
                    color: days === d ? "#fff" : "rgba(255,255,255,0.4)",
                    boxShadow: days === d ? "0 4px 16px rgba(129,140,248,0.4)" : "none",
                  }}>{d}D</button>
                ))}
              </div>
            </div>

            {/* Stat pills row */}
            <div className="stat-pills" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
              <div className="stat-pill-item" style={{ minWidth: "calc(50% - 6px)" }}>
                <StatPill icon="🏆" label="LOWEST PRICE" value={`₹${data.lowest.price.toLocaleString("en-IN")}`} color="#34D399" />
              </div>
              <div className="stat-pill-item" style={{ minWidth: "calc(50% - 6px)" }}>
                <StatPill icon="🏪" label="BEST STORE" value={data.lowest.store} color="#818CF8" />
              </div>
              <div className="stat-pill-item" style={{ minWidth: "calc(50% - 6px)" }}>
                <StatPill icon="📅" label="DATE RECORDED" value={`${data.lowest.date} 2026`} color="#F472B6" />
              </div>
              <div className="stat-pill-item" style={{ minWidth: "calc(50% - 6px)" }}>
                <StatPill icon="📊" label="PRICE DROP" value={`₹${(maxP - minP).toLocaleString("en-IN")}`} color="#FB923C" />
              </div>
            </div>

            {/* Chart area */}
            <div className="chart-container" style={{
              background: "#060A14",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 20, padding: "24px 8px 8px",
              boxShadow: "inset 0 2px 20px rgba(0,0,0,0.4)",
            }}>
              <ResponsiveContainer width="100%" height={340}>
                <AreaChart data={data.data} margin={{ top: 10, right: 24, left: 10, bottom: 0 }}>
                  <defs>
                    {data.stores.map(store => {
                      const c = STORE_COLORS[store] || FALLBACK_COLOR;
                      return (
                        <linearGradient key={store} id={`grad-${store}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={c.line} stopOpacity={0.25} />
                          <stop offset="100%" stopColor={c.line} stopOpacity={0.01} />
                        </linearGradient>
                      );
                    })}
                  </defs>

                  <CartesianGrid strokeDasharray="4 8" stroke="rgba(255,255,255,0.05)" vertical={false} />

                  <XAxis
                    dataKey="date"
                    tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 700, fontFamily: "Nunito, sans-serif" }}
                    axisLine={{ stroke: "rgba(255,255,255,0.05)" }}
                    tickLine={false}
                    dy={8}
                  />

                  <YAxis
                    tickFormatter={formatY}
                    domain={[yMin, yMax]}
                    tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 700, fontFamily: "Nunito, sans-serif" }}
                    axisLine={false}
                    tickLine={false}
                    width={56}
                  />

                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ stroke: "rgba(255,255,255,0.08)", strokeWidth: 1.5, strokeDasharray: "4 4" }}
                    wrapperStyle={{ outline: "none" }}
                  />

                  {data.stores.map(store => {
                    const c = STORE_COLORS[store] || FALLBACK_COLOR;
                    return (
                      <Area
                        key={store}
                        type="monotoneX"
                        dataKey={store}
                        stroke={c.line}
                        strokeWidth={2.5}
                        fill={`url(#grad-${store})`}
                        dot={false}
                        activeDot={{ r: 5, fill: c.line, stroke: "#060A14", strokeWidth: 2, filter: `drop-shadow(0 0 6px ${c.line})` }}
                        isAnimationActive
                        animationDuration={900}
                        animationEasing="ease-out"
                      />
                    );
                  })}
                </AreaChart>
              </ResponsiveContainer>

              {/* Custom legend */}
              <CustomLegend stores={data.stores} />
              <div style={{ height: 16 }} />
            </div>

            {/* Bottom note */}
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", textAlign: "center", marginTop: 16, fontWeight: 600 }}>
              Price history builds automatically with every search · Data from Google Shopping India
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}
