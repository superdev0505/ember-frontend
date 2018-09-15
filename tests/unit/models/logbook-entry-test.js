import { moduleForModel, test } from 'ember-qunit';

moduleForModel('logbook-entry', 'Unit | Model | logbook entry', {
  // Specify the other units that are required for this test.
  needs: ['model:user','model:alertable','model:availability']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
