import { useEffect, useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import { getPriceHistoryChart } from "../services/api";
import { priceNumber } from "../utils/formatPrice";
import { getStoreMeta } from "../utils/storeColors";

// Only these 5 stores with distinct colors
const STORE_COLORS = {
  Amazon: {
    line: "#FF9900",
    fill: "#FF990033",
    gradient: ["#FF9900", "#FFB84D"],
    icon: "📦",
  },
  Flipkart: {
    line: "#2874F0",
    fill: "#2874F033",
    gradient: ["#2874F0", "#5B9BD5"],
    icon: "🛒",
  },
  Cashify: {
    line: "#4CAF50",
    fill: "#4CAF5033",
    gradient: ["#4CAF50", "#81C784"],
    icon: "💵",
  },
  "Reliance Digital": {
    line: "#E91E63",
    fill: "#E91E6333",
    gradient: ["#E91E63", "#F06292"],
    icon: "🏬",
  },
  "Vijay Sales": {
    line: "#FF5722",
    fill: "#FF572233",
    gradient: ["#FF5722", "#FF8A65"],
    icon: "🏪",
  },
};

const getStoreColor = (storeName) => {
  return (
    STORE_COLORS[storeName] || {
      line: "#94A3B8",
      fill: "#94A3B833",
      gradient: ["#94A3B8", "#CBD5E1"],
      icon: "🏷️",
    }
  );
};

const formatRupee = (value) => {
  const num = Number(value || 0);
  if (!Number.isFinite(num)) return "₹0";
  if (num >= 100000) {
    return `₹${(num / 100000).toFixed(2)}L`;
  }
  return `₹${num.toLocaleString("en-IN")}`;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  const sortedPayload = [...payload]
    .filter((entry) => typeof entry.value === "number" && entry.value > 0)
    .sort((a, b) => a.value - b.value);

  if (sortedPayload.length === 0) return null;

  return (
    <div
      style={{
        background: "rgba(13, 20, 36, 0.98)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 16,
        padding: "16px 20px",
        minWidth: 220,
        boxShadow:
          "0 20px 40px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)",
      }}
    >
      <p
        style={{
          fontSize: 12,
          color: "rgba(255,255,255,0.4)",
          fontWeight: 700,
          letterSpacing: 1,
          marginBottom: 12,
          textTransform: "uppercase",
        }}
      >
        {label}
      </p>
      {sortedPayload.map((entry, idx) => {
        const color = getStoreColor(entry.name);
        const isCheapest = idx === 0 && sortedPayload.length > 1;
        const priceDiff = idx === 0 ? 0 : entry.value - sortedPayload[0].value;

        return (
          <div
            key={entry.name}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              marginBottom: 8,
              padding: "4px 0",
              borderBottom:
                idx < sortedPayload.length - 1
                  ? "1px solid rgba(255,255,255,0.05)"
                  : "none",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${color.gradient[0]}, ${color.gradient[1]})`,
                  boxShadow: `0 0 8px ${color.line}`,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  color: isCheapest ? "#fff" : "rgba(255,255,255,0.6)",
                  fontWeight: isCheapest ? 750 : 500,
                }}
              >
                {entry.name}
                {isCheapest && (
                  <span style={{ marginLeft: 4, fontSize: 14 }}>👑</span>
                )}
              </span>
            </div>
            <div style={{ textAlign: "right" }}>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: isCheapest ? "#34D399" : color.line,
                  display: "block",
                }}
              >
                {formatRupee(entry.value)}
              </span>
              {!isCheapest && priceDiff > 0 && (
                <span
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.3)",
                    display: "block",
                    marginTop: 2,
                  }}
                >
                  +{formatRupee(priceDiff)} more
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const CustomLegend = ({ stores, activeStores = [], onToggle }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      gap: 20,
      flexWrap: "wrap",
      paddingTop: 16,
    }}
  >
    {stores.map((store) => {
      const color = getStoreColor(store);
      const isActive = activeStores.includes(store);
      return (
        <div
          key={store}
          onClick={() => onToggle && onToggle(store)}
          className="legend-item"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            userSelect: "none",
            opacity: isActive ? 1 : 0.35,
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            padding: "4px 8px",
            borderRadius: 8,
            background: isActive ? "rgba(255,255,255,0.05)" : "transparent",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: isActive
                ? `linear-gradient(135deg, ${color.gradient[0]}, ${color.gradient[1]})`
                : "transparent",
              border: `2px solid ${color.line}`,
              boxShadow: isActive ? `0 0 8px ${color.line}` : "none",
              transition: "all 0.25s ease",
            }}
          />
          <span
            style={{
              fontSize: 12,
              color: isActive ? "#fff" : "rgba(255,255,255,0.4)",
              fontWeight: 700,
              letterSpacing: 0.5,
            }}
          >
            {color.icon} {store}
          </span>
        </div>
      );
    })}
  </div>
);

const StatPill = ({ icon, label, value, color }) => (
  <div
    className="stat-pill"
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 14,
      padding: "12px 16px",
      width: "100%",
      transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
    }}
  >
    <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
    <div style={{ minWidth: 0, flex: 1 }}>
      <div
        style={{
          fontSize: 9,
          color: "rgba(255,255,255,0.35)",
          fontWeight: 700,
          letterSpacing: 0.8,
          marginBottom: 2,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 800,
          color: color || "#fff",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {value}
      </div>
    </div>
  </div>
);

const buildCurrentSearchChart = (products = []) => {
  const byStore = new Map();

  // Only track the 5 stores we care about
  const allowedStores = [
    "Amazon",
    "Flipkart",
    "Cashify",
    "Reliance Digital",
    "Vijay Sales",
  ];

  products.forEach((product) => {
    const price = Number(product.numericPrice || priceNumber(product.price));
    if (!Number.isFinite(price) || price <= 0) return;

    const store = getStoreMeta(product.source).label;

    // Only include allowed stores
    if (!allowedStores.includes(store)) return;

    const current = byStore.get(store);
    if (!current || price < current.price) {
      byStore.set(store, { price, store });
    }
  });

  const stores = Array.from(byStore.keys());
  if (stores.length === 0) {
    return { stores: [], data: [], lowest: null };
  }

  const row = { date: "Today" };
  let lowest = { price: Number.MAX_SAFE_INTEGER, store: "", date: "Today" };

  stores.forEach((store) => {
    const item = byStore.get(store);
    row[store] = item.price;
    if (item.price < lowest.price) {
      lowest = { price: item.price, store, date: "Today" };
    }
  });

  return { stores, data: [row], lowest };
};

export default function PriceHistoryChart({ query, products = [] }) {
  const [chart, setChart] = useState({ stores: [], data: [], lowest: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeStores, setActiveStores] = useState([]);
  const [searchInput, setSearchInput] = useState(query || "");
  const [debouncedQuery, setDebouncedQuery] = useState(query || "");
  const [chartError, setChartError] = useState(false);

  // Sync searchInput with query prop
  useEffect(() => {
    if (query && query !== searchInput) {
      setSearchInput(query);
    }
  }, [query]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = searchInput.trim();
      setDebouncedQuery(trimmed);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch price history data
  useEffect(() => {
    const trimmed = debouncedQuery?.trim();

    if (!trimmed) {
      setChart({ stores: [], data: [], lowest: null });
      setActiveStores([]);
      setChartError(false);
      return;
    }

    let active = true;
    setLoading(true);
    setError("");
    setChartError(false);

    getPriceHistoryChart(trimmed)
      .then((payload) => {
        if (!active) return;

        if (
          payload &&
          Array.isArray(payload.stores) &&
          Array.isArray(payload.data)
        ) {
          // Validate data has price variations
          const hasPriceVariation = payload.data.some((row, index) => {
            if (index === 0) return false;
            const prevRow = payload.data[index - 1];
            return payload.stores.some((store) => {
              return row[store] !== prevRow[store] && row[store] != null;
            });
          });

          setChart(payload);
          setActiveStores(payload.stores || []);

          if (!hasPriceVariation && payload.data.length > 1) {
            setError("Prices have remained constant during this period");
          }
        } else {
          throw new Error("Invalid response format");
        }
      })
      .catch((requestError) => {
        if (!active) return;

        const fallbackChart = buildCurrentSearchChart(products);
        setChart(fallbackChart);
        setActiveStores(fallbackChart.stores || []);
        setChartError(true);
        setError(
          requestError.response?.data?.message ||
            requestError.message ||
            "Could not load price history",
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [debouncedQuery, products]);

  // Calculate display chart
  const displayChart = useMemo(() => {
    if (chart && chart.data && chart.data.length > 0) {
      return chart;
    }
    if (products && products.length > 0) {
      return buildCurrentSearchChart(products);
    }
    return { stores: [], data: [], lowest: null };
  }, [chart, products]);

  // Sync active stores
  useEffect(() => {
    if (!displayChart?.stores?.length) {
      if (activeStores.length > 0) setActiveStores([]);
      return;
    }

    if (activeStores.length === 0) {
      setActiveStores(displayChart.stores);
      return;
    }

    const validStores = activeStores.filter((store) =>
      displayChart.stores.includes(store),
    );

    if (validStores.length === 0) {
      setActiveStores(displayChart.stores);
    } else if (validStores.length !== activeStores.length) {
      setActiveStores(validStores);
    }
  }, [displayChart.stores]);

  // Handle store toggle
  const handleToggleStore = useCallback(
    (store) => {
      setActiveStores((prev) => {
        if (prev.includes(store)) {
          if (prev.length <= 1) {
            return [...displayChart.stores];
          }
          return prev.filter((s) => s !== store);
        } else {
          return [...prev, store];
        }
      });
    },
    [displayChart.stores],
  );

  // Filter valid chart data
  const validChartData = useMemo(() => {
    if (!displayChart?.data) return [];
    return displayChart.data.filter((row) => {
      return activeStores.some((store) => {
        const value = row[store];
        return typeof value === "number" && !isNaN(value) && value > 0;
      });
    });
  }, [displayChart.data, activeStores]);

  // Calculate price statistics
  const allPrices = useMemo(() => {
    return validChartData.flatMap((row) =>
      activeStores
        .map((store) => row[store])
        .filter(
          (price) => typeof price === "number" && !isNaN(price) && price > 0,
        ),
    );
  }, [validChartData, activeStores]);

  const hasChartData =
    activeStores.length > 0 &&
    validChartData.length > 0 &&
    allPrices.length > 0;
  const minPrice = hasChartData ? Math.min(...allPrices) : 0;
  const maxPrice = hasChartData ? Math.max(...allPrices) : 0;
  const priceSpread = maxPrice - minPrice;

  const yPad = Math.max(priceSpread * 0.2, 500);

  let roundFactor = 5000;
  if (maxPrice < 2000) roundFactor = 100;
  else if (maxPrice < 5000) roundFactor = 500;
  else if (maxPrice < 15000) roundFactor = 1000;
  else if (maxPrice < 50000) roundFactor = 2000;

  const yMin = Math.max(
    0,
    Math.floor((minPrice - yPad) / roundFactor) * roundFactor,
  );
  const yMax = Math.ceil((maxPrice + yPad) / roundFactor) * roundFactor;

  const formatY = (value) => {
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
    return `₹${value}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{
        maxWidth: "100%",
        overflow: "hidden",
        fontFamily: "Nunito, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .stat-pill:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.15) !important;
          background: rgba(255, 255, 255, 0.05) !important;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        }
        .legend-item:hover {
          transform: scale(1.05);
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @media (max-width: 640px) {
          .chart-card { padding: 16px 14px !important; }
          .chart-header { flex-direction: column !important; align-items: flex-start !important; }
          .chart-title { font-size: 18px !important; }
          .stat-pills { flex-direction: column !important; }
          .chart-container { padding: 16px 4px 4px !important; }
        }
      `}</style>

      <div style={{ margin: "0 auto" }}>
        <div
          style={{
            background: "linear-gradient(160deg, #0D1424 0%, #080C17 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 28,
            overflow: "hidden",
            boxShadow:
              "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          {/* Top gradient bar with store colors */}
          <div
            style={{
              height: 3,
              background:
                "linear-gradient(90deg, #FF9900, #2874F0, #4CAF50, #E91E63, #FF5722)",
            }}
          />

          <div className="chart-card" style={{ padding: "32px 36px" }}>
            {/* Header */}
            <div
              className="chart-header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 28,
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "linear-gradient(135deg, #FF9900, #E91E63)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      boxShadow: "0 4px 16px rgba(255,153,0,0.4)",
                    }}
                  >
                    📈
                  </div>
                  <h2
                    className="chart-title"
                    style={{
                      fontSize: 22,
                      fontWeight: 900,
                      color: "#fff",
                      letterSpacing: -0.5,
                    }}
                  >
                    Price History
                  </h2>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,0.35)",
                      fontWeight: 600,
                    }}
                  >
                    {debouncedQuery ? `"${debouncedQuery}"` : "No product"}
                  </span>
                  <span
                    className={loading ? "pulse" : ""}
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: loading
                        ? "#FBBF24"
                        : chartError
                          ? "#EF4444"
                          : "#34D399",
                      letterSpacing: 1,
                      background: loading
                        ? "rgba(251,191,36,0.1)"
                        : chartError
                          ? "rgba(239,68,68,0.1)"
                          : "rgba(52,211,153,0.1)",
                      border: `1px solid ${
                        loading
                          ? "rgba(251,191,36,0.25)"
                          : chartError
                            ? "rgba(239,68,68,0.25)"
                            : "rgba(52,211,153,0.25)"
                      }`,
                      padding: "2px 8px",
                      borderRadius: 20,
                    }}
                  >
                    {loading ? "LOADING" : chartError ? "FALLBACK" : "LIVE"}
                  </span>
                </div>
              </div>

              {/* Store comparison info */}
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 12,
                  padding: "8px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.4)",
                    fontWeight: 600,
                  }}
                >
                  Comparing:
                </span>
                <span
                  style={{ fontSize: 11, color: "#FF9900", fontWeight: 800 }}
                >
                  {displayChart.stores.length} stores
                </span>
              </div>
            </div>

            {/* Stats Pills */}
            <div
              className="stat-pills"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 12,
                marginBottom: 28,
              }}
            >
              <StatPill
                icon="🏆"
                label="LOWEST PRICE"
                value={
                  displayChart.lowest
                    ? formatRupee(displayChart.lowest.price)
                    : "No data"
                }
                color="#34D399"
              />
              <StatPill
                icon="🏪"
                label="BEST STORE"
                value={displayChart.lowest?.store || "No store"}
                color="#FF9900"
              />
              <StatPill
                icon="📅"
                label="DATE RECORDED"
                value={displayChart.lowest?.date || "No date"}
                color="#E91E63"
              />
              <StatPill
                icon="📊"
                label="PRICE SPREAD"
                value={hasChartData ? formatRupee(priceSpread) : "No data"}
                color="#FF5722"
              />
            </div>

            {/* Chart Container */}
            <div
              className="chart-container"
              style={{
                background: "#060A14",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: 20,
                padding: "24px 8px 8px",
                boxShadow: "inset 0 2px 20px rgba(0,0,0,0.4)",
              }}
            >
              {hasChartData ? (
                <ResponsiveContainer width="100%" height={340}>
                  <AreaChart
                    data={validChartData}
                    margin={{ top: 10, right: 24, left: 10, bottom: 0 }}
                  >
                    <defs>
                      {displayChart.stores.map((store) => {
                        const color = getStoreColor(store);
                        return (
                          <linearGradient
                            key={store}
                            id={`grad-${store.replace(/\s+/g, "-")}`}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor={color.gradient[0]}
                              stopOpacity={0.25}
                            />
                            <stop
                              offset="100%"
                              stopColor={color.gradient[1]}
                              stopOpacity={0.02}
                            />
                          </linearGradient>
                        );
                      })}
                    </defs>

                    <CartesianGrid
                      strokeDasharray="4 8"
                      stroke="rgba(255,255,255,0.05)"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="date"
                      tick={{
                        fill: "rgba(255,255,255,0.3)",
                        fontSize: 11,
                        fontWeight: 700,
                        fontFamily: "Nunito, sans-serif",
                      }}
                      axisLine={{ stroke: "rgba(255,255,255,0.05)" }}
                      tickLine={false}
                      dy={8}
                    />

                    <YAxis
                      tickFormatter={formatY}
                      domain={[yMin, yMax]}
                      tick={{
                        fill: "rgba(255,255,255,0.3)",
                        fontSize: 11,
                        fontWeight: 700,
                        fontFamily: "Nunito, sans-serif",
                      }}
                      axisLine={false}
                      tickLine={false}
                      width={56}
                    />

                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{
                        stroke: "rgba(255,255,255,0.1)",
                        strokeWidth: 1.5,
                        strokeDasharray: "4 4",
                      }}
                      wrapperStyle={{ outline: "none" }}
                    />

                    {/* Reference line for lowest price */}
                    {displayChart.lowest && (
                      <ReferenceLine
                        y={displayChart.lowest.price}
                        stroke="#34D399"
                        strokeDasharray="3 3"
                        strokeOpacity={0.5}
                        label={{
                          value: `Lowest: ${formatRupee(displayChart.lowest.price)}`,
                          fill: "#34D399",
                          fontSize: 10,
                          fontWeight: 700,
                          position: "right",
                        }}
                      />
                    )}

                    {displayChart.stores.map((store) => {
                      if (!activeStores.includes(store)) return null;
                      const color = getStoreColor(store);
                      const isSinglePoint = validChartData.length === 1;

                      return (
                        <Area
                          key={store}
                          type="monotone"
                          dataKey={store}
                          stroke={color.line}
                          strokeWidth={2.5}
                          fill={`url(#grad-${store.replace(/\s+/g, "-")})`}
                          dot={isSinglePoint || validChartData.length <= 3}
                          activeDot={{
                            r: 6,
                            fill: color.line,
                            stroke: "#060A14",
                            strokeWidth: 2,
                            filter: `drop-shadow(0 0 6px ${color.line})`,
                          }}
                          isAnimationActive
                          animationDuration={1200}
                          animationEasing="ease-in-out"
                          connectNulls={false}
                        />
                      );
                    })}
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div
                  style={{
                    height: 340,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: 12,
                    color: "rgba(255,255,255,0.38)",
                    fontWeight: 800,
                    textAlign: "center",
                    padding: 24,
                  }}
                >
                  <span style={{ fontSize: 48, opacity: 0.3 }}>📊</span>
                  <div>
                    {loading
                      ? "Loading price history..."
                      : error || "Search once to start building price history"}
                  </div>
                  {!loading && products.length > 0 && (
                    <div style={{ fontSize: 12, opacity: 0.5 }}>
                      Found {products.length} current results
                    </div>
                  )}
                </div>
              )}

              {hasChartData && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                    gap: 10,
                    marginTop: 20,
                    padding: "16px 0",
                  }}
                >
                  {displayChart.stores.map((store) => {
                    const color = getStoreColor(store);
                    const isActive = activeStores.includes(store);
                    return (
                      <div
                        key={store}
                        onClick={() => handleToggleStore(store)}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 8,
                          padding: "12px",
                          borderRadius: 12,
                          background: isActive
                            ? `linear-gradient(135deg, ${color.gradient[0]}22, ${color.gradient[1]}22)`
                            : "rgba(255,255,255,0.02)",
                          border: `2px solid ${isActive ? color.line : "rgba(255,255,255,0.1)"}`,
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          opacity: isActive ? 1 : 0.4,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = isActive
                            ? `linear-gradient(135deg, ${color.gradient[0]}33, ${color.gradient[1]}33)`
                            : "rgba(255,255,255,0.05)";
                          e.currentTarget.style.borderColor = color.line;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = isActive
                            ? `linear-gradient(135deg, ${color.gradient[0]}22, ${color.gradient[1]}22)`
                            : "rgba(255,255,255,0.02)";
                          e.currentTarget.style.borderColor = isActive
                            ? color.line
                            : "rgba(255,255,255,0.1)";
                        }}
                      >
                        <span style={{ fontSize: 24 }}>{color.icon}</span>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 800,
                            color: isActive
                              ? color.line
                              : "rgba(255,255,255,0.5)",
                            textAlign: "center",
                          }}
                        >
                          {store}
                        </span>
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: color.line,
                            opacity: isActive ? 1 : 0.3,
                            boxShadow: isActive
                              ? `0 0 8px ${color.line}`
                              : "none",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
              <div style={{ height: 16 }} />
            </div>

            <p
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.2)",
                textAlign: "center",
                marginTop: 16,
                fontWeight: 600,
              }}
            >
              {chartError
                ? "⚠️ Showing current prices (history unavailable)"
                : `Comparing prices across 5 major stores • ${validChartData.length} data points`}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
