import Ember from 'ember';
/**
* Defines a User object.
*
* Properties synchronised with the server-side model:
* name, email, bio, password, terms, gmc
*
* Read-only properties (i.e. can't be updated from the Ember app, leading to potential insecurities):
* confirmed, avatar_url
*
*
* @module Users
* @class model-user
*/
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr(),
  email: attr(),
  bio: attr(),
  password: attr(),
  confirmed: attr({readOnly: true}),
  terms: attr(),
  gmc: attr(),

  avatar_url: attr({readOnly: true}),
    hasAvatar: attr({readOnly: true}),
  avatar_fullpath: Ember.computed('avatar_url', function(){
    var url = this.get('avatar_url');
    if(url.match(/http:/) == null & url.match(/https:/) == null){
      url = this.get('apiUrl') + url;
    }
        return url;
    }),

  jobTitle: belongsTo('job-title'),
  userLocations: hasMany('user-location'),
  locations: hasMany('location'),
  emailAccounts: hasMany('email-account'),

  // conversations: hasMany('conversation'),
  conversationMembers: hasMany('conversation-member'),

  feedbackRequestsSent: hasMany('feedback-requests', {inverse: 'user'}),
  feedbackRequestsReceived: hasMany('feedback-requests', {inverse: 'target'}),

  /**
  * Determine if the profile is complete
  * i.e. has a job title and a location set
  *
  * @method incompleteProfile
  */
    incompleteProfile: Ember.computed('jobTitle', 'userLocations', function(){
        if(this.get('jobTitle.content') === null){
            return true;
        }
        if(this.get('userLocations.length') === 0){
            return true;
        }
        return false;
    }),

  /**
  * Determine if the person is a qualified doctor based on their job title
  *
  * @method isQualified
  */
  isQualified: Ember.computed('jobTitle', function(){
        var jt = this.get('jobTitle');
        return jt && jt.get('qualified');
    })

});
