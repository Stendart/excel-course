import {ExcelComponent} from '@core/ExcelComponent';
import {template} from '@/components/table/tableTemplate';
import {resizeHendler} from '@/components/table/tableResize';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/Dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }

  prepare() {
    this.select = new TableSelection();
  }

  init() {
    super.init();
    const el = this.$root.find('[data-id="0:0"]');
    this.select.select(el);
  }

  onMousedown(e) {
    const dataAttribyte = e.target.dataset;

    // if we click on resize element
    if (dataAttribyte.resize) {
      resizeHendler(e);
    } else if (dataAttribyte.id) {
      // const el = this.$root.find(`[data-id="${dataAttribyte.id}"]`);
      const target = $(e.target);
      this.select.select(target);
    }
  }

  toHTML() {
    return template();
  }
}
