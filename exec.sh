#!/bin/sh
# Date: 23052018
# Author: davirod3
# Info: Script for ServiceGrid - allows to debug XSLT and PostProcessing templates
# Requirements: xml headlines must be provided as appear in ServigeGrid, no empty lines must appear on the top of the files

# Inbound / Outbound XSLT transformation (2 arguments are required)
# Output file: output.xml

#create directory temp if it doesn't exist
[ -d ./temp ] || mkdir ./temp

if [ "$#" -eq 2 ]; then

cat $1 | sed 's/&amp;/\&/g; s/&lt;/\</g; s/&gt;/\>/g; s/&#39;/\'"'"'/g' > Template.xslt
cat $2 | sed 's/&amp;/\&/g; s/&lt;/\</g; s/&gt;/\>/g; s/&#39;/\'"'"'/g' > Payload.xml

#xsltproc Template.xslt Payload.xml
xsltproc Template.xslt Payload.xml > ./output.xml
#java -cp "/usr/local/Cellar/saxon//9.8.0.12/libexec/saxon9he.jar" net.sf.saxon.Transform -s:Payload.xml -xsl:Template.xslt -o:output.xml
#java -cp "/usr/local/Cellar/app-engine-java/1.9.64/libexec/lib/java-managetime/lib/jsp/xalan.jar" org.apache.xalan.xslt.Process -in Payload.xml -xsl Template.xslt -out output.xml

elif [ "$#" -ne 2 ] && [ "$#" -ne 4 ]; then
echo "
=======================================================================================================
illegal number of parameters!

Please execute as follows:
./exec.sh Template.xslt Payload.xml
./exec.sh Template.xslt(must be inbound) PostProcessingTemplate.xslt GoldeXML.xml Payload.xml
where:
        template.xsl can be either an inbound or outbound template
	inbbound_template.xslt is the inbound template
	pp_template.xslt is the postprocessing template
	goldenxml.xml is the stored data of the ticket inside ServicGrid
	payload.xml is the incoming request, or ServiceGrid goldenxml data when we use outbound template
========================================================================================================
"
# PostProcessing XSLT transformation (4 arguments are required)
# PP Formatted file: PostProcessingPayload.xml
# PP Output file: ppoutput.xml

elif [ "$#" -eq 4 ]; then

cat $1 | sed 's/&amp;/\&/g; s/&lt;/\</g; s/&gt;/\>/g; s/&#39;/\'"'"'/g' > Template.xslt
cat $2 | sed 's/&amp;/\&/g; s/&lt;/\</g; s/&gt;/\>/g; s/&#39;/\'"'"'/g' > PostProcessingTemplate.xslt
#cat $3 | sed 's/&amp;/\&/g; s/&lt;/\</g; s/&gt;/\>/g; s/&#39;/\'"'"'/g' > GoldeXML.xml
cat $4 | sed 's/&amp;/\&/g; s/&lt;/\</g; s/&gt;/\>/g; s/&#39;/\'"'"'/g' > Payload.xml

xsltproc Template.xslt Payload.xml > ./temp/temp_transformation.xml

echo "
<CALL>
    <InboundMessage>
" > PostProcessingPayload.xml

sed -i -e '1,2d' ./temp/temp_transformation.xml
sed -i -e '$ d' ./temp/temp_transformation.xml
cat ./temp/temp_transformation.xml >> PostProcessingPayload.xml

echo "</InboundMessage>" >> PostProcessingPayload.xml

cat $3 > ./temp/temp_goldenxml.xml

sed -i -e '/^[ \t]*$/d' ./temp/temp_goldenxml.xml
sed -i -e '1d' ./temp/temp_goldenxml.xml 

cat ./temp/temp_goldenxml.xml >> PostProcessingPayload.xml

echo "</CALL>" >> PostProcessingPayload.xml

#xsltproc PostProcessingTemplate.xslt PostProcessingPayload.xml
xsltproc PostProcessingTemplate.xslt PostProcessingPayload.xml > ./ppoutput.xml

fi

