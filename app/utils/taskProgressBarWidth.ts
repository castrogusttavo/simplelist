interface TaskWidthCalculationProps {
  totalTasks: number;
  completedTasks: number;
}

export function TaskWidthCalculation({
  totalTasks,
  completedTasks,
}: TaskWidthCalculationProps): number {
  const totalBarWidth = 263.8947;
  const widthPerTask = totalBarWidth / totalTasks;
  const widthOfCompletedTasks = widthPerTask * completedTasks;

  return totalBarWidth - widthOfCompletedTasks;
}
