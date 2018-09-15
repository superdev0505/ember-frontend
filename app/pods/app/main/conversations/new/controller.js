/**
* Create a new conversation. Should be able to set the name and invite people to it in the creation process.
*
* @module Messages
* @class route-app.main.conversations.new
*/
import Ember from 'ember';

export default Ember.Controller.extend({


  groupName: "",
  pageTitle: 'New Message',

  newConversationSearchText: "",
  filteredContacts: Ember.A(),

  // Toggle whether to allow group creation
  newGroup: false,
  groupMembers: Ember.A(),

  filterContacts: Ember.observer('newConversationSearchText', function(){
    var search = this.get('newConversationSearchText');
    var us = this.get('contacts').filter(function(x){
      return x.get('name').toLowerCase().includes(search.toLowerCase()) || x.get('email').toLowerCase().includes(search.toLowerCase());
    });
    this.set('filteredContacts', us);
  }),

  // selectInput: function(){
  //   Ember.run.later(function(){
  //     Ember.$('.newConversationField').focus();
  //   }, 100);
  // }.on('init'),



  actions: {

    // If in newGroup mode:
    //    Add to the groupMembers array
    //    Make sure a tick is shown by the user
    // Otherwise:
    //    Start a conversation with a particular user
    //    Create the conversation object and two conversation-member objects
    messageUser: function(user){
      var _this = this;
      if(this.get('newGroup')){
        if(this.get('groupMembers').includes(user)){
          this.set('groupMembers', this.get('groupMembers').filter(function(x){ return x !== user; }));
        }else{
          this.get('groupMembers').addObject(user);
        }
      }else{

        // Look for an existing Conversation object between the two users. If found, redirect to this, otherwise run the code below.
        this.store.query('conversation',{
          'filter[active_user_ids]': [user.get('id'), this.get('session.data.authenticated.user_id')]
        }).then(function(convos){
          if(convos.get('length') > 0){
            _this.transitionToRoute('app.main.conversations.show', convos.get('firstObject.id'));
          }
          else{
            _this.store.createRecord('conversation', {
              name: null
            }).save().then(function(convo){
              _this.store.createRecord('conversation-member', {
                user: _this.get('session.currentUser'),
                conversation: convo
              }).save().then(function(){
                _this.store.createRecord('conversation-member', {
                  user: user,
                  conversation: convo
                }).save();

                _this.transitionToRoute('app.main.conversations.show', convo.get('id'));
              });

            });
          }
        });


      }
    },

    toggleNewGroup: function(){
      this.set('newGroup', !this.get('newGroup'));
    },

    createGroup: function(){
      if(this.get('groupMembers.length') === 0){
        alert('Please select at least one person for your group');
      }else{
        var _this = this;
        // Create a conversation and add selected people

        // _this.get('groupMembers').forEach(function(user){
        //   console.log(user)
        // })
        // return false
        this.store.createRecord('conversation', {
          name: null
        }).save().then(function(convo){
          _this.get('groupMembers').forEach(function(user){
            _this.store.createRecord('conversation-member', {
              user: user,
              conversation: convo
            }).save();
          });
          _this.store.createRecord('conversation-member', {
            user: _this.get('session.currentUser'),
            conversation: convo,
            admin: true
          }).save();
          _this.transitionToRoute('app.main.conversations/edit', convo.get('id'));
        });

      }
    },


    // From old code...
    createConversation: function(){
      var _this = this;
      var name = this.get('groupName').trim();
      if(name === ""){
        alert("Please enter a name for this group");
        return false;
      }
      this.store.createRecord('conversation', {
        user: this.get('session.currentUser'),
        name: name
      }).save().then(function(conversation){
        _this.transitionToRoute('app.main.conversations/edit', conversation);
      });
    }

  }

});
