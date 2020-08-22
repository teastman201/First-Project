var Calendar = tui.Calendar;

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

Calendar.createSchedules([
    {
        id: '1',
        calendarId: '1',
        title: 'Example Title',
        category: 'time',
        dueDateClass: '',
        start: '2020-08-23T22:30:00+09:00',
        end: '2020-08-24T02:31:00+09:00',
        isReadOnly: true
    },
    {
        id: '2',
        calendarId: '1',
        title: 'Example Release',
        category: 'time',
        dueDateClass: '',
        start: '2020-08-30T17:30:00+09:00',
        end: '2020-08-31T07:31:00+09:00',
        isReadOnly: true    // schedule is read-only
    }
]);

$.ajax({
    url: "https://api.rawg.io/api/games?dates=2019-10-10,2020-10-10&ordering=-added",
    method: "GET"
}).then(function (response) {
console.log(response);
});