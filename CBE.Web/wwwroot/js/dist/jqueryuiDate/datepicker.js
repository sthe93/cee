$(document).ready(function () {
  
    $("#ProjectStartDate").datepicker({
        changeMonth: true,
        changeYear: true,
        autoclose: true,
        dateFormat: 'yy-mm-dd',
     
       // minDate: '0',
        buttonImage: "~/Images/calendar-blue.gif",
        buttonImageOnly: true,
        inline: true,

        onSelect: function (selected) {
            var dt = new Date(selected);
            dt.setDate(dt.getDate());
            $("#ProjectEndDate").datepicker("option", "minDate", dt);
        }
    });


    $("#ProjectEndDate").datepicker({
        changeMonth: true,
        changeYear: true,
        autoclose: true,
        dateFormat: 'yy-mm-dd',

        minDate: '0',
        buttonImage: "~/Images/calendar-blue.gif",
        buttonImageOnly: true,
        inline: true,

        //onSelect: function (selected) {
        //    var dt = new Date(selected);
        //    dt.setDate(dt.getDate());
        //    $("#ProjectEndDate").datepicker("option", "minDate", dt);
        //}
    });

    //$("#ProjectStartDate").datepicker({
    //    dateFormat: 'yy-mm-dd',
    //    changeMonth: true,
    //    changeYear: true,
    //    minDate: 0,
    //});

    //("#ProjectEndDate").datepicker({
    //    dateFormat: 'yy-mm-dd',
    //    changeMonth: true,
    //    changeYear: true,
    //    minDate: 0,
    //});


    $(".DisableTypingDate").keydown(function (e) {
        return false;
    });
    
    //$(".timepicker").timepicker({
    //    timeFormat: 'HH:mm',
    //    interval: 60,
    //   // minTime: '10',
    //    maxTime: '11:59pm',
    //    defaultTime: '12',
    //    startTime: '00:00am',
    //    dynamic: false,
    //    dropdown: true,
    //    scrollbar: true
    //});
    

});

