const regex = RegExp(/\${(.+?)}/)

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

    return true
  },
})

export default proxy
