import React from 'react';
import Select from '@/shared/components/Select';
import * as S from './DateSelector.styles';
import type { DeadlineData } from '@/features/order/types/Order';

interface DateSelectorProps {
  formData: { deadline: DeadlineData };
  onDateChange: (field: string, value: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  formData,
  onDateChange,
}) => {
  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 5 }, (_, i) => currentYear + i);
  };

  const getMonthOptions = () => {
    if (!formData.deadline.year) return [];

    const currentDate = new Date();
    const selectedYear = parseInt(formData.deadline.year, 10);
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    if (selectedYear === currentYear) {
      return Array.from(
        { length: 12 - currentMonth + 1 },
        (_, i) => currentMonth + i,
      );
    }

    return Array.from({ length: 12 }, (_, i) => i + 1);
  };

  const getDayOptions = () => {
    if (!formData.deadline.year || !formData.deadline.month) return [];

    const currentDate = new Date();
    const selectedYear = parseInt(formData.deadline.year, 10);
    const selectedMonth = parseInt(formData.deadline.month, 10);
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();

    if (selectedYear === currentYear && selectedMonth === currentMonth) {
      return Array.from(
        { length: daysInMonth - currentDay },
        (_, i) => currentDay + 1 + i,
      );
    }

    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  return (
    <S.DateInputGroup>
      <S.YearSelectWrapper>
        <Select
          value={formData.deadline.year}
          onChange={(e) => onDateChange('year', e.target.value)}
        >
          <option value="">년도</option>
          {getYearOptions().map((year) => (
            <option key={year} value={year.toString()}>
              {year}년
            </option>
          ))}
        </Select>
      </S.YearSelectWrapper>
      <S.MonthSelectWrapper>
        <Select
          value={formData.deadline.month}
          onChange={(e) => onDateChange('month', e.target.value)}
          disabled={!formData.deadline.year}
        >
          <option value="">월</option>
          {getMonthOptions().map((month) => (
            <option key={month} value={month.toString()}>
              {month}월
            </option>
          ))}
        </Select>
      </S.MonthSelectWrapper>
      <S.DaySelectWrapper>
        <Select
          value={formData.deadline.day}
          onChange={(e) => onDateChange('day', e.target.value)}
          disabled={!formData.deadline.month}
        >
          <option value="">일</option>
          {getDayOptions().map((day) => (
            <option key={day} value={day.toString()}>
              {day}일
            </option>
          ))}
        </Select>
      </S.DaySelectWrapper>
    </S.DateInputGroup>
  );
};

export default DateSelector;
