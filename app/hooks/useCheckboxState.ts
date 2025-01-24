import { useMemo, useState } from 'react';

export function useCheckboxState(id: string): {
  isChecked: boolean;
  handleCheckedChange: (checked: boolean) => void;
} {
  const initialCheckedState = useMemo((): boolean => {
    const savedState = localStorage.getItem(`checkbox-${id}`);
    return savedState === 'true';
  }, [id]);

  const [isChecked, setIsChecked] = useState(initialCheckedState);

  const handleCheckedChange = (checked: boolean): void => {
    setIsChecked(checked);
    localStorage.setItem(`checkbox-${id}`, checked.toString());
  };

  return { isChecked, handleCheckedChange };
}
