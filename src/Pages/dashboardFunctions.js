import {localStore} from '@/store/utils';

function toHTML(key) {
  const model = localStore(key);
  const id = key.split(':')[1];
  console.log(new Date(model.openedDate));
  return `
      <li class="db__record">
          <a href="#excel/${id}">${model.tableName}</a>
          <strong>${new Date(model.openedDate).toLocaleDateString()}
                  ${new Date(model.openedDate).toLocaleTimeString()}
          </strong>
      </li>
`;
}

function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes('excel')) {
      continue;
    }
    keys.push(key);
  }
  return keys;
}

export function createRecordsTable() {
  const keys = getAllKeys();
  if (keys.length === 0) {
    return 'Вы не создали не одной таблицы';
  }
  return `
  <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
  </div>
  
  <ul class="db__list">
      ${keys.map(toHTML).join('')}
  </ul>
`;
}
