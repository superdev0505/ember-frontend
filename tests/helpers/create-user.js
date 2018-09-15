import { visit, currentURL, fillIn, click } from '@ember/test-helpers';
import { currentSession, invalidateSession} from 'ember-simple-auth/test-support';
import { selectChoose } from 'ember-power-select/test-support/helpers';

export default async function createUser(assert, name, email, password, autoConfirm, autoCompleteProfile){

  assert.equal(1, 1, "createUser helper started")

  if(autoConfirm === undefined){
    autoConfirm = true;
  }
  if(autoCompleteProfile === undefined){
    autoCompleteProfile = true;
  }

  var id = Math.random().toString();

  if(!name){
    name = "Test User " + id;
  }

  if(!email){
  	email = "tester_"+id+"@oslr.co.uk";
  }

  if(!password){
    password = "testing123";
  }

  assert.equal(1, 1, "Creating user " + email.toString());

  // Ember.run(function() {
  await invalidateSession();

  await visit('/auth/registration');


  assert.equal(currentURL(), '/auth/registration', "Visiting registration page");

  // Check fields are shown
	assert.equal($(".registration-name").length, 1, "Has a name field");
	assert.equal($(".registration-identification").length, 1, "Has a email field");
	assert.equal($(".registration-password").length, 1, "Has a password field");
	assert.equal($(".registration-password-confirmation").length, 1, "Has a password confirmation field");

	assert.equal(currentSession().get('data.authenticated.user_email'), null, "No user logged in");

  // Fill in the registration fields with valid data
  fillIn(".registration-name", name);
  fillIn(".registration-identification", email);
  fillIn(".registration-password", password);
  fillIn(".registration-password-confirmation", password);

  await click(".registration-submit");

  assert.equal(currentSession().get('data.authenticated.user_email'), email, "New user logged in with email " + email);
  assert.equal(currentURL(), '/noaccess/unconfirmed');

  if(autoConfirm){
    // Auto-confirm the user (doesn't work in production!)
    assert.equal(currentURL(), "/noaccess/unconfirmed", "Redirected to confirmation page");

    assert.equal($(".confirmation-code-field").length, 1, "Found confirmation code field");
    assert.equal($(".submit-confirmation-code-button").length, 1, "Found confirmation code submit button");
    assert.equal($(".confirmation-resend-button").length, 1, "Found confirmation code resend button");
    assert.equal($(".confirmation-logout-button").length, 1, "Found confirmation logout");

    fillIn('.confirmation-code-field', "12345");

    await click(".submit-confirmation-code-button");

    await visit("/");

    // Redirect to profile setup page
    assert.equal(currentURL(),"/noaccess/profilesetup");

    // Complete job title and enter a location
    await selectChoose('.job-title-select', "FY1"); // Should be FY1
    await selectChoose('.location-select-multi', "University College London");
    // setSelect2(assert, '.job-title-select2', 'FY1');
    // setSelect2(assert, '.user-locations-select2', "University College London");

    // Should now go to teaching page
    await click(".profile-setup-save-button");
    await visit("/");
    assert.equal(currentURL(), "/app/main/home/teach", "Visiting teaching page");

  }else{
    // If unconfirmed redirect there
    await visit("/");
    assert.equal(currentURL(), '/noaccess/unconfirmed');

  }


};
