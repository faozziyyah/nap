import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    document.querySelector('#layoutBox')?.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
