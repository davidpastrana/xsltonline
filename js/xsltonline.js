function copyToClipboard(text) {
    var $temp = $("<textarea>");
    $("body").append($temp);
    $temp.val(text).select();
    document.execCommand("copy");
    $temp.remove();
    $("#copy-note-msg").html("Copied to Clipboard.");
    $('#copy-note-msg').removeClass("hide");
    $('#copy-note-msg').fadeIn().delay(1000).fadeOut();
    editorAce.getValue();
}
var globalurl = "/";
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            name = c.substring(name.length, c.length);
            return name.replace(/\+/g,' ');
        }
    }
    return "";
}
function loadJs(jsName){
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = globalurl+"js/"+jsName+".js";
    script.onload = function () {
        console.log('Loaded script');
        console.log(this);
    };
    document.head.appendChild(script);
}



$(function() {
  
  var myPass = localStorage['pwd'] || 'error';
  
  //console.log("password is "+localStorage['pwd']);
  if(localStorage['pwd']==='samples') {
  $('.sghidden,#sample,#sample2,#sampleSG,#sample2SG,#dLabel,#dLabel2,#dLabel3,#dLabel4,#dLabel5,#dLabel6').show();
  $('#login').hide();$('#logout').show();$('#sampleStd,#sample2Std').hide();
  } else {$('#login').show();$('#logout').hide();$('#sampleSG,#sample2SG').hide()}
  
  $("#me").click();
  
  if($("#template").length != 0) {
  var zone2 = new FileDrop('template', {input: false});
  
  zone2.event('upload', function (e) {
              
              zone2.eventFiles(e).each(function (file) {
                                       console.log("im in template");
                                       if(file.size != undefined && file.size != null &&  file.size > 1000000){
                                       openErrorDialog("File size is not supported more 1MB");
                                       return false;
                                       }
                                       file.readData(
                                                     function (str) {
                                                     //setFileName(1, file.name);
                                                     setToEditorTemplate(str);
                                                     },
                                                     function () { alert('Problem reading this file.'); },
                                                     'text'
                                                     );
                                       });
              });
  }
  if($("#payload").length != 0) {
  var zone1 = new FileDrop('payload', {input: false});
  
  zone1.event('upload', function (e) {
              
              
              zone1.eventFiles(e).each(function (file) {
                                       console.log("im in payload");
                                       if(file.size != undefined && file.size != null &&  file.size > 1000000){
                                       openErrorDialog("File size is not supported more 1MB");
                                       return false;
                                       }
                                       file.readData(
                                                     function (str) {
                                                     //setFileName(2, file.name);
                                                     setToEditorPayload(str);
                                                     },
                                                     function () { alert('Problem reading this file.'); },
                                                     'text'
                                                     );
                                       });
              });
  }
  
  if($("#postprocessingtemp").length != 0) {
  var zone3 = new FileDrop('postprocessingtemp', {input: false});
  
  zone3.event('upload', function (e) {
              zone3.eventFiles(e).each(function (file) {
                                       if(file.size != undefined && file.size != null &&  file.size > 1000000){
                                       openErrorDialog("File size is not supported more 1MB");
                                       return false;
                                       }
                                       file.readData(
                                                     function (str) {
                                                     //setFileName(1, file.name);
                                                     setToEditorPPTempl(str);
                                                     },
                                                     function () { alert('Problem reading this file.'); },
                                                     'text'
                                                     );
                                       });
              });
  }
  if($("#goldenxml").length != 0) {
  var zone4 = new FileDrop('goldenxml', {input: false});
  
  zone4.event('upload', function (e) {
              zone4.eventFiles(e).each(function (file) {
                                       if(file.size != undefined && file.size != null &&  file.size > 1000000){
                                       openErrorDialog("File size is not supported more 1MB");
                                       return false;
                                       }
                                       file.readData(
                                                     function (str) {
                                                     //setFileName(1, file.name);
                                                     setToEditorGoldenXML(str);
                                                     },
                                                     function () { alert('Problem reading this file.'); },
                                                     'text'
                                                     );
                                       });
              });
  }
  if($("#postprocessingview").length != 0) {
  var zone5 = new FileDrop('postprocessingview', {input: false});
  
  zone5.event('upload', function (e) {
              zone5.eventFiles(e).each(function (file) {
                                       if(file.size != undefined && file.size != null &&  file.size > 1000000){
                                       openErrorDialog("File size is not supported more 1MB");
                                       return false;
                                       }
                                       file.readData(
                                                     function (str) {
                                                     //setFileName(1, file.name);
                                                     setToEditorPPView(str);
                                                     },
                                                     function () { alert('Problem reading this file.'); },
                                                     'text'
                                                     );
                                       });
              });
  }
  /*else{
   var zone = new FileDrop('cbBody', {input: false});
   
   zone.event('upload', function (e) {
   zone.eventFiles(e).each(function (file) {
   if(file.size != undefined && file.size != null &&  file.size > 1000000){
   openErrorDialog("File size is not supported more 1MB");
   return false;
   }
   file.readData(
   function (str) {
   //setToEditor(str);
   },
   function () { openErrorDialog('Problem reading this file.'); },
   'text'
   );
   });
   });
   }*/
  
  
  
  validateXML('#editor','#hResult');
  validateXML('#editor2','#hResult2');
  validateXML('#editor3','#hResult3');
  validateXML('#editor4','#hResult4');
  validateXML('#editor5','#hResult5');
  validateXML('#editor6','#hResult6');
  $(".lined").linedtextarea({selectedLine: 1});
  
  
  
  $(window).on('load', function() {
               $('#preloader').fadeOut('fast',function(){$(this).remove();});
               
               
               $('.dropdown-menu').on('click', function(e) {
                                      e.stopPropagation();
                                      });
               });
  $('#copy-dynamic').click(function() {
                           if(viewname == "word-to-html-converter"){
                           copyToClipboard($('textarea[name="RESULT"]').text());
                           return;
                           }
                           copyToClipboard(editorAce6.getValue());
                           });
  $('#copy-dynamic2').click(function() {
                            if(viewname == "word-to-html-converter"){
                            copyToClipboard($('textarea[name="ERROR"]').text());
                            return;
                            }
                            copyToClipboard(editorAce.getValue());
                            });
  $('#copy-dynamic3').click(function() {
                            if(viewname == "word-to-html-converter"){
                            copyToClipboard($('textarea[name="PAYLOAD"]').text());
                            return;
                            }
                            copyToClipboard(editorAce.getValue());
                            });
  $('#copy-dynamic4').click(function() {
                            if(viewname == "word-to-html-converter"){
                            copyToClipboard($('textarea[name="TEMPLATE"]').text());
                            return;
                            }
                            copyToClipboard(editorAce2.getValue());
                            });
  $('#copy-dynamic5').click(function() {
                            if(viewname == "word-to-html-converter"){
                            copyToClipboard($('textarea[name="POSTPROCESSING_TEMP"]').text());
                            return;
                            }
                            copyToClipboard(editorAce3.getValue());
                            });
  $('#copy-dynamic6').click(function() {
                            if(viewname == "word-to-html-converter"){
                            copyToClipboard($('textarea[name="GOLDENXML"]').text());
                            return;
                            }
                            copyToClipboard(editorAce4.getValue());
                            });
  $('#copy-dynamic7').click(function() {
                            if(viewname == "word-to-html-converter"){
                            copyToClipboard($('textarea[name="POSTPROCESSING_VIEW"]').text());
                            return;
                            }
                            copyToClipboard(editorAce5.getValue());
                            });
  
  });

