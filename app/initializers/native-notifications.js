export function initialize( application ) {

    // Injects all Ember components with a router object:
  // application.inject('component', 'router', 'router:main');


    // On mobile, use native dialog for alerts
    document.addEventListener('deviceready', function () {

        if (navigator.notification) { // Override default HTML alert with native dialog
            window.alert = function (message) {
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "Oslr", // title
                    'OK'        // buttonName
                );
            };
        }

    // Replace window.open() with inappbrowser plugin
    window.open = function(url, target, options){cordova.InAppBrowser.open(url, target, options);}


    // Override Android back button functionality so that it closes a modal, if open, otherwise goes back a page
    document.addEventListener("backbutton", function(e){
      if(Ember.$('body.modal-open').length > 0){
        Ember.$('#myModal').modal('hide');
      }else{
        navigator.app.backHistory()
      }
    }, false);


    }, false);


    // In testing, don't raise alerts as they make Testem runners hang
    // Output to console instead
    // Also assume all 'confirm' buttons are clicked as 'yes'
    if(application.environment === "test"){
        window.alert = function (message) {
            console.log(message)
        };
        window.confirm = function (message) {
            return true;
        }
    }


    var WidthCheck = function(){
        if ($(window).width() <= 666){
            $('body').addClass('mobile');
            $('body').removeClass('landscape');
            $('body').removeClass('tablet');
        }

        else if ($(window).width() <= 768){
            $('body').addClass('mobile');
            $('body').addClass('landscape');
            $('body').removeClass('tablet');
        }

        else if ($(window).width() <= 1024){
            $('body').addClass('tablet');
            $('body').removeClass('mobile');
            $('body').removeClass('landscape');
        }
        else {
            $('body').removeClass('mobile');
            $('body').removeClass('landscape');
            $('body').removeClass('tablet');
        }
    }

    WidthCheck();

    $(window).resize(function() {
        WidthCheck();
    })


  // Utility function to truncate a string
  window.truncate = function(str, len){
    if(!len){len = 15;}
    str = Ember.$.trim(str);
    if(str.length > len){
      return str.substring(0,len) + "...";
    }else{
      return str;
    }
  }
}

export default {
  name: 'native-notifications',
  initialize: initialize
};


// Ember.LinkView.reopen({
//   attributeBindings: ['data-toggle', 'data-target']
// });
