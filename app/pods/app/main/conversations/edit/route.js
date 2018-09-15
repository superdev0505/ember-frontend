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

export default Ember.Route.extend({

  model: function(params) {
    return Ember.RSVP.hash({
      conversation: this.store.find('conversation', params.conversation_id),
      conversationMembers: this.store.query('conversation-member',
        {"filter[conversation_id]": params.conversation_id,
        include: 'user'}
      )
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
  },

  //
  setupController: function(controller, model){
    this._super(controller, model);
    controller.set('originalName', model.conversation.get('name'));
    var users = model.conversationMembers.map(function(x){
      return x.get('user');
    })
    controller.set('users', users);

    if(!model.conversation.get('name')){
      controller.set('isEditingName', true);
    }
  }

});
