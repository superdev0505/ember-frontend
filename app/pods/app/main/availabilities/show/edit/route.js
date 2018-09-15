/**
* Edit Availability Route.
*
* Rendered as a sub-route of the show route
*
* Edit basic details e.g. location, time, information about the teaching
*
* @module Availabilities
* @class route-app.main.availabilities.show.edit
*/
import Ember from 'ember';

export default Ember.Route.extend({

  renderTemplate: function() {
    this.render();
    this.render('components/bottom-navbar',{
      outlet: 'footer',
      into: 'app.main'
    });
  }

});
