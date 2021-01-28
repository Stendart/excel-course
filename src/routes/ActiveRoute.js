export class ActiveRoute {
  static get path() {
    return window.location.hash.slice(1);
  }

  static get pageId() {
    return this.path.split('/');
  }
}
