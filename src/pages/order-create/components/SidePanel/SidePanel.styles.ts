import styled from '@emotion/styled';

export const SidePanel = styled.aside`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 12px;
`;

export const SideCard = styled.div`
  position: sticky;
  display: flex;
  flex-direction: column;
  top: 80px;
  padding: 16px;
  background-color: white;
  border-radius: 16px;
`;

export const ServiceInfoWrapper = styled.div`
  display: flex;
  gap: 12px;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid ${(props) => props.theme.COLORS.GRAY[6]};
`;

export const ServiceThumbnail = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
`;

export const ServiceInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
`;

export const ServiceName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ServicePrice = styled.p`
  font-size: 15px;
  font-weight: 700;
  color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
`;

export const TermsSection = styled.div`
  margin-bottom: 16px;
`;

export const TermsHeader = styled.div<{ isExpanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => (props.isExpanded ? 8 : 0)}px;
`;

export const TermsTitle = styled.span`
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 12px;
  font-weight: 500;
`;

export const ToggleButton = styled.button<{ isExpanded: boolean }>`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  cursor: pointer;
  padding: 4px;

  svg {
    width: 12px;
    height: 12px;
    fill: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
    transform: ${(props) =>
      props.isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
    transition: transform 0.3s ease;
  }

  &:hover {
    color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  }
`;

export const TermsContent = styled.div<{ isExpanded: boolean }>`
  font-size: 13px;
  overflow: hidden;
  background-color: ${(props) => props.theme.COLORS.BACKGROUND};
  border-radius: 8px;
  margin-bottom: 12px;
  ${(props) => !props.isExpanded && `max-height: 0;`}
`;

export const TermsText = styled.div`
  padding: 12px;
  font-size: 11px;
  font-weight: 300;
  line-height: 1.4;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
`;
