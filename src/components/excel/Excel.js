import {$} from '@core/Dom';
import {Emitter} from '@core/Emitter';
import {StoreSubscriber} from '@core/storeSubscriber';
import {updateDate} from '@/store/action';

export class Excel {
  constructor(options) {
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
    this.wrapComponents = this.components.map(Component => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, componentOptions);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });
    return {
      $root,
    };
  }
  init() {
    this.store.dispatch(updateDate());
    this.subscriber.subscribeComponents(this.wrapComponents);
    this.wrapComponents.forEach(component => component.init());
  }

  destroy() {
    this.subscriber.unsubscribeFromStore();
    this.wrapComponents.forEach(component => {
      component.destroyed();
    });
  }
}
