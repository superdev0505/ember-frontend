/**
* We define several complex actions in the test-helpers file e.g. creating a new user or signing in
* This file tests for problems in the test helpers, which are used by lots of other acceptance tests
*
* @class acceptance-test-test-helpers
* @module AppCore
*/
import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { currentSession, invalidateSession} from 'ember-simple-auth/test-support';
import signIn from 'oslr-ui/tests/helpers/sign-in';
import createUser from 'oslr-ui/tests/helpers/create-user';
import createAvailability from 'oslr-ui/tests/helpers/create-availability';


module('Acceptance | testhelpers', function(hooks) {
  setupApplicationTest(hooks);

  test('test signIn', async function(assert) {
    await visit("/");
    var email = 'test1@oslr.co.uk';
    var password = 'testing123';

    await signIn(assert, email, password);
    invalidateSession();
  });

  // Test all the different sign in functions. The assertions are done in the helper methods.
  test('test signIn functions', async function(assert) {
    var test_emails = [
      'test1@oslr.co.uk',
      'test_incomplete_profile@oslr.co.uk',
      'test_unverified@oslr.co.uk',
      'test_unconfirmed@oslr.co.uk',
      'test_no_terms@oslr.co.uk'
    ];
    for(var i=0;i<test_emails.length;i++){
      await signIn(assert, test_emails[i]);
    }
    // signInProfileIncomplete(assert);
    // signInUnverified(assert);
    // signInUnconfirmed(assert);
    // signInNoterms(assert);
  });

  // Test user creation
  test('test create user', async function(assert) {
    await createUser(assert);

    // Try with defined inputs
    var id = Math.random().toString();
    var name = "Test User " + id;
    var email = "tester_"+id+"@oslr.co.uk";
    var password = "testing123";

    await createUser(assert, name, email);
  });

  // Test Availability creation
  test('test create availability', async function(assert){
    await signIn(assert, 'test1@oslr.co.uk');
    await createAvailability(assert);

    // TODO: Test completed version
    // await createAvailability(assert, {complete: true});
  });

});
