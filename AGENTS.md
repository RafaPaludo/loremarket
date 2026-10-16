# Instruções do projeto

## Visão geral

Loremarket é um catálogo de itens para um mercado de fantasia inspirado em D&D. A aplicação usa Nuxt 4, Vue, TypeScript, Nuxt UI, Tailwind CSS e Nuxt Content. O catálogo Open5e é uma fonte externa de dados.

Faça mudanças coerentes com a arquitetura existente e mantenha as instruções curtas e específicas. Consulte os arquivos relacionados à tarefa; não é necessário ler todo o repositório para cada alteração.

## Frontend

- O código da aplicação fica em `app/` (`srcDir` do Nuxt).
- Páginas ficam em `app/pages/` e compõem as features da página. Mantenha a página inicial como composição de componentes, sem concentrar nela regras de apresentação ou acesso a dados de cada feature.
- Componentes de produto ficam em `app/ui-features/<Feature>/`. Mantenha cada feature autocontida, com seus componentes, conteúdo Markdown e testes relevantes próximos dela.
- Use componentes Nuxt UI e suas props antes de criar CSS próprio. Para estilos adicionais, prefira classes Tailwind no template.
- Use `UPageGrid` para grids de cards quando adequado. O grid do mercado deve manter duas colunas em telas pequenas e quatro em telas grandes.
- Não invente dados ou imagens para substituir conteúdo ausente da API. Mostre um estado vazio ou placeholder apropriado.
- Tipos compartilhados entre cliente e servidor ficam em `shared/`; use o alias `~~/` para importar a partir da raiz do projeto. O alias `~/` aponta para `app/`.

## Conteúdo Markdown

- Mantenha o Markdown junto da feature que o utiliza, por exemplo `app/ui-features/MerchantHero/merchantHero.md`.
- Para conteúdo tipado pelo Nuxt Content, registre a collection e seu schema Zod em `content.config.ts`. Prefira collections com schema explícito para cada conjunto de conteúdo que a aplicação consome; não crie uma configuração genérica ou collections sem necessidade.
- Valide campos obrigatórios no schema para que componentes possam consumir os dados com tipos previsíveis.

## Backend

- O Nuxt registra arquivos em `server/api/` como rotas. Mantenha nessa pasta apenas handlers HTTP para evitar expor acidentalmente arquivos auxiliares como endpoints.
- Agrupe handlers por recurso e use a convenção de arquivos do Nuxt/Nitro. Exemplo: `server/api/items/index.get.ts` corresponde a `GET /api/items`.
- Lógica específica de um recurso fica em `server/features/<recurso>/`, junto por domínio: controller, schema, DTO e, quando necessário, repository. Exemplo: `server/features/items/`.
- O handler da API deve ser fino: ler dados do evento e encaminhá-los ao controller correspondente.
- O controller coordena a operação e chama a integração ou repository necessário. Mantenha regras de negócio fora do handler HTTP e da integração externa.
- Schemas Zod validam parâmetros de entrada e a forma da resposta pública. Valide também respostas de terceiros antes de usá-las.
- DTOs transformam modelos externos ou de persistência no formato apresentado pela API. Não misture essa transformação com os componentes Vue.
- Repositories são exclusivos para acesso a banco de dados. Não crie repository para encapsular chamadas HTTP externas.
- Integrações com terceiros ficam em `server/integrations/<provedor>/` e isolam configuração, chamadas de rede e validação do formato externo.
- Tarefas agendadas ficam em `server/cron/` e usam `defineCronHandler` quando houver uma rotina periódica real e o módulo correspondente estiver configurado.
- A leitura do catálogo em `GET /api/items` é pública por decisão do produto. Não adicione autenticação a essa rota. Para novas rotas, aplique a política de autenticação adequada à operação; operações de escrita não devem ser públicas por padrão.
- Segredos e configuração de servidor devem ficar no runtime config/env do servidor, nunca no bundle do cliente.

## Open5e e catálogo

- A comunicação com Open5e deve ocorrer no servidor pela integração em `server/integrations/open5e/`; o frontend chama a API interna do projeto.
- A URL base configurável da API é `runtimeConfig.open5eApiBaseUrl`, atualmente apontada para `https://api.open5e.com/v2`.
- O endpoint interno `/api/items` aceita `type` (`items` ou `magicitems`), `search`, `category`, `page` e `limit`. Preserve validação e limites ao ampliar a busca.
- A API externa não fornece imagem nos dados consumidos atualmente. Mantenha `imageSource` nulo e permita que o card use seu placeholder.
- Preço, raridade, categoria e fonte podem estar ausentes; represente isso explicitamente como nulo ou texto vazio conforme o schema, sem produzir `NaN`.

## Verificação

- Scripts disponíveis: `pnpm dev`, `pnpm lint`, `pnpm test`, `pnpm typecheck` e `pnpm build`.
- Execute verificações relevantes para a mudança. Para alterações de tipos ou contratos, use `pnpm typecheck`; para mudanças de comportamento cobertas por testes, rode os testes relacionados ou `pnpm test`.
- Não adicione dependências, testes ou infraestrutura sem necessidade para atender à tarefa. Ao concluir, informe quais verificações foram executadas e se alguma limitação impediu sua execução.
