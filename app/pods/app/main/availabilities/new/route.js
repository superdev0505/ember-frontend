/**
* New Availability Route.
*
* Has separate sub-routes for when, who, what and preview. Also has a 'quick' subroute which has basic info then skips straight to preview.
*
* @module Availabilities
* @class route-app.main.availabilities.new
*/
import Ember from 'ember';

export default Ember.Route.extend({

  renderTemplate: function() {
    // Render the page
    this.render();
    this.render("buttons/cancelnewteaching",{
      outlet: 'secondaryButton',
      into: "app.main"
    });
    this.render("pagetitle",{
      outlet: 'pageTitle',
      into: "app.main"
    });
  },

  /**
  * Set up the model as a new availability.
  * This is shared between all 'new' sub-routes.
  * Default settings are applied.
  * By default the creating user should be attached as a teacher.
  *
  * @method model
  */
  model: function(params){
    // Set the start time as now (rounded)
    var t = new Date();
    var m = (((t.getMinutes() + 7.5)/15 | 0) * 15) % 60;
  	var h = ((((t.getMinutes()/105) + 0.5) | 0) + t.getHours()) % 24;
  	t.setHours(h);
  	t.setMinutes(m);

    // Calculate the end time from the start time and duration
    var endTime = new Date(t.getTime() + 60*60000);


    var a = this.store.createRecord('availability', {
      startTime: t,
      endTime: endTime,
      maxStudents: 6,
      isPrivate: false,
      aasmState: 'confirmed',
      user: this.get('session.currentUser')
    });

    return a;
  },

  /**
  * In the setupController method we create a default location and an availability-user object to link the session to the current user.
  *
  * @method setupController
  */
  setupController: function(controller, model){
    // Set a default location
    // Can't use session.currentUser as it's not loaded yet
    var _this = this;
    this.store.query('user-location',{
      "filter[user_id]": this.get('session.data.authenticated.user_id'),
      include: 'location'
    }).then(function(joins){
      model.set('location', joins.get('firstObject.location'));
    });

    // Assign the current user to it as a teacher
    this.store.findRecord('user', this.get('session.data.authenticated.user_id')).then(function(user){
      model.set('user', user);
      var join = _this.store.createRecord('availability-user', {
        availability: model,
        user: user,
        teacher: true,
        admin: true,
        aasmState: 'confirmed'
      });
      model.set('availabilityUsers', [join]);

      // Add job titles - everyone below the level of the poster
      var jts = _this.get('jobtitles.all').filter(function(x){
        return x.get('position') < user.get('jobTitle.position');
      });
      model.set('jobTitles', jts);
    });

  },

  actions: {

    /**
    * Prevent moving out of the route if any defaults have changed.
    *
    * @method willTransition
    */
    willTransition(transition) {
      // Skip if we're moving to a subroute
      if(transition.targetName.match(/app.main.availabilities.new/)){
        return false
      }
      // Skip if we've saved already
      if(!this.get('currentModel.isNew')){
        return false;
      }
      // If the changeset is edited, ask for a confirm before transition
      // if (this.controller.get('changeset.isDirty')) {
        if(!confirm("Are you sure you want to leave this page? All entered information will be lost.")){
          transition.abort();
        }
      // }
    }
  }
});
