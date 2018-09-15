/**
* Registration route. Handles registration of a new user.
*
* @module Users
* @class controller-auth.registration
*/
import Ember from 'ember';

export default Ember.Controller.extend({

  session: Ember.inject.service('session'),

    actions: {

        submit: function() {

            var email = this.get('identification');
            var pw = this.get('password');
            var pw_c = this.get('passwordConfirmation');
            var userName = this.get('name');

      if(!userName || !userName.trim()){
                alert("Please enter your name");
                return;
            }
            if(!email || !email.trim()){
                alert("Please enter your email address");
                return;
            }
            if(!pw || !pw.trim()){
                alert("Please enter a password of at least 8 characters");
                return;
            }
            if(pw.length < 8){
                alert("Please enter a password of at least 8 characters");
                return;
            }
            if(!pw_c || pw !== pw_c){
                alert("Your password and confirmation do not match");
                return;
            }

            var user = this.store.createRecord('user', {
                'email': email,
                password: pw, password_confirmation: pw_c,
                name: userName,
        terms: true // By clicking the button we assume they have accepted T&Cs
            });

            var _this = this;

            Ember.$('.loadingRegister').removeClass('hidden');
            Ember.$('.registration-submit').attr('disabled', 'disabled');

        user.save().then(function(response){
                if(!response.id){
                    if(response.get('errors')){
                        alert(response.get('errors'));
                    }else{
                        alert("Failed to save");
                    }
                    Ember.$('.loadingRegister').addClass('hidden');
                    Ember.$('.registration-submit').removeAttr('disabled');

                }else{

                    // Log in on sign up
                    const { identification, password } = _this.getProperties('identification', 'password');

              _this.get('session').authenticate('authenticator:oslr', identification, password).catch(function(error){
                // Overwrite simple auth functions for error handling
                    alert("Login failed. Please check your username and password are correct.");
                    console.log(error);

                        Ember.$('.loadingRegister').addClass('hidden');
                        Ember.$('.registration-submit').removeAttr('disabled');
              });


                    _this.transitionToRoute('/');
                //	alert("Success! Please check your inbox for a confirmation email and follow the instructions to complete your registration.");
                }
            }).catch(function(ea){
                console.log("REGISTRATION FAILED:");
                console.log(ea);

                Ember.$('.loadingRegister').addClass('hidden');
                Ember.$('.registration-submit').removeAttr('disabled');

                // alert("Sorry, there was an error saving your data. Please contact us for more information.");
                var err = ea.errors[0].detail;
                alert(err);
            });

        }
    }

});
