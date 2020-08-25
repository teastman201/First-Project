var Calendar = tui.Calendar;
var releaseTitle = "";
var releaseDate = "";


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
    var responseReleaseImage = response.results[0].background_image;
    var responseReleaseName = response.results[0].name;
    var responseImageVideo = response.results[0].clip.clip;
    $(".releaseImage1").attr("src", responseReleaseImage);
    $(".releaseVideoLink").attr("src", responseImageVideo);
    $(".title1").text(responseReleaseName);
    $(".releaseVideoLink").addEventListener("mouseover", myScript);

    



});



