fetch('days.json')
      .then(response => response.json())
      .then(jsonData => {
        
        var currentDate = new Date().toISOString().split('T')[0];


        var matchingDay = jsonData.find(function(day) {
          return day.date === currentDate;
        });
        var pageToLoad = '';
        if (matchingDay) {
          var dayType = matchingDay.type.toLowerCase();
          if (dayType === 'full day') {
            pageToLoad = 'full-day.html';
          } else if (dayType === 'half day') {
            pageToLoad = 'half-day.html';
          }
          else if (dayType === 'no school') {
            pageToLoad = 'no-school.html';
          }
        }
        if ((pageToLoad) && (!window.location.href.includes(pageToLoad))) {
          window.location.href = pageToLoad;
        } 
      })
      .catch(error => {
        console.error('Error fetching JSON data:', error);
      });
