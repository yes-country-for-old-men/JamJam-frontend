import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: max-content;
  overflow-x: auto;
  padding: 0;
`;

export const ScrollableContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1200px;
  gap: 72px;
  padding: 72px 24px;
`;

export const TopSection = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 64px;
`;

export const LeftSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
  justify-content: center;
`;

export const Title = styled(motion.div)`
  font-size: 42px;
  font-weight: 700;
  text-align: start;
  line-height: 1.4;
  white-space: pre-line;
  margin-bottom: 36px;
  word-break: keep-all;
`;

export const SearchBarWrapper = styled(motion.div)`
  width: 100%;
  min-width: 300px;
`;

export const CarouselWrapper = styled(motion.div)`
  flex-shrink: 0;
`;

export const CategorySection = styled.section`
  width: 100%;
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, 1fr);
  width: 100%;
  gap: 24px;
`;
