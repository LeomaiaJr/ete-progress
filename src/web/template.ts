const regex = RegExp(/\${(.+?)}/g)

export function doWatchers() {
  for (const element of Array.from(document.querySelectorAll('[data-watch]'))) {
    element.innerHTML = element.innerHTML.replace(regex, '<span data-watching="$1"></span>')
    element.removeAttribute('data-watch')
  }
}
const proxy = new Proxy({}, {
  set: (obj: any, key: string, value: any) => {
    if (key.startsWith('__'))
      return false

    doWatchers()
    obj[key] = value

    for (const element of Array.from(document.querySelectorAll(`[data-watching=${key}]`))) {
      element.innerHTML = value
    }

    for (const element of Array.from(document.querySelectorAll(`[data-bind-${key}]`))) {
      for (const attribute of element.getAttribute(`data-bind-${key}`).split(', ')) {
        element.setAttribute(attribute, value)
      }
    }

    return true
  },
})

export default proxy
