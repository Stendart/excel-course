import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name;
    this.emitter = options.emitter;
    this.unsubscribers = [];

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

  $emit(eventName, data) {
    this.emitter.emit(eventName, data);
  }

  $on(eventName, fn) {
    const unsub = this.emitter.subscribe(eventName, fn);
    this.unsubscribers.push(unsub);
  }

  destroyed() {
    this.removeDOMListener();
    this.unsubscribers.forEach(subscribe => subscribe());
  }
}
