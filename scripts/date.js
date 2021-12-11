var date = new Date();
var dayOfMonth = date.getDate();
var month = getCorrespondingMonthString(date.getMonth());
var year = date.getFullYear();

var dateString = dayOfMonth + " " + month + " " + year;

function getCorrespondingMonthString(month) {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[month];
}