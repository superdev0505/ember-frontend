import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    submitFeedback: function(){
      var _this = this;
      if(!confirm('Submit feedback? Your responses cannot be changed once submitted.')){
        return false;
      }
      // console.log(this.get('responses'))

      var allEmpty = this.get('responses').every(function(x){
        return x === null;
      });
      if(allEmpty){
        alert("Please enter some feedback");
        return false;
      }

      var fqs = this.get('feedbackQuestions');
      // Create a feedback object to attach responses to
      var feedback = this.store.createRecord('feedback', {
        user: this.get('model.target'),
        target: this.get('model.user'),
        availability: this.get('model.availability')
      }).save();
      Ember.RSVP.all([fqs, feedback]).then(function(){
        var requests = []
        // Tag the request with the completed feedback
        _this.get('model').set('feedback', feedback);
        var s = _this.get('model').save();
        requests.push(s);

        // Create responses
        for(var i=0; i < _this.get('responses.length'); i++){
          var question = fqs.objectAt(i);
          var response = _this.get('responses')[i];
          console.log(question.get('title'));
          console.log(response);
          if(!(response === null || response === "" || response === undefined)){
            var opts = {
              feedback: feedback,
              feedbackQuestion: question
            };
            if(question.get('questionType') === 'likert'){
              opts.score = response;
            }else{
              opts.body = response;
            }
            var f = _this.store.createRecord('feedback-question-response', opts).save();
            requests.push(f);
          }
        }
        Ember.RSVP.all(requests).then(function(){
          // _this.transitionToRoute('app.main.availabilities/show', _this.get('model.availability'));
        });
      })

    },

    // Manually create 2-way bindings as we have a dynamic number of response fields:
    updateResponses: function(){
      var responses = this.get('responses');
      for(var i=0; i<responses.get('length'); i++){
        var el = Ember.$('.response-text.' + i.toString());
        if(el.length > 0){
          responses[i] = Ember.$('.response-text.' + i.toString()).val();
        }
      }
      // console.log(responses)
      this.set('responses', responses);
    },

    selectLikert: function(questionId, optionId){
      Ember.$('.feedback-request-likert-option.question-' + questionId.toString()).removeClass('active');
      Ember.$('.feedback-request-likert-option.question-' + questionId.toString() + '.option-' + optionId.toString()).addClass('active');
      var responses = this.get('responses');
      responses[questionId] = optionId;
      this.set('responses', responses);
    }
  }
});
