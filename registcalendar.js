function registCalendar(){
    var calendar = CalendarApp.getCalendarById("example@gmail.com");
    var sheet = SpreadsheetApp.getActiveSheet();
    var lastRow = sheet.getLastRow();
    var contents = sheet.getRange(`A2:E${lastRow}`).getValues();
    for(var i = 0;i < contents.length;i++){
      var [status, day, title,startTime,endTime] = contents[i];
      if(status == "TRUE"){
        continue;
      }
      var date = new Date(day);
      console.log(title);
      if(startTime == "" || endTime == ""){
        calendar.createAllDayEvent(title, date);
      }else{
        var startDateObj = new Date(day);
        startDateObj.setHours(startTime.getHours());    
        startDateObj.setMinutes(startTime.getMinutes());
        var endDateObj = new Date(day);
        endDateObj.setHours(endTime.getHours());    
        endDateObj.setMinutes(endTime.getMinutes());
        calendar.createEvent(title, startDateObj,endDateObj);
      }
      sheet.getRange(`A${i + 2}`).setValue("TRUE");
    }
  }
  
  //https://docs.google.com/spreadsheets/d/1H5pp0qQbrzsPWcxyMu6Xn2Hid-6EjPikZOPSUy7TVFg/edit#gid=128667413
