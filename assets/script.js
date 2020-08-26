var Calendar = tui.Calendar;
var releaseTitle = "";
var releaseDate = "";
// Variables for video mouseover action
var figure = $(".video");
var vid = figure.find("video");


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
        console.log(releaseTitle);
        releaseDate = response.results[i].released;
        console.log(releaseDate);
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

        console.log(response.results[i].background_image);
        
       
    }

    // Used to grab images from RAWR API
    var responseReleaseImage = response.results[0].background_image;
    // Grabs game name from RAWR API
    var responseReleaseName = response.results[0].name;
    // Grabs video from RAWR API
    var responseImageVideo = response.results[0].clip.clip;
    // Updates HTML element with RAWR API image data
    $(".releaseImage1").attr("src", responseReleaseImage);
    // Updates HTML element with RAWR API video data
    $(".releaseVideoLink").attr("src", responseImageVideo);
    // Updates HTML element text area with RAWR API data
    $(".title1").text(responseReleaseName);
    

});

// Functions for mouseover action
[].forEach.call(figure, function (item, index) {
    item.addEventListener('mouseover', hoverVideo.bind(item, index), false);
    item.addEventListener('mouseout', hideVideo.bind(item, index), false);
});

// Function to start the play on mouseover
function hoverVideo(index, e) {
    vid[index].play();
}
// Function to start the play on mouseover
function hideVideo(index, e) {
    vid[index].pause();
}



