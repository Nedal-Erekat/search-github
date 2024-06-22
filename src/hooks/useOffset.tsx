import { useEffect, useState } from "react";

const useOffset = (inView: boolean) => {
  const [offset, setOffset] = useState<number>(1);

  useEffect(() => {
    if (inView) {
      setOffset((prevOffset) => prevOffset + 1);
    }
  }, [inView]);

  return [offset, setOffset] as const;
};

export default useOffset;
