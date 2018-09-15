/**
* Application route.
*
* Redirects user appropriately if not logged in, or logged in with an account that's unconfirmed or has not signed the T&Cs.
*
* This route also loads the currentUser object into the session from the user_id in the session object
*
* @module AppCore
* @class route-application
*/
import Ember from 'ember';

export default Ember.Route.extend({

  session: Ember.inject.service(),

  pushbots: Ember.inject.service(),

  // This route redirects anyone not logged in, unconfirmed, or who hasn't accepted T&Cs
  beforeModel() {
    var _this = this;
    if(!this.get('session').get('isAuthenticated')) {
      this.transitionTo('auth.login');
    }else{
      this._populateCurrentUser().then(function(){

        // Redirect to noaccess/unconfirmed if unconfirmed
        if(!_this.get('session.currentUser.confirmed')){
          _this.transitionTo('noaccess.unconfirmed');
          return false;
        }
        // Redirect to noaccess/noterms if hasn't accepted T&Cs
        if(!_this.get('session.currentUser.terms')){
          _this.transitionTo('noaccess.noterms');
          return false;
        }
        // Redirect to noaccess/profilesetup if profile is incomplete
        if(_this.get('session.currentUser.incompleteProfile')){
          _this.transitionTo('noaccess.profilesetup');
          return false;
        }
        return false;
      });




      // this.transitionTo('app.main.timeline.index');

    }
  },

  _populateCurrentUser: function() {
    this.get('pushbots');
    var user_id = this.get('session.data.authenticated.user_id');
    var user_email = this.get('session.data.authenticated.user_email');

    var _this = this;
    return this.store.findRecord('user', user_id, {adapterOptions: {
      include: ['user-locations', 'job-title']
    }}).then(function(user){
       _this.get('currentUser').set('content', user);

       // Below is for backward-compatibility
       _this.get('session').set('currentUser', user);
       _this.get('session').set('user_id', user_id);
       _this.get('session').set('user_email', user_email);
       //user;
       _this.get('pushbots').tagUser(user);

       return this;
    });
  }

});
