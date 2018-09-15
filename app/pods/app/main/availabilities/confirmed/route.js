/**
* LEGACY - view for confirmed sessions
*
* @module Unclassified
*/
import Ember from 'ember';
import Changeset from 'ember-changeset';

export default Ember.Route.extend({

  model(params){
    return this.store.findRecord('availability', params.availability_id, {
      adapterOptions: {include: 'availability-users.user,location'}
    });
  },

  afterModel(availability, transition){
    if(availability.get('aasmState') !== 'confirmed'){
      this.transitionTo('app.main.availabilities/' + availability.get('aasmState'), availability);
    }
  },

  setupController(controller, model){
    this._super(controller, model);
    var _this = this;
    // Find the availability-user model for the current user
    var join = model.get('availabilityUsers').filter(function(x){
      return x.get('user.id').toString() === _this.get('session.data.authenticated.user_id').toString();
    });
    if(join.length == 1){
      controller.set('joinModel', join[0]);
      controller.set('canEdit', join[0].get('admin'));
    };
    // Create a changeset object for the model
    var changeset = new Changeset(model, this.get('validate'));
    console.log(changeset)
    controller.set('changeset', changeset);
  },

  actions: {
    willTransition(transition){
      if(this.get('controller.changeset.isDirty')){
        if(!confirm("You have unsaved changes. Are you sure you want to leave this page?")){
          transition.abort();
        }
      }
    }
  }

});
