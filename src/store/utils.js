export function localStore(key, data = null) {
  if (!data) {
    // const d = JSON.parse(localStorage.getItem(key));
    // console.log('Store DATA', d);
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
}
