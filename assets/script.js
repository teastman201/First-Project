$(document).ready(function(){
    $('.carousel').slick({
      
    });
  });

var Calendar = tui.Calendar;
var releaseTitle = "";
var releaseDate = "";
 
// Variables for video mouseover action
var figure = $(".video");
var vid = figure.find("video");
 
var resultArray = [];
var monthStart = "";
var monthEnd = "";


var Calendar = new Calendar('#calendar', {
    isReadOnly: true,
    defaultView: 'month',
    taskView: true,
    template: {
        monthDayname: function (dayname) {
            return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
        }
    }
});

function getMonth()
{
    monthStart = moment().startOf("month").format("YYYY-MM-DD");
    monthEnd = moment().endOf("month").format("YYYY-MM-DD");
    console.log("MonthStart: " + monthStart);
    console.log("MonthEnd: " + monthEnd);
}

getMonth();

// Ajax call to RAWR API for game data
$.ajax({
    url: "https://api.rawg.io/api/games?dates="+monthStart+","+monthEnd+"&ordering=-added",
    method: "GET"
}).then(function (response) {

    console.log(response);

    for(var i = 0;i<response.results.length;i++)
    {
        releaseTitle = response.results[i].name;
        releaseDate = response.results[i].released;
        Calendar.createSchedules([
            {
                id: i+1,
                calendarId: i+1,
                title: releaseTitle,
                category: 'time',
                dueDateClass: '',
                start: releaseDate + 'T22:30:00+09:00',
                end: releaseDate + 'T02:31:00+09:00',
            }
        ]);

        Calendar.updateSchedule(i+1, i+1, {
            title: releaseTitle,
            start: releaseDate + 'T22:00:00+09:00',
            end: releaseDate + 'T23:59:00+09:00',
        });

        resultArray.push(response.results[i]);
        
    }

      
    // Used to grab images from RAWR API
    var responseReleaseImage = response.results[0].background_image;
    // Grabs game name from RAWR API
    var responseReleaseName = response.results[0].name;
    // Grabs video from RAWR API
    var responseImageVideo = response.results[0].clip.clip;
    // Updates HTML element with RAWR API image data
     
    console.log(resultArray);

    var randItem = Math.floor(Math.random()*response.results.length);
    console.log(randItem);
    var responseReleaseImage = response.results[randItem].background_image;
    var responseReleaseName = response.results[randItem].name;
    var responseImageVideo = response.results[randItem].clip.clip;

    $(".releaseImage1").attr("src", responseReleaseImage);
    // Updates HTML element with RAWR API video data
    $(".releaseVideoLink").attr("src", responseImageVideo);
    // Updates HTML element text area with RAWR API data
    $(".title1").text(responseReleaseName);

    // This needs to be in here because the images are here. 
    function switchImage() { 
        var img = new Image(); 
        img.src =  responseReleaseImage; 
        document.getElementById('img').appendChild(img); 
        down.innerHTML = "Image Element Added.";  
    }  


});
 
// Mouseover doesn't work inside the ajax call but .

// Functions for mouseover action
//[].forEach.call(figure, function (item, index) {
//    item.addEventListener('mouseover', hoverVideo.bind(item, index), false);
//    item.addEventListener('mouseout', hideVideo.bind(item, index), false); 
    
//});

// Function to start the play on mouseover
function hoverVideo(index, e) {
    vid[index].play();
    document.getElementById("video").muted = true;           
}


// Function to start the play on mouseover
function hideVideo(index, e) {
    vid[index].pause();    
    // switchImage;    
}

//Population functions
var currentDate = "";
var featDStart = "";
var featDEnd = "";
var popDStart = "";
var popDEnd = "";
var recentDStart = "";

var cacheArray = [];


function getDate()
{
currentDate = moment().format("YYYY-MM-DD");
console.log(currentDate);
}

function getFeatParams()
{
    featDStart = moment().subtract(7,"days").format("YYYY-MM-DD");
    console.log("FeaturedStart: " + featDStart);
    featDEnd = moment().add(7,"days").format("YYYY-MM-DD");
    console.log("FeaturedEnd: " + featDEnd);
}

function getPopParams()
{
    popDStart = moment().subtract(15,"days").format("YYYY-MM-DD");
    console.log("PopularStart: " + popDStart);
    popDEnd = moment().add(15,"days").format("YYYY-MM-DD");
    console.log("PopularEnd: " + popDEnd);
}

function getRecentParams()
{
    recentDStart = moment().subtract(7,"days").format("YYYY-MM-DD");
    console.log("RecentStart: " + recentDStart);
}

function populateRecent(start,end)
{
    //ajax call
    var queryURL = "https://api.rawg.io/api/games?dates="+start+","+end+"&ordering=-added"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        for(var i = 0;i<response.results.length;i++)
        {
            cacheArray.push(response.results[i]);
        }

        console.log(cacheArray);

        //specific functions
        var randItem = Math.floor(Math.random()*cacheArray.length);
        console.log(randItem);
        var responseReleaseImage = cacheArray[randItem].background_image;
        var responseReleaseName = cacheArray[randItem].name;
    
        $(".releaseImage1").attr("src", responseReleaseImage);
        $(".title1").text(responseReleaseName);
    
        var randItem2 = Math.floor(Math.random()*cacheArray.length);
        console.log(randItem2);
        var responseReleaseImage2 = cacheArray[randItem2].background_image;
        var responseReleaseName2 = cacheArray[randItem2].name;
    
        $(".releaseImage2").attr("src", responseReleaseImage2);
        $(".title2").text(responseReleaseName2);
    });
}

function populateRecent(start,end)
{
    //ajax call
    var queryURL = "https://api.rawg.io/api/games?dates="+start+","+end+"&ordering=-added"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        for(var i = 0;i<response.results.length;i++)
        {
            cacheArray.push(response.results[i]);
        }

        console.log(cacheArray);

        //specific functions
        var randItem = Math.floor(Math.random()*cacheArray.length);
        console.log(randItem);
        var responseReleaseImage = cacheArray[randItem].background_image;
        var responseReleaseName = cacheArray[randItem].name;
    
        $(".releaseImage1").attr("src", responseReleaseImage);
        $(".title1").text(responseReleaseName);
    
        var randItem2 = Math.floor(Math.random()*cacheArray.length);
        console.log(randItem2);
        var responseReleaseImage2 = cacheArray[randItem2].background_image;
        var responseReleaseName2 = cacheArray[randItem2].name;
    
        $(".releaseImage2").attr("src", responseReleaseImage2);
        $(".title2").text(responseReleaseName2);
    });
}


getDate();
getFeatParams();
//getPopParams();
getRecentParams();
populateRecent(recentDStart,currentDate);

$(".carousel").slick({

    // normal options...
    infinite: false,
  
    // the magic
    responsive: [{
  
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          infinite: true
        }
  
      }, {
  
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          dots: true
        }
  
      }, {
  
        breakpoint: 300,
        settings: "unslick" // destroys slick
  
      }]
  });