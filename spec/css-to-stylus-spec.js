'use babel'

import CssToStylus from '../lib/css-to-stylus'

describe('CssToStylus', () => {
  let workspaceElement, activationPromise

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace)
    activationPromise = atom.packages.activatePackage('css-to-stylus')
  })

  describe('when the css-to-stylus:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      expect(workspaceElement.querySelector('.css-to-stylus')).not.toExist()

      atom.commands.dispatch(workspaceElement, 'css-to-stylus:toggle')

      waitsForPromise(() => {
        return activationPromise
      })

      runs(() => {
        expect(workspaceElement.querySelector('.css-to-stylus')).toExist()

        let cssToStylusElement = workspaceElement.querySelector('.css-to-stylus')
        expect(cssToStylusElement).toExist()

        let cssToStylusPanel = atom.workspace.panelForItem(cssToStylusElement)
        expect(cssToStylusPanel.isVisible()).toBe(true)
        atom.commands.dispatch(workspaceElement, 'css-to-stylus:toggle')
        expect(cssToStylusPanel.isVisible()).toBe(false)
      })
    })

    it('hides and shows the view', () => {
      jasmine.attachToDOM(workspaceElement)

      expect(workspaceElement.querySelector('.css-to-stylus')).not.toExist()

      atom.commands.dispatch(workspaceElement, 'css-to-stylus:toggle')

      waitsForPromise(() => {
        return activationPromise
      })

      runs(() => {
        let cssToStylusElement = workspaceElement.querySelector('.css-to-stylus')
        expect(cssToStylusElement).toBeVisible()
        atom.commands.dispatch(workspaceElement, 'css-to-stylus:toggle')
        expect(cssToStylusElement).not.toBeVisible()
      })
    })
  })
})
