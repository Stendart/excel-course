import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name;
    this.emitter = options.emitter;
    this.store = options.store;
    this.unsubscribers = [];
    this.subscribe = options.subscribe || [];
    // this.storeSub = null;

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

  storeChanged() {}

  $emit(eventName, data) {
    this.emitter.emit(eventName, data);
  }

  $on(eventName, fn) {
    const unsub = this.emitter.subscribe(eventName, fn);
    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  // $subscribe(fn) {
  //   this.storeSub = this.store.subscribe(fn);
  // }

  destroyed() {
    this.removeDOMListener();
    this.unsubscribers.forEach(subscribe => subscribe());
    // this.storeSub.unsubscribers();
  }
}
