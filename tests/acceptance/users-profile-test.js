/**
* Test profile and account editing
*
* @class acceptance-test:users-profile-test
* @module Users
*/
import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import signIn from 'oslr-ui/tests/helpers/sign-in';
import createUser from 'oslr-ui/tests/helpers/create-user';
import { currentSession, invalidateSession} from 'ember-simple-auth/test-support';
import { selectChoose } from 'ember-power-select/test-support/helpers';


module('Acceptance | profile', function(hooks) {
  setupApplicationTest(hooks);

  test('Update user profile', async function(assert) {
    // Create a new user
    var id = Math.random().toString();
    var testUser = {
      email: "tester_"+id+"@oslr.co.uk",
      name: "Test User " + id,
      password: "testing123"
    };

    // Make a new random email to add
    var newEmail = "tester_"+ Math.random().toString() +"@oslr.co.uk";

    await createUser(assert, testUser.name, testUser.email, testUser.password);

    // Go to the profile page
    await visit('/app/main/users/edit/' + currentSession().get('user_id'));

    assert.equal(currentURL(), '/app/main/users/edit/' + currentSession().get('user_id'), "Successfully showed edit profile page");

    // Update user name
    assert.equal($(".user-profile-name").length > 0, 1, "Has a name field");
    assert.equal($(".user-profile-name:contains('"+testUser.name+"')").length > 0, 1, "Displays user name correctly");
    assert.equal($(".toggle-edit-user-name-button").length > 0, 1, "Has a button to edit name");
    assert.equal($(".editUserNameField").length, 0, "Does not have a username input field");
    assert.equal($(".saveUserNameButton").length, 0, "Does not have a username save button");

    await click(".toggle-edit-user-name-button");
    assert.equal($(".editUserNameField").length > 0, 1, "Does have a username input field after toggling edit mode");
    //assert.equal($(".saveUserNameButton").length > 0, 1, "Does have a username save button after toggling edit mode");
    var newName = "Test User Name";
    await fillIn(".editUserNameField", newName);
    // click(".saveUserNameButton");
    // andThen(function(){
    // assert.equal($(".editUserNameField").length, 0, "Does not have a username input field");
    assert.equal($(".saveUserNameButton").length, 0, "Does not have a username save button");
    assert.equal($(".user-profile-name:contains('"+testUser.name+"')").length, 0, "Displays user name correctly");
    // assert.equal($(".user-profile-name:contains('"+newName+"')").length > 0, 1, "Displays user name correctly");


    // Change job title
    // Make sure the GMC field is only shown if they are a doctor
    // setSelect2('.job-title-select2', 'Medical Student - Final Year');
    await selectChoose('.job-title-select', 'Medical Student - Year 4');

    assert.equal($(".gmc-field").length, 0, "GMC field not shown to students");
    // setSelect2('.job-title-select2', 'FY1');
    await selectChoose('.job-title-select', 'FY1');
    assert.equal($(".gmc-field").length, 1, "GMC field shown to doctors");

    // Add and remove a hospital
    // Should be UCL by default
    assert.equal($(".list-specialty:contains('Margate Hospital')").length > 0, 0, "Not initially located in Margate");
    // setSelect2('.user-locations-select2', "Margate Hospital");
    await selectChoose('.location-select-multi', 'Margate Hospital');
    
    // Update bio and GMC number, and save
    await fillIn(".aboutYou", "About the test user");
    await fillIn(".gmc-field", "1234567");

    // Test picture uploading
    // Should have a default pic in place at first
    assert.equal($(".user-avatar-upload-pic").length > 0, 1, "A profile picture is present");
    assert.equal($(".user-avatar-upload-pic").attr('src'), "http://localhost:3000/uploads/user/avatar/"+currentSession().get('user_id')+"/tmp_avatar_"+currentSession().get('user_id')+".png", "A sample profile picture is shown");
    // TODO: Test uploading a new photo

    await click(".save-profile-button");
    // Redirected to teach page
    assert.equal(currentURL(), '/app/main/home/teach', "Redirected to Teach page on account save");
  });


  // Check emailAccounts
  // Should have one currently
  test('user-account-route-test', async function(assert) {
    // Create a new user
    var id = Math.random().toString();
    var testUser = {
      email: "tester_"+id+"@oslr.co.uk",
      name: "Test User " + id,
      password: "testing123"
    };
    // Make a new random email to add
    var newEmail = "tester_"+ Math.random().toString() +"@oslr.co.uk";

    await createUser(assert, testUser.name, testUser.email, testUser.password);

    // Go to the account page
    await visit('/app/main/users/account/' + currentSession().get('user_id'));

    assert.equal($(".email-account-list-name:contains('"+testUser.email+"')").length > 0, 1, "Email account shown correctly");
    assert.equal($(".email-account-options.hidden").length > 0, 1, "Email options hidden on load");

    // Click it to show options
    await click(".email-account-options-button");
    assert.equal($(".email-account-options.hidden").length > 0, 0, "Email options shown when toggled");

    // Show the new email account field
    assert.equal($(".addEmailForm.hidden").length > 0, 1, "Add email form is hidden");
    await click(".add-email-toggle");
    assert.equal($(".addEmailForm.hidden").length > 0, 0, "Add email form is shown");

    assert.equal($(".email-account-list-name:contains('"+newEmail+"')").length > 0, 0, "New test email not added");
    // Try clicking with invalid data
    await click(".addEmailButton");
    // TODO: this sends an alert. Need to test this somehow.

    await fillIn(".emailInput", newEmail);
    await click(".addEmailButton");
    // New email should be added
    assert.equal($(".email-account-list-name:contains('"+newEmail+"')").length > 1, 0, "New test email added");

    // Should have buttons for resend confirmation email and delete account
    assert.equal($(".resendConfirmation").length > 0, 1, "Resend confirmation button found");
    await click(".resendConfirmation");
    // TODO: Not sure how to check resending confirmation emails

    assert.equal($(".deleteEmailAccount").length > 0, 1, "Delete account button found");
    await click(".deleteEmailAccount");
    assert.equal($(".email-account-list-name:contains('"+newEmail+"')").length > 0, 0, "New test email deleted successfully");
  });

  // TODO:
  //  Add emailAccounts
  //  Confirm them
  //  Set primary accounts
  //  Change passwords
  //  Specialties

});
