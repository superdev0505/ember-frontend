import { moduleForModel, test } from 'ember-qunit';

moduleForModel('feedback-request', 'Unit | Model | feedback request', {
  // Specify the other units that are required for this test.
  needs: ['model:user','model:availability', 'model:feedback']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
