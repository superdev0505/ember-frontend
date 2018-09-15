import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('auth', function(){
    this.route('registration');
    this.route('login');
  });

  this.route('app', function() {
    // Routes wrapped in the main header/footer blocks
    this.route('main', function(){
      this.route('home', function(){
        this.route('teach');
        this.route('learn');
        this.route('log');
        this.route('more');
      });

      this.route('about');
      this.route('help');

      this.route('conversations', function() {
        this.route('show', {path: 'show/:conversation_id'});
      });
      this.route('conversations/new');
      this.route('conversations/edit', {path: '/conversations/edit/:conversation_id'});
      // this.route('conversations/show', {path: '/conversations/:conversation_id'});
      this.route('conversations/newgroup');

      // this.route('users/show', {path: '/users/:user_id'});
      this.route('users', function(){

      });
      this.route('users/show', {path: '/users/show/:user_id'});
      this.route('users/edit', {path: '/users/edit/:user_id'});
      this.route('users/account', {path: '/users/account/:user_id'});

      this.route("alerts", function() {});
      this.route('availabilities', function() {
        // this.route('new');
        this.route('show', function() {
          this.route('edit');
          this.route('users');
          this.route('resources');
          this.route('feedback');
          this.route('messages');
        });
      });
      this.route('availabilities', function(){
        this.route('new', function(){
          this.route('quick'); // abreviated form
          // These routes form part of the wizard:
          this.route('when');
          this.route('who');
          this.route('what');
          this.route('preview');
          // Optionally this can be created from an availability_request_id
          // This route looks up the request, populates the model and redirects back to when
          this.route('from-request', {path: 'from-request/:availability_request_id'});
        });
      });
      this.route('availabilities/show', {path: '/availabilities/:availability_id'}, function(){
        this.route('index');
        this.route('edit');
        this.route('users', function() {
          this.route('profile');
          this.route('account');
        });
        this.route('resources');
        this.route('feedback');
        this.route('messages');
      });
      this.route('availabilities/proposed', {path: '/availabilities/proposed/:availability_id'});
      this.route('availabilities/confirmed', {path: '/availabilities/confirmed/:availability_id'});
      this.route('availabilities/completed', {path: '/availabilities/completed/:availability_id'});

      this.route('availability-requests', function(){
        this.route('new');
        this.route('show', {path: 'show/:availability_request_id'});
        this.route('index');
      });

      this.route("feedbacks", function(){
        // this.route('index');
        this.route('show', {path: "show/:feedback_id"});
      });

      this.route('logbook-entries', function() {
        this.route('index');
      });

      this.route('help');
      this.route('about');

      this.route('notification-preferences');
    });



  });

  this.route('noaccess', function() {
    this.route('unconfirmed');
    this.route('noterms');
    this.route('profilesetup');
    this.route('walkthrough');
  });

  // Route for responding to a feedback request - doesn't need to be logged in, token-based
  // this.route('feedback-requests/show', {path: '/feedback_requests/show/:token'})

  this.route('feedback-requests', function() {
    this.route('show', {path: '/show/:token'});
  });
});

export default Router;
