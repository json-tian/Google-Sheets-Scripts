
function updateDMOJ() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  var lastRow = CountColA(sheet);
  //Logger.log(lastRow);
  var formulas = sheet.getRange(lastRow, 1, 1, 17);
  var newRange = sheet.getRange(lastRow + 1, 1, 1, 17);
  formulas.copyTo(newRange);
  
  var date = sheet.getRange(lastRow + 1, 1);
  date.setValue(new Date());
  
  updateInfo(lastRow + 1, sheet, 0, "https://dmoj.ca/user/jason6");
  updateInfo(lastRow + 1, sheet, 6, "https://dmoj.ca/user/jacob_tian");
  
}

function CountColA(sheet){
  var data = sheet.getDataRange().getValues();
  for(var i = 1; i < data.length - 1; i++){
    if (data[i][0] == ''){
      return i;
    }
  }
}

function updateInfo(newRow, sheet, gap, url) {
  var P_RANK_INDEX = 2 + gap;
  var PROBLEMS_INDEX = 3 + gap;
  var POINTS_INDEX = 4 + gap;
  var R_RANK_INDEX = 5 + gap;
  var RATING_INDEX = 6 + gap;
  
  var pRank = sheet.getRange(newRow, P_RANK_INDEX);
  pRank.setValue(getData(url, '<div><b class="semibold">Rank by points:</b> #', "</div>"));
  
  var problems = sheet.getRange(newRow, PROBLEMS_INDEX);
  problems.setValue(getData(url, 'width="135px" height="135px">\n</div>\n<br>\n<div><b>', " problems solved</b></div>"));
  
  var points = sheet.getRange(newRow, POINTS_INDEX);
  points.setValue(Math.round(getData(url, '<b class="semibold">Total points:</b>\n<span title="', '"')));
  
  var rRank = sheet.getRange(newRow, R_RANK_INDEX);
  rRank.setValue(getData(url, '<div><b class="semibold">Rank by rating:</b> #', '</div>'));
  
  var rating = sheet.getRange(newRow, RATING_INDEX);
  var ratingType = getData(url, '<div><b class="semibold">Rating:</b> <span class="rate-group"><span class="rate-box ', '"');
  rating.setValue(getData(url, 'rating ' + ratingType + '">', '<'));
  
  var ratingColour = getType(ratingType);
  Logger.log(ratingColour);
  rating.setFontColor(ratingColour);
}


function getData(url, fromText, toText) {
  var content = UrlFetchApp.fetch(url).getContentText();
  
  for (var i = 0; i < content.length - fromText.length; i ++) {
    if (content.substring(i, i + fromText.length) == (fromText)) {
      content = content.substring(i + fromText.length);
      break;
    }
  }
  
  for (var i = 0; i < content.length - toText.length; i ++) {
    if (content.substring(i, i + toText.length) == (toText)) {
      content = content.substring(0, i);
      break
    }
  }
  
  Logger.log(content);
  return content;
}

function getType(ratingType) {
  var textColour;
  switch (ratingType) {
    case "rate-newbie":
      textColour = '#999999';
      break;
    case "amateur":
      textColour = '#23c43e';
      break;
    case "rate-expert":
      textColour = '#1155cc';
      break;
    case "rate-candidate-master":
      textColour = '#674ea7';
      break;
    case "rate-master":
      textColour = '#f1c232';
      break;
    case "rate-grandmaster":
      textColour = '#cc0000';
      break;
    case "rate-target":
      textColour = '#cc0000';
      break;
    default:
      textColour = '#000000';
      break;
    
  }
  return textColour;
}


