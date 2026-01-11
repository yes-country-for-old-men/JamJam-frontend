import styled from '@emotion/styled';
import { Z_INDEX } from '@constants/index';

export const Container = styled.div`
  position: relative;
  display: inline-flex;
`;

export const InfoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  transition: all 0.2s ease;
`;

export const InfoBubble = styled.div<{ visible: boolean }>`
  position: absolute;
  top: -8px;
  left: 28px;
  width: 280px;
  background-color: white;
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.4;
  padding: 12px;
  z-index: ${Z_INDEX.BASE};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  transform: ${(props) =>
    props.visible ? 'translateY(0)' : 'translateY(-8px)'};
  transition: all 0.2s ease;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.03);

  &::before {
    content: '';
    position: absolute;
    top: 12px;
    left: -6px;
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-right: 6px solid white;
  }
`;

export const InfoBubbleTitle = styled.div`
  color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  font-weight: 600;
  margin-bottom: 8px;
`;

export const InfoBubbleList = styled.ul`
  margin: 0;
  padding-left: 8px;

  li {
    margin-bottom: 4px;

    &:last-child {
      margin-bottom: 0;
    }

    &:before {
      content: '•';
      margin-right: 8px;
    }
  }
`;
