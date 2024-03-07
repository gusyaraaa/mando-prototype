import { Button } from 'shared/ui/controls/Button'
import { TermsHint } from 'shared/ui/common/TermsHint'

import s from './FormSubmitter.module.scss'

type Props = {
  isLocked?: boolean
  isSubmitting?: boolean
  isDisabled?: boolean
  showTermsHint?: boolean
  firstStepText?: React.ReactNode
  submitTestId?: string
  confirmTestId?: string
  onClickUnlock?: () => void
  onConfirm?: () => void
}

export function FormSubmitter({
  isLocked,
  isSubmitting,
  isDisabled,
  showTermsHint,
  firstStepText,
  submitTestId,
  confirmTestId,
  onClickUnlock,
  onConfirm,
}: Props) {
  return (
    <div className={s.wrapper}>
      {!isLocked && (
        <Button
          type="submit"
          fashion="accent"
          isLoading={isSubmitting}
          isDisabled={isDisabled}
          isFullWidth
          testId={submitTestId}
        >
          {firstStepText}
        </Button>
      )}
      {isLocked && (
        <div className={s.buttonsRow}>
          <Button
            isDisabled={isSubmitting}
            fashion="secondary"
            className={s.edit}
            onClick={onClickUnlock}
          >
            Edit
          </Button>
          <Button
            type={onConfirm ? 'button' : 'submit'}
            fashion="accent"
            className={s.confirm}
            isLoading={isSubmitting}
            isDisabled={isDisabled}
            testId={confirmTestId}
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </div>
      )}
      {showTermsHint && <TermsHint />}
    </div>
  )
}
