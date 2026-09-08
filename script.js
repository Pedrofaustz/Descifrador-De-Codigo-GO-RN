/* =====================================================
   RESPOSTA CORRETA
===================================================== */

const respostaCorreta = [
    "I",
    "N",
    "O",
    "V",
    "A",
    "Ç",
    "Ã",
    "O"
];


/* =====================================================
   LETRAS DISPONÍVEIS
=====================================================

   As primeiras são as letras da resposta.

   As demais são letras falsas para dificultar
   a escolha do jogador.

===================================================== */

const letrasIniciais = [

    "I",
    "O",
    "V",
    "A",
    "O",

    "E",
    "R",
    "T",
    "S",
    "M",
    "Ç",
    "P",
    "U",
    "L",
    "D",
    "Ã",
    "C",
    "F",
    "G",
    "O",
    "N",
];


/* =====================================================
   EMBARALHAR AS LETRAS
===================================================== */

function embaralhar(array) {

    const copia = [...array];

    for (
        let i = copia.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            copia[i],
            copia[j]
        ] = [
            copia[j],
            copia[i]
        ];

    }

    return copia;
}

/* =====================================================
   ELEMENTOS
===================================================== */

const slotsContainer =
    document.getElementById("slots");

const letrasContainer =
    document.getElementById("letras");

const verificarButton =
    document.getElementById("verificar");

const contadorElemento =
    document.getElementById("contador");

const telaSucesso =
    document.getElementById("tela-sucesso");

const mensagemErro =
    document.getElementById("mensagem-erro");


/* =====================================================
   VARIÁVEIS
===================================================== */

let tentativas = 0;

let letraArrastada = null;


/* =====================================================
   CRIAR OS ESPAÇOS
===================================================== */

function criarSlots() {

    slotsContainer.innerHTML = "";


    respostaCorreta.forEach((letra, indice) => {

        const slot =
            document.createElement("div");


        slot.classList.add("slot");


        slot.dataset.posicao = indice;


        configurarSlot(slot);


        slotsContainer.appendChild(slot);

    });

}


/* =====================================================
   CRIAR LETRAS
===================================================== */

function criarLetras() {

    letrasContainer.innerHTML = "";


    letrasIniciais.forEach((letra, indice) => {

        const elemento =
            document.createElement("div");


        elemento.classList.add("letra");


        elemento.textContent = letra;


        elemento.draggable = true;


        /*
            ID único para cada peça.

            Isso é importante porque temos
            dois "O".
        */

        elemento.dataset.id =
            "letra-" + indice;


        configurarLetra(elemento);


        letrasContainer.appendChild(elemento);

    });

}


/* =====================================================
   CONFIGURAR LETRA
===================================================== */

function configurarLetra(elemento) {


    elemento.addEventListener(
        "dragstart",
        function () {

            letraArrastada = elemento;


            elemento.style.opacity = "0.45";

        }
    );


    elemento.addEventListener(
        "dragend",
        function () {

            elemento.style.opacity = "1";


            letraArrastada = null;

        }
    );


}


/* =====================================================
   CONFIGURAR SLOT
===================================================== */

function configurarSlot(slot) {


    /*
        Quando uma letra passa sobre o espaço.
    */

    slot.addEventListener(
        "dragover",
        function (evento) {

            evento.preventDefault();


            slot.classList.add("drag-over");

        }
    );


    /*
        Quando a letra sai do espaço.
    */

    slot.addEventListener(
        "dragleave",
        function () {

            slot.classList.remove("drag-over");

        }
    );


    /*
        Quando o jogador solta a letra.
    */

    slot.addEventListener(
        "drop",
        function (evento) {

            evento.preventDefault();


            slot.classList.remove("drag-over");


            if (!letraArrastada) {

                return;

            }


            const letraExistente =
                slot.querySelector(".letra");


            /*
                Se já existe uma letra,
                fazemos uma troca.
            */

            if (
                letraExistente &&
                letraExistente !== letraArrastada
            ) {

                trocarLetras(
                    letraArrastada,
                    letraExistente
                );

            }

            else {

                colocarNoSlot(
                    letraArrastada,
                    slot
                );

            }

        }
    );

}


/* =====================================================
   COLOCAR LETRA NO SLOT
===================================================== */

function colocarNoSlot(letra, slot) {

    slot.appendChild(letra);


    slot.classList.add("preenchido");

}


/* =====================================================
   TROCAR LETRAS
===================================================== */

function trocarLetras(
    letra1,
    letra2
) {

    const pai1 =
        letra1.parentElement;

    const pai2 =
        letra2.parentElement;


    const marcador =
        document.createElement("span");


    pai1.insertBefore(
        marcador,
        letra1
    );


    pai2.appendChild(letra1);


    marcador.parentElement.insertBefore(
        letra2,
        marcador
    );


    marcador.remove();


    atualizarSlots();

}


/* =====================================================
   ATUALIZAR SLOTS
===================================================== */

function atualizarSlots() {

    const slots =
        document.querySelectorAll(".slot");


    slots.forEach((slot) => {

        if (
            slot.querySelector(".letra")
        ) {

            slot.classList.add(
                "preenchido"
            );

        }

        else {

            slot.classList.remove(
                "preenchido"
            );

        }

    });

}


/* =====================================================
   PEGAR SEQUÊNCIA ATUAL
===================================================== */

function obterSequencia() {

    const slots =
        document.querySelectorAll(".slot");


    const sequencia = [];


    slots.forEach((slot) => {

        const letra =
            slot.querySelector(".letra");


        if (letra) {

            sequencia.push(
                letra.textContent
            );

        }

        else {

            sequencia.push(null);

        }

    });


    return sequencia;

}


/* =====================================================
   VERIFICAR
===================================================== */

verificarButton.addEventListener(
    "click",
    function () {


        const sequencia =
            obterSequencia();


        /*
            Se existem espaços vazios,
            não conta como tentativa.
        */

        if (
            sequencia.includes(null)
        ) {

            mostrarErro(
                "PREENCHA TODA A SEQUÊNCIA"
            );

            return;

        }


        /*
            Conta a tentativa.
        */

        tentativas++;


        contadorElemento.textContent =
            tentativas;


        /*
            Compara as letras.
        */

        const acertou =
            sequencia.every(
                (letra, indice) => {

                    return (
                        letra ===
                        respostaCorreta[indice]
                    );

                }
            );


        /*
            ACERTO
        */

        if (acertou) {

            mostrarSucesso();

        }


        /*
            ERRO
        */

        else {

            mostrarErro(
                "SEQUÊNCIA INCORRETA"
            );


            setTimeout(
                function () {

                    resetarTentativa();

                },
                650
            );

        }

    }
);


/* =====================================================
   MENSAGEM DE ERRO
===================================================== */

function mostrarErro(texto) {


    /*
        Altera o texto da mensagem.
    */

    mensagemErro.innerHTML =
        "<span>×</span>" + texto;


    mensagemErro.classList.add(
        "mostrar"
    );


    slotsContainer.classList.add(
        "erro-slots"
    );


    setTimeout(
        function () {

            mensagemErro.classList.remove(
                "mostrar"
            );


            slotsContainer.classList.remove(
                "erro-slots"
            );

        },
        650
    );

}


/* =====================================================
   RESETAR TENTATIVA
===================================================== */

function resetarTentativa() {


    const letrasNosSlots =
        document.querySelectorAll(
            ".slot .letra"
        );


    /*
        Devolve somente as peças que
        o jogador colocou nos espaços.

        As letras falsas continuam
        disponíveis.
    */

    letrasNosSlots.forEach(
        (letra) => {

            letrasContainer.appendChild(
                letra
            );

        }
    );


    atualizarSlots();

}


/* =====================================================
   TELA DE SUCESSO
===================================================== */

function mostrarSucesso() {


    /*
        Impede que o jogador clique
        novamente.
    */

    verificarButton.disabled = true;


    /*
        Toca o som de sucesso.
    */

    tocarSomSucesso();


    /*
        Pequeno atraso antes da tela
        aparecer.
    */

    setTimeout(
        function () {

            telaSucesso.classList.add(
                "mostrar"
            );

        },
        300
    );

}


/* =====================================================
   SOM DE SUCESSO
=====================================================

   O som é criado pelo próprio navegador.

   Não depende de:
   - internet
   - MP3
   - arquivo externo
   - biblioteca

===================================================== */

function tocarSomSucesso() {


    const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;


    if (!AudioContext) {

        return;

    }


    const audio =
        new AudioContext();


    /*
        Sequência de notas.
    */

    const notas = [
        523.25,
        659.25,
        783.99
    ];


    notas.forEach(
        (frequencia, indice) => {

            const oscilador =
                audio.createOscillator();


            const ganho =
                audio.createGain();


            oscilador.type =
                "sine";


            oscilador.frequency.value =
                frequencia;


            /*
                Volume começa baixo.
            */

            ganho.gain.setValueAtTime(
                0.001,
                audio.currentTime +
                indice * 0.16
            );


            /*
                Aumenta rapidamente.
            */

            ganho.gain.exponentialRampToValueAtTime(
                0.18,
                audio.currentTime +
                indice * 0.16 +
                0.03
            );


            /*
                Diminui depois da nota.
            */

            ganho.gain.exponentialRampToValueAtTime(
                0.001,
                audio.currentTime +
                indice * 0.16 +
                0.35
            );


            oscilador.connect(
                ganho
            );


            ganho.connect(
                audio.destination
            );


            oscilador.start(
                audio.currentTime +
                indice * 0.16
            );


            oscilador.stop(
                audio.currentTime +
                indice * 0.16 +
                0.4
            );

        }
    );


    /*
        Fecha o contexto depois.
    */

    setTimeout(
        function () {

            audio.close();

        },
        1500
    );

}


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

criarSlots();

criarLetras();