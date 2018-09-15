/**
* When someone requests teaching, others can up-vote that teaching. This model stores the votes.
*
* @module AvailabilityRequests
* @class model-availability-request-vote
*/
import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  availabilityRequest: DS.belongsTo('availability-request')
});
