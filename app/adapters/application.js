/**
* Application adapter. Uses devise authorizer, and data adapter mixin from ember-simple-auth for route authentication.
*
* Custom headers pass the application version and environment with each response.
*
* Includes some hack methods to allow side loading from JSONAPI-resources.
*
* @module AppCore
* @class adapter-application
**/
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import config from '../config/environment';

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  host: config.DS.host,
  authorizer: 'authorizer:devise',

  headers: {
    'x-vendor-appVersion': config.APP.appVersion,
    'x-vendor-appEnvironment': config.environment
  },

  urlForFindRecord(query, modelName, snapshot) {
    var url = this._super(...arguments);

    return this._processIncludes(url, snapshot);
  },

  urlForFindAll(query, modelName, snapshot) {
    var url = this._super(...arguments);

    return this._processIncludes(url, snapshot);
  },

  _processIncludes(url, snapshot) {
    var options = snapshot && snapshot.adapterOptions;

    if (options && options.include) {
      url = `${url}?include=${options.include}`;
    }

    return url;
  }

  // Side-loading hack
  // By default, if a resource has an association with async:false we want to add include=<resouce name> to the request
  // _buildURL(modelName, id) {
  //   // var url = [];
  //   // var host = get(this, 'host');
  //   // var prefix = this.urlPrefix();
  //   // var path;
  //   //
  //   // if (modelName) {
  //   //   path = this.pathForType(modelName);
  //   //   if (path) { url.push(path); }
  //   // }
  //   //
  //   // if (id) { url.push(encodeURIComponent(id)); }
  //   // if (prefix) { url.unshift(prefix); }
  //   //
  //   // url = url.join('/');
  //   // if (!host && url && url.charAt(0) !== '/') {
  //   //   url = '/' + url;
  //   // }
  //   var url = this._super();
  //   // url = url + "?test=1";
  //   console.log("URL: " + url)
  //
  //   return url;
  // }
});
