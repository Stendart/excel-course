import {APPLY_STYLE, CELLS_VALUE, CHANGE_STYLES, TABLE_NAME, TABLE_RESIZE} from '@/store/types';

export function rootReducer(state, action) {
  let field;
  let prevState;
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
      // console.log(action.data);
      return {...state, currentStyles: action.data};
    case APPLY_STYLE:
      field = 'stylesState';
      prevState = state[field] || {};
      action.data.ids.forEach(id => {
        prevState[id] = {...prevState[id], ...action.data.value};
        // prevState[id] = action.data.value;
      });
      return {...state, [field]: prevState, currentStyles: {...state.currentStyles, ...action.data.value}};
    case TABLE_NAME:
      field = 'tableName';
      return {...state, [field]: action.data.value};
    default: return state;
  }
}

function value(state, action, field) {
  const prevState = state[field] || {};
  prevState[action.data.id] = action.data.value;
  return prevState;
}
