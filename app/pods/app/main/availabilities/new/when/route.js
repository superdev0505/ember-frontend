/**
* New Availability When Route
*
* Details of when your new teaching session is
*
* @module Availabilities
* @class route-app.main.availabilities.new.when
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
