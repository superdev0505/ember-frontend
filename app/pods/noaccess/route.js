import Ember from 'ember';

export default Ember.Route.extend({
  // Route for people who are logged in but can't access the site
  // Either no confirmed email, or hasn't accepted T&Cs

  session: Ember.inject.service(),
  beforeModel() {
    if(!this.get('session').get('isAuthenticated')) {
      this.transitionTo('auth.login');
    }
  }
});
