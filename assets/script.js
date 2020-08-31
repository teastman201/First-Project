$(document).ready(function () {
    $('.carousel').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true

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

function getMonth() {
    monthStart = moment().startOf("month").format("YYYY-MM-DD");
    monthEnd = moment().endOf("month").format("YYYY-MM-DD");
    // console.log("MonthStart: " + monthStart);
    // console.log("MonthEnd: " + monthEnd);
}

getMonth();

// Ajax call to RAWR API for game data
$.ajax({
    url: "https://api.rawg.io/api/games?dates=" + monthStart + "," + monthEnd + "&ordering=-added",
    method: "GET"
}).then(function (response) {

    // console.log(response);

    for (var i = 0; i < response.results.length; i++) {
        releaseTitle = response.results[i].name;
        releaseDate = response.results[i].released;
        Calendar.createSchedules([
            {
                id: i + 1,
                calendarId: i + 1,
                title: releaseTitle,
                category: 'time',
                dueDateClass: '',
                start: releaseDate + 'T22:30:00+09:00',
                end: releaseDate + 'T02:31:00+09:00',
            }
        ]);

        Calendar.updateSchedule(i + 1, i + 1, {
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

    // console.log(resultArray);

    // This needs to be in here because the images are here. 
    function switchImage() {
        var img = new Image();
        img.src = responseReleaseImage;
        document.getElementById('img').appendChild(img);
        down.innerHTML = "Image Element Added.";
    }


});

// Mouseover doesn't work inside the ajax call but .

// Functions for mouseover action
[].forEach.call(figure, function (item, index) {
   item.addEventListener('mouseover', hoverVideo.bind(item, index), false);
   item.addEventListener('mouseout', hideVideo.bind(item, index), false); 

});

$("video").prop("volume", 0);
$("video").prop("controls", false);


// Function to start the play on mouseover
function hoverVideo(index, e) {
    vid[index].play();
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


function getDate() {
    currentDate = moment().format("YYYY-MM-DD");
}

function getFeatParams() {
    featDStart = moment().subtract(7, "days").format("YYYY-MM-DD");
    featDEnd = moment().add(7, "days").format("YYYY-MM-DD");
}

function getAntiParams() {
    antiDEnd = moment().add(7, "days").format("YYYY-MM-DD");
}

function getRecentParams() {
    recentDStart = moment().subtract(7, "days").format("YYYY-MM-DD");
}

function populateRecent(start, end) {
    //ajax call
    var queryURL = "https://api.rawg.io/api/games?dates=" + start + "," + end + "&ordering=-added"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

         console.log("Populating Recent...");

        cacheArray.length = 0;

         console.log(response);

        for (var i = 0; i < response.results.length; i++) {
            cacheArray.push(response.results[i]);

            if (i > 0 && i < 8) {
                var randItem = Math.floor(Math.random() * response.results.length);
                 console.log(randItem);
                var responseReleaseImage = response.results[randItem].background_image;
                var responseReleaseName = response.results[randItem].name;

                $(".releaseImage" + i).attr("src", responseReleaseImage);
                $(".title" + i).text(responseReleaseName);
                response.results.splice(randItem, 1);
            }
        }

    });
}

function populateFeatured(start, end) {
    //ajax call
    var queryURL = "https://api.rawg.io/api/games?dates=" + start + "," + end + "&ordering=-added"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        // console.log("Populating Recent...");

        cacheArray.length = 0;

        // console.log(response);

        for (var i = 0; i < response.results.length; i++) {
            cacheArray.push(response.results[i]);

            if (i > 0 && i < 6) {
                var randItem = Math.floor(Math.random() * response.results.length);
                // console.log(randItem);
                var responseReleaseImage = response.results[randItem].background_image;
                var responseReleaseName = response.results[randItem].name;
                if(response.results[randItem].clip != null)
                {
                    var responseImageVideo = response.results[randItem].clip.clip;
                }
                // Variables for video mouseover action
                var figure = $(".video");
                var vid = figure.find("video");



                // May be unnecessary
                var responseImageVideo = response.results[randItem].clip.clip;
                // console.log(responseImageVideo);

                // console.log(response);
                // if (responseImageVideo == null){
                //     responseImageVideo;
                // }


                // $(".featuredImage"+i).attr("src", responseReleaseImage);



                $(".featuredImage" + i).attr("src", responseReleaseImage);
                if (response.results[randItem].clip != null) 
                {
                    $(".featuredImage" + i).attr("src", responseImageVideo);
                }
                $(".featuredTitle" + i).text(responseReleaseName);
                response.results.splice(randItem, 1);



            };
        };
    });
}

getDate();
getFeatParams();
getAntiParams();
getRecentParams();
populateRecent(recentDStart, currentDate);
//populateAnticipated(currentDate,antiDEnd);
populateFeatured(featDStart, featDEnd);


// Start code for Recently Released click modal popup.
var refs1 = {
    modalEdicion1: {
        open: function () {
            document.getElementById('modalEdicion1').classList.add('is-active');

        },
        close: function () {
            document.getElementById('modalEdicion1').classList.remove('is-active');

        }
    }
};

var refs2 = {
    modalEdicion2: {
        open: function () {
            document.getElementById('modalEdicion2').classList.add('is-active');

        },
        close: function () {
            document.getElementById('modalEdicion2').classList.remove('is-active');

        }
    }
};

var refs3 = {
    modalEdicion3: {
        open: function () {
            document.getElementById('modalEdicion3').classList.add('is-active');

        },
        close: function () {
            document.getElementById('modalEdicion3').classList.remove('is-active');

        }
    }
};

var refs4 = {
    modalEdicion4: {
        open: function () {
            document.getElementById('modalEdicion4').classList.add('is-active');

        },
        close: function () {
            document.getElementById('modalEdicion4').classList.remove('is-active');

        }
    }
};

var refs5 = {
    modalEdicion5: {
        open: function () {
            document.getElementById('modalEdicion5').classList.add('is-active');

        },
        close: function () {
            document.getElementById('modalEdicion5').classList.remove('is-active');

        }
    }
};

var refs6 = {
    modalEdicion6: {
        open: function () {
            document.getElementById('modalEdicion6').classList.add('is-active');

        },
        close: function () {
            document.getElementById('modalEdicion6').classList.remove('is-active');

        }
    }
};

var refs7 = {
    modalEdicion7: {
        open: function () {
            document.getElementById('modalEdicion7').classList.add('is-active');

        },
        close: function () {
            document.getElementById('modalEdicion7').classList.remove('is-active');

        }
    }
};



