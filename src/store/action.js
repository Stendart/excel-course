import {CELLS_VALUE, CHANGE_STYLES, TABLE_RESIZE} from '@/store/types';

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data,
  };
}

export function cellsValue(data) {
  return {
    type: CELLS_VALUE,
    data,
  };
}

export function changeStyles(data) {
  return {
    type: CHANGE_STYLES,
    data,
  };
}
