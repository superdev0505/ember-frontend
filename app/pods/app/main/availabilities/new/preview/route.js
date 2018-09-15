/**
* New Availability Preview Route
*
* Preview a new teaching session.
* The create session button is on this page.
*
* @module Availabilities
* @class route-app.main.availabilities.new.preview
*/
import Ember from 'ember';

export default Ember.Route.extend({

  renderTemplate: function() {
    this.render();
    this.render('footers/availabilities/new',{
      outlet: 'footer',
      into: 'app.main'
    });
  }

});
