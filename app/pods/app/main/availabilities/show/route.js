/**
* Show Availability Route
*
* This is the parent route for show availability. The actual 'show' page is rendered as a subroute (index). Editing and other functions are rendered as separate sub-routes but inherit the same model from this route.
*
* @module Availabilities
* @class route-app.main.availabilities.show.index
*/
import Ember from 'ember';
import Changeset from 'ember-changeset';

export default Ember.Route.extend({

  model(params){
    return this.store.findRecord('availability', params.availability_id, {
      adapterOptions: {include: 'availability-users.user.user-locations.location,location,feedback-requests.user,feedback-requests.target,feedback-requests.feedback,feedbacks.user,feedbacks.target,availability-items,messages'}
    });
  },

  afterModel(availability, transition){
    // if(availability.get('aasmState') !== 'confirmed'){
    //   this.transitionTo('app.main.availabilities/' + availability.get('aasmState'), availability);
    // }
  },

  renderTemplate: function() {
    // Render the page
    this.render();
    this.render("buttons/backlinkto",{
      outlet: 'secondaryButton',
      into: "app.main"
    });
    this.render("pagetitle",{
      outlet: 'pageTitle',
      into: "app.main"
    });
  },

  setupController(controller, model){
    this._super(controller, model);
    var _this = this;
    // Find the availability-user model for the current user
    var joins = model.get('availabilityUsers');

    Ember.RSVP.all([joins]).then(function(){
      var users = joins.map(function(x){ return x.get('user'); })
      Ember.RSVP.all([users]).then(function(){

        // Save and find the join for the current user
        var join = joins.filter(function(x){
          return x.get('user.id').toString() === _this.get('session.data.authenticated.user_id').toString();
        });

        if(join.length == 1){
          controller.set('joinModel', join[0]);
          controller.set('canEdit', join[0].get('admin'));
        };

        // Find the teachers and students
        // var teacherJoins = joins.filter(function(x){
        //   return x.get('teacher');
        // });
        // controller.set('teachers', teacherJoins.map(function(x){ return x.get('user'); }))
        // var studentJoins = joins.filter(function(x){
        //   return !x.get('teacher');
        // });
        // controller.set('students', studentJoins.map(function(x){ return x.get('user'); }))
      });
    });


    // Create a changeset object for the model if the user can edit it
    if(this.get('canEdit')){
      var changeset = new Changeset(model, this.get('validate'));
      controller.set('changeset', changeset);
    }else{
      controller.set('changeset', model);
    }

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
