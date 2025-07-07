import React from 'react';
import styled from '@emotion/styled';
import { motion, type HTMLMotionProps } from 'framer-motion';

type GradientButtonProps = HTMLMotionProps<'button'> & {
  children?: React.ReactNode;
};

const ButtonContainer = styled(motion.button)`
  position: relative;
  border-radius: 30px;
  padding: 12px 24px;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const BackgroundLayer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f765ff 0%, #6500ff 50%, #77d0ff 100%);
  border-radius: 30px;
`;

const InnerLayer = styled(motion.div)`
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  background: linear-gradient(135deg, #77d0ff 0%, #812fff 48%, #f765ff 100%);
  border-radius: 28px;

  box-shadow:
    inset -10px -10px 20px rgba(67, 0, 177, 0.2),
    inset 10px 10px 20px rgba(255, 255, 255, 0.3),
    inset 0 0 2px rgba(255, 255, 255, 1);
`;

const ContentLayer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: white;
  font-size: 16px;
  font-weight: 600;
  gap: 4px;
`;

const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  onClick,
  ...props
}) => {
  return (
    <ButtonContainer
      onClick={onClick}
      initial={{ scale: 1 }}
      whileHover={!props.disabled ? { scale: 1.05 } : undefined}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      {...props}
    >
      <BackgroundLayer
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
      <InnerLayer
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
      <ContentLayer>{children}</ContentLayer>
    </ButtonContainer>
  );
};

export default GradientButton;
