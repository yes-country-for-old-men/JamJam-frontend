import styled from '@emotion/styled';

export const Container = styled.nav`
  position: relative;
  width: 100%;
  min-width: 1200px;
  background-color: ${(props) => props.theme.COLORS.BACKGROUND};
  border-bottom: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  margin-bottom: 36px;
`;

export const CategoryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
`;

export const CategoryItem = styled.li``;

export const CategoryButton = styled.button<{ isActive?: boolean }>`
  padding: 12px;
  color: ${(props) =>
    props.isActive
      ? props.theme.COLORS.LABEL.PRIMARY
      : props.theme.COLORS.LABEL.SECONDARY};
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  border-bottom: 2.5px solid transparent;

  &:hover {
    border-bottom-color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  }
`;

export const ExpansionButton = styled.button<{ isExpanded: boolean }>`
  position: absolute;
  left: max(24px, calc(50vw - (600px - 24px)));
  bottom: 0;
  display: flex;
  align-items: center;
  border-bottom: 2.5px solid transparent;
  color: ${(props) =>
    props.isExpanded
      ? props.theme.COLORS.MAIN.PRIMARY
      : props.theme.COLORS.LABEL.SECONDARY};
  font-size: 16px;
  font-weight: 600;
  padding: 12px 0;
  gap: 8px;
`;

export const ArrowIconWrapper = styled.div<{ isExpanded: boolean }>`
  display: flex;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  transform: rotate(${(props) => (props.isExpanded ? 180 : 0)}deg);
`;

export const ExpandedSection = styled.section<{ isExpanded: boolean }>`
  display: grid;
  grid-template-rows: ${(props) => (props.isExpanded ? '1fr' : '0fr')};
  transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const ExpandedContent = styled.div`
  overflow: hidden;
`;
