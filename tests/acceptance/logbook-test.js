import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import signIn from 'oslr-ui/tests/helpers/sign-in';
import createUser from 'oslr-ui/tests/helpers/create-user';
import createAvailability from 'oslr-ui/tests/helpers/create-availability';


module('Acceptance | logbook', function(hooks) {
  setupApplicationTest(hooks);


  test('Logbook filter tests', async function(assert) {
    await visit('/app/main/feedbacks');

    assert.equal(currentURL(), '/auth/login');

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

    await signIn(assert, userA.email, userA.password);
    await visit("/app/main/feedbacks");
    assert.equal(currentURL(), "/app/main/feedbacks");
    assert.equal($(".header h3:contains('Feedback')").length, 1, "Title Feedback found");
    assert.equal($(".empty-logbook-text").length, 1, "No logbook entries intially");

    // Create an INCOMPLETE session, logbook should remain blank
    await createAvailability(assert, {users: [userB]});
    await visit("/app/main/logbook-entries/index");
    assert.equal(currentURL(), "/app/main/logbook-entries/index");
    assert.equal($(".empty-logbook-text").length, 1, "No logbook entries intially");

    // Create a teaching session, check it's added to the logbook ON COMPLETION
    await createAvailability(assert, {users: [userB], complete: true})
    await visit("/app/main/logbook-entries/index");
    assert.equal(currentURL(), "/app/main/logbook-entries/index");
    assert.equal($(".empty-logbook-text").length, 0, "Logbook entry shown when session completed");
  });
});
