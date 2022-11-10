import { useLayoutEffect } from "react";

function useCreateValiableCSS(nameValiable, value) {
  useLayoutEffect(() => {
    const doc = document.documentElement;

    doc.style.setProperty(nameValiable, value);
  }, [nameValiable, value]);
}

export default useCreateValiableCSS;
