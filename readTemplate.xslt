<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes" />
	<xsl:variable name="Ticket_Type">
		<xsl:value-of select="//u_service_offering" />
	</xsl:variable>
	<xsl:template match="/">
		<CALL>
			<!-- Customer ID -->
			<Calls.CustCallID>
				<xsl:value-of select="//u_external_ref" />
			</Calls.CustCallID>
			<!-- State -->
			<CallStates.ShortName>
				<xsl:value-of select="//u_state" />
			</CallStates.ShortName>
			<Priorities.ShortName>
				<xsl:value-of select="//u_priority" />
			</Priorities.ShortName>
			<!-- Store sys_id as a required field -->
			<Calls.Caller.PIN>
				<xsl:value-of select="//sys_id" />
			</Calls.Caller.PIN>
			<!-- Device CI -->
			<Calls.MainComponent>
				<xsl:value-of select="//u_cmdb_ci" />
			</Calls.MainComponent>
			<!-- Ticket Notes / Worknotes -->
			<Calls.Remarks>
				<xsl:if test="//u_work_notes != ''">
					<xsl:value-of select="//u_work_notes" />
					<xsl:text></xsl:text>
				</xsl:if>
				<xsl:if test="//u_comments != ''">
					<xsl:value-of select="//u_comments" />
				</xsl:if>
			</Calls.Remarks>
			<!-- Ticket description -->
			<Calls.Description>
				<xsl:value-of select="//u_description" />
			</Calls.Description>
			<!-- Ticket short description -->
			<Calls.ShortDescription>
				<xsl:value-of select="//u_short_description"/>
			</Calls.ShortDescription>
			<!-- Solution code -->
			<Calls.Solution>
				<xsl:value-of select="//u_close_notes" />
			</Calls.Solution>
			<!-- Attachments -->
			<xsl:if test="//agent = 'AttachmentCreator'">
				<!-- Ricoh CallID -->
				<Calls.CustCallID>
					<xsl:value-of select="//number" />
				</Calls.CustCallID>
				<Attachments>
					<FileName>
						<xsl:value-of select="substring-before(//name, ':')" />
					</FileName>
					<DataBase64>
						<xsl:value-of select="//payload" />
					</DataBase64>
				</Attachments>
			</xsl:if>
		</CALL>
	</xsl:template>
</xsl:stylesheet>
