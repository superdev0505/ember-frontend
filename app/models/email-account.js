import Ember from 'ember';
/**
* Email Account model. A user can have any number of email accounts, which may be confirmed and/or verified.
*
* Confirmed accounts have had their authentication code entered proving that the person owns the email address.
*
* Verified accounts match certain patterns e.g. nhs.net or .ac.uk
*
* @module Alerts
* @main Alerts
* @class model-alert
*/
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({

  user: belongsTo('user'),
  email: attr(),
  verified: attr(),
  confirmed: attr(),
  primary: attr(),

  unconfirmed: Ember.computed('confirmed', function(){
    return !this.get('confirmed');
  }),

  unverified: Ember.computed('verified', function(){
    return !this.get('verified');
  })
});
