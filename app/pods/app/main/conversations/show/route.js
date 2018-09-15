/**
* Conversations Show page
* Shows a particular conversation and all messages in it
* Will load latest messages and should inject more messages when received
* Scrolling up should load older messages
*
* @module Messages
* @class route-app.main.conversation.show
*/
import Ember from 'ember';

export default Ember.Route.extend({

  // If the conversation is associated with an availability, redirect there
  afterModel: function(model){

    // var conversation_id = model.query["filter[conversation_id]"];
    // this.store.findRecord('conversation', conversation_id).then(function(conversation){
    var conversation = model;
      var availability = conversation.get('availability');
      var _this = this;
      Ember.RSVP.all([availability]).then(function(){
        if(availability.get('id') !== undefined){
          _this.transitionTo('app.main.availabilities/show.messages', model.get('availability'));
        }
      });

  },

  renderTemplate: function() {
    // Render the page
    this.render();
    // Render buttons
    this.render("buttons/backbutton", {
        outlet: "secondaryButton",
        into: "app.main"
    });
    this.render("buttons/editconversationbutton", {
        outlet: "primaryButton",
        into: "app.main"
    });

    this.render("pagetitle", {
        outlet: "pageTitle",
        into: "app.main"
    });
    this.render("footers/messaging",{
      outlet: "footer",
      into: "app.main"
    });
  },

  /**
  * Load the conversation object.
  *
  * @method model
  */
  model: function(params){
    return this.store.findRecord('conversation', params.conversation_id, {
      adapterOptions: {include: 'messages,conversation-members.user,availability'}
    });
  },

  setupController: function(controller, model){
    this._super(controller, model);

    controller.set('messages', model.get('messages'));

    var _this = this;

    var conversation = model;
    controller.set('conversation', conversation);

    // Set the title from the conversation
    // If it has a name, use that
    // Otherwise use the names of the people in it, minus the logged in user
    var convo = conversation;
    if(convo.get('name')){
      controller.set('pageTitle', convo.get('name'));
    }else{
      convo.get('conversationMembers').then(function(cms){
        var users = cms.map(function(x){ return x.get('user'); });
        users = users.filter(function(x){ return x.get('id').toString() !== _this.get('session.data.authenticated.user_id').toString(); });
        var usernames = users.map(function(x){ return x.get('name'); });
        controller.set('pageTitle', usernames);
      });
    }


  }

});
