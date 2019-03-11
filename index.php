<!DOCTYPE html>
<html class="js">
<head>
<title>XSLT Converter</title>
<meta name="description" content="XSL Online converter">
<meta name="keywords" content="XML,XSLT,Converter,Online">
<!--<meta name="robots" content="noindex,nofollow">-->
<meta name="author" content="David Rodriguez-Pastrana Parareda">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script data-require="jquery@*" data-semver="2.1.1" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
<script data-require="jquery-ui@*" data-semver="1.10.4" src="https://code.jquery.com/ui/1.10.4/jquery-ui.min.js"></script>
<script data-require="angular.js@*" data-semver="1.3.0-beta.14" src="https://code.angularjs.org/1.3.0-beta.14/angular.min.js"></script>
<script data-require="angular-ui@*" data-semver="0.4.0" src="https://rawgithub.com/angular-ui/angular-ui/master/build/angular-ui.js"></script>
<script data-require="angular-ui-bootstrap@*" data-semver="0.11.0" src="https://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.11.0.min.js"></script>
<script data-require="angular-ui-utils@*" data-semver="0.0.4" src="https://rawgithub.com/ichuan/bower-angular-ui-utils/master/ui-utils.js"></script>
<script data-require="ace@*" data-semver="1.3.3" src="https://ace.c9.io/build/src/ace.js"></script>
<script data-require="ui-ace@*" data-semver="0.1.0" src="https://angular-ui.github.io/ui-ace/dist/ui-ace.js"></script>
<script src="/js/index.js"></script>
<script src="/js/ext-language_tools.js"></script>
<script src="/js/vkbeautify.js" data-cfasync="true"></script>
<script src="/js/jquery-linedtextarea.js"></script>
<script src="/js/xmlviewer.js" data-cfasync="true" ></script>
<script src="/js/bootstrap.min.js"></script>
<script src="/js/ajaxupload.js"></script>
<script src="/js/FileSaver.js"></script>
<script src="/js/filedrop.js"></script>
<script src="/js/xsltonline.js"></script>
<script src="/js/ace-diff.min.js"></script>
<link href="/css/ace-diff.min.css" rel="stylesheet">
<link href="/css/font-awesome.min.css" rel="stylesheet">
<link data-require="bootstrap-css@*" data-semver="3.2.0" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" />
<link data-require="jqueryui@*" data-semver="1.10.4" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.4/css/jquery.ui.all.css" />
<!--<link href="/css/jquery-ui.css" rel="stylesheet">-->
<link href="/css/jquery-linedtextarea.css" rel="stylesheet" />
<link href="/css/xsltonline.css" rel="stylesheet" />
<link rel="icon" href="/favicon.ico">
</head>
<body>
<div id="preloader"></div>
<div id="copy-note-msg" class="hide">
Copied to Clipboard
</div>

<div id="main" class="row">
<div class="col-sm-12 col-md-10 col-lg-10"><h1>XSLT <span class="sghidden">ServiceGrid Smart</span> Converter <span style="font-size:13px">v2.0</span></h1></div>
<div class="col-sm-12 col-md-2 col-lg-2">
<br />
<div id="login" class="input-group">
<input class="form-control" type="password" id="password" onkeypress="if(event.keyCode == 13) $('#button').click();" />
<span class="input-group-btn" style="width:0;">
<button id="button" class="btn btn-default" type="button" onclick="if($('#password').val()==='samples') {
$('.sghidden,#sample,#sample2,#sampleSG,#sample2SG,#dLabel,#dLabel2,#dLabel3,#dLabel4,#dLabel5,#dLabel6').show();$('#sampleStd,#sample2Std').hide();localStorage['pwd']='samples';$('#login').hide();$('#logout').show();}
else {alert('Invalid Password!');password.setSelectionRange(0, password.value.length);localStorage['pwd']='error';}">Login</button>
</span>
</div>
<div id="logout" class="input-group">
<button id="button" class="btn btn-default" type="button" onclick="$('.sghidden,#sample,#sample2,#sampleSG,#sample2SG,#dLabel,#dLabel2,#dLabel3,#dLabel4,#dLabel5,#dLabel6').hide();$('#login').show();$('#logout').hide();$('#sampleStd,#sample2Std').show();localStorage['pwd']='error';">Logout session</button>
</span>
</div>
</div>
</div>

<?php
    
    shell_exec("rm -f ./output.xml ./ppoutput.xml ./errors.txt readTemplate.xslt readPayload.xml readPostProcessingTemplate.xslt readGoldenXML.xml PostProcessingPayload.xml");
    shell_exec("touch ./output.xml ./ppoutput.xml ./errors.txt readTemplate.xslt readPayload.xml readPostProcessingTemplate.xslt readGoldenXML.xml PostProcessingPayload.xml");
    
    if(isset($_POST['selectMode'])) {
        
        $_SESSION['mode'] = $_POST['radio'];
        
        echo "You have selected mode: ".$_POST['radio'];  //  Displaying Selected Value
    }
    
    if (isset($_POST['submit'])) {
        
        //echo var_dump(apc_fetch('selectMode'));
        
        
        
        $TEMPLATE = $_POST['TEMPLATE'];
        $POSTPROCESSING_TEMP = $_POST['POSTPROCESSING_TEMP'];
        $GOLDENXML = $_POST['GOLDENXML'];
        $PAYLOAD = $_POST['PAYLOAD'];
        
        unlink('readTemplate.xslt');
        $fh = fopen('readTemplate.xslt', 'a');
        $txt=$TEMPLATE;
        fwrite($fh,$txt);
        fclose($fh);
        
        unlink('readPayload.xml');
        $fh2 = fopen('readPayload.xml', 'a');
        $txt2=$PAYLOAD;
        fwrite($fh2,$txt2);
        fclose($fh2);
        
        unlink('readPostProcessingTemplate.xslt');
        $fh3 = fopen('readPostProcessingTemplate.xslt', 'a');
        $txt3=$POSTPROCESSING_TEMP;
        fwrite($fh3,$txt3);
        fclose($fh3);
        
        unlink('readGoldenXML.xml');
        $fh4 = fopen('readGoldenXML.xml', 'a');
        $txt4=$GOLDENXML;
        fwrite($fh4,$txt4);
        fclose($fh4);
        
        
        
        //if($execMode === 'normal') {
        if(empty($TEMPLATE) || empty($PAYLOAD)) {
            echo "<br><pre class='error'>You missed a required file!<br>Make sure you have defined <b>Payload.xml</b> and <b>Template.xslt</b></pre>\n";
            //die ("Click Back to start again.");
        } elseif (empty($POSTPROCESSING_TEMP)) {
            shell_exec("./exec.sh readTemplate.xslt readPayload.xml 2> ./errors.txt");
        }
        //}
        
        //if($execMode === 'postprocessing') {
        if(($POSTPROCESSING_TEMP && empty($GOLDENXML)) || (empty($POSTPROCESSING_TEMP) && $GOLDENXML)) {
            echo "<br><pre class='error'>PostProcessing requires another file!<br>Make sure you have defined <b>PostProcessingreadTemplate.xslt</b> and <b>GoldenXML.xml</b> (or leave them blank), together with <b>Payload.xml</b> and <b>Template.xslt</b></pre>\n";
            //die ("Click Back to start again.");
        } elseif ($POSTPROCESSING_TEMP && $GOLDENXML) {
            
            shell_exec("./exec.sh readTemplate.xslt readPostProcessingTemplate.xslt readGoldenXML.xml readPayload.xml 2> ./errors.txt");
        }
        //}
        
        if (filesize('./output.xml') !== 0){
            $myfile = fopen('./output.xml', "r") or die("Unable to open 'output.xml' file!");
            $string = fread($myfile,filesize('./output.xml'));
            fclose($myfile);
        }
        
        if (filesize('./ppoutput.xml') !== 0){
            $myfile = fopen('./ppoutput.xml', "r") or die("Unable to open 'ppoutput.xml' file!");
            $string = fread($myfile,filesize('./ppoutput.xml'));
            fclose($myfile);
        }
        
        $myfile2 = fopen('./errors.txt', "r") or die("Unable to open 'errors.txt' file!");
        $string2 = fread($myfile2,filesize('./errors.txt'));
        fclose($myfile2);
        
        $myfile3 = fopen('readPayload.xml', "r") or die("Unable to open 'Payload.xml' file!");
        $string3 = fread($myfile3,filesize('readPayload.xml'));
        fclose($myfile3);
        
        $myfile4 = fopen('readTemplate.xslt', "r") or die("Unable to open 'Template.xslt' file!");
        $string4 = fread($myfile4,filesize('readTemplate.xslt'));
        fclose($myfile4);
        
        $myfile5 = fopen('readPostProcessingTemplate.xslt', "r") or die("Unable to open 'PostProcessingTemplate.xslt' file!");
        $string5 = fread($myfile5,filesize('readPostProcessingTemplate.xslt'));
        fclose($myfile3);
        
        $myfile6 = fopen('readGoldenXML.xml', "r") or die("Unable to open 'GoldenXML.xml' file!");
        $string6 = fread($myfile6,filesize('readGoldenXML.xml'));
        fclose($myfile6);
        
        $myfile7 = fopen('PostProcessingPayload.xml', "r") or die("Unable to open 'PostProcessingPayload.xml' file!");
        $string7 = fread($myfile7,filesize('PostProcessingPayload.xml'));
        fclose($myfile3);
        
    }
    
    ?>


<!--
<form action="" method="post">
<input type="radio" name="radio" value="normal">Normal mode (Inbound / Outbound)
<input type="radio" name="radio" value="postprocessing">PostProcessing mode (GoldenXML is required)
<input type="submit" name="selectMode" value="Save" />
</form>
-->

<input type="hidden" id="viewName" value="xmlviewer">
<form method="post">


<div ng-app="app">

<div class="row">


<div id="payload" class="col-sm-12 col-md-4 col-lg-4">
<b>XML</b> <span class="tagline">Payload.xml</span><br />
<textarea type="text" name="PAYLOAD" class="hide"><?php echo $string3; ?></textarea>

<div ng-controller="MainCtrl">
<div id="editor" class="form-control" style="min-height:10em"
name="json"
ng-model="initial"
ui-ace="{mode:'javascript'}"
ui-jq="resizable" ui-options="{resize:$boundDigest}"
valid-json
></div>
</div>

<!--<textarea id="editor" class="ace_text-input" autocorrect="off" autocapitalize="off" spellTest="false" style="opacity: 0; left: -100px;" wrap="off"></textarea>-->
<!--<div id="result" class='viewerEditor'></div>-->
<button type="button" onclick="validateXML('#editor','#hResult');" class="btn btn-default">Validate</button>
<button type="button" onclick="clearEditorInput('#editor')" class="btn btn-default">Clear</button>
<button type="button" id="copy-dynamic3" class="btn btn-default">Copy</button>
<!--<button type="button" id="me" onclick="openFile('#editor','me','xml')" class="btn btn-default">Import</button>-->
<button type="button" onclick="downloadXMLFile('#editor');" class="btn btn-default">Download</button>
<button id="sampleStd" type="button" onclick="getSampleData('#editor')" class="btn btn-default">Sample</button>
<button id="sampleSG" type="button" onclick="getSampleData('#editorSG')" class="btn btn-default">Sample</button>
<div class="dropdown dropdown-bubble">
<button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-default">
ServiceNow
<span class="caret"></span>
</button>
<span class="dropdown-menu" aria-labelledby="dLabel">
<xmp><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:u="http://www.service-now.com/u_inbound_incident">
<soapenv:Header/>
<soapenv:Body>
<u:insert>
<u_number>CUSTINC01</u_number>
<u_external_ref>PROVINC01</u_external_ref>
<u_state>1</u_state>
<u_work_notes>test note</u_work_notes>
<u_short_description>test short description</u_short_description>
<u_description>test description</u_description>
<u_priority>3</u_priority>
<u_impact>3</u_impact>
<u_urgency>3</u_urgency>
<import_set_run></import_set_run>
<template_import_log></template_import_log>
<u_assigned_to></u_assigned_to>
<u_assignment_group></u_assignment_group>
<u_business_service>test</u_business_service>
<u_caller_id>test</u_caller_id>
<u_category></u_category>
<u_cause_category></u_cause_category>
<u_close_code>test closure code</u_close_code>
<u_close_notes>test closure note</u_close_notes>
<u_cmdb_ci>Test CI</u_cmdb_ci>
<u_comments></u_comments>
<u_company>test</u_company>
<u_location>test location</u_location>
<u_phone_number></u_phone_number>
<u_provider>test</u_provider>
<u_requested_for></u_requested_for>
<u_service_offering>test</u_service_offering>
<u_subcategory></u_subcategory>
<u_transaction_message></u_transaction_message>
<u_transaction_type></u_transaction_type>
</u:insert>
</soapenv:Body>
</soapenv:Envelope></xmp>
</span>
</div>
<div class="dropdown dropdown-bubble">
<button id="dLabel2" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-default">
ServiceGrid
<span class="caret"></span>
</button>
<span class="dropdown-menu" aria-labelledby="dLabel">
<xmp><?xml version="1.0" encoding="UTF-8"?>
<SD.call>
<objID>000101</objID>
<ID>0001</ID>
<Calls.CustCallID>CUSTINC01</Calls.CustCallID>
<SPCallID>PROVINC01</SPCallID>
<Priorities.ShortName>3</Priorities.ShortName>
<CallStates.ShortName>1</CallStates.ShortName>
<Calls.Caller.PIN>TEST01</Calls.Caller.PIN>
<Calls.MainComponent>item01</Calls.MainComponent>
<Calls.ShortDescription>test Sample short description</Calls.ShortDescription>
<Calls.Description>test Sample description</Calls.Description>
<Calls.Remarks>note test</Calls.Remarks>
<Calls.Solution>close test</Calls.Solution>
<!-- Used for any field btw SD.core (10 allowed) -->
<SysSpecField1></SysSpecField1>
<SysSpecField10></SysSpecField10>
<!-- End Used for any field btw SD.core -->
<!-- Used for any field in a single SD.core (100 allowed) -->
<Field1></Field1>
<Field100></Field100>
<!-- End Used for any field in a single SD.core -->
<!-- CallHistory allows us to check past actions -->
<CallHistory NR="1">
<CustCallID>CUSTINC01</CustCallID>
<CallStatesCUS><ShortName>1</ShortName></CallStatesCUS>
<CallStatesSPR><ShortName>New</ShortName></CallStatesSPR>
<Remarks>test remark history</Remarks>
<!-- BPRoles allows us to check who created the ticket -->
<BPRoles><ShortName>SP</ShortName></BPRoles>
</CallHistory>
<CallHistory NR="2">
<CustCallID>CUSTINC01</CustCallID>
<CallStatesCUS><ShortName>1</ShortName></CallStatesCUS>
<CallStatesSPR><ShortName>New</ShortName></CallStatesSPR>
<Remarks>test remark history</Remarks>
<!-- BPRoles allows us to check who created the ticket -->
<BPRoles><ShortName>SP</ShortName></BPRoles>
</CallHistory>
<!-- End CallHistory allows us to check past actions -->
</SD.call></xmp>
</span>
</div>
<pre id="hResult" class="success" style="display: block;">Valid XML</pre>

<br /> <br />

</div>
<div id="template" class="col-sm-12 col-md-4 col-lg-4">

<b>XSLT</b> <span class="tagline">Template.xslt</span><br />
<textarea name="TEMPLATE" class="hide"><?php echo $string4; ?></textarea>

<div ng-controller="MainCtrl">
<div id="editor2" class="form-control" style="min-height:10em"
name="json"
ng-model="initial"
ui-ace="{mode:'javascript'}"
ui-jq="resizable" ui-options="{resize:$boundDigest}"
valid-json
></div>
</div>


<!--<textarea id="editor2" class="ace_text-input" autocorrect="off" autocapitalize="off" spellTest="false" style="opacity: 0; left: -100px;" wrap="off"></textarea>-->
<!--<div id="result" class='viewerEditor'></div>-->
<button type="button" onclick="validateXML('#editor2','#hResult2');" class="btn btn-default">Validate</button>
<button type="button" onclick="clearEditorInput('#editor2')" class="btn btn-default">Clear</button>
<button type="button" id="copy-dynamic4" class="btn btn-default">Copy</button>
<button type="button" onclick="downloadXMLFile('#editor2');" class="btn btn-default">Download</button>
<button id="sample2Std" type="button" onclick="getSampleData('#editor2')" class="btn btn-default">Sample</button>
<button id="sample2SG" type="button" onclick="getSampleData('#editor2SG')" class="btn btn-default">Sample</button>
<div class="dropdown dropdown-bubble">
<button id="dLabel3" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-default">
Inbound
<span class="caret"></span>
</button>
<span class="dropdown-menu" aria-labelledby="dLabel">
<xmp><?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:template match="/">
<CALL>
<Calls.CustCallID><xsl:value-of select="//u_external_ref"/></Calls.CustCallID>
<Priorities.ShortName><xsl:value-of select="//u_priority"/></Priorities.ShortName>
<CallStates.ShortName><xsl:value-of select="//u_state"/></CallStates.ShortName>
<Calls.Caller.PIN><xsl:value-of select="//sys_id"/></Calls.Caller.PIN>
<Calls.MainComponent><xsl:value-of select="//u_cmdb_ci"/></Calls.MainComponent>
<Calls.ShortDescription><xsl:value-of select="//u_short_description"/></Calls.ShortDescription>
<Calls.Description><xsl:value-of select="//u_description"/></Calls.Description>
<Calls.Remarks><xsl:value-of select="//u_work_notes"/></Calls.Remarks>
<Calls.Solution><xsl:value-of select="//u_close_notes"/></Calls.Solution>
</CALL>
</xsl:template>
</xsl:stylesheet></xmp>
</span>
</div>
<div class="dropdown dropdown-bubble">
<button id="dLabel4" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-default">
Outbound
<span class="caret"></span>
</button>
<span class="dropdown-menu" aria-labelledby="dLabel">
<xmp><?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:template match="/">
<root>
<SDHttpMessage>
<!-- Protocol headers / SOAPAction could be necessary (Actions visible from WSDL in SoapUI) -->
<Headers>
<SOAPAction>open</SOAPAction>
<Parameter name="Content-type">text/xml;charset=UTF-8</Parameter>
</Headers>
<!-- End Protocol headers -->
<Message>
<!-- Message going to be sent out to the customer or provider -->
<u_external_ref><xsl:value-of select="/SD.call/SPCallID"/></u_external_ref>
<u_state><xsl:value-of select="/SD.call/CallStates/ShortName"/></u_state>
<u_priority><xsl:value-of select="/SD.call/PrioritiesTO/ShortName"/></u_priority>
<u_cmdb_ci><xsl:value-of select="/SD.call/MainComponent"/></u_cmdb_ci>
<u_short_description><xsl:value-of select="/SD.call/ShortDescription"/></u_short_description>
<u_description><xsl:value-of select="/SD.call/Remarks"/></u_description>
<u_work_notes><xsl:value-of select="/SD.call/Remarks"/></u_work_notes>
<u_requested_for><xsl:value-of select="/SD.Call/CallerEmail"/></u_requested_for>
<u_company>test</u_company>
<u_caller_id>test</u_caller_id>
<u_close_code>closeid</u_close_code>
<u_close_notes>closed</u_close_notes>
<!-- End Message going to be sent out to the customer or provider -->
</Message>
</SDHttpMessage>
</root>
</xsl:template>
</xsl:stylesheet></xmp>
</span>
</div>
<pre id="hResult2" class="success" style="display: block;">Valid XML</pre>

<br /> <br />

</div>


<div class="col-sm-12 col-md-4 col-lg-4">
<b>Result</b><br />
<textarea name="RESULT" class="hide"><?php echo $string; ?><?php echo $string2; ?></textarea>


<div ng-controller="MainCtrl">
<div id="editor6" class="form-control" style="min-height:10em"
name="json"
ng-model="initial"
ui-ace="{mode:'javascript'}"
ui-jq="resizable" ui-options="{resize:$boundDigest}"
valid-json
></div>
</div>


<!--<textarea id="editor6" class="ace_text-input" autocorrect="off" autocapitalize="off" spellTest="false" style="opacity: 0; left: -100px;" wrap="off"></textarea>-->
<div id="result" class='viewerEditor hidden'></div>
<button type="submit" name="submit" class="btn btn-default">Run transformation</button>
<button type="button" onclick="validateXML('#editor6','#hResult6');" class="btn btn-default">Validate</button>
<button type="button" onclick="clearEditorInput('#editor6')" class="btn btn-default">Clear</button>
<button type="button" id="copy-dynamic" class="btn btn-default">Copy</button>
<button type="button" onclick="downloadXMLFile('#editor6');" class="btn btn-default">Download</button>
<pre id="hResult6" class="success" style="display: block;">Valid XML</pre>
<br /> <br />

<!-- end bootstrap class --></div>

<!--
<b>Errors:</b> <br />

<textarea name="ERROR" class="hide"><?php echo $string2; ?></textarea>

<div ng-controller="MainCtrl">
<div id="errors" class="form-control" style="min-height:10em"
name="json"
ng-model="initial"
ui-ace="{mode:'javascript'}"
ui-jq="resizable" ui-options="{resize:$boundDigest}"
valid-json
></div>
</div>

<button type="button" id="copy-dynamic2" class="btn btn-default">Copy</button>

<br /> <br />-->



</div>
<div class="row">


<div id="goldenxml" class="col-sm-12 col-md-4 col-lg-4">

<b>GoldenXML</b> <span class="tagline">GoldenXML.xml</span><br />
<textarea name="GOLDENXML" class="hide"><?php echo $string6; ?></textarea>

<div ng-controller="MainCtrl">
<div id="editor4" class="form-control" style="min-height:10em"
name="json"
ng-model="initial"
ui-ace="{mode:'javascript'}"
ui-jq="resizable" ui-options="{resize:$boundDigest}"
valid-json
></div>
</div>


<!--<textarea id="editor4" class="ace_text-input" autocorrect="off" autocapitalize="off" spellTest="false" style="opacity: 0; left: -100px;" wrap="off"></textarea>-->
<!--<div id="result" class='viewerEditor'></div>-->
<button type="button" onclick="validateXML('#editor4','#hResult4');" class="btn btn-default">Validate</button>
<button type="button" onclick="clearEditorInput('#editor4')" class="btn btn-default">Clear</button>
<button type="button" id="copy-dynamic6" class="btn btn-default">Copy</button>
<button type="button" onclick="downloadXMLFile('#editor4');" class="btn btn-default">Download</button>
<button id="sample2" type="button" onclick="getSampleData('#editor4')" class="btn btn-default">Sample</button>
<div class="dropdown dropdown-bubble">
<button id="dLabel6" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-default">
Sample
<span class="caret"></span>
</button>
<span class="dropdown-menu" aria-labelledby="dLabel">
<xmp><?xml version="1.0" encoding="UTF-8"?>
<SD.call>
<objID>000101</objID>
<ID>0001</ID>
<Calls.CustCallID>CUSTINC01</Calls.CustCallID>
<SPCallID>PROVINC01</SPCallID>
<Priorities.ShortName>3</Priorities.ShortName>
<CallStates.ShortName>1</CallStates.ShortName>
<Calls.Caller.PIN>TEST01</Calls.Caller.PIN>
<Calls.MainComponent>item01</Calls.MainComponent>
<Calls.ShortDescription>test Sample short description</Calls.ShortDescription>
<Calls.Description>test Sample description</Calls.Description>
<Calls.Remarks>note test</Calls.Remarks>
<Calls.Solution>close test</Calls.Solution>
<!-- Used for any field btw SD.core (10 allowed) -->
<SysSpecField1></SysSpecField1>
<SysSpecField10></SysSpecField10>
<!-- End Used for any field btw SD.core -->
<!-- Used for any field in a single SD.core (100 allowed) -->
<Field1></Field1>
<Field100></Field100>
<!-- End Used for any field in a single SD.core -->
<!-- CallHistory allows us to check past actions -->
<CallHistory NR="1">
<CustCallID>CUSTINC01</CustCallID>
<CallStatesCUS><ShortName>1</ShortName></CallStatesCUS>
<CallStatesSPR><ShortName>New</ShortName></CallStatesSPR>
<Remarks>test remark history</Remarks>
<!-- BPRoles allows us to check who created the ticket -->
<BPRoles><ShortName>SP</ShortName></BPRoles>
</CallHistory>
<CallHistory NR="2">
<CustCallID>CUSTINC01</CustCallID>
<CallStatesCUS><ShortName>1</ShortName></CallStatesCUS>
<CallStatesSPR><ShortName>New</ShortName></CallStatesSPR>
<Remarks>test remark history</Remarks>
<!-- BPRoles allows us to check who created the ticket -->
<BPRoles><ShortName>SP</ShortName></BPRoles>
</CallHistory>
<!-- End CallHistory allows us to check past actions -->
</SD.call></xmp>
</span>
</div>
<pre id="hResult4" class="success" style="display: block;">Valid XML</pre>

<br /> <br />

</div>



<div id="postprocessingtemp" class="col-sm-12 col-md-4 col-lg-4">

<b>Template for PostProcessing</b> <span class="tagline">PostProcessingTemplate.xslt</span><br />
<textarea name="POSTPROCESSING_TEMP" class="hide"><?php echo $string5; ?></textarea>

<div ng-controller="MainCtrl">
<div id="editor3" class="form-control" style="min-height:10em"
name="json"
ng-model="initial"
ui-ace="{mode:'javascript'}"
ui-jq="resizable" ui-options="{resize:$boundDigest}"
valid-json
></div>
</div>


<!--<textarea id="editor3" class="ace_text-input" autocorrect="off" autocapitalize="off" spellTest="false" style="opacity: 0; left: -100px;" wrap="off"></textarea>-->
<!--<div id="result" class='viewerEditor'></div>-->
<button type="button" onclick="validateXML('#editor3','#hResult3');" class="btn btn-default">Validate</button>
<button type="button" onclick="clearEditorInput('#editor3')" class="btn btn-default">Clear</button>
<button type="button" id="copy-dynamic5" class="btn btn-default">Copy</button>
<button type="button" onclick="downloadXMLFile('#editor3');" class="btn btn-default">Download</button>
<button id="sample" type="button" onclick="getSampleData('#editor3')" class="btn btn-default">Sample</button>
<div class="dropdown dropdown-bubble">
<button id="dLabel5" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-default">
Sample
<span class="caret"></span>
</button>
<span class="dropdown-menu" aria-labelledby="dLabel">
<xmp><?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:template match="/CALL">
<CALL>
<xsl:copy-of select="InboundMessage/*" />
<xsl:choose>
<xsl:when test="InboundMessage/Ownership = &apos;internal&apos;">
<Calls.Ownership>Customer</Calls.Ownership>
</xsl:when>
<xsl:when test="SD.call/Ownership = &apos;Customer&apos;">
<Calls.Ownership>Customer</Calls.Ownership>
</xsl:when>
<xsl:otherwise>
<Calls.Ownership>Provider</Calls.Ownership>
</xsl:otherwise>
</xsl:choose>
</CALL>
</xsl:template>
</xsl:stylesheet></xmp>
</span>
</div>
<pre id="hResult3" class="success" style="display: block;">Valid XML</pre>

<br /> <br />

</div>








<div id="postprocessingview" class="col-sm-12 col-md-4 col-lg-4">

<b>PP View before applying Template</b> <span class="tagline">PostProcessingPayload.xml</span><br />
<textarea name="POSTPROCESSING_VIEW" class="hide"><?php echo $string7; ?></textarea>

<div ng-controller="MainCtrl">
<div id="editor5" class="form-control" style="min-height:10em"
name="json"
ng-model="initial"
ui-ace="{mode:'javascript'}"
ui-jq="resizable" ui-options="{resize:$boundDigest}"
valid-json
></div>
</div>


<!--<textarea id="editor5" class="ace_text-input" autocorrect="off" autocapitalize="off" spellTest="false" style="opacity: 0; left: -100px;" wrap="off"></textarea>-->
<!--<div id="result" class='viewerEditor'></div>-->
<button type="button" onclick="validateXML('#editor5','#hResult5');" class="btn btn-default">Validate</button>
<button type="button" onclick="clearEditorInput('#editor5')" class="btn btn-default">Clear</button>
<button type="button" id="copy-dynamic7" class="btn btn-default">Copy</button>
<button type="button" onclick="downloadXMLFile('#editor5');" class="btn btn-default">Download</button>
<pre id="hResult5" class="success" style="display: block;">Valid XML</pre>
<br /> <br />
<br />



</div>
</div>
<hr class="intro-divider">
<div class="row">
<h3>Compare & Merge</h3>
<div class="col-sm-12 col-md-12 col-lg-12">
<div class="acediff" style="min-height:10em"></div>
</div>
</div>

<div class="row">

<br /><br /><hr class="intro-divider">

<h2>Validators</h2>

<div ng-controller="MainCtrl">

<form class="form" name="form">

</form>

</div>


<div ng-controller="MainCtrl" style="margin-top: -25px;">

<form class="form" name="form">

<div class="col-sm-12 col-md-6 col-lg-6">
<div class="form-group" ng-class="{'has-error':form.json.$invalid, 'has-success':!form.code.$invalid}">

<label class="control-label">
JSON:
<ul class="validations" ng-show="form.json.$invalid">
<li ng-show="form.json.$error.validJson">invalid JSON</li>
</ul>
</label>

<div class="form-control" style="min-height:10em"
name="json"
ng-model="initial"
ui-ace="{mode:'javascript'}"
ui-jq="resizable" ui-options="{resize:$boundDigest}"
valid-json
></div>

</div>
</div>

<div class="col-sm-12 col-md-6 col-lg-6">
<div class="form-group" ng-class="{'has-error':form.script.$invalid, 'has-success':!form.script.$invalid}">

<label class="control-label">
Script:
<ul class="validations" ng-show="form.script.$invalid">
<li ng-show="form.script.$error.validScript">invalid script</li>
</ul>
</label>

<div class="form-control" style="min-height:10em"
name="script"
ng-model="initial"
ui-ace="{mode:'javascript'}"
ui-jq="resizable" ui-options="{resize:$boundDigest}"
valid-script
></div>


</div>

</div>
</form>

</div>
</div>

<script>
var differ = new AceDiff({
                         element: '.acediff',
                         left: {
                         content: 'your first file content here',
                         },
                         right: {
                         content: 'your second file content here',
                         },
                         });
</script>

</body>
</html>

