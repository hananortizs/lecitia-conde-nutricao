# Regras de Negócio - Letícia Conde Nutricionista

## 1. Horários de Funcionamento

### Dias da Semana

- **Segunda a Quinta-feira**: 17:00h às 22:00h
- **Domingo**: Horário aberto (sem restrições de horário)
- **Sexta-feira e Sábado**: Totalmente bloqueado (Sabbat)

### Regra do Sabbat

- **Período**: Do pôr do sol de sexta-feira até o pôr do sol de sábado
- **Implementação**: Integração com API de pôr do sol para localização de São Paulo
- **Comportamento**: Todos os slots neste período são automaticamente bloqueados

## 2. Sistema de Agendamento

### Duração das Consultas

- **Duração**: 1 hora por consulta
- **Intervalo**: Slots de 1 em 1 hora

### Processo de Reserva

1. **Reserva Provisória**: 15 minutos para efetuar pagamento
2. **Confirmação**: Apenas após confirmação de pagamento via webhook
3. **Sala Virtual**: Link gerado automaticamente após confirmação

### Status dos Agendamentos

- **Reservado**: Aguardando pagamento (15 min)
- **Confirmado**: Pagamento aprovado
- **Cancelado**: Cancelado pelo usuário ou sistema
- **Realizado**: Consulta realizada

## 3. Captação de Leads

### Calculadora de IMC

- **Campos Obrigatórios**: Nome, Email, WhatsApp, Peso, Altura
- **Validações**:
  - Peso: 1 a 500 kg
  - Altura: 0.5 a 3.0 metros
  - Email: Formato válido
  - WhatsApp: Formato válido

### Classificação do IMC (OMS)

- **Abaixo do peso**: < 18.5
- **Peso normal**: 18.5 - 24.9
- **Sobrepeso**: 25.0 - 29.9
- **Obesidade Grau I**: 30.0 - 34.9
- **Obesidade Grau II**: 35.0 - 39.9
- **Obesidade Grau III**: ≥ 40.0

## 4. Integrações Externas

### API de Pôr do Sol

- **Provedor**: sunrise-sunset.org
- **Localização**: São Paulo (-23.5505, -46.6333)
- **Uso**: Determinar horários do Sabbat

### Sistema de Pagamento

- **Webhook**: `/pms/pagamento/webhook`
- **Confirmação**: Apenas status "approved" confirma agendamento
- **Timeout**: 15 minutos para pagamento

### Sala Virtual

- **Provedor**: Google Meet (padrão)
- **Geração**: Automática após confirmação de pagamento
- **Formato**: `https://meet.google.com/leticia-conde-{dataHora}`

## 5. Validações e Restrições

### Validações de Horário

- Verificar se está dentro do horário de funcionamento
- Verificar se não é período de Sabbat
- Verificar se não há conflito com outros agendamentos
- Verificar se não é no passado

### Validações de Lead

- Email único por lead
- WhatsApp único por lead
- Dados obrigatórios preenchidos
- Formato de dados válido

## 6. Configurações do Sistema

### Timezone

- **Padrão**: America/Sao_Paulo (UTC-3)
- **Armazenamento**: UTC no banco de dados
- **Exibição**: Horário local de São Paulo

### CORS

- **Frontend**: http://localhost:5173, http://localhost:3000
- **Métodos**: GET, POST, PUT, DELETE
- **Headers**: Todos permitidos

### Logs

- **Nível**: Information para operações normais
- **Nível**: Warning para operações suspeitas
- **Nível**: Error para falhas do sistema
