param(
  [string]$ServiceName = "task-manager-backend",
  [string]$NssmExe = "C:\tools\nssm\win64\nssm.exe"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $NssmExe)) {
  throw "NSSM nao encontrado em: $NssmExe"
}

& $NssmExe stop $ServiceName confirm
& $NssmExe remove $ServiceName confirm

Write-Host "Servico removido: $ServiceName"
