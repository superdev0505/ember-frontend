import Ember from 'ember';

export default Ember.Controller.extend({

  newMessage: "",
  pageTitle: null,

  // Clear the message field - this prevents it crossing between conversations
  clearNewMessage: Ember.observer('conversation_id', function(){
    this.set('newMessage', "");
  }),


  actions: {
    sendMessage: function(){
      var message = this.get('newMessage');
      var _this = this;
      // this.get('subscription').perform('new_message', {id: this.get('conversation_id'), message: message})
      this.store.createRecord('message', {
        body: message,
        user: this.get('session.currentUser'),
        conversation: this.get('conversation')
      }).save().then(function(response){
        // Make sure the message is displayed immediately on save
        // _this.get('messages').pushObject(response._internalModel);
        // Reset the form
        _this.set('newMessage', "");
        Ember.$('.newMessageBody').blur();
        Ember.$('.subContainerMessage').removeClass('messageFocus');
      });
    }
  }
});
