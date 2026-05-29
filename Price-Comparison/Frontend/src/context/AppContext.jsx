import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { getFavorites, removeFavorite, saveFavorite } from "../services/api";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const refreshFavorites = useCallback(async () => {
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch {
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    refreshFavorites();
  }, [refreshFavorites]);

  const addFavorite = async (product) => {
    try {
      const saved = await saveFavorite({
        title: product.title,
        price: product.price,
        url: product.url,
        image: product.image,
        source: product.source,
        numericPrice: product.numericPrice,
        rating: product.rating,
        availability: product.availability,
        inStock: product.inStock,
        delivery: product.delivery,
        discount: product.discount,
        details: product.details,
        marketplace: product.marketplace
      });
      setFavorites((current) => [saved, ...current]);
      toast.success("Saved to favorites");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not save favorite");
    }
  };

  const deleteFavorite = async (id) => {
    try {
      await removeFavorite(id);
      setFavorites((current) => current.filter((favorite) => favorite._id !== id));
      toast.success("Removed from favorites");
    } catch {
      toast.error("Could not remove favorite");
    }
  };

  const value = useMemo(
    () => ({ favorites, addFavorite, deleteFavorite, refreshFavorites }),
    [favorites, refreshFavorites]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
