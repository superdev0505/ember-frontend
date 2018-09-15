/**
* Show Availability Users Route
*
* Invite people to your availability and see who has signed up
*
* @module AvailabilitiesSignUp
* @class route-app.main.availabilities.show.users
*/
import Ember from 'ember';
import config from '../../../../../../config/environment';

export default Ember.Route.extend({

  renderTemplate: function() {
    this.render();
    this.render('components/bottom-navbar',{
      outlet: 'footer',
      into: 'app.main'
    });
  }

});
