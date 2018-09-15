/**
* Edit conversation information.
*
* Accessible only to admins of the conversation.
* Allows the name to be changed, people to be added and removed.
*
* @module Messages
* @class route-app.main.conversation.edit
*/
import Ember from 'ember';

export default Ember.Controller.extend({

  isEditingName: false,
  originalName: '', // Set in route

  actions: {

    // TESTING ONLY
    addUser: function(user){
      var cm = this.store.createRecord('conversation-member', {
        user: user,
        conversation: this.get('model.conversation')
      })
      cm.save();
      // this.get('model.conversationMembers').addObject(cm);
    },

    toggleEditingName: function(){
      this.set('isEditingName', !this.get('isEditingName'));
      Ember.run.later(function(){
        Ember.$('.conversation-name-edit-field').focus();
      }, 100)
    },

    saveName: function(){
      var name = this.get('model.conversation.name').trim();
      if(name == ""){
        alert("Please enter a group name");
        return false;
      }
      this.get('model.conversation').set('name', name);
      this.get('model.conversation').save();
      this.set('originalName', name);
      this.set('isEditingName', false);
    },

    cancelName: function(){
      this.get('model.conversation').set('name', this.get('originalName'));
      this.set('isEditingName', false);
    },

    sendMessage: function(){
      var _this = this;
      _this.transitionToRoute('app.main.conversations.show', _this.get('model.conversation.id'));
    },

    requestFeedback: function(){
      // Pass a string of user IDs separated by commas
      var _this = this;
      var user_ids = this.get('model.conversation.conversationMembers').filter(function(user){
        return user.get('id').toString() != _this.get('session.user_id').toString();
      }).map(function(user){
        return user.get('id').toString();
      }).join(',')
      if(user_ids == ""){
        alert("This group is empty - add people to request feedback from them");
        return false;
      }
      this.transitionToRoute('feedback_requests/new', user_ids);
    },

    // Leave the group
    leaveGroup: function(){
      var _this = this;
      if(confirm("Leave this group? You will no longer receive messages.")){
        Ember.$.ajax({
          url: _this.get('apiUrl') + "/conversations/" + this.get('model.id') + "/leave",
          type: "DELETE",
          success: function(result){
            _this.transitionToRoute('conversations.index');
          },
          beforeSend: function(xhr){
            _this.get('session').authorize('authorizer:application', function(headerName, headerValue) {
              xhr.setRequestHeader(headerName, headerValue);
            });
          }
        })
      }
    },

    showAllUsers: function(){
      Ember.$('.searchUsers').removeClass('hidden');
      var _this = this;
      this.store.findAll('user').then(function(users){
        _this.set('allUsers', users);
      })
    }

  }




  // addUsersSearch: function(){
    // 	var _this = this;
    // 	// When the addUserText input changes, load users into addUserList
    // 	// Exclude users already in the conversation
    // 	var excludes = this.get('model.users').map(function(x){
    // 		return x.id;
    // 	});
    // 	this.store.find('user', {'query': this.get('addUserText'), 'exclude': excludes, 'limit': 7}).then(function(users){
    // 		_this.set('addUserList', users);
    // 	});
  //
    // }.observes('addUserText')
});
