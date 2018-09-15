/**
* New Availability Quick Route
*
* Create a quick teaching session using default options for 'teach now'
*
* @module Availabilities
* @class route-app.main.availabilities.new.preview
*/
import Ember from 'ember';

export default Ember.Route.extend({

  renderTemplate: function() {
    this.render();
    this.render('footers/availabilities/new/quick',{
      outlet: 'footer',
      into: 'app.main'
    });
  }


});
