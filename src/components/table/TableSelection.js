export class TableSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
    this.current;
  }
  select($el) {
    this.clear();
    this.group.push($el);
    this.current = $el;
    $el.addClass(TableSelection.className);
    $el.focus();
  }

  clear() {
    this.group.forEach((el)=> {
      el.removeClass(TableSelection.className);
    });
    this.group = [];
  }

  selectGroup(group = []) {
    this.clear();
    this.group = group;
    this.group.forEach((el)=> {
      el.addClass(TableSelection.className);
    });
  }

  get selectedIds() {
    return this.group.map(el => el.id);
  }

  applyStyle(style) {
    this.group.forEach((e=> {
      e.css(style);
    }));
  }
}
