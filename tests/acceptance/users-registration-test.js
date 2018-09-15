/**
* Test new user creation process
*
* @class acceptance-test:users-registration-test
* @module Users
*/
import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import signIn from 'oslr-ui/tests/helpers/sign-in';
import createUser from 'oslr-ui/tests/helpers/create-user';
import { currentSession, invalidateSession} from 'ember-simple-auth/test-support';


module('Acceptance | registration', function(hooks) {
  setupApplicationTest(hooks);


  /**
  * Test registration of a new user
  *
  * Try failed scenarios:
  * * No name
  * * No email
  * * Existing email
  * * Invalid email
  * * No password
  * * Short password
  * * Password that doesn't match
  * @method user-registration-form
  */
  test('User registration form', async function(assert) {
    await visit('/auth/registration');

    assert.equal(currentURL(), '/auth/registration');

    // Check fields are shown
    assert.equal($(".registration-name").length, 1, "Has a name field");
    assert.equal($(".registration-identification").length, 1, "Has a email field");
    assert.equal($(".registration-password").length, 1, "Has a password field");
    assert.equal($(".registration-password-confirmation").length, 1, "Has a password confirmation field");

    var id = Math.random().toString();
    var testUser = {
        email: "tester_"+id+"@oslr.co.uk",
        name: "Test User " + id,
        password: "testing123"
    };

    assert.equal(currentSession().get('user_email'), null, "No user logged in");

    // Try with no password
    await fillIn(".registration-name", testUser.name);
    await fillIn(".registration-identification", testUser.email);
    await click(".registration-submit");

    // Should not be allowed
    assert.equal(currentURL(), '/auth/registration');
    assert.equal(currentSession().get('user_email'), null, "No user logged in");

    // Try with no name
    await fillIn(".registration-name", "");
    await fillIn(".registration-identification", testUser.email);
    await fillIn(".registration-password", testUser.password);
    await fillIn(".registration-password-confirmation", testUser.password);
    await click(".registration-submit");

    // Should not be allowed
    assert.equal(currentURL(), '/auth/registration');
    assert.equal(currentSession().get('user_email'), null, "No user logged in");


    // Try with no email
    await fillIn(".registration-name", testUser.name);
    await fillIn(".registration-identification", "");
    await fillIn(".registration-password", testUser.password);
    await fillIn(".registration-password-confirmation", testUser.password);
    await click(".registration-submit");

    // Should not be allowed
    assert.equal(currentURL(), '/auth/registration');
    assert.equal(currentSession().get('user_email'), null, "No user logged in");


    // Try with an email that already exists
    await fillIn(".registration-name", testUser.name);
    await fillIn(".registration-identification", "test1@oslr.co.uk");
    await fillIn(".registration-password", testUser.password);
    await fillIn(".registration-password-confirmation", testUser.password);
    await click(".registration-submit");

    // Should not be allowed
    assert.equal(currentURL(), '/auth/registration');
    assert.equal(currentSession().get('user_email'), null, "No user logged in");


    // Try with an invalid email (make sure it's random)
    await fillIn(".registration-name", testUser.name);
    await fillIn(".registration-identification", "invalid email "+id);
    await fillIn(".registration-password", testUser.password);
    await fillIn(".registration-password-confirmation", testUser.password);
    await click(".registration-submit");

    // Should not be allowed
    assert.equal(currentURL(), '/auth/registration');
    assert.equal(currentSession().get('user_email'), null, "No user logged in");


    // Try with a password that's too short
    await fillIn(".registration-name", testUser.name);
    await fillIn(".registration-identification", testUser.email);
    await fillIn(".registration-password", "123");
    await fillIn(".registration-password-confirmation", "123");
    await click(".registration-submit");

    // Should not be allowed
    assert.equal(currentURL(), '/auth/registration');
    assert.equal(currentSession(this.application).get('user_email'), null, "No user logged in");


    // Try with a password that doesn't match the confirmation
    await fillIn(".registration-name", testUser.name);
    await fillIn(".registration-identification", testUser.email);
    await fillIn(".registration-password", testUser.password);
    await fillIn(".registration-password-confirmation", testUser.password + "4");
    await click(".registration-submit");

    // Should not be allowed
    assert.equal(currentURL(), '/auth/registration');
    assert.equal(currentSession(this.application).get('user_email'), null, "No user logged in");




    // Create a user successfully
    // Fill in the registration fields with valid data
    await fillIn(".registration-name", testUser.name);
    await fillIn(".registration-identification", testUser.email);
    await fillIn(".registration-password", testUser.password);
    await fillIn(".registration-password-confirmation", testUser.password);

    await click(".registration-submit");
    assert.equal(currentSession(this.application).get('user_email'), testUser.email, "New user logged in with email " + testUser.email);
    assert.equal(currentURL(), '/noaccess/unconfirmed');
  });


  /**
  * Tests the confirmation pathway after successful registration:
  *
  * * Requires confirmation code
  * * Test incorrect code
  * * Test correct code
  * * Ensure confirmed and redirected to profile setup screen
  *
  * @method after-registration-pathway
  */
  test('Confirmation Process', async function(assert) {
    await visit('/auth/registration');

    // Create an unconfirmed user
    var id = Math.random().toString();
    var testUser = {
      email: "tester_"+id+"@oslr.co.uk",
      name: "Test User " + id,
      password: "testing123"
    };
    await createUser(assert, testUser.name, testUser.email, testUser.password, false);


    assert.equal(currentURL(), "/noaccess/unconfirmed", "Redirected to confirmation page");

    assert.equal($(".confirmation-code-field").length, 1, "Found confirmation code field");
    assert.equal($(".submit-confirmation-code-button").length, 1, "Found confirmation code submit button");
    assert.equal($(".confirmation-resend-button").length, 1, "Found confirmation code resend button");
    assert.equal($(".confirmation-logout-button").length, 1, "Found confirmation logout");

    // Check resend code button doesn't crash or redirect
    await click('.confirmation-resend-button');
    // Just check no crash and no redirect
    assert.equal(currentURL(), "/noaccess/unconfirmed", "Remains on same page after resend button");

    // Check logout
    await click('.confirmation-logout-button');
    assert.equal(currentURL(), "/auth/login", "Confirmation logout button works");
    assert.equal(currentSession(this.application).get('data.authenticated.user_email'), null, "No user logged in");

    // Log back in and check directed to unconfirmed page
    await signIn(assert, testUser.email, testUser.password);
    assert.equal(currentSession(this.application).get('data.authenticated.user_email'), testUser.email, "Test user logged back in");
    assert.equal(currentURL(), "/noaccess/unconfirmed", "Directed to unconfirmed page on login");

    // Enter an incorrect code and check not redirected
    await fillIn('.confirmation-code-field', "23456");
    await click('.submit-confirmation-code-button');
    assert.equal(currentURL(), "/noaccess/unconfirmed", "Not redirected if wrong confirmation code entered");

    // Fill in the right code (should be 12345 for anyone created via a test client)
    await fillIn('.confirmation-code-field', "12345");
    await click('.submit-confirmation-code-button');
    assert.equal(currentURL(), "/noaccess/profilesetup", "Redirected correctly when correct code entered");
  });

});
