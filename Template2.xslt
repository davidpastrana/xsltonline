<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:output method="xml" indent="yes" />
	<!-- Manually trigger the Assigned user from CMSP to HSBC through a note update -->
	<xsl:variable name="cmsp_assigned_user" select="substring-before(substring-after(//Remarks, saAssigned user: sa),sa sa)" />
	<xsl:variable name="cmsp_ticket_state">
		<xsl:value-of select="/SD.call/CallStatesSPR/Name" />
	</xsl:variable>
	<xsl:template match="/">
		<CALL>
			<xsl:if test="$cmsp_ticket_state != &apos;IM-Open&apos; and $cmsp_ticket_state != &apos;Open&apos; or /SD.call/CallHistory">
				<xsl:attribute name="Send">No</xsl:attribute>
				<xsl:attribute name="Reason">
					<xsl:text>Is not an open state!</xsl:text>
				</xsl:attribute>
			</xsl:if>
			<SDHttpMessage>
				<Headers>
					<Parameter name="Content-type">application/xml</Parameter>
				</Headers>
				<HttpMethod>POST</HttpMethod>
				<Charset>UTF-8</Charset>
				<UrlSuffix>extCreateIn</UrlSuffix>
				<Message>
					<ExtCreateInRequest xmlns="http://www.hsbc.com/gsd/rest/ExtCreateInRequest_v1.0.xsd" action="CreateRequest" function="CreateIn" genDateTZ="12345" version="1.0">
						<ApplicationID>CISCO</ApplicationID>
						<CreateInRequestDetail>
							<ReportedBy>System_CISCO_Integration</ReportedBy>
							<AffectedEndUserId>System_CISCO_Integration</AffectedEndUserId>
							<AutomationTemplate>CISCO_Group1</AutomationTemplate>
							<ExtRefId>CISCO-<xsl:value-of select="/SD.call/SPCallID" />
							</ExtRefId>
							<Impact>Medium</Impact>
							<Priority>
								<xsl:value-of select="/SD.call/PrioritiesTO/ShortName" />
							</Priority>
							<Summary>
								<xsl:value-of select="/SD.call/ShortDescription" />
							</Summary>
							<Description>
								<xsl:value-of select="/SD.call/Remarks" />
							</Description>
							<xsl:if test="string-length(/SD.call/MainComponent) > 0">
								<CIName>
									<xsl:value-of select="/SD.call/MainComponent" />
								</CIName>
								<KeyItem>
									<xsl:value-of select="/SD.call/MainComponent" />
								</KeyItem>
							</xsl:if>
							<xsl:if test="string-length(/SD.call/MainCompHostname) > 0">
								<CIClass>
									<xsl:value-of select="/SD.call/MainCompHostname" />
								</CIClass>
							</xsl:if>
							<!--<xsl:if test="string-length(/SD.call/MainCompLocationName) > 0"><IncidentArea><xsl:value-of select="/SD.call/MainCompLocationName" /></IncidentArea></xsl:if>-->
						</CreateInRequestDetail>
					</ExtCreateInRequest>
				</Message>
			</SDHttpMessage>
		</CALL>
	</xsl:template>
</xsl:stylesheet>
