function Count_Characters(input) {
    let str = new String(input);
    return str.length;
}

function CountWords(str) {
    const arr = str.split(' ');
    return arr.filter(word => word !== '').length;
}

function ValidateNumbeOfYears(e) {
    let _Years = document.getElementById('Years').value;
    let yearsSize = _Years.length;
    if (yearsSize > 2) {
        $.notify('Please make Years max limit to be 2 digits', 'error');
        document.getElementById('Years').value = "";
      /*  e.preventDefault();*/
       // e.stopImmediatePropagation();
    }
}