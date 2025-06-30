import React, { useState, useEffect } from 'react';

const useScrollSpy = (sectionRefs: React.RefObject<HTMLElement | null>[]) => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sectionRefs.findIndex(
            (ref) => ref.current === entry.target,
          );

          if (entry.isIntersecting && index !== -1) {
            setActiveSection(index);
          } else if (!entry.isIntersecting && index === 1) {
            setActiveSection(0);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-80px 0px 0px 0px',
      },
    );

    sectionRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, [sectionRefs]);

  return activeSection;
};

export default useScrollSpy;
