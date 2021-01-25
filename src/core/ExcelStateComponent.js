import {ExcelComponent} from '@core/ExcelComponent';

export class ExcelStateComponent extends ExcelComponent {
  constructor(...args) {
    super(...args);
  }

  initState(initialState = {}) {
    this.state = {...initialState};
  }

  get template() {
    return JSON.stringify(this.state);
  }

  setState(state) {
    this.state = {...this.state, ...state};
    this.$root.html(this.template);
  }
}
