// const axios = require("axios");

// const SERPAPI_ENDPOINT = "https://serpapi.com/search.json";

// const INDIA_STORE_PATTERNS = [
//   /amazon(\.in|\s*india)?/i,
//   /flipkart/i,
//   /croma/i,
//   /reliance\s*digital/i,
//   /jiomart/i,
//   /vijay\s*sales/i,
//   /tata\s*cliq|tatacliq/i,
//   /myntra/i,
//   /ajio/i,
//   /nykaa/i,
//   /meesho/i,
//   /snapdeal/i,
//   /shopclues/i,
//   /paytm\s*mall/i,
//   /bigbasket/i,
//   /blinkit/i,
//   /cashify/i,
//   /ondc/i,
//   /93mobiles/i,
//   /budli/i,
//   /national\s*mobile/i,
//   /poorvika/i,
//   /sathya/i,
//   /sangeetha/i,
//   /firstcry/i,
//   /pepperfry/i,
//   /lenskart/i,
//   /vlebazaar/i,
//   /indiamart/i,
//   /moglix/i,
//   /boat/i,
//   /zebronics/i,
//   /noise/i
// ];

// const QUERY_STOPWORDS = new Set([
//   "buy",
//   "online",
//   "india",
//   "indian",
//   "price",
//   "prices",
//   "under",
//   "below",
//   "above",
//   "best",
//   "new",
//   "latest",
//   "offer",
//   "offers",
//   "deal",
//   "deals",
//   "for",
//   "with",
//   "and",
//   "or",
//   "the"
// ]);

// const parsePrice = (price) => {
//   if (typeof price !== "string") return Number.MAX_SAFE_INTEGER;
//   const value = Number(price.replace(/[^0-9.]/g, ""));
//   return Number.isFinite(value) && value > 0 ? value : Number.MAX_SAFE_INTEGER;
// };

// const titleCase = (value) =>
//   value
//     .split(/\s+/)
//     .filter(Boolean)
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");

// const cleanDomainStore = (store) => {
//   const cleaned = store
//     .replace(/^https?:\/\//i, "")
//     .replace(/^www\./i, "")
//     .replace(/\.(co\.in|com|in|net|org)(\/.*)?$/i, "")
//     .replace(/[-_.]+/g, " ")
//     .replace(/\s+/g, " ")
//     .trim();

//   return cleaned ? titleCase(cleaned) : store;
// };

// const cleanStoreName = (item) => {
//   const store = item.source || item.merchant || item.seller || "Google Shopping";
//   if (/amazon/i.test(store)) return "Amazon";
//   if (/flipkart/i.test(store)) return "Flipkart";
//   if (/croma/i.test(store)) return "Croma";
//   if (/reliance/i.test(store)) return "Reliance Digital";
//   if (/vijay/i.test(store)) return "Vijay Sales";
//   if (/tatacliq|tata cliq/i.test(store)) return "Tata CLiQ";
//   if (/\.(co\.in|com|in|net|org)/i.test(store)) return cleanDomainStore(store);
//   return store.length > 28 ? cleanDomainStore(store) : store;
// };

// const normalizeText = (value = "") => value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

// const queryTokens = (query) =>
//   normalizeText(query)
//     .split(" ")
//     .filter((token) => token.length > 1 && !QUERY_STOPWORDS.has(token) && !/^\d{4,6}$/.test(token));

// const isRelevantToQuery = (item, query) => {
//   const tokens = queryTokens(query);
//   if (tokens.length === 0) return true;

//   const title = normalizeText(item.title || "");
//   const matched = tokens.filter((token) => title.includes(token));

//   if (tokens.length === 1) return matched.length === 1;
//   return matched.length / tokens.length >= 0.7;
// };

// const getHostname = (value = "") => {
//   try {
//     return new URL(value).hostname.replace(/^www\./, "");
//   } catch {
//     return "";
//   }
// };

// const isGoogleHost = (host = "") => /(^|\.)google\./i.test(host);

// const isIndiaStore = (item) => {
//   const linkHost = getHostname(item.link);
//   const productHost = getHostname(item.product_link);
//   const haystack = [item.source, item.merchant, item.seller, linkHost, productHost]
//     .filter(Boolean)
//     .join(" ");

//   if ((/\.in$/i.test(linkHost) && !isGoogleHost(linkHost)) || (/\.in$/i.test(productHost) && !isGoogleHost(productHost))) return true;
//   return INDIA_STORE_PATTERNS.some((pattern) => pattern.test(haystack));
// };

// const bestProductUrl = (item) => {
//   const candidates = [item.link, item.product_link].filter(Boolean);
//   return candidates.find((url) => !isGoogleHost(getHostname(url))) || item.product_link || item.link || "#";
// };

// const normalizeSerpItem = (item, index) => {
//   const rating = Number(item.rating || item.extracted_rating || 0);
//   const source = cleanStoreName(item);
//   const price = item.price || (item.extracted_price ? `Rs. ${Number(item.extracted_price).toLocaleString("en-IN")}` : "Price unavailable");
//   const extensions = Array.isArray(item.extensions) ? item.extensions : [];

//   return {
//     id: `serp-${item.product_id || index}`,
//     title: item.title || "Untitled Google Shopping result",
//     price,
//     numericPrice: item.extracted_price || parsePrice(price),
//     currency: "INR",
//     url: bestProductUrl(item),
//     linkLabel: isGoogleHost(getHostname(bestProductUrl(item))) ? "View on Google Shopping" : `Buy on ${source}`,
//     image: item.thumbnail || "",
//     source,
//     rating: rating || null,
//     availability: item.availability || "Check store",
//     inStock: !/out of stock|unavailable/i.test(item.availability || ""),
//     delivery: item.delivery || item.shipping || "Delivery varies",
//     discount: extensions.find((extension) => /off|sale|discount|cashback|bank/i.test(extension)) || "",
//     details: item.snippet || extensions.slice(0, 3).join(" | "),
//     marketplace: "Google Shopping India",
//     rawSource: "serpapi"
//   };
// };

// const searchSerpApi = async (query) => {
//   const apiKey = process.env.SERPAPI_KEY;
//   if (!apiKey) {
//     throw new Error("SERPAPI_KEY is missing");
//   }

//   const { data } = await axios.get(SERPAPI_ENDPOINT, {
//     params: {
//       engine: "google_shopping",
//       q: `${query} amazon flipkart croma reliance price India`,
//       google_domain: "google.co.in",
//       gl: "in",
//       hl: "en",
//       location: "India",
//       api_key: apiKey
//     },
//     timeout: 10000
//   });

//   return (data.shopping_results || [])
//     .filter((item) => isIndiaStore(item))
//     .filter((item) => isRelevantToQuery(item, query))
//     .slice(0, 30)
//     .map(normalizeSerpItem);
// };

// module.exports = searchSerpApi;


const axios = require("axios");

const SERPAPI_ENDPOINT = "https://serpapi.com/search.json";

// ─── Store Patterns ──────────────────────────────────────────────────────────
const INDIA_STORE_PATTERNS = [
  /amazon(\.in|\s*india)?/i,
  /flipkart/i,
  /croma/i,
  /reliance\s*digital/i,
  /jiomart/i,
  /vijay\s*sales/i,
  /tata\s*cliq|tatacliq/i,
  /myntra/i,
  /ajio/i,
  /nykaa/i,
  /meesho/i,
  /snapdeal/i,
  /shopclues/i,
  /paytm\s*mall/i,
  /bigbasket/i,
  /blinkit/i,
  /cashify/i,
  /ondc/i,
  /93mobiles/i,
  /budli/i,
  /national\s*mobile/i,
  /poorvika/i,
  /sathya/i,
  /sangeetha/i,
  /firstcry/i,
  /pepperfry/i,
  /lenskart/i,
  /vlebazaar/i,
  /indiamart/i,
  /moglix/i,
  /boat/i,
  /zebronics/i,
  /noise/i,
  // ✅ NEW: Added more Indian retailers
  /shopsy/i,
  /smartprix/i,
  /byjus/i,
  /bewakoof/i,
  /tatadigital/i,
  /decathlon/i,
  /ikea/i,
  /zivame/i,
  /clovia/i,
  /urbanic/i,
  /hamley/i,
  /hamleys/i,
  /crossword/i,
  /landmark/i,
  /naaptol/i,
  /homeshop18/i,
  /industrybuying/i,
  /tools?dunia/i,
  /toolsvilla/i,
  /daraz/i,
  /shiprocket/i,
];

const QUERY_STOPWORDS = new Set([
  "buy", "online", "india", "indian", "price", "prices",
  "under", "below", "above", "best", "new", "latest",
  "offer", "offers", "deal", "deals", "for", "with", "and", "or", "the",
]);

// ─── Helpers ─────────────────────────────────────────────────────────────────
const parsePrice = (price) => {
  if (typeof price !== "string") return Number.MAX_SAFE_INTEGER;
  const value = Number(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(value) && value > 0 ? value : Number.MAX_SAFE_INTEGER;
};

const titleCase = (value) =>
  value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const cleanDomainStore = (store) => {
  const cleaned = store
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\.(co\.in|com|in|net|org)(\/.*)?$/i, "")
    .replace(/[-_.]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned ? titleCase(cleaned) : store;
};

const cleanStoreName = (item) => {
  const store = item.source || item.merchant || item.seller || "Google Shopping";
  if (/amazon/i.test(store)) return "Amazon";
  if (/flipkart/i.test(store)) return "Flipkart";
  if (/croma/i.test(store)) return "Croma";
  if (/reliance/i.test(store)) return "Reliance Digital";
  if (/vijay/i.test(store)) return "Vijay Sales";
  if (/tatacliq|tata cliq/i.test(store)) return "Tata CLiQ";
  if (/shopsy/i.test(store)) return "Shopsy";
  if (/meesho/i.test(store)) return "Meesho";
  if (/snapdeal/i.test(store)) return "Snapdeal";
  if (/myntra/i.test(store)) return "Myntra";
  if (/jiomart/i.test(store)) return "JioMart";
  if (/\.(co\.in|com|in|net|org)/i.test(store)) return cleanDomainStore(store);
  return store.length > 28 ? cleanDomainStore(store) : store;
};

const normalizeText = (value = "") =>
  value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

const queryTokens = (query) =>
  normalizeText(query)
    .split(" ")
    .filter((token) => token.length > 1 && !QUERY_STOPWORDS.has(token) && !/^\d{4,6}$/.test(token));

// ✅ RELAXED: Dropped threshold from 0.7 → 0.5, and 1-token queries always pass
const isRelevantToQuery = (item, query) => {
  const tokens = queryTokens(query);
  if (tokens.length === 0) return true;

  const title = normalizeText(item.title || "");
  const matched = tokens.filter((token) => title.includes(token));

  if (tokens.length <= 2) return matched.length >= 1;       // At least 1 token matches
  return matched.length / tokens.length >= 0.5;             // 50% match (was 70%)
};

const getHostname = (value = "") => {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

const isGoogleHost = (host = "") => /(^|\.)google\./i.test(host);

// ✅ RELAXED: Also accept .in TLD on the link itself even without store-pattern match
const isIndiaStore = (item) => {
  const linkHost = getHostname(item.link);
  const productHost = getHostname(item.product_link);
  const haystack = [item.source, item.merchant, item.seller, linkHost, productHost]
    .filter(Boolean)
    .join(" ");

  // .in TLD domains (excluding google.co.in itself)
  if (/\.in$/i.test(linkHost) && !isGoogleHost(linkHost)) return true;
  if (/\.in$/i.test(productHost) && !isGoogleHost(productHost)) return true;

  // ✅ NEW: co.in TLD check
  if (/\.co\.in$/i.test(linkHost)) return true;
  if (/\.co\.in$/i.test(productHost)) return true;

  return INDIA_STORE_PATTERNS.some((pattern) => pattern.test(haystack));
};

const bestProductUrl = (item) => {
  const candidates = [item.link, item.product_link].filter(Boolean);
  return (
    candidates.find((url) => !isGoogleHost(getHostname(url))) ||
    item.product_link ||
    item.link ||
    "#"
  );
};

// ✅ NEW: Stable dedup key — by product_id, then title+price fingerprint
const dedupKey = (item) => {
  if (item.product_id) return `pid:${item.product_id}`;
  const title = normalizeText(item.title || "").slice(0, 60);
  const price = String(item.extracted_price || "");
  return `fp:${title}|${price}`;
};

const normalizeSerpItem = (item, index) => {
  const rating = Number(item.rating || item.extracted_rating || 0);
  const source = cleanStoreName(item);
  const price =
    item.price ||
    (item.extracted_price
      ? `₹${Number(item.extracted_price).toLocaleString("en-IN")}`
      : "Price unavailable");
  const extensions = Array.isArray(item.extensions) ? item.extensions : [];

  return {
    id: `serp-${item.product_id || index}`,
    title: item.title || "Untitled Google Shopping result",
    price,
    numericPrice: item.extracted_price || parsePrice(price),
    currency: "INR",
    url: bestProductUrl(item),
    linkLabel: isGoogleHost(getHostname(bestProductUrl(item)))
      ? "View on Google Shopping"
      : `Buy on ${source}`,
    image: item.thumbnail || "",
    source,
    rating: rating || null,
    availability: item.availability || "Check store",
    inStock: !/out of stock|unavailable/i.test(item.availability || ""),
    delivery: item.delivery || item.shipping || "Delivery varies",
    discount:
      extensions.find((ext) =>
        /off|sale|discount|cashback|bank/i.test(ext)
      ) || "",
    details: item.snippet || extensions.slice(0, 3).join(" | "),
    marketplace: "Google Shopping India",
    rawSource: "serpapi",
  };
};

// ─── Core Fetch ───────────────────────────────────────────────────────────────
/**
 * Fetch one page of Google Shopping results.
 * @param {string} query  - Search query (clean, no store suffixes)
 * @param {number} start  - Pagination offset (0, 20, 40 …)
 */
const fetchPage = async (query, start = 0) => {
  const apiKey = process.env.SERPAPI_KEY;
  if (!apiKey) throw new Error("SERPAPI_KEY is missing");

  const { data } = await axios.get(SERPAPI_ENDPOINT, {
    params: {
      engine: "google_shopping",
      q: query,                   // ✅ Clean query — no store names appended
      google_domain: "google.co.in",
      gl: "in",
      hl: "en",
      location: "India",
      num: 40,                    // ✅ Fetch 40 per page (SerpAPI max for shopping)
      start,                      // ✅ Pagination offset
      api_key: apiKey,
    },
    timeout: 12000,
  });

  return data.shopping_results || [];
};

// ─── Query Variants ───────────────────────────────────────────────────────────
/**
 * Build multiple query variants from the base query to maximize coverage.
 * Each variant targets a different angle (store, category, price range).
 */
const buildQueryVariants = (query) => {
  const base = query.trim();
  return [
    base,                               // Original query
    `${base} buy online India`,         // Purchase intent
    `${base} price flipkart amazon`,    // Explicit store targeting
    `${base} site:flipkart.com OR site:amazon.in`, // Direct site targeting
  ];
};

// ─── Main Export ──────────────────────────────────────────────────────────────
/**
 * Search SerpAPI for Indian store product listings.
 *
 * Strategy:
 *  1. Run multiple query variants in parallel for breadth.
 *  2. For each variant, fetch page 1 + page 2 (pagination) for depth.
 *  3. Flatten → filter India stores → filter relevance → deduplicate → sort by price.
 *
 * @param {string}  query         - Product search query
 * @param {object}  options
 * @param {number}  options.maxResults   - Max products to return (default 60)
 * @param {boolean} options.paginate     - Fetch page 2 as well (default true)
 * @param {boolean} options.multiQuery   - Run query variants (default true)
 */
const searchSerpApi = async (query, options = {}) => {
  const {
    maxResults = 60,        // ✅ Increased from 30 → 60
    paginate = true,        // ✅ Fetch 2 pages per query
    multiQuery = true,      // ✅ Run multiple query variants
  } = options;

  const queries = multiQuery ? buildQueryVariants(query) : [query];

  // Build all (query, page) pairs
  const fetchJobs = [];
  for (const q of queries) {
    fetchJobs.push({ query: q, start: 0 });
    if (paginate) {
      fetchJobs.push({ query: q, start: 40 }); // Page 2
    }
  }

  // ✅ Run all fetches in parallel with per-call error isolation
  const settled = await Promise.allSettled(
    fetchJobs.map(({ query: q, start }) =>
      fetchPage(q, start).catch((err) => {
        console.warn(`[SerpAPI] Failed: q="${q}" start=${start} — ${err.message}`);
        return []; // Return empty on failure so other calls still succeed
      })
    )
  );

  const allRaw = settled.flatMap((result) =>
    result.status === "fulfilled" ? result.value : []
  );

  // ✅ Filter → Deduplicate → Sort
  const seen = new Set();
  const results = [];

  for (const item of allRaw) {
    if (!isIndiaStore(item)) continue;
    if (!isRelevantToQuery(item, query)) continue;

    const key = dedupKey(item);
    if (seen.has(key)) continue;
    seen.add(key);

    results.push(item);
  }

  // Sort by price ascending, unavailable prices go to bottom
  results.sort((a, b) => {
    const pa = a.extracted_price || parsePrice(a.price);
    const pb = b.extracted_price || parsePrice(b.price);
    return pa - pb;
  });

  return results
    .slice(0, maxResults)
    .map(normalizeSerpItem);
};

module.exports = searchSerpApi;
