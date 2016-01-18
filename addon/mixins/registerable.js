import Ember from 'ember';
import Registry from './registry';

const { on, computed } = Ember;
const { camelize } = Ember.String;

export default Ember.Mixin.create({
  registerWithParent: on('didInsertElement', function() {
    var registry = this.get('parentComponent');
    let type = this.get('registerableType');

    if (registry && type) {
      // Register child with parent component
      registry.send(camelize(`register_${type}`), this);
      if (registry.get('registerableType')) {
        // Register parent with child if parent has a registerable type.
        this.set(registry.get('registerableType'), registry);
      }

      // Make the parent responsible for actions so they bubble up. Also can
      // bubble multiple levels until it finds something which accepts our actions.
      //
      // TODO: Limit traversal to only components in our addon.
      let actionAcceptor;
      if (actionAcceptor = this.get('actionAcceptor')) {
        this.set('targetObject', actionAcceptor);
        // Set our default action to be whatever the parent accepts
        let childActionName;
        if (childActionName = actionAcceptor.get('childActionName')) {
          this.set('action', childActionName);
        }
      }
    }
  }),

  deregisterWithParent: on('willDestroyElement', function() {
    var registry = this.get('parentComponent');
    let type = this.get('registerableType');
    if (registry && type) {
      // Deregister child from parent
      registry.send(camelize(`deregister_${type}`), this);
      if (registry.get('registerableType')) {
        // Deregister parent from child
        this.set(registry.get('registerableType'), null);
      }
    }
  }),

  actionAcceptor: computed(function() {
    return this.nearestWithProperty('acceptsChildActions', true);
  }).volatile(),

  parentComponent: computed(function() {
    return this.nearestOfType(Registry);
  }).volatile(),

});
