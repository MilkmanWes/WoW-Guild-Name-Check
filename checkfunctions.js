var battleNetURL = "http://us.battle.net/wow/en/guild/";
var armoryURL = "";

function updateArmoryURL(){
    window.armoryURL = battleNetURL + $("select#serverList").val() + "/";
}

function isUrlExists(url, cb) {
    $.ajax({
        url: url,
        dataType: 'jsonp',
        type: 'GET',
        complete: function(xhr) {
            if (typeof cb === 'function')
                cb.apply(this, [xhr.status, url]);
        }
    });
}


function emptyTable() {
    $("table#resultsTable >tbody > tr").remove();
}

function nameToURL(name) {
    var urlFromName = armoryURL + name + "/";
    return urlFromName
}

function urlToName(name) {
    var nameFromURL = name.replace(armoryURL, "");
    nameFromURL = nameFromURL.replace("/", "");
    return nameFromURL
}

function checkNames() {
    updateArmoryURL();
    emptyTable();
    var textArea = document.getElementById("textCandidateNames");
    var arrayOfLines = textArea.value.split("\n");
    for (var i = 0; i < arrayOfLines.length; i++) {
        console.log(arrayOfLines[i])
        if (arrayOfLines[i].length > 32) {
            appendUnavailable([arrayOfLines[i], "Too Long"]);
        } else {
            isUrlExists(nameToURL(arrayOfLines[i]), function(status, url) {
                console.log(arrayOfLines[i])
                if (status === 200) {
                    candidateName = urlToName(url);
                    appendUnavailable([candidateName, "In Use"]);
                } else if (status === 404) {
                    candidateName = urlToName(url);
                    appendAvailable([candidateName, "Available"]);
                }
            });
        }
    }
}

function makeTable(container, data) {
    var table = $("<table/>").addClass('CSSTableGenerator');
    table.attr('id', 'resultsTable')
    $.each(data, function(rowIndex, r) {
        var row = $("<tr/>");
        $.each(r, function(colIndex, c) {
            row.append($("<t" + (rowIndex == 0 ? "h" : "d") + "/>").text(c));
        });
        table.append(row);
    });
    return container.append(table);
}

function appendAvailable(rowData) {
    var lastRow = $('<tr/>').appendTo($('table#resultsTable').find('tbody:last'));
    $.each(rowData, function(colIndex, c) {
        lastRow.append($('<td/>').text(c));
        lastRow.addClass("table-success");
    });

    return lastRow;
}

function appendUnavailable(rowData) {
    var lastRow = $('<tr/>').appendTo($('table#resultsTable').find('tbody:last'));
    $.each(rowData, function(colIndex, c) {
        lastRow.append($('<td/>').text(c));
        lastRow.addClass("table-danger");
    });
    return lastRow;
}
