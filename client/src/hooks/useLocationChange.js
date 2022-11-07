import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function useLocationChange(handle) {
  const location = useLocation();
  const temp = useRef(location)

  useEffect(() => {
    if (location === temp.current) return 
    
    handle();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return location.pathname;
}

export default useLocationChange;
