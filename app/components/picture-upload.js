import Ember from 'ember';

export default Ember.Component.extend({

  chosenFile: null,
  url: "/users/upload_avatar",
  classNames: ["picture-upload"],

  uploadFile: Ember.observer('chosenFile', function(){
    var _this = this;
    Ember.$('.loadingSpinner').removeClass('hidden');


    var form = new FormData();
    var control = Ember.$('#' + this.elementId + " .file-upload-field")[0];
    form.append("file", control.files[0]);

    Ember.$.ajax({
      url: _this.get('apiUrl') + _this.get('url'),
      type: 'POST',
      contentType: false,
      processData: false,
      cache: false,

      data: form,

      beforeSend: function(xhr){
        _this.get('session').authorize('authorizer:devise', function(headerName, headerValue) {
          xhr.setRequestHeader(headerName, headerValue);
        });
      },

      success: function(response){
        // Refresh the image
        var d = new Date();
        // $("#" + _this.elementId + " .user-avatar-upload-pic").attr("src", _this.get('user.avatar_fullpath')+"?" + d.getTime());
        _this.get('user').reload();

        Ember.$('.loadingSpinner').addClass('hidden');
      },
      error: function(e){
        console.log(e);

        alert("Your picture could not be uploaded. Please try again.");
        Ember.$('.loadingSpinner').addClass('hidden');
      }


      // xhr: function() {
      //   var xhr = Ember.$.ajaxSettings.xhr();
      //   xhr.upload.onprogress = function(e) {
      //     self.didProgress(e);
      //   };
      //   self.one('isAborting', function() { xhr.abort(); });
      //   return xhr;
      // },
      // data: params,


    })

  }),

  actions: {

    // Simply click the hidden file input field
    // jQuery approach doesn't work properly -> use raw JS
    choosePhoto: function(){
      var elem = Ember.$('#' + this.elementId + " .file-upload-field")[0];
      if(elem && document.createEvent) {
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click", true, false);
        elem.dispatchEvent(evt);
      }
    },

    deleteAvatar: function() {
            var _this = this;
            if(confirm("Remove your profile picture?")){
                Ember.$.ajax({
                    url: _this.get('apiUrl') + "/users/delete_avatar",
                    type: 'post',
                    beforeSend: function(xhr){
                        _this.get('session').authorize('authorizer:devise', function(headerName, headerValue) {
                            xhr.setRequestHeader(headerName, headerValue);
                        });
                    },
                    success: function(response){
                        // Can pass function(data) here - not needed.
                        _this.get('session').get('currentUser').reload();
                    }
                });
            }
            return false;
        }

  }
});
