import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  init() {
    super.init();

    const formula = this.$root.find('.js-input');
    this.$on('table:changeCell', data => formula.text(data));
    this.$on('table:text', data => formula.text(data));
  }

  toHTML() {
    return `
        <div class="info">fx</div>
        <div class="input js-input" contenteditable="true" spellcheck="false"></div>
    `;
  }

  onInput(e) {
    this.$emit('formula-input', e.target.textContent.trim());
  }

  onKeydown(e) {
    const KEY_CONTROL = ['Enter', 'Tab'];
    if (KEY_CONTROL.includes(e.code)) {
      e.preventDefault();
      this.$emit('formula:done');
    }
  }
}
