import { useCallback, useState } from "react";

function useBoolean(defaultState) {
  const [state, setState] = useState(!!defaultState);

  const setTrue = useCallback(() => setState(true), []);
  const setFalse = useCallback(() => setState(false), []);
  const toggle = useCallback(() => setState((state) => !state), []);

  return { state, setState, setTrue, setFalse, toggle };
}

export default useBoolean;
