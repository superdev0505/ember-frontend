import Ember from 'ember';
import config from '../../../config/environment';

export default Ember.Controller.extend({

  devMode: false,
  setDevMode: Ember.on('init', function(){
    if(config.APP.environment !== 'production'){
      this.set('devMode', true);
    }
  }),

  actions: {

    submitCode: function(){
      var _this = this;
            Ember.$.ajax({
                url: _this.get('apiUrl') + "/email_accounts/"+_this.get('emailAccount.id')+"/submit_confirmation_code",
                type: 'post',
        data: {
          'confirmation_code': _this.get('enteredCode')
        },
                success: function(data){
                    // User successfully confirms their email -> redirect to activities page
          // Need to set confirmed to true to avoid redirect
          // Wrap this in a run loop as it has an action which depends on another server query
          Ember.run(function(){
            _this.get('session.currentUser').reload().then(function(){
              _this.transitionToRoute('noaccess.profilesetup');
            })
          });
                },
        error: function(data){
          // User enters wrong code -> tell them it's wrong
          alert(data.responseText);
        },
                beforeSend: function(xhr){
                    _this.get('session').authorize('authorizer:devise', function(headerName, headerValue) {
                        xhr.setRequestHeader(headerName, headerValue);
                    });
                }
            });
    },

    resendConfirmationEmail: function(){
      var _this = this;
            Ember.$.ajax({
                url: _this.get('apiUrl') + "/users/resend_confirmation_email",
                type: 'post',
                success: function(data){
                    alert("Confirmation email sent");
                    console.log(data);
                },
                beforeSend: function(xhr){
                    _this.get('session').authorize('authorizer:devise', function(headerName, headerValue) {
                        xhr.setRequestHeader(headerName, headerValue);
                    });
                }
            });
    },

    autoConfirm: function(){
      // For testing mode only. Confirm the user and redirect.
      var _this = this;
            Ember.$.ajax({
                url: _this.get('apiUrl') + "/users/test_confirm",
                type: 'post',
                success: function(data){
                    alert("User confirmed.");
                    console.log("User auto-confirmed");
          _this.transitionToRoute("/");
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
