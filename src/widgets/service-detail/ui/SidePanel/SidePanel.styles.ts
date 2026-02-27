import styled from '@emotion/styled';

export const Container = styled.aside`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 12px;
`;

export const ThumbnailWrapper = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const SideCard = styled.aside`
  position: sticky;
  display: flex;
  flex-direction: column;
  top: 80px;
  background-color: white;
  border-radius: 16px;
  padding: 16px;
`;

export const PriceInfo = styled.div`
  margin-bottom: 12px;
`;

export const ServiceName = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
`;

export const Price = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

export const PriceNote = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  margin-left: 4px;
`;
