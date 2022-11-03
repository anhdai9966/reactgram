import { useLayoutEffect } from "react";

function useDocumentTitle(title) {
  useLayoutEffect(() => {
    window.document.title = title;
  }, [title]);
}

export default useDocumentTitle;
