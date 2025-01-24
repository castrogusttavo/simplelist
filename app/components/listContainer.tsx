import { IconSettings } from '@/app/components/button';
import { Icon } from '@houstonicons/pro';

interface ListProps {
  name: string;
  iconColor?: string | '#F7F7F704';
  iconName: string;
  totalTasks: number;
}

export function ListContainer({
  name,
  iconColor,
  iconName,
  totalTasks,
}: ListProps) {
  return (
    <div className='flex justify-between items-center p-3 rounded-[20px] bg-[#F7F7F7]/5 hover:bg-[#F7F7F7]/10 overlay'>
      <div className='flex gap-4 items-center'>
        <IconSettings hover>
          <Icon
            color={iconColor}
            iconName={iconName}
            size={24}
            type={'rounded-sm'}
            variant={'stroke'}
            strokeWidth={1.5}
          />
        </IconSettings>
        <p className='text-[#F7F7F7]/70 text-sm font-semibold'>{name}</p>
      </div>
      <span className='text-[#F7F7F7]/70 text-sm font-medium'>
        {totalTasks}
      </span>
    </div>
  );
}

// | 'smile'
// | 'home-04'
// | 'car-01'
// | 'fire-02'
// | 'star'
// | 'view-off-slash'
// | 'user-check-01'

// | 'saturn-01'
// | 'sd-card'
// | 'quote-up'
// | 'favourite'
// | 'image-01'
// | 'ai-magic'
// | 'note-04'

// | 'bash'
// | 'resources-add'
// | 'checkmark-circel-02'
// | 'loading-03'
// | 'airpod-03'
// | 'chat-bot'
// | 'command'
