import {CELLS_VALUE, TABLE_RESIZE} from '@/store/types';

export function rootReducer(state, action) {
  let prevState;
  switch (action.type) {
    case TABLE_RESIZE:
      if (action.data.type === 'col') {
        prevState = state.colState || {};
        prevState[action.data.id] = action.data.value;
        return {...state, colState: prevState};
      } else if (action.data.type === 'row') {
        prevState = state.rowState || {};
        prevState[action.data.id] = action.data.value;
        return {...state, rowState: prevState};
      }
      break;
    case CELLS_VALUE:
      prevState = state['dataState'] || {};
      prevState[action.data.id] = action.data.value;
      console.log(action.data.id);
      return {...state, currentText: action.data.value, dataState: prevState};
    default: return state;
  }
}
