(function () {

  angular
    .module('app')
    .controller('s3Controller', ['S3Service', s3Controller]);

  function s3Controller(S3Service) {

    let ctrl = this;

    ctrl.buttonText = "Upload Photo"

    ctrl.submitPhoto = (photo) => {
      S3Service.uploadPhoto(photo)
        .then((res) => {
          ctrl.inputText = ctrl.successText;
          ctrl.s3Url = res;
          document.getElementById('photo-upload').blur();
        })
        .catch((err) => {
          console.log(err)
        })
    };

    ctrl.resizer = (photo, extension, maxWidth, maxHeight) => {

      let photoToResize = photo

      let img = new Image();
      let reader = new FileReader();
      reader.onload = (onLoadEvent) => {

        img.src = onLoadEvent.target.result

        let MAX_WIDTH = maxWidth
          , MAX_HEIGHT = maxHeight
          , width = img.width
          , height = img.height

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        let canvas = document.createElement('canvas');
        canvas.style.visibility = 'hidden';
        document.body.appendChild(canvas);

        canvas.width = width;
        canvas.height = height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        let resizedPhotoBody =
          canvas.toDataURL(`image/${extension}`);

        let newImage = {
          imageBody: resizedPhotoBody,
          imageExtension: extension
        }
        ctrl.submitPhoto(newImage)
      }
      reader.readAsDataURL(photoToResize)
    }

  };

})();