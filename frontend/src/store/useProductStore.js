import { create } from "zustand";
import { persist } from "zustand/middleware";
import hoodies from "../data/hoodies.json";
import tshirts from "../data/tshirts.json";

export const useProductStore = create(
  persist(
    (set) => ({
      hoodies: hoodies,
      tshirts: tshirts,
    }),
    { name: "product-store" }
  )
);
