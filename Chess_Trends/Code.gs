
function chessUpdate() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  Logger.log(sheet);
  var lastRow = CountColA(sheet);
  
  var date = sheet.getRange(lastRow + 1, 1);
  date.setValue(Utilities.formatDate(new Date(), "GMT-5", "MM/dd/yyyy HH:mm"));
  
  updateChessCom(lastRow + 1, sheet);
  updateLichess(lastRow + 1, sheet);  
}

function CountColA(sheet){
  var data = sheet.getDataRange().getValues();
  for(var i = 1; i < data.length; i++){
    if (data[i][0] == ''){
      return i;
    }
  }
}

function updateChessCom(newRow, sheet) {
  var url = "https://www.chess.com";
  var MEMBERS_INDEX = 2;
  var GAMES_PLAYED_INDEX = 3;
  var PLAYERS_ONLINE_INDEX = 4;
  var TITLED_ONLINE_INDEX = 5;
  
  var content = UrlFetchApp.fetch(url).getContentText();

  var members = sheet.getRange(newRow, MEMBERS_INDEX);
  members.setValue(getData(content, '<span class="social-members-quantity">', "<", 0));
  
  var games = sheet.getRange(newRow, GAMES_PLAYED_INDEX);
  games.setValue(getData(content, '<span class="social-members-quantity">', "<", 1));
  
  var online = sheet.getRange(newRow, PLAYERS_ONLINE_INDEX);
  online.setValue(getData(content, '<span class="social-members-quantity">', "<", 2));
  
  var titled = sheet.getRange(newRow, TITLED_ONLINE_INDEX);
  titled.setValue(getData(content, '<span class="social-members-quantity">', '<', 3));
 
}

function updateLichess(newRow, sheet) {
  var url = "https://lichess.org";
  var bullet_url = "https://lichess.org/stat/rating/distribution/bullet";
  var blitz_url = "https://lichess.org/stat/rating/distribution/blitz";
  var rapid_url = "https://lichess.org/stat/rating/distribution/rapid";
  var classical_url = "https://lichess.org/stat/rating/distribution/classical";
  var ultra_bullet_url = "https://lichess.org/stat/rating/distribution/ultraBullet";
  var crazyhouse_url = "https://lichess.org/stat/rating/distribution/crazyhouse";
  var chess960_url = "https://lichess.org/stat/rating/distribution/chess960";
  var king_url = "https://lichess.org/stat/rating/distribution/kingOfTheHill";
  var three_url = "https://lichess.org/stat/rating/distribution/threeCheck";
  var anti_url = "https://lichess.org/stat/rating/distribution/antichess";
  var atomic_url = "https://lichess.org/stat/rating/distribution/atomic";
  var horde_url = "https://lichess.org/stat/rating/distribution/horde";
  var racingkings_url = "https://lichess.org/stat/rating/distribution/racingKings";
  var ONLINE_INDEX = 6;
  var BULLET_INDEX = 7;
  var BLITZ_INDEX = 8;
  var RAPID_INDEX = 9;
  var CLASSICAL_INDEX = 10;
  var ULTRA_BULLET_INDEX = 11;
  var CRAZYHOUSE_INDEX = 12;
  var CHESS960_INDEX = 13;
  var KING_INDEX = 14;
  var THREE_INDEX = 15;
  var ANTI_INDEX = 16;
  var ATOMIC_INDEX = 17;
  var HORDE_INDEX = 18;
  var RACING_INDEX = 19;
  
  var content = UrlFetchApp.fetch(url).getContentText();
  Logger.log(content);
  
  var online = sheet.getRange(newRow, ONLINE_INDEX);
  online.setValue(getData(content, 'href="/games"><span>', "<", 0));
  
  var content = UrlFetchApp.fetch(bullet_url).getContentText();
  var data = sheet.getRange(newRow, BULLET_INDEX);
  data.setValue(getData(content, '<strong>', "<", 13));
  
  var content = UrlFetchApp.fetch(blitz_url).getContentText();
  var data = sheet.getRange(newRow, BLITZ_INDEX);
  data.setValue(getData(content, '<strong>', "<", 13));
  
  var content = UrlFetchApp.fetch(rapid_url).getContentText();
  var data = sheet.getRange(newRow, RAPID_INDEX);
  data.setValue(getData(content, '<strong>', "<", 13));
  
  var content = UrlFetchApp.fetch(classical_url).getContentText();
  var data = sheet.getRange(newRow, CLASSICAL_INDEX);
  data.setValue(getData(content, '<strong>', "<", 13));
  
  var content = UrlFetchApp.fetch(ultra_bullet_url).getContentText();
  var data = sheet.getRange(newRow, ULTRA_BULLET_INDEX);
  data.setValue(getData(content, '<strong>', "<", 13));
  
  var content = UrlFetchApp.fetch(crazyhouse_url).getContentText();
  var data = sheet.getRange(newRow, CRAZYHOUSE_INDEX);
  data.setValue(getData(content, '<strong>', "<", 13));
  
  var content = UrlFetchApp.fetch(chess960_url).getContentText();
  var data = sheet.getRange(newRow, CHESS960_INDEX);
  data.setValue(getData(content, '<strong>', "<", 13));
  
  var content = UrlFetchApp.fetch(king_url).getContentText();
  var data = sheet.getRange(newRow, KING_INDEX);
  data.setValue(getData(content, '<strong>', "<", 13));
  
  var content = UrlFetchApp.fetch(three_url).getContentText();
  var data = sheet.getRange(newRow, THREE_INDEX);
  data.setValue(getData(content, '<strong>', "<", 13));
  
  var content = UrlFetchApp.fetch(anti_url).getContentText();
  var data = sheet.getRange(newRow, ANTI_INDEX);
  data.setValue(getData(content, '<strong>', "<", 13));
  
  var content = UrlFetchApp.fetch(atomic_url).getContentText();
  var data = sheet.getRange(newRow, ATOMIC_INDEX);
  data.setValue(getData(content, '<strong>', "<", 13));
  
  var content = UrlFetchApp.fetch(horde_url).getContentText();
  var data = sheet.getRange(newRow, HORDE_INDEX);
  data.setValue(getData(content, '<strong>', "<", 13));
  
  var content = UrlFetchApp.fetch(racingkings_url).getContentText();
  var data = sheet.getRange(newRow, RACING_INDEX);
  data.setValue(getData(content, '<strong>', "<", 13));
}


function getData(content, fromText, toText, skips) {
  var passed = 0;
  outerloop:
  for (var i = 0; i < content.length - fromText.length; i ++) {
    if (content.substring(i, i + fromText.length) == (fromText)) {
      if (passed == skips) {
        content = content.substring(i + fromText.length);
        break outerloop;
      } else {
        passed ++;
      }
    }
  }
  
  for (var i = 0; i < content.length - toText.length; i ++) {
    if (content.substring(i, i + toText.length) == (toText)) {
      content = content.substring(0, i);
      break;
    }
  }
  
  Logger.log(content);
  return content;
}



