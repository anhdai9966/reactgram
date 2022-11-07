import { useEffect } from "react";
import { useIsMounted, useReadLocalStorage } from "~/hooks";
import useLocalStorage from "~/hooks/useLocalStorage";

function TestHook() {
  const isMounted = useIsMounted()
  console.log(isMounted())

  return;
}

export default TestHook;
