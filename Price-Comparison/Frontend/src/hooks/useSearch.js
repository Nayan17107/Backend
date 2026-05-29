import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { searchProducts } from "../services/api";
import useDebounce from "./useDebounce";

const useSearch = (query) => {
  const debouncedQuery = useDebounce(query, 300);
  const [data, setData] = useState({ products: [], count: 0, query: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const trimmed = debouncedQuery.trim();
    if (!trimmed) {
      setData({ products: [], count: 0, query: "" });
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError("");

    searchProducts(trimmed)
      .then((payload) => {
        setData(payload);
        if (payload.errors?.length && !payload.products?.length) {
          toast.error("One store could not respond, showing available results.");
        }
      })
      .catch((requestError) => {
        const message = requestError.response?.data?.message || "Search failed. Check your API keys and server.";
        setError(message);
        toast.error(message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [debouncedQuery]);

  return useMemo(() => ({ data, loading, error }), [data, loading, error]);
};

export default useSearch;
