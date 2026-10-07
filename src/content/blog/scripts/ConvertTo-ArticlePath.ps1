<#
.SYNOPSIS
    ConvertTo-ArticlePath
    Created by: Samuel Young
.DESCRIPTION
    EXTREMELY simple way to convert article titles into file names for paths.
.PARAMETER Name
    Enter the full article name, and the script will digest it and spit it back out in all lowercase and with dashes instead of spaces.
#>

param (
    [string]$Name
)

$Name = $Name.ToLower()
$Output = $Name -replace ' ', '-'
return "`n$Output`n"