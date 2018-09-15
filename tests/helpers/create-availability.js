import { visit, currentURL, currentRouteName, fillIn, click } from '@ember/test-helpers';
import { currentSession, invalidateSession} from 'ember-simple-auth/test-support';
import { selectChoose } from 'ember-power-select/test-support/helpers';
// import { inviteToAvailability } from 'oslr-ui/tests/helpers/invite-to-availability';

// export default registerAsyncHelper('signIn', function(application, assert, email, password) {
export default async function createAvailability(assert, opts){

  assert.equal(1, 1, "createAvailability helper started")

  var id = Math.random().toString();

  var defaultOpts = {
    mode: 'adhoc',
    info: "Availability testing " + id,
    location: "University College London",
    locationInfo: null,
    isPrivate: false,
    maxStudents: 6,
    complete: false,
    users: [],
    usersdna: [],
    requestFeedback: false
  };
  opts = Ember.$.extend(defaultOpts, opts);

  await visit('/app/main/availabilities/new/quick');

  await selectChoose('.location-select', opts.location);
  fillIn('.availability-info-field', opts.info);

  // TODO: More options

  await click(".post-quick-session-button");

  assert.equal(currentRouteName(), "app.main.availabilities/show.index", "Visited show availability page " + currentURL());
  assert.equal($(":contains('"+opts.info+"')").length > 0, 1, "Found correct info field on show page");

  // Get the availability ID here from the URL
  var aId = currentURL().match(/\d+/)[0];
  assert.equal(1,1, "Availability ID:"+  aId.toString())

  for(var i=0;i<opts.users.length;i++){
    var user = opts.users[i];
    await inviteToAvailability(assert, aId, user.name);
  }
  for(var i=0;i<opts.usersdna.length;i++){
    var user = opts.usersdna[i];
    await inviteToAvailability(assert, aId, user.name);
  }

  // If selected, mark as completed
  if(opts.complete){
    // Check feedback isn't available yet
    assert.equal(find(".show-availability-button:contains('feedback')").length > 0, 0, "Feedback tab NOT available for non-completed session");
    // Mark it as Complete
    await click($(".show-availability-button:contains('info')")[0]);

    assert.equal(currentRouteName(), "app.main.availabilities/show.index");
    assert.equal($('.complete-session-button').length > 0, 1, "Complete session button found");
    await click('.complete-session-button');

    assert.equal(currentRouteName(), "app.main.availabilities/completed", 'Redirected to Completed page on completion');

    assert.equal($('.completed-notes-field').length > 0, 1, "Completed notes input found");
    assert.equal($('.completed-user :contains("'+currentSession().get('currentUser.name')+'")').length > 0, 1, "Completed user for creating user found ("+currentSession().get('currentUser.name')+")");

    for(var i=0;i<opts.users.length;i++){
      var user = opts.users[i];
      assert.equal($('.completed-user :contains("'+user.name+'")').length > 0, 1, "Completed user for "+user.name+" found");
    }
    for(var i=0;i<opts.usersdna.length;i++){
      var user = opts.usersdna[i];
      assert.equal($('.completed-user :contains("'+user.name+'")').length > 0, 1, "Completed user for "+user.name+" found");
    }

    // Set the creating user and user A as attended, user B as DNA
    assert.equal($('.completed-user-name:contains("'+currentSession().get('currentUser.name')+'")+td .markAttendedButton').length, 1, "Found mark attended button for logged in user")
    await click($('.completed-user-name:contains("'+currentSession().get('currentUser.name')+'")+td .markAttendedButton')[0]);

    // Mark everything as completed
    await click('.mark-complete-button');

    // Don't allow if an answer isn't given for all users
    assert.equal(currentRouteName(), "app.main.availabilities/completed");

    for(var i=0;i<opts.users.length;i++){
      var user = opts.users[i];
      assert.equal($('.completed-user-name:contains("'+user.name+'")+td .markAttendedButton').length, 1, "Found mark attended button for user " + user.name)
      await click($('.completed-user-name:contains("'+user.name+'")+td .markAttendedButton')[0]);
      if(!opts.requestFeedback){
        // Feedback is requested by default - prevent this
        assert.equal($('.completed-user-name:contains("'+user.name+'")+td+td+td .markFeedbackButton').length, 1, "Found mark feedback button for user " + user.name)
        await click($('.completed-user-name:contains("'+user.name+'")+td+td+td .markFeedbackButton')[0]);
      }
    }
    for(var i=0;i<opts.usersdna.length;i++){
      var user = opts.usersdna[i];
      assert.equal($('.completed-user-name:contains("'+user.name+'")+td+td .markDnaButton').length, 1, "Found mark DNA button for user " + user.name)
      await click($('.completed-user-name:contains("'+user.name+'")+td+td .markDnaButton')[0]);
    }

    await click('.mark-complete-button');

    assert.equal(currentRouteName(), "app.main.availabilities/show.index", "Mark Complete redirects to show/index");
    await click($(".show-availability-button:contains('people')")[0]);

    assert.equal($('.availability-user :contains("'+currentSession().get('currentUser.name')+'")').length > 0, 1, "Creating user is shown");
    assert.equal($('.availability-user :contains("'+currentSession().get('currentUser.name')+'") :contains("attended")').length > 0, 1, "Creating user is shown as 'attended'");

    for(var i=0;i<opts.users.length;i++){
      var user = opts.users[i];
      assert.equal($('.availability-user :contains("'+user.name+'")').length > 0, 1, user.name + " is shown");
      assert.equal($('.availability-user :contains("'+user.name+'") :contains("attended")').length > 0, 1, user.name + " is shown as 'attended'");
    }
    for(var i=0;i<opts.usersdna.length;i++){
      var user = opts.usersdna[i];
      assert.equal($('.availability-user :contains("'+user.name+'")').length > 0, 1, user.name + " is shown");
      assert.equal($('.availability-user :contains("'+user.name+'") :contains("dna")').length > 0, 1, user.name + " is shown as 'dna'");
    }


    // Feedback tab should now be available
    assert.equal($(".show-availability-button:contains('feedback')").length > 0, 1, "Feedback tab available for completed session");

  }

  // Finish the test on the availability index page
  await visit('/app/main/availabilities/' + aId + "/index");

}


export async function inviteToAvailability(assert, availabilityId, userName){

  assert.equal(1, 1, "inviteToAvailability helper started")

  var name = userName;
  await visit('/app/main/availabilities/' + availabilityId + '/users');

  assert.equal(currentRouteName(), "app.main.availabilities/show.users.index", "Availabilities/show/Users route shown correctly");
  await click($('.open-add-users-popup')[0]);
  await fillIn('.add-user-search-input', name);

  assert.equal($('.add-user-search-results :contains("'+name+'")').length > 0, 1, name + " is in the options to invite");
  await click($('.add-user-search-result:contains("'+name+'") button')[0]);

  assert.equal($('.added-users :contains("'+name+'")').length > 0, 1, name + " is in the users to add");
  await click('.do-add-users-button');
  assert.equal($('.availability-user:contains("'+name+'")').length > 0, 1, "Invited user is shown");


}
