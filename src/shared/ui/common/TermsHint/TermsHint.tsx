import cns from 'classnames'
import { Text } from 'shared/ui/common/Text'

import s from './TermsHint.module.scss'

type Props = {
  buttonTitle?: string
  className?: string
}

export function TermsHint({ className, buttonTitle }: Props) {
  return (
    <Text
      isCentered
      size={14}
      weight={500}
      color="secondary"
      className={cns(s.termsHint, className)}
    >
      by clicking {buttonTitle ?? 'this button'} you agree to the{' '}
      <a
        href="/terms-of-service"
        target="_blank"
        rel="noreferrer"
        className={s.termsLink}
      >
        Terms of Service
      </a>
    </Text>
  )
}
