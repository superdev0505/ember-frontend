import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user', {async: true}),

  push_conversation_create: DS.attr('boolean'),
  push_availability_create: DS.attr('boolean'),
  push_availability_invite: DS.attr('boolean'),
  push_feedbackrequest_create: DS.attr('boolean'),
  push_feedback_create: DS.attr('boolean'),
  push_availability_sign_up: DS.attr('boolean'),
  push_availability_cancel: DS.attr('boolean'),
  push_availability_create_resource: DS.attr('boolean'),
  push_availability_update: DS.attr('boolean'),
  push_availability_destroy: DS.attr('boolean'),
  push_availabilityrequest_create: DS.attr('boolean'),
  push_availability_accept_invite: DS.attr('boolean'),
  push_availability_reject_invite: DS.attr('boolean'),

  email_conversation_create: DS.attr('boolean'),
  email_availability_create: DS.attr('boolean'),
  email_availability_invite: DS.attr('boolean'),
  email_feedbackrequest_create: DS.attr('boolean'),
  email_feedback_create: DS.attr('boolean'),
  email_availability_sign_up: DS.attr('boolean'),
  email_availability_cancel: DS.attr('boolean'),
  email_availability_create_resource: DS.attr('boolean'),
  email_availability_update: DS.attr('boolean'),
  email_availability_destroy: DS.attr('boolean'),
  email_availabilityrequest_create: DS.attr('boolean'),
  email_availability_accept_invite: DS.attr('boolean'),
  email_availability_reject_invite: DS.attr('boolean')
});
