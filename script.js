// debug
// watermark
//more intervals and 1 sec longer???

//create element

function snap() {
  gifshot.takeSnapShot({
    'numFrames': 30,
    'gifWidth': 300,
    'gifHeight': 300,
  }, function(obj) {
    if(!obj.error) {
        var image = obj.image,
        animatedImage = document.createElement('img');
        animatedImage.src = image;
        //document.body.appendChild(animatedImage);

        var table = document.getElementById("pTable");
        var row = table.insertRow(0);
        row.appendChild(animatedImage);
    }
  });
};


function createGIF() {
  gifshot.createGIF({
    'numFrames': 30,
    'gifWidth': 300,
    'gifHeight': 300,
  }, function(obj) {
    if (!obj.error) {
        var image = obj.image,
        animatedImage = document.createElement('img');
        animatedImage.src = image;
        //document.body.appendChild(animatedImage);

        var table = document.getElementById("pTable");
        var row = table.insertRow(0);
        row.appendChild(animatedImage);
    }
  });
};




