/**
* Show Availability Route (index)
*
* Show details about the session. Rendered as a sub-route of show. No editing functions
*
* @module Availabilities
* @class controller-app.main.availabilities.show.index
*/
import Ember from 'ember';

export default Ember.Controller.extend({
  showController: Ember.inject.controller("app/main/availabilities/show"),

  model: Ember.computed.reads('showController.model'),
  changeset: Ember.computed.reads('showController.changeset'),
  teachers: Ember.computed.reads('showController.teachers'),
  students: Ember.computed.reads('showController.students'),
  joinModel: Ember.computed.reads('showController.joinModel')

});
