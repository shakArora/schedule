function turnNum(s) {
    s = s.split(":");
    if (parseInt(s[0]) <= 5) {
        s[0] = parseInt(s[0]) + 12;
    }
    return parseInt(s[0]) * 60 * 60 + parseInt(s[1]) * 60;
}

function parseData() {
    fetch('data.xlsx')
        .then(response => response.arrayBuffer())
        .then(buffer => {
            var workbook = XLSX.read(new Uint8Array(buffer), { type: 'array' });
            var sheetName = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[sheetName];
            var jsonData = [];
            var rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            for (var i = 1; i < rows.length; i++) {
                var row = rows[i];
                var date = XLSX.SSF.format('yyyy-mm-dd', row[0]);
                var event = row[1];
                var comment = row[2] || '';
                var dataObj = {
                    date: date,
                    type: event,
                    comment: comment
                };
                jsonData.push(dataObj);
            }
            var jsonDataString = JSON.stringify(jsonData, null, 2);
            document.getElementById('parsedData').textContent = jsonDataString;
        });
}

parseData();
