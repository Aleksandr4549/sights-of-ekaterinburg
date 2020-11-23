import React from 'react';

export default function usePageBottom() {
  const [bottom, setBottom] = React.useState(false);

  React.useEffect(() => {
    function handleScroll() {   
      const isBottom = document.documentElement.scrollHeight - document.documentElement.scrollTop 
                    - document.documentElement.clientHeight === 0;
      setBottom(isBottom);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return bottom;
}