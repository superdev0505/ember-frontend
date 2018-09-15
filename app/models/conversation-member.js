import Ember from 'ember';
/**
* Represents a link between a conversation and a user. All people in a conversation are represented by one of these models.
*
* If a user is an admin for a conversation, that is stored in this model.
*
* @module Messages
* @class model-conversation-user
*/
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  user: belongsTo('user'),
  conversation: belongsTo('conversation'),
  admin: attr(),

  // Utility function - allows sorting on Messages page
  updatedAt: Ember.computed('conversation', function(){
    return this.get('conversation.updatedAt');
  }),

  // How to display the title of this conversation
  // If it has a name use it, otherwise use the names of people in the conversation
  // WARNING: this method requires everything to be pre-loaded
  displayName: Ember.computed('conversation', function(){
    if(this.get('conversation.name')){
      return this.get('conversation.name');
    }else{

      var _this = this;
      var cms = this.get('conversation.conversationMembers')
      var users = cms.map(function(x){ return x.get('user'); })
      users = users.filter(function(x){ return x.get('id').toString() !== _this.get('user.id').toString(); });
      var usernames = users.map(function(x){ return x.get('name'); })

      return usernames.toString();
    }
  })
});
