import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),

  loadSessions: Ember.on('init', function(){
    var _this = this;
    this.get('store').query('availability',{
      "page[limit]": 5,
      "filter[filter_type]": 'suggested',
      include: 'location,availability-users.user'
    }).then(function(availabilities){
      _this.set('model', availabilities);
    });
  })

});
