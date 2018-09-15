/**
* List an email account on the account page with appropriate actions for editing
*
* @module Users
* @class component-email-account
*/
import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),

  actions: {

    toggleEmailOptions: function(){
            var id = this.get('emailAccount.id');
            $('.email-account-options-' + id.toString()).toggleClass('hidden');
        },

    resendConfirmation: function(){
            var _this = this;
            Ember.$.ajax({
                url: _this.get('apiUrl') + "/email_accounts/" + _this.get('emailAccount.id').toString() + "/resend_confirmation",
                type: 'post',
                beforeSend: function(xhr){
                    _this.get('session').authorize('authorizer:devise', function(headerName, headerValue) {
                        xhr.setRequestHeader(headerName, headerValue);
                    });
                },
                success: function(){
                    alert("Resent email - please check your inbox, and your junk folder.");
                }
            });
        },

    submitConfirmationCode: function(){
      var code = this.get('enteredCode');
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
            _this.get('emailAccount').reload();
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

    makePrimary: function(){
      var _this = this;
      var allemails = this.get('store').peekAll('emailAccount').filter(function(x){

        return x.get('user.id') === _this.get('session.currentUser.id');
      });
      allemails.forEach(function(x){
        if(x.get('id') === _this.get('emailAccount.id')){
          x.set('primary', true);
        }else{
          x.set('primary', false);
        }
        x.save();
      })
    },

    deleteEmailAccount: function(){
      var emailAccount = this.get('emailAccount');
            if(emailAccount.get('primary')){
                return false;
            }
            if(confirm('Remove this email address from your account?')){
                emailAccount.destroyRecord();
            }
        },

  }
});
