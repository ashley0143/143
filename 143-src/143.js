/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/. */

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
          "trackForm",
          "pageview",
          "identify",
          "reset",
          "group",
          "track",
          "ready",
          "alias",
          "debug",
          "page",
          "once",
          "off",
          "on",
          "addSourceMiddleware",
          "addIntegrationMiddleware",
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
