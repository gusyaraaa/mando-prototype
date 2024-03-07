import {
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
  forwardRef,
} from 'react'
import cns from 'classnames'
import { useMergeRefs } from 'use-callback-ref'
import {
  SelectOptions,
  SelectOptionItem,
  SelectOptionsNotify,
} from '../SelectOptions'
import { FieldError } from 'shared/ui/controls/FieldError'
import ArrowIcon from 'assets/drop.svg'
import s from './Select.module.scss'

type Value = string

export type SelectOption = {
  label: React.ReactNode
  value: Value
  icon?: React.ReactNode
  isDisabled?: boolean
}

type Props = {
  id?: string
  name?: string
  placeholder?: string
  className?: string
  boxClassName?: string
  optionClassName?: string
  value?: Value
  defaultValue?: Value
  options: SelectOption[]
  concat?: 'top' | 'middle' | 'bottom'
  readOnly?: boolean
  error?: React.ReactNode
  testId?: string
  onChange?: (value: Value) => void
  onFocus?: React.FocusEventHandler
  onBlur?: React.FocusEventHandler
}

function SelectRaw(props: Props, ref: React.Ref<HTMLInputElement>) {
  const {
    id,
    name,
    value: propValue,
    defaultValue,
    options,
    placeholder,
    onChange,
    className,
    boxClassName,
    optionClassName,
    concat,
    readOnly,
    onFocus,
    onBlur,
    error,
    testId,
  } = props

  const optsCount = options.length
  const rootRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const optionsRef = useRef<HTMLDivElement | null>(null)
  const [isFocused, setFocused] = useState(false)
  const [internalValue, setInternalValue] = useState(defaultValue || '')
  const [activeIdx, setActiveIdx] = useState(-1)

  const isControlled = propValue !== undefined
  const value = isControlled ? propValue : internalValue

  const doBlur = useCallback(() => {
    setFocused(false)
    setActiveIdx(-1)
  }, [])

  const handleClickBox = useCallback(() => {
    if (readOnly || !inputRef.current) return
    if (isFocused) {
      inputRef.current.blur()
    } else {
      inputRef.current.focus()
    }
  }, [readOnly, isFocused])

  const handleClickOption = useCallback(
    (idx: number) => {
      if (readOnly) return

      const option = options[idx]

      doBlur()
      setInternalValue(option.value)
      if (onChange) {
        onChange(option.value)
      }
    },
    [options, onChange, doBlur, readOnly],
  )

  const handleFocus = useCallback(
    (e: React.FocusEvent) => {
      if (readOnly) return
      setFocused(true)
      if (onFocus) {
        onFocus(e)
      }
    },
    [readOnly, onFocus],
  )

  const handleBlur = useCallback(
    (e: React.FocusEvent) => {
      if (readOnly) return
      doBlur()
      if (onBlur) {
        onBlur(e)
      }
    },
    [doBlur, onBlur, readOnly],
  )

  const currentOption = useMemo(() => {
    return options.find(o => o.value === value)
  }, [options, value])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const { key } = e

      if (!isFocused) {
        return
      }

      if (key === 'Enter') {
        e.preventDefault()
        if (!options[activeIdx].isDisabled) handleClickOption(activeIdx)
      } else if (key === 'Escape') {
        doBlur()
      } else if (key === 'ArrowDown') {
        e.preventDefault()
        const nextActiveIndex = activeIdx >= optsCount - 1 ? 0 : activeIdx + 1

        setActiveIdx(nextActiveIndex)
      } else if (key === 'ArrowUp') {
        e.preventDefault()
        const prevActiveIndex = activeIdx <= 0 ? optsCount - 1 : activeIdx - 1

        setActiveIdx(prevActiveIndex)
      }
    },
    [activeIdx, doBlur, handleClickOption, optsCount, isFocused, options],
  )

  useEffect(() => {
    const el = optionsRef.current

    if (!el || activeIdx < 0 || activeIdx >= optsCount) {
      return
    }

    const optEl = el.childNodes[activeIdx] as Element

    optEl.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    })
  }, [activeIdx, optsCount])

  return (
    <div
      ref={rootRef}
      className={cns(s.wrap, className, {
        [s.isConcatTop]: concat === 'top',
        [s.isConcatMiddle]: concat === 'middle',
        [s.isConcatBottom]: concat === 'bottom',
      })}
    >
      {/* Input emulates default form field behaviour */}
      <input
        ref={useMergeRefs([inputRef, ref])}
        id={id}
        name={name}
        type="text"
        readOnly
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={s.input}
        onKeyDown={handleKeyDown}
        data-test-id={testId}
      />
      <div
        className={cns(
          s.box,
          {
            [s.isFocused]: isFocused,
            [s.isError]: Boolean(error),
            [s.isReadOnly]: readOnly,
            [s.isInteractive]: !readOnly,
          },
          boxClassName,
        )}
        onClick={handleClickBox}
        onMouseDown={e => e.preventDefault()}
        onMouseUp={e => e.preventDefault()}
        data-test-id={`${testId}-box`}
      >
        <span
          className={cns(s.placeholder, {
            [s.isMoved]: Boolean(currentOption),
          })}
        >
          {placeholder}
        </span>
        {currentOption?.label}
        {currentOption?.icon && (
          <div className={s.optionIcon}>{currentOption.icon}</div>
        )}
        <div className={cns(s.arrowWrap, { [s.arrowDisabled]: readOnly })}>
          <ArrowIcon className={s.arrow} />
        </div>
        {error && <FieldError className={s.error}>{error}</FieldError>}
      </div>
      {isFocused && (
        <SelectOptions
          concat={concat}
          optionsRef={optionsRef}
          isError={!!error}
        >
          {options.length > 0 ? (
            options.map((option, i) => (
              <SelectOptionItem
                className={optionClassName}
                icon={option.icon}
                isActive={i === activeIdx}
                isDisabled={option.isDisabled}
                label={option.label}
                key={`${i}-${option.value}`}
                onMouseDown={() => handleClickOption(i)}
                testId={`${testId}-option-${option.value}`}
              />
            ))
          ) : (
            <SelectOptionsNotify>No options</SelectOptionsNotify>
          )}
        </SelectOptions>
      )}
    </div>
  )
}

export const Select = forwardRef(SelectRaw)
