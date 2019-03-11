var isXmlData = true, editorAce, editorAce2,editorAce3,editorAce4,editorAce5,editorAce6,editorResult, viewname, converted = "", arr = [], flag = true, mode, json = "", editor;
$(document).ready(function() {
                  
                  $(".btn").addClass("span11");
                  
                  $('textarea').on('change paste keyup',function(){
                                   updateCounter(this);
                                   });
                  
                  $(".navtoggle").click(function() {
                                        $(".mainnav").toggle("slow");
                                        $(".navtoggle").toggle("slow");
                                        $(".navtoggleclose").toggle("slow");
                                        $(".navbutton").toggle("slow");
                                        });
                  
                  $(".navtoggleclose").click(function() {
                                             $(".mainnav").toggle("slow");
                                             $(".navtoggle").toggle("slow");
                                             $(".navbutton").toggle("slow");
                                             $(".navtoggleclose").toggle("slow");
                                             });
                  
                  $(window).resize(
                                   function() {
                                   $(".ui-dialog-content").dialog("option", "position",
                                                                  [ 'center', 'center' ]);
                                   });
                  
                  
                  
                  //changing css for base64 for supported for IE.
                  
                  if(msieversion() ||  navigator.userAgent.toLowerCase().indexOf('firefox') > -1 || /Edge\/\d./i.test(navigator.userAgent)){
                  $('.cblogoimage').prepend('<img src="/img/codebeautify_logo.png" alt="Code Beautify" />');
                  }
                  
                  $('.close1').click(function() {
                                     $(".ui-dialog-content").dialog("destroy");
                                     });
                  
                  $(".btn,.span11").on('click', function() {
                                       
                                       // fsr1==1 means right side div on full screen mode
                                       if (fsr1 == 1) {
                                       fullScreenRight();
                                       }
                                       
                                       // fsr==1 means left side div on full screen mode
                                       else if (fsr == 1) {
                                       fullScreenLeft();
                                       }
                                       });
                  
                  
                  /** ********start footerwitheditors js code ************ */
                  
                  $("#more").click(function() {
                                   
                                   $('html, body').animate({
                                                           scrollTop : $(".footer_container").offset().top
                                                           }, 1000);
                                   });
                  // hide #back-top first
                  $("#back-top").hide();
                  
                  // fade in #back-top
                  $(function() {
                    $(window).scroll(function() {
                                     if ($(this).scrollTop() > 100) {
                                     $('#back-top').fadeIn();
                                     } else {
                                     $('#back-top').fadeOut();
                                     }
                                     });
                    
                    // scroll body to 0px on click
                    $('#back-top a').click(function() {
                                           $('body,html').animate({
                                                                  scrollTop : 0
                                                                  }, 800);
                                           return false;
                                           });
                    });
                  // this for temporary to get file input on page
                  
                  });

function msieversion() {
    
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer, return version number
        return true
        else                 // If another browser, return 0
            return false;
    
    return false;
}

function redirect(url) {
    window.location = "/" + url;
}

$(document).ajaxSend(function(event, jqxhr, settings) {
                     
                     if (settings.url != "/service/check_url") {
                     if (settings.url != "/service/wordcount" && settings.url != "/service/saveKeywordHistory") {
                     showProgress();
                     } else {
                     $("#counterLoader").show();
                     }
                     
                     }
                     });

$(document).ajaxComplete(function(event, jqxhr, settings) {
                         
                         if (settings.url != "/service/wordcount") {
                         hideProgress();
                         $("#path").val("");
                         } else {
                         $("#counterLoader").hide();
                         }
                         });
var spinnerVisible = false;

function showProgress() {
    
    $(".some_other_box").css({
                             width : 0,
                             'display' : 'block'
                             });
    $(".some_other_box").animate({
                                 width : "90%",
                                 display : "block",
                                 
                                 }, 1000);
};
function hideProgress() {
    
    $(".some_other_box").animate({
                                 width : "100%",
                                 display : "none",
                                 }, 1000, function() {
                                 $(this).hide();
                                 });
};

function openFile(editorid, btnID, fileExt) {
    
    var isEditorAce = null;
    if (editorid==='#editor') {
        isEditorAce = editorAce;
    }
    if (editorid==='#editor2') {
        isEditorAce = editorAce2;
    }
    if (editorid==='#editor3') {
        isEditorAce = editorAce3;
    }
    if (editorid==='#editor4') {
        isEditorAce = editorAce4;
    }
    if (editorid==='#editor5') {
        isEditorAce = editorAce5;
    }
    if (editorid==='#editor6') {
        isEditorAce = editorAce6;
    }
    
    new AjaxUpload($('#' + btnID), {
                   action : globalurl + "readfile/uploadFile",
                   name : 'userfile',
                   onSubmit : function(file, ext1) {
                   if($('[name="userfile"]')[0].files[0] == undefined){
                   openErrorDialog("Something went wrong Please refresh page");
                   return false;
                   }
                   var size = $('[name="userfile"]')[0].files[0].size;
                   if(size > 1000000){
                   openErrorDialog("File size is not supported more 1MB");
                   return false;
                   }
                   
                   var ext = ext1[0];
                   if (fileExt == "Excel") {
                   if (!ext.trim().startsWith('xls')) {
                   openErrorDialog("Selected file is not Excel File");
                   return false;
                   }
                   }else if (fileExt == "Word") {
                   if (!ext.trim().startsWith('doc')) {
                   openErrorDialog("Selected file is not Word File");
                   return false;
                   }
                   } else if (fileExt != "any" && fileExt != ext && ext.trim() != "txt") {
                   openErrorDialog("Selected file is not " + fileExt + " and txt file");
                   return false;
                   } else if (fileExt == "any") {
                   if (ext == "jpeg" || ext == "png" || ext == "jpg"
                       || ext == "gif" || ext == "bmp" || ext == "pdf"
                       || ext == "pptx" || ext == "ppt") {
                   openErrorDialog("Selected file is not supported");
                   return false;
                   }
                   }
                   
                   showProgress();
                   
                   },
                   onComplete : function(file, response) {
                   console.log(response)
                   if (response != 'error') {
                   readFile(isEditorAce,response, btnID);
                   } else {
                   openErrorDialog("Error in Loading File.");
                   }
                   
                   hideProgress();
                   
                   }
                   });
    
}
function readFile(isEditorAce,fName, btnID) {
    
    console.log("the btnID is "+btnID);
    var url = "readfile/readFile";
    
    if (btnID == "excelTohtml" || btnID == "excelToxml" || btnID == "excelTojson") {
        url = "readfile/convertHTML";
        $("#fName").text(fName);
    }
    else if (btnID == "wordTohtml") {
        url = "readfile/WordToHTML";
        $("#fName").text(fName);
    }
    
    $.ajax({
           type : "post",
           url : globalurl + url,
           data : {
           fileName : fName,
           btnID : btnID
           },
           success : function(response) {
           
           if (response != 'error') {
           
           if(btnID == "excelToxml"){
           excelTOXml(response);
           return false;
           }
           else if(btnID == "excelTojson"){
           excelToJson(response);
           return false;
           }
           else if(btnID == "excelTohtml" || btnID == "wordTohtml"){
           htmlOutput(response);
           return false;
           }
           else if (btnID == "F2") {
           setFileName(2, fName);
           setToEditor2(response);
           return false;
           } else if (btnID == "F1") {
           setFileName(1, fName);
           }
           setToEditor(isEditorAce,response);
           
           } else {
           openErrorDialog("Error in Loading File.");
           $("#fName").text("");
           }
           },
           error : function(e, s, a) {
           openErrorDialog("Failed to load data=" + s);
           console.log(e);
           $("#fName").text("");
           }
           });
}

function openFileImage(btnID, fileExt) {
    
    new AjaxUpload($('#' + btnID), {
                   action : globalurl + "convter/convertToBase64",
                   name : 'userfile',
                   onSubmit : function(file, ext1) {
                   var ext = ext1[0];
                   
                   if (ext == "jpeg" || ext == "png" || ext == "jpg" || ext == "gif"
                       || ext == "bmp" || ext == "psd") {
                   showProgress();
                   return true;
                   } else {
                   openErrorDialog("Please Select Image File Only...!");
                   return false;
                   }
                   
                   },
                   onComplete : function(file, response) {
                   
                   if (response != 'error' && response.search("Filename") == -1) {
                   // console.log(response);
                   $("#baseConvertImage").prop('src', response);
                   $("#baseConvertImage").removeClass("baseurlopa").addClass(
                                                                             "baseurlopa1");
                   
                   $("#baseConvertImageTag").val("<img src='" + response + "'/>");
                   $("#baseConvertImageCSS").val(
                                                 "background-image: url(" + response + ")");
                   
                   $("#base64String").val(response.split('base64,')[1]);
                   
                   $("#allcontents").css("display", 'Block');
                   $("#allcontents").css("margin", ' 53px 0px 0px');
                   
                   } else {
                   openErrorDialog("Error in Loading File.");
                   }
                   
                   hideProgress();
                   
                   }
                   });
    
}

function getDataFromUrlId(urlid) {
    $.ajax({
           type : "post",
           url : globalurl + "service/getDataFromID",
           dataType : "text",
           data : {
           urlid : urlid
           },
           success : function(response) {
           
           if($("#viewName").val().trim() == "collabe-code"){
           setEditorCallabe(response);
           }
           else{
           setToEditor(response.trim());
           }
           $(".sharelinkurl").attr("st_url", window.location);
           $(".sharelinkurl").attr("st_title", $("#save_link_title").val());
           },
           error : function(e, s, a) {
           openErrorDialog("Failed to load data=" + s);
           
           }
           });
}

function convertToCSV(typedata) {
    var content = editorAce.getValue();
    var validXML = true;
    if (content.trim().length > 0) {
        var data = "";
        if (typedata == 'xml') {
            data = editorAce.getValue();
            
        } else if (typedata == 'json') {
            var obj = editorAce.getValue();
            var xotree = new XML.ObjTree();
            data = xotree.writeXML(JSON.parse(obj));
            
        }
        
        if (validXML) {
            $.ajax({
                   type : "post",
                   url : globalurl + "convter",
                   data : {
                   type : 'xml2csv',
                   data : data
                   },
                   success : function(response) {
                   var blob = new Blob([ "" + response + "" ], {
                                       type : "text/plain;charset=utf-8"
                                       });
                   if (typedata == 'xml') {
                   saveAs(blob, "xml2csv.csv");
                   } else if (typedata == 'json') {
                   saveAs(blob, "json2csv.csv");
                   }
                   
                   },
                   error : function(e) {
                   openErrorDialog("Failed to Convert into CSV");
                   }
                   });
        }
    }
    
}

function setToEditor(editorAce,data) {
    isXmlData = true;
    /*if(mode.value=='tree')
     {
     editorResult.getSession().setMode("ace/mode/tree");
     editor.setMode('tree');
     }
     else{*/
    //alert(viewname);
    if(viewname !='xmlvalidate' && viewname !='xml-to-excel-converter' && viewname!='online-xml-editor')
    {
        editorResult.getSession().setMode("ace/mode/json");
    }
    
    editorAce.setValue(data);
    if (viewname == 'xmlviewer') {
        //xmlTreeView();
    } else if (viewname == 'xml-to-csv-converter') {
        xmlTocsv();
    } else if (viewname == 'xml-to-yaml') {
        XMLToYAML();
    } else if (viewname == 'xmltojson') {
        xmlTojson();
    }
    
    else if (viewname == 'xmlvalidate') {
        validateXML();
    }
    else if (viewname == 'online-xml-editor') {
        xmlTreeView();
    }else if (viewname == 'xml-to-java-converter') {
        convertXMLToJava();
    }
}

function getSampleData(editorid) {

    
    
    var viewname = $("#viewName").val().trim();
    
    if(viewname=="jsonviewer" || viewname=="json-escape-unescape" || viewname=="jsontoxml" || viewname=="json-to-csv" || viewname=="online-json-editor"
       || viewname=="json-to-yaml" || viewname=="json-to-html-converter" || viewname=="json-to-tsv-converter" || viewname=="jsonminifier" || viewname=="json-to-java-converter"){
        getJsonSampleData();
    }
    else if(viewname == "un-google-link"){
        setToEditor("https://www.google.co.in/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwjB7JO54LDJAhULV44KHQQYB1cQFggbMAA&url=http%3A%2F%2Fcodebeautify.org%2F&usg=AFQjCNG_DKhs4g3mbjzuEWxEa2aHGfqYgw&sig2=a54qV321O8wYGpJ2kbfCNg&bvm=bv.108194040,d.c2E");
    }
    else if(viewname=="xmlviewer" || viewname=="xml-to-tsv-converter" || viewname=="online-xml-editor" || viewname=="xmltojson" || viewname=="xml-to-yaml" || viewname=="xml-to-csv-converter" || viewname=="xml-to-html-converter"
            || viewname=="xml-to-java-converter"){
        getXMLSampleData(editorid);
    }
    else if(viewname=="text-to-html-converter")
    {
        setToEditor("The five-paragraph essay is a format of essay having five paragraphs: one introductory paragraph, three body paragraphs with support and development, and one concluding paragraph");
    }
    else if(viewname=="sql-escape-unescape"){
        setToEditor("select * from table where value = 'in single quote '' is offensive'");
    }
    else if(viewname == "collabe-code"){
        var data = "p{border : solid 1px;width : 100%;}";
        data = data + "##$$123456789$$##";
        data = data + "<html> <body> <h1>Welcome!</h1> <p>This is the live preview</p> <p>Edit the HTML and CSS here to start experimenting!</p> <p>The full screen button is in the bottom corner!</p> </body> </html>";
        setEditorCallabe(data);
    }
    else if (viewname == "word-to-html-converter") {
        setToEditor("<h1><span style='color: #ff0000;'><strong>Hello Codebeautify</strong></span></h1>");
    }
    else if(viewname == "json-diff"){
        loadJsonDiffSample();
    }
    else if (viewname != "rssviewer") {
        $.ajax({
               type : "post",
               url : globalurl + "index.php/service/sampleData",
               dataType : "text",
               data : {
               viewname : viewname
               },
               success : function(response) {
               response = response.trim();
               
               if (viewname == 'Xpath-Tester') {
               $("#xmlString").val(response);
               
               }
               else if(viewname == "base64-to-image-converter"){
               $("#base64string").val(response);
               setBase64ToImage();
               }
               else
               {
               setToEditor(response);
               }
               },
               error : function(e, s, a) {
               openErrorDialog("Failed to load data=" + s);
               
               }
               });
    } else {
        var path = 'http://rss.cnn.com/rss/edition_world.rss';
        
        $.ajax({
               type : "post",
               url : "//codebeautify.com/URLService",
               dataType : "text",
               data : {
               path : path
               },
               success : function(response) {
               
               response = response.trim();
               //$("#result1").rssfeed(response);
               
               processRSS(response);
               
               try {
               // var xml=$.parseXML( response );
               // openErrorDialog(response);
               isEditorAce.setValue(response);
               isEditorAce.getSession().setUseWrapMode(true);
               FormatXML();
               isEditorAce.clearSelection();
               } catch (e) {
               openErrorDialog("invalid XML");
               }
               },
               error : function(e) {
               openErrorDialog("Failed to load data");
               }
               });
    }
    
    $(".sharelinkurl").attr("st_url", window.location);
    $(".sharelinkurl").attr("st_title", $("#save_link_title").val());
}

function clearEditorInput(editorid) {
    
    var isEditorAce = null;
    if (editorid==='#editor') {
        isEditorAce = editorAce;
    }
    if (editorid==='#editor2') {
        isEditorAce = editorAce2;
    }
    if (editorid==='#editor3') {
        isEditorAce = editorAce3;
    }
    if (editorid==='#editor4') {
        isEditorAce = editorAce4;
    }
    if (editorid==='#editor5') {
        isEditorAce = editorAce5;
    }
    if (editorid==='#editor6') {
        isEditorAce = editorAce6;
    }
    
    // this is for jsvalidate to clear textarea
    $("#jsData").val('');
    
    // this is for cssvalidate to clear textarea
    $("#cssData").val("");
    
    // this is for wordcounter to clear textarea
    $("#tData").val('');
    
    if (typeof isEditorAce != 'undefined') {
        isEditorAce.setValue("");
    }
    
    if (typeof editorResult != 'undefined') {
        editorResult.setValue("");
    } else {
        $("#result1").html("");
        $("#result").text("");
    }
    
    $("#result1").html("");
    if (typeof editor != 'undefined') {
        if (typeof editor.set != 'undefined') {
            editor.set();
        }
    }
    
    var old;
    if (old != undefined) {
        var result1 = document.getElementById("result1");
        var d = result1.contentWindow.document;
        old = "";
        d.open();
        d.write("");
        d.close();
    }
    
    $("#outputMsg").html("Result");
    
}

function setOutputMsg(msg) {
    $("#outputMsg").html("Result : " + msg);
}

function openErrorDialog(msg) {
    $('<div></div>').appendTo('#openError').html('<div>' + msg + '</h5></div>')
    .dialog({
            modal : true,
            title : "Message",
            zIndex : 10000,
            autoOpen : true,
            width : '400',
            resizable : false,
            buttons : {
            Ok : function() {
            $(this).dialog('destroy');
            }
            }
            });
}


function detectHtmlTags(scripttext) {
    var htmlTagRegexp = new RegExp(
                                   '</?(?:article|aside|bdi|command|'
                                   + 'details|dialog|summary|figure|figcaption|footer|header|hgroup|mark|'
                                   + 'meter|nav|progress|ruby|rt|rp|section|time|wbr|audio|'
                                   + 'video|source|embed|track|canvas|datalist|keygen|output|'
                                   + '!--|!DOCTYPE|a|abbr|address|area|b|base|bdo|blockquote|body|'
                                   + 'br|button|canvas|caption|cite|code|col|colgroup|dd|del|dfn|div|'
                                   + 'dl|dt|em|embed|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|'
                                   + 'h5|h6|head|hr|html|i|iframe|img|input|ins|kdb|keygen|label|legend|'
                                   + 'li|link|map|menu|meta|noscript|object|ol|optgroup|option|p|param|'
                                   + 'pre|q|s|samp|select|small|source|span|strong|style|sub|'
                                   + 'sup|table|tbody|td|textarea|tfoot|th|thead|title|tr|u|ul|var|'
                                   + 'acronym|applet|basefont|big|center|dir|font|frame|'
                                   + 'frameset|noframes|strike|tt)(?:(?: [^<>]*)>|>?)', 'i');
    
    console.log(scripttext.match(htmlTagRegexp));
    
    if (scripttext.match(htmlTagRegexp)) {
        return true;
    } else {
        return false;
    }
}

function getjs(scripttext) {
    var re = /<script.*?>([\s\S]*?)<\/script>/gmi;
    
    var match;
    var js = "";
    
    while (match = re.exec(scripttext)) {
        
        console.log(match[1]);
        js = js + match[1];
    }
    
    return js;
}
function randomFileName(len, charSet) {
    charSet = charSet
    || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var fileName = '';
    for ( var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        fileName += charSet.substring(randomPoz, randomPoz + 1);
    }
    return fileName;
}

var fsr = 0;
function fullScreenLeft() {
    
    $(".leftThum").hide();
    $(".rightThum").hide();
    
    fullScreenBoth();
    $('html, body').animate({ scrollTop: $("#mainLeftDiv").offset().top - 30 }, 500);
    return false;
    
    if (fsr == 0) {
        
        fsr = 1;
        
        //$("#fsimg").attr('src', '/img/fsout.png');
        $("#fsimg").attr('title', 'Small Screen');
        
        $("#mainRightDiv").hide();
        $("#mainLeftDiv").addClass('mainDivLeft');
        $("#editor,#editor2").css({
                         'width' : '100%'
                         });
        $("#buttonDiv").css({
                            'float' : 'right'
                            });
        
        if (typeof editorResult != 'undefined') {
            editorResult.getSession().setUseWrapMode(false);
        }
        
        hideOtherArea(true);
        
    } else {
        fsr = 0;
        //$("#fsimg").attr('src', '/img/fsin.png');
        $("#fsimg").attr('title', 'Full Screen');
        
        $("#mainRightDiv").show();
        $("#mainLeftDiv").removeClass('mainDivLeft');
        $("#editor,#editor2").css({
                         'width' : '100%'
                         });
        $("#buttonDiv").css({
                            'float' : 'left'
                            });
        
        if (typeof editorResult != 'undefined') {
            editorResult.getSession().setUseWrapMode(true);
            var data = editorResult.getValue();
            editorResult.setValue(data);
            
        }
        hideOtherArea(false);
    }
    
    if (typeof editorResult != 'undefined') {
        editorResult.resize();
    }
    if (typeof editorAce != 'undefined') {
        editorAce.resize();
    }
}

function fullScreenBoth(){
    if (fsr == 0) {
        
        fsr = 1;
        
        //$("#fsimg").attr('src', '/img/fsout.png');
        $("#fsimg").attr('title', 'Small Screen');
        
        $("#mainLeftDiv").addClass('mainDivLeft');
        $("#editor,#editor2").css({
                         'width' : '100%'
                         });
        $("#buttonDiv").css({
                            'float' : 'right'
                            });
        
        if (typeof editorResult != 'undefined') {
            editorResult.getSession().setUseWrapMode(false);
        }
        
        //$("#fs1img").attr('src', '/img/fsout.png');
        $("#fs1img1").attr('title', 'Small Screen');
        
        $("#mainRightDiv").addClass('mainDivLeft');
        $("#result").css({
                         'width' : '100%'
                         });
        $("#mainRightDiv").css({
                               'float' : 'right'
                               });
        
        if (typeof editorResult != 'undefined') {
            editorResult.getSession().setUseWrapMode(false);
        }
        
        hideOtherArea(true);
        
    } else {
        fsr = 0;
        //$("#fsimg").attr('src', '/img/fsin.png');
        $("#fsimg").attr('title', 'Full Screen');
        
        $("#mainLeftDiv").removeClass('mainDivLeft');
        $("#editor,#editor2").css({
                         'width' : '100%'
                         });
        $("#buttonDiv").css({
                            'float' : 'left'
                            });
        
        if (typeof editorResult != 'undefined') {
            editorResult.getSession().setUseWrapMode(true);
            var data = editorResult.getValue();
            editorResult.setValue(data);
            
        }
        
        //$("#fs1img").attr('src', '/img/fsin.png');
        $("#fs1img").attr('title', 'Full Screen');
        
        $("#mainRightDiv").removeClass('mainDivLeft');
        $("#result").css({
                         'width' : '100%'
                         });
        $("#mainRightDiv").css({
                               'float' : 'right'
                               });
        
        if (typeof editorResult != 'undefined') {
            editorResult.getSession().setUseWrapMode(true);
        }
        hideOtherArea(false);
    }
    
    if (typeof editorResult != 'undefined') {
        editorResult.resize();
    }
    if (typeof editorAce != 'undefined') {
        editorAce.resize();
    }
}

function hideOtherArea(flag){
    if(flag == true){
        // $(".headerEditorContainer").hide();
        // $(".mainheader").hide();
        $(".infoSection").hide();
        $(".footerpart").hide();
        $(".footerSection").hide();
        $("#buttonDiv").hide();
        // $(".navbar-fixed-top").hide();
        $(".buttonSection").hide();
    }
    else{
        // $(".headerEditorContainer").show();
        // $(".mainheader").show();
        $(".infoSection").show();
        $(".footerpart").show();
        $(".footerSection").show();
        $("#buttonDiv").show();
        // $(".navbar-fixed-top").show();
        $(".buttonSection").show();
    }
}

var fsr1 = 0;
function fullScreenRight() {
    
    $(".leftThum").hide();
    $(".rightThum").hide();
    
    fullScreenBoth();
    $('html, body').animate({ scrollTop: $("#mainRightDiv").offset().top - 30 }, 500);
    return false;
    
    if (fsr1 == 0) {
        
        fsr1 = 1;
        //$("#fs1img").attr('src', '/img/fsout.png');
        $("#fs1img1").attr('title', 'Small Screen');
        
        $("#mainLeftDiv").hide();
        $("#mainRightDiv").addClass('mainDivLeft');
        $("#result").css({
                         'width' : '100%'
                         });
        $("#mainRightDiv").css({
                               'float' : 'right'
                               });
        
        if (typeof editorResult != 'undefined') {
            editorResult.getSession().setUseWrapMode(false);
        }
        
        hideOtherArea(true);
        
    } else {
        fsr1 = 0;
        //$("#fs1img").attr('src', '/img/fsin.png');
        $("#fs1img").attr('title', 'Full Screen');
        
        $("#mainLeftDiv").show();
        $("#mainRightDiv").removeClass('mainDivLeft');
        $("#result").css({
                         'width' : '100%'
                         });
        $("#mainRightDiv").css({
                               'float' : 'right'
                               });
        
        if (typeof editorResult != 'undefined') {
            editorResult.getSession().setUseWrapMode(true);
        }
        hideOtherArea(false);
    }
    
    if (typeof editorResult != 'undefined') {
        editorResult.resize();
    }
    if (typeof editorAce != 'undefined') {
        editorAce.resize();
    }
}

var aefsr = 0;
function fullScreen(editorid){
    var isEditorAce = null;
    if (editorid==='#editor') {
        isEditorAce = editorAce;
    }
    if (editorid==='#editor2') {
        isEditorAce = editorAce2;
    }
    if (editorid==='#editor3') {
        isEditorAce = editorAce3;
    }
    if (editorid==='#editor4') {
        isEditorAce = editorAce4;
    }
    if (editorid==='#editor5') {
        isEditorAce = editorAce5;
    }
    if (editorid==='#editor6') {
        isEditorAce = editorAce6;
    }
isEditorAce.setOption("maxLines", 1000);
    /*$('#editor').resize();
    $('#editor2').resize();*/
    //console.log("length is "+length_editor);
    
    //editorAce.resize();
    /*editorAce.css({
                    'border' : '10px solid #FBC2C4'
                    });*/
    //var newHeight =
    //isEditorAce.getSession().getScreenLength() * isEditorAce.renderer.lineHeight + isEditorAce.renderer.scrollBar.getWidth();
    //isEditorAce.height(newHeight.toString() + "px");
    //$('#editor').height(newHeight.toString() + "px");
    //isEditorAce.getSession().setUseWrapMode(false);
    //isEditorAce.setTheme("ace/theme/monokai");
    //hideOtherArea(true);
    /*if (aefsr == 0) {
        console.log("were here");
        aefsr = 1;
        //$("#aefsimg").attr('src', '/img/fsout.png');
        $("#aefsimg").attr('title', 'Small Screen');
        
        $("#editorAll").removeClass('span10');
        $("#editorAll").addClass('span12');
        
        if (typeof editorAce != 'undefined') {
            //editorAce.getSession().setUseWrapMode(false);
            editorAce.setTheme("ace/theme/monokai");
            editorAce.getSession().setMode("ace/mode/javascript");
        }
        
        hideOtherArea(true);
        
    } else {
        aefsr = 0;
        //$("#aefsimg").attr('src', '/img/fsin.png');
        $("#aefsimg").attr('title', 'Full Screen');
        
        $("#editorAll").removeClass('span12');
        $("#editorAll").addClass('span10');
        
        if (typeof editorAce != 'undefined') {
            editorResult.getSession().setUseWrapMode(true);
        }
        hideOtherArea(false);
    }
    
    if (typeof editorResult != 'undefined') {
        editorResult.resize();
    }
    if (typeof editorAce != 'undefined') {
        editorAce.resize();
    }*/
}

function changeLeftDiv() {
    
    $("#editor").css({
                     'width' : '20%'
                     });
    $("#mainLeftDiv").css({
                          'width' : '20%'
                          });
    $("#mainRightDiv").css({
                           'width' : '60%'
                           });
    
    $("#result").css({
                     'width' : '58%'
                     });
    
    if (typeof editorResult != 'undefined') {
        editorResult.getSession().setUseWrapMode(true);
        var data = editorResult.getValue();
        editorResult.setValue(data);
    }
}

function changeRightDiv() {
    
    $("#editor,#editor2").css({
                     'width' : '58%'
                     });
    $("#mainLeftDiv").css({
                          'width' : '60%'
                          });
    $("#mainRightDiv").css({
                           'width' : '20%'
                           });
    
    $("#result").css({
                     'width' : '20%'
                     });
    
    if (typeof editorResult != 'undefined') {
        editorResult.getSession().setUseWrapMode(true);
        var data = editorResult.getValue();
        editorResult.setValue(data);
    }
}

function normalScreen() {
    
    $("#editor,#editor2").css({
                     'width' : '100%'
                     });
    
    $("#result").css({
                     'width' : '100%'
                     });
    
    $("#mainLeftDiv").css({
                          'width' : '100%'
                          });
    $("#mainRightDiv").css({
                           'width' : '100%'
                           });
    
}



function editLink() {
    $.ajax({
           url : "/service/updateSaveLink",
           dataType : "text",
           type : "post",
           data : {
           id : $("#edit_link_id").val(),
           title : $("#save_link_title").val(),
           desc : $("#save_link_description").val(),
           urlid : $("#fContent").val()
           },
           success : function(response) {
           
           if (response == "success") {
           openErrorDialog("Successfully Updated");
           location.reload();
           } else {
           openErrorDialog("Error in Update");
           }
           },
           error : function(e, s, a) {
           
           openErrorDialog("Error in Update");
           
           }
           });
}

function deleteSavelink(id,urlid) {
    
    $('<div></div>').appendTo('#openError').html(
                                                 '<div>Do you want to Delete..?</h5></div>').dialog({
                                                                                                    modal : true,
                                                                                                    title : "Confirm Delete",
                                                                                                    zIndex : 10000,
                                                                                                    autoOpen : true,
                                                                                                    width : '30%',
                                                                                                    resizable : false,
                                                                                                    buttons : {
                                                                                                    Delete : function() {
                                                                                                    
                                                                                                    $.ajax({
                                                                                                           url : "/service/deleteSaveLink",
                                                                                                           dataType : "text",
                                                                                                           type : "post",
                                                                                                           data : {
                                                                                                           id : id,
                                                                                                           urlid : urlid,
                                                                                                           viewname : $("#viewName").val()
                                                                                                           },
                                                                                                           success : function(response) {
                                                                                                           
                                                                                                           if (response == "success") {
                                                                                                           // openErrorDialog("Successfully Deleted");
                                                                                                           location.reload();
                                                                                                           } else {
                                                                                                           openErrorDialog("Error in Delete");
                                                                                                           }
                                                                                                           },
                                                                                                           error : function(e, s, a) {
                                                                                                           
                                                                                                           openErrorDialog("Error in Delete");
                                                                                                           
                                                                                                           }
                                                                                                           });
                                                                                                    
                                                                                                    $(this).dialog('destroy');
                                                                                                    },
                                                                                                    Close : function(event, ui) {
                                                                                                    $("#openError").html('');
                                                                                                    $(this).dialog('destroy');
                                                                                                    }
                                                                                                    },
                                                                                                    });
}

// open any file from url
function loadAnyFileFromUrl(storeID) {
    $("#loadUrlPathDiv").dialog({
                                modal : true,
                                title : "Enter Url",
                                zIndex : 10000,
                                autoOpen : true,
                                width : '400',
                                resizable : false,
                                buttons : {
                                Load : function() {
                                var path = $("#path").val();
                                if (path.length > 5) {
                                $.ajax({
                                       type : "post",
                                       url : "//codebeautify.com/URLService",
                                       dataType : "text",
                                       data : {
                                       path : path
                                       },
                                       success : function(response) {
                                       $("#" + storeID).val(response);
                                       $("#" + storeID).focus();
                                       },
                                       error : function(e, s, a) {
                                       openErrorDialog("Failed to load data=" + s);
                                       }
                                       });
                                }
                                $(this).dialog('destroy');
                                },
                                Cancel : function(event, ui) {
                                $("#openError").html('');
                                $(this).dialog('destroy');
                                }
                                }
                                });
}

function decodeSpecialCharacter(str) {
    return str.replace(/\&amp;/g, '&').replace(/\&gt;/g, '>').replace(/\&lt;/g,
                                                                      '<').replace(/\&quot;/g, '"');
}

function encryptDecrypt(perform) {
    var text = $("#text").val();
    
    if (text.trim().length > 0) {
        $.ajax({
               type : 'post',
               url : "encryptDecrypt/" + perform,
               data : {
               key : $("#key").val(),
               alg : $("#alg").val(),
               mode : $("#mode").val(),
               text : text
               },
               dataType : "text",
               success : function(response) {
               $("#result_ed").val('');
               $("#result_ed").val(response);
               },
               error : function(e, s, a) {
               openErrorDialog("Failed to Perform Operation" + s);
               
               }
               });
    }
}

function makeFileDiff() {
    
    var data_file1 = $("#file1").val();
    var data_file2 = $("#file2").val();
    
    if (data_file1 != null && data_file2 != null
        && data_file1.trim().length > 0 && data_file2.trim().length > 0) {
        base = difflib.stringAsLines(data_file1);
        newtxt = difflib.stringAsLines(data_file2);
        sm = new difflib.SequenceMatcher(base, newtxt);
        
        opcodes = sm.get_opcodes();
        
        diffoutputdiv = document.getElementById("showDiff");
        
        diffoutputdiv.innerHTML = "";
        
        diffoutputdiv.appendChild(diffview.buildView({
                                                     baseTextLines : base,
                                                     newTextLines : newtxt,
                                                     opcodes : opcodes,
                                                     baseTextName : fileName1,
                                                     newTextName : fileName2,
                                                     contextSize : null,
                                                     viewType : 0
                                                     }));
        $(".diffinfo").show();
        // $("#showDiff").show();
        
        showOnlyDiff();
    }
}

function showOnlyDiff()// function for show only differnce for file-diff tool
{
    if ($("#showonlydiff").is(':checked')) {
        $(".diff tbody tr td.equal").parent().hide();
    } else {
        $(".diff tbody tr td.equal").parent().show();
    }
    
}

function postTofb() {
    var user = $("#fbUserName").text();
    if (user != null && user != 'Sign in') {
        showProgress();
        $
        .ajax({
              url : '/hauth/postTOFacebook',
              type : 'post',
              data : {
              link : $("#fblink").text(),
              viewname : $("#    ").text()
              },
              success : function(res) {
              if (res == "fail") {
              openErrorDialog("Please Login to Facebook :<a href='/hauth/login/Facebook'>Login Facebook</a>");
              } else {
              openErrorDialog("Successfully post to facebook");
              }
              hideProgress();
              }
              });
    } else {
        openErrorDialog("Please Login to Facebook :<a href='/hauth/login/Facebook'>Login Facebook</a>");
    }
}

function openPostToFbDialog() {
    
    $("#shareDiv").html($("#shareLinksOption").html());
    
    $("#shareDiv span.stButton").css({
                                     "margin-right" : "1px",
                                     "margin-top" : "18px",
                                     "width" : "135px"
                                     });
    
    $("#fbpost").dialog({
                        modal : true,
                        title : "Share Post",
                        zIndex : 10000,
                        autoOpen : false,
                        width : '50%',
                        resizable : false,
                        buttons : {
                        Close : function() {
                        $(this).dialog('destroy');
                        }
                        }
                        });
}
function removeCommentsFromJs(str) {
    
    var uid = '_' + +new Date(), primatives = [], primIndex = 0;
    
    return (str
            /* Remove strings */
            .replace(/(['"])(\\\1|.)+?\1/g, function(match) {
                        primatives[primIndex] = match;
                        return (uid + '') + primIndex++;
                        })
                        
                        /* Remove Regexes */
                        .replace(/([^\/])(\/(?!\*|\/)(\\\/|.)+?\/[gim]{0,3})/g,
                                 function(match, $1, $2) {
                                 primatives[primIndex] = $2;
                                 return $1 + (uid + '') + primIndex++;
                                 })
                        
                        /*
                         * - Remove single-line comments that contain would-be multi-line delimiters
                         * E.g. // Comment /* <-- - Remove multi-line comments that contain would be
                         * single-line delimiters E.g. /* // <--
                         */
                        .replace(/\/\/.*?\/?\*.+?(?=\n|\r|$)|\/\*[\s\S]*?\/\/[\s\S]*?\*\//g, '')
                                 
                                 /*
                                  * Remove single and multi-line comments, no consideration of inner-contents
                                  */
                                 .replace(/\/\/.+?(?=\n|\r|$)|\/\*[\s\S]+?\*\//g, '')
                                          
                                          /*
                                           * Remove multi-line comments that have a replaced ending (string/regex)
                                           * Greedy, so no inner strings/regexes will stop it.
                                           */
                                          .replace(RegExp('\\/\\*[\\s\\S]+' + uid + '\\d+', 'g'), '')
                                          
                                          /* Bring back strings & regexes */
                                          .replace(RegExp(uid + '(\\d+)', 'g'), function(match, n) {
                                                   return primatives[n];
                                                   }));
                                 
                                 }
                                 
                                 // test api functions
                                 function deleteRow(tableID, row) {
                                 var i = row.parentNode.parentNode.rowIndex;
                                 document.getElementById(tableID).deleteRow(i);
                                 
                                 var table = document.getElementById(tableID);
                                 var rowCount = table.rows.length;
                                 
                                 if (rowCount == 1) {
                                 document.getElementById(tableID).deleteRow(0);
                                 addRow(tableID);
                                 }
                                 }
                                 function addRow(tableID) {
                                 
                                 var placeHolderContent = "QueryString";
                                 var placeHolderValue = "Value";
                                 
                                 var fieldKeyName = "qsKey[]";
                                 var fieldValueName = "qsValue[]";
                                 if (tableID == 'headerTable') {
                                 placeHolderContent = "Content-Type";
                                 
                                 fieldKeyName = "hdrKey[]";
                                 fieldValueName = "hdrValue[]";
                                 }
                                 
                                 var table = document.getElementById(tableID);
                                 
                                 var rowCount = table.rows.length;
                                 
                                 if (rowCount > 0) {
                                 table.rows[rowCount - 1].cells[3].innerHTML = "<input  type='button' value='-' onclick=deleteRow('"
                                 + tableID + "',this); class='btn_customsetting'>";
                                 }
                                 
                                 var row = table.insertRow(rowCount);
                                 
                                 var cell1 = row.insertCell(0);
                                 cell1.className = "span3";
                                 cell1.innerHTML = cell1.innerHTML + "<input name=" + fieldKeyName
                                 + " class='span12' type='text' placeholder=" + placeHolderContent
                                 + ">";
                                 
                                 var cell2 = row.insertCell(1);
                                 cell2.innerHTML = cell2.innerHTML + "=";
                                 
                                 var cell3 = row.insertCell(2);
                                 cell3.className = "span9";
                                 cell3.innerHTML = cell3.innerHTML + "<input name=" + fieldValueName
                                 + " class='span12' type='text' placeholder=" + placeHolderValue
                                 + ">";
                                 
                                 var cell4 = row.insertCell(3);
                                 
                                 cell4.innerHTML = cell4.innerHTML
                                 + "<input type='button' class='btn_customsetting' value='+' onclick=addRow('"
                                 + tableID + "');>";
                                 
                                 }
                                 
                                 function getTableData(tableID) {
                                 
                                 var table = document.getElementById(tableID);
                                 var rowCount = table.rows.length;
                                 var aarray = new Array();
                                 for ( var i = 0; i < rowCount; i++) {
                                 var t1 = table.rows[i].cells[0].firstElementChild.value;
                                 var t2 = table.rows[i].cells[2].firstElementChild.value;
                                 
                                 aarray[t1] = t2;
                                 }
                                 return aarray;
                                 }
                                 
                                 function shownewApi() {
                                 
                                 $("#queryStringTable").html('');
                                 addRow("queryStringTable");
                                 
                                 $("#headerTable").html('');
                                 addRow("headerTable");
                                 
                                 $("#apiData").show();
                                 $("#resultView").hide();
                                 
                                 $("#apiMethod").val('get');
                                 $("#cType").val('text');
                                 $("#apiUrl").val('');
                                 editorResult.setValue("");
                                 $("html, body").animate({
                                                         scrollTop : 0
                                                         }, 10);
                                 }
                                 
                                 function showResult() {
                                 $("#apiData").hide();
                                 editorResult.setValue(" ");
                                 $("#resultView").show();
                                 }
                                 
                                 function checkContentType() {
                                 var type = $("#cType").val();
                                 
                                 if (type == 'other') {
                                 $("#oCtype").show();
                                 } else {
                                 $("#oCtype").hide();
                                 }
                                 }
                                 
                                 function callApi() {
                                 
                                 var url = $("#apiUrl").val();
                                 
                                 if (url != null && url.trim().length > 8) {
                                 showResult();
                                 editorResult.setValue(" ");
                                 $
                                 .ajax({
                                       type : $("#apiMethod").val(),
                                       url : "/service/testAPI",
                                       data : $("#apiForm").serialize(),
                                       dataType : 'json',
                                       success : function(data) {
                                       
                                       setToEditor(data);
                                       },
                                       error : function(jqXHR, textStatus, errorThrown) {
                                       setErrorToEditor(
                                                        "API Url content error or may not use cross domain request",
                                                        "html");
                                       }
                                       });
                                 } else {
                                 openErrorDialog("Please Enter Url");
                                 }
                                 }
                                 
                                 function setLangauge() {
                                 var lang = $("#editorLanguage").val();
                                 editorAce.getSession().setMode("ace/mode/" + lang);
                                 editorAce.setOptions({
                                                      enableBasicAutocompletion : true,
                                                      enableSnippets : true,
                                                      enableLiveAutocompletion : true
                                                      });
                                 }
                                 
                                 // this for temporary to get file input on page
                                 
    /** ******** end footerwitheditors js code ************ */
                                 
    /** ************start Footer.php js code **************** */
                                 
                                 function downloadcode(viewname, ext) {
                                 // console.log("hello");
                                 $.ajax({
                                        type : "post",
                                        url : globalurl + "service/sampleData",
                                        dataType : "text",
                                        data : {
                                        viewname : viewname
                                        },
                                        success : function(response) {
                                        
                                        var blob = new Blob([ "" + response + "" ], {
                                                            type : "text/plain;charset=utf-8"
                                                            });
                                        
                                        var fileName = "sampleData." + ext;
                                        
                                        saveAs(blob, fileName);
                                        },
                                        error : function(e, s, a) {
                                        openErrorDialog("Failed to Download data=" + s);
                                        
                                        }
                                        });
                                 }
                                 
                                 $(".stButton").css({
                                                    'display' : 'none!important'
                                                    });
                                 
    /** ********** End Footer.php js code **************** */
                                 
    /** **********start Load Url Js function ******************** */
                                 function loadFromURL(view) {
                                 
                                 $("#loadUrlPathDiv").removeClass("hide");
                                 $("#loadUrlPathDiv").dialog({
                                                             modal : true,
                                                             title : "Enter Url",
                                                             zIndex : 10000,
                                                             autoOpen : true,
                                                             width : '400',
                                                             resizable : false,
                                                             buttons : {
                                                             Load : function() {
                                                             var path = $("#path").val();
                                                             if (path.trim().length > 5) {
                                                             loadUrl(path,view);
                                                             }
                                                             $(this).dialog('destroy');
                                                             $("#loadUrlPathDiv").addClass("hide");
                                                             },
                                                             Cancel : function(event, ui) {
                                                             $("#openError").html('');
                                                             $(this).dialog('destroy');
                                                             $("#loadUrlPathDiv").addClass("hide");
                                                             }
                                                             }
                                                             });
                                 
                                 }
                                 
                                 
                                 function loadUrl(url,view){
                                 $.ajax({
                                        type : "post",
                                        url : "//codebeautify.com/URLService",
                                        dataType : "text",
                                        data : {
                                        path : url
                                        },
                                        success : function(response) {
                                        try {
                                        if (view == 'RSS') {
                                        processRSS(response);
                                        }
                                        
                                        setToEditor(response);
                                        
                                        } catch (e) {
                                        openErrorDialog("Invalid " + view + " Data");
                                        
                                        }
                                        },
                                        error : function(e, s, a) {
                                        openErrorDialog("Failed to load data=" + s);
                                        
                                        }
                                        });
                                 }
    /** ********** End Load Url Js function ******************** */
                                 
    /** ********************** header page javascript ****************************** */
                                 function save(data,isShare) {
                                 
                                 
                                 //added this for 301 redirect to change view name
                                 var viewNameForLink = $("#viewName").val().trim();
                                 
                                 if(viewNameForLink=="jsonvalidate"){
                                 viewNameForLink = "jsonvalidator";
                                 }else if(viewNameForLink=="xmlvalidate"){
                                 viewNameForLink = "xmlvalidator";
                                 }
                                 
                                 
                                 $.ajax({
                                        url : "/service/save",
                                        dataType : "text",
                                        type : "post",
                                        data : {
                                        content : data,
                                        viewname : viewNameForLink,
                                        title : $("#save_link_title").val(),
                                        desc : $("#save_link_description").val(),
                                        tags : $("#save_link_tags").val().trim()
                                        },
                                        success : function(response) {
                                        
                                        
                                        
                                        var link = "https://" + location.host + "/"
                                        + viewNameForLink + "/" + response;
                                        
                                        link = link.replace(" ", "");
                                        
                                        $("#subTitle").find('h4').remove();
                                        $("#permalink").find('a').remove();
                                        $("#subTitle").append(
                                                              "<h4 style='padding-left:10px'>"
                                                              + $("#save_link_title").val() + "</h4>");
                                        $("#permalink").append(
                                                               "<a href=" + link + " style='float:left;width:100%;'>"
                                                               + link + "</a>");
                                        $(".sharelinkurl").attr("st_url", link);
                                        $(".sharelinkurl").attr("st_title", $("#save_link_title").val());
                                        $("#permalink").parent().show();
                                        // openPostToFbDialog();
                                        // openErrorDialog("Pls save this link for sharing.<a
                                        // href="+link+">("+link+")</a>");
                                        
                                        saveToGoogle(response);
                                        
                                        if(isShare){
                                        //shareLink(link);
                                        }
                                        },
                                        error : function(e, s, a) {
                                        
                                        openErrorDialog("Error in data saving");
                                        
                                        }
                                        });
                                 }
                                 
                                 function update(data,isShare) {
                                 
                                 $.ajax({
                                        url : "/service/update",
                                        dataType : "text",
                                        type : "post",
                                        data : {
                                        id : $("#edit_link_id").val(),
                                        content : data,
                                        viewname : $("#viewName").val().trim(),
                                        title : $("#save_link_title").val(),
                                        desc : $("#save_link_description").val(),
                                        tags : $("#save_link_tags").val().trim(),
                                        urlid : $("#fContent").val()
                                        },
                                        success : function(response) {
                                        $("#subTitle").find('h4').remove();
                                        $("#permalink").find('a').remove();
                                        $("#subTitle").append(
                                                              "<h4 style='padding-left:10px'>"
                                                              + $("#save_link_title").val() + "</h4>");
                                        $("#permalink").append(
                                                               "<a href=" + location.href + ">" + location.href + "</a>");
                                        $(".sharelinkurl").attr("st_url", location.href);
                                        $(".sharelinkurl").attr("st_title", $("#save_link_title").val());
                                        $("#permalink").parent().show();
                                        // openPostToFbDialog();
                                        
                                        saveToGoogle(response);
                                        
                                        if(isShare){
                                        shareLink(location.href);
                                        }
                                        },
                                        error : function(e, s, a) {
                                        openErrorDialog("Error in data updating");
                                        }
                                        });
                                 }
                                 
                                 var gdPath = "";
                                 function saveToGoogle(path){
                                 return false;
                                 gdPath = path;
                                 gapi.savetodrive.render('savetodrive-div', {
                                                         src: "/codebeautify/"+path+".txt",
                                                         filename: "codebeautify_"+$("#viewName").val()+".txt",
                                                         sitename: 'Codebeautify.org'
                                                         });
                                 openGDriveSaveDialog();
                                 }
                                 
                                 //gdriveDialog
                                 function openGDriveSaveDialog(){
                                 $("#gdriveDialog").dialog({
                                                           modal : true,
                                                           title : "Save to Google Drive",
                                                           zIndex : 10000,
                                                           autoOpen : true,
                                                           width : '30%',
                                                           resizable : false,
                                                           buttons : {
                                                           Close : function() {
                                                           $(this).dialog('destroy');
                                                           deleteAfterUploadToGD();
                                                           }
                                                           }
                                                           });
                                 }
                                 
                                 function deleteAfterUploadToGD(){
                                 if(gdPath.trim().length != 0){
                                 $.ajax({
                                        url : globalurl + "service/deleteGdriveFile",
                                        dataType : "text",
                                        type : "post",
                                        data : {
                                        filename : gdPath
                                        },
                                        success : function(response) {
                                        gdPath = "";
                                        console.log("deleted -> " + path);
                                        }
                                        });
                                 }
                                 }
                                 
                                 function shareLink(link){
                                 if(getProvider() == "google"){
                                 window.location.href = "https://plus.google.com/share?url="+link;
                                 }
                                 else{
                                 window.location.href = "https://www.facebook.com/sharer/sharer.php?u="+link
                                 }
                                 }
                                 
                                 function openSavedialog(isShare) {
                                 
                                 var isLogin = $("#isLogin").val();
                                 
                                 var data = "";
                                 if ($("#viewName").val().trim() == 'cssvalidate') {
                                 data = $("#cssData").val();
                                 } else if ($("#viewName").val().trim() == 'jsvalidate') {
                                 
                                 data = $("#jsData").val();
                                 } else if ($("#viewName").val().trim() == 'wordcounter') {
                                 
                                 data = $("#tData").val();
                                 } else if ($("#viewName").val().trim() == 'alleditor') {
                                 if (editorAce.getValue() == null
                                     && editorAce.getValue().trim().length == 0) {
                                 flag = false;
                                 return false;
                                 }
                                 data = editorAce.getValue() + "|" + $("#editorLanguage").val();
                                 
                                 }if ($("#viewName").val().trim() == 'collabe-code') {
                                 data = $("#collabeData").html();
                                 } else {
                                 if (typeof editorAce != 'undefined') {
                                 data = editorAce.getValue();
                                 } else {
                                 data = $("#input").val();
                                 }
                                 }
                                 
                                 if (data != null && data != "" && data.trim().length > 0) {
                                 $("#savedialog").removeClass("hide");
                                 $("#savedialog")
                                 .dialog(
                                         {
                                         modal : true,
                                         title : "Save",
                                         zIndex : 10000,
                                         autoOpen : false,
                                         width : '30%',
                                         resizable : false,
                                         buttons : {
                                         Save : function() {
                                         var title = $("#save_link_title").val();
                                         
                                         if (title != null
                                             && title.trim().length != 0) {
                                         $('#savedialog').dialog('close');
                                         $("#openError").html('');
                                         if ($("#edit_link_id").val() == ""
                                             || $("#edit_link_id").val() == "0") {
                                         save(data,isShare);
                                         $(this).dialog('destroy');
                                         
                                         } else {
                                         if (isLogin == "1") {
                                         $("#savedialog").dialog(
                                                                 "option", "disabled",
                                                                 true);
                                         $('<div></div>')
                                         .appendTo('#openError')
                                         .html(
                                               '<div>Do you want to save as new file..?</h5></div>')
                                         .dialog(
                                                 {
                                                 modal : true,
                                                 title : "Confirm",
                                                 zIndex : 10000,
                                                 autoOpen : true,
                                                 width : '30%',
                                                 resizable : false,
                                                 buttons : {
                                                 Yes : function() {
                                                 $(
                                                   "#openError")
                                                 .html(
                                                       '');
                                                 save(data,isShare);
                                                 $(
                                                   this)
                                                 .dialog(
                                                         'destroy');
                                                 $(
                                                   "#savedialog")
                                                 .dialog(
                                                         'destroy');
                                                 },
                                                 No : function(
                                                               event,
                                                               ui) {
                                                 $(
                                                   "#openError")
                                                 .html(
                                                       '');
                                                 update(data,isShare);
                                                 $(
                                                   this)
                                                 .dialog(
                                                         'destroy');
                                                 $(
                                                   "#savedialog")
                                                 .dialog(
                                                         'destroy');
                                                 $("#savedialog").removeClass("hide");
                                                 },
                                                 Close : function(
                                                                  event,
                                                                  ui) {
                                                 $(
                                                   "#openError")
                                                 .html(
                                                       '');
                                                 $(
                                                   this)
                                                 .dialog(
                                                         'destroy');
                                                 $(
                                                   '#savedialog')
                                                 .dialog(
                                                         'open');
                                                 }
                                                 },
                                                 });
                                         } else {
                                         $("#openError").html('');
                                         save(data,isShare);
                                         $(this).dialog('destroy');
                                         }
                                         }
                                         
                                         } else {
                                         openErrorDialog("Please Enter Title");
                                         }
                                         },
                                         Cancel : function(event, ui) {
                                         $("#openError").html('');
                                         $(this).dialog('destroy');
                                         $("#savedialog").addClass("hide");
                                         }
                                         },
                                         });
                                 } else {
                                 openErrorDialog("No Data in Input view");
                                 }
                                 
                                 $('#savedialog').dialog('open');
                                 }
    /** *****************Private Note/Snap JS***************** */
                                 function saveSnap() {
                                 
                                 var minute = $("#m").val().trim();
                                 
                                 if (minute.length != 0) {
                                 
                                 if (isNaN(minute) == true) {
                                 openErrorDialog("Minute Must be number.");
                                 return false;
                                 }
                                 if (parseInt(minute) > 6) {
                                 openErrorDialog("Minute is not valid,Please Enter minutes between 1 to 5.");
                                 return false;
                                 }
                                 }
                                 
                                 var note = $("#note").val().trim(), email = $("#email").val(), note_ref = $(
                                                                                                             "#note_ref").val(), photoId = $("#photoId").text();
                                 
                                 if (note.trim().length == 0) {
                                 $("#note").focus();
                                 return false;
                                 }
                                 
                                 $.ajax({
                                        url : globalurl + "service/savePrivateNote",
                                        dataType : "text",
                                        type : "post",
                                        data : {
                                        note : note,
                                        email : email,
                                        note_ref : note_ref,
                                        timer : minute,
                                        photoId : photoId
                                        },
                                        success : function(response) {
                                        
                                        $('.MainMessageContainerDiv').addClass('hideImportant');
                                        $('.messageAlertDiv').removeClass('hide');
                                        
                                        var link = "https://" + location.host + "/"
                                        + $("#viewName").val().trim() + "/" + response;
                                        
                                        link = link.replace(" ", "");
                                        
                                        $('.createMessageLink').html(link);
                                        },
                                        error : function(e, s, a) {
                                        
                                        openErrorDialog("Error in save");
                                        
                                        }
                                        });
                                 
                                 }
                                 
                                 function deletePhoto() {
                                 
                                 var photoId = $("#photoId").text();
                                 
                                 $.ajax({
                                        url : globalurl + "service/deletePrivateNotePhoto",
                                        dataType : "text",
                                        type : "post",
                                        data : {
                                        photoId : photoId
                                        },
                                        success : function(response) {
                                        if (response == "success") {
                                        $("#photoId").text("");
                                        $("#uploadPhotobtn").show();
                                        $("#photoSpan").hide();
                                        } else {
                                        openErrorDialog("Error in Deleting photo Please Try Agains");
                                        }
                                        },
                                        error : function(e, s, a) {
                                        
                                        openErrorDialog("Error in Delete");
                                        
                                        }
                                        });
                                 }
                                 
                                 function uploadPrivateNotePhoto() {
                                 
                                 // globalurl = "/index.php/"
                                 new AjaxUpload($('#uploadPhotobtn'), {
                                                action : globalurl + "readfile/uploadPrivateNotePhoto",
                                                name : 'userfile',
                                                onSubmit : function(file, ext1) {
                                                var ext = ext1[0];
                                                
                                                if (ext == "jpeg" || ext == "png" || ext == "jpg" || ext == "gif"
                                                    || ext == "bmp" || ext == "psd") {
                                                showProgress();
                                                return true;
                                                } else {
                                                openErrorDialog("Please Select Image File Only...!");
                                                return false;
                                                }
                                                
                                                },
                                                onComplete : function(file, response) {
                                                
                                                if (response != 'error' && response.search("Filename") == -1) {
                                                $("#photoId").text(response);
                                                $("#uploadPhotobtn").hide();
                                                $("#photoSpan").show();
                                                } else {
                                                openErrorDialog("Error in Loading File.");
                                                }
                                                
                                                hideProgress();
                                                
                                                }
                                                });
                                 
                                 }
                                 
    /** ***********Ace Ajax Editor********************* */
                                 var crlf = /(\r?\n|\r)/g,
                                 whitespace = /(\r?\n|\r|\s+)/g;
                                 
                                 function updateCounter($this){
                                 var data = $($this).val();
                                 var regex = /\s+/gi;
                                 var wordCount = data.trim().replace(regex, ' ').split(' ').length;
                                 $("#editor1TC").text(data.length);
                                 $("#editor1TW").text(wordCount);
                                 var lines = data.split(/\r\n|\r|\n/).length;
                                 $("#editor1TL").text(lines);
                                 var count = countBytes(data);
                                 $("#editor1Size").text(formateByteCount(count));
                                 $(".editorCounterSection").show();
                                 }
                                 
                                 
                                 function createCollabeEditor(){
                                 $("#resultDiv1").hide();
                                 editorAce = ace.edit("editor");
                                 editorAce.getSession().setMode("ace/mode/html");
                                 editorAce.getSession().setUseWrapMode(true);
                                 editorAce.on('change', function() {
                                              generateCollabeOutput();
                                              });
                                 
                                 editorResult = ace.edit("result");
                                 editorResult.getSession().setMode("ace/mode/css");
                                 editorResult.getSession().setUseWrapMode(true);
                                 editorResult.on('change', function() {
                                                 generateCollabeOutput();
                                                 });
                                 $(".editorCounterSection").hide();
                                 
                                 $("#savebtn").show();
                                 }
                                 
                                 function switchView(view){
                                 $("#html").removeClass("btn-simple-click");
                                 $("#css").removeClass("btn-simple-click");
                                 if(view == "html"){
                                 $("#currentViewName").html("HTML");
                                 $("#html").addClass("btn-simple-click");
                                 $("#editor").show();
                                 $("#resultDiv1").hide();
                                 }
                                 else if(view == "css"){
                                 $("#currentViewName").html("CSS");
                                 $("#css").addClass("btn-simple-click");
                                 $("#editor,#editor2").hide();
                                 $("#resultDiv1").show();
                                 }
                                 }
                                 
                                 function generateCollabeOutput(){
                                 var style = "<style>" + editorResult.getValue() + "</style>";
                                 var html = editorAce.getValue();
                                 
                                 $('#result123').contents().find('html').html(style + html);
                                 
                                 $("#collabeData").text( editorResult.getValue() + "##$$123456789$$##" + html);
                                 }
                                 
                                 function setEditorCallabe(response){
                                 var data = response.split("##$$123456789$$##");
                                 
                                 var newformat = cssbeautify(data[0], {
                                                             indent : '  ',
                                                             openbrace : 'end-of-line',
                                                             autosemicolon : true
                                                             });
                                 
                                 data[1] = decodeSpecialCharacter(data[1]);
                                 
                                 editorResult.setValue(newformat);
                                 editorAce.setValue(vkbeautify.xml(data[1].trim()));
                                 }
                                 
                                 function createEditor(mode1, mode2) {
                                 if (mode1 != undefined && mode1 != null) {
                                 editorAce = ace.edit("editor");
                                 
                                 editorAce.getSession().setMode("ace/mode/xml");
                                 editorAce.getSession().setUseWrapMode(true);
                                 editorAce.on('change', function() {
                                              var data = editorAce.getValue();
                                              var regex = /\s+/gi;
                                              var wordCount = data.trim().replace(regex, ' ').split(' ').length;
                                              $("#editor1TC").text(data.length);
                                              $("#editor1TW").text(wordCount);
                                              var lines = data.split(/\r\n|\r|\n/).length;
                                              $("#editor1TL").text(lines);
                                              var count = countBytes(data);
                                              $("#editor1Size").text(formateByteCount(count));
                                              
                                              if($("#viewName").val() == "tableizer"){
                                              hideTableizer();
                                              }
                                              
                                              savetoLocalStorage(data);
                                              
                                              });
                                 
                                 var input = $('textarea[name="PAYLOAD"]');
                                 editorAce.getSession().setValue(input.text());
                                 editorAce.getSession().on("change", function () {
                                      input.val(editorAce.getSession().getValue());
                                 });
                                 /*editorAce.getSession().on('change', function () {
                                      console.log("THE PAYLOAD IS:"+editorAce.getSession().getValue());
                                 });*/

                                 editorAce2 = ace.edit("editor2");
                                 editorAce2.getSession().setMode("ace/mode/xml");
                                 editorAce2.getSession().setUseWrapMode(true);
                                 editorAce2.on('change', function() {
                                              var data = editorAce2.getValue();
                                              var regex = /\s+/gi;
                                              var wordCount = data.trim().replace(regex, ' ').split(' ').length;
                                              $("#editor1TC").text(data.length);
                                              $("#editor1TW").text(wordCount);
                                              var lines = data.split(/\r\n|\r|\n/).length;
                                              $("#editor1TL").text(lines);
                                              var count = countBytes(data);
                                              $("#editor1Size").text(formateByteCount(count));
                                              
                                              if($("#viewName").val() == "tableizer"){
                                              hideTableizer();
                                              }
                                              
                                              savetoLocalStorage(data);
                                              
                                              });
                                 var input2 = $('textarea[name="TEMPLATE"]');
                                 editorAce2.getSession().setValue(input2.text());
                                 editorAce2.getSession().on("change", function () {
                                        input2.val(editorAce2.getSession().getValue());
                                });
                                 
                                /* errors = ace.edit("errors");
                                 errors.getSession().setMode("ace/mode/" + mode1);
                                 errors.getSession().setUseWrapMode(true);
                                 errors.on('change', function() {
                                               var data = errors.getValue();
                                               var regex = /\s+/gi;
                                               var wordCount = data.trim().replace(regex, ' ').split(' ').length;
                                               $("#editor1TC").text(data.length);
                                               $("#editor1TW").text(wordCount);
                                               var lines = data.split(/\r\n|\r|\n/).length;
                                               $("#editor1TL").text(lines);
                                               var count = countBytes(data);
                                               $("#editor1Size").text(formateByteCount(count));
                                               
                                               if($("#viewName").val() == "tableizer"){
                                               hideTableizer();
                                               }
                                               
                                               savetoLocalStorage(data);
                                               
                                               });
                                 var inputErr = $('textarea[name="ERROR"]');
                                 errors.getSession().setValue(inputErr.text());
                                 errors.getSession().on("change", function () {
                                                            inputErr.val(errors.getSession().getValue());
                                                            });
                                 */
                                 editorAce3 = ace.edit("editor3");
                                 editorAce3.getSession().setMode("ace/mode/xml");
                                 editorAce3.getSession().setUseWrapMode(true);
                                 editorAce3.on('change', function() {
                                              var data = editorAce3.getValue();
                                              var regex = /\s+/gi;
                                              var wordCount = data.trim().replace(regex, ' ').split(' ').length;
                                              $("#editor1TC").text(data.length);
                                              $("#editor1TW").text(wordCount);
                                              var lines = data.split(/\r\n|\r|\n/).length;
                                              $("#editor1TL").text(lines);
                                              var count = countBytes(data);
                                              $("#editor1Size").text(formateByteCount(count));
                                              
                                              if($("#viewName").val() == "tableizer"){
                                              hideTableizer();
                                              }
                                              
                                              savetoLocalStorage(data);
                                              
                                              });
                                 var input3 = $('textarea[name="POSTPROCESSING_TEMP"]');
                                 editorAce3.getSession().setValue(input3.text());
                                 editorAce3.getSession().on("change", function () {
                                        input3.val(editorAce3.getSession().getValue());
                                 });
                                 
                                 editorAce4 = ace.edit("editor4");
                                 editorAce4.getSession().setMode("ace/mode/xml");
                                 editorAce4.getSession().setUseWrapMode(true);
                                 editorAce4.on('change', function() {
                                              var data = editorAce4.getValue();
                                              var regex = /\s+/gi;
                                              var wordCount = data.trim().replace(regex, ' ').split(' ').length;
                                              $("#editor1TC").text(data.length);
                                              $("#editor1TW").text(wordCount);
                                              var lines = data.split(/\r\n|\r|\n/).length;
                                              $("#editor1TL").text(lines);
                                              var count = countBytes(data);
                                              $("#editor1Size").text(formateByteCount(count));
                                              
                                              if($("#viewName").val() == "tableizer"){
                                              hideTableizer();
                                              }
                                              
                                              savetoLocalStorage(data);
                                              
                                              });
                                 var input4 = $('textarea[name="GOLDENXML"]');
                                 editorAce4.getSession().setValue(input4.text());
                                 editorAce4.getSession().on("change", function () {
                                         input4.val(editorAce4.getSession().getValue());
                                 });
                                 
                                 editorAce5 = ace.edit("editor5");
                                 editorAce5.getSession().setMode("ace/mode/xml");
                                 editorAce5.getSession().setUseWrapMode(true);
                                 editorAce5.on('change', function() {
                                              var data = editorAce5.getValue();
                                              var regex = /\s+/gi;
                                              var wordCount = data.trim().replace(regex, ' ').split(' ').length;
                                              $("#editor1TC").text(data.length);
                                              $("#editor1TW").text(wordCount);
                                              var lines = data.split(/\r\n|\r|\n/).length;
                                              $("#editor1TL").text(lines);
                                              var count = countBytes(data);
                                              $("#editor1Size").text(formateByteCount(count));
                                              
                                              if($("#viewName").val() == "tableizer"){
                                              hideTableizer();
                                              }
                                              
                                              savetoLocalStorage(data);
                                              
                                              });
                                 var input5 = $('textarea[name="POSTPROCESSING_VIEW"]');
                                 editorAce5.getSession().setValue(input5.text());
                                 editorAce5.getSession().on("change", function () {
                                          input5.val(editorAce5.getSession().getValue());
                                 });
                                 
                                 editorAce6 = ace.edit("editor6");
                                 editorAce6.getSession().setMode("ace/mode/xml");
                                 editorAce6.getSession().setUseWrapMode(true);
                                 editorAce6.on('change', function() {
                                              var data = editorAce6.getValue();
                                              var regex = /\s+/gi;
                                              var wordCount = data.trim().replace(regex, ' ').split(' ').length;
                                              $("#editor1TC").text(data.length);
                                              $("#editor1TW").text(wordCount);
                                              var lines = data.split(/\r\n|\r|\n/).length;
                                              $("#editor1TL").text(lines);
                                              var count = countBytes(data);
                                              $("#editor1Size").text(formateByteCount(count));
                                              
                                              if($("#viewName").val() == "tableizer"){
                                              hideTableizer();
                                              }
                                              
                                              savetoLocalStorage(data);
                                              
                                              });
                                 var input6 = $('textarea[name="RESULT"]');
                                 editorAce6.getSession().setValue(input6.text());
                                 editorAce6.getSession().on("change", function () {
                                           input6.val(editorAce6.getSession().getValue());
                                 });
                                 
                                 $(".editorCounterSection").show();
                                 }
                                 
                                 
                                 if (mode2 != undefined && mode2 != null) {
                                 editorResult = ace.edit("result");
                                 editorResult.getSession().setMode("ace/mode/xml");
                                 editorResult.getSession().setUseWrapMode(true);
                                 editorResult.on('change', function() {
                                                 var data = editorResult.getValue();
                                                 var regex = /\s+/gi;
                                                 var wordCount = data.trim().replace(regex, ' ').split(' ').length;
                                                 $("#editor2TC").text(data.length);
                                                 $("#editor2TW").text(wordCount);
                                                 var lines = data.split(/\r\n|\r|\n/).length;
                                                 $("#editor2TL").text(lines);
                                                 var count = countBytes(data);
                                                 $("#editor2Size").text(formateByteCount(count));
                                                 });
                                 $(".editorCounterSection").show();
                                 }
                                 
                                 
                                 }
                                 
                                 function countBytes(text, options) {
                                 // Set option defaults
                                 options = options || {};
                                 options.lineBreaks = options.lineBreaks || 1;
                                 options.ignoreWhitespace = options.ignoreWhitespace || false;
                                 
                                 var length = text.length,
                                 nonAscii = length - text.replace(/[\u0100-\uFFFF]/g, '').length,
                                 lineBreaks = length - text.replace(crlf, '').length;
                                 
                                 if (options.ignoreWhitespace) {
                                 // Strip whitespace
                                 text = text.replace(whitespace, '');
                                 
                                 return text.length + nonAscii;
                                 }
                                 else {
                                 return length + nonAscii + Math.max(0, options.lineBreaks * (lineBreaks - 1));
                                 }
                                 }
                                 
                                 function formateByteCount(count) {
                                 var level = 0;
                                 
                                 while (count > 1024) {
                                 count /= 1024;
                                 level++;
                                 }
                                 
                                 // Round to 2 decimals
                                 count = Math.round(count*100)/100;
                                 
                                 level = ['', 'K', 'M', 'G', 'T'][level];
                                 
                                 return count + ' ' + level + 'B';
                                 }
                                 
                                 
    /** ********************Brocken link checker******************************* */
                                 function getLinks() {
                                 var path = $("#url").val();
                                 
                                 if (path.length > 5) {
                                 
                                 $("#linksUL").html("");
                                 
                                 $.ajax({
                                        type : "post",
                                        url : globalurl + "service/getAllLinks",
                                        dataType : "json",
                                        data : {
                                        path : path
                                        },
                                        success : function(response) {
                                        
                                        if (response != null && response.length != 0) {
                                        var arr = path.split("/");
                                        
                                        var url = arr[0] + "//" + arr[2];
                                        
                                        var newLinks = [];
                                        
                                        $.each(response, function(i, link) {
                                               
                                               if (isUrl(link)) {
                                               newLinks.push(link);
                                               } else {
                                               if (link.indexOf("/") != 0) {
                                               link = "/" + link;
                                               }
                                               newLinks.push(url + link);
                                               }
                                               
                                               });
                                        $("#editor").show();
                                        $('.LinkStatusDiv').show();
                                        checkLink(newLinks);
                                        } else {
                                        openErrorDialog("No Links Found Or Not Accessible");
                                        }
                                        },
                                        error : function(e, s, a) {
                                        openErrorDialog("Failed to load data=" + s);
                                        }
                                        });
                                 }
                                 }
                                 function isUrl(s) {
                                 var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
                                 return regexp.test(s);
                                 }
                                 
                                 $("#url").keydown(function(e) {
                                                   
                                                   var keycode = e.keyCode || e.which;
                                                   
                                                   if (keycode == 13) {
                                                   getLinks();
                                                   }
                                                   
                                                   });
                                 
                                 function checkLink(links) {
                                 var brokenLinkCnt = 0;
                                 var activeLinkCnt = 0;
                                 $.each(links, function(i, link) {
                                        
                                        $.ajax({
                                               type : "post",
                                               url : globalurl + "service/check_url",
                                               dataType : "text",
                                               data : {
                                               path : link
                                               },
                                               success : function(response) {
                                               var status = "green";
                                               
                                               if (response == '308' || response == '404') {
                                               status = "red";
                                               brokenLinkCnt += 1;
                                               }
                                               activeLinkCnt += 1;
                                               $('.activeLink span').html(activeLinkCnt);
                                               $('.brokenLink span').html(brokenLinkCnt);
                                               $('#linksUL').append(
                                                                    '<li class=' + status + '><a href="' + link + '">'
                                                                    + link + '</a></li>');
                                               },
                                               error : function(e, s, a) {
                                               $('#linksUL').append(
                                                                    '<li class="red"><a href=' + link + '>' + link
                                                                    + '</a></li>');
                                               }
                                               });
                                        });
                                 }
                                 
                                 
    /** ********csv parser ************ */
    /*
     * Papa Parse v3.0.1 https://github.com/mholt/PapaParse
     */
                                 ;
                                 (function(e) {
                                  "use strict";
                                  function u(e, r) {
                                  var i = t ? r : g(r);
                                  var s = i.worker && Papa.WORKERS_SUPPORTED && n;
                                  if (s) {
                                  var o = d();
                                  o.userStep = i.step;
                                  o.userChunk = i.chunk;
                                  o.userComplete = i.complete;
                                  o.userError = i.error;
                                  i.step = b(i.step);
                                  i.chunk = b(i.chunk);
                                  i.complete = b(i.complete);
                                  i.error = b(i.error);
                                  delete i.worker;
                                  o.postMessage({
                                                input : e,
                                                config : i,
                                                workerId : o.id
                                                })
                                  } else {
                                  if (typeof e === "string") {
                                  if (i.download) {
                                  var u = new f(i);
                                  u.stream(e)
                                  } else {
                                  var a = new c(i);
                                  var h = a.parse(e);
                                  if (b(i.complete))
                                  i.complete(h);
                                  return h
                                  }
                                  } else if (e instanceof File) {
                                  if (i.step || i.chunk) {
                                  var u = new l(i);
                                  u.stream(e)
                                  } else {
                                  var a = new c(i);
                                  if (t) {
                                  var p = new FileReaderSync;
                                  var v = p.readAsText(e, i.encoding);
                                  return a.parse(v)
                                  } else {
                                  p = new FileReader;
                                  p.onload = function(e) {
                                  var t = new c(i);
                                  var n = t.parse(e.target.result);
                                  if (b(i.complete))
                                  i.complete(n)
                                  };
                                  p.readAsText(e, i.encoding)
                                  }
                                  }
                                  }
                                  }
                                  }
                                  function a(t, n) {
                                  function a() {
                                  if (typeof n !== "object")
                                  return;
                                  if (typeof n.delimiter === "string" && n.delimiter.length == 1
                                      && e.Papa.BAD_DELIMITERS.indexOf(n.delimiter) == -1) {
                                  o = n.delimiter
                                  }
                                  if (typeof n.quotes === "boolean" || n.quotes instanceof Array)
                                  s = n.quotes;
                                  if (typeof n.newline === "string")
                                  u = n.newline
                                  }
                                  function f(e) {
                                  if (typeof e !== "object")
                                  return [];
                                  var t = [];
                                  for ( var n in e)
                                  t.push(n);
                                  return t
                                  }
                                  function l(e, t) {
                                  var n = "";
                                  if (typeof e === "string")
                                  e = JSON.parse(e);
                                  if (typeof t === "string")
                                  t = JSON.parse(t);
                                  var r = e instanceof Array && e.length > 0;
                                  var i = !(t[0] instanceof Array);
                                  if (r) {
                                  for ( var s = 0; s < e.length; s++) {
                                  if (s > 0)
                                  n += o;
                                  n += c(e[s], s)
                                  }
                                  if (t.length > 0)
                                  n += u
                                  }
                                  for ( var a = 0; a < t.length; a++) {
                                  var f = r ? e.length : t[a].length;
                                  for ( var l = 0; l < f; l++) {
                                  if (l > 0)
                                  n += o;
                                  var h = r && i ? e[l] : l;
                                  n += c(t[a][h], l)
                                  }
                                  if (a < t.length - 1)
                                  n += u
                                  }
                                  return n
                                  }
                                  function c(t, n) {
                                  if (typeof t === "undefined")
                                  return "";
                                  t = t.toString().replace(/"/g, '""');
                                                           var r = typeof s === "boolean" && s || s instanceof Array && s[n]
                                                           || h(t, e.Papa.BAD_DELIMITERS) || t.indexOf(o) > -1
                                                           || t.charAt(0) == " " || t.charAt(t.length - 1) == " ";
                                                           return r ? '"' + t + '"' : t
                                                           }
                                                           function h(e, t) {
                                                           for ( var n = 0; n < t.length; n++)
                                                           if (e.indexOf(t[n]) > -1)
                                                           return true;
                                                           return false
                                                           }
                                                           var r = "";
                                                           var i = [];
                                                           var s = false;
                                                           var o = ",";
                                                           var u = "\r\n";
                                                           a();
                                                           if (typeof t === "string")
                                                           t = JSON.parse(t);
                                                           if (t instanceof Array) {
                                                           if (!t.length || t[0] instanceof Array)
                                                           return l(null, t);
                                                           else if (typeof t[0] === "object")
                                                           return l(f(t[0]), t)
                                                           } else if (typeof t === "object") {
                                                           if (typeof t.data === "string")
                                                           t.data = JSON.parse(t.data);
                                                           if (t.data instanceof Array) {
                                                           if (!t.fields)
                                                           t.fields = t.data[0] instanceof Array ? t.fields
                                                           : f(t.data[0]);
                                                           if (!(t.data[0] instanceof Array)
                                                               && typeof t.data[0] !== "object")
                                                           t.data = [ t.data ]
                                                           }
                                                           return l(t.fields || [], t.data || [])
                                                           }
                                                           throw "exception: Unable to serialize unrecognized input"
                                                           }
                                                           function f(n) {
                                                           n = n || {};
                                                           if (!n.chunkSize)
                                                           n.chunkSize = Papa.RemoteChunkSize;
                                                           var r = 0, i = 0;
                                                           var s = "";
                                                           var o = "";
                                                           var u, a;
                                                           var f = new c(y(n));
                                                           this.stream = function(l) {
                                                           function c() {
                                                           u = new XMLHttpRequest;
                                                           if (!t) {
                                                           u.onload = h;
                                                           u.onerror = p
                                                           }
                                                           u.open("GET", l, !t);
                                                           if (n.step) {
                                                           var e = r + n.chunkSize - 1;
                                                           if (i && e > i)
                                                           e = i;
                                                           u.setRequestHeader("Range", "bytes=" + r + "-" + e)
                                                           }
                                                           u.send();
                                                           if (t && u.status == 0)
                                                           p();
                                                           else
                                                           r += n.chunkSize
                                                           }
                                                           function h() {
                                                           if (u.readyState != 4)
                                                           return;
                                                           if (u.status < 200 || u.status >= 400) {
                                                           p();
                                                           return
                                                           }
                                                           s += o + u.responseText;
                                                           o = "";
                                                           var i = !n.step || r > d(u);
                                                           if (!i) {
                                                           var l = s.lastIndexOf("\n");
                                                           if (l < 0)
                                                           l = s.lastIndexOf("\r");
                                                           if (l > -1) {
                                                           o = s.substring(l + 1);
                                                           s = s.substring(0, l)
                                                           } else {
                                                           a();
                                                           return
                                                           }
                                                           }
                                                           var c = f.parse(s);
                                                           s = "";
                                                           if (t) {
                                                           e.postMessage({
                                                                         results : c,
                                                                         workerId : Papa.WORKER_ID,
                                                                         finished : i
                                                                         })
                                                           } else if (b(n.chunk)) {
                                                           n.chunk(c);
                                                           c = undefined
                                                           }
                                                           if (i && b(n.complete))
                                                           n.complete(c);
                                                           else if (c && c.meta.aborted && b(n.complete))
                                                           n.complete(c);
                                                           else if (!i)
                                                           a()
                                                           }
                                                           function p() {
                                                           if (b(n.error))
                                                           n.error(u.statusText);
                                                           else if (t && n.error) {
                                                           e.postMessage({
                                                                         workerId : Papa.WORKER_ID,
                                                                         error : u.statusText,
                                                                         finished : false
                                                                         })
                                                           }
                                                           }
                                                           function d(e) {
                                                           var t = e.getResponseHeader("Content-Range");
                                                           return parseInt(t.substr(t.lastIndexOf("/") + 1))
                                                           }
                                                           if (t) {
                                                           a = function() {
                                                           c();
                                                           h()
                                                           }
                                                           } else {
                                                           a = function() {
                                                           c()
                                                           }
                                                           }
                                                           a()
                                                           }
                                                           }
                                                           function l(n) {
                                                           n = n || {};
                                                           if (!n.chunkSize)
                                                           n.chunkSize = Papa.LocalChunkSize;
                                                           var r = 0;
                                                           var i = "";
                                                           var s = "";
                                                           var o, u, a;
                                                           var f = new c(y(n));
                                                           var l = typeof FileReader === "function";
                                                           this.stream = function(u) {
                                                           function c() {
                                                           if (r < u.size)
                                                           h()
                                                           }
                                                           function h() {
                                                           var e = Math.min(r + n.chunkSize, u.size);
                                                           var t = o.readAsText(a.call(u, r, e), n.encoding);
                                                           if (!l)
                                                           p({
                                                             target : {
                                                             result : t
                                                             }
                                                             })
                                                           }
                                                           function p(o) {
                                                           r += n.chunkSize;
                                                           i += s + o.target.result;
                                                           s = "";
                                                           var a = r >= u.size;
                                                           if (!a) {
                                                           var l = i.lastIndexOf("\n");
                                                           if (l < 0)
                                                           l = i.lastIndexOf("\r");
                                                           if (l > -1) {
                                                           s = i.substring(l + 1);
                                                           i = i.substring(0, l)
                                                           } else {
                                                           c();
                                                           return
                                                           }
                                                           }
                                                           var h = f.parse(i);
                                                           i = "";
                                                           if (t) {
                                                           e.postMessage({
                                                                         results : h,
                                                                         workerId : Papa.WORKER_ID,
                                                                         finished : a
                                                                         })
                                                           } else if (b(n.chunk)) {
                                                           n.chunk(h, u);
                                                           h = undefined
                                                           }
                                                           if (a && b(n.complete))
                                                           n.complete(undefined, u);
                                                           else if (h && h.meta.aborted && b(n.complete))
                                                           n.complete(h, u);
                                                           else if (!a)
                                                           c()
                                                           }
                                                           function d() {
                                                           if (b(n.error))
                                                           n.error(o.error, u);
                                                           else if (t && n.error) {
                                                           e.postMessage({
                                                                         workerId : Papa.WORKER_ID,
                                                                         error : o.error,
                                                                         file : u,
                                                                         finished : false
                                                                         })
                                                           }
                                                           }
                                                           var a = u.slice || u.webkitSlice || u.mozSlice;
                                                           if (l) {
                                                           o = new FileReader;
                                                           o.onload = p;
                                                           o.onerror = d
                                                           } else
                                                           o = new FileReaderSync;
                                                           c()
                                                           }
                                                           }
                                                           function c(e) {
                                                           function s() {
                                                           if (i && n) {
                                                           c("Delimiter", "UndetectableDelimiter",
                                                             "Unable to auto-detect delimiting character; defaulted to comma");
                                                           n = false
                                                           }
                                                           if (o())
                                                           u();
                                                           return a()
                                                           }
                                                           function o() {
                                                           return e.header && r.length == 0
                                                           }
                                                           function u() {
                                                           if (!i)
                                                           return;
                                                           for ( var e = 0; o() && e < i.data.length; e++)
                                                           for ( var t = 0; t < i.data[e].length; t++)
                                                           r.push(i.data[e][t]);
                                                           i.data.splice(0, 1)
                                                           }
                                                           function a() {
                                                           if (!i || !e.header && !e.dynamicTyping)
                                                           return i;
                                                           for ( var t = 0; t < i.data.length; t++) {
                                                           var n = {};
                                                           for ( var s = 0; s < i.data[t].length; s++) {
                                                           if (e.dynamicTyping) {
                                                           var o = i.data[t][s];
                                                           if (o == "true")
                                                           i.data[t][s] = true;
                                                           else if (o == "false")
                                                           i.data[t][s] = false;
                                                           else
                                                           i.data[t][s] = l(o)
                                                           }
                                                           if (e.header) {
                                                           if (s >= r.length) {
                                                           if (!n["__parsed_extra"])
                                                           n["__parsed_extra"] = [];
                                                           n["__parsed_extra"].push(i.data[t][s])
                                                           }
                                                           n[r[s]] = i.data[t][s]
                                                           }
                                                           }
                                                           if (e.header) {
                                                           i.data[t] = n;
                                                           if (s > r.length)
                                                           c("FieldMismatch", "TooManyFields",
                                                             "Too many fields: expected " + r.length
                                                             + " fields but parsed " + s, t);
                                                           else if (s < r.length)
                                                           c("FieldMismatch", "TooFewFields",
                                                             "Too few fields: expected " + r.length
                                                             + " fields but parsed " + s, t)
                                                           }
                                                           }
                                                           if (e.header && i.meta)
                                                           ;
                                                           i.meta.fields = r;
                                                           return i
                                                           }
                                                           function f(t) {
                                                           var n = [ ",", " ", "|", ";", Papa.RECORD_SEP, Papa.UNIT_SEP ];
                                                           var r, i, s;
                                                           for ( var o = 0; o < n.length; o++) {
                                                           var u = n[o];
                                                           var a = 0, f = 0;
                                                           s = undefined;
                                                           var l = (new h({
                                                                          delimiter : u,
                                                                          preview : 10
                                                                          })).parse(t);
                                                           for ( var c = 0; c < l.data.length; c++) {
                                                           var p = l.data[c].length;
                                                           f += p;
                                                           if (typeof s === "undefined") {
                                                           s = p;
                                                           continue
                                                           } else if (p > 1) {
                                                           a += Math.abs(p - s);
                                                           s = p
                                                           }
                                                           }
                                                           f /= l.data.length;
                                                           if ((typeof i === "undefined" || a < i) && f > 1.99) {
                                                           i = a;
                                                           r = u
                                                           }
                                                           }
                                                           e.delimiter = r;
                                                           return {
                                                           successful : !!r,
                                                           bestDelimiter : r
                                                           }
                                                           }
                                                           function l(e) {
                                                           var n = t.test(e);
                                                           return n ? parseFloat(e) : e
                                                           }
                                                           function c(e, t, n, r) {
                                                           i.errors.push({
                                                                         type : e,
                                                                         code : t,
                                                                         message : n,
                                                                         row : r
                                                                         })
                                                           }
                                                           var t = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;
                                                           var n;
                                                           var r = [];
                                                           var i = {
                                                           data : [],
                                                           errors : [],
                                                           meta : {}
                                                           };
                                                           e = y(e);
                                                           this.parse = function(t) {
                                                           n = false;
                                                           if (!e.delimiter) {
                                                           var r = f(t);
                                                           if (r.successful)
                                                           e.delimiter = r.bestDelimiter;
                                                           else {
                                                           n = true;
                                                           e.delimiter = ","
                                                           }
                                                           i.meta.delimiter = e.delimiter
                                                           }
                                                           if (b(e.step)) {
                                                           var u = e.step;
                                                           e.step = function(e, t) {
                                                           i = e;
                                                           if (o())
                                                           s();
                                                           else
                                                           u(s(), t)
                                                           }
                                                           }
                                                           i = (new h(e)).parse(t);
                                                           return s()
                                                           }
                                                           }
                                                           function h(e) {
                                                           function E() {
                                                           while (l < r.length) {
                                                           if (y)
                                                           break;
                                                           if (a > 0 && g >= a)
                                                           break;
                                                           if (w)
                                                           return x();
                                                           if (f == '"')
                                                           T();
                                                           else if (c)
                                                           N();
                                                           else
                                                           C();
                                                           S()
                                                           }
                                                           return x()
                                                           }
                                                           function S() {
                                                           l++;
                                                           f = r[l]
                                                           }
                                                           function x() {
                                                           if (y)
                                                           I("Abort", "ParseAbort",
                                                             "Parsing was aborted by the user's step function");
                                                           if (c)
                                                           I("Quotes", "MissingQuotes", "Unescaped or mismatched quotes");
                                                           _();
                                                           if (!b(o))
                                                           return U()
                                                           }
                                                           function T() {
                                                           if (j() && !B())
                                                           c = !c;
                                                           else {
                                                           A();
                                                           if (c && B())
                                                           l++;
                                                           else
                                                           I("Quotes", "UnexpectedQuotes", "Unexpected quotes")
                                                           }
                                                           }
                                                           function N() {
                                                           if (P(l) || H(l))
                                                           h++;
                                                           A()
                                                           }
                                                           function C() {
                                                           if (f == i)
                                                           O();
                                                           else if (P(l)) {
                                                           M();
                                                           S()
                                                           } else if (H(l))
                                                           M();
                                                           else if (k())
                                                           L();
                                                           else
                                                           A()
                                                           }
                                                           function k() {
                                                           if (!s)
                                                           return false;
                                                           var e = l == 0 || H(l - 1) || P(l - 2);
                                                           return e && r[l] === s
                                                           }
                                                           function L() {
                                                           while (!P(l) && !H(l) && l < r.length) {
                                                           S()
                                                           }
                                                           }
                                                           function A() {
                                                           p[v][m] += f
                                                           }
                                                           function O() {
                                                           p[v].push("");
                                                           m = p[v].length - 1
                                                           }
                                                           function M() {
                                                           _();
                                                           h++;
                                                           g++;
                                                           p.push([]);
                                                           v = p.length - 1;
                                                           O()
                                                           }
                                                           function _() {
                                                           D();
                                                           if (b(o)) {
                                                           if (p[v])
                                                           o(U(), t);
                                                           R()
                                                           }
                                                           }
                                                           function D() {
                                                           if (p[v].length == 1 && n.test(p[v][0])) {
                                                           if (e.keepEmptyRows)
                                                           p[v].splice(0, 1);
                                                           else
                                                           p.splice(v, 1);
                                                           v = p.length - 1
                                                           }
                                                           }
                                                           function P(e) {
                                                           return e < r.length - 1
                                                           && (r[e] == "\r" && r[e + 1] == "\n" || r[e] == "\n"
                                                               && r[e + 1] == "\r")
                                                           }
                                                           function H(e) {
                                                           return r[e] == "\r" || r[e] == "\n"
                                                           }
                                                           function B() {
                                                           return !j() && l < r.length - 1 && r[l + 1] == '"'
                                                           }
                                                           function j() {
                                                           return !c && F(l - 1) || F(l + 1)
                                                           }
                                                           function F(e) {
                                                           if (typeof e != "number")
                                                           e = l;
                                                           var t = r[e];
                                                           return e <= -1 || e >= r.length || t == i || t == "\r" || t == "\n"
                                                           }
                                                           function I(e, t, n) {
                                                           d.push({
                                                                  type : e,
                                                                  code : t,
                                                                  message : n,
                                                                  line : h,
                                                                  row : v,
                                                                  index : l
                                                                  })
                                                           }
                                                           function q(e) {
                                                           r = e;
                                                           c = false;
                                                           l = 0, g = 0, h = 1;
                                                           R();
                                                           p = [ [ "" ] ];
                                                           f = r[l]
                                                           }
                                                           function R() {
                                                           p = [];
                                                           d = [];
                                                           v = 0;
                                                           m = 0
                                                           }
                                                           function U() {
                                                           return {
                                                           data : p,
                                                           errors : d,
                                                           meta : {
                                                           lines : h,
                                                           delimiter : i,
                                                           aborted : y
                                                           }
                                                           }
                                                           }
                                                           var t = this;
                                                           var n = /^\s*$/;
                                                           var r;
                                                           var i;
                                                           var s;
                                                           var o;
                                                           var u;
                                                           var a;
                                                           var f;
                                                           var l;
                                                           var c;
                                                           var h;
                                                           var p;
                                                           var d;
                                                           var v;
                                                           var m;
                                                           var g;
                                                           var y = false;
                                                           var w = false;
                                                           e = e || {};
                                                           i = e.delimiter;
                                                           s = e.comments;
                                                           o = e.step;
                                                           a = e.preview;
                                                           if (typeof i !== "string" || i.length != 1
                                                               || Papa.BAD_DELIMITERS.indexOf(i) > -1)
                                                           i = ",";
                                                           if (s === true)
                                                           s = "#";
                                                           else if (typeof s !== "string" || s.length != 1
                                                                    || Papa.BAD_DELIMITERS.indexOf(s) > -1 || s == i)
                                                           s = false;
                                                           this.parse = function(e) {
                                                           if (typeof e !== "string")
                                                           throw "Input must be a string";
                                                           q(e);
                                                           return E()
                                                           };
                                                           this.abort = function() {
                                                           y = true
                                                           }
                                                           }
                                                           function p() {
                                                           var e = "worker" + String(Math.random()).substr(2);
                                                           document.write('<script id="' + e + '"></script>');
                                                           return document.getElementById(e).previousSibling.src
                                                           }
                                                           function d() {
                                                           if (!Papa.WORKERS_SUPPORTED)
                                                           return false;
                                                           var t = new e.Worker(n);
                                                           t.onmessage = v;
                                                           t.id = i++;
                                                           r[t.id] = t;
                                                           return t
                                                           }
                                                           function v(e) {
                                                           var t = e.data;
                                                           var n = r[t.workerId];
                                                           if (t.error)
                                                           n.userError(t.error, t.file);
                                                           else if (t.results && t.results.data) {
                                                           if (b(n.userStep)) {
                                                           for ( var i = 0; i < t.results.data.length; i++) {
                                                           n.userStep({
                                                                      data : [ t.results.data[i] ],
                                                                      errors : t.results.errors,
                                                                      meta : t.results.meta
                                                                      })
                                                           }
                                                           delete t.results
                                                           } else if (b(n.userChunk)) {
                                                           n.userChunk(t.results, t.file);
                                                           delete t.results
                                                           }
                                                           }
                                                           if (t.finished) {
                                                           if (b(r[t.workerId].userComplete))
                                                           r[t.workerId].userComplete(t.results);
                                                           r[t.workerId].terminate();
                                                           delete r[t.workerId]
                                                           }
                                                           }
                                                           function m(t) {
                                                           var n = t.data;
                                                           if (typeof Papa.WORKER_ID === "undefined" && n)
                                                           Papa.WORKER_ID = n.workerId;
                                                           if (typeof n.input === "string") {
                                                           e.postMessage({
                                                                         workerId : Papa.WORKER_ID,
                                                                         results : Papa.parse(n.input, n.config),
                                                                         finished : true
                                                                         })
                                                           } else if (n.input instanceof File) {
                                                           var r = Papa.parse(n.input, n.config);
                                                           if (r)
                                                           e.postMessage({
                                                                         workerId : Papa.WORKER_ID,
                                                                         results : r,
                                                                         finished : true
                                                                         })
                                                           }
                                                           }
                                                           function g(e) {
                                                           if (typeof e !== "object")
                                                           e = {};
                                                           var t = y(e);
                                                           if (typeof t.delimiter !== "string" || t.delimiter.length != 1
                                                               || Papa.BAD_DELIMITERS.indexOf(t.delimiter) > -1)
                                                           t.delimiter = s.delimiter;
                                                           if (typeof t.header !== "boolean")
                                                           t.header = s.header;
                                                           if (typeof t.dynamicTyping !== "boolean")
                                                           t.dynamicTyping = s.dynamicTyping;
                                                           if (typeof t.preview !== "number")
                                                           t.preview = s.preview;
                                                           if (typeof t.step !== "function")
                                                           t.step = s.step;
                                                           if (typeof t.complete !== "function")
                                                           t.complete = s.complete;
                                                           if (typeof t.encoding !== "string")
                                                           t.encoding = s.encoding;
                                                           if (typeof t.worker !== "boolean")
                                                           t.worker = s.worker;
                                                           if (typeof t.download !== "boolean")
                                                           t.download = s.download;
                                                           if (typeof t.keepEmptyRows !== "boolean")
                                                           t.keepEmptyRows = s.keepEmptyRows;
                                                           return t
                                                           }
                                                           function y(e) {
                                                           if (typeof e !== "object")
                                                           return e;
                                                           var t = e instanceof Array ? [] : {};
                                                           for ( var n in e)
                                                           t[n] = y(e[n]);
                                                           return t
                                                           }
                                                           function b(e) {
                                                           return typeof e === "function"
                                                           }
                                                           var t = !e.document, n;
                                                           var r = {}, i = 0;
                                                           var s = {
                                                           delimiter : "",
                                                           header : false,
                                                           dynamicTyping : false,
                                                           preview : 0,
                                                           step : undefined,
                                                           encoding : "",
                                                           worker : false,
                                                           comments : false,
                                                           complete : undefined,
                                                           download : false,
                                                           chunk : undefined,
                                                           keepEmptyRows : false
                                                           };
                                                           e.Papa = {};
                                                           e.Papa.parse = u;
                                                           e.Papa.unparse = a;
                                                           e.Papa.RECORD_SEP = String.fromCharCode(30);
                                                           e.Papa.UNIT_SEP = String.fromCharCode(31);
                                                           e.Papa.BYTE_ORDER_MARK = "ï»¿";
                                                           e.Papa.BAD_DELIMITERS = [ "\r", "\n", '"', e.Papa.BYTE_ORDER_MARK ];
                                                           e.Papa.WORKERS_SUPPORTED = !!e.Worker;
                                                           e.Papa.LocalChunkSize = 1024 * 1024 * 10;
                                                           e.Papa.RemoteChunkSize = 1024 * 1024 * 5;
                                                           e.Papa.Parser = h;
                                                           e.Papa.ParserHandle = c;
                                                           e.Papa.NetworkStreamer = f;
                                                           e.Papa.FileStreamer = l;
                                                           if (e.jQuery) {
                                                           var o = e.jQuery;
                                                           o.fn.parse = function(t) {
                                                           function i() {
                                                           if (r.length == 0) {
                                                           if (b(t.complete))
                                                           t.complete();
                                                           return
                                                           }
                                                           var e = r[0];
                                                           if (b(t.before)) {
                                                           var n = t.before(e.file, e.inputElem);
                                                           if (typeof n === "object") {
                                                           if (n.action == "abort") {
                                                           s("AbortError", e.file, e.inputElem, n.reason);
                                                           return
                                                           } else if (n.action == "skip") {
                                                           u();
                                                           return
                                                           } else if (typeof n.config === "object")
                                                           e.instanceConfig = o.extend(e.instanceConfig,
                                                                                       n.config)
                                                           } else if (n == "skip") {
                                                           u();
                                                           return
                                                           }
                                                           }
                                                           var i = e.instanceConfig.complete;
                                                           e.instanceConfig.complete = function(t) {
                                                           if (b(i))
                                                           i(t, e.file, e.inputElem);
                                                           u()
                                                           };
                                                           Papa.parse(e.file, e.instanceConfig)
                                                           }
                                                           function s(e, n, r, i) {
                                                           if (b(t.error))
                                                           t.error({
                                                                   name : e
                                                                   }, n, r, i)
                                                           }
                                                           function u() {
                                                           r.splice(0, 1);
                                                           i()
                                                           }
                                                           var n = t.config || {};
                                                           var r = [];
                                                           this.each(function(t) {
                                                                     var i = o(this).prop("tagName").toUpperCase() == "INPUT"
                                                                     && o(this).attr("type").toLowerCase() == "file"
                                                                     && e.FileReader;
                                                                     if (!i || !this.files || this.files.length == 0)
                                                                     return true;
                                                                     for ( var s = 0; s < this.files.length; s++) {
                                                                     r.push({
                                                                            file : this.files[s],
                                                                            inputElem : this,
                                                                            instanceConfig : o.extend({}, n)
                                                                            })
                                                                     }
                                                                     });
                                                           i();
                                                           return this
                                                           }
                                                           }
                                                           if (t)
                                                           e.onmessage = m;
                                                           else if (Papa.WORKERS_SUPPORTED)
                                                           n = p()
                                                           })(this);
                                  
    /** **********************Base64 to Image Converter**************************** */
                                  function setBase64ToImage(){
                                  
                                  var baseString = $("#base64string").val().trim();
                                  // data:image/png;base64
                                  
                                  if(baseString.substring(0,4) != "data"){
                                  baseString = "data:image/png;base64," + baseString;
                                  }
                                  
                                  $("#base64Img").prop('src',baseString);
                                  $("#base64Img").addClass("span12 baseurlopa2");
                                  $("#dwnldLink").show();
                                  $("#dwnldLink").prop('href',baseString);
                                  }
                                  
                                  function setViewTitle(title,showMenu,showSaveBtn){
                                  
                                  
                                  
                                  if(showMenu != undefined && showMenu == true){
                                  $("#moreMenu").show();
                                  }
                                  else{
                                  $("#moreMenu").hide();
                                  }
                                  
                                  if(showSaveBtn != undefined && showSaveBtn == true){
                                  $("#savebtn").show();
                                  }
                                  else{
                                  $("#savebtn").hide();
                                  }
                                  }
                                  
                                  function closeMsg_Credit_Card_Validator(){
                                  $("#hResult").hide();
                                  $("#closemsg").hide();
                                  }
                                  
                                  // viewers common function
                                  
                                  function createFile(ext,divID){
                                  
                                  var content = "";
                                  
                                  if(divID == undefined){
                                  if(typeof editorResult != 'undefined'){
                                  content = editorResult.getValue();
                                  }
                                  if(content.trim().length==0 && typeof editor != 'undefined'){
                                  content = editor.getText();
                                  }
                                  if(content.trim().length==0 && typeof editorAce != 'undefined'){
                                  content = editorAce.getValue();
                                  }
                                  }
                                  else{
                                  content = $("#"+divID).text();
                                  
                                  if(ext == "html"){
                                  content = vkbeautify.xml(content);
                                  }
                                  }
                                  
                                  if(ext == "converted"){
                                  ext = converted;
                                  }
                                  
                                  if (content.trim().length != 0) {
                                  var blob = new Blob([ "" + content + "" ], {
                                                      type : "text/plain;charset=utf-8"
                                                      });
                                  saveAs(blob, "codebeautify."+ext);
                                  }
                                  else{
                                  openErrorDialog("Sorry Result is Empty");
                                  }
                                  }
                                  
                                  
                                  
                                  // contact us
                                  function sendMail() {
                                  
                                  var code = grecaptcha.getResponse();
                                  var captchaCode = code;
                                  
                                  
                                  if (code.trim().length > 0) {
                                  
                                  if (code == captchaCode) {
                                  var email = $("#email").val();
                                  var subject = $("#subject").val();
                                  var message = $("#message").val();
                                  var name = $("#name").val();
                                  if (subject.trim().length > 0 && message.trim().length > 0 && name.trim().length > 0 && email.trim().length > 0) {
                                  if (isValidEmailAddress(email)) {
                                  
                                  $.ajax({
                                         url: globalurl + "mailSend",
                                         type: 'post',
                                         data: {
                                         email: email,
                                         subject: subject,
                                         message: message,
                                         name: name,
                                         code: code.toLowerCase()
                                         },
                                         success: function(response) {
                                         
                                         if (response.toLowerCase().indexOf("success") >= 0) {
                                         openErrorDialog("Mail sent successfully");
                                         $("#email").val("");
                                         $("#subject").val("");
                                         $("#message").val("");
                                         $("#name").val("");
                                         $("#code").val("");
                                         $("#captchaCode").val("");
                                         
                                         
                                         } else {
                                         openErrorDialog("Error in sending..");
                                         $("#code").val("");
                                         $("#captchaCode").val("");
                                         }
                                         },
                                         error: function(e, s, a) {
                                         openErrorDialog("Error in sending..=" + s);
                                         $("#code").val("");
                                         $("#captchaCode").val("");
                                         }
                                         });
                                  } else {
                                  openErrorDialog("Enter valid email address");
                                  }
                                  } else {
                                  openErrorDialog("Fill required data");
                                  }
                                  } else {
                                  openErrorDialog("pls enter valid captcha code display in box");
                                  $("#code").val("");
                                  $("#captchaCode").val("");
                                  }
                                  } else {
                                  openErrorDialog("Please fill/attend the Captcha");
                                  }
                                  }
                                  
                                  function isValidEmailAddress(emailAddress) {
                                  var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                                  return pattern.test(emailAddress);
                                  }
                                  
                                  // google map location code
                                  var map;
                                  
                                  function initialize() {
                                  var mapOptions = {
                                  zoom: 17
                                  };
                                  map = new google.maps.Map(document.getElementById('map-canvas'),
                                                            mapOptions);
                                  
                                  // Try HTML5 geolocation
                                  if(navigator.geolocation) {
                                  navigator.geolocation.getCurrentPosition(function(position) {
                                                                           var pos = new google.maps.LatLng(position.coords.latitude,
                                                                                                            position.coords.longitude);
                                                                           
                                                                           
                                                                           var contentString = "<div><b>You are currently here.</b></div>"
                                                                           
                                                                           var infowindow = new google.maps.InfoWindow({
                                                                                                                       map: map,
                                                                                                                       position: pos,
                                                                                                                       content: contentString,
                                                                                                                       maxWidth: 200
                                                                                                                       });
                                                                           
                                                                           var marker = new google.maps.Marker({
                                                                                                               position: pos,
                                                                                                               map: map,
                                                                                                               });
                                                                           
                                                                           
                                                                           map.setCenter(pos);
                                                                           
                                                                           infowindow.open(map,marker);
                                                                           }, function() {
                                                                           handleNoGeolocation(true);
                                                                           });
                                  } else {
                                  // Browser doesn't support Geolocation
                                  handleNoGeolocation(false);
                                  }
                                  }
                                  
                                  function handleNoGeolocation(errorFlag) {
                                  if (errorFlag) {
                                  var content = 'Error: The Geolocation service failed.';
                                  } else {
                                  var content = 'Error: Your browser doesn\'t support geolocation.';
                                  }
                                  
                                  var options = {
                                  map: map,
                                  position: new google.maps.LatLng(60, 105),
                                  content: content
                                  };
                                  
                                  var infowindow = new google.maps.InfoWindow(options);
                                  map.setCenter(options.position);
                                  }
                                  
                                  function getUrlFromString($str){
                                  var url = "";
                                  
                                  try{
                                  if($str != null && $str.length != 0){
                                  $("#tempDiv").html('');
                                  $("#tempDiv").html($str);
                                  $str = $("#tempDiv a").attr('href');
                                  var u = $str.split('=');
                                  if(u != null && u.length != 0){
                                  url = u[1].replace("/","");
                                  var    a = document.createElement('a');
                                  a.href = url;
                                  url = a.hostname;
                                  }
                                  }
                                  return url;
                                  }
                                  catch(e){
                                  return '--';
                                  }
                                  }
                                  
                                  // google search rank
                                  
                                  
                                  function getJsonSampleData() {
                                  var sampleJson= '   {\n  '  +
                                  '       "employees": {\n  '  +
                                  '           "employee": [\n  '  +
                                  '               {\n  '  +
                                  '                   "id": "1", \n '  +
                                  '                   "firstName": "Tom", \n '  +
                                  '                   "lastName": "Cruise",\n  '  +
                                  '                   "photo": "https://pbs.twimg.com/profile_images/735509975649378305/B81JwLT7.jpg"  \n'  +
                                  '               },\n  '  +
                                  '               { \n '  +
                                  '                   "id": "2",\n  '  +
                                  '                   "firstName": "Maria", \n '  +
                                  '                   "lastName": "Sharapova",  \n'  +
                                  '                   "photo": "https://pbs.twimg.com/profile_images/3424509849/bfa1b9121afc39d1dcdb53cfc423bf12.jpeg" \n '  +
                                  '               }, \n '  +
                                  '               { \n '  +
                                  '                   "id": "3", \n '  +
                                  '                   "firstName": "James", \n '  +
                                  '                   "lastName": "Bond", \n '  +
                                  '                   "photo": "https://pbs.twimg.com/profile_images/664886718559076352/M00cOLrh.jpg" \n '  +
                                  '               } \n '  +
                                  '           ] \n '  +
                                  '       }  \n'  +
                                  '  } \n ' ;
                                  
                                  
                                  
                                  setToEditor(sampleJson);
                                  
                                  
                                  $(".sharelinkurl").attr("st_url", window.location);
                                  $(".sharelinkurl").attr("st_title", $("#save_link_title").val());
                                  }
                                  
                                  function getXMLSampleData(editorid,isReturn) {
                                  
                                  var sampleXML='';
                                  var isEditorAce = null;
                                  if (editorid==='#editor') {
                                  isEditorAce = editorAce;
                                  sampleXML='<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<breakfast_menu>\r\n\r\n<food>\r\n<name>Belgian Waffles<\/name>\r\n<price>$5.95<\/price>\r\n<description>Two of our famous Belgian Waffles with plenty of real maple syrup<\/description>\r\n<calories>650<\/calories>\r\n<\/food>\r\n\r\n<food>\r\n<name>Strawberry Belgian Waffles<\/name>\r\n<price>$7.95<\/price>\r\n<description>Light Belgian waffles covered with strawberries and whipped cream<\/description>\r\n<calories>900<\/calories>\r\n<\/food>\r\n\r\n<food>\r\n<name>Berry-Berry Belgian Waffles<\/name>\r\n<price>$8.95<\/price>\r\n<description>Light Belgian waffles covered with an assortment of fresh berries and whipped cream<\/description>\r\n<calories>900<\/calories>\r\n<\/food>\r\n\r\n<food>\r\n<name>French Toast<\/name>\r\n<price>$4.50<\/price>\r\n<description>Thick slices made from our homemade sourdough bread<\/description>\r\n<calories>600<\/calories>\r\n<\/food>\r\n\r\n<food>\r\n<name>Homestyle Breakfast<\/name>\r\n<price>$6.95<\/price>\r\n<description>Two eggs, bacon or sausage, toast, and our ever-popular hash browns<\/description>\r\n<calories>950<\/calories>\r\n<\/food>\r\n\r\n<\/breakfast_menu>';
                                  }
                                  if (editorid==='#editor2') {
                                  isEditorAce = editorAce2;
                                  sampleXML='<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<html xsl:version=\"1.0\" xmlns:xsl=\"http:\/\/www.w3.org\/1999\/XSL\/Transform\">\r\n<body style=\"font-family:Arial;font-size:12pt;background-color:#EEEEEE\">\r\n<xsl:for-each select=\"breakfast_menu\/food\">\r\n  <div style=\"background-color:teal;color:white;padding:4px\">\r\n    <span style=\"font-weight:bold\"><xsl:value-of select=\"name\"\/> - <\/span>\r\n    <xsl:value-of select=\"price\"\/>\r\n    <\/div>\r\n  <div style=\"margin-left:20px;margin-bottom:1em;font-size:10pt\">\r\n    <p>\r\n    <xsl:value-of select=\"description\"\/>\r\n    <span style=\"font-style:italic\"> (<xsl:value-of select=\"calories\"\/> calories per serving)<\/span>\r\n    <\/p>\r\n  <\/div>\r\n<\/xsl:for-each>\r\n<\/body>\r\n<\/html>';
                                  }
                                  if (editorid==='#editorSG') {
                                  isEditorAce = editorAce;
                                  sampleXML='<soapenv:Envelope\r\n\txmlns:soapenv=\"http:\/\/schemas.xmlsoap.org\/soap\/envelope\/\"\r\n\txmlns:u=\"http:\/\/www.service-now.com\/u_inbound_incident\">\r\n\t<soapenv:Header\/>\r\n\t<soapenv:Body>\r\n\t\t<u:insert>\r\n\t\t\t<import_set_run><\/import_set_run>\r\n\t\t\t<template_import_log><\/template_import_log>\r\n\t\t\t<u_assigned_to><\/u_assigned_to>\r\n\t\t\t<u_assignment_group>TESTGROUP01<\/u_assignment_group>\r\n\t\t\t<u_business_service>Provider Test Service<\/u_business_service>\r\n\t\t\t<u_caller_id>Provider Test Caller<\/u_caller_id>\r\n\t\t\t<u_category><\/u_category>\r\n\t\t\t<u_cause_category><\/u_cause_category>\r\n\t\t\t<u_close_code>Solved test<\/u_close_code>\r\n\t\t\t<u_close_notes><\/u_close_notes>\r\n\t\t\t<u_cmdb_ci>Test CI<\/u_cmdb_ci>\r\n\t\t\t<u_comments><\/u_comments>\r\n\t\t\t<u_company>Provider IT<\/u_company>\r\n\t\t\t<u_description>abc<\/u_description>\r\n\t\t\t<u_external_ref>TESTINC0001<\/u_external_ref>\r\n\t\t\t<u_impact>3<\/u_impact>\r\n\t\t\t<u_location>Cisco Generic Default Location<\/u_location>\r\n\t\t\t<u_number><\/u_number>\r\n\t\t\t<u_phone_number><\/u_phone_number>\r\n\t\t\t<u_priority>4<\/u_priority>\r\n\t\t\t<u_provider>testid01<\/u_provider>\r\n\t\t\t<u_requested_for><\/u_requested_for>\r\n\t\t\t<u_service_offering>Provider Test Services<\/u_service_offering>\r\n\t\t\t<u_short_description>Test from Customer to Provider<\/u_short_description>\r\n\t\t\t<u_sn_sys_id><\/u_sn_sys_id>\r\n\t\t\t<u_state>2<\/u_state>\r\n\t\t\t<u_subcategory><\/u_subcategory>\r\n\t\t\t<u_transaction_message><\/u_transaction_message>\r\n\t\t\t<u_transaction_type><\/u_transaction_type>\r\n\t\t\t<u_urgency>3<\/u_urgency>\r\n\t\t\t<u_work_notes>new test note<\/u_work_notes>\r\n\t\t<\/u:insert>\r\n\t<\/soapenv:Body>\r\n<\/soapenv:Envelope>'}
                                  if (editorid==='#editor2SG') {
                                  isEditorAce = editorAce2;
                                  sampleXML='<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<xsl:stylesheet\r\n\txmlns:xsl=\"http:\/\/www.w3.org\/1999\/XSL\/Transform\" version=\"1.0\">\r\n\t<xsl:output method=\"xml\" version=\"1.0\" encoding=\"UTF-8\" indent=\"yes\" \/>\r\n\t<xsl:variable name=\"Ticket_Type\">\r\n\t\t<xsl:value-of select=\"\/\/u_service_offering\" \/>\r\n\t<\/xsl:variable>\r\n\t<xsl:template match=\"\/\">\r\n\t\t<CALL>\r\n\t\t\t<!-- Customer ID -->\r\n\t\t\t<Calls.CustCallID>\r\n\t\t\t\t<xsl:value-of select=\"\/\/u_external_ref\" \/>\r\n\t\t\t<\/Calls.CustCallID>\r\n\t\t\t<!-- State -->\r\n\t\t\t<CallStates.ShortName>\r\n\t\t\t\t<xsl:value-of select=\"\/\/u_state\" \/>\r\n\t\t\t<\/CallStates.ShortName>\r\n\t\t\t<Priorities.ShortName>\r\n\t\t\t\t<xsl:value-of select=\"\/\/u_priority\" \/>\r\n\t\t\t<\/Priorities.ShortName>\r\n\t\t\t<!-- Store sys_id as a required field -->\r\n\t\t\t<Calls.Caller.PIN>\r\n\t\t\t\t<xsl:value-of select=\"\/\/sys_id\" \/>\r\n\t\t\t<\/Calls.Caller.PIN>\r\n\t\t\t<!-- Device CI -->\r\n\t\t\t<Calls.MainComponent>\r\n\t\t\t\t<xsl:value-of select=\"\/\/u_cmdb_ci\" \/>\r\n\t\t\t<\/Calls.MainComponent>\r\n\t\t\t<!-- Ticket Notes \/ Worknotes -->\r\n\t\t\t<Calls.Remarks>\r\n\t\t\t\t<xsl:if test=\"\/\/u_work_notes != \'\'\">\r\n\t\t\t\t\t<xsl:value-of select=\"\/\/u_work_notes\" \/>\r\n\t\t\t\t\t<xsl:text><\/xsl:text>\r\n\t\t\t\t<\/xsl:if>\r\n\t\t\t\t<xsl:if test=\"\/\/u_comments != \'\'\">\r\n\t\t\t\t\t<xsl:value-of select=\"\/\/u_comments\" \/>\r\n\t\t\t\t<\/xsl:if>\r\n\t\t\t<\/Calls.Remarks>\r\n\t\t\t<!-- Ticket description -->\r\n\t\t\t<Calls.Description>\r\n\t\t\t\t<xsl:value-of select=\"\/\/u_description\" \/>\r\n\t\t\t<\/Calls.Description>\r\n\t\t\t<!-- Ticket short description -->\r\n\t\t\t<Calls.ShortDescription>\r\n\t\t\t\t<xsl:value-of select=\"\/\/u_short_description\"\/>\r\n\t\t\t<\/Calls.ShortDescription>\r\n\t\t\t<!-- Solution code -->\r\n\t\t\t<Calls.Solution>\r\n\t\t\t\t<xsl:value-of select=\"\/\/u_close_notes\" \/>\r\n\t\t\t<\/Calls.Solution>\r\n\t\t\t<!-- Attachments -->\r\n\t\t\t<xsl:if test=\"\/\/agent = \'AttachmentCreator\'\">\r\n\t\t\t\t<!-- Ricoh CallID -->\r\n\t\t\t\t<Calls.CustCallID>\r\n\t\t\t\t\t<xsl:value-of select=\"\/\/number\" \/>\r\n\t\t\t\t<\/Calls.CustCallID>\r\n\t\t\t\t<Attachments>\r\n\t\t\t\t\t<FileName>\r\n\t\t\t\t\t\t<xsl:value-of select=\"substring-before(\/\/name, \':\')\" \/>\r\n\t\t\t\t\t<\/FileName>\r\n\t\t\t\t\t<DataBase64>\r\n\t\t\t\t\t\t<xsl:value-of select=\"\/\/payload\" \/>\r\n\t\t\t\t\t<\/DataBase64>\r\n\t\t\t\t<\/Attachments>\r\n\t\t\t<\/xsl:if>\r\n\t\t<\/CALL>\r\n\t<\/xsl:template>\r\n<\/xsl:stylesheet>\r\n'}
                                  if (editorid==='#editor3') {
                                  isEditorAce = editorAce3;
                                  sampleXML='<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<xsl:stylesheet\r\n\txmlns:xsl=\"http:\/\/www.w3.org\/1999\/XSL\/Transform\" version=\"1.0\">\r\n\t<xsl:output method=\"xml\" version=\"1.0\" encoding=\"UTF-8\" indent=\"yes\" \/>\r\n\t<xsl:template match=\"\/\">\r\n\t\t<CALL>\r\n\t\t\t<xsl:copy-of select=\"\/\/InboundMessage\/*\" \/>\r\n\t\t\t<xsl:choose>\r\n\t\t\t\t<!-- Prevent adding the description inside Remarks - avoid SG standard functionality -->\r\n\t\t\t\t<xsl:when test=\"\/\/InboundMessage\/Calls.Remarks = \'\' and \/\/SD.call\/Description = \/\/InboundMessage\/Calls.Description\">\r\n\t\t\t\t\t<Calls.Remarks>\r\n\t\t\t\t\t\t<xsl:text><\/xsl:text>\r\n\t\t\t\t\t<\/Calls.Remarks>\r\n\t\t\t\t<\/xsl:when>\r\n\t\t\t\t<!-- Inform customer priority change -->\r\n\t\t\t\t<xsl:when test=\"\/\/InboundMessage\/Priorities.ShortName != \/\/SD.call\/PrioritiesTO\/ShortName\">\r\n\t\t\t\t\t<Calls.Remarks>\r\n\t\t\t\t\t\t<xsl:text>Customer changed the ticket priority from <\/xsl:text>\r\n\t\t\t\t\t\t<xsl:value-of select=\"\/\/SD.call\/PrioritiesTO\/ShortName\" \/>\r\n\t\t\t\t\t\t<xsl:text> to <\/xsl:text>\r\n\t\t\t\t\t\t<xsl:value-of select=\"\/\/InboundMessage\/Priorities.ShortName\" \/>\r\n\t\t\t\t\t<\/Calls.Remarks>\r\n\t\t\t\t<\/xsl:when>\r\n\t\t\t\t<!-- Inform customer description change -->\r\n\t\t\t\t<xsl:when test=\"\/\/InboundMessage\/Calls.Description != \/\/SD.call\/Description and \/\/InboundMessage\/Description != \'\'\">\r\n\t\t\t\t\t<Calls.Remarks>\r\n\t\t\t\t\t\t<xsl:if test=\"\/\/InboundMessage\/Calls.Remarks != \'\'\">\r\n\t\t\t\t\t\t\t<xsl:value-of select=\"\/\/InboundMessage\/Calls.Remarks\" \/>\r\n\t\t\t\t\t\t\t<xsl:text><\/xsl:text>\r\n\t\t\t\t\t\t<\/xsl:if>\r\n\t\t\t\t\t\t<xsl:text>Customer changed the ticket description to \"<\/xsl:text>\r\n\t\t\t\t\t\t<xsl:value-of select=\"\/\/InboundMessage\/Calls.Description\" \/>\r\n\t\t\t\t\t\t<xsl:text>\"<\/xsl:text>\r\n\t\t\t\t\t<\/Calls.Remarks>\r\n\t\t\t\t<\/xsl:when>\r\n\t\t\t<\/xsl:choose>\r\n\t\t<\/CALL>\r\n\t<\/xsl:template>\r\n<\/xsl:stylesheet>\r\n'}
                                  if (editorid==='#editor4') {
                                  isEditorAce = editorAce4;
                                  sampleXML='<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<SD.call>\r\n    <objID>351803150<\/objID>\r\n    <ID>351803135<\/ID>\r\n    <CustCallID>TESTCUSTINC01<\/CustCallID>\r\n    <SPCallID>TESTPROVINC01<\/SPCallID>\r\n    <cel_objid>351052650<\/cel_objid>\r\n    <con_objid>351052275<\/con_objid>\r\n    <ccu_objid>351033512<\/ccu_objid>\r\n    <csp_objid>351052274<\/csp_objid>\r\n    <fro_objid>351033512<\/fro_objid>\r\n    <CallOpenTime>2018-06-12 12:31:36.0<\/CallOpenTime>\r\n    <CallOpenTimeUTC>2018-06-12 12:31:36.0<\/CallOpenTimeUTC>\r\n    <CallStartSLATime>2018-06-12 12:31:36.0<\/CallStartSLATime>\r\n    <CallStartSLATimeUTC>2018-06-12 12:31:36.0<\/CallStartSLATimeUTC>\r\n    <CallResponseTime \/>\r\n    <CallResponseTimeUTC \/>\r\n    <CallRecoveryTime \/>\r\n    <CallRecoveryTimeUTC \/>\r\n    <CallCloseTime \/>\r\n    <CallCloseTimeUTC \/>\r\n    <CallReceiveTime>2018-06-12 12:31:36.0<\/CallReceiveTime>\r\n    <CallReceiveTimeUTC>2018-06-12 12:31:36.0<\/CallReceiveTimeUTC>\r\n    <CallSendTime \/>\r\n    <CallSendTimeUTC \/>\r\n    <ProblemStartTime \/>\r\n    <ProblemStartTimeUTC \/>\r\n    <CustomerRequestedStartTime \/>\r\n    <CustomerRequestedStartTimeUTC \/>\r\n    <CustomerRequestedEndTime>2018-06-12 03:24:00.0<\/CustomerRequestedEndTime>\r\n    <CustomerRequestedEndTimeUTC>2018-06-12 03:24:00.0<\/CustomerRequestedEndTimeUTC>\r\n    <ProviderScheduledStartTime \/>\r\n    <ProviderScheduledStartTimeUTC \/>\r\n    <ProviderScheduledEndTime \/>\r\n    <ProviderScheduledEndTimeUTC \/>\r\n    <EndOfResponseTime \/>\r\n    <EndOfResponseTimeUTC \/>\r\n    <EndOfRecoveryTime \/>\r\n    <EndOfRecoveryTimeUTC \/>\r\n    <TotalHeldSLAMinutes \/>\r\n    <SLAHoldTime \/>\r\n    <SLAHoldTimeUTC \/>\r\n    <CallStateChangeTime>2018-06-12 12:31:36.0<\/CallStateChangeTime>\r\n    <CallStateChangeTimeUTC>2018-06-12 12:31:36.0<\/CallStateChangeTimeUTC>\r\n    <CallAcknowledgeTime \/>\r\n    <CallAcknowledgeTimeUTC \/>\r\n    <clr_objid \/>\r\n    <CallerShortName \/>\r\n    <CallerFirstName \/>\r\n    <CallerLastName \/>\r\n    <CallerTitle \/>\r\n    <CallerSalutation \/>\r\n    <CallerTel \/>\r\n    <CallerTel2 \/>\r\n    <CallerMobileTel \/>\r\n    <CallerFax \/>\r\n    <CallerLocationZip \/>\r\n    <CallerLocationCity \/>\r\n    <CallerLocationStreet \/>\r\n    <CallerLocationCountry \/>\r\n    <CallerLocation \/>\r\n    <CallerLocationProvince \/>\r\n    <CallerEMail \/>\r\n    <CallerPIN>testCallerId01<\/CallerPIN>\r\n    <CallerDescription>Customer<\/CallerDescription>\r\n    <CallerDepartment \/>\r\n    <CallerSign \/>\r\n    <CallerCategory \/>\r\n    <CallerLanguage \/>\r\n    <CallerRoom>4<\/CallerRoom>\r\n    <MainCompManfacturer \/>\r\n    <MainCompType \/>\r\n    <MainCompModel \/>\r\n    <MainComponent \/>\r\n    <MainCompShortName \/>\r\n    <MainCompName \/>\r\n    <MainCompSerNr \/>\r\n    <MainCompInvNr \/>\r\n    <MainCompSerNrProv \/>\r\n    <MainCompOpSys \/>\r\n    <MainCompLocationZip \/>\r\n    <MainCompLocationCity \/>\r\n    <MainCompLocationStreet \/>\r\n    <MainCompLocationCountry \/>\r\n    <MainCompLocation \/>\r\n    <MainCompLocationTel \/>\r\n    <MainCompDescription \/>\r\n    <MainCompLocationName \/>\r\n    <MainCompLocationDescription \/>\r\n    <MainCompLocationProvince \/>\r\n    <MainCompLocationCategory \/>\r\n    <MainCompLocationLevel \/>\r\n    <MainCompRoom>No<\/MainCompRoom>\r\n    <pro_objid>351037037<\/pro_objid>\r\n    <ppr_objid \/>\r\n    <pcu_objid>351052433<\/pcu_objid>\r\n    <psp_objid>351045609<\/psp_objid>\r\n    <sev_objid>351037017<\/sev_objid>\r\n    <pse_objid \/>\r\n    <fat_objid>351140480<\/fat_objid>\r\n    <pfa_objid \/>\r\n    <isClosed>N<\/isClosed>\r\n    <isHeldSLA>N<\/isHeldSLA>\r\n    <cst_objid>351033718<\/cst_objid>\r\n    <pst_objid>351045682<\/pst_objid>\r\n    <cac_objid \/>\r\n    <ema_objid>351803149<\/ema_objid>\r\n    <InternalState>00<\/InternalState>\r\n    <ShortDescription>test by davirod3<\/ShortDescription>\r\n    <Description \/>\r\n    <Remarks \/>\r\n    <Diagnosis \/>\r\n    <Solution \/>\r\n    <cso_objid \/>\r\n    <pso_objid \/>\r\n    <edi_objid>1000005000<\/edi_objid>\r\n    <EditTime>2018-06-12 12:36:09.0<\/EditTime>\r\n    <EditTimeUTC>2018-06-12 12:36:09.0<\/EditTimeUTC>\r\n    <csc_objid>351033521<\/csc_objid>\r\n    <css_objid>351036986<\/css_objid>\r\n    <SubCompManfacturer \/>\r\n    <SubCompType \/>\r\n    <SubCompModel \/>\r\n    <SubComponent \/>\r\n    <SubCompShortName \/>\r\n    <SubCompName \/>\r\n    <SubCompSerNr \/>\r\n    <SubCompInvNr \/>\r\n    <SubCompSerNrProv \/>\r\n    <SubCompOpSys \/>\r\n    <SubCompLocationZip \/>\r\n    <SubCompLocationCity \/>\r\n    <SubCompLocationStreet>1-Low<\/SubCompLocationStreet>\r\n    <SubCompLocationCountry \/>\r\n    <SubCompLocation \/>\r\n    <SubCompLocationTel \/>\r\n    <SubCompDescription \/>\r\n    <SubCompLocationName \/>\r\n    <SubCompLocationDescription \/>\r\n    <SubCompLocationProvince \/>\r\n    <SubCompLocationCategory \/>\r\n    <SubCompLocationLevel \/>\r\n    <SubCompRoom>-Blank-<\/SubCompRoom>\r\n    <SysSpecField1 \/>\r\n    <SysSpecField2 \/>\r\n    <SysSpecField3 \/>\r\n    <SysSpecField4 \/>\r\n    <SysSpecField5 \/>\r\n    <SysSpecField6 \/>\r\n    <SysSpecField7 \/>\r\n    <SysSpecField8 \/>\r\n    <SysSpecField9 \/>\r\n    <SysSpecField10 \/>\r\n    <XML_Info \/>\r\n    <XML_Info \/>\r\n    <chd_objid \/>\r\n    <phd_objid \/>\r\n    <CHDShortName \/>\r\n    <CHDFirstName \/>\r\n    <CHDLastName \/>\r\n    <CHDTitle \/>\r\n    <CHDSalutation \/>\r\n    <CHDTel \/>\r\n    <CHDTel2 \/>\r\n    <CHDMobileTel \/>\r\n    <CHDFax \/>\r\n    <CHDLocationZip \/>\r\n    <CHDLocationCity \/>\r\n    <CHDLocationStreet \/>\r\n    <CHDLocationCountry \/>\r\n    <CHDLocation \/>\r\n    <CHDLocationProvince \/>\r\n    <CHDEMail \/>\r\n    <CHDPIN \/>\r\n    <CHDDescription \/>\r\n    <CHDDepartment \/>\r\n    <CHDSign \/>\r\n    <CHDCategory \/>\r\n    <CHDLanguage \/>\r\n    <CHDRoom \/>\r\n    <CCPShortName \/>\r\n    <CCPFirstName \/>\r\n    <CCPLastName \/>\r\n    <CCPTitle \/>\r\n    <CCPSalutation \/>\r\n    <CCPTel \/>\r\n    <CCPTel2 \/>\r\n    <CCPMobileTel \/>\r\n    <CCPFax \/>\r\n    <CCPLocationZip \/>\r\n    <CCPLocationCity \/>\r\n    <CCPLocationStreet \/>\r\n    <CCPLocationCountry \/>\r\n    <CCPLocation \/>\r\n    <CCPLocationProvince \/>\r\n    <CCPEMail \/>\r\n    <CCPPIN \/>\r\n    <CCPDescription \/>\r\n    <CCPDepartment \/>\r\n    <CCPSign \/>\r\n    <CCPCategory \/>\r\n    <CCPLanguage \/>\r\n    <CCPRoom \/>\r\n    <bpr_objid>1000000101<\/bpr_objid>\r\n    <SlaResponseMinutes \/>\r\n    <SlaRecoveryMinutes \/>\r\n    <TotalResponseMinutes \/>\r\n    <TotalRecoveryMinutes \/>\r\n    <TotalAcknowledgeMinutes \/>\r\n    <Zone \/>\r\n    <unspsc \/>\r\n    <dev_objid \/>\r\n    <tzo_objid>1000040144<\/tzo_objid>\r\n    <isTestCall>N<\/isTestCall>\r\n    <que_objid \/>\r\n    <qu2_objid \/>\r\n    <qu3_objid \/>\r\n    <cqu_objid \/>\r\n    <cq2_objid \/>\r\n    <cq3_objid \/>\r\n    <tec_objid \/>\r\n    <te2_objid \/>\r\n    <te3_objid \/>\r\n    <cte_objid \/>\r\n    <ct2_objid \/>\r\n    <ct3_objid \/>\r\n    <cal_id \/>\r\n    <CCUCategory1 \/>\r\n    <CCUCategory2 \/>\r\n    <CCUCategory3 \/>\r\n    <CCUCategory4 \/>\r\n    <CCUCategory5 \/>\r\n    <CSPCategory1 \/>\r\n    <CSPCategory2 \/>\r\n    <CSPCategory3 \/>\r\n    <CSPCategory4 \/>\r\n    <CSPCategory5 \/>\r\n    <loc_objid \/>\r\n    <SlaCstRetentionMinutes \/>\r\n    <EndOfCstRetentionTime \/>\r\n    <EndOfCstRetentionTimeUTC \/>\r\n    <CallCstRetentionTime>2018-06-12 12:36:59.0<\/CallCstRetentionTime>\r\n    <CallCstRetentionTimeUTC>2018-06-12 12:36:59.0<\/CallCstRetentionTimeUTC>\r\n    <SlaPstRetentionMinutes \/>\r\n    <EndOfPstRetentionTime \/>\r\n    <EndOfPstRetentionTimeUTC \/>\r\n    <CallPstRetentionTime>2018-06-12 12:36:59.0<\/CallPstRetentionTime>\r\n    <CallPstRetentionTimeUTC>2018-06-12 12:36:59.0<\/CallPstRetentionTimeUTC>\r\n    <RetentionCstMinutesSL>1<\/RetentionCstMinutesSL>\r\n    <RetentionCstMinutes24>1<\/RetentionCstMinutes24>\r\n    <RetentionPstMinutesSL>1<\/RetentionPstMinutesSL>\r\n    <RetentionPstMinutes24>1<\/RetentionPstMinutes24>\r\n    <CutOffTime1 \/>\r\n    <CutOffTime2 \/>\r\n    <CutOffset \/>\r\n    <UseCutOffFlag>N<\/UseCutOffFlag>\r\n    <PreferCustRequEndTimeFlag>N<\/PreferCustRequEndTimeFlag>\r\n    <req_objid>1000235200<\/req_objid>\r\n    <IsLocked>N<\/IsLocked>\r\n    <lus_objid \/>\r\n    <LockedTime \/>\r\n    <LockedTimeUTC \/>\r\n    <SendWhenUpdate>Y<\/SendWhenUpdate>\r\n    <SendWhenSelectTechnician>N<\/SendWhenSelectTechnician>\r\n    <SendWhenSelectTechnician2>N<\/SendWhenSelectTechnician2>\r\n    <SendWhenSelectTechnician3>N<\/SendWhenSelectTechnician3>\r\n    <SendWhenSelectQueue>N<\/SendWhenSelectQueue>\r\n    <SendWhenSelectQueue2>N<\/SendWhenSelectQueue2>\r\n    <SendWhenSelectQueue3>N<\/SendWhenSelectQueue3>\r\n    <cex_objid \/>\r\n    <pex_objid \/>\r\n    <CCUMaxLevel>1<\/CCUMaxLevel>\r\n    <CSPMaxLevel>1<\/CSPMaxLevel>\r\n    <MainCompLocationGroup \/>\r\n    <IsDoneChild>N<\/IsDoneChild>\r\n    <IsUpdatedByChildren>N<\/IsUpdatedByChildren>\r\n    <EndOfRecoveryAlertTime1 \/>\r\n    <EndOfRecoveryAlertTime1UTC \/>\r\n    <EndOfRecoveryAlertTime2 \/>\r\n    <EndOfRecoveryAlertTime2UTC \/>\r\n    <SubCompLocationGroup \/>\r\n    <IsUpdatedByParent>N<\/IsUpdatedByParent>\r\n    <CCUReasonCategory1 \/>\r\n    <CCUReasonCategory2 \/>\r\n    <CCUReasonCategory3 \/>\r\n    <CCUReasonCategory4 \/>\r\n    <CCUReasonCategory5 \/>\r\n    <CSPReasonCategory1 \/>\r\n    <CSPReasonCategory2 \/>\r\n    <CSPReasonCategory3 \/>\r\n    <CSPReasonCategory4 \/>\r\n    <CSPReasonCategory5 \/>\r\n    <dst_objid \/>\r\n    <MainCompLocationRegion \/>\r\n    <MainCompHostname \/>\r\n    <MainCompIPAddress \/>\r\n    <MainCompMACAddress \/>\r\n    <SubCompLocationRegion \/>\r\n    <SubCompHostname \/>\r\n    <SubCompIPAddress \/>\r\n    <SubCompMACAddress \/>\r\n    <IsAvailabilityCall>N<\/IsAvailabilityCall>\r\n    <AddRemarksToSummary>N<\/AddRemarksToSummary>\r\n    <NumberOfEditors>2<\/NumberOfEditors>\r\n    <cim_objid>351037008<\/cim_objid>\r\n    <pim_objid \/>\r\n    <cur_objid>351036998<\/cur_objid>\r\n    <pur_objid \/>\r\n    <ccp_objid \/>\r\n    <SendWhenRemoveTechnician>N<\/SendWhenRemoveTechnician>\r\n    <SendWhenRemoveTechnician2>N<\/SendWhenRemoveTechnician2>\r\n    <SendWhenRemoveTechnician3>N<\/SendWhenRemoveTechnician3>\r\n    <app_objid \/>\r\n    <anonymizeData \/>\r\n    <InMessageReceivedTimeUtc>2018-06-12 12:36:09.0<\/InMessageReceivedTimeUtc>\r\n    <OutMessageQueuedTimeUtc>2018-06-12 12:36:09.0<\/OutMessageQueuedTimeUtc>\r\n    <OutMessageSentTimeUtc>2018-06-12 12:36:09.0<\/OutMessageSentTimeUtc>\r\n    <SgInternalProcessingMsecs>796<\/SgInternalProcessingMsecs>\r\n    <SgExternalProcessingMsecs>927<\/SgExternalProcessingMsecs>\r\n    <obm_objid>351803151<\/obm_objid>\r\n    <Ownership \/>\r\n    <PartnerCoreTicketId \/>\r\n    <inr_objid>1000000102<\/inr_objid>\r\n    <BPOrganizationsCUS>\r\n        \r\n    \r\n        <objID>351033512<\/objID>\r\n        \r\n    \r\n        <ID>351033512<\/ID>\r\n        \r\n    \r\n        <ShortName>Customer_INC<\/ShortName>\r\n        \r\n    \r\n        <Name>Customer_INC<\/Name>\r\n        \r\n    \r\n        <AccountCode \/>\r\n        \r\n    \r\n        <ActivityLimitMonthday \/>\r\n        \r\n    \r\n        <ActivityLimitMonthdayTime \/>\r\n        \r\n    \r\n        <ActivityLimitWeekday \/>\r\n        \r\n    \r\n        <ActivityLimitWeekdayTime \/>\r\n        \r\n    \r\n        <bpa_objid>351033506<\/bpa_objid>\r\n        \r\n    \r\n        <bpp_objid>350683943<\/bpp_objid>\r\n        \r\n    \r\n        <bpr_objid>1000000101<\/bpr_objid>\r\n        \r\n    \r\n        <Category \/>\r\n        \r\n    \r\n        <City>Worldwide<\/City>\r\n        \r\n    \r\n        <cou_objid>27087<\/cou_objid>\r\n        \r\n    \r\n        <csy_objid>351033521<\/csy_objid>\r\n        \r\n    \r\n        <DateFormat \/>\r\n        \r\n    \r\n        <DUNS \/>\r\n        \r\n    \r\n        <edi_objid>350683943<\/edi_objid>\r\n        \r\n    \r\n        <EditTimeUTC>2017-09-25 12:49:52.0<\/EditTimeUTC>\r\n        \r\n    \r\n        <EMail \/>\r\n        \r\n    \r\n        <EMFromAddress \/>\r\n        \r\n    \r\n        <etv_objid \/>\r\n        \r\n    \r\n        <Fax \/>\r\n        \r\n    \r\n        <InboxMailAdress \/>\r\n        \r\n    \r\n        <IsActiv>Y<\/IsActiv>\r\n        \r\n    \r\n        <Latitude \/>\r\n        \r\n    \r\n        <Location \/>\r\n        \r\n    \r\n        <Longitude \/>\r\n        \r\n    \r\n        <MailSubject \/>\r\n        \r\n    \r\n        <Province \/>\r\n        \r\n    \r\n        <qlu_objid \/>\r\n        \r\n    \r\n        <Reliability \/>\r\n        \r\n    \r\n        <ReplyToAddress \/>\r\n        \r\n    \r\n        <rsp_objid \/>\r\n        \r\n    \r\n        <Street>Ch\u016B\u014D, Tokyo, Japan<\/Street>\r\n        \r\n    \r\n        <Tel>0000000<\/Tel>\r\n        \r\n    \r\n        <tzo_objid>1000040144<\/tzo_objid>\r\n        \r\n    \r\n        <UID \/>\r\n        \r\n    \r\n        <Url \/>\r\n        \r\n    \r\n        <UrlName \/>\r\n        \r\n    \r\n        <Zip>1234<\/Zip>\r\n        \r\n  \r\n        <Countries>\r\n            \r\n    \r\n            <objID>27087<\/objID>\r\n            \r\n    \r\n            <ID>27087<\/ID>\r\n            \r\n    \r\n            <ShortName>AT<\/ShortName>\r\n            \r\n    \r\n            <Name>AUSTRIA<\/Name>\r\n            \r\n    \r\n            <Description>Republik \u00D6sterreich<\/Description>\r\n            \r\n    \r\n            <IsActiv>Y<\/IsActiv>\r\n            \r\n    \r\n            <ISOCode>AT<\/ISOCode>\r\n            \r\n  \r\n        <\/Countries>\r\n        \r\n\r\n    <\/BPOrganizationsCUS>\r\n    <BPOrganizationsSPR>\r\n        \r\n    \r\n        <objID>351052274<\/objID>\r\n        \r\n    \r\n        <ID>351052274<\/ID>\r\n        \r\n    \r\n        <ShortName>ProvPlatform_INC_Customer<\/ShortName>\r\n        \r\n    \r\n        <Name>Provider platform Customer INC Management<\/Name>\r\n        \r\n    \r\n        <AccountCode \/>\r\n        \r\n    \r\n        <ActivityLimitMonthday \/>\r\n        \r\n    \r\n        <ActivityLimitMonthdayTime \/>\r\n        \r\n    \r\n        <ActivityLimitWeekday \/>\r\n        \r\n    \r\n        <ActivityLimitWeekdayTime \/>\r\n        \r\n    \r\n        <bpa_objid>333697404<\/bpa_objid>\r\n        \r\n    \r\n        <bpp_objid>350683943<\/bpp_objid>\r\n        \r\n    \r\n        <bpr_objid \/>\r\n        \r\n    \r\n        <Category \/>\r\n        \r\n    \r\n        <City>Atlanta<\/City>\r\n        \r\n    \r\n        <cou_objid>27298<\/cou_objid>\r\n        \r\n    \r\n        <csy_objid>351036986<\/csy_objid>\r\n        \r\n    \r\n        <DateFormat \/>\r\n        \r\n    \r\n        <DUNS \/>\r\n        \r\n    \r\n        <edi_objid>350683943<\/edi_objid>\r\n        \r\n    \r\n        <EditTimeUTC>2017-09-25 15:20:14.0<\/EditTimeUTC>\r\n        \r\n    \r\n        <EMail \/>\r\n        \r\n    \r\n        <EMFromAddress \/>\r\n        \r\n    \r\n        <etv_objid \/>\r\n        \r\n    \r\n        <Fax \/>\r\n        \r\n    \r\n        <InboxMailAdress \/>\r\n        \r\n    \r\n        <IsActiv>Y<\/IsActiv>\r\n        \r\n    \r\n        <Latitude \/>\r\n        \r\n    \r\n        <Location \/>\r\n        \r\n    \r\n        <Longitude \/>\r\n        \r\n    \r\n        <MailSubject \/>\r\n        \r\n    \r\n        <Province \/>\r\n        \r\n    \r\n        <qlu_objid \/>\r\n        \r\n    \r\n        <Reliability \/>\r\n        \r\n    \r\n        <ReplyToAddress \/>\r\n        \r\n    \r\n        <rsp_objid \/>\r\n        \r\n    \r\n        <Street>1<\/Street>\r\n        \r\n    \r\n        <Tel>1<\/Tel>\r\n        \r\n    \r\n        <tzo_objid>1000040050<\/tzo_objid>\r\n        \r\n    \r\n        <UID \/>\r\n        \r\n    \r\n        <Url \/>\r\n        \r\n    \r\n        <UrlName \/>\r\n        \r\n    \r\n        <Zip>1<\/Zip>\r\n        \r\n  \r\n        <Countries>\r\n            \r\n    \r\n            <objID>27298<\/objID>\r\n            \r\n    \r\n            <ID>27298<\/ID>\r\n            \r\n    \r\n            <ShortName>US<\/ShortName>\r\n            \r\n    \r\n            <Name>USA<\/Name>\r\n            \r\n    \r\n            <Description>United States of America<\/Description>\r\n            \r\n    \r\n            <IsActiv>Y<\/IsActiv>\r\n            \r\n    \r\n            <ISOCode>US<\/ISOCode>\r\n            \r\n  \r\n        <\/Countries>\r\n        \r\n\r\n    <\/BPOrganizationsSPR>\r\n    <BPOrganizationsFRO>\r\n        \r\n    \r\n        <objID>351033512<\/objID>\r\n        \r\n    \r\n        <ID>351033512<\/ID>\r\n        \r\n    \r\n        <ShortName>Customer_INC<\/ShortName>\r\n        \r\n    \r\n        <Name>Customer_INC<\/Name>\r\n        \r\n    \r\n        <AccountCode \/>\r\n        \r\n    \r\n        <ActivityLimitMonthday \/>\r\n        \r\n    \r\n        <ActivityLimitMonthdayTime \/>\r\n        \r\n    \r\n        <ActivityLimitWeekday \/>\r\n        \r\n    \r\n        <ActivityLimitWeekdayTime \/>\r\n        \r\n    \r\n        <bpa_objid>351033506<\/bpa_objid>\r\n        \r\n    \r\n        <bpp_objid>350683943<\/bpp_objid>\r\n        \r\n    \r\n        <bpr_objid>1000000101<\/bpr_objid>\r\n        \r\n    \r\n        <Category \/>\r\n        \r\n    \r\n        <City>Worldwide<\/City>\r\n        \r\n    \r\n        <cou_objid>27087<\/cou_objid>\r\n        \r\n    \r\n        <csy_objid>351033521<\/csy_objid>\r\n        \r\n    \r\n        <DateFormat \/>\r\n        \r\n    \r\n        <DUNS \/>\r\n        \r\n    \r\n        <edi_objid>350683943<\/edi_objid>\r\n        \r\n    \r\n        <EditTimeUTC>2017-09-25 12:49:52.0<\/EditTimeUTC>\r\n        \r\n    \r\n        <EMail \/>\r\n        \r\n    \r\n        <EMFromAddress \/>\r\n        \r\n    \r\n        <etv_objid \/>\r\n        \r\n    \r\n        <Fax \/>\r\n        \r\n    \r\n        <InboxMailAdress \/>\r\n        \r\n    \r\n        <IsActiv>Y<\/IsActiv>\r\n        \r\n    \r\n        <Latitude \/>\r\n        \r\n    \r\n        <Location \/>\r\n        \r\n    \r\n        <Longitude \/>\r\n        \r\n    \r\n        <MailSubject \/>\r\n        \r\n    \r\n        <Province \/>\r\n        \r\n    \r\n        <qlu_objid \/>\r\n        \r\n    \r\n        <Reliability \/>\r\n        \r\n    \r\n        <ReplyToAddress \/>\r\n        \r\n    \r\n        <rsp_objid \/>\r\n        \r\n    \r\n        <Street>Ch\u016B\u014D, Tokyo, Japan<\/Street>\r\n        \r\n    \r\n        <Tel>0000000<\/Tel>\r\n        \r\n    \r\n        <tzo_objid>1000040144<\/tzo_objid>\r\n        \r\n    \r\n        <UID \/>\r\n        \r\n    \r\n        <Url \/>\r\n        \r\n    \r\n        <UrlName \/>\r\n        \r\n    \r\n        <Zip>1234<\/Zip>\r\n        \r\n\r\n    <\/BPOrganizationsFRO>\r\n    <CallSystemsCSC>\r\n        \r\n    \r\n        <objID>351033521<\/objID>\r\n        \r\n    \r\n        <ID>351033521<\/ID>\r\n        \r\n    \r\n        <ShortName>Customer_INC_CS<\/ShortName>\r\n        \r\n    \r\n        <Name>Customer_Incident_CallSystem<\/Name>\r\n        \r\n    \r\n        <AskAtCloseCall>Y<\/AskAtCloseCall>\r\n        \r\n    \r\n        <AttachmentFormat>FilenameOnly<\/AttachmentFormat>\r\n        \r\n    \r\n        <EnabledForWorkflowSelection>Y<\/EnabledForWorkflowSelection>\r\n        \r\n    \r\n        <IsGlobal>N<\/IsGlobal>\r\n        \r\n    \r\n        <PreventCallActionIfDifferentLevel>N<\/PreventCallActionIfDifferentLevel>\r\n        \r\n    \r\n        <SelectOnlyTechniciansFromQueue>N<\/SelectOnlyTechniciansFromQueue>\r\n        \r\n    \r\n        <UseActions>N<\/UseActions>\r\n        \r\n    \r\n        <UseSuccessors>N<\/UseSuccessors>\r\n        \r\n\r\n    <\/CallSystemsCSC>\r\n    <CallSystemsCSS>\r\n        \r\n    \r\n        <objID>351036986<\/objID>\r\n        \r\n    \r\n        <ID>351036986<\/ID>\r\n        \r\n    \r\n        <ShortName>ProvPlatform_INC_Customer<\/ShortName>\r\n        \r\n    \r\n        <Name>ProvPlatform_INC_Customer<\/Name>\r\n        \r\n    \r\n        <AskAtCloseCall>Y<\/AskAtCloseCall>\r\n        \r\n    \r\n        <AttachmentFormat>FilenameOnly<\/AttachmentFormat>\r\n        \r\n    \r\n        <EnabledForWorkflowSelection>Y<\/EnabledForWorkflowSelection>\r\n        \r\n    \r\n        <IsGlobal>N<\/IsGlobal>\r\n        \r\n    \r\n        <PreventCallActionIfDifferentLevel>N<\/PreventCallActionIfDifferentLevel>\r\n        \r\n    \r\n        <SelectOnlyTechniciansFromQueue>N<\/SelectOnlyTechniciansFromQueue>\r\n        \r\n    \r\n        <UseActions>N<\/UseActions>\r\n        \r\n    \r\n        <UseSuccessors>N<\/UseSuccessors>\r\n        \r\n\r\n    <\/CallSystemsCSS>\r\n    <CallStatesCUS>\r\n        \r\n    \r\n        <objID>351033718<\/objID>\r\n        \r\n    \r\n        <ID>351033718<\/ID>\r\n        \r\n    \r\n        <ShortName>1<\/ShortName>\r\n        \r\n    \r\n        <Name>New<\/Name>\r\n        \r\n    \r\n        <SeqNr>10<\/SeqNr>\r\n        \r\n    \r\n        <CanContinueSLAFlag>N<\/CanContinueSLAFlag>\r\n        \r\n    \r\n        <CanHoldSLAFlag>N<\/CanHoldSLAFlag>\r\n        \r\n    \r\n        <CanStartFlag>Y<\/CanStartFlag>\r\n        \r\n    \r\n        <CanStopFlag>N<\/CanStopFlag>\r\n        \r\n    \r\n        <cog_objid \/>\r\n        \r\n    \r\n        <ColorCode \/>\r\n        \r\n    \r\n        <csy_objid>351033521<\/csy_objid>\r\n        \r\n    \r\n        <IconName \/>\r\n        \r\n    \r\n        <IsActivInEditForms>Y<\/IsActivInEditForms>\r\n        \r\n    \r\n        <IsActivInLists>Y<\/IsActivInLists>\r\n        \r\n    \r\n        <IsBusy>N<\/IsBusy>\r\n        \r\n    \r\n        <Level>1<\/Level>\r\n        \r\n    \r\n        <RetentionTime \/>\r\n        \r\n    \r\n        <SetAcknowledgeCode>N<\/SetAcknowledgeCode>\r\n        \r\n    \r\n        <SetCloseCode>N<\/SetCloseCode>\r\n        \r\n    \r\n        <SetOpenCode>Y<\/SetOpenCode>\r\n        \r\n    \r\n        <SetRecoveryCode>N<\/SetRecoveryCode>\r\n        \r\n    \r\n        <SetResponseCode>N<\/SetResponseCode>\r\n        \r\n    \r\n        <SetStartSLACode>N<\/SetStartSLACode>\r\n        \r\n    \r\n        <SetWhenAppointmentCreatedFlag>N<\/SetWhenAppointmentCreatedFlag>\r\n        \r\n    \r\n        <SetWhenAppointmentRemovedFlag>N<\/SetWhenAppointmentRemovedFlag>\r\n        \r\n    \r\n        <SetWhenTechnicianAssignedFlag>N<\/SetWhenTechnicianAssignedFlag>\r\n        \r\n    \r\n        <sup_objid \/>\r\n        \r\n    \r\n        <UseForCallListFunctionUpdate>N<\/UseForCallListFunctionUpdate>\r\n        \r\n\r\n    <\/CallStatesCUS>\r\n    <CallStatesSPR>\r\n        \r\n    \r\n        <objID>351045682<\/objID>\r\n        \r\n    \r\n        <ID>351045682<\/ID>\r\n        \r\n    \r\n        <ShortName>100<\/ShortName>\r\n        \r\n    \r\n        <Name>New<\/Name>\r\n        \r\n    \r\n        <SeqNr>10<\/SeqNr>\r\n        \r\n    \r\n        <CanContinueSLAFlag>Y<\/CanContinueSLAFlag>\r\n        \r\n    \r\n        <CanHoldSLAFlag>N<\/CanHoldSLAFlag>\r\n        \r\n    \r\n        <CanStartFlag>Y<\/CanStartFlag>\r\n        \r\n    \r\n        <CanStopFlag>N<\/CanStopFlag>\r\n        \r\n    \r\n        <cog_objid \/>\r\n        \r\n    \r\n        <ColorCode \/>\r\n        \r\n    \r\n        <csy_objid>351036986<\/csy_objid>\r\n        \r\n    \r\n        <IconName \/>\r\n        \r\n    \r\n        <IsActivInEditForms>Y<\/IsActivInEditForms>\r\n        \r\n    \r\n        <IsActivInLists>Y<\/IsActivInLists>\r\n        \r\n    \r\n        <IsBusy>N<\/IsBusy>\r\n        \r\n    \r\n        <Level>1<\/Level>\r\n        \r\n    \r\n        <RetentionTime \/>\r\n        \r\n    \r\n        <SetAcknowledgeCode>N<\/SetAcknowledgeCode>\r\n        \r\n    \r\n        <SetCloseCode>N<\/SetCloseCode>\r\n        \r\n    \r\n        <SetOpenCode>Y<\/SetOpenCode>\r\n        \r\n    \r\n        <SetRecoveryCode>N<\/SetRecoveryCode>\r\n        \r\n    \r\n        <SetResponseCode>N<\/SetResponseCode>\r\n        \r\n    \r\n        <SetStartSLACode>Y<\/SetStartSLACode>\r\n        \r\n    \r\n        <SetWhenAppointmentCreatedFlag>N<\/SetWhenAppointmentCreatedFlag>\r\n        \r\n    \r\n        <SetWhenAppointmentRemovedFlag>N<\/SetWhenAppointmentRemovedFlag>\r\n        \r\n    \r\n        <SetWhenTechnicianAssignedFlag>N<\/SetWhenTechnicianAssignedFlag>\r\n        \r\n    \r\n        <sup_objid \/>\r\n        \r\n    \r\n        <UseForCallListFunctionUpdate>N<\/UseForCallListFunctionUpdate>\r\n        \r\n\r\n    <\/CallStatesSPR>\r\n    <ProblemTypesPRO>\r\n        \r\n    \r\n        <objID>351037037<\/objID>\r\n        \r\n    \r\n        <ID>351037037<\/ID>\r\n        \r\n    \r\n        <ShortName>Alert\/Alarm<\/ShortName>\r\n        \r\n    \r\n        <Name>Alert\/Alarm<\/Name>\r\n        \r\n    \r\n        <SeqNr>1<\/SeqNr>\r\n        \r\n    \r\n        <cog_objid \/>\r\n        \r\n    \r\n        <csy_objid>351033521<\/csy_objid>\r\n        \r\n    \r\n        <IsActivInEditForms>Y<\/IsActivInEditForms>\r\n        \r\n    \r\n        <IsActivInLists>Y<\/IsActivInLists>\r\n        \r\n\r\n    <\/ProblemTypesPRO>\r\n    <PrioritiesPCU>\r\n        \r\n    \r\n        <objID>351052433<\/objID>\r\n        \r\n    \r\n        <ID>351052433<\/ID>\r\n        \r\n    \r\n        <ShortName>3<\/ShortName>\r\n        \r\n    \r\n        <Name>3 - Moderate<\/Name>\r\n        \r\n    \r\n        <SeqNr>10<\/SeqNr>\r\n        \r\n    \r\n        <cog_objid \/>\r\n        \r\n    \r\n        <csy_objid>351033521<\/csy_objid>\r\n        \r\n    \r\n        <IconName \/>\r\n        \r\n    \r\n        <IsActivInEditForms>Y<\/IsActivInEditForms>\r\n        \r\n    \r\n        <IsActivInLists>Y<\/IsActivInLists>\r\n        \r\n\r\n    <\/PrioritiesPCU>\r\n    <PrioritiesPSP>\r\n        \r\n    \r\n        <objID>351045609<\/objID>\r\n        \r\n    \r\n        <ID>351045609<\/ID>\r\n        \r\n    \r\n        <ShortName>P3<\/ShortName>\r\n        \r\n    \r\n        <Name>Minor<\/Name>\r\n        \r\n    \r\n        <SeqNr>20<\/SeqNr>\r\n        \r\n    \r\n        <cog_objid \/>\r\n        \r\n    \r\n        <csy_objid>351036986<\/csy_objid>\r\n        \r\n    \r\n        <IconName>images\/icons\/2bar_red.gif<\/IconName>\r\n        \r\n    \r\n        <IsActivInEditForms>Y<\/IsActivInEditForms>\r\n        \r\n    \r\n        <IsActivInLists>Y<\/IsActivInLists>\r\n        \r\n\r\n    <\/PrioritiesPSP>\r\n    <SeveritiesSEV>\r\n        \r\n    \r\n        <objID>351037017<\/objID>\r\n        \r\n    \r\n        <ID>351037017<\/ID>\r\n        \r\n    \r\n        <ShortName>1<\/ShortName>\r\n        \r\n    \r\n        <Name>Critical<\/Name>\r\n        \r\n    \r\n        <SeqNr>10<\/SeqNr>\r\n        \r\n    \r\n        <cog_objid \/>\r\n        \r\n    \r\n        <csy_objid>351033521<\/csy_objid>\r\n        \r\n    \r\n        <IsActivInEditForms>Y<\/IsActivInEditForms>\r\n        \r\n    \r\n        <IsActivInLists>Y<\/IsActivInLists>\r\n        \r\n\r\n    <\/SeveritiesSEV>\r\n    <FailureTypesFAT>\r\n        \r\n    \r\n        <objID>351140480<\/objID>\r\n        \r\n    \r\n        <ID>351140480<\/ID>\r\n        \r\n    \r\n        <ShortName>Web<\/ShortName>\r\n        \r\n    \r\n        <Name>Web<\/Name>\r\n        \r\n    \r\n        <SeqNr>10<\/SeqNr>\r\n        \r\n    \r\n        <cog_objid \/>\r\n        \r\n    \r\n        <csy_objid>351033521<\/csy_objid>\r\n        \r\n    \r\n        <IsActivInEditForms>Y<\/IsActivInEditForms>\r\n        \r\n    \r\n        <IsActivInLists>Y<\/IsActivInLists>\r\n        \r\n\r\n    <\/FailureTypesFAT>\r\n    <BPPersonsEDI>\r\n        \r\n    \r\n        <objID>1000005000<\/objID>\r\n        \r\n    \r\n        <ID>5000<\/ID>\r\n        \r\n    \r\n        <ShortName>P2<\/ShortName>\r\n        \r\n    \r\n        <ala_objid>1000000814<\/ala_objid>\r\n        \r\n    \r\n        <bpa_objid>1000002999<\/bpa_objid>\r\n        \r\n    \r\n        <bpp_objid \/>\r\n        \r\n    \r\n        <bpr_objid \/>\r\n        \r\n    \r\n        <City \/>\r\n        \r\n    \r\n        <Comment1 \/>\r\n        \r\n    \r\n        <Comment2 \/>\r\n        \r\n    \r\n        <Comment3 \/>\r\n        \r\n    \r\n        <Comment4 \/>\r\n        \r\n    \r\n        <Comment5 \/>\r\n        \r\n    \r\n        <CostCentre \/>\r\n        \r\n    \r\n        <cou_objid \/>\r\n        \r\n    \r\n        <CreationTimeUTC \/>\r\n        \r\n    \r\n        <CSSFileName \/>\r\n        \r\n    \r\n        <DeactivationTimeUTC \/>\r\n        \r\n    \r\n        <defaultRoleUid \/>\r\n        \r\n    \r\n        <Department \/>\r\n        \r\n    \r\n        <Description \/>\r\n        \r\n    \r\n        <DisplayInfoTicker>N<\/DisplayInfoTicker>\r\n        \r\n    \r\n        <edi_objid>1000005003<\/edi_objid>\r\n        \r\n    \r\n        <EditTimeUTC>2006-10-08 08:36:36.0<\/EditTimeUTC>\r\n        \r\n    \r\n        <EMail \/>\r\n        \r\n    \r\n        <etv_objid \/>\r\n        \r\n    \r\n        <Fax \/>\r\n        \r\n    \r\n        <FirstLoginTimeUTC \/>\r\n        \r\n    \r\n        <FirstName>Inbound<\/FirstName>\r\n        \r\n    \r\n        <HourlyCost \/>\r\n        \r\n    \r\n        <IsActiv>Y<\/IsActiv>\r\n        \r\n    \r\n        <IsBridgeBuilder>N<\/IsBridgeBuilder>\r\n        \r\n    \r\n        <IsDeactivationByUploadAllowed>N<\/IsDeactivationByUploadAllowed>\r\n        \r\n    \r\n        <IsLicenseUser>Y<\/IsLicenseUser>\r\n        \r\n    \r\n        <IsUnsubscribeFromSurveys>N<\/IsUnsubscribeFromSurveys>\r\n        \r\n    \r\n        <IsVisibleForPartner>N<\/IsVisibleForPartner>\r\n        \r\n    \r\n        <IsWorkflowBuilder>N<\/IsWorkflowBuilder>\r\n        \r\n    \r\n        <LastLoginTimeUTC \/>\r\n        \r\n    \r\n        <LastName>Converter<\/LastName>\r\n        \r\n    \r\n        <LastPasswordChange>2004-09-26 08:28:05.0<\/LastPasswordChange>\r\n        \r\n    \r\n        <Latitude \/>\r\n        \r\n    \r\n        <loc_objid \/>\r\n        \r\n    \r\n        <Location \/>\r\n        \r\n    \r\n        <loginas_sup_objid \/>\r\n        \r\n    \r\n        <LoginName>P2<\/LoginName>\r\n        \r\n    \r\n        <Longitude \/>\r\n        \r\n    \r\n        <los_objid \/>\r\n        \r\n    \r\n        <MaxSizeOfInboundMessage \/>\r\n        \r\n    \r\n        <MobileTel \/>\r\n        \r\n    \r\n        <MustChangePasswordOnNextLogin>N<\/MustChangePasswordOnNextLogin>\r\n        \r\n    \r\n        <Notes \/>\r\n        \r\n    \r\n        <NrOfFalsePWAttempts \/>\r\n        \r\n    \r\n        <pgr_objid>63400111<\/pgr_objid>\r\n        \r\n    \r\n        <PIN \/>\r\n        \r\n    \r\n        <Province \/>\r\n        \r\n    \r\n        <QuickLogNumberValidityMinutes \/>\r\n        \r\n    \r\n        <Room \/>\r\n        \r\n    \r\n        <Salutation \/>\r\n        \r\n    \r\n        <SendUserNotesFlag>N<\/SendUserNotesFlag>\r\n        \r\n    \r\n        <ShowNotes \/>\r\n        \r\n    \r\n        <Sign \/>\r\n        \r\n    \r\n        <SkypeName \/>\r\n        \r\n    \r\n        <SpecialLoginMethod \/>\r\n        \r\n    \r\n        <Street \/>\r\n        \r\n    \r\n        <Tel \/>\r\n        \r\n    \r\n        <Tel2 \/>\r\n        \r\n    \r\n        <Title \/>\r\n        \r\n    \r\n        <tzo_objid>1000040000<\/tzo_objid>\r\n        \r\n    \r\n        <UID \/>\r\n        \r\n    \r\n        <ula_objid>1000000820<\/ula_objid>\r\n        \r\n    \r\n        <UpDownloadEncoding>ISO-8859-1<\/UpDownloadEncoding>\r\n        \r\n    \r\n        <UserCategory \/>\r\n        \r\n    \r\n        <UseStdReportCallListSetups>Y<\/UseStdReportCallListSetups>\r\n        \r\n    \r\n        <Zip \/>\r\n        \r\n\r\n    <\/BPPersonsEDI>\r\n    <ContractElements>\r\n        \r\n    \r\n        <objID>351052650<\/objID>\r\n        \r\n    \r\n        <ID>351052650<\/ID>\r\n        \r\n    \r\n        <ShortName>Customer-INC<\/ShortName>\r\n        \r\n    \r\n        <Name>Customer-INC<\/Name>\r\n        \r\n    \r\n        <ContractIDProv \/>\r\n        \r\n    \r\n        <ContractIDCust \/>\r\n        \r\n    \r\n        <con_objid>351052275<\/con_objid>\r\n        \r\n    \r\n        <ValidFrom \/>\r\n        \r\n    \r\n        <ValidUntil \/>\r\n        \r\n    \r\n        <Description \/>\r\n        \r\n    \r\n        <scp_objid \/>\r\n        \r\n    \r\n        <spp_objid \/>\r\n        \r\n    \r\n        <CompManfacturer \/>\r\n        \r\n    \r\n        <CompType \/>\r\n        \r\n    \r\n        <CompModel \/>\r\n        \r\n    \r\n        <Component \/>\r\n        \r\n    \r\n        <CompSerNr \/>\r\n        \r\n    \r\n        <CompInvNr \/>\r\n        \r\n    \r\n        <CompOpSys \/>\r\n        \r\n    \r\n        <CompLocationZip \/>\r\n        \r\n    \r\n        <CompLocationCity \/>\r\n        \r\n    \r\n        <CompLocationStreet \/>\r\n        \r\n    \r\n        <CompLocation \/>\r\n        \r\n    \r\n        <CompLocationTel \/>\r\n        \r\n    \r\n        <CompDescription \/>\r\n        \r\n    \r\n        <CompLocationName \/>\r\n        \r\n    \r\n        <CompLocationCou_objid \/>\r\n        \r\n    \r\n        <ResponseTime>0<\/ResponseTime>\r\n        \r\n    \r\n        <RecoveryTime>0<\/RecoveryTime>\r\n        \r\n    \r\n        <SendMailToSPFlag>Y<\/SendMailToSPFlag>\r\n        \r\n    \r\n        <SendMailToCustFlag>Y<\/SendMailToCustFlag>\r\n        \r\n    \r\n        <IsDefaultFlag>N<\/IsDefaultFlag>\r\n        \r\n    \r\n        <IsActiv>Y<\/IsActiv>\r\n        \r\n    \r\n        <ser_objid \/>\r\n        \r\n    \r\n        <RecoveryAlertMinutes1>0<\/RecoveryAlertMinutes1>\r\n        \r\n    \r\n        <RecoveryAlertMinutes2>0<\/RecoveryAlertMinutes2>\r\n        \r\n    \r\n        <CutOffTime1 \/>\r\n        \r\n    \r\n        <CutOffTime2 \/>\r\n        \r\n    \r\n        <CutOffSet \/>\r\n        \r\n    \r\n        <UseCutOffFlag>N<\/UseCutOffFlag>\r\n        \r\n    \r\n        <PreferCustRequEndTimeFlag>N<\/PreferCustRequEndTimeFlag>\r\n        \r\n    \r\n        <cqu_objid \/>\r\n        \r\n    \r\n        <cq2_objid \/>\r\n        \r\n    \r\n        <cq3_objid \/>\r\n        \r\n    \r\n        <que_objid \/>\r\n        \r\n    \r\n        <qu2_objid \/>\r\n        \r\n    \r\n        <qu3_objid \/>\r\n        \r\n    \r\n        <CCUCategory1 \/>\r\n        \r\n    \r\n        <CCUCategory2 \/>\r\n        \r\n    \r\n        <CCUCategory3 \/>\r\n        \r\n    \r\n        <CCUCategory4 \/>\r\n        \r\n    \r\n        <CCUCategory5 \/>\r\n        \r\n    \r\n        <CSPCategory1 \/>\r\n        \r\n    \r\n        <CSPCategory2 \/>\r\n        \r\n    \r\n        <CSPCategory3 \/>\r\n        \r\n    \r\n        <CSPCategory4 \/>\r\n        \r\n    \r\n        <CSPCategory5 \/>\r\n        \r\n    \r\n        <pcu_objid \/>\r\n        \r\n    \r\n        <psp_objid \/>\r\n        \r\n    \r\n        <sev_objid \/>\r\n        \r\n    \r\n        <pse_objid \/>\r\n        \r\n    \r\n        <pro_objid \/>\r\n        \r\n    \r\n        <ppr_objid \/>\r\n        \r\n    \r\n        <fat_objid \/>\r\n        \r\n    \r\n        <pfa_objid \/>\r\n        \r\n    \r\n        <req_objid>1000235200<\/req_objid>\r\n        \r\n    \r\n        <CompShortName \/>\r\n        \r\n    \r\n        <CompName \/>\r\n        \r\n    \r\n        <CompSerNrProv \/>\r\n        \r\n    \r\n        <CompLocationDescription \/>\r\n        \r\n    \r\n        <CompLocationProvince \/>\r\n        \r\n    \r\n        <CompLocationCategory \/>\r\n        \r\n    \r\n        <CompRoom \/>\r\n        \r\n    \r\n        <DefaultShortDescription \/>\r\n        \r\n    \r\n        <DefaultDescription \/>\r\n        \r\n    \r\n        <DefaultRemarks \/>\r\n        \r\n    \r\n        <DefaultDiagnosis \/>\r\n        \r\n    \r\n        <DefaultSolution \/>\r\n        \r\n    \r\n        <edi_objid>350683943<\/edi_objid>\r\n        \r\n    \r\n        <EditTimeUTC>2017-09-26 09:50:04.0<\/EditTimeUTC>\r\n        \r\n    \r\n        <esc_objid \/>\r\n        \r\n    \r\n        <esp_objid \/>\r\n        \r\n    \r\n        <URL \/>\r\n        \r\n    \r\n        <cst_objid \/>\r\n        \r\n    \r\n        <pst_objid \/>\r\n        \r\n    \r\n        <cel_objid \/>\r\n        \r\n    \r\n        <bpa_objid \/>\r\n        \r\n    \r\n        <IsSelectableForCustomer>Y<\/IsSelectableForCustomer>\r\n        \r\n    \r\n        <IsSelectableForProvider>Y<\/IsSelectableForProvider>\r\n        \r\n    \r\n        <CopyCategoriesCommitedCust>N<\/CopyCategoriesCommitedCust>\r\n        \r\n    \r\n        <CopyCategoriesCommitedProv>N<\/CopyCategoriesCommitedProv>\r\n        \r\n    \r\n        <stp_objid \/>\r\n        \r\n    \r\n        <IsDeactivationByUploadAllowed>N<\/IsDeactivationByUploadAllowed>\r\n        \r\n    \r\n        <CopyNewSolutionsToCustomer>N<\/CopyNewSolutionsToCustomer>\r\n        \r\n    \r\n        <CopyNewSolutionsToProvider>N<\/CopyNewSolutionsToProvider>\r\n        \r\n    \r\n        <UsePrioritiesOfSLAExtensions>N<\/UsePrioritiesOfSLAExtensions>\r\n        \r\n    \r\n        <Name1 \/>\r\n        \r\n    \r\n        <Name2 \/>\r\n        \r\n    \r\n        <Name3 \/>\r\n        \r\n    \r\n        <Name4 \/>\r\n        \r\n    \r\n        <Name5 \/>\r\n        \r\n    \r\n        <URLName \/>\r\n        \r\n    \r\n        <mgc_objid \/>\r\n        \r\n    \r\n        <mgp_objid \/>\r\n        \r\n    \r\n        <cim_objid \/>\r\n        \r\n    \r\n        <pim_objid \/>\r\n        \r\n    \r\n        <cur_objid \/>\r\n        \r\n    \r\n        <pur_objid \/>\r\n        \r\n    \r\n        <UsesPrioritySLAExtensions>N<\/UsesPrioritySLAExtensions>\r\n        \r\n    \r\n        <UsesServiceTimeSLAExtensions>N<\/UsesServiceTimeSLAExtensions>\r\n        \r\n    \r\n        <UsesLocationSLAExtensions>N<\/UsesLocationSLAExtensions>\r\n        \r\n    \r\n        <CustomerBackgroundColor \/>\r\n        \r\n    \r\n        <CustomerFontColor \/>\r\n        \r\n    \r\n        <ProviderBackgroundColor \/>\r\n        \r\n    \r\n        <ProviderFontColor \/>\r\n        \r\n    \r\n        <csu_objid \/>\r\n        \r\n    \r\n        <psu_objid \/>\r\n        \r\n\r\n    <\/ContractElements>\r\n    <Contracts>\r\n        \r\n    \r\n        <objID>351052275<\/objID>\r\n        \r\n    \r\n        <ID>351052275<\/ID>\r\n        \r\n    \r\n        <ShortName>Customer-INC<\/ShortName>\r\n        \r\n    \r\n        <Name>Customer-INC<\/Name>\r\n        \r\n    \r\n        <ValidFrom \/>\r\n        \r\n    \r\n        <ValidUntil \/>\r\n        \r\n    \r\n        <IsInventoryFlag>N<\/IsInventoryFlag>\r\n        \r\n    \r\n        <PartInBenchFlag>N<\/PartInBenchFlag>\r\n        \r\n    \r\n        <ccu_objid>351033512<\/ccu_objid>\r\n        \r\n    \r\n        <ProvIDCust \/>\r\n        \r\n    \r\n        <ProvNameCust \/>\r\n        \r\n    \r\n        <ProvOrgIDCust \/>\r\n        \r\n    \r\n        <ProvOrgNameCust \/>\r\n        \r\n    \r\n        <CategoryCust \/>\r\n        \r\n    \r\n        <ContractIDCust \/>\r\n        \r\n    \r\n        <SendMailToCustDefaultFlag>Y<\/SendMailToCustDefaultFlag>\r\n        \r\n    \r\n        <csp_objid>351052274<\/csp_objid>\r\n        \r\n    \r\n        <CustIDProv \/>\r\n        \r\n    \r\n        <CustNameProv \/>\r\n        \r\n    \r\n        <CustOrgIDProv \/>\r\n        \r\n    \r\n        <CustOrgNameProv \/>\r\n        \r\n    \r\n        <CategoryProv \/>\r\n        \r\n    \r\n        <ContractIDProv \/>\r\n        \r\n    \r\n        <SendMailToSPDefaultFlag>Y<\/SendMailToSPDefaultFlag>\r\n        \r\n    \r\n        <scp_objid \/>\r\n        \r\n    \r\n        <spp_objid \/>\r\n        \r\n    \r\n        <URL \/>\r\n        \r\n    \r\n        <IsActiv>Y<\/IsActiv>\r\n        \r\n    \r\n        <EditTimeUTC>2017-09-25 12:51:14.0<\/EditTimeUTC>\r\n        \r\n    \r\n        <edi_objid>350683943<\/edi_objid>\r\n        \r\n    \r\n        <esc_objid \/>\r\n        \r\n    \r\n        <esp_objid \/>\r\n        \r\n    \r\n        <URLName \/>\r\n        \r\n    \r\n        <mgc_objid \/>\r\n        \r\n    \r\n        <mgp_objid \/>\r\n        \r\n    \r\n        <CustomerBackgroundColor \/>\r\n        \r\n    \r\n        <CustomerFontColor \/>\r\n        \r\n    \r\n        <ProviderBackgroundColor \/>\r\n        \r\n    \r\n        <ProviderFontColor \/>\r\n        \r\n\r\n    <\/Contracts>\r\n    <BPRoles>\r\n        \r\n    \r\n        <objID>1000000101<\/objID>\r\n        \r\n    \r\n        <ID>1<\/ID>\r\n        \r\n    \r\n        <ShortName>SC<\/ShortName>\r\n        \r\n    \r\n        <Name>Service Customer<\/Name>\r\n        \r\n\r\n    <\/BPRoles>\r\n    <BPRolesINI>\r\n        \r\n    \r\n        <objID>1000000102<\/objID>\r\n        \r\n    \r\n        <ID>2<\/ID>\r\n        \r\n    \r\n        <ShortName>SP<\/ShortName>\r\n        \r\n    \r\n        <Name>Service Provider<\/Name>\r\n        \r\n\r\n    <\/BPRolesINI>\r\n    <TimeZones>\r\n        \r\n    \r\n        <objID>1000040144<\/objID>\r\n        \r\n    \r\n        <ID>40144<\/ID>\r\n        \r\n    \r\n        <ShortName>CET<\/ShortName>\r\n        \r\n    \r\n        <Name>Central European Time<\/Name>\r\n        \r\n    \r\n        <TZID>Europe\/Amsterdam<\/TZID>\r\n        \r\n    \r\n        <UTCRawOffset>60<\/UTCRawOffset>\r\n        \r\n\r\n    <\/TimeZones>\r\n    <RequestTypes>\r\n        \r\n    \r\n        <objID>1000235200<\/objID>\r\n        \r\n    \r\n        <ID>1000235200<\/ID>\r\n        \r\n    \r\n        <ShortName>INC<\/ShortName>\r\n        \r\n    \r\n        <Name>Incident<\/Name>\r\n        \r\n    \r\n        <SeqNr>10<\/SeqNr>\r\n        \r\n\r\n    <\/RequestTypes>\r\n    <ImpactsCUS>\r\n        \r\n    \r\n        <objID>351037008<\/objID>\r\n        \r\n    \r\n        <ID>351037008<\/ID>\r\n        \r\n    \r\n        <ShortName>1<\/ShortName>\r\n        \r\n    \r\n        <Name>High<\/Name>\r\n        \r\n    \r\n        <SeqNr>0<\/SeqNr>\r\n        \r\n    \r\n        <cog_objid \/>\r\n        \r\n    \r\n        <csy_objid>351033521<\/csy_objid>\r\n        \r\n    \r\n        <IsActivInEditForms>Y<\/IsActivInEditForms>\r\n        \r\n    \r\n        <IsActivInLists>Y<\/IsActivInLists>\r\n        \r\n\r\n    <\/ImpactsCUS>\r\n    <UrgencyCUS>\r\n        \r\n    \r\n        <objID>351036998<\/objID>\r\n        \r\n    \r\n        <ID>351036998<\/ID>\r\n        \r\n    \r\n        <ShortName>1<\/ShortName>\r\n        \r\n    \r\n        <Name>High<\/Name>\r\n        \r\n    \r\n        <SeqNr>10<\/SeqNr>\r\n        \r\n    \r\n        <cog_objid \/>\r\n        \r\n    \r\n        <csy_objid>351033521<\/csy_objid>\r\n        \r\n    \r\n        <IsActivInEditForms>Y<\/IsActivInEditForms>\r\n        \r\n    \r\n        <IsActivInLists>Y<\/IsActivInLists>\r\n        \r\n\r\n    <\/UrgencyCUS>\r\n    <PrioritiesTO>\r\n        \r\n    \r\n        <objID>351052433<\/objID>\r\n        \r\n    \r\n        <ID>351052433<\/ID>\r\n        \r\n    \r\n        <ShortName>3<\/ShortName>\r\n        \r\n    \r\n        <Name>3 - Moderate<\/Name>\r\n        \r\n    \r\n        <SeqNr>10<\/SeqNr>\r\n        \r\n    \r\n        <cog_objid \/>\r\n        \r\n    \r\n        <csy_objid>351033521<\/csy_objid>\r\n        \r\n    \r\n        <IconName \/>\r\n        \r\n    \r\n        <IsActivInEditForms>Y<\/IsActivInEditForms>\r\n        \r\n    \r\n        <IsActivInLists>Y<\/IsActivInLists>\r\n        \r\n\r\n    <\/PrioritiesTO>\r\n    <FailureTypes>\r\n        \r\n    \r\n        <objID>351140480<\/objID>\r\n        \r\n    \r\n        <ID>351140480<\/ID>\r\n        \r\n    \r\n        <ShortName>Web<\/ShortName>\r\n        \r\n    \r\n        <Name>Web<\/Name>\r\n        \r\n    \r\n        <SeqNr>10<\/SeqNr>\r\n        \r\n    \r\n        <cog_objid \/>\r\n        \r\n    \r\n        <csy_objid>351033521<\/csy_objid>\r\n        \r\n    \r\n        <IsActivInEditForms>Y<\/IsActivInEditForms>\r\n        \r\n    \r\n        <IsActivInLists>Y<\/IsActivInLists>\r\n        \r\n\r\n    <\/FailureTypes>\r\n    <ProblemTypes>\r\n        \r\n    \r\n        <objID>351037037<\/objID>\r\n        \r\n    \r\n        <ID>351037037<\/ID>\r\n        \r\n    \r\n        <ShortName>Alert\/Alarm<\/ShortName>\r\n        \r\n    \r\n        <Name>Alert\/Alarm<\/Name>\r\n        \r\n    \r\n        <SeqNr>1<\/SeqNr>\r\n        \r\n    \r\n        <cog_objid \/>\r\n        \r\n    \r\n        <csy_objid>351033521<\/csy_objid>\r\n        \r\n    \r\n        <IsActivInEditForms>Y<\/IsActivInEditForms>\r\n        \r\n    \r\n        <IsActivInLists>Y<\/IsActivInLists>\r\n        \r\n\r\n    <\/ProblemTypes>\r\n    <Severities>\r\n        \r\n    \r\n        <objID>351037017<\/objID>\r\n        \r\n    \r\n        <ID>351037017<\/ID>\r\n        \r\n    \r\n        <ShortName>1<\/ShortName>\r\n        \r\n    \r\n        <Name>Critical<\/Name>\r\n        \r\n    \r\n        <SeqNr>10<\/SeqNr>\r\n        \r\n    \r\n        <cog_objid \/>\r\n        \r\n    \r\n        <csy_objid>351033521<\/csy_objid>\r\n        \r\n    \r\n        <IsActivInEditForms>Y<\/IsActivInEditForms>\r\n        \r\n    \r\n        <IsActivInLists>Y<\/IsActivInLists>\r\n        \r\n\r\n    <\/Severities>\r\n    <CallStates>\r\n        \r\n    \r\n        <objID>351033718<\/objID>\r\n        \r\n    \r\n        <ID>351033718<\/ID>\r\n        \r\n    \r\n        <ShortName>1<\/ShortName>\r\n        \r\n    \r\n        <Name>New<\/Name>\r\n        \r\n    \r\n        <SeqNr>10<\/SeqNr>\r\n        \r\n    \r\n        <CanContinueSLAFlag>N<\/CanContinueSLAFlag>\r\n        \r\n    \r\n        <CanHoldSLAFlag>N<\/CanHoldSLAFlag>\r\n        \r\n    \r\n        <CanStartFlag>Y<\/CanStartFlag>\r\n        \r\n    \r\n        <CanStopFlag>N<\/CanStopFlag>\r\n        \r\n    \r\n        <cog_objid \/>\r\n        \r\n    \r\n        <ColorCode \/>\r\n        \r\n    \r\n        <csy_objid>351033521<\/csy_objid>\r\n        \r\n    \r\n        <IconName \/>\r\n        \r\n    \r\n        <IsActivInEditForms>Y<\/IsActivInEditForms>\r\n        \r\n    \r\n        <IsActivInLists>Y<\/IsActivInLists>\r\n        \r\n    \r\n        <IsBusy>N<\/IsBusy>\r\n        \r\n    \r\n        <Level>1<\/Level>\r\n        \r\n    \r\n        <RetentionTime \/>\r\n        \r\n    \r\n        <SetAcknowledgeCode>N<\/SetAcknowledgeCode>\r\n        \r\n    \r\n        <SetCloseCode>N<\/SetCloseCode>\r\n        \r\n    \r\n        <SetOpenCode>Y<\/SetOpenCode>\r\n        \r\n    \r\n        <SetRecoveryCode>N<\/SetRecoveryCode>\r\n        \r\n    \r\n        <SetResponseCode>N<\/SetResponseCode>\r\n        \r\n    \r\n        <SetStartSLACode>N<\/SetStartSLACode>\r\n        \r\n    \r\n        <SetWhenAppointmentCreatedFlag>N<\/SetWhenAppointmentCreatedFlag>\r\n        \r\n    \r\n        <SetWhenAppointmentRemovedFlag>N<\/SetWhenAppointmentRemovedFlag>\r\n        \r\n    \r\n        <SetWhenTechnicianAssignedFlag>N<\/SetWhenTechnicianAssignedFlag>\r\n        \r\n    \r\n        <sup_objid \/>\r\n        \r\n    \r\n        <UseForCallListFunctionUpdate>N<\/UseForCallListFunctionUpdate>\r\n        \r\n\r\n    <\/CallStates>\r\n    <BPartnersCUS>\r\n        \r\n    \r\n        <objID>351033506<\/objID>\r\n        \r\n    \r\n        <ID>351033506<\/ID>\r\n        \r\n    \r\n        <ShortName>Customer<\/ShortName>\r\n        \r\n    \r\n        <Name>Customer<\/Name>\r\n        \r\n    \r\n        <AccountCode \/>\r\n        \r\n    \r\n        <ActiveSlaProfileId \/>\r\n        \r\n    \r\n        <BusinessYearStartMonth \/>\r\n        \r\n    \r\n        <Category \/>\r\n        \r\n    \r\n        <CheckLoginNameNotPartOfPassword>Y<\/CheckLoginNameNotPartOfPassword>\r\n        \r\n    \r\n        <City>Worldwide<\/City>\r\n        \r\n    \r\n        <cou_objid>27087<\/cou_objid>\r\n        \r\n    \r\n        <DisableMinPasswordChangeIntervalHoursFlag>N<\/DisableMinPasswordChangeIntervalHoursFlag>\r\n        \r\n    \r\n        <DisablePasswordHistoryLengthFlag>N<\/DisablePasswordHistoryLengthFlag>\r\n        \r\n    \r\n        <DUNS \/>\r\n        \r\n    \r\n        <edi_objid>350683943<\/edi_objid>\r\n        \r\n    \r\n        <EditTimeUTC>2017-09-21 14:59:17.0<\/EditTimeUTC>\r\n        \r\n    \r\n        <EMail \/>\r\n        \r\n    \r\n        <Fax \/>\r\n        \r\n    \r\n        <ImprintURL \/>\r\n        \r\n    \r\n        <ImprintURLName \/>\r\n        \r\n    \r\n        <IsActiv>Y<\/IsActiv>\r\n        \r\n    \r\n        <Latitude \/>\r\n        \r\n    \r\n        <Location \/>\r\n        \r\n    \r\n        <LogoData \/>\r\n        \r\n    \r\n        <LogoFilename \/>\r\n        \r\n    \r\n        <Longitude \/>\r\n        \r\n    \r\n        <MaxPasswordLength \/>\r\n        \r\n    \r\n        <MaxWrongPasswordAttempts>6<\/MaxWrongPasswordAttempts>\r\n        \r\n    \r\n        <Memo \/>\r\n        \r\n    \r\n        <MinPasswordChangeIntervalHours \/>\r\n        \r\n    \r\n        <MinPasswordLength>6<\/MinPasswordLength>\r\n        \r\n    \r\n        <MustUseCapitalFlag>Y<\/MustUseCapitalFlag>\r\n        \r\n    \r\n        <MustUseDigitFlag>Y<\/MustUseDigitFlag>\r\n        \r\n    \r\n        <PasswordDurationDays>90<\/PasswordDurationDays>\r\n        \r\n    \r\n        <PasswordHistoryLength>3<\/PasswordHistoryLength>\r\n        \r\n    \r\n        <Province \/>\r\n        \r\n    \r\n        <sdl_objid>181195494<\/sdl_objid>\r\n        \r\n    \r\n        <Street>Ch\u016B\u014D, Tokyo, Japan<\/Street>\r\n        \r\n    \r\n        <Tel>0000000<\/Tel>\r\n        \r\n    \r\n        <tzo_objid>1000040144<\/tzo_objid>\r\n        \r\n    \r\n        <UID \/>\r\n        \r\n    \r\n        <URL \/>\r\n        \r\n    \r\n        <URLName \/>\r\n        \r\n    \r\n        <UserMayResetPassword>Y<\/UserMayResetPassword>\r\n        \r\n    \r\n        <Zip>1234<\/Zip>\r\n        \r\n\r\n    <\/BPartnersCUS>\r\n    <BPartnersSPR>\r\n        \r\n    \r\n        <objID>333697404<\/objID>\r\n        \r\n    \r\n        <ID>333697404<\/ID>\r\n        \r\n    \r\n        <ShortName>ProviderProvPlatform<\/ShortName>\r\n        \r\n    \r\n        <Name>Provider platform<\/Name>\r\n        \r\n    \r\n        <AccountCode \/>\r\n        \r\n    \r\n        <ActiveSlaProfileId \/>\r\n        \r\n    \r\n        <BusinessYearStartMonth>1<\/BusinessYearStartMonth>\r\n        \r\n    \r\n        <Category \/>\r\n        \r\n    \r\n        <CheckLoginNameNotPartOfPassword>N<\/CheckLoginNameNotPartOfPassword>\r\n        \r\n    \r\n        <City>Atlanta<\/City>\r\n        \r\n    \r\n        <cou_objid>27298<\/cou_objid>\r\n        \r\n    \r\n        <DisableMinPasswordChangeIntervalHoursFlag>N<\/DisableMinPasswordChangeIntervalHoursFlag>\r\n        \r\n    \r\n        <DisablePasswordHistoryLengthFlag>N<\/DisablePasswordHistoryLengthFlag>\r\n        \r\n    \r\n        <DUNS \/>\r\n        \r\n    \r\n        <edi_objid>228905749<\/edi_objid>\r\n        \r\n    \r\n        <EditTimeUTC>2016-02-22 23:34:26.0<\/EditTimeUTC>\r\n        \r\n    \r\n        <EMail \/>\r\n        \r\n    \r\n        <Fax \/>\r\n        \r\n    \r\n        <ImprintURL \/>\r\n        \r\n    \r\n        <ImprintURLName \/>\r\n        \r\n    \r\n        <IsActiv>Y<\/IsActiv>\r\n        \r\n    \r\n        <Latitude \/>\r\n        \r\n    \r\n        <Location \/>\r\n        \r\n    \r\n        <LogoData \/>\r\n        \r\n    \r\n        <LogoFilename \/>\r\n        \r\n    \r\n        <Longitude \/>\r\n        \r\n    \r\n        <MaxPasswordLength \/>\r\n        \r\n    \r\n        <MaxWrongPasswordAttempts \/>\r\n        \r\n    \r\n        <Memo \/>\r\n        \r\n    \r\n        <MinPasswordChangeIntervalHours \/>\r\n        \r\n    \r\n        <MinPasswordLength \/>\r\n        \r\n    \r\n        <MustUseCapitalFlag>N<\/MustUseCapitalFlag>\r\n        \r\n    \r\n        <MustUseDigitFlag>N<\/MustUseDigitFlag>\r\n        \r\n    \r\n        <PasswordDurationDays \/>\r\n        \r\n    \r\n        <PasswordHistoryLength \/>\r\n        \r\n    \r\n        <Province \/>\r\n        \r\n    \r\n        <sdl_objid>184125178<\/sdl_objid>\r\n        \r\n    \r\n        <Street>1<\/Street>\r\n        \r\n    \r\n        <Tel>1<\/Tel>\r\n        \r\n    \r\n        <tzo_objid>1000040050<\/tzo_objid>\r\n        \r\n    \r\n        <UID \/>\r\n        \r\n    \r\n        <URL \/>\r\n        \r\n    \r\n        <URLName \/>\r\n        \r\n    \r\n        <UserMayResetPassword>Y<\/UserMayResetPassword>\r\n        \r\n    \r\n        <Zip>1<\/Zip>\r\n        \r\n\r\n    <\/BPartnersSPR>\r\n    <CallOpenTimeStr>2018-06-12 14:31:36<\/CallOpenTimeStr>\r\n    <CallResponseTimeStr \/>\r\n    <CallCloseTimeStr \/>\r\n    <CallStartSLATimeStr>2018-06-12 14:31:36<\/CallStartSLATimeStr>\r\n    <CallRecoveryTimeStr \/>\r\n    <CustomerRequestedStartTimeStr \/>\r\n    <CustomerRequestedEndTimeStr>2018-06-12 05:24:00<\/CustomerRequestedEndTimeStr>\r\n    <ProviderScheduledStartTimeStr \/>\r\n    <ProviderScheduledEndTimeStr \/>\r\n    <CallReceiveTimeStr>2018-06-12 14:31:36<\/CallReceiveTimeStr>\r\n    <CallSendTimeStr \/>\r\n    <ProblemStartTimeStr \/>\r\n    <CallStateChangeTimeStr>2018-06-12 14:31:36<\/CallStateChangeTimeStr>\r\n    <EndOfResponseTimeStr \/>\r\n    <EndOfRecoveryTimeStr \/>\r\n    <CallAcknowledgeTimeStr \/>\r\n    <EditTimeStr>2018-06-12 14:36:09<\/EditTimeStr>\r\n    <ContractElementsValidFromStr \/>\r\n    <ContractElementsValidUntilStr \/>\r\n    <ContractsValidFromStr \/>\r\n    <ContractsValidUntilStr \/>\r\n    <DevInstallationDateStr \/>\r\n    <NowTimeStr>2018-07-24 09:55:15<\/NowTimeStr>\r\n    <EndOfCstRetentionTimeStr \/>\r\n    <EndOfPstRetentionTimeStr \/>\r\n    <CallCstRetentionTimeStr>2018-06-12 14:36:59<\/CallCstRetentionTimeStr>\r\n    <CallPstRetentionTimeStr>2018-06-12 14:36:59<\/CallPstRetentionTimeStr>\r\n    <InMessageReceivedTimeStr>2018-06-12 14:36:09<\/InMessageReceivedTimeStr>\r\n    <OutMessageQueuedTimeStr>2018-06-12 14:36:09<\/OutMessageQueuedTimeStr>\r\n    <OutMessageSentTimeStr>2018-06-12 14:36:09<\/OutMessageSentTimeStr>\r\n    <HexID>14F816FF<\/HexID>\r\n    <SystemName>us3-sta<\/SystemName>\r\n    <NoOfAttachments>0<\/NoOfAttachments>\r\n    <CallHistory NR=\"1\">\r\n        \r\n    \r\n        <cst_objid>351033718<\/cst_objid>\r\n        \r\n    \r\n        <pst_objid>351045682<\/pst_objid>\r\n        \r\n    \r\n        <CallStateChangeTimeStr>2018-06-12 14:31:36<\/CallStateChangeTimeStr>\r\n        \r\n    \r\n        <EditTimeStr>2018-06-12 14:36:08<\/EditTimeStr>\r\n        \r\n    \r\n        <CallStatesCUS>\r\n            \r\n        \r\n            <ShortName>1<\/ShortName>\r\n            \r\n        \r\n            <Name>New<\/Name>\r\n            \r\n    \r\n        <\/CallStatesCUS>\r\n        \r\n    \r\n        <CallStatesSPR>\r\n            \r\n        \r\n            <ShortName>100<\/ShortName>\r\n            \r\n        \r\n            <Name>New<\/Name>\r\n            \r\n    \r\n        <\/CallStatesSPR>\r\n        \r\n    \r\n        <Remarks>test\r\n\r\n<\/Remarks>\r\n        \r\n    \r\n        <AddRemarksToSummary>N<\/AddRemarksToSummary>\r\n        \r\n    \r\n        <BPPersonsEDI>\r\n            \r\n        \r\n            <FirstName>Customer_to_Provider<\/FirstName>\r\n            \r\n        \r\n            <LastName>inc<\/LastName>\r\n            \r\n    \r\n        <\/BPPersonsEDI>\r\n        \r\n    \r\n        <BPRoles>\r\n            \r\n        \r\n            <ShortName>SP<\/ShortName>\r\n            \r\n        \r\n            <Name>Service Provider<\/Name>\r\n            \r\n    \r\n        <\/BPRoles>\r\n        \r\n    \r\n        <CustCallID>TESTCUSTINC01<\/CustCallID>\r\n        \r\n\r\n    <\/CallHistory>\r\n    <CallHistory NR=\"2\">\r\n        \r\n    \r\n        <cst_objid>351033718<\/cst_objid>\r\n        \r\n    \r\n        <pst_objid>351045682<\/pst_objid>\r\n        \r\n    \r\n        <CallStateChangeTimeStr>2018-06-12 14:31:36<\/CallStateChangeTimeStr>\r\n        \r\n    \r\n        <EditTimeStr>2018-06-12 14:31:39<\/EditTimeStr>\r\n        \r\n    \r\n        <CallStatesCUS>\r\n            \r\n        \r\n            <ShortName>1<\/ShortName>\r\n            \r\n        \r\n            <Name>New<\/Name>\r\n            \r\n    \r\n        <\/CallStatesCUS>\r\n        \r\n    \r\n        <CallStatesSPR>\r\n            \r\n        \r\n            <ShortName>100<\/ShortName>\r\n            \r\n        \r\n            <Name>New<\/Name>\r\n            \r\n    \r\n        <\/CallStatesSPR>\r\n        \r\n    \r\n        <Remarks>Application Acknowledgement: Success<\/Remarks>\r\n        \r\n    \r\n        <AddRemarksToSummary>N<\/AddRemarksToSummary>\r\n        \r\n    \r\n        <BPPersonsEDI>\r\n            \r\n        \r\n            <FirstName>Inbound<\/FirstName>\r\n            \r\n        \r\n            <LastName>Converter<\/LastName>\r\n            \r\n    \r\n        <\/BPPersonsEDI>\r\n        \r\n    \r\n        <BPRoles>\r\n            \r\n        \r\n            <ShortName>SC<\/ShortName>\r\n            \r\n        \r\n            <Name>Service Customer<\/Name>\r\n            \r\n    \r\n        <\/BPRoles>\r\n        \r\n    \r\n        <CustCallID>TESTCUSTINC01<\/CustCallID>\r\n        \r\n\r\n    <\/CallHistory>\r\n    <CallHistory NR=\"3\">\r\n        \r\n    \r\n        <cst_objid>351033718<\/cst_objid>\r\n        \r\n    \r\n        <pst_objid>351045682<\/pst_objid>\r\n        \r\n    \r\n        <CallStateChangeTimeStr>2018-06-12 14:31:36<\/CallStateChangeTimeStr>\r\n        \r\n    \r\n        <EditTimeStr>2018-06-12 14:31:36<\/EditTimeStr>\r\n        \r\n    \r\n        <CallStatesCUS>\r\n            \r\n        \r\n            <ShortName>1<\/ShortName>\r\n            \r\n        \r\n            <Name>New<\/Name>\r\n            \r\n    \r\n        <\/CallStatesCUS>\r\n        \r\n    \r\n        <CallStatesSPR>\r\n            \r\n        \r\n            <ShortName>100<\/ShortName>\r\n            \r\n        \r\n            <Name>New<\/Name>\r\n            \r\n    \r\n        <\/CallStatesSPR>\r\n        \r\n    \r\n        <Remarks>test\r\n\r\n<\/Remarks>\r\n        \r\n    \r\n        <AddRemarksToSummary>Y<\/AddRemarksToSummary>\r\n        \r\n    \r\n        <BPPersonsEDI>\r\n            \r\n        \r\n            <FirstName>Customer_to_Provider<\/FirstName>\r\n            \r\n        \r\n            <LastName>inc<\/LastName>\r\n            \r\n    \r\n        <\/BPPersonsEDI>\r\n        \r\n    \r\n        <BPRoles>\r\n            \r\n        \r\n            <ShortName>SP<\/ShortName>\r\n            \r\n        \r\n            <Name>Service Provider<\/Name>\r\n            \r\n    \r\n        <\/BPRoles>\r\n        \r\n\r\n    <\/CallHistory>\r\n<\/SD.call>'}
                                  if (editorid==='#editor5') {
                                  isEditorAce = editorAce5;
                                  }
                                  if (editorid==='#editor6') {
                                  isEditorAce = editorAce6;
                                  }
                                  if (editorid==='.acediff__left') {
                                  isEditorAce = editorAce2;
                                  sampleXML='<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<html xsl:version=\"1.0\" xmlns:xsl=\"http:\/\/www.w3.org\/1999\/XSL\/Transform\">\r\n<body style=\"font-family:Arial;font-size:12pt;background-color:#EEEEEE\">\r\n<xsl:for-each select=\"breakfast_menu\/food\">\r\n  <div style=\"background-color:teal;color:white;padding:4px\">\r\n    <span style=\"font-weight:bold\"><xsl:value-of select=\"name\"\/> - <\/span>\r\n    <xsl:value-of select=\"price\"\/>\r\n    <\/div>\r\n  <div style=\"margin-left:20px;margin-bottom:1em;font-size:10pt\">\r\n    <p>\r\n    <xsl:value-of select=\"description\"\/>\r\n    <span style=\"font-style:italic\"> (<xsl:value-of select=\"calories\"\/> calories per serving)<\/span>\r\n    <\/p>\r\n  <\/div>\r\n<\/xsl:for-each>\r\n<\/body>\r\n<\/html>';
                                  }
                                  if (editorid==='.acediff__right') {
                                  isEditorAce = editorAce2;
                                  sampleXML='<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<html xsl:version=\"1.0\" xmlns:xsl=\"http:\/\/www.w3.org\/1999\/XSL\/Transform\">\r\n<body style=\"font-family:Arial;font-size:12pt;background-color:#EEEEEE\">\r\n<xsl:for-each select=\"breakfast_menu\/food\">\r\n  <div style=\"background-color:teal;color:white;padding:4px\">\r\n    <span style=\"font-weight:bold\"><xsl:value-of select=\"name\"\/> - <\/span>\r\n    <xsl:value-of select=\"price\"\/>\r\n    <\/div>\r\n  <div style=\"margin-left:20px;margin-bottom:1em;font-size:10pt\">\r\n    <p>\r\n    <xsl:value-of select=\"description\"\/>\r\n    <span style=\"font-style:italic\"> (<xsl:value-of select=\"calories\"\/> calories per serving)<\/span>\r\n    <\/p>\r\n  <\/div>\r\n<\/xsl:for-each>\r\n<\/body>\r\n<\/html>';
                                  }
                                  
                                  
                                  
                                  
                                  if(isReturn != undefined && isReturn){
                                  return vkbeautify.xml(sampleXML);
                                  }
                                  
                                  setToEditor(isEditorAce,vkbeautify.xml(sampleXML));
                                  
                                  $(".sharelinkurl").attr("st_url", window.location);
                                  $(".sharelinkurl").attr("st_title", $("#save_link_title").val());
                                  }
                                  
                                  function processJSON(data) {
                                  
                                  $.each(data, function(k, data1) {
                                         
                                         var type1 = typeof data1;
                                         
                                         if (type1 == "object") {
                                         
                                         flag = false;
                                         processJSON(data1);
                                         arr.push("end");
                                         arr.push("end");
                                         
                                         } else {
                                         arr.push(k, data1);
                                         }
                                         
                                         });
                                  
                                  return arr;
                                  }
                                  
                                  ///this fucnttion called by xml to csv and json to csv
                                  function jsonTocsvbyjson(data,returnFlag,convert_type) {
                                  var csv;
                                  try {
                                  var delimiter = ",";
                                  var csvHeader = true;
                                  var csvQuotes = false;
                                  var nobreaks = false;
                                  csv = jsonToCsv(data, delimiter,csvHeader,csvQuotes, nobreaks);
                                  
                                  } catch (e) {
                                  console.log(e);
                                  if(returnFlag == undefined || !returnFlag){
                                  editorResult.setValue("Error in Convert");
                                  }
                                  else{
                                  openErrorDialog("Error in Convert :" + e);
                                  }
                                  return false;
                                  }
                                  
                                  if(returnFlag == undefined || !returnFlag){
                                  editorResult.setValue(csv);
                                  }
                                  else{
                                  return csv;
                                  }
                                  }
                                  
                                  function csvToExcel(data,headers,returnFlag,convert_type)
                                  {
                                  arr = [];
                                  flag = true;
                                  
                                  var header = headers.toString().replace(/,/g , "\t");
                                  var content = "";
                                  var headFlag = true;
                                  
                                  
                                  $.each(data, function(k, value) {
                                         
                                         for (var keys in value) {
                                         content +=value[keys]+ "\t";
                                         }
                                         content+="\n";
                                         
                                         });
                                  
                                  
                                  if(returnFlag == undefined || !returnFlag){
                                  editorResult.setValue(header + "\n" + content);
                                  }
                                  else{
                                  console.log(header + "\n" + content);
                                  return (header + "\n" + content);
                                  }
                                  }
                                  
                                  function convertToHtml(type){
                                  
                                  var data = editorAce.getValue();
                                  
                                  if(data != null && data.length != 0){
                                  if(type.toLowerCase() == "json"){
                                  var csv = jsonTocsvbyjson(data,true);
                                  toHTML(csv,type);
                                  }
                                  else if(type.toLowerCase() == "xml"){
                                  var x2js = new X2JS();
                                  
                                  try {
                                  data = $.parseXML(data);
                                  } catch (e) {
                                  openErrorDialog("Invalid XML");
                                  }
                                  
                                  var json = x2js.xml2json(data);
                                  
                                  var csv = jsonTocsvbyjson(json,true);
                                  
                                  toHTML(csv,type);
                                  }
                                  }
                                  }
                                  
                                  function JsonDataNotAccurate() {}
                                  
                                  function jsonDataValidate(json){
                                  try{
                                  $.parseJSON(json);
                                  }
                                  catch(e){
                                  console.log(e);
                                  return false;
                                  }
                                  return true;
                                  }
                                  function performShowHideToHtml(id){
                                  if(undefined == id){
                                  id = "editor";
                                  }
                                  
                                  if($("#"+id).hasClass("hide")){
                                  $("#"+id).removeClass("hide");
                                  $("#result1").addClass("hide");
                                  $("#showHideBtn").val("Show Output");
                                  editorAce.setValue($("#excelToHtmlData").text());
                                  }
                                  else{
                                  $("#result1").removeClass("hide");
                                  $("#"+id).addClass("hide");
                                  $("#showHideBtn").val("Show HTML");
                                  }
                                  }
                                  
                                  function addIndent($data){
                                  
                                  if($("#sel1").length > 0){
                                  var space = $("#sel1").val();
                                  var spaceStr = "";
                                  for(var i = 0; i < space; i++){
                                  spaceStr += "\t";
                                  }
                                  var lines = $data.split("\n");
                                  var linesWithSpace = [];
                                  $.each(lines, function(i, line){
                                         linesWithSpace.push(spaceStr+line);
                                         });
                                  $data = linesWithSpace.join("\n");
                                  }
                                  
                                  return $data;
                                  }
                                  
                                  function updateProile(){
                                  var name = $("#profilename").val();
                                  
                                  if(name == null || name.trim().length == 0){
                                  openErrorDialog("Name is required. please enter name");
                                  return false;
                                  }
                                  
                                  $.ajax({
                                         url : "/service/updateProfile",
                                         dataType : "text",
                                         type : "post",
                                         data : {
                                         name : name,
                                         },
                                         success : function(response) {
                                         $("#usernamelable").text(name.substring(0, 5)+"..");
                                         document.cookie="loggedinuser=" + name;
                                         openErrorDialog("Your Profile updated successfully");
                                         }
                                         });
                                  }
                                  
                                  
                                  function convertToExcel(type){
                                  
                                  var data = editorAce.getValue();
                                  
                                  var ext = $("#fileExtention").val();
                                  
                                  var csv = null;
                                  
                                  if(data != null && data.length != 0){
                                  if(type.toLowerCase() == "json"){
                                  csv = jsonTocsvbyjson(data,true,'excel');
                                  }
                                  else if(type.toLowerCase() == "xml"){
                                  var x2js = new X2JS();
                                  
                                  try {
                                  data = $.parseXML(data);
                                  } catch (e) {
                                  openErrorDialog("Invalid XML");
                                  }
                                  
                                  var json = x2js.xml2json(data);
                                  
                                  csv = jsonTocsvbyjson(json,true,'excel');
                                  }
                                  else if(type.toLowerCase() == "csv"){
                                  csv = data;
                                  
                                  var allTextLines = csv.split(/\r\n|\n/);
                                  var headers = allTextLines[0].split(',');
                                  var lines = [];
                                  for (var i=1; i<allTextLines.length; i++) {
                                  var data = allTextLines[i].split(',');
                                  if (data.length == headers.length) {
                                  
                                  var tarr = [];
                                  var jsonData = {};
                                  for (var j=0; j<headers.length; j++) {
                                  jsonData[headers[j]] = data[j] ;
                                  }
                                  tarr.push(jsonData);
                                  lines.push(jsonData);
                                  }
                                  }
                                  
                                  csv =csvToExcel(lines,headers,true,'excel');
                                  
                                  }
                                  else if(type.toLowerCase() == "yaml"){
                                  var json = yamlToJson(true);
                                  csv = jsonTocsvbyjson(json,true,'excel');
                                  }
                                  
                                  if (csv != null && csv.trim().length != 0) {
                                  var type1 = "application/vnd.ms-excel";
                                  if(ext == "xlsx"){
                                  type1 = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                                  }
                                  
                                  var blob = new Blob([csv], {
                                                      type : type1
                                                      });
                                  
                                  saveAs(blob, "codebeautify."+ext);
                                  
                                  
                                  /* $("#exportToExcelDiv").html("");
                                   $("#exportToExcelDiv").html(toHTML(csv,null,true));
                                   
                                   table.update({
                                   formats: [ext]     // pass in a new set of properties
                                   });
                                   
                                   $("#exportToExcelDiv table").tableExport();*/
                                  
                                  }
                                  else{
                                  openErrorDialog("Sorry Try Again,Some error in convterting to excel");
                                  }
                                  }
                                  }
                                  
                                  function getGoogleIndex(){
                                  //var domain = $("#domain").val();
                                  
                                  var domain = editorAce.getValue();
                                  
                                  if(domain == null || domain.trim().length == 0){
                                  openErrorDialog("Domain is required. please enter domain");
                                  return false;
                                  }
                                  
                                  $.ajax({
                                         url : "/service/getGoogleCount",
                                         dataType : "json",
                                         type : "post",
                                         data : {
                                         domain : domain,
                                         },
                                         success : function(response) {
                                         console.log(response);
                                         }
                                         });
                                  }
                                  
                                  function savetoLocalStorage(data){
                                  if(localStorage){
                                  if(!$("#viewName").val().toLowerCase().startsWith("excel")){
                                  localStorage.setItem($("#viewName").val(),data);
                                  }
                                  
                                  }
                                  }
                                  function setFromLocalStorage(){
                                  if(localStorage){
                                  var data = localStorage.getItem($("#viewName").val());
                                  if(data != null && data.trim().length != 0){
                                  setToEditor(data);
                                  }
                                  }
                                  }
                                  
                                  //csv to html
                                  function toHTML(data,ext,isReturn) {
                                  
                                  var csv = "";
                                  
                                  if(data == undefined){
                                  csv = editorAce.getValue();
                                  ext = "csv";
                                  }
                                  else{
                                  csv = data;
                                  }
                                  
                                  if (csv.trim().length != 0) {
                                  
                                  rows = "", thead = "<tr>";
                                  
                                  var csvObj = Papa.parse(csv);
                                  
                                  var lines = csvObj.data;
                                  var arr = lines.slice(1, lines.length);
                                  
                                  arr.sort(function(a, b) {
                                           return b.length - a.length;
                                           });
                                  
                                  if (arr.length == 0) {
                                  arr = csvObj.data;
                                  }
                                  
                                  for ( var i = 0; i < arr[0].length; i++) {
                                  if (i < (lines[0].length)) {
                                  thead += "<th>" + lines[0][i] + "</th>";
                                  } else {
                                  thead += "<th>COLUMN" + (i + 1) + "</th>";
                                  }
                                  
                                  }
                                  thead += "</tr>";
                                  
                                  for ( var j = 1; j < lines.length; j++) {
                                  
                                  rows += "<tr>";
                                  
                                  for ( var i = 0; i < arr[0].length; i++) {
                                  if (i < (lines[j].length)) {
                                  rows += "<td>" + lines[j][i] + "</td>";
                                  } else {
                                  rows += "<td>&nbsp</td>";
                                  }
                                  }
                                  rows += "</tr>";
                                  }
                                  
                                  var output = '<table border=1><thead>\n' + thead + '</thead><tbody>\n'
                                  + rows + '</tbody></table>';
                                  
                                  if(isReturn !== undefined && isReturn == true){
                                  return output;
                                  }
                                  
                                  htmlOutput(output,ext);
                                  } else {
                                  openErrorDialog("Sorry Input is Empty");
                                  }
                                  }
$(document).ready(function() {
	
    //viewname = $("#viewName").val().trim();
                viewname = $("#viewName").val();
                  
	if (viewname == 'xmlviewer') {
		setViewTitle("XML VIEWER", true, true);
		createEditor("xml", "xml");
	} else if (viewname == 'xml-to-csv-converter') {
		setViewTitle("XML TO CSV Converter", true, true);
		createEditor("xml", "text");
	} else if (viewname == 'xml-to-yaml') {
		setViewTitle("XML TO YAML Converter", true, true);
		createEditor("xml", "yaml");
	} else if (viewname == 'xmltojson') {

		mode = document.getElementById('mode');
		/*mode.onchange = function() {
			try{
			editorResult.getSession().setMode(mode.value);
			showJSON(true);
		}
		catch(e){
			console.log(e);
		}

		};*/

		var container = document.getElementById("jsoneditor");

		var options = {
			//mode : mode.value,
			error : function(err) {
				openErrorDialog(err.toString());
			}
		};
		//editor = new JSONEditor(container, options,{});
		setViewTitle("XML TO JSON Converter", true, true);
		createEditor('xml','json');
	}
	else if (viewname == 'xmlvalidate') {
		setViewTitle("XML Validator",true,true);
		createEditor("xml");
	}
	else if (viewname == 'online-xml-editor') {
		setViewTitle("Online XML EDITOR",true,true);
		createEditor("xml");	
		editorAce.setOptions({
		    enableBasicAutocompletion: true,
		    enableSnippets: true,
		    enableLiveAutocompletion: false
		});
	}else if (viewname == 'xml-to-excel-converter') {
		createEditor("xml");
		setViewTitle("Online XML TO EXCEL Converter", true, true);
	}else if (viewname == 'xml-to-java-converter') {
		setViewTitle("XML TO JAVA Converter", true, true);
		createEditor("xml", "java");
	}
});

function setToEditorPayload(data) {
	editorAce.setValue(data);
}
                                  
                                  function setToEditorTemplate(data) {
                                  editorAce2.setValue(data);
                                  }
                                  function setToEditorPPTempl(data) {
                                  editorAce3.setValue(data);
                                  }
                                  function setToEditorGoldenXML(data) {
                                  editorAce4.setValue(data);
                                  }
                                  function setToEditorPPView(data) {
                                  editorAce5.setValue(data);
                                  }
                                  

function xmlTreeView() {
	isXmlData = true;
	var oldformat = editorAce.getValue();
	if (oldformat.trim().length > 0) {
		var newformat = vkbeautify.xml(oldformat);
		$('#result1').html("");
		$('#result1').show();
		$('#result').hide();
		new XMLTree({
			xml : newformat.trim(),
			container : '#result1',
			startExpanded : true
		});

		setOutputMsg("XML Tree View");
	} else {
		$('#result1').html("");
	}
}

function FormatXML() {
	isXmlData = true;
	editorResult.getSession().setMode("ace/mode/xml");
	$('#result').show();
	$('#result1').hide();
	var oldformat = editorAce.getValue();
	if (oldformat.trim().length > 0) {

		var newformat = vkbeautify.xml(oldformat);
		editorResult.setValue(newformat);

		setOutputMsg("Beautify XML");
	}
}

function showJSON() {
	isXmlData = false;
	editorResult.getSession().setMode("ace/mode/json");
	$('#result').show();
	$('#result1').hide();

	var xml = editorAce.getValue();

	if (xml.trim().length > 0) {
		try {
			var x2js = new X2JS();

			editorResult.setValue(vkbeautify.json(JSON.stringify(x2js
					.xml_str2json(xml))));

			setOutputMsg("XML to JSON");
		} catch (e) {

			openErrorDialog("invalid XML" + e);
		}
	}
}

function MinifyXML() {
	isXmlData = true;
	editorResult.getSession().setMode("ace/mode/xml");
	$('#result').show();
	$('#result1').hide();
	var oldformat = editorAce.getValue();
	editorResult.getSession().setUseWrapMode(true);
	if (oldformat.trim().length > 0) {
		var newformat = vkbeautify.xmlmin(vkbeautify.xml(oldformat));
		editorResult.setValue(newformat);

		setOutputMsg("Minify XML");
	}
}

function createXMLFile() {

	var data = editorAce.getValue();

	if (data.trim().length > 0) {

		var content = "";
		if ($("#result1").is(':visible')) {
			content = vkbeautify.xml(data);
		} else {
			content = editorResult.getValue();
		}

		if (content != null && content != "" && content.trim().length > 0) {
			var blob = new Blob([ "" + content + "" ], {
				type : "text/plain;charset=utf-8"
			});
			var fileName = "codebeautify.xml";
			if (isXmlData == false) {
				fileName = "codebeautify.json";
			}
			saveAs(blob, fileName);
		} else {
			openErrorDialog("Sorry Result is Empty");
		}
	}
}

/** *********** xml to csv *************** */

function getText(xml, xpath, nodes) {
	$(xpath, xml).each(function() {
		nodes.push($(this).text());
	});
}


function xmlTocsv() {

	var data = editorAce.getValue();

	var xml = "";

	if (data != null && data.trim().length != 0) {

		try {
			xml = $.parseXML(data);
		} catch (e) {
			openErrorDialog("Invalid XML");
		}

		var x2js = new X2JS();

		data = x2js.xml2json(xml);

		setOutputMsg("XML TO CSV");

		jsonTocsvbyjson(data);
	}
}

function xmlToarray() {

	$.ajax({
		type : "post",
		url : globalurl + "convter",
		dataType : "json",
		data : {
			type : "xml2array",
			data : editorAce.getValue()
		},
		success : function(response) {
			console.log(response);
			console.log(Papa.unparse(response));
		},
		error : function(e, s, a) {
			openErrorDialog("Failed to load data=" + s);

		}
	});
}


// xml to yaml

function XMLToYAML() {
	editorResult.getSession().setMode("ace/mode/yaml");
	var oldformat = editorAce.getValue();

	if (oldformat.trim().length > 0) {
		try {

			var x2js = new X2JS();

			data = x2js.xml_str2json(oldformat.trim());

			data = json2yaml(data);

			editorResult.setValue(data);

			setOutputMsg("XML TO YAML");
		} catch (e) {
			var errorData = "";

			errorData = errorData + "Error : " + e['message'];
			errorData = errorData + "\n";
			errorData = errorData + "Line : " + e['parsedLine'] + "  "
					+ e['snippet'];

			editorResult.setValue(errorData);
			setOutputMsg("Invalid XML");
		}
	}
}

// xml to json
function xmlTojson() {

	var xml = editorAce.getValue();

	if (xml.trim().length > 0) {
		
		$("#json").show();
		$("#xml").hide();
		var data = "";
		try {

			/*var x2js = new X2JS();
			editor.setMode('json');
			editor.set(x2js.xml_str2json(xml));
			editor.expandAll(true);*/
			var x2js = new X2JS();
			var n  = vkbeautify.json(x2js.xml_str2json(xml));
			console.log(n);
			isJsonData = true;
					editorResult.getSession().setMode("ace/mode/json");
					$("#json").hide();
					$("#xml").show();
					editorResult.getSession().setUseWrapMode(false);
					editorResult.setValue(n);
			setOutputMsg("XML to JSON");
			
			$(".jsoneditor").removeAttr('height');
			
		} catch (e) {
			console.log(e);
			if (data != null && data.length != 0) {
				openErrorDialog("invalid XML");
			}
		}
	}
}

// xml validate
function validateXML(editorid,hresultid) {
                                  //isEditorAce = $("textarea[name='PAYLOAD']").text();
                                  var isEditorAce = null;
                                  if (editorid==='#editor') {
                                  isEditorAce = editorAce;
                                  }
                                  if (editorid==='#editor2') {
                                  isEditorAce = editorAce2;
                                  }
                                  if (editorid==='#editor3') {
                                  isEditorAce = editorAce3;
                                  }
                                  if (editorid==='#editor4') {
                                  isEditorAce = editorAce4;
                                  }
                                  if (editorid==='#editor5') {
                                  isEditorAce = editorAce5;
                                  }
                                  if (editorid==='#editor6') {
                                  isEditorAce = editorAce6;
                                  }
                                  //var isEditorAce = editorAce2;
                                  //console.log("to valid is "+isEditorAce.getValue());
	if (validate(isEditorAce.getValue().trim()) != " "
			&& isEditorAce.getValue().trim().length > 0) {
                                  
		var data = isEditorAce.getValue();
		if (data != null && data != "" && data.trim().length > 0) {
			// code for IE
			if (window.ActiveXObject)
			  {
			  var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			  xmlDoc.async=false;
			  xmlDoc.loadXML(document.all(data).value);
			  if(xmlDoc.parseError.errorCode!=0)
			    {
			    var txt="Error Code: " + xmlDoc.parseError.errorCode + "\n";
			    txt=txt+"Error Reason: " + xmlDoc.parseError.reason;
			    txt=txt+"Error Line: " + xmlDoc.parseError.line;
			    	
			    $(hresultid).show();
				$(editorid).css({
					'border' : '1px solid #FBC2C4'
				});
				$(hresultid).removeClass();
				$(hresultid).addClass("error");
				$(hresultid).text(txt);
			    }
			  else
			    {
				   $(hresultid).show();
					$(hresultid).removeClass();
					$(hresultid).addClass("success");
					$(editorid).css({
						'border' : '1px solid #C6D880'
					});
					$(hresultid).text("Valid XML");
					var oldformat = isEditorAce.getValue();
					
					if (oldformat.trim().length > 0) {
						var newformat = vkbeautify.xml(oldformat);
						isEditorAce.setValue(newformat);
						isEditorAce.clearSelection();
					}
			    }
			  }
			// code for Mozilla, Firefox, Opera, etc.
			else if (document.implementation.createDocument)
			  {
			  try
			  {
			  var parser=new DOMParser();
			  var xmlDoc=parser.parseFromString(data,"application/xml");
			  }
			  catch(err)
			  {
				    $(hresultid).show();
					$(editorid).css({
						'border' : '1px solid #FBC2C4'
					});
					$(hresultid).removeClass();
					$(hresultid).addClass("error");
					$(hresultid).text(err.message);
			  }

			if (xmlDoc.getElementsByTagName("parsererror").length>0)
			   {
			   checkErrorXML(xmlDoc.getElementsByTagName("parsererror")[0]);
			   $(hresultid).show();
				$(editorid).css({
					'border' : '1px solid #FBC2C4'
				});
				$(hresultid).removeClass();
				$(hresultid).addClass("error");
				$(hresultid).text(xt);
			   }
			 else
			   {
				 $(hresultid).show();
					$(hresultid).removeClass();
					$(hresultid).addClass("success");
					$(editorid).css({
						'border' : '1px solid #C6D880'
					});
					$(hresultid).text("Valid XML");
					var oldformat = isEditorAce.getValue();
					
					if (oldformat.trim().length > 0) {
						var newformat = vkbeautify.xml(oldformat);
						isEditorAce.setValue(newformat);
						isEditorAce.clearSelection();
					}
			   }
			 }
			else
			 {
			 alert('Your browser cannot handle XML validation');
			 }
		}
	} else {
		$(editorid).css({
			'border' : '1px solid #BCBDBA'
		});
                                  //console.log("im here...");
		$(hresultid).hide();
	}
}

var xt = "", h3OK = 1
function checkErrorXML(x) {
	xt = ""
	h3OK = 1
	checkXML(x)
}

function checkXML(n) {
	var l, i, nam
	nam = n.nodeName
	if (nam == "h3") {
		if (h3OK == 0) {
			return;
		}
		h3OK = 0
	}
	if (nam == "#text") {
		xt = xt + n.nodeValue + "\n"
	}
	l = n.childNodes.length
	for (i = 0; i < l; i++) {
		checkXML(n.childNodes[i])
	}
}

function validate(arg) {
	if (arg == undefined || arg == null || arg == "") {
		return "";
	} else {
		return arg;
	}
}

function clearXML()
{
	editorAce.setValue("");
	$("#hResult").hide();
}


function convertXMLToJava(){
	try {
		var input = editorAce.getValue();
		if (input.trim().length == 0) {
			return false;
		}
		var x2js = new X2JS();
		var n  = vkbeautify.json(x2js.xml_str2json(input));
		console.log(n);
		createJavaObject(n);
	} catch (e) {
		editorResult.setValue("Codebeautify Convert to Java Error : \n" + e);
	}
}

//xml validator
function downloadXMLFile(editorid) {
                                  
                                  var isEditorAce = null;
                                  var editorFname = null;
                                  if (editorid==='#editor') {
                                  isEditorAce = editorAce;
                                  editorFname = "Payload.xml";
                                  }
                                  if (editorid==='#editor2') {
                                  isEditorAce = editorAce2;
                                  editorFname = "Template.xslt";
                                  }
                                  if (editorid==='#editor3') {
                                  isEditorAce = editorAce3;
                                  editorFname = "PostProcessingTemplate.xslt";
                                  }
                                  if (editorid==='#editor4') {
                                  isEditorAce = editorAce4;
                                  editorFname = "GoldenXML.xml";
                                  }
                                  if (editorid==='#editor5') {
                                  isEditorAce = editorAce5;
                                  editorFname = "PostProcessingPayload.xml";
                                  }
                                  if (editorid==='#editor6') {
                                  isEditorAce = editorAce6;
                                  editorFname = "Result.xml";
                                  }
                                  
                                  console.log("values is"+isEditorAce.getValue());
	var content = isEditorAce.getValue();
	if (content.trim().length > 0) {

		var blob = new Blob([ "" + isEditorAce.getValue() + "" ], {
			type : "text/plain;charset=utf-8"
		});
		var filename = editorFname;
		
		if (converted != "validate") {
			saveAs(blob, filename);
		} else {
			openErrorDialog("Yaml is not converted to JSON / XML ");
		}
	} else {
		openErrorDialog("Sorry Result is Empty");
	}
}
