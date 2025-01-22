interface TitleProps {
  children: string;
}

export function Title({ children }: TitleProps) {
  return <h2 className='text-xl text-[#F7F7F7]/95 font-medium'>{children}</h2>;
}
