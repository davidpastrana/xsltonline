<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes" />
	<xsl:template match="/">
		<CALL>
			<xsl:copy-of select="//InboundMessage/*" />
			<xsl:choose>
				<!-- Prevent adding the description inside Remarks - avoid SG standard functionality -->
				<xsl:when test="//InboundMessage/Calls.Remarks = '' and //SD.call/Description = //InboundMessage/Calls.Description">
					<Calls.Remarks>
						<xsl:text></xsl:text>
					</Calls.Remarks>
				</xsl:when>
				<!-- Inform customer priority change -->
				<xsl:when test="//InboundMessage/Priorities.ShortName != //SD.call/PrioritiesTO/ShortName">
					<Calls.Remarks>
						<xsl:text>Customer changed the ticket priority from </xsl:text>
						<xsl:value-of select="//SD.call/PrioritiesTO/ShortName" />
						<xsl:text> to </xsl:text>
						<xsl:value-of select="//InboundMessage/Priorities.ShortName" />
					</Calls.Remarks>
				</xsl:when>
				<!-- Inform customer description change -->
				<xsl:when test="//InboundMessage/Calls.Description != //SD.call/Description and //InboundMessage/Description != ''">
					<Calls.Remarks>
						<xsl:if test="//InboundMessage/Calls.Remarks != ''">
							<xsl:value-of select="//InboundMessage/Calls.Remarks" />
							<xsl:text></xsl:text>
						</xsl:if>
						<xsl:text>Customer changed the ticket description to "</xsl:text>
						<xsl:value-of select="//InboundMessage/Calls.Description" />
						<xsl:text>"</xsl:text>
					</Calls.Remarks>
				</xsl:when>
			</xsl:choose>
		</CALL>
	</xsl:template>
</xsl:stylesheet>
