import Ember from 'ember';

export default Ember.Component.extend({

  url: "",
  store: Ember.inject.service(),

  actions: {
    postWebsite: function(){
      var url = this.get('url');
      var name = this.get('name');
      if(url === ""){
        alert("Please enter a URL");
        return false;
      }
      var _this = this;

      var website = this.get('store').createRecord('resource-website',{
        url: url,
        name: name,
      });
      this.get('store').createRecord('availability-item',{
        availability: _this.get('model'),
        item: website,
        user: _this.get('session.currentUser')
      });

      this.set('url', "");
      this.set('name', "");
    }
  }
});
