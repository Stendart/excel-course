import {APPLY_STYLE, CELLS_VALUE, CHANGE_STYLES, TABLE_NAME, TABLE_RESIZE} from '@/store/types';

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

export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data,
  };
}

export function tableName(data) {
  return {
    type: TABLE_NAME,
    data,
  };
}
