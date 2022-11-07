import { useCallback, useEffect, useState } from "react";

function useReadJSON(url) {
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    try {
      console.log(url)
      const response = await fetch(url);
      const myJson = await response.json();
      console.log(myJson)
      setData(myJson);
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return data;
}

export default useReadJSON;
