const CHAR_CODE = {
  'A': 65,
  'Z': 90,
};

function createCell(_, metaName) {
  // console.log(toChar(_, metaName));
  return `<div class="cell" data-name_col="${toChar(_, metaName)}" contenteditable></div>`;
}

function toCollumn(char) {
  return `
    <div class="column" data-event="resize">
        ${char}
        <div class="resize resize-col" data-resize="col"></div>
    </div>
  `;
}

function createRow(index, content) {
  return `
    <div class="row" data-event="resize">
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

export function template(countRows= 10) {
  const countCol = CHAR_CODE.Z - CHAR_CODE.A + 1;

  const rows = [];

  const cols = new Array(countCol)
      .fill(null)
      .map(toChar)
      .map(toCollumn)
      .join('');

  rows.push(createRow('', cols));

  // Массив создания ячеек ряда
  const row = new Array(countCol)
      .fill(null)
      .map(createCell)
      .join('');

  for (let i = 0; i < countRows; i++) {
    rows.push(createRow(i+1, row));
  }

  // const tempRow = createRow(setRowInfo() + cols);
  return rows.join('');
}
