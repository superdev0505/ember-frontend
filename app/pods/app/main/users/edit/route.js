/**
* Users Edit route
*
* Edit your profile
* Uses Ember Changesets to make sure changes are only saved when 'Save' is clicked
* willTransition route used to give a "Are you sure you want to leave this page?" warning when leaving.
*
* @module Users
* @class route-app.main.users.edit
*
*/
import Ember from 'ember';
import Changeset from 'ember-changeset';

export default Ember.Route.extend({

  renderTemplate: function() {
    this.render();
    this.render("pagetitle",{
      outlet: 'pageTitle',
      into: "app.main"
    });
    this.render("buttons/backbutton",{
      outlet: 'secondaryButton',
      into: "app.main"
    })
  },

  model: function(params){
    return this.store.findRecord('user', params.user_id);
  },

  setupController(controller, model){
    this._super(controller, model);
    var _this = this;

    // Create a changeset object for the model
    // var changeset = new Changeset(model, this.get('validate'));
    // controller.set('changeset', changeset);
  },

  actions: {
    willTransition(transition) {
      // If the changeset is edited, ask for a confirm before transition
      // if (this.controller.get('changeset.isDirty')) {
      //   if(!confirm("Are you sure you want to leave this page? Unsaved changes to your profile will be lost.")){
      //     transition.abort();
      //   }
      //
      // }
    }
  }

});
