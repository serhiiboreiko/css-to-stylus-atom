'use babel'

export default class CssToStylusView {

  constructor(serializedState) {
    this.element = document.createElement('div')
    this.element.classList.add('css-to-stylus')

    const message = document.createElement('div')
    message.textContent = ''
    message.classList.add('message')
    this.element.appendChild(message)
  }

  serialize() {}

  destroy() {
    this.element.remove()
  }

  getElement() {
    return this.element
  }
}
