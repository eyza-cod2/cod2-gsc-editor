'use babel';

import Cod2GscEditorPackageView from './cod2-gsc-editor-package-view';
import { CompositeDisposable } from 'atom';

export default {

  cod2GscEditorPackageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.cod2GscEditorPackageView = new Cod2GscEditorPackageView(state.cod2GscEditorPackageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.cod2GscEditorPackageView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'cod2-gsc-editor-package:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.cod2GscEditorPackageView.destroy();
  },

  serialize() {
    return {
      cod2GscEditorPackageViewState: this.cod2GscEditorPackageView.serialize()
    };
  },

  toggle() {
    console.log('Cod2GscEditorPackage was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
