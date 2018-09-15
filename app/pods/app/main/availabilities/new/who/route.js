/**
* New Availability Who Route
*
* Invite people to your availability and see who has signed up
*
* @module AvailabilitiesSignUp
* @class route-app.main.availabilities.new.who
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
