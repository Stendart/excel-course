import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/Dom';
import {tableName} from '@/store/action';
import {ActiveRoute} from '@/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header';
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
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

  onClick(e) {
    const $target = $(e.target);
    if ($target.metaData.button === 'delete') {
      const ask = confirm('Вы точно хотите удалить эту таблицу?');
      console.log(ActiveRoute.param);
      if (ask) {
        localStorage.removeItem('excel:' + ActiveRoute.param);
        ActiveRoute.navigate('');
      }
    } else if ($target.metaData.button === 'exit') {
      ActiveRoute.navigate('');
    }
  }

  toHTML() {
    return `
      <input class="input" data-value="table-name" value="${this.tableName()}"/>

      <div>
          <div class="button" data-button="delete">
              <span class="material-icons" data-button="delete">delete</span>
          </div>
          <div class="button" data-button="exit">
              <span class="material-icons" data-button="exit">exit_to_app</span>
          </div>
      </div>
    `;
  }
}
