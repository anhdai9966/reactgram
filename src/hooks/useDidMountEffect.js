import { useEffect, useRef } from "react";

const useDidMountEffect = (handler, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) handler();
    else didMount.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useDidMountEffect;
