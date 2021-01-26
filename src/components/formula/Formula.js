import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options,
    });
    this.formula = null;
  }

  init() {
    super.init();

    this.formula = this.$root.find('.js-input');

    this.$on('table:changeCell', data => {
      this.formula.text(data);
      // this.formula.text(data.metaData.value);
    });
    // this.$on('table:text', data => formula.text(data));
  }

  storeChanged(currentText) {
    this.formula.text(currentText.currentText);
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
