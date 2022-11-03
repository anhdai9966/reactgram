import { useCallback, useState } from "react";

// Parameter is the boolean, with default "false" value
function useToggle(initialState) {
  // Initialize the state
  const [state, setState] = useState(!!initialState);

  // Define and memorize toggler function in case we pass down the component,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback(() => setState((state) => !state), []);

  return [state, toggle];
}

export default useToggle;