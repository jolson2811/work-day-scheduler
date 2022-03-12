$(document).ready(function () {
    today = moment().format('LLLL');
    console.log(today);
    $("#currentDay").text(today);

});
