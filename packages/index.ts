import type { App } from 'vue'
import AdminLayout from './AdminLayout'
import Scrollbar from './Scrollbar'

import 'uno.css'

export * from './AdminLayout'
export * from './Scrollbar'

export {
  AdminLayout,
  Scrollbar,
}

export default {
  install(app: App) {
    app.component('AdminLayout', AdminLayout)
    app.component('Scrollbar', Scrollbar)
  },
}
