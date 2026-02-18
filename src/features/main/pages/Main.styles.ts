import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: max-content;
  overflow-x: auto;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1360px;
  margin: 0 auto;
  gap: 32px;
  padding: 48px 0;
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  margin-bottom: 8px;
  font-family: A2z;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  white-space: pre-line;
  word-break: keep-all;
`;

export const SubTitle = styled.h2`
  margin-bottom: 32px;
  font-size: 18px;
  font-weight: 400;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
`;

export const SearchSection = styled.div`
  width: 100%;
  max-width: 480px;
`;

export const Section = styled(motion.div)`
  width: 100%;
`;
