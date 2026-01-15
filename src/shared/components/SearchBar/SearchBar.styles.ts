import styled from '@emotion/styled';

export const SearchContainer = styled.div<{ isFocused: boolean }>`
  width: 100%;
  position: relative;
  border-radius: 12px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  transform: scale(${(props) => (props.isFocused ? 1.05 : 1)});
  box-shadow: ${(props) =>
    props.isFocused ? '0 0 20px 5px rgba(0, 0, 0, 0.03)' : 'none'};

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  background-color: white;
  border: none;
  outline: none;
  border-radius: 12px;
  font-size: 18px;
  padding: 24px 64px 24px 20px;

  &::placeholder {
    color: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background-color: transparent;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    transform: translateY(-50%) scale(1.1);
    background-color: ${(props) => props.theme.COLORS.MAIN.SECONDARY};
  }

  &:active {
    transform: translateY(-50%) scale(0.9);
  }
`;
