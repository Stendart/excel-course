class Dom {
  constructor(selector) {
    this.el = typeof selector === 'string'
    ? document.querySelector(selector)
    : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.el.innerHTML = html;
      return this;
    }
    return this.el.outerHTML.trim();
  }

  on(eventType, fn) {
    this.el.addEventListener(eventType, fn);
  }

  // remove event listener
  remove(eventType, fn) {
    this.el.removeEventListener(eventType, fn);
  }

  clear() {
    this.html('');
    return this;
  }

  addClass(className) {
    this.el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.el.classList.remove(className);
    return this;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.el;
    }
    if (Element.prototype.append) {
      this.el.append(node);
    } else {
      this.el.appendChild(node);
    }

    return this;
  }

  closest(selector) {
    return $(this.el.closest(selector));
  }

  parseId() {
    const parsed = this.el.dataset.id.split(':');
    return {
      row: +parsed[0],
      col: +parsed[1],
    };
  }

  find(selector) {
    return $(document.querySelector(selector));
  }

  focus() {
    this.el.focus();
    return this;
  }

  getCoordinates() {
    return this.el.getBoundingClientRect();
  }

  get metaData() {
    return this.el.dataset;
  }

  text(text) {
    if (typeof text === 'string') {
      this.el.textContent = text;
      return true;
    }
    return this.el.textContent;
  }

  css(styles = {}) {
    // for (const key in styles) {
    //   if (Object.prototype.hasOwnProperty.call(styles, key)) {
    //     this.el.style[key] = styles[key];
    //   }
    // }
    Object.keys(styles).forEach(key=>this.el.style[key] = styles[key]);
  }
}
export function $(selector) {
  return new Dom(selector);
}

$.create = (element, className='') => {
  const el = document.createElement(element);
  if (className) {
    el.classList.add(className);
  }
  return $(el);
};
