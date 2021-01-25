import {localStore} from '@/store/utils';
import {defaultStyles} from '@/constants';

const defaultState = {
  rowState: {},
  colState: {},
  currentText: '',
  dataState: {},
  currentStyles: defaultStyles,
};

const store = localStore('excel-state');

export const initialState = store ? store : defaultState;
