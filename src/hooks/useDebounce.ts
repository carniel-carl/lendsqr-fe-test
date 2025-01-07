"use client";
import { useEffect, useState } from "react";

const useDebounce = <T>(val: T, delay = 1000) => {
  const [debounceVal, setDebounceVal] = useState(val);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceVal(val);
    }, delay);

    return () => clearTimeout(timer);
  }, [val, delay]);

  return debounceVal;
};

export default useDebounce;
