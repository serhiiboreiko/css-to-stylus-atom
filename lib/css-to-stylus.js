'use babel'

import CssToStylusView from './css-to-stylus-view'
import { CompositeDisposable } from 'atom'
import Css2Stylus from 'css2Stylus'
import { extname } from 'path'

export default {

  cssToStylusView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.cssToStylusView = new CssToStylusView(state.cssToStylusViewState)
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.cssToStylusView.getElement(),
      visible: false
    })

    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'css-to-stylus:toggle': () => this.toggle()
    }))
  },

  deactivate() {
    this.modalPanel.destroy()
    this.subscriptions.dispose()
    this.cssToStylusView.destroy()
  },

  serialize() {
    return {
      cssToStylusViewState: this.cssToStylusView.serialize()
    }
  },

  toggle() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      const pathOfCurrentFile = editor.buffer.file.path
      const extnameOfFile = extname(pathOfCurrentFile)
      if (extnameOfFile === '.css' || extnameOfFile === '.styl') {
        const css = editor.getSelectedText()
        const converter = new Css2Stylus.Converter(css)
        converter.processCss()
        const stylus = converter.getStylus()
        editor.insertText(stylus)
      } else {
        atom.notifications.addWarning('Extention of file must be .css or .styl')
      }
    }
  }
}
