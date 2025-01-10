import { ReactNode, useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ children }: { children: ReactNode }) => {
  const Location = useLocation();

  useLayoutEffect(() => {
    if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1));
      if (elem) {
        let rect = elem.getBoundingClientRect();
        window.scrollTo({
          top: rect.top + window.scrollY - 130,
          behavior: "smooth",
        });
      }
      return;
    } else {
      window.scrollTo(0, 0);
      return;
    }
  }, [Location]);

  return <>{children}</>;
};

export default ScrollToTop;
