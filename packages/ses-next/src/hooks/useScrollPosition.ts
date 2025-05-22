import { useEffect, useState } from 'react';

export default function useScrollPosition(): number {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    const updatePosition = (): void => {
      setScrollPosition(window.pageYOffset);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', updatePosition);
      updatePosition();
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', updatePosition);
      }
    };
  }, []);

  return scrollPosition;
}
