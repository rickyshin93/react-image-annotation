import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr'

type ITopPanel = {
  onPrevious: () => void
  onNext: () => void
  currentIndex: number
  totalCount: number
}

export const TopPanel = (props: ITopPanel) => {
  return (
    <div className="flex h-10 z-[300] pointer-events-auto bg-[var(--color-low)] py-1 px-2 rounded-b-lg gap-2">
      <button className="flex-none w-10 cursor-pointer px-2 hover:bg-[#00000010] rounded-lg" onClick={props.onPrevious}>
        <GrFormPreviousLink color="#2E2E2E" size={24} />
      </button>

      <span className="flex items-center justify-center text-sm font-medium text-[var(--color-text-1)]">
        {props.currentIndex} / {props.totalCount}
      </span>

      <button className="flex-none w-10 cursor-pointer px-2 hover:bg-[#00000010] rounded-lg" onClick={props.onNext}>
        <GrFormNextLink className="" size={24} color="var(--color-text-1)" />
      </button>
    </div>
  )
}
