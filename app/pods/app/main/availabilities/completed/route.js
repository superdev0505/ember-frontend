/**
* When a session is marked as 'completed' the user is directed here.
*
* They are asked to confirm who attended and what was taught. They can then send feedback.
*
* @module Availabilities
*/
import Ember from 'ember';

export default Ember.Route.extend({

  model(params){
    return this.store.findRecord('availability', params.availability_id,{
      adapterOptions: {include: 'availability-users.user,location'}
    });
  },

  renderTemplate: function() {
    // Render the page
    this.render();
    this.render("buttons/backbutton",{
      outlet: 'secondaryButton',
      into: "app.main"
    })
    this.render("pagetitle",{
      outlet: 'pageTitle',
      into: "app.main"
    })
  },

  setupController(controller, model){
    this._super(controller, model);
    var opts = {
      aasmState: 'attended',
      teacher: false,
      admin: false,
      inviter: this.get('session.currentUser'),
      availability: model
    }
    controller.set('inviteOpts', opts);
  }

});
