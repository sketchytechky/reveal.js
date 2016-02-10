/**
 * Main script for parsing the spreadsheet
 */
function getFromSpreadsheet(spreadsheet_url, callback) {
    if (!Tabletop) {
        throw "This is dependent on tabletop.js https://github.com/jsoma/tabletop";
    }

    Tabletop.init({
        key: spreadsheet_url,
        callback: function (data) {
            var result = parseTableData(data);
            initSlideFromData(result);
            if (callback) {
                callback(result);
            }
        },
        simpleSheet: false
    });
}

/**
 * Utility function for extracting sheet key
 */
function parseSheetKey (sheet_url) {
    var match = /([\d\w]{44})/.exec(sheet_url);
    if (match) {
        return match[1];
    }
    return null;
}

function parseTableData(data) {
    var firstSheet = Object.keys(data)[0];
    var result = data[firstSheet].raw.feed.entry.map(function (row) {
        var returnRow = [];
        for (var col in row) {
            if (col.match(/^gsx\$/)) {
                returnRow.push(row[col].$t);
            }
        }
        return returnRow;
    });
    return result;
}

function initSlideFromData(data) {
    var secNode = $("<section/>");
    data.forEach(function (row) {
        row.forEach(function (e) {
            if (e=="$") {
                // skip for now
            } else {
                // if it starts with "<", assume html
                if (e.substring(0,1)=='<') {
                    secNode.append('<section>'+e+'</section>');
                } else {
                    secNode.append('<section data-markdown><script type="text/template">'+e+'<\/script></section>');
                }
            }
        });
        $(".slides").append(secNode);
        secNode = $("<section/>");
    });

    // Add to the reveal.js body
    $(".slides").append(secNode);
    reveal();
}

