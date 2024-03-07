import cns from 'classnames'
import { useMemo } from 'react'
import ReactPaginate from 'react-paginate'
import { useMediaBreakpoints } from 'shared/hooks/useMediaBreakpoints'

import ForwardSVG from 'assets/forward.svg'
import BackSVG from 'assets/back.svg'

import s from './Pagination.module.scss'

type Props = {
  onPageChange: (selectedItem: { selected: number }) => void
  pageCount: number
  selectedPage?: number
  isDisabled?: boolean
  className?: string
  pageRangeDisplayed?: number
  marginPagesDisplayed?: number
}

export const Pagination = ({
  onPageChange,
  pageCount,
  selectedPage,
  isDisabled,
  className,
  pageRangeDisplayed: propsPageRangeDisplayed,
  marginPagesDisplayed: propsMarginPagesDisplayed,
}: Props) => {
  const { isTablet, isMobile } = useMediaBreakpoints()

  const pageRangeDisplayed = useMemo(() => {
    if (propsPageRangeDisplayed !== undefined) {
      return propsPageRangeDisplayed
    }
    return isMobile ? 2 : isTablet ? 5 : 9
  }, [propsPageRangeDisplayed, isMobile, isTablet])

  const marginPagesDisplayed = useMemo(() => {
    if (propsMarginPagesDisplayed !== undefined) {
      return propsMarginPagesDisplayed
    }
    return isMobile ? 0 : 1
  }, [propsMarginPagesDisplayed, isMobile, isTablet])

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={
        <div>
          Next <ForwardSVG />
        </div>
      }
      onPageChange={onPageChange}
      previousLabel={
        <div>
          <BackSVG />
        </div>
      }
      forcePage={selectedPage}
      containerClassName={cns(s.pagination, className, {
        [s.isDisabled]: isDisabled,
      })}
      pageClassName={s.page}
      breakClassName={s.page}
      previousClassName={s.page}
      nextClassName={s.page}
      pageLinkClassName={s.pageLink}
      activeLinkClassName={s.active}
      previousLinkClassName={s.previous}
      nextLinkClassName={s.next}
      breakLinkClassName={s.pageLink}
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={marginPagesDisplayed}
      pageCount={pageCount}
      renderOnZeroPageCount={() => null}
    />
  )
}
