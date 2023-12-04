import { useState, useEffect } from "react";

const useSessionStorage = (key, defaultValue) => {
  const storedValue = parseInt(sessionStorage.getItem(key)) || defaultValue;
  const [value, setValue] = useState(storedValue);

  useEffect(() => {
    sessionStorage.setItem(key, value.toString());
  }, [key, value]);

  return [value, setValue];
};

export default useSessionStorage;
