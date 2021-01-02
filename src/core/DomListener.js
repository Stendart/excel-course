import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners=[]) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener!`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListener() {
    this.listeners.forEach(listener => {
      const methodName = getMethodName(listener);
      this.methodName = this[methodName].bind(this);
      // console.log('this listener', this);
      if (!this[methodName]) {
        throw new Error(`Method ${methodName} is not implemented in ${this.name} Component`);
      }
      this.$root.on(listener, this[methodName]);
    });
  }

  removeDOMListener() {
    this.listeners.forEach(listener => {
      const methodName = getMethodName(listener);
      this.$root.remove(listener, this[methodName]);
    });
  }
}
// input -> onInput
function getMethodName(enentName) {
  return 'on' + capitalize(enentName);
}
