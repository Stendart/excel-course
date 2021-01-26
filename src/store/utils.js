export function localStore(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
}


export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}
