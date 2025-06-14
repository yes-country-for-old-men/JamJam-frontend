import type Category from '@type/Category';
import MarketingIcon from '@assets/icons/category/marketing.svg?react';
import BusinessIcon from '@assets/icons/category/business.svg?react';
import DevelopmentIcon from '@assets/icons/category/development.svg?react';
import DesignIcon from '@assets/icons/category/design.svg?react';
import EducationIcon from '@assets/icons/category/education.svg?react';
import CraftIcon from '@assets/icons/category/craft.svg?react';
import TranslationIcon from '@assets/icons/category/translation.svg?react';
import PhotographIcon from '@assets/icons/category/photograph.svg?react';
import CookIcon from '@assets/icons/category/cook.svg?react';
import EtcIcon from '@assets/icons/category/etc.svg?react';

const ICON_SIZE = 72;

export const CATEGORY_IDS = {
  MARKETING: 1,
  BUSINESS: 2,
  DEVELOPMENT: 3,
  DESIGN: 4,
  EDUCATION: 5,
  CRAFT: 6,
  TRANSLATION: 7,
  PHOTOGRAPH: 8,
  COOK: 9,
  ETC: 10,
} as const;

const CATEGORIES: readonly Category[] = [
  {
    id: CATEGORY_IDS.MARKETING,
    name: '마케팅 · 홍보',
    icon: <MarketingIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: CATEGORY_IDS.BUSINESS,
    name: '경영 · 기획',
    icon: <BusinessIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: CATEGORY_IDS.DEVELOPMENT,
    name: '개발 · IT',
    icon: <DevelopmentIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: CATEGORY_IDS.DESIGN,
    name: '디자인 · 편집',
    icon: <DesignIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: CATEGORY_IDS.EDUCATION,
    name: '교육 · 강의',
    icon: <EducationIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: CATEGORY_IDS.CRAFT,
    name: '수공예 · 취미',
    icon: <CraftIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: CATEGORY_IDS.TRANSLATION,
    name: '번역 · 통역',
    icon: <TranslationIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: CATEGORY_IDS.PHOTOGRAPH,
    name: '사진 · 영상',
    icon: <PhotographIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: CATEGORY_IDS.COOK,
    name: '요리 · 제과',
    icon: <CookIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: CATEGORY_IDS.ETC,
    name: '기타',
    icon: <EtcIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
];

export default CATEGORIES;
