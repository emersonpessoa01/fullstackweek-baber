### Aula Zero

-   [x] Setup do banco
-   [x] Seeding do banco (colocar dados)
-   [x] Introdução ao Next.js
-   [x] Tailwind e Shadcn
-   [x] Git Hooks

<div>
  <h2>Aula 0: Setup do projeto</h2>
</div>
<a style="float:left" href="https://www.youtube.com/watch?v=XRMvPCfh2U0" target="_blank">
<img src="./app/image/setup.webp" width="100%">
</a>
<p>Nessa aula vamos fazer o setup inicial do projeto, planejar sua arquitetura e criar os primeiros componentes. Você vai aprender a forma correta de iniciar e planejar um novo projeto.</p>
<a href="https://www.youtube.com/watch?v=XRMvPCfh2U0">AULA DISPONÍVEL</a>
<br><br>
<div>
1. Primeiros passos

-   Gerar projeto Next.js

```
npx create-next-app@latest fullstackweek-baber --template typescript

```

-   Instalação do Prisma ORM usando o Postgresql como banco

```
npm install prisma --save-dev
```

-   Configurar automação de processos e gerenciamento de informações com o [prisma.io](https://www.prisma.io/docs/getting-started/quickstart)

```
npx prisma init --datasource-provider postgresql
```

-   Criar um projeto com o nome `FSW Barber` no Neon Console que é uma plataforma de gerenciamento de banco de dados SQL na nuvem
-   Copiar o `url` do projeto do Neon Console e colar dentro do arquivo de variável de ambiente `.env`

```
Ex:
DATABASE_URL="postgresql://neondb_owner:************@ep-fancy-feather-a5qe66i2.us-east-2.aws.neon.tech/neondb"
```

-   Importante adicionar o `.env` no `.gitignore`

-   Criar as tabelas dentro do arquivo `./prisma/schema.prisma`:

```
Root Directory
|
└── prisma
    |
    └── squema.prisma

```

```
//ESQUEMA PRISMA

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String    @id @default(uuid())
  email     String
  name      String
  bookings  Booking[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Barbershop {
  id          String              @id @default(uuid())
  name        String
  address     String
  phones      String[]
  description String
  imageUrl    String
  createdAt   DateTime            @default(now())
  updatedAt   DateTime            @updatedAt
  services    BarbershopService[]
}

model BarbershopService {
  id           String     @id @default(uuid())
  name         String
  description  String
  imageUrl     String
  price        Decimal    @db.Decimal(10, 2)
  barbershopId String
  barbershop   Barbershop @relation(fields: [barbershopId], references: [id])
  bookings     Booking[]
}

model Booking {
  id        String            @id @default(uuid())
  userId    String
  user      User              @relation(fields: [userId], references: [id])
  serviceId String
  service   BarbershopService @relation(fields: [serviceId], references: [id])
  date      DateTime
  createdAt DateTime          @default(now())
  updatedAt DateTime          @updatedAt
}
```

-   Aplicar as tabelas dentro da plataforma Neon Console

```
npx prisma migrate dev --name nome-do-banco
```

-   Criar o arquivo `seed.ts` dentro pasta prisma:
    `./prisma/seed.ts` a fim de copiar e colar o script fornecido pelo curso:

```
Root Directory
|
└── prisma
    |
    └── seed.ts

```

```
//SCRIPT SEED.TS
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const images = [
      "https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png",
      "https://utfs.io/f/45331760-899c-4b4b-910e-e00babb6ed81-16q.png",
      "https://utfs.io/f/5832df58-cfd7-4b3f-b102-42b7e150ced2-16r.png",
      "https://utfs.io/f/7e309eaa-d722-465b-b8b6-76217404a3d3-16s.png",
      "https://utfs.io/f/178da6b6-6f9a-424a-be9d-a2feb476eb36-16t.png",
      "https://utfs.io/f/2f9278ba-3975-4026-af46-64af78864494-16u.png",
      "https://utfs.io/f/988646ea-dcb6-4f47-8a03-8d4586b7bc21-16v.png",
      "https://utfs.io/f/60f24f5c-9ed3-40ba-8c92-0cd1dcd043f9-16w.png",
      "https://utfs.io/f/f64f1bd4-59ce-4ee3-972d-2399937eeafc-16x.png",
      "https://utfs.io/f/e995db6d-df96-4658-99f5-11132fd931e1-17j.png",
      "https://utfs.io/f/3bcf33fc-988a-462b-8b98-b811ee2bbd71-17k.png",
      "https://utfs.io/f/5788be0e-2307-4bb4-b603-d9dd237950a2-17l.png",
      "https://utfs.io/f/6b0888f8-b69f-4be7-a13b-52d1c0c9cab2-17m.png",
      "https://utfs.io/f/ef45effa-415e-416d-8c4a-3221923cd10f-17n.png",
      "https://utfs.io/f/ef45effa-415e-416d-8c4a-3221923cd10f-17n.png",
      "https://utfs.io/f/a55f0f39-31a0-4819-8796-538d68cc2a0f-17o.png",
      "https://utfs.io/f/5c89f046-80cd-4443-89df-211de62b7c2a-17p.png",
      "https://utfs.io/f/23d9c4f7-8bdb-40e1-99a5-f42271b7404a-17q.png",
      "https://utfs.io/f/9f0847c2-d0b8-4738-a673-34ac2b9506ec-17r.png",
      "https://utfs.io/f/07842cfb-7b30-4fdc-accc-719618dfa1f2-17s.png",
      "https://utfs.io/f/0522fdaf-0357-4213-8f52-1d83c3dcb6cd-18e.png",
    ];
    // Nomes criativos para as barbearias
    const creativeNames = [
      "Barbearia Vintage",
      "Corte & Estilo",
      "Barba & Navalha",
      "The Dapper Den",
      "Cabelo & Cia.",
      "Machado & Tesoura",
      "Barbearia Elegance",
      "Aparência Impecável",
      "Estilo Urbano",
      "Estilo Clássico",
    ];

    // Endereços fictícios para as barbearias
    const addresses = [
      "Rua da Barbearia, 123",
      "Avenida dos Cortes, 456",
      "Praça da Barba, 789",
      "Travessa da Navalha, 101",
      "Alameda dos Estilos, 202",
      "Estrada do Machado, 303",
      "Avenida Elegante, 404",
      "Praça da Aparência, 505",
      "Rua Urbana, 606",
      "Avenida Clássica, 707",
    ];

    const services = [
      {
        name: "Corte de Cabelo",
        description: "Estilo personalizado com as últimas tendências.",
        price: 60.0,
        imageUrl:
          "https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png",
      },
      {
        name: "Barba",
        description: "Modelagem completa para destacar sua masculinidade.",
        price: 40.0,
        imageUrl:
          "https://utfs.io/f/e6bdffb6-24a9-455b-aba3-903c2c2b5bde-1jo6tu.png",
      },
      {
        name: "Pézinho",
        description: "Acabamento perfeito para um visual renovado.",
        price: 35.0,
        imageUrl:
          "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
      },
      {
        name: "Sobrancelha",
        description: "Expressão acentuada com modelagem precisa.",
        price: 20.0,
        imageUrl:
          "https://utfs.io/f/2118f76e-89e4-43e6-87c9-8f157500c333-b0ps0b.png",
      },
      {
        name: "Massagem",
        description: "Relaxe com uma massagem revigorante.",
        price: 50.0,
        imageUrl:
          "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png",
      },
      {
        name: "Hidratação",
        description: "Hidratação profunda para cabelo e barba.",
        price: 25.0,
        imageUrl:
          "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
      },
    ];

    // Criar 10 barbearias com nomes e endereços fictícios
    const barbershops = [];
    for (let i = 0; i < 10; i++) {
      const name = creativeNames[i];
      const address = addresses[i];
      const imageUrl = images[i];

      const barbershop = await prisma.barbershop.create({
        data: {
          name,
          address,
          imageUrl: imageUrl,
          phones: ["(11) 99999-9999", "(11) 99999-9999"],
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac augue ullamcorper, pharetra orci mollis, auctor tellus. Phasellus pharetra erat ac libero efficitur tempus. Donec pretium convallis iaculis. Etiam eu felis sollicitudin, cursus mi vitae, iaculis magna. Nam non erat neque. In hac habitasse platea dictumst. Pellentesque molestie accumsan tellus id laoreet.",
        },
      });

      for (const service of services) {
        await prisma.barbershopService.create({
          data: {
            name: service.name,
            description: service.description,
            price: service.price,
            barbershop: {
              connect: {
                id: barbershop.id,
              },
            },
            imageUrl: service.imageUrl,
          },
        });
      }

      barbershops.push(barbershop);
    }

    // Fechar a conexão com o banco de dados
    await prisma.$disconnect();
  } catch (error) {
    console.error("Erro ao criar as barbearias:", error);
  }
}

seedDatabase();


```

-   Adicionar um script no `package.json` a fim popular o banco

```
"prisma": {
  "seed": "ts-node prisma/seed.ts"
},
```

-   Para executar o arquivo `seed.ts` em `typescript` deve instalar o `ts-node` como dependência de desenvolvimento

```
npm install -D ts-node
```

-   Para executar o script do `seed.ts`

```
npx prisma db seed
```

-   Verificar na pataforma Neon Console se as tabelas `Barbershop` e `BarbershopService` foram populadas
    <br><br><br>

## Instalações complementares

-   Criar um padrão a fim ordenar as classes do `tailwind`

    -   [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

```
npm install -D prettier prettier-plugin-tailwindcss

```

-   Criar o arquivo `.prettierrc.json` e adicionar os scripts:

```
// .prettierrc
{
  "plugins": ["prettier-plugin-tailwindcss"],
  "trailingComma": "es5", //adiciona vírgula após da propriedade do objeto
  "tabWidth": 4, //espaçamendo da tabulação
  "semi": true, //ponto e vírgula no final da linha
  "singleQuote": false, //aspas simples
  "printWidth": 80 //largura da tela do vscode
}
```

-   Instalação do [ShadCN UI](https://ui.shadcn.com/docs/installation/next) que é uma biblioteca de componentes de interface de usuário (UI) baseada em Tailwind CSS e Radix UI
    -   Durante a instalação marque tudo como default

```
npx shadcn-ui@latest init

```

-   Após a instalaçao do `shadcn ui` é gerada duas pastas: `componentes` e `lib`
    -   Renomeie as pastas com `underline` na frente dos nomes para tornar as pastas privadas com o intuito de serem ignoradas pelo sistema de rotas do `NEXTJS`

```
Root Directory
|
└── app
    |
    └── _componentes
    |
    └── _lib
```

-   Atualizar o caminho dessas pastas no `components.json`

```
"aliases": {
    "components": "@/app/_components",
    "utils": "@/app/_lib/utils"
  }
```

-   Instalação do primeiro componente(button) do [shadcn ui](https://ui.shadcn.com/docs/components/button)

```
npx shadcn-ui@latest add button

```

-   Copiar e colar as configurações globais do global.css do `./app/globais.css` fornecido pelo curso:

```
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  .dark {
    --background: 225 9% 9%;
    --foreground: 210 40% 98%;

    --card: 228 9% 11%;
    --card-foreground: 210 40% 98%;

    --popover: 228 9% 11%;
    --popover-foreground: 210 40% 98%;

    --primary: 252 100% 69%;
    --primary-foreground: 0 0% 100%;

    --secondary: 228 6% 16%;
    --secondary-foreground: 210 40% 98%;

    --muted: 228 6% 16%;
    --muted-foreground: 215 20.2% 65.1%;

    --accent: 228 6% 16%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 210 40% 98%;

    --border: 228 6% 16%;
    --input: 228 6% 16%;
    --ring: 212.7 26.8% 83.9%;

    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

```

-   Instalação do [Git Hooks Husky](https://typicode.github.io/husky/get-started.html) com `lintstaged`
    -   Git Hooks são scripts que o Git executa automaticamente antes ou depois de certos eventos, como commits, pushs e merges. Eles permitem que você personalize o comportamento do Git e automatize tarefas relacionadas ao fluxo de trabalho do desenvolvimento.
        <br><br>
    ```
    npm i -D husky lint-staged
    npx husky init
    ```
-   Após a instalação do `husky`. Será gerado uma pasta `./husky` com arquivo`pre-commit`. Dentro do`pre-commit` adicione o script:

```
npx lint-staged
```

-   Criar um arquivo `.lintstagedrd.json` e adicione o seguinte código:

```
{
    "*.ts?(x)": ["eslint --fix", "prettier --write"]
}
```

Realizar a configuração o `eslintrc.json`:

```
{
  "extends": "next/core-web-vitals",
  "rules": {
    "no-unused-vars": "error"
  }
}
```

-   Instalação do [git-commit-msg-linter](https://www.npmjs.com/package/git-commit-msg-linter) é uma ferramenta utilizada para garantir que as mensagens de commit em um repositório Git sigam um padrão específico. Essa prática ajuda a manter um histórico de commits claro e consistente, o que é especialmente útil em projetos colaborativos. Aqui estão algumas informações sobre o git-commit-msg-linter:

    1. Objetivo: O principal objetivo do git-commit-msg-linter é validar as mensagens de commit para garantir que elas sigam um formato pré-definido, como o [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), que facilita a leitura e a automação de processos baseados no histórico de commits.

    2. Conventional Commits: Um dos formatos comuns que podem ser validados pelo git-commit-msg-linter é o Conventional Commits, que segue a estrutura:

```
  npm install -D git-commit-msg-linter
```
* Criar arquivo `commit-msg` dentro de `./husky` e cola esse código:
```
  .git/hooks/commit-msg $1
```