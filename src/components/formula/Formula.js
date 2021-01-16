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
  }

  toHTML() {
    return `
        <div class="info">fx</div>
        <div class="input" contenteditable="true" spellcheck="false"></div>
    `;
  }

  onInput(e) {
    this.$emit('formula-input', e.target.textContent.trim());
  }

  onKeydown(e) {
    if (e.code === 'Enter') {
      this.$emit('formula:enter');
    }
  }
}
