import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

const useFavorites = () => useContext(AppContext);

export default useFavorites;
