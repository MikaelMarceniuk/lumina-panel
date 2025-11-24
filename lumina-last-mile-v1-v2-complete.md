# Lumina Panel --- Transformação em Sistema Last‑Mile (Versão Atual)

Este documento descreve **exatamente** a versão atual do Lumina Panel
adaptada para o nicho de entregas last‑mile, considerando tudo que
definimos nesta conversa.\
Serve como **guia técnico**, **escopo**, **entidades**, **telas**,
**arquitetura** e **roadmap** para implementação da V1 (MVP) e V2
(Bônus).

------------------------------------------------------------------------

# 1. Objetivo do Produto

Transformar o Lumina Panel em um sistema last‑mile para pequenas e
médias operações que possuem entregadores próprios.\
O foco é permitir:

-   Gestão de lojas\
-   Gestão de entregadores\
-   Gestão de entregas com fluxo operacional\
-   Painel do dia com visão operacional\
-   Portal do entregador (mobile-first)

------------------------------------------------------------------------

# 2. Reestruturação do Lumina Panel Atual

A versão **atual** do Lumina contém: - Autenticação - CRUD de Clientes -
CRUD de Pedidos - CRUD de Produtos - Dashboard React + Vite - Backend
NestJS - PostgreSQL

## Nova estrutura last‑mile

### **Clientes → Lojas**

Aproveitado, renomeado e ajustado.

**Campos sugeridos:** - id\
- nome\
- responsavel\
- telefone\
- endereco\
- horario_funcionamento (opcional)\
- created_at\
- updated_at

------------------------------------------------------------------------

### **Pedidos → Entregas**

O módulo mais importante da transformação.

**Campos essenciais:** - id\
- loja_id (FK)\
- entregador_id (FK, nullable até ser atribuído)\
- destinatario\
- telefone_destinatario\
- endereco_entrega\
- data_agendada\
- observacoes\
- status (pendente, em_rota, entregue, falha)\
- created_at\
- updated_at

**Campos opcionais (para V2):** - tipo_entrega (normal, urgente,
agendada)\
- valor_entrega

------------------------------------------------------------------------

### **Produtos --- Remover do MVP**

Este módulo será removido na V1.

Possível retorno na V2 como "Itens da Entrega".

------------------------------------------------------------------------

### **Novo módulo --- Entregadores**

**Campos essenciais:** - id\
- nome\
- telefone\
- veiculo_tipo (moto, carro, bike)\
- placa\
- status (ativo, inativo)\
- created_at\
- updated_at

------------------------------------------------------------------------

# 3. Arquitetura Geral Final

### Frontend (React + Vite)

-   Rotas atualizadas
-   Novas telas para entregadores, entregas e painel operacional
-   Portal mobile do entregador

### Backend (NestJS)

-   Reestruturação dos módulos (lojas, entregadores, entregas)
-   Serviços para atualização de status
-   Endpoint público para rastreio (V2)

### Banco (PostgreSQL)

Tabelas: - lojas\
- entregadores\
- entregas\
- tracking (somente V2)

------------------------------------------------------------------------

# 4. Telas e Componentes da Versão Atual

## **4.1 Lojas (ex-Clientes)**

-   Lista
-   Cadastro/Edição
-   Remoção
-   Filtros básicos

## **4.2 Entregadores**

-   Lista
-   Cadastro/Edição
-   Atribuição de status (ativo/inativo)

## **4.3 Entregas (ex-Pedidos)**

-   Lista com filtros por status e entregador\
-   Criação de entrega\
-   Atribuição de entregador\
-   Atualização rápida de status

## **4.4 Painel Operacional do Dia**

Elemento-chave do produto.

**Componentes:** - KPIs no topo\
- Pendentes\
- Em rota\
- Entregues\
- Falhas\
- Lista/kanban das entregas do dia\
- Filtro por entregador\
- Botão de "Atualizar Status" rápido

Opcional (V2): - Mini-mapa com pins

## **4.5 Portal do Entregador (Mobile-First)**

-   Login simples\
-   Lista de entregas atribuídas\
-   Tela de detalhes\
-   Ação para mudar status\
-   UX simples e rápida

## **4.6 Rastreio Público (V2)**

URL: `/track/:entrega_id`

Exibe: - Status atual\
- Timeline (V2)\
- Dados básicos da entrega

------------------------------------------------------------------------

# 5. Diagrama de Entidades (Versão Final)

    lojas (1) --- (N) entregas (N) --- (1) entregadores

    lojas
      id
      nome
      responsavel
      telefone
      endereco
      horario_funcionamento

    entregadores
      id
      nome
      telefone
      veiculo_tipo
      placa
      status

    entregas
      id
      loja_id
      entregador_id
      destinatario
      telefone_destinatario
      endereco_entrega
      data_agendada
      observacoes
      status

------------------------------------------------------------------------

# 6. Roadmap Completo

## **V1 --- MVP (Essencial)**

Tempo sugerido: **4 semanas**

### **Semana 1 --- Reestruturação**

-   Renomear Clientes → Lojas\
-   Renomear Pedidos → Entregas\
-   Remover Produtos\
-   Criar módulo de Entregadores\
-   Ajustar relacionamentos e migrations\
-   Criar enum de status de entrega

------------------------------------------------------------------------

### **Semana 2 --- CRUD + Backend**

-   Tela de Lojas\
-   Tela de Entregadores\
-   Tela de Entregas\
-   Filtros básicos\
-   Backend com validações\
-   Atribuição de entregadores

------------------------------------------------------------------------

### **Semana 3 --- Painel Operacional**

-   Implementar página do dia\
-   KPIs\
-   Filtros\
-   Cards de entrega\
-   Atualização rápida de status

------------------------------------------------------------------------

### **Semana 4 --- Portal do Entregador**

-   Login simples\
-   Listagem\
-   Tela de detalhes\
-   Atualização de status\
-   Testes básicos de fluxo

------------------------------------------------------------------------

# **V2 --- Bonus (Impacto no Portfolio)**

Tempo sugerido: **4 semanas**

### **Semana 5 --- Tracking Público**

-   Rota pública\
-   Exibir status atual\
-   Layout simples

### **Semana 6 --- Mapa Operacional**

-   Integração Leaflet\
-   Pins estáticos das entregas

### **Semana 7 --- Relatórios**

-   Relatório por entregador\
-   Relatório por loja\
-   Taxas de entrega/falha

### **Semana 8 --- Refinamentos**

-   UI/UX\
-   Ajustes de navegação\
-   Perfis de usuário\
-   Melhorias gerais

------------------------------------------------------------------------

# 7. Resultado Final (Após V1)

Um sistema last‑mile completo:

-   Lojas\
-   Entregadores\
-   Entregas\
-   Painel de operações\
-   Portal mobile para entregador\
-   Fluxo ponta‑a‑ponta\
-   Pronto para portfolio como produto nichado

------------------------------------------------------------------------

Esse documento reflete **exatamente a versão atual planejada** e pode
ser usado como README ou documentação do repositório.
