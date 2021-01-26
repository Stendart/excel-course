import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/Dom';
import {tableName} from '@/store/action';

export class Header extends ExcelComponent {
  static className = 'excel__header';
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      subscribe: ['tableName'],
      ...options,
    });
  }

  tableName() {
    return this.store.getState().tableName;
  }

  onInput(e) {
    const title = $(e.target);
    this.store.dispatch(tableName({
      value: title.text(),
    }));
    // console.log(title.text());
  }

  toHTML() {
    return `
      <input class="input" data-value="table-name" value="${this.tableName()}"/>

      <div>
          <div class="button">
              <span class="material-icons">delete</span>
          </div>
          <div class="button">
              <span class="material-icons">exit_to_app</span>
          </div>
      </div>
    `;
  }
}
