/**
* Application autheticator. Basic DeviseAuthenticator with minimal adjust
*
* @module AppCore
* @class authenticator-oslr
**/
import config from '../config/environment';
import DeviseAuthenticator from 'ember-simple-auth/authenticators/devise';

export default DeviseAuthenticator.extend({

  serverTokenEndpoint: `${config.DS.host}/users/sign_in`,
  identificationAttributeName: 'user_email'

});



// Below example works with OAuth server (e.g. for Phoenix)
//
// import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
// import config from '../config/environment';
//
// export default OAuth2PasswordGrant.extend({
//   serverTokenEndpoint: `${config.DS.host}/auth/token`
// });
