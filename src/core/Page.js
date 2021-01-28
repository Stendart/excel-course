export class Page {
  constructor(params) {
    this.params = params;
  }

  getRoot() {
    throw new Error('Methos "getRood" should be implemented');
  }

  afterRender() {}

  destroy() {}
}
