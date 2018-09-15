/**
* Landing page for the app. Redirect to the teach page.
*
* @module Home
* @class route-index
*/
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  session: Ember.inject.service(),
  beforeModel() {

    // Landing page - redirect to the teach page
    this.transitionTo('app.main.home.teach');

  }

});
