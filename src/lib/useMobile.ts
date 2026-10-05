'use client';

import { useEffect, useState } from 'react';

export default function useMobile() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 600px)');

    const update = () => {
      setMobile(mediaQuery.matches);
    };

    update();

    mediaQuery.addEventListener('change', update);

    return () => {
      mediaQuery.removeEventListener('change', update);
    };
  }, []);

  return mobile;
}
