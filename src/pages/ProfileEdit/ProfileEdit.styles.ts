import styled from '@emotion/styled';

export const Container = styled.article`
  width: 840px;
`;

export const Section = styled.section`
  margin-bottom: 48px;

  &:last-child {
    margin-bottom: 24px;
  }
`;

export const SectionTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
`;

export const FormGroup = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
`;

export const LabelWithInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;

  & > label {
    margin-bottom: 0;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  padding: 16px;
  box-shadow: inset 0 0 0 1px ${(props) => props.theme.COLORS.GRAY[5]};
  resize: none;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 1px ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  }

  &::placeholder {
    color: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
  }
`;

export const SkillSelectionContainer = styled.div`
  display: flex;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  border-radius: 12px;
  background-color: white;
  overflow: hidden;
`;

export const CategoryList = styled.div`
  width: 200px;
  border-right: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
`;

export const CategoryItem = styled.button<{ active: boolean }>`
  width: 100%;
  padding: 16px 20px;
  text-align: left;
  background-color: ${(props) => (props.active ? 'white' : 'transparent')};
  border-bottom: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  font-size: 14px;
  font-weight: ${(props) => (props.active ? '600' : '400')};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.active ? 'white' : props.theme.COLORS.GRAY[5]};
  }
`;

export const SkillListContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 720px;
  padding: 20px;
`;

export const SkillSearchBox = styled.input`
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 16px;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
  }

  &::placeholder {
    color: ${(props) => props.theme.COLORS.LABEL.TERTIARY};
  }
`;

export const SkillList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const SkillItem = styled.button<{ selected: boolean }>`
  width: 100%;
  padding: 12px 16px;
  text-align: left;
  background-color: ${(props) =>
    props.selected ? props.theme.COLORS.MAIN.SECONDARY : 'transparent'};
  border-radius: 8px;
  margin-bottom: 4px;
  color: ${(props) =>
    props.selected
      ? props.theme.COLORS.MAIN.PRIMARY
      : props.theme.COLORS.LABEL.PRIMARY};
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${(props) =>
      props.selected
        ? props.theme.COLORS.MAIN.SECONDARY
        : props.theme.COLORS.GRAY[6]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SkillSelectionHeader = styled.div`
  margin-bottom: 16px;
`;

export const TagContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  border-radius: 12px;
  margin-bottom: 16px;
  padding: 16px;
`;

export const TagItem = styled.button`
  background-color: white;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[4]};
  padding: 12px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 20px;
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  border: 1px dashed ${(props) => props.theme.COLORS.GRAY[4]};
  border-radius: 12px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  width: 100%;
  justify-content: center;

  &:hover {
    background-color: ${(props) => props.theme.COLORS.MAIN.SECONDARY};
    border-color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
    color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};

    & svg {
      fill: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
    }
  }
`;

export const ItemCard = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
`;

export const DeleteButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 18px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.COLORS.GRAY[5]};
    color: ${(props) => props.theme.COLORS.LABEL.PRIMARY};
  }
`;

export const SubSectionContainer = styled.div`
  margin-bottom: 32px;
`;

export const EmptySkillsContainer = styled.div`
  padding: 16px;
  text-align: center;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 14px;
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  border-radius: 12px;
  margin-bottom: 16px;
`;

export const TimeSliderContainer = styled.div``;

export const TimeSliderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const TimeDisplay = styled.div`
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

export const SubmitButtonArea = styled.div`
  position: sticky;
  display: flex;
  bottom: 0;
  background-color: ${(props) => props.theme.COLORS.BACKGROUND};
  padding: 24px 0;
  margin-bottom: -24px;
`;
