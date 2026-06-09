# SENAC PI 2026 — Sistema de Horas Complementares

Sistema web PWA para envio e validação de certificados de horas complementares dos cursos do SENAC.

## Funcionalidades

- **Aluno** — envia certificados (PDF/imagem), acompanha status, filtra por situação, visualiza arquivos enviados
- **Coordenador** — valida certificados com observação, visualiza arquivos, filtra por status
- **Admin** — gerencia usuários (cadastrar/excluir), busca de usuários, acompanha totais do sistema
- **Login com seletor de perfil** — aluno, coordenador ou administrador
- **PWA** — instalável no celular/desktop, funciona offline (telas em cache)
- **Toasts** — feedback visual em todas as ações
- **Visualizador de arquivos** — PDF e imagens abrem em modal diretamente no painel

## Estrutura do Projeto

```
/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── uploads/
│
└── frontend/
    ├── html/
    │   ├── login.html
    │   ├── certificados.html
    │   ├── enviar.html
    │   ├── coordenador.html
    │   └── admin.html
    ├── css/
    │   ├── global.css
    │   ├── login.css
    │   ├── certificados.css
    │   ├── enviar.css
    │   ├── coordenador.css
    │   └── admin.css
    ├── js/
    │   ├── login.js
    │   ├── certificados.js
    │   ├── enviar.js
    │   ├── coordenador.js
    │   └── admin.js
    ├── manifest.json
    └── sw.js
```

## Como Rodar

### Backend

```bash
cd backend
npm install
npm start
```

O servidor sobe em `http://localhost:3000`.

### Frontend

Abra `frontend/html/login.html` no navegador ou use o Live Server do VS Code.

## Usuários de Teste

| E-mail                  | Senha      | Perfil       |
|-------------------------|------------|--------------|
| aluno@senac.br          | senac123   | Aluno        |
| coordenador@senac.br    | coord123   | Coordenador  |
| admin@senac.br          | admin123   | Admin        |

## Rotas da API

| Método | Rota                        | Acesso              | Descrição                        |
|--------|-----------------------------|---------------------|----------------------------------|
| POST   | /login                      | Público             | Autenticar usuário               |
| GET    | /me                         | Autenticado         | Dados do usuário logado          |
| POST   | /certificados               | Aluno               | Enviar certificado               |
| GET    | /certificados               | Autenticado         | Listar certificados              |
| GET    | /certificados/:id/arquivo   | Autenticado         | Visualizar arquivo do certificado|
| PATCH  | /certificados/:id/status    | Coordenador / Admin | Aprovar ou reprovar              |
| GET    | /stats                      | Coordenador / Admin | Estatísticas gerais              |
| GET    | /usuarios                   | Admin               | Listar usuários                  |
| POST   | /usuarios                   | Admin               | Cadastrar usuário                |
| DELETE | /usuarios/:id               | Admin               | Excluir usuário                  |

## Tecnologias

- **Frontend:** HTML, CSS, JavaScript (Vanilla), PWA (Service Worker + Manifest)
- **Backend:** Node.js, Express, Multer
- **Armazenamento:** Em memória (adequado para demonstração do PI)

## Observações

- Os dados são armazenados em memória; reiniciar o servidor apaga os certificados enviados.
- O token é baseado em Base64 do e-mail — adequado para PI; em produção use JWT + bcrypt.
- O Service Worker faz cache das telas estáticas para uso offline.
