import Ember from 'ember';

export default Ember.Component.extend({

  min: 0,
  max: 10,
  step: 1,

  targetVal: 0, // This should be passed in e.g. availableDuration

  actions: {

    doPlus: function(){
      if(this.get('targetVal') >= this.get('max')){
        return false;
      }
      this.set('targetVal', this.get('targetVal') + this.get('step'));
    },
    doMinus: function(){
      if(this.get('targetVal') <= this.get('min')){
        return false;
      }
      this.set('targetVal', this.get('targetVal') - this.get('step'));
    }
  }

});
