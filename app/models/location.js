/**
* Defines a hospital.
*
* Joined to users through a user-location model.
*
* @module Users
* @class model-location
*/
import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  name: attr(),
  latitude: attr(),
  longitude: attr(),

  userLocations: hasMany('user-location'),
  users: hasMany('users')
});
