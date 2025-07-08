import React, { useState } from 'react';
import useScrollSpy from '@hooks/useScrollSpy';

interface UseTabScrollProps<T extends readonly string[]> {
  tabs: T;
  sectionRefs: React.RefObject<HTMLElement | null>[];
  scrollOffset?: number;
}

interface UseTabScrollReturn<T extends readonly string[]> {
  activeTab: T[number];
  activeTabIndex: number;
  handleTabClick: (tabName: T[number]) => void;
  scrollToSection: (index: number) => void;
}

export const useTabScroll = <T extends readonly string[]>({
  tabs,
  sectionRefs,
  scrollOffset = -140,
}: UseTabScrollProps<T>): UseTabScrollReturn<T> => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [useManualTab, setUseManualTab] = useState(false);
  const scrollSpyActiveSection = useScrollSpy(sectionRefs);

  const activeSection = useManualTab ? activeTabIndex : scrollSpyActiveSection;
  const activeTab = tabs[activeSection];

  const scrollToSection = (index: number) => {
    const targetRef = sectionRefs[index];
    if (targetRef?.current) {
      const y =
        targetRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        scrollOffset;
      window.scrollTo({ top: y });
    }
  };

  const handleTabClick = (tabName: T[number]) => {
    const index = tabs.indexOf(tabName);
    setActiveTabIndex(index);
    setUseManualTab(true);
    scrollToSection(index);

    setTimeout(() => {
      const handleUserScroll = () => {
        setUseManualTab(false);
        window.removeEventListener('scroll', handleUserScroll);
      };
      window.addEventListener('scroll', handleUserScroll, { passive: true });
    }, 100);
  };

  return {
    activeTab,
    activeTabIndex,
    handleTabClick,
    scrollToSection,
  };
};

export default useTabScroll;
