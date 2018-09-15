import { module, test } from 'qunit';
import { visit, click, fillIn, currentURL, currentRouteName } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { currentSession, invalidateSession} from 'ember-simple-auth/test-support';
import signIn from 'oslr-ui/tests/helpers/sign-in';
import createUser  from 'oslr-ui/tests/helpers/create-user';
import createAvailability  from 'oslr-ui/tests/helpers/create-availability';

module('Acceptance | feedback', function(hooks) {
  setupApplicationTest(hooks);

  test('Request Feedback', async function(assert) {
    // Setup users to invite
    var idA = Math.random().toString();
    var userA = {
      email: "tester_"+idA+"@oslr.co.uk",
      name: "Test User " + idA,
      password: "testing123"
    };
    await createUser(assert, userA.name, userA.email, userA.password);
    var idB = Math.random().toString();
    var userB = {
      email: "tester_"+idB+"@oslr.co.uk",
      name: "Test User " + idB,
      password: "testing123"
    };
    await createUser(assert, userB.name, userB.email, userB.password);
    var idC = Math.random().toString();
    var userC = {
      email: "tester_"+idC+"@oslr.co.uk",
      name: "Test User " + idC,
      password: "testing123"
    };
    await createUser(assert, userC.name, userC.email, userC.password);

    // Sign in and create an availability
    await signIn(assert, 'test1@oslr.co.uk');
    var id = Math.random().toString();
    var info = 'My Test ' + id;
    var loc = "Margate Hospital";

    await createAvailability(assert, {info: info, location: loc, complete: true, users: [userA, userB], usersdna: [userC]});

    // We can now click the 'feedback' tab
    assert.equal(currentRouteName(), "app.main.availabilities/show.index", "Correctly showing availability index route");
    assert.equal($(".show-availability-button:contains('feedback')").length > 0, 1, "Feedback tab available for completed session");
    await click($(".show-availability-button:contains('feedback')")[0]);
    assert.equal(currentRouteName(), "app.main.availabilities/show.feedback");
    assert.equal($(".feedback").length, 0, "No feedback initially");
    assert.equal($(".feedback-request").length, 0, "No oustanding feedback requests initially");
    assert.equal($(".attended-user").length, 2, "2 attended users from whom feedback can be requested");

    // Request feedback from User B
    assert.equal($(".attended-user:contains('"+userB.name+"')").length, 1, "User B feedback request button found");
    // assert.equal($(".btn:contains('Send Request')").length, 0, "No Send Request button before clicking a request button")
    await click($(".attended-user:contains('"+userB.name+"')")[0]);
    assert.equal($(".btn:contains('Send Request')").length, 1, "Send Request button after clicking a request button");
    await fillIn('.feedback-request-message-field', "Test message");
    await click($(".btn:contains('Send Request')")[0]);
    assert.equal($(".feedback").length, 0, "No feedback after sending request");
    assert.equal($(".feedback-request").length, 1, "1 oustanding feedback requests after sending request");
    assert.equal($(".attended-user").length, 1, "1 attended users from whom feedback can be requested after sending request");

    // Try the Request From All button
    await click(".all-feedback-button");
    // TODO: test this. Just confirms no errors.

    // Now log in as User B and reply to the request
    await invalidateSession();
    await signIn(assert, userB.email);
    await visit('app/main/alerts');
    assert.equal(currentRouteName(), 'app.main.alerts.index', "Redirected to alerts page successfully");

    // TODO: Below tests fail because request is delivered using Sidekiq
    // Need to set up inline test server and re-test
    //
    // assert.equal($('.alert :contains("Test requested feedback")').length > 0, 1, "Alert found for feedback request for User B "+userB.email);
    // // TODO: need to test feedback completion (awaiting StackOverflow)
    // await click($('.alert :contains("Test requested feedback")')[0]);
    // assert.equal(currentRouteName(), 'feedback-requests.show', "Redirected to show feedback request page successfully");
    // // Check correct fields are shown
    // fieldnames = [
    //   "The teaching was enjoyable",
    //   "The teaching was relevant to my studies",
    //   "I learned something new",
    //   "I would recommend this session to a colleague",
    //   "What was done well",
    //   "Areas to improve",
    //   "Any other comments"
    // ];
    // var index = 0;
    // fieldnames.forEach(function(fieldName){
    //   assert.equal($(':contains("'+fieldName+'")').length > 0, 1, "Found field " + fieldName);
    //   // Fields 0-3 should have likert fields, the others text
    //   if(index < 4){
    //     for(var i = 1; i < 6; i++){
    //       assert.equal($(".feedback-request-likert-option.question-" + index.toString() + ".option-" + i.toString()).length, 1, "Likert option " + i.toString() + " found for question " + index.toString());
    //     }
    //     // Check no text field
    //     assert.equal($("textarea.response-text." + index.toString()).length, 0, "No text field for likert question " + index.toString());
    //   }else{
    //     // Check text field shown
    //     assert.equal($("textarea.response-text." + index.toString()).length, 1, "Found text field for question " + index.toString());
    //     // Check no likerts
    //     assert.equal($(".feedback-request-likert-option.question-" + index.toString()).length, 0, "No likert options found for text question " + index.toString());
    //   }
    //   index = index + 1;
    // });
    // assert.equal($(".submit-feedback-request-button").length, 1, "Submit feedback request button found");
    //
    // // Try to submit without filling anything in
    // await click(".submit-feedback-request-button");
    // // Should be on the same page - submit button still shown
    // assert.equal(currentRouteName(), 'feedback-requests.show', "Remains on show feedback request page when submitting empty request");
    // assert.equal($(".submit-feedback-request-button").length, 1, "Submit feedback request button found");
    //
    // // Fill in SOME feedback and submit
    // await click(".feedback-request-likert-option.question-0.option-4");
    // await fillIn("textarea.response-text.5", "Test feedback message");
    //
    // await click(".submit-feedback-request-button");
    // assert.equal(currentRouteName(), 'feedback-requests.show', "Remains on show feedback request page when submitting non-empty request");
    // assert.equal($(".submit-feedback-request-button").length, 0, "NO submit feedback request button found after submitting");
    // assert.equal($(".btn:contains('Back')").length, 1, "Back button found after submitting");
    //
    // // Check correct values shown
    // assert.equal($(".feedback-show-response:contains('The teaching was enjoyable')").length, 1, "Found likert text");
    // assert.equal($(".feedback-show-response:contains('4 / 5')").length, 1, "Found likert value");
    // // TODO: fix below!
    // // assert.equal($(".feedback-show-response:contains('Areas to improve')").length, 1, "Found text field text")
    // // assert.equal($(".feedback-show-response:contains('Test feedback message')").length, 1, "Found text field value")
    //
    // // Log in as the receiving user
    // await signIn(assert, 'test1@oslr.co.uk');
    // await visit("/app/main/alerts");
    // assert.equal(currentURL(), "/app/main/alerts", "Teaching user shown alerts page");
    // assert.equal($(".alert:contains('Feedback received from "+userB.name+"')").length, 1, "Alert received about feedback from user B");
  });

});
