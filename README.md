# 143 nedir?
143,poketalein kullandığı anonim veri toplayıcıdır (https://143.poketalebot.com/media/dnt/143.js)

143,do not track ile çalışır ve gizliliğe önem verir.

# 143 ün yaptığı istekler (DNT AÇIK DEĞİL İSE)<br>
![image](https://user-images.githubusercontent.com/65588168/170084831-a83f913d-5b02-49e2-b0dd-5413a3aa746a.png)<br><br>
143,şu websitelere request atar:<br>
https://cdn.segment.com/ <br>
https://www.googletagmanager.com/<br>
https://static.hotjar.com<br>
https://www.google-analytics.com<br>

tüm veriler anonimdir,ve hiç bir veri o veriyi aldığımız kişinin siz olduğunu belli etmez.

# Nasıl çalışır?


143 analitik dosyası (143.js) şöyle gözükmektedir;
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
Şimdi,her kısmı açıklayalım.
```js
if (typeof Mozilla === "undefined") {
  var Mozilla = {};
}
```
bu kısımda,mozilla objesini tanımlıyoruz.

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
bu kısım,do not track (https://support.mozilla.org/en-US/kb/how-do-i-turn-do-not-track-feature) ın açık olup olmadığını belirler.

### Google tag manager ve analytics
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
gtm ve ga scriptimiz buna benzemektedir. googletagmanager ve google analytics kullanımımız hakkında şurda çok güzel bir açıklaması vardır:<a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1122305#c8">link</a>

### Segment
segment,analatik programından daha farklı birşeydir. daha çok bir veri yönetme programıdır. segment hakkında daha fazla bilgi için : https://segment.com/
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
hotjar bir heatmap analatik programıdır. <a href="https://hotjar.com">websiteleri</a>
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

# LEGAL ŞEYLER
 
Poketale ürünleri sizin verilerinizi asla satmaz,paylaşmaz Ancak,poketale ürünlerini iyileştirmek için birkaç telemetri kullanıyoruz. 

Telemetri, belirli bir kullanıcının veya cihazın, veri toplayıcıya ait olmayan birden çok web sitesi veya uygulamadaki etkinliğine ve bu verilerin saklanması, kullanılması veya paylaşılmasına ilişkin verilerin toplanmasıdır.

Poketale asla gizli mesajlarınızı göremez,mesajlarınızı okumayaz,sizin email adresinizi göremez,verilerinizi başka firmalara satamaz veya verilerinizi toplayamaz. özel bilgilierinizi istemez veya toplamaz. asla ama asla. ancack ürünlerimizi iyileştirmek için birkaç analitik programı kullanırız. 

bu programlara sağlanan veriler,tamamen anonimdir ve herhangibi bir firma (evet,bizde dhl) bu verileri göremeyiz.

poketalein anlytics snippeti DO NOT TRACK yada DNT sinyalini destekler. do not track hakkında daha fazla bilgi için şu makaleyi okuyabilirsiniz;https://support.mozilla.org/en-US/kb/how-do-i-turn-do-not-track-feature

eğer dnt de kullnanmıyorsanız,ublock origin yada ddg nun tarayıcı eklentisini kullanbilrsiniz;
https://duckduckgo.com/app
https://ublockorigin.com/
