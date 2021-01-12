import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name;

    this.prepare();
  }
  // return component`s template
  toHTML() {
    return '';
  }

  prepare() {}

  init() {
    this.initDOMListener();
  }

  destroyed() {
    this.removeDOMListener();
  }
}
