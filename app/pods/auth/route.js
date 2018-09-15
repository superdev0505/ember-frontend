/**
* Anyone accessing the site without logging in gets directed to the auth route.
*
* Subroutes are login and registration.
*
* @module AppCore
* @class route-auth
*/
import Ember from 'ember';

export default Ember.Route.extend({
  // Route to cover login and registration screens
  // Redirects if they are logged in already

  session: Ember.inject.service(),
  beforeModel() {
    if(this.get('session').get('isAuthenticated')) {
      this.transitionTo('app.index');
    }
  }
});
