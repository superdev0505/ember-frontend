/**
* Displays a message.
* Figures out if it's by the current user and displays appropriately
*
* TODO: Add in content reports
*
* @module Messages
* @class component-show-message
*/
import Ember from 'ember';

export default Ember.Component.extend({

  // isByCurrentUser: false,
  session: Ember.inject.service(),

  // checkCurrentUser: function() {
  //   var message = this.get('message');
  //   var session = this.get('session');
  //   var _this = this;
  //
  //   // Ember.RSVP.all([message]).then(function() {
  //   // debugger
  //   if(message.get('userId')){
  //     var x = message.get('userId').toString() === _this.get('session.data.authenticated.user_id').toString();
  //
  //     _this.set('isByCurrentUser', x);
  //   }else{
  //     Ember.run.later(function(){
  //       _this.checkCurrentUser();
  //     }, 100);
  //   }
  //
  //   // });
  //
  // }.on('didInsertElement'),

});
