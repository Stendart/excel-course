import {localStore} from '@/store/utils';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {Page} from '@core/Page';
import {debounce} from '@core/utils';
import {createStore} from '@core/createStore';
import {rootReducer} from '@/store/rootReducer';
import {initialState} from '@/store/initialState';

export class ExcelPage extends Page {
  getRoot() {
    const store = createStore(rootReducer, initialState);
    const stateListener = debounce(state => {
      localStore('excel-state', state);
    }, 300);

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot().$root;
  }

  afterRender() {
    console.log('init');
    this.excel.init();
  }

  destroy() {
    console.log('destroy');
    this.excel.destroy();
  }
}
