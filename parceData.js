function parseData() {
  fetch('data.txt')
    .then(response => response.text())
    .then(data => {
      if (!data) {
        console.error('Empty data received from file.');
        return;
      }

      const lines = data.split('\n');
      const days = [];

      lines.forEach(line => {
        const parts = line.trim().split(',');

        const day = parts[0]?.trim();
        const dayType = parts[1]?.trim();
        const comment = parts[2]?.trim();

        const dayObj = {
          date: day || '',
          type: dayType || '',
          comment: comment || '',
        };

        days.push(dayObj);
      });

      const jsonData = JSON.stringify(days, null, 2);


      const username = 'shakArora';
      const repository = 'schedule';
      const filePath = 'days.json';
      const branch = 'main';


      const apiUrl = 'https://api.github.com/repos/shakArora/schedule/contents/data/days.json';


`;


      const requestBody = {
        message: 'Update days.json',
        content: btoa(jsonData), 
        sha: '', 
        branch: branch,
      };


      fetch(apiUrl)
        .then(response => response.json())
        .then(fileData => {
          requestBody.sha = fileData.sha;

          fetch(apiUrl, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `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`, 
            },
            body: JSON.stringify(requestBody),
          })
            .then(response => response.json())
            .then(updatedFileData => {
              console.log('days.json file has been updated.');
            })
            .catch(error => {
              console.error('Error updating days.json:', error);
            });
        })
        .catch(error => {
          console.error('Error fetching file data:', error);
        });
    })
    .catch(error => {
      console.error('Error fetching or processing data:', error);
    });
}

setInterval(parseData, 60000);
parseData();
