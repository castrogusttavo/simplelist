import { Switch } from 'radix-ui';

export function SwitchTask({ checked }: { checked?: boolean }) {
  return (
    <div>
      <Switch.Root
        checked={checked}
        className={`relative h-6 w-11 cursor-default rounded-[12px] bg-[#f7f7f70d] ${!checked ? 'opacity-50' : ''}`}
        id='all-completed-tasks'
      >
        <Switch.Thumb className='block w-4 h-4 translate-x-0.5 rounded-full bg-white transition-all duration-200 will-change-transform data-[state=checked]:translate-x-[26px]' />
      </Switch.Root>
    </div>
  );
}
