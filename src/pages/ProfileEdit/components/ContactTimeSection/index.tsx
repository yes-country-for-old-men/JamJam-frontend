import React from 'react';
import { type ProfileForm } from '@pages/ProfileEdit/hooks/useProfileForm';
import { type ContactHours } from '@type/Provider';
import { type SliderRange } from '@components/Slider/hooks/useSlider';
import * as S from '@pages/ProfileEdit/ProfileEdit.styles';
import Slider from '@components/Slider';

interface ContactTimeSectionProps {
  form: ProfileForm;
}

const formatTime = (hour: number): string => {
  return `${hour.toString().padStart(2, '0')}:00`;
};

const TimeSlider: React.FC<{
  contactHours: ContactHours;
  onContactHoursChange: (time: ContactHours) => void;
}> = ({ contactHours, onContactHoursChange }) => {
  const sliderValue: SliderRange = {
    start: contactHours.startHour,
    end: contactHours.endHour,
  };

  const handleSliderChange = (range: SliderRange) => {
    onContactHoursChange({
      startHour: range.start,
      endHour: range.end,
    });
  };

  return (
    <S.TimeSliderContainer>
      <S.TimeSliderHeader>
        <S.TimeDisplay>
          {`${formatTime(contactHours.startHour)} - ${formatTime(contactHours.endHour)}`}
        </S.TimeDisplay>
      </S.TimeSliderHeader>
      <Slider
        min={0}
        max={24}
        step={1}
        value={sliderValue}
        onChange={handleSliderChange}
        labels={['00:00', '24:00']}
      />
    </S.TimeSliderContainer>
  );
};

const ContactTimeSection: React.FC<ContactTimeSectionProps> = ({ form }) => {
  const contactHours = form.watch('contactHours');

  const handleContactHoursChange = (time: ContactHours) => {
    form.setValue('contactHours', time);
  };

  return (
    <S.Section>
      <S.SectionTitle>연락 가능 시간</S.SectionTitle>
      <S.FormGroup>
        <TimeSlider
          contactHours={contactHours}
          onContactHoursChange={handleContactHoursChange}
        />
      </S.FormGroup>
    </S.Section>
  );
};

export default ContactTimeSection;
