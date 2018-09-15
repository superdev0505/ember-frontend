/**
* When a session is marked as 'completed' the user is directed here.
*
* They are asked to confirm who attended and what was taught. They can then send feedback.
*
* @module Availabilities
*/
import Ember from 'ember';
import config from '../../../../../config/environment';

export default Ember.Controller.extend({
  pageTitle: "Complete Session",

  attendedUsers: Ember.A(),
  dnaUsers: Ember.A(),
  feedbackUsers: Ember.A(),

  // Determine whether to create a logbook entry object on submit
  createLogbookEntry: true,
  logbookReflection: "",

  remodal: Ember.inject.service(),

  actions: {

    showAddUsersModal(){
      this.get('remodal').open('addCompletedUserModal');
    },

    /**
    * Click the tick button, marking that a user attended teaching. Add to the attendedUsers array
    *
    * @method markAttended
    */
    markAttended(join){
      if(this.get('dnaUsers').includes(join)){
        this.get('dnaUsers').removeObject(join);
      }
      if(this.get('attendedUsers').includes(join)){
        this.get('attendedUsers').removeObject(join);
      }else{
        this.get('attendedUsers').addObject(join);
        if(!this.get('feedbackUsers').includes(join) & join.get('user.id') !== this.get('currentUser.id')){
          this.get('feedbackUsers').addObject(join);
        }
      }
    },

    /**
    * Click the cross button, marking that a user did not attend teaching. Add to the dnaUsers array
    *
    * @method markDna
    */
    markDna(join){
      if(this.get('attendedUsers').includes(join)){
        this.get('attendedUsers').removeObject(join);
      }
      if(this.get('feedbackUsers').includes(join)){
        this.get('feedbackUsers').removeObject(join);
      }
      if(this.get('dnaUsers').includes(join)){
        this.get('dnaUsers').removeObject(join);
      }else{
        this.get('dnaUsers').addObject(join);
      }
    },

    /**
    * Click the cross button, marking that a user did not attend teaching. Add to the dnaUsers array
    *
    * @method toggleFeedback
    */
    toggleFeedback(join){
      // Can't add yourself...
      if(join.get('user.id') === this.get('currentUser.id')){
        return false;
      }
      if(this.get('feedbackUsers').includes(join)){
        this.get('feedbackUsers').removeObject(join);
      }else{
        this.get('feedbackUsers').addObject(join);
      }

    },

    /**
    * Mark the session as complete. Record the attendance of all users. Create feedback requests if appropriate.
    *
    * @method markComplete
    */
    markComplete(){

      var _this = this;

      if(this.get('attendedUsers.length') + this.get('dnaUsers.length') !== this.get('model.availabilityUsers.length')){
        alert("Please mark who attended and who did not.");
        return false;
      }
      if(!confirm("Mark this session as complete? You won't be able to edit it, but can request feedback from your students.")){
        return false;
      }
      this.get('attendedUsers').forEach(function(x){
        x.set('aasmState', 'attended');
        x.save();
      });
      this.get('dnaUsers').forEach(function(x){
        x.set('aasmState', 'dna');
        x.save();
      });

      // Create feedback requests, if the feedback module is enabled
      if(config.APP.enabledModules.includes('Feedbacks')){
        this.get('feedbackUsers').forEach(function(x){
          _this.store.createRecord('feedback-request', {
            availability: _this.get('model'),
            user: _this.get('session.currentUser'),
            target: x.get('user')
          }).save();
        })
      }

      // Create a logbook entry, if module enabled and the user chooses to
      // We have a space for a 'reflection' here but it is not yet implemented - may be tagged to the LogbookEntry model
      if(config.APP.enabledModules.includes('Feedbacks')){
        if(this.get('createLogbookEntry')){
          this.store.createRecord('logbook-entry', {
            target: this.get('model'),
            availability: this.get('model'),
            user: this.get('session.currentUser'),
            entryType: 'taught',
            date: this.get('model.startTime')
          }).save();

          // var r = this.get('logbookReflection');
          // if(r && r !== ""){
          //   this.get('model').set('completedNotes', r);
          //   this.get('model').save();
          // }
        }
      }

      this.get('model').set('aasmState', 'completed');
      this.get('model').save();
      this.transitionToRoute('app.main.availabilities/show', this.get('model'));
    }
  }
});
