import styled from '@emotion/styled';

export const StyledButton = styled.button<{
  variant: string;
  size: string;
  fullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.2s ease;

  ${(props) => props.fullWidth && 'width: 100%;'}

  ${(props) => {
    switch (props.size) {
      case 'small':
        return `
          font-size: 12px;
          padding: 12px ${props.fullWidth ? '0' : '16px'};
        `;
      case 'large':
        return `
          font-size: 16px;
          padding: 18px ${props.fullWidth ? '0' : '32px'};
        `;
      default:
        return `
          font-size: 14px;
          padding: 16px ${props.fullWidth ? '0' : '20px'};
        `;
    }
  }}

    ${(props) => {
    switch (props.variant) {
      case 'secondary':
        return `
          background-color: white;
          color: ${props.theme.COLORS.MAIN.PRIMARY};

          &:hover:not(:disabled) {
            background-color: ${props.theme.COLORS.GRAY[6]};
          }
        `;
      case 'outline':
        return `
        background-color: white;
        box-shadow: inset 0 0 0 1px ${props.theme.COLORS.GRAY[4]};
        color: ${props.theme.COLORS.LABEL.SECONDARY};

        &:hover:not(:disabled) {
          background-color: ${props.theme.COLORS.GRAY[6]};
          box-shadow: inset 0 0 0 1px ${props.theme.COLORS.GRAY[5]};
        }
      `;
      default:
        return `
          background-color: ${props.theme.COLORS.MAIN.PRIMARY};
          color: white;

          &:hover:not(:disabled) {
            opacity: 0.7;
          }

          &:active:not(:disabled) {
            opacity: 0.7;
          }
        `;
    }
  }}

    &:disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }
`;
