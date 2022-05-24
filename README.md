# wtf is 143?
143 is our anon data collector (https://143.poketalebot.com/media/dnt/143.js)

143 works whit do not track and its built for privacy.

# The requests being made (if do not track is false)<br>
![image](https://user-images.githubusercontent.com/65588168/170084831-a83f913d-5b02-49e2-b0dd-5413a3aa746a.png)<br><br>
143 makes requests to these website<br>
https://cdn.segment.com/ <br>
https://www.googletagmanager.com/<br>
https://static.hotjar.com<br>
https://www.google-analytics.com<br>

all data being "shared" is anonymous and can not seen by the companies that provide these products.

# How does it work then?

143.js should look like this;
```js
if (typeof Mozilla === "undefined") {
  var Mozilla = {};
}
Mozilla.dntEnabled = function (dnt, ua) {
  "use strict";
  var dntStatus =
    dnt || navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
  var userAgent = ua || navigator.userAgent;
  var anomalousWinVersions = [
    "Windows NT 6.1",
    "Windows NT 6.2",
    "Windows NT 6.3",
  ];
  var fxMatch = userAgent.match(/Firefox\/(\d+)/);
  var ieRegEx = /MSIE|Trident/i;
  var isIE = ieRegEx.test(userAgent);
  var platform = userAgent.match(/Windows.+?(?=;)/g);
  if (isIE && typeof Array.prototype.indexOf !== "function") {
    return false;
  } else if (fxMatch && parseInt(fxMatch[1], 10) < 32) {
    dntStatus = "Unspecified";
  } else if (
    isIE &&
    platform &&
    anomalousWinVersions.indexOf(platform.toString()) !== -1
  ) {
    dntStatus = "Unspecified";
  } else {
    dntStatus = { 0: "Disabled", 1: "Enabled" }[dntStatus] || "Unspecified";
  }
  return dntStatus === "Enabled" ? true : false;
};
// only load if DNT is not enabled
if (Mozilla && !Mozilla.dntEnabled()) {
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "dataLayer", "GTM-KFFMF9J");
  window.ga =
    window.ga ||
    function () {
      (ga.q = ga.q || []).push(arguments);
    };
  ga.l = +new Date();
  ga("create", "UA-228129155-1", "poketalebot.com");
  ga("set", "anonymizeIp", true);
  ga("send", "pageview");
  var gaScript = document.createElement("script");
  gaScript.async = 1;
  gaScript.src = "https://www.google-analytics.com/analytics.js";
  document.head.appendChild(gaScript);
  !(function () {
    var analytics = (window.analytics = window.analytics || []);
    if (!analytics.initialize)
      if (analytics.invoked)
        window.console &&
          console.error &&
          console.error("Segment snippet included twice.");
      else {
        analytics.invoked = !0;
        analytics.methods = [
          "trackSubmit",
          "trackClick",
          "trackLink",
          "pageview",
          "setAnonymousId",
          "addDestinationMiddleware",
        ];
        analytics.factory = function (e) {
          return function () {
            var t = Array.prototype.slice.call(arguments);
            t.unshift(e);
            analytics.push(t);
            return analytics;
          };
        };
        for (var e = 0; e < analytics.methods.length; e++) {
          var key = analytics.methods[e];
          analytics[key] = analytics.factory(key);
        }
        analytics.load = function (key, e) {
          var t = document.createElement("script");
          t.type = "text/javascript";
          t.async = !0;
          t.src =
            "https://cdn.segment.com/analytics.js/v1/" +
            key +
            "/analytics.min.js";
          var n = document.getElementsByTagName("script")[0];
          n.parentNode.insertBefore(t, n);
          analytics._loadOptions = e;
        };
        analytics._writeKey = "lXJ2T8fqX4dnL04Goga0d6k7qFE6ymlw";
        analytics.SNIPPET_VERSION = "4.15.3";
        analytics.load("lXJ2T8fqX4dnL04Goga0d6k7qFE6ymlw");
        analytics.page();
      }
  })();
  (function (h, o, t, j, a, r) {
    h.hj =
      h.hj ||
      function () {
        (h.hj.q = h.hj.q || []).push(arguments);
      };
    h._hjSettings = { hjid: 2983344, hjsv: 6 };
    a = o.getElementsByTagName("head")[0];
    r = o.createElement("script");
    r.async = 1;
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    a.appendChild(r);
  })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
}
```
Now, let's explain each part.
```js
if (typeof Mozilla === "undefined") {
  var Mozilla = {};
}
```
in this part,we define the mozilla object.
```js
Mozilla.dntEnabled = function (dnt, ua) {
  "use strict";
  var dntStatus =
    dnt || navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
  var userAgent = ua || navigator.userAgent;
  var anomalousWinVersions = [
    "Windows NT 6.1",
    "Windows NT 6.2",
    "Windows NT 6.3",
  ];
  var fxMatch = userAgent.match(/Firefox\/(\d+)/);
  var ieRegEx = /MSIE|Trident/i;
  var isIE = ieRegEx.test(userAgent);
  var platform = userAgent.match(/Windows.+?(?=;)/g);
  if (isIE && typeof Array.prototype.indexOf !== "function") {
    return false;
  } else if (fxMatch && parseInt(fxMatch[1], 10) < 32) {
    dntStatus = "Unspecified";
  } else if (
    isIE &&
    platform &&
    anomalousWinVersions.indexOf(platform.toString()) !== -1
  ) {
    dntStatus = "Unspecified";
  } else {
    dntStatus = { 0: "Disabled", 1: "Enabled" }[dntStatus] || "Unspecified";
  }
  return dntStatus === "Enabled" ? true : false;
};
```
this part is our dnt helper (forked from:https://github.com/schalkneethling/dnt-helper)

### Google tag manager and analytics
```js
(function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "dataLayer", "GTM-KFFMF9J");
``` 
```js
  window.ga =
    window.ga ||
    function () {
      (ga.q = ga.q || []).push(arguments);
    };
  ga.l = +new Date();
  ga("create", "UA-228129155-1", "poketalebot.com");
  ga("set", "anonymizeIp", true);
  ga("send", "pageview");
  var gaScript = document.createElement("script");
  gaScript.async = 1;
  gaScript.src = "https://www.google-analytics.com/analytics.js";
  document.head.appendChild(gaScript);
```
Our gtm and ga script looks like this. Here's a very nice explanation of our use of googletagmanager and google analytics:https://bugzilla.mozilla.org/show_bug.cgi?id=1122305#c8

### Segment
segment is something different from the analytics platforms. it is more of a data management program. For more information about the segment: https://segment.com/ (its also foss!)
```js
  !(function () {
    var analytics = (window.analytics = window.analytics || []);
    if (!analytics.initialize)
      if (analytics.invoked)
        window.console &&
          console.error &&
          console.error("Segment snippet included twice.");
      else {
        analytics.invoked = !0;
        analytics.methods = [
          "trackSubmit",
          "trackClick",
          "trackLink",
          "pageview",
          "setAnonymousId",
          "addDestinationMiddleware",
        ];
        analytics.factory = function (e) {
          return function () {
            var t = Array.prototype.slice.call(arguments);
            t.unshift(e);
            analytics.push(t);
            return analytics;
          };
        };
        for (var e = 0; e < analytics.methods.length; e++) {
          var key = analytics.methods[e];
          analytics[key] = analytics.factory(key);
        }
        analytics.load = function (key, e) {
          var t = document.createElement("script");
          t.type = "text/javascript";
          t.async = !0;
          t.src =
            "https://cdn.segment.com/analytics.js/v1/" +
            key +
            "/analytics.min.js";
          var n = document.getElementsByTagName("script")[0];
          n.parentNode.insertBefore(t, n);
          analytics._loadOptions = e;
        };
        analytics._writeKey = "";
        analytics.SNIPPET_VERSION = "4.15.3";
        analytics.load("");
        analytics.page();
      }
  })();
```

### Hotjar
hotjar is a heatmap analytics program. <a href="https://hotjar.com">their website</a>
```js
(function (h, o, t, j, a, r) {
    h.hj =
      h.hj ||
      function () {
        (h.hj.q = h.hj.q || []).push(arguments);
      };
    h._hjSettings = { hjid: 2983344, hjsv: 6 };
    a = o.getElementsByTagName("head")[0];
    r = o.createElement("script");
    r.async = 1;
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    a.appendChild(r);
  })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
```

# LEGAL
Poketale products will never sell or share your data. However, we do use several telemetry to improve poketale products.

Telemetry is the collection of data regarding the activity of a particular user or device on multiple websites or applications that do not belong to the data collector, and the storage, use or sharing of this data.

Poketale can never see your secret messages, read your messages, see your email address, sell your data to other companies or collect your data. never, ever. however, we use several analytics programs to improve our products.

The data provided to these programs is completely anonymous and no company (yes, us included) can see this data.

### OPT-OUT
The poketale analytics snippet supports DO NOT TRACK or DNT signal. For more information about do not track, you can read this article: https://support.mozilla.org/en-US/kb/how-do-i-turn-do-not-track-feature

if you are not using dnt, you can use ublock origin or ddg's browser addon;
https://duckduckgo.com/app<br>
https://ublockorigin.com/
