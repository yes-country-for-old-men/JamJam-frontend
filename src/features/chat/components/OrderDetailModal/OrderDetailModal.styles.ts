import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Section = styled.section`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 13px;
  font-weight: 600;
`;

export const Value = styled.div`
  font-size: 15px;
  font-weight: 500;
`;

export const Description = styled.div`
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap;
`;

export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

export const ImageWrapper = styled.figure`
  aspect-ratio: 1;
  margin: 0;
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
