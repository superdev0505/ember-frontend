/**
* Complete a feedback request
*
* This route is NOT a sub-route of app.main because an unauthenticated user could access this to complete a request. Layout is different if someone is logged in.
*
* If the request is completed it will still render the submitted feedback.
*
* @module Feedbacks
* @class route feedback-requests/show
*/
import Ember from 'ember';

export default Ember.Route.extend({

  model: function(params){
    return this.store.query('feedback-request', {
      'filter[token]': params.token,
      include: 'user,target,availability,feedback.feedback-question-responses.feedback-question'
    }).then(function(fr){

      if(fr && fr.get('length') > 0){
        return fr.get('firstObject');
      }else{
        return null;
      }
    });
  },

  setupController: function(controller, model){
    this._super(controller, model);
    var fq = this.store.findAll('feedback-question', {sort: 'position'});
    controller.set('feedbackQuestions', fq);
    fq.then(function(fqs){
      var responses = Ember.A();
      fqs.forEach(function(f){
        responses.pushObject(null);
      })
      controller.set('responses', responses);
    })

  }
});
