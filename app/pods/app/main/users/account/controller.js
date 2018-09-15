/**
* Users Account controller
*
* Edit your Account
* Used for email accounts and password changes - not appropriate for profile page
*
* @module Users
* @class controller-app.main.users.account
*
*/
import Ember from 'ember';

export default Ember.Controller.extend({

  pageTitle: "Account",

  actions: {

    /**
    * Toggle the add email form
    *
    * @method showAddEmail
    */
    showAddEmail: function(){
            Ember.$('.addEmailForm').toggleClass('hidden');
        },

    /**
    * Create a new email account with the given email address
    *
    * @method addEmail
    */
    addEmail: function(){
            Ember.$('.addEmailButton').attr('disabled', 'disabled');
            var email = this.get('newEmail');
            var _this = this;
            var emailAccount = this.store.createRecord('email-account', {
                user: this.get('model'),
                email: email
            });
            this.set('emailAccount', emailAccount);
            Ember.$('.loadingSpinner').removeClass('hidden');
            emailAccount.save().then(function(ea){
                //... Success
                Ember.$('.loadingSpinner').addClass('hidden');
                _this.get('session.currentUser').reload();
                alert("Email added successfully");
                Ember.$('.addEmailButton').removeAttr('disabled');
            }).catch(function(ea){
                //failure - server returns {errors: {email: message}}
                emailAccount.deleteRecord();
                Ember.$('.loadingSpinner').addClass('hidden');
                Ember.$('.addEmailButton').removeAttr('disabled');
                var err = ea.errors[0].detail;
                alert(err);

            });
        },

    /**
    * Toggle the Change Password field
    *
    * @method showChangePassword
    */
    showChangePassword: function(){
        Ember.$('.changePasswordForm').toggleClass('hidden');
        return false;
  	},

    /**
    * Change the password
    * Validates the old password
    *
    * @method addEmail
    */
  	changePassword: function(){
        var _this = this;
        console.log("Called Change Password")
        var oldPassword = this.get('oldPassword');
        var newPassword = this.get('newPassword');
        var newPasswordConfirmation = this.get('newPasswordConfirmation');
        if(oldPassword == "" || newPassword == "" || newPasswordConfirmation == ""){
            window.alert("Please enter your old password, a new password and a confirmation of the new password");
            return false;
        }
        if(newPassword != newPasswordConfirmation){
            alert("Password and confirmation do not match");
            return false;
        }
        console.log("CHANGING PASSWORD")
        // Post to the server...
        Ember.$.ajax({
            url: _this.get('apiUrl') + "/users/" + this.get("session.user_id").toString() + "/change_password",
            type: 'post',
            data: { old_password: oldPassword, new_password: newPassword, new_password_confirmation: newPasswordConfirmation },
            success: function(response){
                if(response == "Password changed successfully."){
                    _this.set('oldPassword', "");
                    _this.set('newPassword', "");
                    _this.set('newPasswordConfirmation', "");
                    Ember.$('.changePasswordForm').toggleClass('hidden');
                }
                alert(response);
            },
            beforeSend: function(xhr){
                _this.get('session').authorize('authorizer:devise', function(headerName, headerValue) {
                    xhr.setRequestHeader(headerName, headerValue);
                });
            }
        });
  	}

  }
});
