import { useEffect, useState } from 'react';

const useWindowSize = () => {
  const [dimensions, setDimensions] = useState({
    clientHeight: 0,
    clientWidth: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        clientHeight: document.documentElement.clientHeight,
        clientWidth: document.documentElement.clientWidth,
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
};

export default useWindowSize;
