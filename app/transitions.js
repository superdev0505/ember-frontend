export default function(){
  this.transition(
    this.fromRoute('app.main.availabilities/show.index'),
    this.toRoute('app.main.availabilities/show.edit'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.fromRoute('app.main.availabilities/show.index'),
    this.toRoute('app.main.availabilities/show.users'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.fromRoute('app.main.availabilities/show.index'),
    this.toRoute('app.main.availabilities/show.resources'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.fromRoute('app.main.availabilities/show.index'),
    this.toRoute('app.main.availabilities/show.feedback'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.fromRoute('app.main.availabilities/show.index'),
    this.toRoute('app.main.availabilities/show.messages'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('app.main.availabilities/show.edit'),
    this.toRoute('app.main.availabilities/show.users'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.fromRoute('app.main.availabilities/show.edit'),
    this.toRoute('app.main.availabilities/show.resources'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.fromRoute('app.main.availabilities/show.edit'),
    this.toRoute('app.main.availabilities/show.feedback'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.fromRoute('app.main.availabilities/show.edit'),
    this.toRoute('app.main.availabilities/show.messages'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('app.main.availabilities/show.users'),
    this.toRoute('app.main.availabilities/show.resources'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.fromRoute('app.main.availabilities/show.users'),
    this.toRoute('app.main.availabilities/show.feedback'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.fromRoute('app.main.availabilities/show.users'),
    this.toRoute('app.main.availabilities/show.messages'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('app.main.availabilities/show.resources'),
    this.toRoute('app.main.availabilities/show.feedback'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.fromRoute('app.main.availabilities/show.resources'),
    this.toRoute('app.main.availabilities/show.messages'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('app.main.availabilities/show.feedback'),
    this.toRoute('app.main.availabilities/show.messages'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  // END OF AVAILABILITY/SHOW PAGE


  // this.transition(
  //   this.fromRoute('app.main.availabilities.index'),
  //   this.toRoute('app.main.availabilities/new'),
  //   this.use('toLeft'),
  //   this.reverse('toRight')
  // );


  // New Availability Wizard
  this.transition(
    this.fromRoute('app.main.availabilities.new.when'),
    this.toRoute('app.main.availabilities.new.who'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.fromRoute('app.main.availabilities.new.when'),
    this.toRoute('app.main.availabilities.new.what'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.fromRoute('app.main.availabilities.new.when'),
    this.toRoute('app.main.availabilities.new.preview'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.fromRoute('app.main.availabilities.new.who'),
    this.toRoute('app.main.availabilities.new.what'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.fromRoute('app.main.availabilities.new.who'),
    this.toRoute('app.main.availabilities.new.preview'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.fromRoute('app.main.availabilities.new.what'),
    this.toRoute('app.main.availabilities.new.preview'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
};
