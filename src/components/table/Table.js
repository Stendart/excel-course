import {ExcelComponent} from '@core/ExcelComponent';
import {template} from '@/components/table/tableTemplate';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  toHTML() {
    return template();
  }
}
