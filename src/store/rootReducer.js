import {CELLS_VALUE, CHANGE_STYLES, TABLE_RESIZE} from '@/store/types';

export function rootReducer(state, action) {
  let field;
  switch (action.type) {
    case TABLE_RESIZE:
      if (action.data.type === 'col') {
        // prevState = state.colState || {};
        // prevState[action.data.id] = action.data.value;
        field = 'colState';
        return {...state, colState: value(state, action, field)};
      } else if (action.data.type === 'row') {
        // prevState = state.rowState || {};
        // prevState[action.data.id] = action.data.value;
        field = 'rowState';
        return {...state, rowState: value(state, action, field)};
      }
      break;
    case CELLS_VALUE:
      // prevState = state['dataState'] || {};
      // prevState[action.data.id] = action.data.value;
      // console.log(action.data.id);
      field = 'dataState';
      return {...state, currentText: action.data.value, dataState: value(state, action, field)};
    case CHANGE_STYLES:
      console.log(action.data);
      return {...state, currentStyles: action.data};
    default: return state;
  }
}

function value(state, action, field) {
  const prevState = state[field] || {};
  prevState[action.data.id] = action.data.value;
  return prevState;
}
