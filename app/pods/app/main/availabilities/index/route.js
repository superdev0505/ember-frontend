/**
* Availabilities index route. Handles listing and searching of teaching sessions.
*
* @module Availabilities
* @class route-app.main.availabilities.index
*/
import Ember from 'ember';

export default Ember.Route.extend({

  model: function(){
    return Ember.A(); // Populated in controller
    // return this.store.findAll('availability');
  },

  setupController: function(controller, model){
    this._super(controller, model);

    // Get the current user's locations and set as a filter
    this.store.query('user-location', {
      "filter[user_id]": this.get('session.data.authenticated.user_id'),
      include: "location"
    }).then(function(uls){
      controller.set('searchLocations', uls.map(function(x){ return x.get('location'); }));
    });

    // Load all locations - used for filtering so need to be cached
    this.store.findAll('location');
  },

  renderTemplate: function() {
    // Render the page
    this.render();
    this.render("buttons/openavailabilityfiltersbutton",{
      outlet: 'primaryButton',
      into: "app.main"
    });
    this.render("buttons/backbutton",{
      outlet: 'secondaryButton',
      into: "app.main"
    });
    this.render("pagetitle",{
      outlet: 'pageTitle',
      into: "app.main"
    }),
    this.render("components/bottom-navbar",{
      outlet: 'footer',
      into: 'app.main'
    });
  }


});
