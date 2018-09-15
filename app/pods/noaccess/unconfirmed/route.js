import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel: function(){
    var _this = this;
    if(!this.get('session').get('isAuthenticated')) {
      this.transitionTo('auth.login');
    }else{
      this.store.find('user', this.get('session.data.authenticated.user_id')).then(function(user){
        _this.get('session').set('currentUser', user);
        if(user.get('confirmed')){
          _this.transitionTo('app.main.availabilities');
        }
      });
    }
  },


  setupController: function(controller, model){
    this._super(controller, model);

    var _this = this;
    this.store.query('emailAccount', { "filter[email]": this.get('session.data.authenticated.user_email') }).then(function(em){
      controller.set('emailAccount', em.get('firstObject'));
    });
  }

  // // The model for this route is the primary email address of the logged in user
  // model: function(){
  //   var em = this.store.query('emailAccount', {"finder[email]": this.get('session.data.authenticated.user_email')});
  //   debugger
  //   return em;
  // }

});
