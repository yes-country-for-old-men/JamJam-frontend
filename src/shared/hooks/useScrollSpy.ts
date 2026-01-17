import React, { useState, useEffect } from 'react';

export const useScrollSpy = (
  sectionRefs: React.RefObject<HTMLElement | null>[],
) => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    let isScrollHandling = false;

    const calculateVisibilityRatio = (element: HTMLElement): number => {
      const rect = element.getBoundingClientRect();
      const viewportTop = 140;
      const viewportBottom = window.innerHeight;

      const visibleTop = Math.max(rect.top, viewportTop);
      const visibleBottom = Math.min(rect.bottom, viewportBottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);

      return rect.height > 0 ? visibleHeight / rect.height : 0;
    };

    const handleScroll = () => {
      if (!isScrollHandling) {
        requestAnimationFrame(() => {
          const sectionVisibility = sectionRefs.map((ref, index) => ({
            index,
            ratio: ref.current ? calculateVisibilityRatio(ref.current) : 0,
          }));

          const visibleSections = sectionVisibility.filter(
            (section) => section.ratio > 0,
          );

          if (visibleSections.length > 0) {
            const maxRatio = Math.max(...visibleSections.map((s) => s.ratio));
            const bestSection = visibleSections
              .filter((s) => s.ratio === maxRatio)
              .reduce((prev, current) =>
                current.index < prev.index ? current : prev,
              );

            setActiveSection((prev) =>
              prev !== bestSection.index ? bestSection.index : prev,
            );
          }

          isScrollHandling = false;
        });
        isScrollHandling = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [sectionRefs]);

  return activeSection;
};
