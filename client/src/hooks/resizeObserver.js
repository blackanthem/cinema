import { useEffect, useRef } from "react";

export default function useResizeObserver(callback, element) {
  const observer = useRef(null);

  console.log("obsdfsdf");

  useEffect(() => {
    if (observer && observer.current && element)
      observer.current.unobserve(element);

    observer.current = new ResizeObserver(callback);
    observe();

    return () => {
      if (observer?.current && element) observer.current.unobserve(element);
    };
  }, [element]);

  function observe() {
    if (element && observer.current) {
      observer.current.observe(element);
    }
  }
}
