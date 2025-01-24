import * as Checkbox from '@radix-ui/react-checkbox';

interface TaskProps {
  id: string;
  isChecked: boolean;
  handleCheckedChange: (checked: boolean) => void;
}

export function TaskCheckBox({
  id,
  handleCheckedChange,
  isChecked,
}: TaskProps) {
  return (
    <Checkbox.Root
      id={id}
      checked={isChecked}
      onCheckedChange={handleCheckedChange}
      className='size-6 bg-transparent border-[3px] border-[#F7F7F7]/25 hover:border-[#F7F7F7]/75 aria-checked:hover:border-[#F7F7F7]/30 rounded-full transition-all duration-500'
    >
      <Checkbox.Indicator className='relative flex size-full items-center justify-center after:block after:size-[11px] after:rounded-full after:bg-gradient-to-b after:from-[#F7F7F7]/90 after:to-[#F7F7F7]/30' />
    </Checkbox.Root>
  );
}
