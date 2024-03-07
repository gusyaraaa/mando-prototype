import cns from 'classnames'
import React, { ReactNode, useState } from 'react'
import BackSVG from 'assets/back.svg'
import ForwardSVG from 'assets/forward.svg'
// eslint-disable-next-line css-modules/no-unused-class
import s from './Carousel.module.scss'

type Props = {
  type?: 'big' | 'small'
  children: ReactNode[]
  className?: string
}

export const Carousel = ({ children, className, type = 'small' }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const count = React.Children.count(children)
  const maxVisibility = type === 'big' ? 3 : 2

  return (
    <div className={cns(s.carousel, className, s[type])}>
      {children.map((item: any, i: number) => (
        <div
          key={i}
          className={cns(s.card, activeIndex === i ? s.selected : '')}
          style={
            {
              '--active': i === activeIndex ? 1 : 0,
              '--offset': (activeIndex - i) / (type === 'big' ? 1 : 2),
              '--abs-offset':
                Math.abs(activeIndex - i) / (type === 'big' ? 5 : 4),
              pointerEvents: activeIndex === i ? 'auto' : 'none',
              opacity: Math.abs(activeIndex - i) >= maxVisibility ? '0' : '1',
              zIndex: activeIndex === i ? 10 : 10 - Math.abs(i - activeIndex),
              display:
                Math.abs(activeIndex - i) > maxVisibility ? 'none' : 'block',
            } as any
          }
        >
          {item}
        </div>
      ))}
      <div className={s.navigation}>
        {activeIndex > 0 && (
          <button
            className={s.left}
            onClick={() => setActiveIndex(i => i - 1)}
            data-test-id="carousel-back-button"
          >
            <BackSVG />
          </button>
        )}
        {activeIndex < count - 1 && (
          <button
            className={s.right}
            onClick={() => setActiveIndex(i => i + 1)}
            data-test-id="carousel-forward-button"
          >
            <ForwardSVG />
          </button>
        )}
      </div>
    </div>
  )
}
