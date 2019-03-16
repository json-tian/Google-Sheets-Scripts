function myFunction() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  var lastRow = CountColA(sheet); 
 
  
  updateInfo(lastRow + 1, sheet, "https://www.gsmarena.com/results.php3?"); 
    
}

function CountColA(sheet){
  var data = sheet.getDataRange().getValues();
  for(var i = 1; i < data.length - 1; i++){
    if (data[i][0] == ''){
      return i;
    }
  }
}

  function updateInfo(newRow, sheet, url) {
    var RANK_INDEX = 2;
    var COMPANY_INDEX = 3;
    var MODEL_INDEX = 4;
    var RELEASE_INDEX = 5;
    var POPULARITY_INDEX = 6;
    var SCREEN_INDEX = 7;
    var RESOLUTION_INDEX = 8;
    var CAMERA_INDEX = 9;
    var RAM_INDEX = 10;
    var BATTERY_INDEX = 11;
    var TECHNOLOGY_INDEX = 12;
    var STORAGE_INDEX = 13;
    var ANDROID_INDEX = 14;
    var WEIGHT_INDEX = 15;
    var THICKNESS_INDEX = 16;
    var HITS_INDEX = 17;
    
    var content = UrlFetchApp.fetch(url).getContentText();
    var phoneContent;
    //Logger.log(content.substring(5000));

    for (var i = 0; i < 25; i++) {
      var date = sheet.getRange(newRow + i, 1);
      date.setValue(new Date());
      
      var rank = sheet.getRange(newRow + i, RANK_INDEX);
      rank.setValue(i + 1);
      
      var company = sheet.getRange(newRow + i, COMPANY_INDEX);
      var temp = getData(content, '<strong><span>', "</span>", i);
      var data = temp.split("<br>");
      company.setValue(data[0]);
      
      var model = sheet.getRange(newRow + i, MODEL_INDEX);
      model.setValue(data[1]);
      
      var phoneUrl = getData(content, '<li><a href="', '">', i + 10);
      phoneUrl = "gsmarena.com/" + phoneUrl;
      phoneContent = UrlFetchApp.fetch(phoneUrl).getContentText();
      
      var release = sheet.getRange(newRow + i, RELEASE_INDEX);
      release.setValue(getData(phoneContent, '<span data-spec="released-hl">', "</span>", 0));
      
      var popular = sheet.getRange(newRow + i, POPULARITY_INDEX);
      popular.setValue(getData(phoneContent, '<i class="head-icon icon-popularity"></i>', "</strong>", 0));
      
      var screen = sheet.getRange(newRow + i, SCREEN_INDEX);
      screen.setValue(getData(phoneContent, '<span data-spec="displaysize-hl">', "</span>", 0));
      
      var resolution = sheet.getRange(newRow + i, RESOLUTION_INDEX);
      resolution.setValue(getData(phoneContent, '<div data-spec="displayres-hl">', " pixels", 0));
      
      var camera = sheet.getRange(newRow + i, CAMERA_INDEX);
      camera.setValue(getData(phoneContent, '<span data-spec="camerapixels-hl">', "</span>", 0));
      
      var ram = sheet.getRange(newRow + i, RAM_INDEX);
      ram.setValue(getData(phoneContent, '<span data-spec="ramsize-hl">', "</span>", 0));
      
      var battery = sheet.getRange(newRow + i, BATTERY_INDEX);
      battery.setValue(getData(phoneContent, '<span data-spec="batsize-hl">', "</span>", 0));
      
      var tech = sheet.getRange(newRow + i, TECHNOLOGY_INDEX);
      tech.setValue(getData(phoneContent, '<div data-spec="battype-hl">', "</div>", 0));
      
      var storage = sheet.getRange(newRow + i, STORAGE_INDEX);
      storage.setValue(getData(phoneContent, '<td class="nfo" data-spec="internalmemory">', "</td>", 0));
      
      var android = sheet.getRange(newRow + i, ANDROID_INDEX);
      android.setValue(getData(phoneContent, '<td class="nfo" data-spec="os">', "</td>", 0));
      
      var weight = sheet.getRange(newRow + i, WEIGHT_INDEX);
      weight.setValue(getData(phoneContent, '<td class="nfo" data-spec="weight">', "</td>", 0));
      
      var thickness = sheet.getRange(newRow + i, THICKNESS_INDEX);
      thickness.setValue(getData(phoneContent, 'data-spec="dimensions">', "</td>", 0));
      
      var hits = sheet.getRange(newRow + i, HITS_INDEX);
      hits.setValue(getData(phoneContent, '%</strong>', "</span>", 0).substring(14));
    }
  }

function getData(content, fromText, toText, skips) {
  var found = 0;
  outerloop:
  for (var i = 0; i < content.length - fromText.length; i ++) {
    if (content.substring(i, i + fromText.length) == (fromText)) {
      if (found == skips) {
        content = content.substring(i + fromText.length);
        break outerloop;
      } else {
        found++;
      }
    }
  }
  
  for (var i = 0; i < content.length - toText.length; i ++) {
    if (content.substring(i, i + toText.length) == (toText)) {
      content = content.substring(0, i);
      break
    }
  }

  return content;
}
