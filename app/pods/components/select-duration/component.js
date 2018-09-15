/**
* Adjust the session duration using + and - arrows
*
* @module Availabilities
* @class component-select-duration
*/
import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['duration-select'],

  actions: {
    reduceDuration: function(){
      if(this.get('model.duration') <= 15){return false;}
      this.get('model').set('endTime', new Date(this.get('model.endTime').getTime() - 15*60000))
    },
    increaseDuration: function(){
      this.get('model').set('endTime', new Date(this.get('model.endTime').getTime() + 15*60000))
    }
  }
});
