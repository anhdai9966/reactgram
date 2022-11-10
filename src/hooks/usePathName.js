import { useLocation } from "react-router-dom";

function usePathName() {
  let location = useLocation();

  return location.pathname;
}

export default usePathName;
