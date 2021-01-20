import {TABLE_RESIZE} from '@/store/types';

export function rootReducer(state, action) {
  switch (action.type) {
    case TABLE_RESIZE:
      if (action.data.type === 'col') {
        const prevState = state.colState || {};
        prevState[action.data.id] = action.data.value;
        return {...state, colState: prevState};
      } else if (action.data.type === 'row') {
        const prevState = state.rowState || {};
        prevState[action.data.id] = action.data.value;
        return {...state, rowState: prevState};
      }
      break;
    default: return state;
  }
}
