import React from 'react';
import { type ProfileForm } from '@/features/provider/hooks/useProfileForm';
import * as S from '@/features/provider/pages/ProfileEdit/ProfileEdit.styles';
import { type ContactHours } from '@/features/provider/types/Provider';
import Slider from '@/shared/components/Slider';
import { type SliderRange } from '@/shared/components/Slider/hooks/useSlider';

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
