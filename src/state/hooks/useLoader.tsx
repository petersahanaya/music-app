"use client";

import { useEffect } from "react";
import { useLoaderUI } from "../store/loading";

const useLoader = () => {
  const onPressedToggleLoader = useLoaderUI(
    (state) => state.onPressedToggleLoader
  );

  useEffect(() => {
    onPressedToggleLoader();
  }, []);
  return;
};

export default useLoader;
