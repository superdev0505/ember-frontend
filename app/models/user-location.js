/**
* Join model connecting users and hospitals.
*
* @module Users
* @class model-user-location
*/
import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  user: belongsTo('user'),
  location: belongsTo('location')
});
