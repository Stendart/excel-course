import {ExcelComponent} from '@core/ExcelComponent';
import {template} from '@/components/table/tableTemplate';
import {resizeHendler} from '@/components/table/tableResize';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/Dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
      ...options,
    });
  }

  prepare() {
    this.select = new TableSelection();
  }

  init() {
    super.init();
    const el = this.$root.find('[data-id="0:0"]');
    this.select.select(el);

    this.$on('formula-input', (data)=> {
      this.select.current.text(data);
    });

    this.$on('formula:enter', (data)=> {
      this.select.current.focus();
    });
  }

  onMousedown(e) {
    const dataAttribyte = e.target.dataset;

    // if we click on resize element
    if (dataAttribyte.resize) {
      resizeHendler(e);
    } else
    // if we click to cell for select
    if (dataAttribyte.id) {
      const target = $(e.target);

      // if we need to select group cells
      if (e.shiftKey) {
        this.selectGroupCells(target);
      } else { // if we need to celect one cell
        this.select.select(target);
      }
    }
  }

  onKeydown(e) {
    const KEY_CONTROL = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Tab', 'Enter'];

    if (KEY_CONTROL.includes(e.code) && !e.shiftKey) {
      e.preventDefault();
      const id = this.select.current.parseId();
      const $newSelectCell = this.changeCell(e.code, id);
      this.select.select($newSelectCell);
    }
  }

  changeCell(key, {row, col}) {
    switch (key) {
      case 'ArrowRight':
      case 'Tab':
        col++;
        break;
      case 'ArrowLeft':
        col--;
        break;
      case 'ArrowUp':
        row--;
        break;
      case 'ArrowDown':
      case 'Enter':
        row++;
        break;
    }
    return this.$root.find(`[data-id="${row}:${col}"]`);
  }

  range(start, end) {
    if (start > end) {
      [start, end] = [end, start];
    }
    return new Array(end - start + 1)
        .fill(null)
        .map((_, index) => {
          return start + index;
        });
  }

  selectGroupCells(target) {
    const currentCell = this.select.current.parseId();
    const targetCell = target.parseId();

    const countRows = this.range(currentCell.row, targetCell.row);
    const countCols = this.range(currentCell.col, targetCell.col);

    const ids = countRows.reduce((acc, row)=> {
      countCols.forEach((col)=> acc.push(`${row}:${col}`));
      return acc;
    }, []);

    const cells = ids.map((id) => this.$root.find(`[data-id="${id}"]`));
    this.select.selectGroup(cells);
  }

  toHTML() {
    return template();
  }
}


