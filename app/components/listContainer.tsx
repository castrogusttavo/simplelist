import { IconSettings } from '@/app/components/button';
import { Icon } from '@houstonicons/pro';

interface ListProps {
  name: string;
  iconColor?: string;
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
        <IconSettings>
          <Icon
            color={iconColor}
            iconName={iconName}
            size={24}
            type={'rounded'}
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

// | 'SmileIcon'
// | 'Home04Icon'
// | 'Car01Icon'
// | 'FireIcon'
// | 'StarIcon'
// | 'ViewOffSlashIcon'
// | 'UserCheck01Icon'
// | 'Saturn01Icon'
// | 'SdCardIcon'
// | 'QuoteUpIcon'
// | 'FavouriteIcon'
// | 'Image01Icon'
// | 'AiMagicIcon'
// | 'File02Icon'
