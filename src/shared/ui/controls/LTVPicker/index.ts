import { withFormController } from 'shared/hocs/withFormController'
import { LTVPicker } from './LTVPicker'

export { LTVPicker }

export const LTVPickerControl = withFormController(LTVPicker)
