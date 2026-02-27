import styled from '@emotion/styled';

export const Container = styled.article`
  width: 840px;
  height: 100%;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
`;

export const TabContainer = styled.div`
  display: flex;
  height: 56px;
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
`;

export const Tab = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 1;
  border-bottom: ${(props) =>
    props.isActive
      ? `2.5px solid ${props.theme.COLORS.MAIN.PRIMARY}`
      : `1px solid ${props.theme.COLORS.GRAY[5]}`};
  color: ${(props) =>
    props.isActive
      ? props.theme.COLORS.LABEL.PRIMARY
      : props.theme.COLORS.LABEL.SECONDARY};
  font-size: 16px;
  font-weight: ${(props) => (props.isActive ? '600' : '500')};
  padding: 16px;
`;

export const TabBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  background-color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  color: white;
  font-size: 10px;
  line-height: 1;
  font-weight: 600;
  border-radius: 8px;
`;

export const ContentArea = styled.div`
  display: flex;
  height: calc(100% - 56px);
`;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  width: 210px;
  height: 100%;
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  border-right: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  overflow-y: auto;
`;

export const OrderList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OrderItem = styled.div<{ isSelected: boolean }>`
  padding: 16px;
  background-color: ${(props) =>
    props.isSelected
      ? props.theme.COLORS.MAIN.SECONDARY
      : props.theme.COLORS.GRAY[6]};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.isSelected
        ? props.theme.COLORS.MAIN.SECONDARY
        : props.theme.COLORS.GRAY[5]};
  }
`;

export const OrderTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
`;

export const OrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const OrderClient = styled.div`
  font-size: 14px;
`;

export const OrderDate = styled.div`
  font-size: 13px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
`;

export const DetailArea = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const DetailScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const Section = styled.section`
  margin-bottom: 24px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  margin-bottom: 8px;
`;

export const DetailValue = styled.div`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 12px;
`;

export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 16px;
`;

export const ImageWrapper = styled.figure`
  aspect-ratio: 1;
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  border-radius: 8px;
  overflow: hidden;
  margin: 0;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const NavigationButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  margin-top: auto;
`;

export const EmptyState = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const EmptyStateText = styled.div`
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  text-align: center;
  word-break: keep-all;
  margin-top: 16px;
  padding: 0 12px;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;
