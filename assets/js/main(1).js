var name = "";
function createHtml(data) {
  tableRows = '<tr><th>ID</th><th>USERID</th><th>TITLE</th><th>BODY</th></tr>'
  for(var i=0 ; i<data.length; i++) {
    console.log(data[i])
    
    tableRows = tableRows + '<tr><td>' + data[i]["id"] + '</td><td>' + data[i]["userId"] + '</td><td>' + data[i]["title"] + '</td><td>' + data[i]["body"] + '</td></tr>'
  }
  console.log(tableRows)
  $(tableRows).appendTo($('.resultData'));
};

function getApiResponse(message) {
  if($.trim(message) == '') {
    return false;
  }
  // var params = {'msg':message};
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function(e) {
    if (xhttp.readyState === 4) {
      if (xhttp.status === 200) {
        var response = JSON.parse(xhttp.responseText); 
        createHtml(response);
      } 
    }
  }

  xhttp.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(); 
}

$('.submit').click(function() {
  removePreExistingData();
  message = $(".msg-input").val();
  getApiResponse(message);
});

$('.msg-input').on('keydown', function(e) {
  if (e.keyCode == 13) {
    message = $(".msg-input").val();
    if($.trim(message) == '') {
      return false;
    }
    getApiResponse(message);
  }
});