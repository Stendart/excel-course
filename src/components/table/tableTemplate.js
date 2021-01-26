import {toInlineStyle} from '@core/utils';
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';

const CHAR_CODE = {
  'A': 65,
  'Z': 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function createCell(state, row) {
  return function({width}, colIndex) {
    const cellValue = state.dataState[`${row}:${colIndex}`] || '';
    const id = `${row}:${colIndex}`;
    const styles = toInlineStyle({
      ...defaultStyles,
      ...state.stylesState[id],
    }); // toInlineStyle(defaultStyles);
    return `<div class="cell" style="${styles}; width: ${width}"
            data-name_col="${toChar(null, colIndex)}"
            data-id="${id}"
            data-value="${cellValue || ''}"
            contenteditable>${parse(cellValue) || ''}</div>`;
  };
}

function toCollumn({char, index, width}) {
  return `
    <div class="column" data-event="resize" style="width: ${width}">
        ${char}
        <div class="resize resize-col" data-resize="col"></div>
    </div>
  `;
}

function createRow(index, content, {rowState}) {
  const height = rowState[index] || DEFAULT_HEIGHT;
  return `
    <div class="row" data-event="resize" data-id="${index}" style="height: ${height}px">
        <div class="row-info">
            ${index}
            <div class="resize resize-row" data-resize="row"></div>
        </div>
        <div class="row-data">${content}</div>
    </div>`;
}

function toChar(_, i) {
  return String.fromCharCode(CHAR_CODE.A + i);
}

function getWidth(state, index) {
  const char = toChar(null, index);
  return (state[char] || DEFAULT_WIDTH) + 'px';
}

function widthFrom(state) {
  return function(char, index) {
    return {char, index, width: getWidth(state.colState, index)};
  };
}

export function template(countRows= 10, state = {}) {
  const countCol = CHAR_CODE.Z - CHAR_CODE.A + 1;
  const rows = [];

  const cols = new Array(countCol)
      .fill(null)
      .map(toChar)
      .map(widthFrom(state))
      .map(toCollumn)
      .join('');

  rows.push(createRow('', cols, state));

  for (let i = 0; i < countRows; i++) {
    const row = new Array(countCol)
        .fill(null)
        // .map(createCell)
        .map(widthFrom(state))
        .map(createCell(state, i))
        .join('');

    rows.push(createRow(i+1, row, state));
  }

  return rows.join('');
}
