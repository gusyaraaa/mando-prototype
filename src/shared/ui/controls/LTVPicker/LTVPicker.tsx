/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { forwardRef, useCallback, useState } from 'react'
import cns from 'classnames'
import { Text } from 'shared/ui/common/Text'

import ArrowSVG from 'assets/arrow.svg'

import s from './LTVPicker.module.scss'

type Props = {
  options: { ltv: number; apr: number; isHidden?: boolean }[]
  id?: string
  name?: string
  value?: number
  testId?: string
  readOnly?: boolean
  className?: string
  onChange?: (value: number) => void
}

const LTVPickerRaw = (props: Props, ref: React.Ref<HTMLInputElement>) => {
  const {
    id,
    name,
    options,
    value: propValue,
    testId,
    readOnly,
    className,
    onChange,
  } = props
  const [internalLtvOptionsIndex, setInternalLtvOptionsIndex] = useState(-1)

  const isControlled = propValue !== undefined
  const ltvOptionsIndex = isControlled ? propValue : internalLtvOptionsIndex

  const handleClickOption = useCallback(
    (idx: number) => () => {
      if (readOnly) return
      setInternalLtvOptionsIndex(idx)
      if (onChange) {
        onChange(idx)
      }
    },
    [options, onChange, readOnly],
  )

  return (
    <div
      className={cns(
        s.wrap,
        { [s.inactive]: ltvOptionsIndex === undefined },
        className,
      )}
    >
      {/* Input emulates default form field behaviour */}
      <input
        id={id}
        name={name}
        ref={ref}
        type="text"
        readOnly
        value={ltvOptionsIndex}
        className={s.input}
        data-test-id={testId}
      />
      <Text className={s.label} color="branded" size={12} isUppercased>
        Loan amount relative value of the collateral (LTV)
      </Text>
      <div className={s.options} data-test-id={`${testId}-options`}>
        {options.length ? (
          options.map(({ ltv, apr, isHidden }, index) => (
            <button
              type="button"
              key={index}
              className={cns(s.option, {
                [s.readOnly]: readOnly,
                [s.active]: index === ltvOptionsIndex,
                [s.hidden]: isHidden,
              })}
              onClick={handleClickOption(index)}
            >
              <Text color="branded" className={s.optionLabel}>
                {ltv}%
              </Text>
              <div className={s.divider} />
              <Text color="greenapple" className={s.optionLabel}>
                {apr}%
              </Text>
              <ArrowSVG className={s.arrow} />
            </button>
          ))
        ) : (
          <div className={s.loader}>
            <div className={s.spacer} />
            <div className={s.line} />
            <div className={s.spacer} />
          </div>
        )}
      </div>
      <Text className={s.label} color="greenapple" size={12} isUppercased>
        annual Interest Rate (APR)
      </Text>
    </div>
  )
}

export const LTVPicker = forwardRef(LTVPickerRaw)
