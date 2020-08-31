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

// fetch("https://hipsum.co/api/?type=hipster-centric&sentences=3").then(data => {console.log(data)});

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
    // Switch image function t
    // function switchImage() {
    //     var img = new Image();
    //     img.src = responseReleaseImage;
    //     document.getElementById('img').appendChild(img);
    //     down.innerHTML = "Image Element Added.";
    // }


});

// Mouseover doesn't work inside the ajax call but .






// Functions for mouseover action
[].forEach.call(figure, function (item, index) {
   item.addEventListener('mouseover', hoverVideo.bind(item, index), false);
   item.addEventListener('mouseout', hideVideo.bind(item, index), false); 

});


// Function to start the play on mouseover
function hoverVideo(index, e) {
    vid[index].play();
    document.getElementById("video").muted = true;
    console.log(document.getElementById("video"));
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
    // console.log(currentDate);
}

function getFeatParams() {
    featDStart = moment().subtract(7, "days").format("YYYY-MM-DD");
    // console.log("FeaturedStart: " + featDStart);
    featDEnd = moment().add(7, "days").format("YYYY-MM-DD");
    // console.log("FeaturedEnd: " + featDEnd);
}

function getAntiParams() {
    antiDEnd = moment().add(7, "days").format("YYYY-MM-DD");
    // console.log("AnticipatedEnd: " + antiDEnd);
}

function getRecentParams() {
    recentDStart = moment().subtract(7, "days").format("YYYY-MM-DD");
    // console.log("RecentStart: " + recentDStart);
}

function populateRecent(start, end) {
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

            if (i > 0 && i < 8) {
                var randItem = Math.floor(Math.random() * response.results.length);
                // console.log(randItem);
                var responseReleaseImage = response.results[randItem].background_image;
                var responseReleaseName = response.results[randItem].name;

                $(".releaseImage" + i).attr("src", responseReleaseImage);
                $(".title" + i).text(responseReleaseName);
                response.results.splice(randItem, 1);

                // target
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
                // Variables for video mouseover action
                var figure = $(".video");
                var vid = figure.find("video");
                // May be unnecessary
                if (response.results[randItem].clip != null) {
                    var responseImageVideo = response.results[randItem].clip.clip;
                    // console.log(responseImageVideo);
                }
                // console.log(response);
                // if (responseImageVideo == null){
                //     responseImageVideo;
                // }


                // $(".featuredImage"+i).attr("src", responseReleaseImage);


                $(".featuredImage" + i).attr("src", responseImageVideo);
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
// End Recently Released modal popup code

////////// Start code to refactor modal to be DRY
// var active = document.getElementById('modalEdicion').classList.add('is-active');
// var notActive = document.getElementById('modalEdicion').classList.remove('is-active');


// if (!active) {
//     $(this).on("click", function() {
//         console.log('this');
//         document.getElementById('modalEdicion').classList.add('is-active');
//     }); if (active) {
//         $(".modal-background").on("click", function() {
//             document.getElementById('modalEdicion').classList.remove('is-active');
//         })        
//     }
// };
/////////// End code to refactor modal

//////// Start bacon lorem ipsum
$(document).ready(function () {
    bacon();



function bacon() {
    {


        $.getJSON('https://baconipsum.com/api/?callback=?',
            { 'type': 'meat-and-filler', 'start-with-lorem': '1', 'paras': '1' },
            function (baconGoodness) {

                if (baconGoodness && baconGoodness.length > 0) {

                    for (var i = 0; i < baconGoodness.length; i++)
                        for (t = 1; t < 8; t++) {
                            
                            $(".modalDescription" + t).html('');
                            $(".modalDescription" + t).append('<p>' + baconGoodness[i] + '</p>');
                            $(".modalDescription" + t).show();
                        }
                        
                }
                
            });
            console.log('https://baconipsum.com/api/?callback=?',
    { 'type': 'meat-and-filler', 'start-with-lorem': '1', 'paras': '7' });
           
           console.log('test');
    }
    
}

});



////////////////////// Start refactored bacon
///////////////////////////Refactoring to make each description differnt
                // function bacon() {
                //     {
                //         for (b=1; b < 9; b++) {
                //         $.getJSON('https://baconipsum.com/api/?callback=?',
                //             { 'type': 'meat-and-filler', 'start-with-lorem': '1', 'paras': '1' },

                                        
                        
                //             function (baconGoodness) {
                //                 // baconArray.push(baconGoodness[b]);
                //                 // if (baconGoodness && baconGoodness.length > 0) {
                                    
                //                     // for (var i = 0; i < 8; i++) {
                                    
                //                     // }
                //                         // for (t = 1; t < 8; t++) {
                //                             $(".modalDescription" + b).html('');
                //                             $(".modalDescription" + b).append('<p>' + baconGoodness[b] + '</p>');
                //                             $(".modalDescription" + b).show();
                //                         // }
                //                 // }
                                
                //             });
                //             // console.log(JSON.parse('https://baconipsum.com/api/?callback=?',
                //             // { 'type': 'meat-and-filler', 'start-with-lorem': '1', 'paras': '1' }));
                //     }
                //     }
                // }
////////////////////////////////End refactored bacon    
//////// End bacon lorem ipsum
