import { useEffect, useState, useRef } from "react";

interface UseInViewOptions {
  once?: boolean;
  margin?: string;
  threshold?: number;
}

export function useInView(
  ref: React.RefObject<HTMLElement>,
  options: UseInViewOptions = {}
) {
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const { once = false, margin = "0px", threshold = 0.1 } = options;

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsInView(isIntersecting);
        
        if (once && isIntersecting) {
          setHasBeenInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin, threshold }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, once, margin, threshold]);

  return once ? hasBeenInView : isInView;
}