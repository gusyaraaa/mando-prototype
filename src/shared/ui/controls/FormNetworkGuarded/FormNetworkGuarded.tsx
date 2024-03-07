import { FieldValues } from 'react-hook-form'
import { Form as FormSource, Props as PropsSource } from '../Form'
import { LoaderLayout } from 'shared/ui/layout/LoaderLayout'

type Props<TFieldValues extends FieldValues> = PropsSource<TFieldValues> & {
  formError?: string | null | undefined
  isLoading?: boolean
}

export function Form<TFieldValues extends FieldValues>(
  formProps: Props<TFieldValues>,
) {
  return (
    <>
      {formProps.isLoading && <LoaderLayout />}
      <FormSource {...formProps} />
    </>
  )
}
