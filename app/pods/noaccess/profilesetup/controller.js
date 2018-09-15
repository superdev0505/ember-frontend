import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    saveProfile: function(){
      var _this = this;
      this.get('model').save().then(function(data){
        if(_this.get('model.incompleteProfile')){
          alert("Please complete all parts of this form to continue.")
        }else{
          _this.transitionToRoute('noaccess.walkthrough');
        }
      })
    }
  }
});
