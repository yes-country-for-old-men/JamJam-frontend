import styled from '@emotion/styled';

export const CategoryLabel = styled.button`
  color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;

  &:hover {
    text-decoration: underline;
  }
`;

export const ServiceTitle = styled.div`
  font-size: 28px;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 20px;
`;

export const ProviderSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  border-radius: 12px;
  gap: 12px;
  padding: 24px;
  margin-bottom: 12px;
`;

export const ProviderProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ProviderImageWrapper = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background-color: ${(props) => props.theme.COLORS.GRAY[5]};
  border-radius: 50%;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  overflow: hidden;
  margin: 0;
`;

export const ProviderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const ProviderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ProviderName = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

export const ProviderLocation = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  gap: 4px;
`;
