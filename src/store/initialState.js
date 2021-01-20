import {localStore} from '@/store/utils';

const defaultState = {
  rowState: {},
  colState: {},
};

const store = localStore('excel-state');

export const initialState = store ? store : defaultState;
