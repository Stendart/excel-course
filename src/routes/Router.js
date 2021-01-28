import {$} from '@core/Dom';
// import {ActiveRoute} from '@/routes/ActiveRoute';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('You must append selector in Router');
    }
    this.$placeholder = $(selector);
    this.routes = routes;

    this.changePageHandler = this.changePageHandler.bind(this);
    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  changePageHandler(e) {
    // console.log(ActiveRoute.path);
    // console.log(ActiveRoute.pageId);
    const Page = this.routes.excel;
    const page = new Page();
    console.log(page.getRoot());
    this.$placeholder.append(page.getRoot());

    page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
