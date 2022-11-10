// import { useLayoutEffect } from "react";

// function useLockBodyScroll() {
//   useLayoutEffect(() => {
//     //get original value of body
//     const originalStyle = window.getComputedStyle(document.body).overflow;
//     //prevent scrolling on mount
//     document.body.style.overflow = "hidden";
//     // re-enable scrolling when component unmounts
//     return () => (document.body.style.overflow = originalStyle);
//   }, [] /*empty array to ensures effect is only run when mount and unmount*/);
// }

// export default useLockBodyScroll

import { useEffect, useLayoutEffect, useState } from "react";

function useLockedBody(
  initialLocked = false,
  rootId = "___gatsby" // Default to `___gatsby` to not introduce breaking change
) {
  const [locked, setLocked] = useState(initialLocked);

  // Do the side effect before render
  useLayoutEffect(() => {
    if (!locked) {
      return;
    }

    // Save initial body style
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Lock body scroll
    document.body.style.overflow = "hidden";

    // Get the scrollBar width
    const root = document.getElementById(rootId); // or root
    const scrollBarWidth = root ? root.offsetWidth - root.scrollWidth : 0;

    // Avoid width reflow
    if (scrollBarWidth) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;

      if (scrollBarWidth) {
        document.body.style.paddingRight = originalPaddingRight;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locked]);

  // Update state if initialValue changes
  useEffect(() => {
    if (locked !== initialLocked) {
      setLocked(initialLocked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLocked]);

  return [locked, setLocked];
}

export default useLockedBody;
