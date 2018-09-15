/**
* Application Route
*
* Defines methods for user authentication
* Looks up job titles and specialties on page load
*
* @module AppCore
* @class route-application
*/
import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import config from '../config/environment';

export default Ember.Route.extend(ApplicationRouteMixin, {

  session: Ember.inject.service(),
  cableService: Ember.inject.service('cable'),

  /**
  * Look up job titles and locations on page load
  *
  * @method beforeModel
  */
  beforeModel: function() {

    var _this = this;

    // Load all job titles, locations and specialties
    var jobTitles = this.get('jobtitles');
    this.store.findAll('job-title').then(function(jts){
      jobTitles.set('all', jts);
    });
    var locations = this.get('locations');
    this.store.findAll('location').then(function(locs){
      locations.set('all', locs);
    });
    // TODO: Repeat for specialties


  },

  // afterModel: function (model){
  //   var _this = this;
  //
  //     Ember.run.next(function(){
  //         console.log(_this.get('router.url'))
  //     });
  // },



  /**
  * PopulateCurrentUser
  * This method looks up the current user from the session ID
  * It is called on authentication, and in the beforeModel hook
  * The currentUser service is then populated and injected in all routes, controllers and components
  * For backwards compatibility it defines some extra variables on the session object
  *
  * @method _populateCurrentUser
  */
  _populateCurrentUser: function() {
    console.log(this.get("session.data"));
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
       return this;
    });
  },

  /**
  * Function called on login:
  *  Find the current user and store this info
  *  Register the device with the user's account
  *  If they're not confirmed, set up a poll to check when they do confirm
  *  If they are confirmed redirect to a walkthrough if they haven't seen it before
  *
  * @method sessionAuthenticated
  */
  sessionAuthenticated: function(){

    // Run phone code in try block or web interface crashes
    try {
      //Set Alias
      // PushbotsPlugin.setAlias(this.session.get('user_email'));
      window.plugins.PushbotsPlugin.updateAlias(this.session.get('user_email'));
    }
    catch(e){
      // No action required.
    }

    var _this = this;
    this._populateCurrentUser();
    // TODO: redirect to walkthrough
    // TODO: Monitor for when they're confirmed
    _this._super();
  },

  actions: {

    /**
    * Use didTransition to mark when alerts have been read.
    *
    * On transitioning to a new page, update any loaded alerts pointing to that page with unread=false.
    *
    * @method didTransition
    */
    didTransition: function(){
      var _this = this;
      if(!this.get('session.data.authenticated.user_id')){ return false; }
      Ember.run.next(function(){
        var url = _this.get('router.url');
        // Update local alert records
        _this.store.peekAll('alert').filter(function(x){
          return x.get('readUrl') === url && x.get('unread');
        }).forEach(function(x){
          x.set('unread', false);
          x.save();
        });
        // Send a notification to the server to make sure any unloaded records are updated
        Ember.$.ajax({
          url: _this.get('apiUrl') + "/alerts/mark_read",
          type: 'POST',
          data: {url: url},
          beforeSend: function(xhr){
            _this.get('session').authorize('authorizer:devise', function(headerName, headerValue) {
              xhr.setRequestHeader(headerName, headerValue);
            });
          }
        });
      });
    },

    /**
    * ember-simple-auth method. Defines where to redirect on logout.
    *
    * @method logout
    */
    logout: function() {
      if(confirm("Log out?")){
        this.get('session').invalidate();
        Ember.$('body').removeClass('navOpen');
        this.transitionTo('auth.login');
      }
    },

    /**
    * Open links in a new window, or in the default browser on a phone.
    *
    * @method openLink
    */
    openLink: function(url){
      // Check for http:// or other protocol:
      if (!url.match(/^[a-zA-Z]+:\/\//))
            {
                url = 'http://' + url;
            }
            window.open(url, "_system");
        },

    /**
    * On route loading, show a loading spinner
    *
    * @method loading
    */
    loading: function(transition, originRoute) {
            Ember.$('.loadingSpinner').removeClass('hidden');

            this.router.one('didTransition', function() {
        Ember.$('.loadingSpinner').addClass('hidden');
      });

            // substate implementation when returning `true`
            return true;
        },

    /**
    * Utility method for transitioning to URLs. Required as alert objects store raw URLs rather than routes.
    *
    * @method transitionToUrl
    */
    transitionToUrl(url) {
     this.transitionTo(url);
    }

  }

});
