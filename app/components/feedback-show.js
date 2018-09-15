import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['feedback-show'],

  // Expects a variable 'feedback'

  // Sort responses
  // Needs a custom function because we are sorting on a property of the associated feedbackQuestion object
  sortedResponses: Ember.computed.sort('feedback.feedbackQuestionResponses', function(x,y){
    if(x.get('feedbackQuestion.position') > y.get('feedbackQuestion.position')){
      return 1;
    }else if (x.get('feedbackQuestion.position') < y.get('feedbackQuestion.position')){
      return -1;
    }
    return 0;
  })
});
