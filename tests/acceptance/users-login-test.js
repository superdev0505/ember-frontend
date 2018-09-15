/**
* Test key authentication functions:
* * Login route
* * Redirects after login
* *
*
* @class acceptance-test:users-login-test
* @module Users
*/
import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import signIn from 'oslr-ui/tests/helpers/sign-in';


module('Acceptance | login', function(hooks) {
  setupApplicationTest(hooks);


  /**
  * Tests the login form. Runs different combinations of bad emails/passwords then logs in successfully.
  *
  * @method login-form-test
  */
  test('Login-form-test', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/auth/login', "Redirected to login page when not logged in");
    assert.equal($(".identification-field").length > 0, true, "Found login field");

    // Try a bad email + bad password
    var email = "not an email";
    var password = "sdfsg4wvvfsdg";
    await fillIn(".identification-field", email);
    await fillIn(".password-field", password);
    await click(".btn.login-submit");
    // Should stay on the login page
    assert.equal(currentURL(), '/auth/login', "Stays on login page with bad login info");

    // Try a good email + bad password
    email = "test1@oslr.co.uk";

    await fillIn(".identification-field", email);
    await fillIn(".password-field", password);
    await click(".btn.login-submit");
    // Should stay on the login page
    assert.equal(currentURL(), '/auth/login'), "Stays on login page with right login, wrong password";

    await signIn(assert, 'test1@oslr.co.uk');

  });


  /**
  * Test people are redirected to the right place on login:
  * * Unconfirmed -> confirmation page
  * * Hasn't accepted T&Cs -> redirect to T&C page
  * * Incomplete profile -> profile page
  *
  * @method login-redirects-test
  */
  test('login-redirects-test', async function(assert) {
    await visit('/');
    assert.equal(currentURL(), '/auth/login');
    assert.equal($(".identification-field").length > 0, true, "Found login field");

    // Log in an unconfirmed user
    // -> redirect to confirmation page
    await signIn(assert, 'test_unconfirmed@oslr.co.uk');
    await visit("/");
    assert.equal(currentURL(), '/noaccess/unconfirmed');

    // Log in someone who hasn't accepted T&Cs
    // -> redirect to T&C page
    await signIn(assert, 'test_no_terms@oslr.co.uk');
    await visit("/");
    assert.equal(currentURL(), '/noaccess/noterms');

    // Log in someone with an incomplete profile
    // -> redirect to edit profile page
    await signIn(assert, 'test_incomplete_profile@oslr.co.uk');
    await visit("/");
    // Make sure there is a warning about completing your account
    // assert.equal($(".profile-incomplete-message").length > 0, 1, "Profile incomplete message present on profile page");
    assert.equal(currentURL(), '/noaccess/profilesetup');
  });


  /**
  * Test the forgotten password link.
  *
  * We can't easily check emails are sent here, but we can check for obvious errors.
  *
  * @method login-forgotten-password-test
  */
  test('login-forgotten-password-test', async function(assert) {
    await visit('/');
    assert.equal(currentURL(), '/auth/login');

    assert.equal($(".forgot-email-field").length, 0, "Forgotten password email field not shown initially");
    assert.equal($(".login-reset-password").length, 0, "Forgotten password submit button field not shown initially");

    // Check for forgotten password button
    assert.equal($(".login-forgot-button").length, 1, "Forgotten password button is displayed");

    // Click and check forgotten password field is shown
    await click(".login-forgot-button");
    assert.equal($(".forgot-email-field").length, 1, "Forgotten password email field shown after button clicked");
    assert.equal($(".login-reset-password").length, 1, "Forgotten password submit button field shown after button clicked");
    assert.equal($(".login-reset-password:disabled").length, 0, "Forgotten password submit button enabled initially");

    // Fill in with nonsense, expect an alert (we are just testing for absence of error here)
    await fillIn('.forgot-email-field', 'nonsense text not an email');
    await click('.login-reset-password');

    // TODO: Check some response?
    assert.equal(currentURL(), '/auth/login');
  });


  /**
  * This tests routing for logged in users:
  * * Users not logged in should always be redirected from /main/* and /noaccess/* to /auth/login
  * * If logged in, users should be redirected from /auth/* to /main/ or /noaccess/ (this is tested in login-redirects-test)
  *
  * @method redirect-if-not-logged-in-test
  */
  test('Redirect to /auth/login if not logged in', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/auth/login');

    var privateUrls = [
      "/app", "/app/main", "/app/main/users", "app/main/users/show/1",
      "app/main/home/teach", "app/main/home/learn",
      "/app/main/availabilities",
      "/app/main/conversations"
    ];
    for(var i=0; i<privateUrls.length; i++){
      await visit(privateUrls[i]);
      assert.equal(currentURL(), "/auth/login");
    }
  });

});
