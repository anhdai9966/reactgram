import { useCallback, useLayoutEffect, useRef, useState } from "react";

function useElementSize() {
  const ref = useRef();
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });
  // Handler to call on window resize
  // Prevent too many rendering using useCallback
  const handleResize = useCallback(() => {
    // Set window width/height to state
    setSize({
      width: ref?.current.offsetWidth || 0,
      height: ref?.current.offsetHeight || 0,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.current]);

  useLayoutEffect(() => {
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.current]); // Empty array ensures that effect is only run on mount
  return [size, ref];
}

export default useElementSize;
