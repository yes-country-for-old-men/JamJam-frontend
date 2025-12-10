import React from 'react';
import { type HTMLMotionProps } from 'framer-motion';
import * as S from './GradientButton.styles';

type GradientButtonProps = HTMLMotionProps<'button'> & {
  children?: React.ReactNode;
};

const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  onClick,
  ...props
}) => {
  return (
    <S.ButtonContainer
      onClick={onClick}
      initial={{ scale: 1 }}
      whileHover={!props.disabled ? { scale: 1.05 } : undefined}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      {...props}
    >
      <S.BackgroundLayer
        animate={{
          background: [
            'linear-gradient(135deg, #F765FF 0%, #6500FF 50%, #77D0FF 100%)',
            'linear-gradient(225deg, #77D0FF 0%, #F765FF 50%, #6500FF 100%)',
            'linear-gradient(315deg, #6500FF 0%, #77D0FF 50%, #F765FF 100%)',
            'linear-gradient(135deg, #F765FF 0%, #6500FF 50%, #77D0FF 100%)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <S.InnerLayer
        whileHover={{
          background: [
            'linear-gradient(135deg, #77D0FF 0%, #812FFF 48%, #F765FF 100%)',
            'linear-gradient(135deg, #8BE5FF 0%, #9140FF 48%, #FF7BFF 100%)',
            'linear-gradient(135deg, #66C5FF 0%, #7020FF 48%, #E550FF 100%)',
            'linear-gradient(135deg, #77D0FF 0%, #812FFF 48%, #F765FF 100%)',
          ],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <S.ContentLayer>{children}</S.ContentLayer>
    </S.ButtonContainer>
  );
};

export default GradientButton;
