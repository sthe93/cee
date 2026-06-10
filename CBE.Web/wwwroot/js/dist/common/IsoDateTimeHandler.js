function cleanIsoDateTime(isoDateTime) {
    var dateTime = isoDateTime;
    var dateArray = dateTime.split("T");
    var time = dateArray[1].split(".");
    var formattedDate = dateArray[0] + " " + time[0];
    return formattedDate;
}