// import {ExcelComponent} from '@core/ExcelComponent';
import {template} from '@/components/toolbar/toolbarTemplate';
import {$} from '@core/Dom';
import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {defaultStyles} from '@/constants';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    });
  }

  prepare() {
    this.initState(defaultStyles);
  }

  get template() {
    return template(this.state);
  }

  storeChanged(changes) {
    console.log(changes);
    this.setState(changes.currentStyles);
  }

  onClick(e) {
    const $target = $(e.target);
    if ($target.metaData.type === 'bytton') {
      const value = JSON.parse($target.metaData.value);
      // const key = Object.keys(value)[0];
      // this.setState({[key]: value[key]});
      // console.log(this.state);

      this.$emit('toolbar:applyStyle', value);
    }
  }

  toHTML() {
    return this.template;
  }
}
