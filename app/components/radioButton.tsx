import * as RadioGroup from '@radix-ui/react-radio-group';

interface RadioProps {
  values: string[];
  className?: string;
  label?: string;
  defaultValue?: string;
}

interface PickerProps extends RadioProps {
  bgPicker: string[];
}

export function TaskCompleted({
  values,
  className,
  label,
  defaultValue,
}: RadioProps) {
  return (
    <RadioGroup.Root
      className={className}
      aria-label={label}
      defaultValue={defaultValue}
    >
      {values.map((value) => {
        return (
          <RadioGroup.Item
            key={value}
            value={value}
            className='size-6 bg-transparent border-[3px] border-[#F7F7F7]/25 rounded-full m-auto'
          >
            <RadioGroup.Indicator className='relative flex size-full items-center justify-center after:block after:size-[11px] after:rounded-full after:bg-gradient-to-b after:from-[#F7F7F7]/90 after:to-[#F7F7F7]/30' />
          </RadioGroup.Item>
        );
      })}
    </RadioGroup.Root>
  );
}

export function ColorPicker({
  values,
  className,
  label,
  defaultValue,
  bgPicker,
}: PickerProps) {
  return (
    <RadioGroup.Root
      className={className}
      aria-label={label}
      defaultValue={defaultValue}
    >
      {values.map((value, index) => {
        const bgColor = bgPicker[index] && bgPicker ? bgPicker[index] : '#FFF';
        return (
          <RadioGroup.Item
            key={value}
            value={value}
            className='size-6 rounded-full m-auto'
            style={{ backgroundColor: bgColor }}
          >
            <RadioGroup.Indicator className='relative flex size-full items-center justify-center after:block after:size-[11px] after:rounded-full after:bg-[#282828]/80' />
          </RadioGroup.Item>
        );
      })}
    </RadioGroup.Root>
  );
}

// 24 -> 44
// 11 -> 20
