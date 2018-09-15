import { module, test } from 'qunit';
import { visit, currentURL, currentRouteName, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import signIn from 'oslr-ui/tests/helpers/sign-in';
import createUser from 'oslr-ui/tests/helpers/create-user';


module('Acceptance | messages', function(hooks) {
  setupApplicationTest(hooks);

  test('Send message from A to B', async function(assert) {
    await visit('/app/main/conversations');

    assert.equal(currentURL(), '/auth/login');

    // We will send messages between two created users
    var idA = Math.random().toString();
    var userA = {
      email: "tester_"+idA+"@oslr.co.uk",
      name: "Test User " + idA,
      password: "testing123"
    };
    var idB = Math.random().toString();
    var userB = {
      email: "tester_"+idB+"@oslr.co.uk",
      name: "Test User " + idB,
      password: "testing123"
    };

    await createUser(assert, userA.name, userA.email, userA.password);
    await createUser(assert, userB.name, userB.email, userB.password);
    await signIn(assert, userA.email, userA.password);

    await visit("/app/main/conversations");
    assert.equal(currentURL(), '/app/main/conversations');

    // There should be text saying you have no messages.
    assert.equal($(".no-messages-text").length > 0, 1, "Found 'You have no messages' text");

    // Create a new message
    assert.equal($(".newgroupBTN").length > 0, 1, "New Message button found");
    await click(".newgroupBTN");
    assert.equal(currentURL(), "/app/main/conversations/new");

    // Should display a "New Group button and a list of users including User B"
    assert.equal($(".new-group-button").length > 0, 1, "New group button found");
    assert.equal($(".new-group-user:contains('"+userB.name+"')").length, 1, "Button to message user B found");

    // Click on user B
    await click($(".new-group-user:contains('"+userB.name+"')")[0]);
    assert.equal(currentRouteName(), "app.main.conversations.show", "Displays conversations/show route")

    assert.equal($(".newMessageBody").length > 0, 1, "Found new message body field");
    assert.equal($(".sendMessageButton").length > 0, 1, "Found Send Message button");
    assert.equal($(":contains('Test Message')").length > 0, 0, "Message not shown before posting");
    await fillIn('.newMessageBody', "Test Message");
    await click('.sendMessageButton');

    assert.equal($(":contains('Test Message')").length > 0, 1, "Message shown after posting");

    // Make sure it's shown to User B
    await signIn(assert, userB.email, userB.password);
    await visit('/app/main/conversations');
    assert.equal(currentRouteName(), "app.main.conversations.index", "Conversations index shown for user B");
    // There should be a conversation with user A
    assert.equal($(".conversation-index-header:contains('"+userA.name+"')").length > 0, 1, "Conversation with User A found");

    // Open the conversation and show we have a test message received
    await click($(".conversation-index-header:contains('"+userA.name+"')")[0]);
    assert.equal(currentRouteName(), "app.main.conversations.show", "Conversation loaded for user B");
    assert.equal($(":contains('Test Message')").length > 0, 1, "Message shown to user B");
  });

  // TODO: Test websocket connections (stubbed out in test environment)

});
