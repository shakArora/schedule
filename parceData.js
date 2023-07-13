function parseData() {
    fetch('data.txt')
      .then(response => response.text())
      .then(data => {

        const lines = data.split('\n');
  
        const days = [];

        lines.forEach(line => {

          const parts = line.trim().split(',');
  
          const day = parts[0].trim();
          const dayType = parts[1].trim();
          const comment = parts[2].trim();
  
          const dayObj = {
            date: day,
            type: dayType,
            comment: comment,
          };
  
    
          days.push(dayObj);
        });
  
        const jsonData = JSON.stringify(days, null, 2);

        const dataUri =
          'data:application/json;charset=utf-8,' +
          encodeURIComponent(jsonData);
        const link = document.createElement('a');
        link.href = dataUri;
        link.download = 'days.json';
  
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  setInterval(parseData, 60000);
  parseData();
  
