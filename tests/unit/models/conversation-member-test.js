import { moduleForModel, test } from 'ember-qunit';

moduleForModel('conversation-member', 'Unit | Model | conversation member', {
  // Specify the other units that are required for this test.
  needs: ['model:conversation', 'model:user']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
