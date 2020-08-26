var Calendar = tui.Calendar;
var releaseTitle = "";
var releaseDate = "";
var resultArray = [];


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

    console.log(resultArray);

    var randItem = Math.floor(Math.random()*response.results.length);
    console.log(randItem);
    var responseReleaseImage = response.results[randItem].background_image;
    var responseReleaseName = response.results[randItem].name;
    var responseImageVideo = response.results[randItem].clip.clip;
    $(".releaseImage1").attr("src", responseReleaseImage);
    $(".releaseVideoLink").attr("src", responseImageVideo);
    $(".title1").text(responseReleaseName);
    //$(".releaseVideoLink").addEventListener("mouseover", myScript);

});



