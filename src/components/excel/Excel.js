import {$} from '@core/Dom';
import {Emitter} from '@core/Emitter';
import {StoreSubscriber} from '@core/storeSubscriber';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.store = options.store;
    this.emitter = new Emitter();
    this.subscriber = new StoreSubscriber(this.store);
  }

  getRoot() {
    const $root = $.create('div', 'excel');
    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
    };
    // инициализация инстансов классов и добавление в ДОМ root компонент
    const wrapComponents = this.components.map(Component => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, componentOptions);
      $el.html(component.toHTML());
      $root.append($el);
      // // Debug
      // if (component.name) {
      //   window['c' + component.name] = component;
      // }
      return component;
    });
    return {
      wrapComponents,
      $root,
    };
  }
  render() {
    const {wrapComponents, $root} = this.getRoot();
    this.subscriber.subscribeComponents(wrapComponents);
    this.$el.append($root);
    wrapComponents.forEach(component => component.init());
  }

  destroy() {
    this.subscriber.unsubscribeFromStore();
    this.components.forEach(component => component.destroy());
  }
}
