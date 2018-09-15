import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
//
//
//
//
// import resolver from './helpers/resolver';
// import {
//   setResolver
// } from '@ember/test-helpers';
// import { invalidateSession, authenticateSession, currentSession } from './helpers/ember-simple-auth';
// import Ember from 'ember';
//
// import { start } from 'ember-cli-qunit';
//
// import config from '../config/environment';
//
// setResolver(resolver);
//
// // Define the home page which users are redirected to on login etc.
// Ember.Test.registerHelper('homeRoute',
//   function(){ return "app.main.home.teach"; }
// );
// Ember.Test.registerHelper('homeUrl',
//   function(){ return "/app/main/home/teach"; }
// );
//
// Ember.Test.registerAsyncHelper('logout',
// function(application) {
//   invalidateSession(application);
// });
//

//
//
// // Helper blocks to sign in particular users, all of which are defined in the test database rake task:
// //  A 'main' user who is fully confirmed and verified
// //
// Ember.Test.registerAsyncHelper('signInMain',
// function(app, assert) {
//   assert.equal(1, 1, "Logging in main user");
//   signIn(assert, 'test1@oslr.co.uk');
// });
//
// Ember.Test.registerAsyncHelper('signInProfileIncomplete',
// function(app, assert) {
//   assert.equal(1, 1, "Logging in user with incomplete profile");
//   signIn(assert, 'test_incomplete_profile@oslr.co.uk');
// });
//
// Ember.Test.registerAsyncHelper('signInUnverified',
// function(app, assert) {
//   assert.equal(1, 1, "Logging in unverified user");
//   signIn(assert, 'test_unverified@oslr.co.uk');
// });
//
// Ember.Test.registerAsyncHelper('signInUnconfirmed',
// function(app, assert) {
//   assert.equal(1, 1, "Logging in unconfirmed user");
//   signIn(assert, 'test_unconfirmed@oslr.co.uk');
// });
//
// Ember.Test.registerAsyncHelper('signInNoterms',
// function(app, assert) {
//   assert.equal(1, 1, "Logging in user who hasn't acceped T&Cs");
//   signIn(assert, 'test_no_terms@oslr.co.uk');
// });
//
//
//
// Ember.Test.registerHelper('myCurrentPath',
// function(application, assert, expected, message) {
//
//   if(!message){
//     message = "CurrentPath should be: " + expected + ", was: " + currentPath().toString();
//   }
//
//   Ember.run(function() {
//     // check currentPath
//     assert.equal(currentPath(), expected, message);
//   });
// }
// );
//
// Ember.Test.registerHelper('mycurrentRouteName',
// function(application, assert, expected, message) {
//
//   if(!message){
//     message = "CurrentRouteName should be: " + expected + ", was: " + currentRouteName().toString();
//   }
//
//   Ember.run(function() {
//     // check currentPath
//     assert.equal(currentRouteName(), expected, message);
//   });
// }
// );
//
// Ember.Test.registerHelper('myCurrentURL',
// function(application, assert, expected, message) {
//
//   if(!message){
//     message = "CurrentURL should be: " + expected + ", was: " + currentURL().toString();
//   }
//
//   Ember.run(function() {
//     // check currentPath
//     assert.equal(currentURL(), expected, message);
//   });
// }
// );
//
// Ember.Test.registerHelper('myCurrentURLid',
// function(application, expected, message) {
//
//   var id = currentURL().split('/').pop();
//
//   if(!message){
//     message = "CurrentURL should be: " + expected + id + ", was: " + currentURL().toString();
//   }
//
//   Ember.run(function() {
//     // check currentPath
//     equal(currentURL(), expected + id, message);
//   });
// }
// );
//
//
//
//
//
// Ember.Test.registerAsyncHelper('createUser',

//
// Ember.Test.registerAsyncHelper('clickSelect2',
// function(application, select2selector) {
//   $(select2selector + ' .select2-chosen', 'mousedown');
// });
//
// // Sets a select2 dropdown to a given value
// // Useful helpers here: https://github.com/netguru/til/blob/master/ember/acceptance-testing-of-ember-select-2.md
// Ember.Test.registerAsyncHelper('setSelect2',
// function(application, assert, select2selector, select2value) {
//   assert.equal(1, 1, "setSelect2 helper started")
//   // Make sure we're looking at the active selector
//   select2selector = select2selector;
//
//   assert.equal(find(select2selector + ' .select2-chosen').length, 1, "Select2 field was found: " + select2selector);
//   // Check the dropdown is not shown
//   assert.equal(find('.select2-result').length === 0, true, "At least one result is available for " + select2selector);
//   // Check the field value is not the given value
//   assert.equal(find(select2selector + " .select2-chosen:contains('"+select2value+"')").length, 0, "Select2 "+select2selector+" is not initially set to " + select2value);
//   // display current selection
//   assert.equal(1, 1, "Select2 "+select2selector+" initially set to " + find('.select2-chosen').html());
//   // triggerEvent(select2selector + ' .select2-chosen', 'mousedown');
//   click(select2selector + " .select2-choice");
//   andThen(function() {
//     assert.equal($('.select2-result').length > 0, true, "Select2 option fields were shown when dropdown clicked");
//     assert.equal($('.select2-result-label:contains("'+select2value+'")').length > 0, true, select2value + " is an option for " + select2selector);
//     // Select the job title as 'FY2'
//     $(".select2-result-label:contains('"+select2value+"')").mouseup();
//     assert.equal(1, 1, select2value + " Selected");
//   });
// });
//
//
// Ember.Test.registerAsyncHelper('createAvailability',
// function(application, assert, opts) {
//
//
// });
//
// // Invite a user to an availability
// Ember.Test.registerAsyncHelper('inviteToAvailability',
//
//
//
// // Creates a completed availability
// // Invites the users in the users array and accepts them
// // Those in the usersdna are marked as DNA
// Ember.Test.registerAsyncHelper('createCompleteAvailability',
// function(application, assert, opts, users, usersdna) {
//
//   assert.equal(1, 1, "createCompleteAvailability helper started");
//
//   createAvailability(assert, opts);
//   assert.equal(1,1, "Availability created")
//   if(!users){
//     users = [];
//   }
//   if(!usersdna){
//     usersdna = [];
//   }
//
//   andThen(function(){
//     assert.equal(currentRouteName(), "app.main.availabilities/show.index", "Correctly redirected to show/index");
//     // Get the availability ID here from the URL
//     var aId = currentURL().match(/\d+/)[0];
//     // equal(aId, 1, "Availability ID...")
//     users.forEach(function(user){
//       inviteToAvailability(assert, aId, user.name);
//     });
//     usersdna.forEach(function(user){
//       inviteToAvailability(assert, aId, user.name);
//     });
//
//     andThen(function(){
//       // Check feedback isn't available yet
//       assert.equal(find(".show-availability-button:contains('feedback')").length > 0, 0, "Feedback tab NOT available for non-completed session");
//       // Mark it as Complete
//       click(".show-availability-button:contains('info')");
//       andThen(function(){
//         assert.equal(currentRouteName(), "app.main.availabilities/show.index");
//         assert.equal(find('.complete-session-button').length > 0, 1, "Complete session button found");
//         click('.complete-session-button');
//         andThen(function(){
//           assert.equal(currentRouteName(), "app.main.availabilities/completed");
//
//           assert.equal(find('.completed-notes-field').length > 0, 1, "Completed notes input found");
//           assert.equal(find('.completed-user :contains("'+currentSession(application).get('currentUser.name')+'")').length > 0, 1, "Completed user for creating user found ("+currentSession(application).get('currentUser.name')+")");
//           users.forEach(function(user){
//             assert.equal(find('.completed-user :contains("'+user.name+'")').length > 0, 1, "Completed user for "+user.name+" found");
//           });
//           usersdna.forEach(function(user){
//             assert.equal(find('.completed-user :contains("'+user.name+'")').length > 0, 1, "Completed user for "+user.name+" found");
//           });
//
//           // Set the creating user and user A as attended, user B as DNA
//           click('.completed-user-name:contains("'+currentSession(application).get('currentUser.name')+'")+td .markAttendedButton');
//
//           andThen(function(){
//             // Mark everything as completed
//             click('.mark-complete-button');
//
//             // Don't allow if an answer isn't given for all users
//             assert.equal(currentRouteName(), "app.main.availabilities/completed");
//
//             users.forEach(function(user){
//               click('.completed-user-name:contains("'+user.name+'")+td .markAttendedButton');
//             });
//             usersdna.forEach(function(user){
//               click('.completed-user-name:contains("'+user.name+'")+td+td .markDnaButton');
//             });
//
//             andThen(function(){
//               click('.mark-complete-button');
//
//               andThen(function(){
//                 assert.equal(currentRouteName(), "app.main.availabilities/show.index");
//                 click(".show-availability-button:contains('people')");
//                 andThen(function(){
//                   assert.equal(find('.availability-user :contains("'+currentSession(application).get('currentUser.name')+'")').length > 0, 1, "Creating user is shown");
//                   assert.equal(find('.availability-user :contains("'+currentSession(application).get('currentUser.name')+'") :contains("attended")').length > 0, 1, "Creating user is shown as 'attended'");
//                   users.forEach(function(user){
//                     assert.equal(find('.availability-user :contains("'+user.name+'")').length > 0, 1, user.name + " is shown");
//                     assert.equal(find('.availability-user :contains("'+user.name+'") :contains("attended")').length > 0, 1, user.name + " is shown as 'attended'");
//                   });
//                   usersdna.forEach(function(user){
//                     assert.equal(find('.availability-user :contains("'+user.name+'")').length > 0, 1, user.name + " is shown");
//                     assert.equal(find('.availability-user :contains("'+user.name+'") :contains("dna")').length > 0, 1, user.name + " is shown as 'dna'");
//                   });
//
//                   // Feedback tab should now be available
//                   assert.equal(find(".show-availability-button:contains('feedback')").length > 0, 1, "Feedback tab available for completed session");
//                 });
//               });
//             });
//           });
//         });
//       });
//     });
//   });
// });
//
// start();
