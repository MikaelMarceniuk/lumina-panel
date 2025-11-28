# Lumina Panel Last-Mile — V1 (MVP)

Este documento descreve o escopo completo da **Versão 1 (MVP)** do Lumina Panel adaptado para last-mile delivery, incluindo entidades, telas, endpoints e roadmap de desenvolvimento.

---

## 1️⃣ Objetivo

Ter um sistema funcional ponta-a-ponta de gestão last-mile que permita:

- Cadastrar e gerenciar lojas (Stores)
- Cadastrar e gerenciar entregadores (Deliverers)
- Criar e gerenciar entregas (Deliveries) com atribuição a loja e entregador
- Visualizar o fluxo operacional diário das entregas (painel simples)
- Portal mobile básico para entregador atualizar status das entregas

---

## 2️⃣ Entidades e Relacionamentos

### Store

- id, name, manager, phone, contact_email, address, city, state, zip_code, operating_hours, created_at, updated_at
- Relacionamento: 1 Store → N Deliveries

### Deliverer

- id, name, phone, vehicle_type, plate_number, status, created_at, updated_at
- Relacionamento: 1 Deliverer → N Deliveries

### Delivery

- id, store_id, deliverer_id, recipient, recipient_phone, delivery_address, scheduled_date, notes, status, created_at, updated_at
- Relacionamentos: belongsTo Store, belongsTo Deliverer (opcional até ser atribuído)

---

## 3️⃣ Backend — NestJS

### CRUD Endpoints

#### Stores

- GET /stores → listar lojas
- GET /stores/:id → detalhes de uma loja
- POST /stores → criar loja
- PUT /stores/:id → atualizar loja
- DELETE /stores/:id → remover loja

#### Deliverers

- GET /deliverers → listar entregadores
- GET /deliverers/:id → detalhes
- POST /deliverers → criar entregador
- PUT /deliverers/:id → atualizar
- DELETE /deliverers/:id → remover

#### Deliveries

- GET /deliveries → listar entregas
- GET /deliveries/:id → detalhes
- POST /deliveries → criar entrega
- PUT /deliveries/:id → atualizar entrega (atribuir entregador, atualizar status)
- DELETE /deliveries/:id → remover entrega

### Validações importantes

- name obrigatório para Store e Deliverer
- status com valores predefinidos (pending, in_route, delivered, failed)
- contact_email único (opcional)
- scheduled_date não pode ser no passado (opcional para MVP)

---

## 4️⃣ Frontend — React + Vite

### Telas principais

1. **Stores**
   - Lista de lojas (tabela ou cards)
   - Formulário para criar/editar loja
   - Delete com confirmação

2. **Deliverers**
   - Lista de entregadores
   - Formulário para criar/editar entregador
   - Delete com confirmação

3. **Deliveries**
   - Lista de entregas
   - Formulário para criar/editar entrega
   - Atribuição de entregador e store
   - Atualização de status

4. **Painel Operacional do Dia**
   - Lista de entregas do dia atual
   - Filtros por status e entregador
   - KPIs (pendentes, em rota, entregues, falha)
   - Botão rápido para atualizar status

5. **Portal do Entregador (Mobile)**
   - Login simples
   - Lista de entregas atribuídas
   - Tela de detalhes da entrega
   - Atualização de status

---

## 5️⃣ Funcionalidades extras de MVP

- Filtros básicos e ordenação nas listas (por nome, status, cidade, etc.)
- Feedback visual (alertas ou snackbar) para sucesso/erro
- Validações no frontend para campos obrigatórios
- Paginação simples (se houver muitas entidades)

---

## 6️⃣ Roadmap rápido V1

| Semana | Objetivo                                                        |
| ------ | --------------------------------------------------------------- |
| 1      | Stores — Backend CRUD + testes                                  |
| 2      | Stores — Frontend lista + formulário + integração               |
| 3      | Deliverers — Backend CRUD + testes                              |
| 4      | Deliverers — Frontend lista + formulário + integração           |
| 5      | Deliveries — Backend CRUD + atribuição a store/entregador       |
| 6      | Deliveries — Frontend lista + formulário + atualização status   |
| 7      | Painel operacional — backend + frontend, KPIs, filtros          |
| 8      | Portal do entregador — mobile-first, login + atualização status |
| 9      | Ajustes, validações e testes ponta-a-ponta                      |

---

💡 **Dica de MVP enxuto:**  
Você pode começar só com Stores + Deliverers + Deliveries CRUD, com painel operacional básico.  
O portal do entregador pode ser feito simples no início (login + lista + atualizar status), sem otimizações mobile avançadas.
