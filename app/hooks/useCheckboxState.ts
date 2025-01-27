import { useEffect, useState } from 'react';

export function useCheckboxState(id: string): {
  isChecked: boolean;
  handleCheckedChange: (checked: boolean) => void;
} {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem(`checkbox-${id}`);
      setIsChecked(savedState === 'true');
    }
  }, [id]);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckedChange = (checked: boolean): void => {
    setIsChecked(checked);
    localStorage.setItem(`checkbox-${id}`, checked.toString());
  };

  return { isChecked, handleCheckedChange };
}
