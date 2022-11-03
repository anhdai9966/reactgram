import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function useLocationChage(handle) {
  const location = useLocation();
  const temp = useRef(location)

  useEffect(() => {
    if (location === temp.current) return 
    
    handle();
  }, [location]);

  return location.pathname;
}

export default useLocationChage;
