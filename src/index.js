import './scss/index.scss';
// import {Excel} from '@/components/excel/Excel';
// import {Header} from '@/components/header/Header';
// import {Toolbar} from '@/components/toolbar/Toolbar';
// import {Formula} from '@/components/formula/Formula';
// import {Table} from '@/components/table/Table';
// import {createStore} from '@core/createStore';
// import {rootReducer} from '@/store/rootReducer';
// import {localStore} from '@/store/utils';
// import {initialState} from '@/store/initialState';
// import {debounce} from '@core/utils';
// const store = createStore(rootReducer, initialState);

import {Router} from '@/routes/Router';
import {DashboardPage} from '@/Pages/DashboardPage';
import {ExcelPage} from '@/Pages/ExcelPage';

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
});
// const stateListener = debounce(state => {
//   localStore('excel-state', state);
// }, 300);
//
// store.subscribe(stateListener);
//
// const excel = new Excel('#app', {
//   components: [Header, Toolbar, Formula, Table],
//   store,
// });
//
// excel.render();
