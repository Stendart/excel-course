import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'excel__header';
  constructor($root) {
    super($root, {
      name: 'Header',
      listeners: ['click'],
    });
  }
  onClick() {
    console.log('click');
  }
  toHTML() {
    return `
      <input class="input" value="Новая таблица"/>

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
