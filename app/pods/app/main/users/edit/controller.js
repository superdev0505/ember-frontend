/**
* Users Edit controller
*
* Edit your profile
* Uses Ember Changesets to make sure changes are only saved when 'Save' is clicked
*
* @module Users
* @class controller-app.main.users.edit
*
*/

import Ember from 'ember';

export default Ember.Controller.extend({

  pageTitle: "Edit Profile",

  editingUserName: false,
  oldPassword: "",
  newPassword: "",
  newPasswordConfirmation: "",


  actions: {

    /**
    * Calls 'save' on an edited changeset of a User object.
    * Redirects to incomplete profile if the profile is incomplete after editing
    *
    * @method doneEditing
    */
    doneEditing: function() {
      var _this = this;
      _this.set('editingUserName', false);
      $('.save-profile-button').attr('disabled', 'disabled');
            // this.model.save().then(
      this.get('model').save().then(function(data){ // Can pass returned model to this function for full errors
        $('.save-profile-button').removeAttr('disabled');
        alert("Profile updated");
        if(_this.get('model.incompleteProfile')){
          _this.transitionToRoute('noaccess.profilesetup');
        }else{
          _this.transitionToRoute('app.main.home.teach');
        }
      });
    },

    /**
    * Cancel changes - reset the changeset
    *
    * @method undoChanges
    */
    undoChanges: function(){
      if(confirm('Undo your changes?')){
        // this.get('changeset').rollback();
        this.set('editingUserName', false);
        this.transitionToRoute('app.main.home.teach');
      }
    },

    /**
    * Toggle the editing user name field
    *
    * @method toggleEditingUserName
    */
    toggleEditingUserName: function(){
            this.set('editingUserName', !this.get('editingUserName'));
            Ember.$('.editUserNameField').focus();
        }





  }



});
