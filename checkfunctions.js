function isUrlExists(url, cb){
    jQuery.ajax({
        url:      url,
        dataType: 'text',
        type:     'GET',
        complete:  function(xhr){
            if(typeof cb === 'function')
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

