/**
* This tests creating new availabilities. It tests all functions of the creation wizard, and of the quick create page
*
* @module Availabilities
* @class acceptance-test:availabilities-new
*/
/* global signInMain */
import { module, test } from 'qunit';
import { visit, currentURL, currentRouteName, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import signIn from 'oslr-ui/tests/helpers/sign-in';

module('Acceptance | availabilities', function(hooks) {
  setupApplicationTest(hooks);

  /**
  * Test the quick create route
  *
  * @method create-availability-quick
  */
  test('Create availability - quick', async function(assert) {
    await signIn(assert, 'test1@oslr.co.uk');

    await visit('/app/main/home/teach');
    assert.equal(currentURL(), '/app/main/home/teach', "Loaded Teach home page");
    assert.equal($('.teach-now-button').length, 1, "Teach Now button found");

    await click('.teach-now-button');
    assert.equal(currentURL(), '/app/main/availabilities/new/quick', "Teach Now button clicked -> loaded quick create page");

    // Check page components
    // TODO: Test individual components
    assert.equal($('.location-select').length, 1, "Select location field found");
    assert.equal($('.location-info-field').length, 1, "Location info field found");
    assert.equal($('.datetimepicker').length, 1, "Datetimepicker field found");
    assert.equal($('.duration-select').length, 1, "Select duration field found");
    assert.equal($('.availability-info-field').length, 1, "Info textarea found");
    assert.equal($('.new-availability-more-options-button').length, 1, "Info textarea found");
    assert.equal($('.navbar-footer .post-quick-session-button').length, 1, "Post session button present in footer");

    // Post the session with some demo text to test it saves
    var id = Math.random().toString();
    var infoText = "info_" + id;
    await fillIn('.availability-info-field', infoText);

    await click('.post-quick-session-button');
    assert.equal(currentRouteName(), 'app.main.availabilities/show.index', "Clicked post session button -> transition to show availability page");

    assert.equal($(".show-availability-info:contains('"+infoText+"')").length, 1, "Found info text in created session");

    // Lastly check the More Options button works
    await visit("/app/main/availabilities/new/quick");
    assert.equal(currentURL(), '/app/main/availabilities/new/quick', "Returned to quick session create page");
    await click(".new-availability-more-options-button");
    assert.equal(currentURL(), "/app/main/availabilities/new/when", "Clicked More Options -> transition to full wizard");
  });

  /**
  * Test the session creation wizard
  *
  * @method create-availability-wizard
  */
  test('Create availability - wizard', async function(assert) {
    await signIn(assert, 'test1@oslr.co.uk');
    var userName = "Test Name";

    var wizardSteps = ['when', 'who', 'what', 'preview'];

    await visit('/app/main/home/teach');
    assert.equal(currentURL(), '/app/main/home/teach', "Loaded Teach home page");
    assert.equal($('.teach-later-button').length, 1, "Teach Later button found");

    await click('.teach-later-button');
    assert.equal(currentURL(), '/app/main/availabilities/new/when', "Teach Later button clicked -> loaded creation wizard (when page)");

    assert.equal($('.location-select').length, 1, "Select location field found");
    assert.equal($('.location-info-field').length, 1, "Location info field found");
    assert.equal($('.datetimepicker').length, 1, "Datetimepicker field found");
    assert.equal($('.duration-select').length, 1, "Select duration field found");

    // Check footer buttons
    wizardSteps.forEach(function(step){
      assert.equal($('.navbar-footer .availabilities-new-button-' + step).length, 1, step + " button present in footer");
    });

    // TODO: Test components on when page

    // Move to who page
    await click('.availabilities-new-button-who');
    assert.equal(currentURL(), '/app/main/availabilities/new/who', 'Transitioned to who route');

    // Check page components present
    assert.equal($('.select-private').length, 1, "Select private component found");
    assert.equal($('.select-maxstudents').length, 1, "Select maxstudents component found");
    assert.equal($('.availability-invites').length, 1, "Availability invites component found");

    // There should be a user-availability listed for the creating user...
    assert.equal($('.invited-users-list-item:contains("'+userName+'")').length, 1, "Created an availability user for " + userName + " on create");
    assert.equal($('.availability-invites .added-user .added-user-name:contains("Test Name")').length, 1, "Found user entry for creating user");

    // Check the add users button - add Oslrtest 5
    assert.equal($('.availability-invites-added-users:visible').length, 0, "Add Users Popup not shown initially");
    await click('.open-add-users-popup');
    assert.equal($('.availability-invites-added-users:visible').length, 1, "Add Users Popup shown ");

    // Add Oslrtest 5
    var name = "Oslrtest 5";
    assert.equal($('.added-user:contains("'+name+'")').length, 0, name + " not added initially");
    assert.equal($('.addable-user:contains("'+name+'")').length, 1, name + " can be added");
    assert.equal($('.addable-user:contains("'+name+'") button').length, 1, name + " has an Add button");

    await click($('.addable-user:contains("'+name+'") button')[0]);
    assert.equal($('.added-user:contains("'+name+'")').length, 1, name + " added after click");
    assert.equal($('.addable-user:contains("'+name+'")').length, 0, name + " can't be added after click");
    assert.equal($('.invited-users-list-item:contains("'+name+'")').length, 1, "Created an availability user for " + name);

    // Move on to What field
    await click('.availabilities-new-button-what');
    assert.equal(currentURL(), '/app/main/availabilities/new/what', 'Transitioned to what route');
    var infoText = "Test Info " + Math.random().toString();
    await fillIn('.availability-info-field', infoText);

    // Move on to Preview
    await click('.availabilities-new-button-preview');
    assert.equal(currentURL(), '/app/main/availabilities/new/preview', 'Transitioned to preview route');

    // Post the session
    await click('.post-session-button');
    assert.equal(currentRouteName(), 'app.main.availabilities/show.index', 'Transitioned to show/index after session create');
    assert.equal($(".show-availability-info:contains('"+infoText+"')").length, 1, "Found info text in created session");
  });

  /**
  * Test browsing and searching of availabilities
  *
  * @method Browse-availabilities
  */
  test('Browse availabilities', async function(assert) {
    await signIn(assert, 'test1@oslr.co.uk');
    await visit('app/main/availabilities');
    assert.equal(currentURL(), 'app/main/availabilities', "Rendered availabilities index page");

    // Check page components
    assert.equal($('.availability-filters').length, 1, "Found availability filters field");
    assert.equal($('.searchBar').length, 1, "Found search bar");
    assert.equal($('.availability-scrolling-list-wrapper').length, 1, "Found availabilities list");
    assert.equal($('.feed-availability').length > 0, 1, "Found at least one availability");

    // Test search by looking for a previously created test session
    var sessionInfo = "My Test 0.6383237768895924";
    assert.equal($('.feed-availability:contains("'+sessionInfo+'")').length, 0, "Search test session not initially visible");
    await fillIn('.searchBar input', sessionInfo);
    assert.equal($('.feed-availability:contains("'+sessionInfo+'")').length, 1, "Search test session visible after search");
    await fillIn('.searchBar input', "");
    assert.equal($('.feed-availability:contains("'+sessionInfo+'")').length, 0, "Search test session not visible on search reset");
  });

  // test('Create new session', function(assert) {
  //   visit('/app/main/availabilities');
  //
  //   andThen(function() {
  //     assert.equal(currentURL(), '/auth/login');
  //     signInMain();
  //     visit("/app/main/availabilities");
  //     andThen(function(){
  //       assert.equal(currentURL(), "/app/main/availabilities");
  //
  //       // Make sure we're seeing at least one availability
  //       assert.equal(find(".availability-filters").length > 0, 1, "Filters are shown");
  //       assert.equal(find(".availability").length > 0, 1, "At least one availability is shown");
  //       assert.equal(find(".new-availability-button").length > 0, 1, "The New Teaching button is shown");
  //
  //       click('.new-availability-button');
  //       andThen(function(){
  //         assert.equal(currentURL(), "/app/main/availabilities/new/quick");
  //         // Initially only 2 buttons are shown - teach now or help me find a time
  //         assert.equal(find('.availability-mode-button').length, 2, "Found availability mode buttons")
  //         assert.equal(find('.panel').length, 0, "Further options not present initially")
  //
  //         // Create an ad-hoc session
  //         click('.availability-mode-button.adhoc');
  //         andThen(function(){
  //           assert.equal(find('.panel').length > 0, 1, "Further options present when adhoc button clicked")
  //
  //           // Make sure clicking the create teaching button doesn't do anything yet with no hospital selected
  //           click(".create-teaching-button");
  //           andThen(function(){
  //             assert.equal(currentURL(), "/app/main/availabilities/new");
  //
  //             // Enter the minumum possible data: a hospital ID
  //             setSelect2('.availability-locations-select2', "University College London");
  //
  //             click(".create-teaching-button");
  //             andThen(function(){
  //               assert.equal(currentRouteName(), "app.main.availabilities/show.index");
  //
  //
  //             })
  //           })
  //         })
  //
  //       })
  //
  //     })
  //   });
  // });
  //
  // test('Manage session', function(assert) {
  //   signInMain();
  //   var id = Math.random().toString();
  //   var info = 'My Test ' + id;
  //   var loc = "Margate Hospital";
  //   createAvailability({info: info, location: loc});
  //   andThen(function(){
  //     assert.equal(currentRouteName(), "app.main.availabilities/show.index");
  //     assert.equal(find(":contains('You are an administrator')").length > 0, 1, "User is an administrator of the session they created");
  //
  //     // Check the correct buttons are shown
  //     ["info", "edit", "people", "resources", "messages"].forEach(function(x){
  //       assert.equal(find(".show-availability-button:contains('"+x+"')").length > 0, 1, x +" button shown")
  //     })
  //     // ["feedback"].forEach(function(x){
  //     var x = 'feedback';
  //     assert.equal(find(".show-availability-button:contains('"+x+"')").length, 0, x +" button NOT shown")
  //     // })
  //
  //     // Should show the info
  //     assert.equal(find(":contains('"+info+"')").length > 0, 1, "Correct info shown");
  //     // Shows correct location
  //     assert.equal(find(":contains('"+loc+"')").length > 0, 1, "Correct location shown");
  //     // Shows correct student/teacher count
  //     assert.equal(find(":contains('1 teacher')").length > 0, 1, "Correct teacher count shown");
  //     assert.equal(find(":contains('0 of 6 students')").length > 0, 1, "Correct student count shown");
  //
  //
  //     // Open the Edit screen
  //     click(".show-availability-button:contains('edit')");
  //     andThen(function(){
  //       assert.equal(currentRouteName(), "app.main.availabilities/show.edit", "Edit route shown correctly");
  //
  //       assert.equal(find(":contains('"+info+"')").length > 0, 1, "Info shown");
  //       assert.equal(find(".toggleEditInfoButton").length > 0, 1, "Info edit button shown");
  //       assert.equal(find(".editInfoField").length > 0, 0, "Info edit field NOT shown");
  //       click('.toggleEditInfoButton');
  //       andThen(function(){
  //         assert.equal(find(".editInfoField").length > 0, 1, "Info edit field shown");
  //         fillIn('.editInfoField', "My New Info");
  //         click('.saveInfoButton');
  //         andThen(function(){
  //           assert.equal(find(".editInfoField").length > 0, 0, "Info edit field NOT shown");
  //           assert.equal(find(":contains('"+info+"')").length > 0, 0, "Old Info NOT shown");
  //           assert.equal(find(":contains('My New Info')").length > 0, 1, "New Info shown");
  //         })
  //       })
  //
  //       // TODO: Update time
  //       // TODO: Update location
  //       // TODO: Update private/public, #students
  //
  //     })
  //   })
  // });
  //
  // test("Invite Students", function(assert){
  //   signInMain();
  //   var id = Math.random().toString();
  //   var info = 'My Test ' + id;
  //   var loc = "Margate Hospital";
  //   createAvailability({info: info, location: loc});
  //   andThen(function(){
  //     assert.equal(currentRouteName(), "app.main.availabilities/show.index");
  //     click(".show-availability-button:contains('people')");
  //     andThen(function(){
  //       assert.equal(currentRouteName(), "app.main.availabilities/show.users", "Availabilities/show/Users route shown correctly");
  //
  //       // Check page components are present
  //       assert.equal(find(':contains("Settings")').length > 1, 1, "Found Settings element")
  //       assert.equal(find(':contains("Settings")').length > 1, 1, "Found Settings element")
  //       assert.equal(find(':contains("People")').length > 1, 1, "Found People element")
  //
  //       assert.equal(find(':contains("This is a private session")').length > 0, 1, "By default session is private")
  //       // assert.equal(find(':contains("Max 6 students")').length > 0, 1, "By default shows max students of 6")
  //       assert.equal(find('.availability-user').length, 1, "Shows exactly one user on session creation")
  //       assert.equal(find(':contains("Test Name")').length > 0, 1, "Shown user is the logged in user")
  //
  //       // Click the "Add" button
  //       assert.equal(find('.addUserButton').length, 1, "Shows the add user button")
  //       // assert.equal(find(':contains("Invite people")').length, 0, "Invite People window is NOT shown initially")
  //       click('.addUserButton');
  //       andThen(function(){
  //         assert.equal(find('.remodal-is-opened').length > 0, 1, "Modal is open");
  //         assert.equal(find(':contains("Invite people")').length > 0, 1, "Invite People window is shown")
  //
  //         assert.equal(find('.add-user-search-results').length > 0, 1, "Add user search results shown")
  //         // Oslrtest 2 is in the options to invite
  //         assert.equal(find('.add-user-search-results :contains("Oslrtest 2")').length > 0, 1, "Oslrtest 2 is in the options to invite")
  //         assert.equal(find('.add-user-search-results :contains("Oslrtest 3")').length > 0, 1, "Oslrtest 3 is in the options to invite")
  //         // Creating user is not in the options to invite
  //         assert.equal(find('.add-user-search-results :contains("Test Name")').length, 0, "Creating user is NOT in the options to invite")
  //
  //         assert.equal(find('.user-to-add :contains("Oslrtest 2")').length, 0, "Oslrtest 2 is NOT in the users to add")
  //         assert.equal(find('.user-to-add :contains("Oslrtest 3")').length, 0, "Oslrtest 3 is NOT in the users to add")
  //         // Add Oslrtest 2 to the people to invite
  //         click('.add-user-search-result :contains("Oslrtest 2")');
  //         andThen(function(){
  //           assert.equal(find('.added-users :contains("Oslrtest 2")').length > 0, 1, "Oslrtest 2 is in the users to add")
  //           assert.equal(find('.add-user-search-results :contains("Oslrtest 2")').length, 0, "Oslrtest 2 is NOT in the options to invite")
  //
  //           // Add and remove Oslrtest 3
  //           click('.add-user-search-result :contains("Oslrtest 3")');
  //           andThen(function(){
  //             assert.equal(find('.added-users :contains("Oslrtest 3")').length > 0, 1, "Oslrtest 3 is in the users to add")
  //             assert.equal(find('.add-user-search-results :contains("Oslrtest 3")').length, 0, "Oslrtest 3 is NOT in the options to invite")
  //             assert.equal(find('.added-users :contains("Oslrtest 3") .removeAddedUserButton').length > 0, 1, "Button to remove user is present")
  //             click('.added-users :contains("Oslrtest 3") .removeAddedUserButton');
  //             andThen(function(){
  //               assert.equal(find('.user-to-add :contains("Oslrtest 3")').length, 0, "Oslrtest 3 is NOT in the users to add")
  //               assert.equal(find('.add-user-search-results :contains("Oslrtest 3")').length > 0, 1, "Oslrtest 3 is in the options to invite")
  //
  //               // Send the actual invite to Oslrtest 2
  //               assert.equal(find('.do-add-users-button').length > 0, 1, "Found Send Invites button");
  //               assert.equal(find('.remodal-is-opened').length > 0, 1, "Modal is open");
  //               click('.do-add-users-button');
  //               andThen(function(){
  //                 // assert.equal(find('.remodal-is-closed').length > 0, 1, "Modal is closed");
  //
  //                 assert.equal(find('.availability-user').length, 2, "Two availability users are now shown")
  //                 assert.equal(find('.availability-user :contains("Test Name")').length > 0, 1, "Creating user is shown")
  //                 assert.equal(find('.availability-user :contains("Oslrtest 2")').length > 0, 1, "Invited user is shown")
  //               });
  //             });
  //           });
  //         });
  //       });
  //     });
  //   });
  // });
  //
  //
  //
  // test("Mark Complete", function(assert){
  //
  //   // Setup users to invite
  //   var idA = Math.random().toString();
  //   var userA = {
  //     email: "tester_"+idA+"@oslr.co.uk",
  //     name: "Test User " + idA,
  //     password: "testing123"
  //   };
  //   createUser(userA.name, userA.email, userA.password);
  //   var idB = Math.random().toString();
  //   var userB = {
  //     email: "tester_"+idB+"@oslr.co.uk",
  //     name: "Test User " + idB,
  //     password: "testing123"
  //   };
  //   createUser(userB.name, userB.email, userB.password);
  //
  //   // Sign in and create an availability
  //   signInMain();
  //   var id = Math.random().toString();
  //   var info = 'My Test ' + id;
  //   var loc = "Margate Hospital";
  //   createAvailability({info: info, location: loc});
  //
  //
  //
  //   andThen(function(){
  //     assert.equal(currentRouteName(), "app.main.availabilities/show.index");
  //     // Get the availability ID here from the URL
  //     var aId = currentURL().match(/\d+/)[0];
  //     // assert.equal(aId, 1, "Availability ID...")
  //     inviteToAvailability(aId, userA.name);
  //     inviteToAvailability(aId, userB.name);
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
  //           assert.equal(find('.completed-user :contains("Test Name")').length > 0, 1, "Completed user for creating user found");
  //           assert.equal(find('.completed-user :contains("'+userA.name+'")').length > 0, 1, "Completed user for User A found");
  //           assert.equal(find('.completed-user :contains("'+userB.name+'")').length > 0, 1, "Completed user for User B found");
  //
  //           // Set the creating user and user A as attended, user B as DNA
  //           click('.completed-user-name:contains("Test Name")+td .markAttendedButton')
  //
  //           andThen(function(){
  //             // Mark everything as completed
  //             click('.mark-complete-button');
  //
  //             // Don't allow if an answer isn't given for all users
  //             assert.equal(currentRouteName(), "app.main.availabilities/completed", "Redirected to session completion page");
  //
  //             click('.completed-user-name:contains("'+userA.name+'")+td .markAttendedButton');
  //             click('.completed-user-name:contains("'+userB.name+'")+td+td .markDnaButton');
  //
  //             andThen(function(){
  //               click('.mark-complete-button');
  //
  //               andThen(function(){
  //                 assert.equal(currentRouteName(), "app.main.availabilities/show.index", "After completion redirect to show/index");
  //                 click(".show-availability-button:contains('people')");
  //                 andThen(function(){
  //                   assert.equal(find('.availability-user :contains("Test Name")').length > 0, 1, "Creating user is shown")
  //                   assert.equal(find('.availability-user :contains("Test Name") :contains("attended")').length > 0, 1, "Creating user is shown as 'attended'")
  //                   assert.equal(find('.availability-user :contains("'+userA.name+'")').length > 0, 1, "User A is shown")
  //                   assert.equal(find('.availability-user :contains("'+userA.name+'") :contains("attended")').length > 0, 1, "User A is shown as 'attended'")
  //                   assert.equal(find('.availability-user :contains("'+userB.name+'")').length > 0, 1, "User B is shown")
  //                   assert.equal(find('.availability-user :contains("'+userB.name+'") :contains("dna")').length > 0, 1, "User B is shown as 'dna'")
  //
  //                   // Feedback tab should now be available
  //                   assert.equal(find(".show-availability-button:contains('feedback')").length > 0, 1, "Feedback tab available for completed session");
  //                 })
  //               })
  //             })
  //           })
  //         });
  //       });
  //     });
  //   });
  // });


});
