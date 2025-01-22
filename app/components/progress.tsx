import { TaskWidthCalculation } from '../utils/taskProgressBarWidth';

interface ProgressProps {
  totalTasks: number;
  completedTasks: number;
}

export function Progress({ totalTasks, completedTasks }: ProgressProps) {
  const completedTasksProgress = TaskWidthCalculation({
    totalTasks,
    completedTasks,
  });

  return (
    <div className='flex gap-3 items-center'>
      <div className='w-8 h-8'>
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
        <svg aria-label='Progress' viewBox='0 0 100 100'>
          <path
            d='M 50,50 m 0,-42 a 42,42 0 1 1 0,84 a 42,42 0 1 1 0,-84'
            strokeWidth='16'
            fillOpacity='0'
            className='stroke-[#f8f8f8]/5'
            style={{ strokeDasharray: '263.8947px', strokeDashoffset: '0px' }}
          />
          <path
            d='M 50,50 m 0,-42 a 42,42 0 1 1 0,84 a 42,42 0 1 1 0,-84'
            strokeWidth='16'
            fillOpacity='0'
            className='stroke-[#f8f8f8]/70 rounded-sm transition-all duration-500'
            style={{
              strokeDasharray: '263.8947px',
              strokeDashoffset: completedTasksProgress,
              strokeLinecap: 'round',
            }}
          />
        </svg>
      </div>

      <div className='flex gap-2'>
        <span className='text-[#F7F7F7]/25 text-sm font-bold uppercase tracking-[0.6px]'>
          completed
        </span>
        <div className='text-[#F7F7F7]/40 text-sm font-bold uppercase tracking-[-0.6px]'>
          <span className='text-nowrap'>
            {completedTasks} / {totalTasks}
          </span>
        </div>
      </div>
    </div>
  );
}
