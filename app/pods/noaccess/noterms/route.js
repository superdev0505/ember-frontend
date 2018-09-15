import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel: function(){
    var _this = this;
    if(!this.get('session').get('isAuthenticated')) {
      this.transitionTo('auth.login');
    }else{
      this.store.find('user', this.get('session.data.authenticated.user_id')).then(function(user){
        if(user.get('terms')){
          _this.transitionTo('app.main.availabilities');
        }
      });
    }
  }
});
