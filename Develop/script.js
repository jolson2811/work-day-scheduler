$(document).ready(function () {
    var today = moment().format('LLLL');
    $("#currentDay").text(today);

    var start = 9;
    var end = 17;

    var d = new Date();
    var dhour = d.getHours();

    function formatTime(hour) {
        var formatHour = null;
        if (hour > 12) {
            formatHour = hour - 12;
        } else {
            formatHour = hour;
        }
        if (hour >= 12) {
            formatHour = formatHour + "PM";
        } else {
            formatHour = formatHour + "AM";
        }
        return formatHour;
    }

    function backgroundColor(hour) {
        if (dhour == hour) {
            return "bg-danger";
        } else if (dhour < hour) {
            return "bg-success";
        } else {
            return "bg-light";
        }
    }

    var saveTask = function(hour, task) {
        localStorage.setItem(hour, JSON.stringify(task));
    };

    var getTask = function(hour) {
       var text = JSON.parse(localStorage.getItem(hour));
       if (text) {
           return text;
       } else {
           return "";
       }
    }

    var innerHTML = "";

    for (var i = start; i <= end; i++) {
        innerHTML += '<div id="' + formatTime(i) + '" class="row"><div class="col-sm-2 text-right align-text-top border border-secondary rounded pt-2 bg-gradient">' + formatTime(i) + '</div><textarea id="' + formatTime(i) + '-task" class="col-sm-8 ' + backgroundColor(i) + ' text-left align-text-top border border-secondary pt-2 bg-gradient">' + getTask(formatTime(i)) + '</textarea><button id="' + formatTime(i) + '-save" type="button" class="col-sm-2 btn btn-info border border-secondary rounded">Save</button></div>';
    }
    $("#tasks").html(innerHTML);

    $("#tasks").on("click", ".btn", function () {
        var selString = "#" + this.id.replace("save", "task");
        var selHour = this.id.replace("-save", "");
        var textInput = $(selString).val();
        saveTask(selHour, textInput);
    });
});

