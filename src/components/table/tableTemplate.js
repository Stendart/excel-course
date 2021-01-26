// import {defaultStyles} from '@/constants';
// import {toInlineStyle} from '@core/utils';

import {toInlineStyle} from '@core/utils';
import {defaultStyles} from '@/constants';

const CHAR_CODE = {
  'A': 65,
  'Z': 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

// function createCell(_, metaName) {
//   return `<div class="cell" data-name_col="${toChar(_, metaName)}" contenteditable></div>`;
// }

function createCell(state, row) {
  // console.log('Стата', state.dataState);
  return function({width}, colIndex) {
    const cellValue = state.dataState[`${row}:${colIndex}`] || '';
    const id = `${row}:${colIndex}`;
    // console.log(cellValue);
    const styles = toInlineStyle({
      ...defaultStyles,
      ...state.stylesState[id],
    }); // toInlineStyle(defaultStyles);
    console.log(styles);
    return `<div class="cell" style="${styles}; width: ${width}"
            data-name_col="${toChar(null, colIndex)}"
            data-id="${id}"
            contenteditable>${cellValue}</div>`;
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
  // console.log(rowState[index]);
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
  // console.log('state', state);
  const rows = [];

  const cols = new Array(countCol)
      .fill(null)
      .map(toChar)
      .map(widthFrom(state))
      .map(toCollumn)
      // .map((value, index)=> {
      //   const width = getWidth(state.colState, index);
      //   return toCollumn(value, index, width);
      // })
      .join('');

  rows.push(createRow('', cols, state));

  // Массив создания ячеек ряда
  // const row = new Array(countCol)
  //     .fill(null)
  //     .map((_, i)=>createCell(i)())
  //     .join('');

  for (let i = 0; i < countRows; i++) {
    const row = new Array(countCol)
        .fill(null)
        // .map(createCell)
        .map(widthFrom(state))
        .map(createCell(state, i))
        .join('');

    rows.push(createRow(i+1, row, state));
  }

  // const tempRow = createRow(setRowInfo() + cols);
  return rows.join('');
}
