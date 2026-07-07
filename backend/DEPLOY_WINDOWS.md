Aqui está o conteúdo do arquivo `DEPLOY_WINDOWS.md` completamente atualizado e revisado. Ele já inclui a nova padronização de nomes com o prefixo `LM`, a resolução dos problemas com espaços nos caminhos do Windows, a liberação da porta 80 e a configuração do domínio customizado no arquivo `hosts`.

Você pode copiar o bloco abaixo e substituir integralmente o conteúdo do seu arquivo atual em `backend/DEPLOY_WINDOWS.md`:

```markdown
# Deploy no Windows (Local) - Task Manager

Este guia cobre a configuração completa da aplicação Task Manager para rodar como serviços nativos em segundo plano no Windows (sem necessidade de manter terminais abertos), utilizando um domínio local customizado.

## 1) Pré-requisitos (Uma única vez)

- **Node.js**: Versão LTS instalada.
- **NSSM (Non-Sucking Service Manager)**: Instalado e extraído (ex: `C:\tools\nssm\win64\nssm.exe`).
- **Caddy**: Executável baixado e adicionado ao PATH do sistema ou em um diretório conhecido.

---

## 2) Configuração do Domínio Local (`hosts`)

Para acessar a aplicação via URL customizada em vez de `localhost`, o arquivo de hosts do Windows deve ser configurado:

1. Abra o **Bloco de Notas como Administrador**.
2. Abra o arquivo: `C:\Windows\System32\drivers\etc\hosts`
3. Adicione a seguinte linha ao final do arquivo e salve:
   ```text
   127.0.0.1    taskmanager.com.br

```

---

## 3) Ajustes de Ambiente e Configurações

### A) Backend (`backend/.env`)

Certifique-se de que as variáveis de origem e do Swagger apontem para o novo domínio (sem especificar a porta 5001 no Swagger, pois o tráfego passará pelo proxy do Caddy na porta 80):

```env
PORT=5001
ALLOWED_ORIGIN=[http://taskmanager.com.br](http://taskmanager.com.br)

# Swagger
SWAGGER_HOST=taskmanager.com.br
SWAGGER_SCHEME=http

# Configurações do Banco de Dados
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
DB_PORT=3306

```

### B) Frontend (`frontend/Caddyfile`)

Configure o arquivo do Caddy para escutar no domínio configurado e realizar o proxy reverso para as rotas da API:

```text
[http://taskmanager.com.br](http://taskmanager.com.br) {
  encode gzip zstd

  root * ./dist
  file_server

  @api path /api* /api-docs*
  reverse_proxy @api localhost:5001
}

```

---

## 4) Builds da Aplicação

Abra um terminal PowerShell normal e execute os comandos de build para gerar os arquivos de produção.

### Backend

```powershell
Set-Location "E:\03 - PROJETOS PARA PRATICAR\Task-manager\backend"
npm install
npm run build

```

### Frontend

```powershell
Set-Location "E:\03 - PROJETOS PARA PRATICAR\Task-manager\frontend"
npm install
npm run build

```

*Certifique-se de que a pasta `frontend/dist` foi gerada com sucesso.*

---

## 5) Instalação dos Serviços do Windows

> ⚠️ **IMPORTANTE:** Todos os comandos desta seção devem ser executados em uma janela do **PowerShell aberta como Administrador**.

### A) Serviço do Backend (`LM-TaskManager-Backend`)

O script de instalação utiliza caminhos relativos para o ponto de entrada (`dist\server.js`) combinado com o `AppDirectory` para evitar falhas de leitura do Node.js caso a pasta do projeto possua espaços no nome.

**Script:** `backend/scripts/windows/install-backend-service.ps1`

```powershell
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

& $NssmExe install $ServiceName $NodeExe
& $NssmExe set $ServiceName AppDirectory $BackendDir
& $NssmExe set $ServiceName AppParameters "dist\server.js"
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

```

**Execução no PowerShell (Admin):**

```powershell
Set-Location "E:\03 - PROJETOS PARA PRATICAR\Task-manager\backend"
.\scripts\windows\install-backend-service.ps1
C:\tools\nssm\win64\nssm.exe start LM-TaskManager-Backend

```

### B) Serviço do Frontend (`LM-TaskManager-Frontend`)

Este serviço gerencia o Caddy em segundo plano, garantindo que o diretório de trabalho seja definido na pasta raiz do frontend para que a pasta relativa `./dist` seja localizada corretamente.

**Script:** `frontend/scripts/windows/install-frontend-service.ps1`

```powershell
param(
  [string]$ServiceName = "LM-TaskManager-Frontend",
  [string]$FrontendDir = "E:\03 - PROJETOS PARA PRATICAR\Task-manager\frontend",
  [string]$CaddyExe = "C:\caminho\para\o\seu\caddy.exe", # Ajuste para o seu PATH real
  [string]$NssmExe = "C:\tools\nssm\win64\nssm.exe"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $NssmExe)) { throw "NSSM nao encontrado em: $NssmExe" }
if (-not (Test-Path $CaddyExe)) { throw "Caddy nao encontrado em: $CaddyExe" }

$LogDir = Join-Path $FrontendDir "logs"
if (-not (Test-Path $LogDir)) { New-Item -ItemType Directory -Path $LogDir | Out-Null }

& $NssmExe install $ServiceName $CaddyExe
& $NssmExe set $ServiceName AppDirectory $FrontendDir
& $NssmExe set $ServiceName AppParameters "run --config Caddyfile"
& $NssmExe set $ServiceName DisplayName "LM - Task Manager (Frontend)"
& $NssmExe set $ServiceName Description "Servidor de arquivos estaticos e proxy do Task Manager"
& $NssmExe set $ServiceName Start SERVICE_AUTO_START
& $NssmExe set $ServiceName AppStdout (Join-Path $LogDir "frontend-stdout.log")
& $NssmExe set $ServiceName AppStderr (Join-Path $LogDir "frontend-stderr.log")
& $NssmExe set $ServiceName AppRotateFiles 1
& $NssmExe set $ServiceName AppRotateOnline 1
& $NssmExe set $ServiceName AppRotateBytes 10485760
& $NssmExe set $ServiceName AppExit Default Restart

Write-Host "Servico instalado com sucesso: $ServiceName"

```

**Execução no PowerShell (Admin):**

```powershell
Set-Location "E:\03 - PROJETOS PARA PRATICAR\Task-manager\frontend"
.\scripts\windows\install-frontend-service.ps1
C:\tools\nssm\win64\nssm.exe start LM-TaskManager-Frontend

```

---

## 6) Links de Acesso após a Instalação

Com os serviços ativos, a aplicação passa a responder de forma global nos seguintes endereços:

* **Aplicação Completa (Frontend):** `http://taskmanager.com.br`
* **Documentação da API (Swagger via Proxy):** `http://taskmanager.com.br/api-docs`

---

## 7) Resolução de Problemas Comuns

### Erro de Conflito de Porta (Erro de `bind` na porta 80 do Caddy)

Se o log do frontend (`frontend/logs/frontend-stderr.log`) indicar que a porta 80 já está em uso, o culpado mais provável é o serviço de publicação web nativo do Windows (IIS/W3SVC).

Para liberar a porta 80, execute no PowerShell (Admin):

```powershell
# Interrompe o serviço imediatamente
Stop-Service -Name W3SVC -Force

# Configura o serviço para não iniciar automaticamente com o Windows
Set-Service -Name W3SVC -StartupType Manual

# Reinicie o serviço do Frontend
C:\tools\nssm\win64\nssm.exe restart LM-TaskManager-Frontend

```

### Gerenciamento Rápido dos Serviços (Comandos Úteis)

Caso precise parar, iniciar ou verificar o status dos serviços criados:

```powershell
# Verificar Status
C:\tools\nssm\win64\nssm.exe status LM-TaskManager-Backend
C:\tools\nssm\win64\nssm.exe status LM-TaskManager-Frontend

# Reiniciar
C:\tools\nssm\win64\nssm.exe restart LM-TaskManager-Backend
C:\tools\nssm\win64\nssm.exe restart LM-TaskManager-Frontend

```

```

Esse documento agora serve como uma referência perfeita de arquitetura de deploy local para este e para os seus próximos projetos!

```