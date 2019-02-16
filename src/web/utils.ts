const actions: { [key: string]: (tElement: Element, tClasses: string[]) => void } = {
  disable: (tElement: Element, tClasses: string[]) => tElement.classList.remove(...tClasses),
  enable: (tElement: Element, tClasses: string[]) => tElement.classList.add(...tClasses),
  toggle: (tElement: Element, tClasses: string[]) => tClasses.forEach(
      tClass => tElement.classList.toggle(tClass),
  ),
}

export function initialize() {
  const selectors = Object.keys(actions).map(action => `[data-${action}]`).join(', ')

  for (const element of Array.from(document.querySelectorAll(selectors))) {
    const attribute = element.getAttributeNames().find(
        (attr: string) => Object.keys(actions).map(action => `data-${action}`).includes(attr),
    )

    const match = new RegExp(/^([\S,]+)(?:\s(\S+)$)?/).exec(element.getAttribute(attribute))
    if (!match) return

    const targetAction = actions[attribute.substr(5)]
    const targetElement = typeof match[2] !== 'undefined' ? document.querySelector(match[2]) : element
    const targetClasses = match[1].split(',')

    element.addEventListener('click', () => targetAction(targetElement, targetClasses))

    element.removeAttribute(attribute)
  }
}
