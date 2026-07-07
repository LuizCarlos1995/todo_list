param(
  [string]$ServiceName = "lm-taskmanager-frontend",
  [string]$FrontendDir = "E:\03 - PROJETOS PARA PRATICAR\Task-manager\frontend",
  [string]$CaddyExe = "C:\tools\caddy\caddy.exe", # <-- AJUSTE AQUI
  [string]$NssmExe = "C:\tools\nssm\win64\nssm.exe"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $NssmExe)) {
  throw "NSSM nao encontrado em: $NssmExe"
}

if (-not (Test-Path $CaddyExe)) {
  throw "Caddy nao encontrado em: $CaddyExe"
}

$Caddyfile = Join-Path $FrontendDir "Caddyfile"
if (-not (Test-Path $Caddyfile)) {
  throw "Caddyfile nao encontrado em: $Caddyfile"
}

$LogDir = Join-Path $FrontendDir "logs"
if (-not (Test-Path $LogDir)) {
  New-Item -ItemType Directory -Path $LogDir | Out-Null
}

& $NssmExe install $ServiceName $CaddyExe
# Passa os parametros para o caddy rodar
& $NssmExe set $ServiceName AppParameters "run --config Caddyfile"
# Define o diretorio de trabalho (crucial para o ./dist funcionar)
& $NssmExe set $ServiceName AppDirectory $FrontendDir
& $NssmExe set $ServiceName DisplayName "LM - Task Manager (Frontend) (Caddy)"
& $NssmExe set $ServiceName Description "Servidor de arquivos estaticos e proxy do Task Manager"
& $NssmExe set $ServiceName Start SERVICE_AUTO_START

# Configura os logs
& $NssmExe set $ServiceName AppStdout (Join-Path $LogDir "frontend-stdout.log")
& $NssmExe set $ServiceName AppStderr (Join-Path $LogDir "frontend-stderr.log")
& $NssmExe set $ServiceName AppRotateFiles 1
& $NssmExe set $ServiceName AppRotateOnline 1
& $NssmExe set $ServiceName AppRotateBytes 10485760
& $NssmExe set $ServiceName AppExit Default Restart

Write-Host "Servico instalado: $ServiceName"
Write-Host "Inicie com: nssm start $ServiceName"