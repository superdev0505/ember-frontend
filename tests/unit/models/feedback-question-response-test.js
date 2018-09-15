import { moduleForModel, test } from 'ember-qunit';

moduleForModel('feedback-question-response', 'Unit | Model | feedback question response', {
  // Specify the other units that are required for this test.
  needs: ['model:feedback','model:feedback-question']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
