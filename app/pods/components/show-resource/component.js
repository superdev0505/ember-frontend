import Ember from 'ember';

export default Ember.Component.extend({

  actions: {

    openResourceLink: function(resource){
            var url;
            if(resource.get('isWebsite')){
                url = resource.get('url');
            }
            if(resource.get('isTextbook')){
                url = this.get('apiUrl') + "/resource_textbooks/" + resource.get('id') + "/click";
                url = url + "?user_id=" + this.get('session.data.authenticated.user_id');
            }

            // Check for http://
            if (!url.match(/^[a-zA-Z]+:\/\//))
            {
                url = 'http://' + url;
            }
            window.open(url, '_system');
        }

  }
});
