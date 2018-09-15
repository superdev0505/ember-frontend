/**
* Default serializer. Allows readOnly attributes.
*
* @module AppCore
* @class serializer-application
*/
import JSONAPISerializer from 'ember-data/serializers/json-api';

export default JSONAPISerializer.extend({

  // Allow readOnly attributes which aren't serialized
  // e.g. confirmed is not set on the client side so should be read only
  serializeAttribute(snapshot, json, key, attribute) {
    // do not serialize the attribute!
    if (attribute.options && attribute.options.readOnly) {
      return;
    }
    this._super(...arguments);
  }

  // keyForAttribute(attr) {
  //     return Ember.String.decamelize(attr);
  //   }
  // payloadKeyFromModelName: function(modelName) {
  //   // return Ember.String.singularize(modelName);
  //   // return Ember.String.underscore(modelName);
  //   return this._super();
  // }
});

// Example of a curl command to update a user:
// curl -X PATCH -H "Content-Type:application/vnd.api+json" --data '{"data":{"id":"1","attributes":{"name":"Oslrtest 1","email":"test1@oslr.co.uk","bio":null,"confirmed":true,"terms":true},"relationships":{"job-title":{"data":{"type":"job-titles","id":"5"}}},"type":"users"}}' http://localhost:3000/users/1
