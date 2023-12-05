// import { useState, useEffect } from "react";

// const useSessionStorage = (key, defaultValue) => {
//   const storedValue = parseInt(sessionStorage.getItem(key)) || defaultValue;
//   const [value, setValue] = useState(storedValue);

//   useEffect(() => {
//     sessionStorage.setItem(key, value.toString());
//   }, [key, value]);

//   return [value, setValue];
// };

// export default useSessionStorage;

import { useState } from "react";

const useSessionStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error in useSessionStorage", error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error in useSessionStorage", error);
    }
  };

  return [storedValue, setValue];
};

export default useSessionStorage;
