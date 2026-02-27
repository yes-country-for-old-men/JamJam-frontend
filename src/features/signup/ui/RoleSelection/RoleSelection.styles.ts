import styled from '@emotion/styled';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

export const RoleCard = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  aspect-ratio: 1;
  background-color: ${(props) =>
    props.selected ? `${props.theme.COLORS.MAIN.SECONDARY}` : 'white'};
  border: 1px solid
    ${(props) =>
      props.selected
        ? props.theme.COLORS.MAIN.PRIMARY
        : props.theme.COLORS.GRAY[5]};
  border-radius: 12px;
  text-align: center;
  padding: 0 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  }
`;

export const RoleIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`;

export const RoleTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const RoleDescription = styled.div`
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 14px;
  line-height: 1.4;
`;
