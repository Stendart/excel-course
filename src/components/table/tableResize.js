import {$} from '@core/Dom';

export function resizeHendler(e) {
  const $resize = $(e.target);
  const $parent = $resize.closest('[data-event="resize"]');
  let sizeWidth;
  let sizeHeight;

  // Change size of row or column
  if ($resize.metaData.resize === 'col') {
    $resize.css({height: '100vh', opacity: 1});
    document.onmousemove = event => {
      sizeWidth = resizeWidth(event, $parent, $resize);
    };
  }

  if ($resize.metaData.resize === 'row') {
    $resize.css({width: '100vw', opacity: 1});
    document.onmousemove = event => {
      sizeHeight = resizeHeight(event, $parent, $resize);
    };
  }

  document.onmouseup = event => {
    document.onmousemove = null;
    if ($resize?.metaData.resize === 'col') {
      const resizeble = {
        $parent,
        $resize,
      };
      resizeCell(resizeble, sizeWidth);
    } else
    if ($resize?.metaData.resize === 'row') {
      const resizeble = {
        $parent,
        $resize,
      };

      resizeRow(resizeble, sizeHeight);
    }
  };
}

function resizeWidth(e, $parent, $resizer) {
  const $parentCoordinate = $parent.getCoordinates();
  const delta = e.clientX - $parentCoordinate.right;
  const newSizeVal = $parentCoordinate.width + delta;
  $resizer.css({right: -delta + 'px'});
  return newSizeVal;
}

function resizeHeight(e, $parent, $resizer) {
  const $parentCoordinate = $parent.getCoordinates();
  const delta = e.clientY - $parentCoordinate.bottom;
  const newSizeVal = $parentCoordinate.height + delta;
  $resizer.css({bottom: -delta + 'px'});
  return newSizeVal;
}

export function resizeCell(cell, widthVal ) {
  const colLetter = cell.$parent.el.textContent.trim();
  const cellList = serchCollCell(colLetter);

  cell.$parent.css({width: widthVal + 'px'});
  cell.$resize.css({right: 0 + 'px', height: '', opacity: 0});

  cellList.forEach((el)=>{
    el.style.width = widthVal + 'px';
  });
}

export function resizeRow(row, heightVal) {
  row.$parent.css({height: heightVal + 'px'});
  row.$resize.css({bottom: 0 + 'px', width: '', opacity: 0});
}

function serchCollCell(colLetter) {
  const cellList = document.querySelectorAll(`[data-name_col="${colLetter}"]`);
  return cellList;
}
