import Ember from 'ember';

var push_fields = [
  "push_conversation_create",
  "push_availability_create",
  "push_availability_invite",
  "push_feedbackrequest_create",
  "push_feedback_create",
  "push_availability_sign_up",
  "push_availability_cancel",
  "push_availability_create_resource",
  "push_availability_update",
  "push_availability_destroy",
  "push_availabilityrequest_create"
];

var email_fields = [
  "email_conversation_create",
  "email_availability_create",
  "email_availability_invite",
  "email_feedbackrequest_create",
  "email_feedback_create",
  "email_availability_sign_up",
  "email_availability_cancel",
  "email_availability_create_resource",
  "email_availability_update",
  "email_availability_destroy",
  "email_availabilityrequest_create"
];

export default Ember.Controller.extend({

  actions: {
    savePreferences: function(){
      var _this = this;
      Ember.$('.save-preferences-button').html("Saving...");
      Ember.$('.save-preferences-button').attr('disabled', 'disabled');
      this.get('model').save().then(function(){
        Ember.$('.save-preferences-button').html("Save");
        Ember.$('.save-preferences-button').removeAttr('disabled');
        _this.transitionToRoute('app.main.alerts.index');
        alert("Your notification preferences have been updated.");
      });
    },

    selectAllPush: function(){
      for(var i = 0; i < push_fields.length; i++){
        this.set('model.' + push_fields[i], true);
      }
    },
    deselectAllPush: function(){
      for(var i = 0; i < push_fields.length; i++){
        this.set('model.' + push_fields[i], false);
      }
    },
    selectAllEmail: function(){
      for(var i = 0; i < email_fields.length; i++){
        this.set('model.' + email_fields[i], true);
      }
    },
    deselectAllEmail: function(){
      for(var i = 0; i < email_fields.length; i++){
        this.set('model.' + email_fields[i], false);
      }
    }
  }
});
