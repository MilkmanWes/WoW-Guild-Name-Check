function isUrlExists(url, cb) {
    jQuery.ajax({
        url: url,
        dataType: 'text',
        type: 'GET',
        complete: function(xhr) {
            if (typeof cb === 'function')
                cb.apply(this, [xhr.status]);
        }
    });
}

//isUrlExists('URL', function(status){
//    if(status === 200){
//       // file was found
//    }
//    else if(status === 404){
//       // 404 not found
//    }
//});

function checkNames() {
    var textArea = document.getElementById("textCandidateNames");
    var arrayOfLines = textArea.value.split("\n");
    for (var i = 0; i < arrayOfLines.length; i++) {
        isUrlExists(arrayOfLines[i], function(status) {
            if (status === 200) {
                console.log(arrayOfLines[i] + " was found")
            } else if (status === 404) {
                console.log(arrayOfLines[i] + " was NOT found")
            }
        });
    }
}
