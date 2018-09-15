/**
* The Alerts module handles browsing, viewing and responding to received alerts.
*
* @module Alerts
* @main Alerts
* @class model-alert
*/
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  text: attr(),
  unread: attr(),
  readLink: attr(),
  userId: attr(),
  createdAt: attr(),
  updatedAt: attr(),
  targetType: attr(),

  user: belongsTo('user'),

  target: belongsTo('alertable', {polymorphic: true})
});
