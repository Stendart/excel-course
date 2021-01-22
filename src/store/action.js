import {CELLS_VALUE, TABLE_RESIZE} from '@/store/types';

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

