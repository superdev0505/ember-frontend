import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['availability'],


  isNow: false,
    isToday: false,

    // Is this going on now?
    checkIfNow: Ember.on('init', Ember.observer(
      'clock.minute',
      'availability.startTime',
      'availability.endTime',
      function(){
          var now = new Date();
          if(new Date(this.get('availability.startTime')) < now && new Date(this.get('availability.endTime')) > now){
              this.set('isNow', true);
          }else{
              this.set('isNow', false);
          }

      }
    )),

    // Is it going on today?
    checkIfToday: Ember.on('init', Ember.observer(
      'clock.hour',
      'availability.startTime',
      'availability.endTime',
      function(){
          var now = new Date();
          var today = now;
          today = today.setHours(0,0,0,0);
          var astart = new Date(this.get('availability.startTime'));
          var aend = new Date(this.get('availability.endTime'));
          if(astart > now & (astart.setHours(0,0,0,0) === today | aend.setHours(0,0,0,0) === today)){
              this.set('isToday', true);
          }else{
              this.set('isToday', false);
          }

      }
    )),
});
