import styled from '@emotion/styled';

export const Container = styled.aside`
  position: sticky;
  display: flex;
  flex: 1;
  flex-direction: column;
  top: 80px;
  height: fit-content;
  background-color: white;
  border-radius: 16px;
  padding: 16px;
`;

export const SideCardTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
`;

export const StatusInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const StatusLabel = styled.span`
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 14px;
  letter-spacing: -0.075em;
`;

export const StatusValue = styled.span`
  font-weight: 600;
  font-size: 14px;
`;

export const InquiryButtonWrapper = styled.div`
  margin-top: 12px;
`;
