param(
  [string]$ServiceName = "LM-TaskManager-Backend",
  [string]$BackendDir = "E:\03 - PROJETOS PARA PRATICAR\Task-manager\backend",
  [string]$NodeExe = "C:\Program Files\nodejs\node.exe",
  [string]$NssmExe = "C:\tools\nssm\win64\nssm.exe"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $NssmExe)) { throw "NSSM nao encontrado em: $NssmExe" }
if (-not (Test-Path $NodeExe)) { throw "Node nao encontrado em: $NodeExe" }

$LogDir = Join-Path $BackendDir "logs"
if (-not (Test-Path $LogDir)) { New-Item -ItemType Directory -Path $LogDir | Out-Null }

# 1. Instala o serviço apontando EXCLUSIVAMENTE para o executável do Node
& $NssmExe install $ServiceName $NodeExe

# 2. Define a pasta base (O NSSM lida perfeitamente com os espaços aqui)
& $NssmExe set $ServiceName AppDirectory $BackendDir

# 3. Passa apenas o caminho relativo! (Sem espaços = Sem dor de cabeça)
& $NssmExe set $ServiceName AppParameters "dist\server.js"

# Configurações visuais e de log
& $NssmExe set $ServiceName DisplayName "LM - Task Manager (Backend)"
& $NssmExe set $ServiceName Description "API backend do Task Manager"
& $NssmExe set $ServiceName Start SERVICE_AUTO_START
& $NssmExe set $ServiceName AppStdout (Join-Path $LogDir "backend-stdout.log")
& $NssmExe set $ServiceName AppStderr (Join-Path $LogDir "backend-stderr.log")
& $NssmExe set $ServiceName AppRotateFiles 1
& $NssmExe set $ServiceName AppRotateOnline 1
& $NssmExe set $ServiceName AppRotateBytes 10485760
& $NssmExe set $ServiceName AppExit Default Restart

Write-Host "Servico instalado com sucesso: $ServiceName"