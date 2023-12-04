import { useEffect } from "react";

const useBeforeUnload = (callback) => {
  useEffect(() => {
    const handleUnload = () => {
      callback();
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [callback]);
};

export default useBeforeUnload;
