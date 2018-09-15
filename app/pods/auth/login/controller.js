/**
* Login route. Handles authentication and forgotten passwords.
*
* @module Users
* @class controller-auth.login
*/
import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  showForgot: false,

  actions: {

    authenticate: function(){
      Ember.$('.loadingLogin').removeClass('hidden');
      Ember.$('.login-submit').attr('disabled', 'disabled');

      const { identification, password } = this.getProperties('identification', 'password');

      this.get('session').authenticate('authenticator:oslr', identification, password).catch(function(error){
        Ember.$('.loadingLogin').addClass('hidden');
        Ember.$('.login-submit').removeAttr('disabled');

        // Overwrite simple auth functions for error handling
            alert("Login failed. Please check your username and password are correct.");
            console.log(error);
      });

      // this.get('session').authenticate('authenticator:devise', {
      //   user_email: this.get('identification'),
      //   password: this.get('password')
      // });
    },

    toggleShowForgot: function(){
      this.set('showForgot', !this.get('showForgot'));
    },

    resetPassword: function(){
      var email = this.get('identification');
      var _this = this;
      Ember.$('.login-reset-password').attr('disabled','disabled');
      Ember.$.ajax({
        url: _this.get('apiUrl') + "/users/forgot_password?email=" + email.toString(),
        type: 'post',
        success: function(response){
          _this.set('showForgot', false);
          Ember.$('.login-reset-password').removeAttr('disabled');
          alert(response);
        },
        error: function(response){
          // Most likely this is a mis-spelled email but catch any error (e.g. server not connected)
          if(response.responseText){
            alert(response.responseText);
          }else{
            alert("Sorry we were not able to reset your password. Please try again later.")
          }
          Ember.$('.login-reset-password').removeAttr('disabled');
        },
        beforeSend: function(xhr){
          _this.get('session').authorize('authorizer:application', function(headerName, headerValue) {
            xhr.setRequestHeader(headerName, headerValue);
          });
        }
      });
    }
  }
});
