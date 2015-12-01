import Ember from 'ember';

export default Ember.Mixin.create({
  focusIndex: -1,

  /**
   * Selects the previous item.
   *
   * @method selectPrevious
   */
  selectPrevious() {
    const menuItems = this.get('menuItems');
    const focusIndex = this.get('focusIndex');
    const length = this.get('menuItems.length');
    let offset = 1;
    let index = (focusIndex - offset + length) % length;

    // Ensure we don't select a disabled item
    while (menuItems.objectAt(index).get('disabled')) {
      offset++;
      index = (focusIndex - offset + length) % length;
      if (offset > length) { break; }
    }

    this.focusItemAt(index);
  },

  /**
   * Selects the next item.
   *
   * If the next item is disabled it recurses the entire list to find the next
   * enabled item.
   *
   * @method selectNext
   */
  selectNext() {
    const menuItems = this.get('menuItems');
    let focusIndex = this.get('focusIndex');
    let length = this.get('menuItems.length');

    let offset = 1;
    let index = (focusIndex + offset) % length;

    // Ensure we don't select a disabled item
    while (menuItems.objectAt(index).get('disabled')) {
      offset++;
      index = (focusIndex + offset) % length;
      if (offset > length) { break; }
    }

    this.focusItemAt(index);
  },

  focusItemAt(index) {
    this.set('focusIndex', index);
    let item = this.get('menuItems').objectAt(index);
    if (!item.get('hasFocus') && item.element) { item.element.focus(); }
  },
});
