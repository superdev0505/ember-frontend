/**
* New Availability What Route
*
* Details of what your new teaching session is about
*
* @module Availabilities
* @class route-app.main.availabilities.new.what
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
