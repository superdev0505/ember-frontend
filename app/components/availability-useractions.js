import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),

  // Handles contextual actions between a user and the availability model
  // Expects 2 arguments: availability and joinModel
  // Possible actions:
  //  No join model, public session, proposed or confirmed -> can sign up
  //  Invited -> accept or reject
  //  Interested, session now confirmed -> confirm attendance
  //  Interested/confirmed -> cancel

  actions: {
    // Sign up to a public session
    signUp(autoconfirm){
      if(this.get('availability.students.length') >= this.get('availability.maxStudents')){
        alert("Sorry, the maximum number of students is already signed up.");
        return false
      }

      if(!autoconfirm){
        if(!confirm('Sign up to this session? You are committing to attend.')){
          return false;
        }
      }
      var a = this.get('availability');
      var j = this.get('joinModel');
      var _this = this;
      if(a.get('aasmState') === 'cancelled' || a.get('aasmState') === 'completed'){
        alert("You can't sign up to a completed or cancelled session");
        return false
      }
      if(a.get("isPrivate")){
        alert("This session is private. You need to be invited to join.");
        return false;
      }
      this.get('store').createRecord('availability-user',{
        availability: a,
        user: this.get('session.currentUser')
      }).save().then(function(join){
        _this.get('availability.availabilityUsers').pushObject(join);
        // a.get('availabilityUsers').pushObject(join);
        _this.set('joinModel', join);
      });

    },

    cancelSignUp(){
      if(confirm("Cancel your attendance at this session?")){
        this.get('joinModel').set('aasmState', 'cancelled');
        this.get('joinModel').save();
      }
    },

    uncancelSignUp(){
      var _this = this;
      if(confirm("Sign up to this session again? By doing this you are committing to attend.")){
        this.get('joinModel').set('aasmState', 'confirmed');
        this.get('joinModel').save();
        // this.get('joinModel').destroyRecord().then(function(){
        //   _this.send('signUp', true);
        // })
      }
    }
  }
});
