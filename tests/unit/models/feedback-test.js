import { moduleForModel, test } from 'ember-qunit';

moduleForModel('feedback', 'Unit | Model | feedback', {
  // Specify the other units that are required for this test.
  needs: ['model:user','model:availability','model:feedback-question-response']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
