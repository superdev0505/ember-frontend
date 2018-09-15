/**
* Show messages associated with a teaching session.
*
* Very similar to the messages page but rendered within the availabilities/show page.
*
* @module Messages
* @class controller-app.main.availabilities.show.messages
*/
import Ember from 'ember';

export default Ember.Controller.extend({

  showController: Ember.inject.controller("app/main/availabilities/show"),

  model: Ember.computed.reads('showController.model'),

  uniqueMessages: Ember.computed.uniqBy('model.messages', 'id'),
  messageSorting: ['createdAt:asc'],
  sortedMessages: Ember.computed.sort('uniqueMessages', 'messageSorting'),

  actions: {

    /**
    * Create a new message object.
    *
    * @method sendMessage
    */
    sendMessage: function(){
      var val = this.get('newMessage');
      if(!val || val == ""){
        alert("Please enter a message");
        return
      }
      this.get('store').createRecord('message',{
        body: val,
        user: this.get('session.currentUser'),
        userId: this.get('session.data.authenticated.user_id'),
        availability: this.get('model')
      }).save()
      this.set('newMessage', "");
    }
  }

});
