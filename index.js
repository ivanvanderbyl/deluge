/* jshint node: true */
'use strict';

module.exports = {
  name: 'deluge',

  isDevelopingAddon: function() {
    return true;
  },

  included: function(app) {
    this._super.included(app);
    var emberTetherAddon = this.addons.filter(function(addon) {
      return addon.name === 'ember-tether';
    })[0];
    emberTetherAddon.importBowerDependencies(app);
  }
};
