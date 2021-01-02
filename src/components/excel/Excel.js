import {$} from '@core/Dom';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = $.create('div', 'excel');
    // инициализация инстансов классов и добавление в ДОМ root компонент
    const wrapComponents = this.components.map(Component => {
      const $el = $.create('div', Component.className);
      const component = new Component($el);
      $el.html(component.toHTML());
      $root.append($el);
      // Debug
      if (component.name) {
        window['c' + component.name] = component;
      }
      return component;
    });
    return {
      wrapComponents,
      $root,
    };
  }
  render() {
    const {wrapComponents, $root} = this.getRoot();
    this.$el.append($root);
    wrapComponents.forEach(component => component.init());
  }
}
