/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2015 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by all applicable intellectual property laws,
* including trade secret and or copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/
function dependOn(){"use strict";return[require("communicate"),require("common"),require("util"),require("proxy"),require("analytics"),require("feat"),require("googlequeryanalyzer")]}var def;require=function(e){"use strict";return e},def=window.define?window.define:function(e,t){"use strict";return t.apply(null,[{ajax:$.ajax.bind($)}])};var exports=acom_analytics={};def(dependOn(),(function(e,t,i,n,o,a,s){"use strict";var r,p,l,d,c=null;for(p in l=function(){return e.getModule("upload")},d=function(){return e.getModule("session")},r=function(){this.proxy=n.proxy.bind(this),this.LOG=t.LOG,this.uploadHandler=function(e){var n=["application/illustrator","image/bmp","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/vnd.adobe.form.fillsign","image/gif","application/x-indesign","image/jpeg","image/jpeg","application/vnd.oasis.opendocument.formula","application/vnd.oasis.opendocument.graphics","application/vnd.oasis.opendocument.presentation","application/vnd.oasis.opendocument.spreadsheet","application/vnd.oasis.opendocument.text","image/png","application/vnd.ms-powerpoint","application/vnd.openxmlformats-officedocument.presentationml.presentation","application/mspowerpoint","application/postscript","image/vnd.adobe.photoshop","application/vnd.ms-publisher","application/x-tika-msoffice","text/rtf","application/vnd.sun.xml.writer.template","application/vnd.sun.xml.draw","application/vnd.sun.xml.calc","application/vnd.sun.xml.impress","application/vnd.sun.xml.writer","text/plain","image/tiff","image/tiff","text/plain","application/vnd.ms-excel","application/msexcel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/zip"],a=e.request;e.id&&(a.assetId=e.id,i.ajax({url:t.settings.files_api+"assets/"+e.id+"/metadata",type:"GET",headers:t.GET_headers()}).done(this.proxy((function(t){if(delete a.create_path,delete a.export_path,delete a.form_path,delete a.preview_path,a.preview_path="file/"+e.id,a.send_path="send/file/"+e.id,a.fillsign=!1,o.event(o.e.UPLOAD_COMPLETE),"application/pdf"===t.content_type&&(a.export_path="exportpdf/"+e.id,a.fillsign=!0),-1!==n.indexOf(t.content_type)&&(a.create_path="convertpdf/"+e.id,a.fillsign=!1),"fillsign"===a.handleResult)delete a.handleResult,this.fill_sign(a);else if(a.handleResult){i.consoleLog("handleResult: "+a.handleResult);var s={preview:a.preview_path,image_preview:a.preview_path,export:a.export_path,send:a.send_path,to_pdf:a.create_path}[a.handleResult];o.event(o.e.REDIRECT),delete a.handleResult,d().gotoPath(s)}}))))},this.do_upload=function(e,t){var i={"upload-image":o.e.CONTEXT_UPLOAD_IMAGE,upload_link:o.e.CONTEXT_UPLOAD_LINK,upload:o.e.CONTEXT_UPLOAD_PDF_PAGE}[e.menuItem];i&&(o.event(i),delete e.menuItem),l().upload(e).done(this.proxy(this.uploadHandler))},this.sign_out=function(e,t){d().signOut()},this.dismiss=function(e,t){i.consoleLog("dismiss/ok")},this.specialCases=SETTINGS.USE_FLICKR?[{regex:/http[s]:\/\/www\.flickr\.com/,action:"flickr",lastPromptTime:null}]:[],this.handleSpecialUrl=function(t,n){var o=!1;return i.each(this.specialCases,(function(a,s){if(s.regex.test(t)){var r=!0,p=(new Date).getTime();s.lastPromptTime&&p-s.lastPromptTime<1e4&&(r=!1),r&&(s.lastPromptTime=p,i.consoleLog("INVITE: "+p),e.deferMessage({panel_op:s.action,tabId:n})),o=!0}})),o},this.fill_sign=function(e,a){(e.userSelectPromise||i.Deferred().resolve().promise()).then(this.proxy((function(){i.consoleLog("fill and sign");var a={url:t.settings.fillsign_api+"createform",contentType:"application/json",accept:t.GET_headers().Accept,type:"POST",dataType:"json",xhrFields:{withCredentials:!0},headers:t.POST_headers()};a.data=JSON.stringify({asset_id:e.assetId}),d().message("Preparing for Fill and Sign",!0),o.event(o.e.CREATE_FORM_PROGRESS_SHOWN),i.ajax(a).then(this.proxy((function(t){i.consoleLog("form created"),i.consoleLogDir(t),e.form_path="fillsign/"+t.form_id,o.event(o.e.CREATE_FORM_COMPLETE),o.event(o.e.REDIRECT),d().gotoPath(e.form_path)})),this.proxy((function(e){return i.consoleLog("form create failed"),n.REST_error(e,this),e})))})))},this.newTab=function(i,n,a){var s,r=chrome.runtime.getURL("data/js/options.html");if(SETTINGS.CHROME_VERSION<SETTINGS.SUPPORTED_VERSION)return chrome.browserAction.setIcon({path:"data/images/acrobat_dc_appicon_24.png",tabId:n}),void chrome.browserAction.enable(n);if(0!==i.indexOf(t.settings.redirect_uri+"?code=")){if(i.includes(r))return s=o.getAnalyticsUsage(),i.includes("?os=mac")?r+="?os=mac":r+="?anl="+s,SETTINGS.USE_ACROBAT||(r+="&env="+t.settings.env),i!==r?void chrome.tabs.update(n,{url:r,active:!0}):void o.event(o.e.OPTIONS_PAGE);d().checkSessionTab(n,i),e.avoidUrl(i)?e.disable(n):c.handleSpecialUrl(i,n)||e.loaded(n)}else d().foundCode(i)},this.startup=function(t,n){if(this.started||(this.newTab(t.url,n.tab.id,t.is_pdf?"application/pdf":"text/html"),this.started=!0),t.is_pdf&&e.pdf_menu(t,n),i.showFrictionlessMenu(t)&&(t.show_frictionless=!0),SETTINGS.FRICTIONLESS_ENABLED&&(SETTINGS.TEST_MODE||t.show_frictionless)&&"false"!==i.getCookie("always-show-pdftools")&&1!=t.suppress_frictionless&&s&&s.isGoogleQuery(t)){const e=s.getSearchQuery(t);e&&s.mapQueryStringToAction(e,t)}}},c||(c=new r,e.registerModule("download-manager",c)),c)c.hasOwnProperty(p)&&("function"==typeof c[p]?exports[p]=c[p].bind(c):exports[p]=c[p]);return e.registerHandlers({do_upload:c.proxy(c.do_upload),dismiss:c.proxy(c.dismiss),ok:c.proxy(c.dismiss),fillsign:c.proxy(c.fill_sign),"sign-out":c.proxy(c.sign_out),"html-startup":c.proxy(c.startup),"pdf-menu":c.proxy(c.startup)}),i.isChrome()&&chrome.tabs.onUpdated.addListener(c.proxy((function(t,i,n){"complete"===i.status?c.newTab(n.url,t):"loading"===i.status&&e.loading({id:t})}))),i.isFF()&&(c.proxy((function(){var t=require("chrome").Cu,n=t.import("resource://gre/modules/Downloads.jsm").Downloads,o=t.import("resource://gre/modules/Task.jsm").Task,a={onDownloadAdded:function(t){if(i.consoleLog("Added",t),i.consoleLog("Added Content type: "+t.contentType),!e.avoidUrl(t.source.url)){var n={filename:t.target.path.replace(/\S*(\\|\/)/,""),url:t.source.url,panel_op:"pdf_menu"};e.deferMessage(n)}}};o.spawn((function(){try{n.getList(n.ALL).then((function(e){i.consoleLogDir(e),e.addView(a)}))}catch(e){i.consoleError(e)}}))}))(),require("sdk/tabs").on("ready",(function(e){e.url;c.newTab(e.url,e.id,e.contentType)})),require("chrome").Cu.import("resource://gre/modules/Services.jsm")),c}));