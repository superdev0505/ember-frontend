import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import signIn from 'oslr-ui/tests/helpers/sign-in';


module('Acceptance | alerts', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /app/main/alerts', async function(assert) {
    await visit('/app/main/alerts');

    assert.equal(currentURL(), '/auth/login', "Alerts not accessible when not logged in");

    await signIn(assert, 'test1@oslr.co.uk', 'testing123');

    await visit("/app/main/alerts");
    assert.equal(currentURL(), "/app/main/alerts", "Alerts route visited");
  });
});
