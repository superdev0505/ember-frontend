import Ember from 'ember';

export default Ember.Controller.extend({

  showController: Ember.inject.controller("app/main/availabilities/show"),

  model: Ember.computed.reads('showController.model'),
  canEdit: Ember.computed.reads('showController.canEdit'),
  teachers: Ember.computed.reads('showController.teachers'),
  students: Ember.computed.reads('showController.students'),
  attended: Ember.computed.reads('showController.attended'),

  // Find students who attended and no feedback has yet been requested
  attendedNoRequests: Ember.computed('attended', 'model.feedbackRequests.[]', function(){
    var _this = this;
    return this.get('attended').filter(function(x){
      return !_this.get('model.feedbackRequests').map(function(y){ return y.get('target.id'); }).includes(x.get('id'));
    });
  }),

  usersForFeedback: Ember.A(),
  remodal: Ember.inject.service(),

  feedbackRequestMessage: "",

  actions: {
    requestFeedbackAll(){
      this.set('usersForFeedback', this.get('attendedNoRequests'));
      this.get('remodal').open('newFeedbackRequestModal');
    },
    requestFeedback(user){
      this.set('usersForFeedback', [user]);
      this.get('remodal').open('newFeedbackRequestModal');
    },

    sendFeedbackRequest(){
      var _this = this;
      this.get('usersForFeedback').forEach(function(user){
        _this.store.createRecord('feedback-request', {
          user: _this.get('session.currentUser'),
          target: user,
          availability: _this.get('model'),
          message: _this.get('feedbackRequestMessage')
        }).save();
      })
      this.get('remodal').close('newFeedbackRequestModal');
    },
    cancelFeedbackRequest(){
      this.get('remodal').close('newFeedbackRequestModal');
    }
  }

});
