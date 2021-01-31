// import {localStore} from '@/store/utils';
import {defaultStyles, defaultTitle} from '@/constants';

const defaultState = {
  rowState: {},
  colState: {},
  currentText: '',
  dataState: {},
  stylesState: {},
  tableName: defaultTitle,
  currentStyles: defaultStyles,
  openedDate: new Date().toJSON(),
};

// const store = localStore('excel-state');

// export const initialState = store ? store : defaultState;

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
});

export function normalizeInitialState(state) {
  return state ? normalize(state) : defaultState;
}
