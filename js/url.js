// ************************

// url parse script 1.5
// adcash-pa April 2020
// loading url paramentres
// and url cleanup
// site: unblocked-pw.github.io

// ************************

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value.replace(/%20/g, " ");
    });

    // url parametres cleaner:
    // params are stored in vars then in url_vars array
    var uri = window.location.toString();
    if (uri.indexOf("?") > 0) {
        var clean_uri = uri.substring(0, uri.indexOf("?"));
        window.history.replaceState({}, document.title, clean_uri);
    }
    return vars;
;
}

// get url vars -> store -> clean url params from url
var url_vars = getUrlVars();

// create url_vars cookie
// and reload data if action
// and zone is in the url_vars

if (url_vars["action"] != "" && url_vars["zone"] != "" && url_vars["action"] != null && url_vars["zone"] != null) {
  var url_vars_str = JSON.stringify(url_vars);
  setCookie('url_params',url_vars_str);
}

if (getCookie('url_params') != "") {
  var url_vars_json = getCookie('url_params');
  var url_vars = JSON.parse(url_vars_json);
}

// fill in data table in HTML
document.getElementById("ip").innerHTML             = url_vars["ip"];
document.getElementById("browser").innerHTML        = url_vars["browser"];
document.getElementById("device_make").innerHTML    = url_vars["device_make"];
document.getElementById("device_model").innerHTML   = url_vars["device_model"];
document.getElementById("org").innerHTML            = url_vars["org"];
document.getElementById("city").innerHTML           = url_vars["city"];

// create and load cookies
function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


// check if link has varibles and store them if true
// othervise load from storage cookie

function checkLink() {
  var click_id_link = url_vars["action"];
  var zone_link = url_vars["zone"];

  if (click_id_link != "" && click_id_link != null) {
    setCookie("click_id_cookie", click_id_link, 30);
  }

  if (zone_link != "" && zone_link != null) {
    setCookie("zone_cookie", zone_link, 30);
  }

  var click_id_cookie = getCookie("click_id_cookie");
  var zone_cookie = getCookie("zone_cookie");

  if (click_id_cookie != "" && zone_cookie != "" && click_id_cookie != null && zone_cookie != null) {
    // build and replace links
    var links = document.getElementsByTagName('a');

    for (var i = 0; i < links.length; i++) {
      var link = "https://track.ultravpn.com/5d02892a4faea/click/" + zone_cookie + "/" + click_id_cookie + "/zooqle";
      links[i].setAttribute('href', link);
    }
  }
  else {
    var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
      var link = "https://track.ultravpn.com/5d02892a4faea/click";
      links[i].setAttribute('href', link);
    }
  }
}

// detect link click and run checkLink function  //
var links = document.getElementsByTagName('a');
for(var i = 0, len = links.length; i < len; i++) {
    links[i].onclick = function() {
        // important here to be inside function() { etc. }
        //console.log('yes ( ͡☉ ͜ʖ ͡☉) '+ i);
        checkLink();
    }
}
