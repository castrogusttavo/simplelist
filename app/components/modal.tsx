import { ColorPicker } from '@/app/components/radioButton';
import { SwitchTask } from '@/app/components/switch';
import { Icon } from '@houstonicons/pro';
import { useState } from 'react';

interface ListProps {
  icon: string;
  color: string;
  setIcon: (icon: string) => void;
  setColor: (color: string) => void;
}

interface EditTaskModalProps {
  onClearAll: () => void;
  onShowCompleted: () => void;
}

const CustomIcons = [
  'smile',
  'home-04',
  'car-01',
  'fire-02',
  'star',
  'view-off-slash',
  'user-check-01',
  'saturn-01',
  'sd-card',
  'quote-up',
  'favourite',
  'image-01',
  'ai-magic',
  'note-04',
  'bash',
  'resources-add',
  'checkmark-circle-02',
  'loading-03',
  'airpod-03',
  'chat-bot',
  'command',
];

export function CustomListModal({ icon, color, setIcon, setColor }: ListProps) {
  return (
    <div className='flex flex-col gap-4 py-4 px-3 rounded-[32px] w-[332px] backdrop-blur-3xl bg-[#282828] shadow-modal z-[90]'>
      <div className='flex flex-col items-start gap-1 pt-0 px-2 pb-2'>
        <span className='text-xs font-bold self-stretch text-[#F7F7F7]/25'>
          Icon
        </span>
        <div className='flex items-center gap-4 flex-wrap w-full justify-between mt-2'>
          {CustomIcons.map((iconName: string) => (
            <button
              key={iconName}
              className={`${icon === iconName ? 'opacity-100 ' : 'opacity-50 hover:opacity-100'}`}
              onClick={(): void => setIcon(iconName)}
            >
              <Icon
                color={'#F7F7F7'}
                size={24}
                variant={'stroke'}
                type={'rounded'}
                iconName={iconName}
                strokeWidth={2}
              />
            </button>
          ))}
        </div>
      </div>
      <div>
        <span className='text-xs font-bold self-stretch text-[#F7F7F7]/25'>
          Color
        </span>
        <div className='flex items-center gap-2 flex-wrap w-full justify-between mt-2'>
          <ColorPicker
            className='w-full justify-between flex'
            values={[
              '#CBCBCB',
              '#FF7474',
              '#FFA502',
              '#FFFA65',
              '#2ECC71',
              '#DEB4F6',
              '#B4AAFF',
            ]}
            bgPicker={[
              '#CBCBCB',
              '#FF7474',
              '#FFA502',
              '#FFFA65',
              '#2ECC71',
              '#DEB4F6',
              '#B4AAFF',
            ]}
            defaultValue={color}
            onValueChange={(value) => setColor(value)}
          />
        </div>
      </div>
    </div>
  );
}

export function EditTaskModal({
  onClearAll,
  onShowCompleted,
}: EditTaskModalProps) {
  const [checked, setChecked] = useState(false);

  return (
    <div className='flex flex-col py-4 px-3 rounded-[32px] w-[212px] backdrop-blur bg-[#F7F7F7]/5 shadow-modal z-[90]'>
      <div
        onClick={() => {
          onShowCompleted();
          setChecked(!checked);
        }}
        className='hover:bg-[#f7f7f71a] w-full justify-between h-10 text-sm rounded-xl text-[#f7f7f766] font-bold px-2 transition-all duration-200 flex items-center'
      >
        <button>
          <span>Show completed</span>
        </button>
        <SwitchTask checked={checked} />
      </div>
      <div className='hover:bg-[#f7f7f71a] w-full h-10 text-sm rounded-xl text-[#f7f7f766] font-bold px-2 transition-all duration-200 flex items-center'>
        <button onClick={onClearAll}>
          <span>Clear all</span>
        </button>
      </div>
    </div>
  );
}
