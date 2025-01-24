import * as RadioGroup from '@radix-ui/react-radio-group';

interface RadioProps {
  values: string[];
  className?: string;
  label?: string;
  defaultValue?: string;
  bgPicker: string[];
}

export function ColorPicker({
  values,
  className,
  label,
  defaultValue,
  bgPicker,
}: RadioProps) {
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
