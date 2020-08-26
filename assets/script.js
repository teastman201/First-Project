var Calendar = tui.Calendar;
var releaseTitle = "";
var releaseDate = "";
// tristan-branch additions #15
// Variables for video mouseover action
var figure = $(".video");
var vid = figure.find("video");
// tristan-branch additions #15
var resultArray = [];
var currentDate = "";
var featuredDStart = "";
var featuredDEnd = "";



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

// Ajax call to RAWR API for game data
$.ajax({
    url: "https://api.rawg.io/api/games?dates=2020-08-01,2020-08-31&ordering=-added",
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

     // tristan-branch additions #15
    // Used to grab images from RAWR API
    var responseReleaseImage = response.results[0].background_image;
    // Grabs game name from RAWR API
    var responseReleaseName = response.results[0].name;
    // Grabs video from RAWR API
    var responseImageVideo = response.results[0].clip.clip;
    // Updates HTML element with RAWR API image data
    // tristan-branch additions #15
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

    

});
// tristan-branch additions #15
// Functions for mouseover action
[].forEach.call(figure, function (item, index) {
    item.addEventListener('mouseover', hoverVideo.bind(item, index), false);
    item.addEventListener('mouseout', hideVideo.bind(item, index), false);
// tristan-branch additions #15
    


});
// tristan-branch additions #15
// Function to start the play on mouseover
function hoverVideo(index, e) {
    vid[index].play();
}
// Function to start the play on mouseover
function hideVideo(index, e) {
    vid[index].pause();
}
// tristan-branch additions #15


function getDate()
{
currentDate = moment().format("YYYY-MM-DD");
console.log(currentDate);
}

getDate();