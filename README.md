# 🔐 Decifrador — Escape Room UFERSA

Sistema web desenvolvido para ser utilizado durante o **GO!RN**, no
**Escape Room da UFERSA**.

O projeto consiste em um desafio de decifração no qual os participantes
devem identificar letras a partir de códigos espalhados pelo ambiente e,
posteriormente, organizá-las no sistema para formar a sequência correta:

**INOVAÇÃO**

---

## 🎯 Objetivo

O sistema tem como objetivo complementar a experiência presencial do
Escape Room, funcionando como uma das etapas do desafio.

Os participantes encontram códigos espalhados pela sala e utilizam uma
tabela física para identificar quais letras cada símbolo representa.

Depois de descobrir as letras, elas devem ser organizadas no computador
na ordem correta.

A sequência correta é:

> **I N O V A Ç Ã O**

O sistema verifica a sequência informada pelo participante e indica se
o desafio foi concluído.

---

## 🏆 Competição

A proposta do desafio possui um caráter competitivo.

O sistema conta o número de tentativas realizadas por cada participante
ou equipe.

Sempre que uma sequência incorreta é enviada:

- a tentativa é contabilizada;
- uma mensagem de erro é apresentada;
- as letras retornam para a área de seleção;
- o participante pode tentar novamente.

Ao acertar a sequência, o sistema apresenta uma animação de conclusão e
libera a próxima etapa do Escape Room.

O número de tentativas pode ser utilizado posteriormente como um dos
critérios de comparação entre as equipes.

---

## 💻 Funcionamento

O sistema foi desenvolvido para funcionar **offline**, permitindo que
seja executado diretamente em um computador durante o evento.

Não é necessário:

- conexão com a internet;
- servidor;
- banco de dados;
- instalação de dependências;
- hospedagem.

Basta abrir o arquivo:

```text
index.html