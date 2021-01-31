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
import {normalizeInitialState} from '@/store/initialState';

function storeName(param) {
  return 'excel:' + param;
}

export class ExcelPage extends Page {
  getRoot() {
    const parems = this.params || Date.now().toString();
    console.log(parems);
    const state = localStore(storeName(parems));
    const store = createStore(rootReducer, normalizeInitialState(state));

    const stateListener = debounce(state => {
      localStore(storeName(this.params), state);
    }, 300);

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot().$root;
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
