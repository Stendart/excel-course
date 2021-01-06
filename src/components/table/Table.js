import {ExcelComponent} from '@core/ExcelComponent';
import {template} from '@/components/table/tableTemplate';
import {resizeHendler} from '@/components/table/tableResize';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }

  onMousedown(e) {
    // if we click on resize element
    if (e.target.dataset.resize) {
      resizeHendler(e);
    }
  }

  toHTML() {
    return template();
  }
}
