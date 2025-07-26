# Algoritmo Humano - Frontend

Interface web para plataforma de cursos online.

## 🛠️ Tecnologias

- **Next.js 15** + **React 19** + **TypeScript**
- **TanStack Query** - Gerenciamento de estado e cache
- **React Hook Form + Zod** - Formulários com validação
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Estilização
- **Sentry** - Monitoramento de erros
- **Biome** - Linter/formatter

## 📱 Funcionalidades

### Páginas Públicas

- `/` - Lista de cursos ativos
- `/courses/[slug]` - Detalhes do curso
- `/sign-in` - Login
- `/sign-up` - Cadastro

### Páginas Privadas (autenticadas)

- `/gerenciar-cursos` - CRUD de cursos

## 🔑 Autenticação

- JWT armazenado em cookies httpOnly (nookies)
- Middleware protege rotas privadas
- Redirecionamento automático

## 🚀 Como executar

```bash
# Clone e instale
git clone <repo-url>
cd frontend
npm install

# Configure .env.local
NEXT_PUBLIC_API_URL=http://localhost:3333
NEXT_PUBLIC_BASE_URL=https://algoritmo-humano-backend.onrender.com

# Execute
npm run dev
```

## 📡 Principais recursos técnicos

- **TanStack Query** para cache e sincronização de dados
- **Zod** para validação de formulários em tempo real
- **Axios interceptors** para autenticação automática
- **Sentry** para monitoramento de erros em produção
- **Biome** para código consistente e formatado

## Scripts

- `npm run dev` - Desenvolvimento
- `npm run build` - Build de produção
- `npm run lint` - Linting com Biome

---