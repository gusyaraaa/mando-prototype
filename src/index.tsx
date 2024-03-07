import { createRoot } from 'react-dom/client'
import { AppRoot } from './modules/appRoot/AppRoot'
import { getLSTheme, loadThemeColors } from 'modules/themes/loadTheme'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'

dayjs.extend(utc)

dayjs.extend(tz)

loadThemeColors(getLSTheme())

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<AppRoot />)
