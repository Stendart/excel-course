const CHAR_CODE = {
  'A': 65,
  'Z': 90,
};

// function createCell(_, metaName) {
//   return `<div class="cell" data-name_col="${toChar(_, metaName)}" contenteditable></div>`;
// }

function createCell(row) {
  return function(_, colIndex) {
    return `<div class="cell" 
            data-name_col="${toChar(_, colIndex)}"
            data-id="${row}:${colIndex}"
            contenteditable></div>`;
  };
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
  // const row = new Array(countCol)
  //     .fill(null)
  //     .map((_, i)=>createCell(i)())
  //     .join('');

  for (let i = 0; i < countRows; i++) {
    const row = new Array(countCol)
        .fill(null)
        // .map(createCell)
        .map(createCell(i))
        .join('');

    rows.push(createRow(i+1, row));
  }

  // const tempRow = createRow(setRowInfo() + cols);
  return rows.join('');
}
