import { useState } from 'react';
import type { OrderFormData } from '@/features/order/types/Order';
import type { FileWithId } from '@/shared/types/FileWithId';

export const useOrderForm = () => {
  const [formData, setFormData] = useState<OrderFormData>({
    title: '',
    deadline: {
      year: '',
      month: '',
      day: '',
    },
    content: '',
    files: [],
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (field: string, value: string) => {
    setFormData((prev) => {
      const newDeadline = { ...prev.deadline, [field]: value };

      if (field === 'year' || field === 'month') {
        newDeadline.day = '';
      }
      if (field === 'year') {
        newDeadline.month = '';
      }

      return {
        ...prev,
        deadline: newDeadline,
      };
    });
  };

  const handleFilesChange = (files: FileWithId[]) => {
    setFormData((prev) => ({
      ...prev,
      files,
    }));
  };

  return {
    formData,
    handleInputChange,
    handleDateChange,
    handleFilesChange,
  };
};
