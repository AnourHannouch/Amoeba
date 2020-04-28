// debug
// watermark



//snapshot function with options
function snap() {
  gifshot.takeSnapShot({
    'numFrames': 30,
    'gifWidth': 300,
    'gifHeight': 300
  }, function(obj) {
    if(!obj.error) {
        var image = obj.image,
        animatedImage = document.createElement('img');
        animatedImage.src = image;

        var table = document.getElementById("pTable");
        var row = table.insertRow(0);
        row.appendChild(animatedImage);
    }
  });
};

//Gifshot function with options
function createGIF() {
  gifshot.createGIF({
    'numFrames': 30,
    'gifWidth': 300,
    'gifHeight': 300,

    //Progresscallback
      progressCallback: function (captureProgress) {
        document.querySelector("progress").classList.remove('hidden');
        document.querySelector("progress").value = captureProgress;
      }  
  }, function(obj) {
    if (!obj.error) {
        var image = obj.image,
        animatedImage = document.createElement('img');
        animatedImage.src = image;
        var table = document.getElementById("pTable");
        var row = table.insertRow(0);
        row.appendChild(animatedImage);
    }
    document.querySelector("progress").classList.add('hidden');
    document.querySelector("progress").value = 0;
  });
};





