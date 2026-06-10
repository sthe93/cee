function notify(message, type) {
    $.notify({
        message: message,
    }, {
        type: type,
        time: 1000,
    }
    );

}