var i = 0;
var path = new Array();
var layers = Array();
var imgs = [];

// LIST OF IMAGES
path[0] = "img_1.jpg";
path[1] = "img_2.jpg";
function changeIndex(direction){
    i += direction;
    if(i>path.length -1){
        i = 0
    }
    else if(i < 0){
        i = path.length -1;
    }
}
function swapImage(direction)
{
    // alert(direction);
    hideQuestInfo();
    var dragon = document.getElementById("dragon");
    changeIndex(direction);
    dragon.src = 'images/' + path[i];
}

function toggleQuestInfo(){
    var quest = document.getElementById("quest");
    if(quest.style.visibility == 'visible')
        quest.style.visibility = 'hidden';
    else if(quest.style.visibility == 'hidden'){
        quest.style.visibility = 'visible';
    }
}

function showQuestInfo(){
    var quest = document.getElementById("quest");
    quest.style.visibility = 'visible';
}

function hideQuestInfo(){
    var quest = document.getElementById("quest");
    quest.style.visibility = 'hidden';
}

function clearCanvas(canvas){
    var context = canvas.getContext('2d');
    context.clearRect ( 0 , 0 , canvas.width, canvas.height );
}

function clearLayer(layer){
    var  canvas = layers[layer][0];
    clearCanvas(canvas);
}

function checkProgress(mastery){
    $(function(){
        $.getJSON( "/game_data", function( data ) {
            imgs = [];
            console.log(data["mastery"]);

            $.each(data["mastery"], function(key, val){
                if(mastery == key)
                    var path = "/static/images/" + key + "_" + (val["level"] + 1) + ".jpg";
                else
                    var path = "/static/images/" + key + "_" + val["level"] + ".jpg";
                imgs.push(path)
            });
            clearLayer('layer1');
            addImage('layer1', imgs[0], 0, 0, 300, 500);
            console.log(imgs);
        });
    });
}

function addLayer(id, zindex){
    $(function(){
        var canvasStr = "<canvas id=\"" +id +"\" " +
            "width=\"300px\" height=\"300px\" " +
            "style=\"z-index:" + zindex + "; position:absolute; left:0px; top:0px;\" " +
            "></canvas>";
        $("#main").append(canvasStr);
        layers[id] = $("#" + id);
    });
}

function addImage(layer, imagePath, x, y, h, w){
    $(function(){
        x= typeof x !== 'undefined' ? x : 0;
        y = typeof y !== 'undefined' ? y : 0;
        h = typeof h !== 'undefined' ? h : 200;
        w = typeof w !== 'undefined' ? w : 200;
        var layerObj = layers[layer][0];
        var contextObj = layerObj.getContext('2d');
        var $img = $('<img>', { src: imagePath });
        $img.load(function() {
            contextObj.drawImage(this, x, y, h, w);
        });
    });
}

var timeout;
function gozuAcik(clear){
   clear= typeof clear !== 'undefined' ? clear : false;
  if(clear)
    clearLayer('layer2');
  addImage('layer2', '/static/images/gozu_acik.png',100, 200, 100, 100);
    //clearInterval(interval);
    timeout = setTimeout(function () {gozuKapali(true);}, 3000);
}

function gozuKapali(clear){
    clear= typeof clear !== 'undefined' ? clear : false;
    if(clear)
        clearLayer('layer2');
    addImage('layer2', '/static/images/gozu_kapali.png',100, 200, 100, 100);
    //clearInterval(interval);
    timeout = setTimeout(function () {gozuAcik(true);}, 100);
}

$(function(){

    addLayer('layer1', 1);
    addLayer('layer2', 2);
    addLayer('layer3', 3);

    gozuAcik();

    $("#quest").hide();
    $( "#toggleit" ).click(function() {
        $( "#quest" ).toggle( "slow", function() {
            // Animation complete.
        });
    });
    $( "#next_img" ).click(function() {
        // swapImage(1);
        //hideQuestInfo();
        changeIndex(1);
        var  canvas = layers['layer1'][0];
        clearCanvas(canvas);
        addImage('layer1', imgs[i], 0, 0, 300, 300);
    });
    $( "#prev_img" ).click(function() {
        // swapImage(-1);
        //hideQuestInfo();
        changeIndex(-1);
        var  canvas = layers['layer1'][0];
        clearCanvas(canvas);
        addImage('layer1', imgs[i], 0, 0, 300, 300);
    });

    $( "#test-but" ).click(function() {
        console.log("deneme");
    });

    $.getJSON( "/game_data", function( data ) {
        var items = [];
        console.log(data["mastery"]);

        $.each(data["mastery"], function(key, val){
            var path = "/static/images/" + key + "_" + val["level"] + ".jpg";
            imgs.push(path)
        });
        addImage('layer1', imgs[0], 0, 0, 300, 300);
        console.log(imgs);
    });
});