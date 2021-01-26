import {localStore} from '@/store/utils';
import {defaultStyles, defaultTitle} from '@/constants';

const defaultState = {
  rowState: {},
  colState: {},
  currentText: '',
  dataState: {},
  stylesState: {},
  tableName: defaultTitle,
  currentStyles: defaultStyles,
};

const store = localStore('excel-state');

export const initialState = store ? store : defaultState;
