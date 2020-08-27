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
var antiDEnd = "";
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

function getAntiParams()
{
    antiDEnd = moment().add(7,"days").format("YYYY-MM-DD");
    console.log("AnticipatedEnd: " + antiDEnd);
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

        cacheArray.length = 0;

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

function populateAnticipated(start,end)
{
    //ajax call
    var queryURL = "https://api.rawg.io/api/games?dates="+start+","+end+"&ordering=-added"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        cacheArray.length = 0;

        console.log(response);

        for(var i = 0;i<response.results.length;i++)
        {
            cacheArray.push(response.results[i]);
        }

        console.log(cacheArray);

        //specific functions
        var responseReleaseImage = cacheArray[0].background_image;
        var responseReleaseName = cacheArray[0].name;
    
        $(".releaseImage3").attr("src", responseReleaseImage);
        $(".title3").text(responseReleaseName);

        var responseReleaseImage2 = cacheArray[1].background_image;
        var responseReleaseName2 = cacheArray[1].name;
    
        $(".releaseImage4").attr("src", responseReleaseImage2);
        $(".title4").text(responseReleaseName2);
    });
}


getDate();
getFeatParams();
getAntiParams();
getRecentParams();
populateRecent(recentDStart,currentDate);
populateAnticipated(currentDate,antiDEnd);