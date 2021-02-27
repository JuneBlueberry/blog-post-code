import './styles/index.scss'

import { Button } from './button/index'

const components = {
  Button
}

const install = function (Vue) {
  if (install.installed) return
  
  Object.keys(components).forEach(key => {
    Vue.component(components[key].name, components[key])
  })

}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const API = {
  install,
  ...components
}

export default API