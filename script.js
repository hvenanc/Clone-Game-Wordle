document.addEventListener("DOMContentLoaded", () => {
    createSquares();

    let guessedWords = [[]];
    let availableSpace = 1;
    // Lista com algumas palavras em português 
    let wordList = ["MENTE", "RAZAO", "DENTE", "BOTAO", "FUSAO", "PENTE", "SAGAZ", "RAPAZ", "CLARA", "CAPAZ", "NOBRE", "FAZER", "VINTE", "SENSO", "TENSO", "JUSTO", "DANÇA", "CARRO"]
    //Sorteia uma palavra
    let word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
    let guessedWordCount = 0;

    //Exibe a palavra sorteada no console.
    console.log(word);

    //Letras do teclado virtual
    const keys = document.querySelectorAll(".keyboardrows button");

    function getCurrentWordArr() {
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords - 1];
    }

    //Obtem as palavras
    function updateGuessedWords(letter) {
        const currentWordArr = getCurrentWordArr();

        if (currentWordArr && currentWordArr.length < 5) {
            currentWordArr.push(letter);

            const availableSpaceEl = document.getElementById(String(availableSpace));
            availableSpace = availableSpace + 1;
            availableSpaceEl.textContent = letter;
        }
    }

    // Define a cor a cada caso
    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter);

        if (!isCorrectLetter) {
            return "#A4AEC4";
        }

        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = letter === letterInThatPosition;

        if (isCorrectPosition) {
            return "#79B851";            //Letra na posição correta.
        }

        return "#F3C237";               //Letra encontrada na palavra, porém na posição errada.
    }

    //Envia uma palavra
    function SubmitWord() {

        const currentWordArr = getCurrentWordArr();
        if (currentWordArr.length !== 5) {
            window.alert("A palavra deve ter 5 letras!");
        }

        const currentWord = currentWordArr.join("");

        //Animação
        const firstLetterId = guessedWordCount * 5 + 1;
        const interval = 750;
        currentWordArr.forEach((letter, index) => {
            setTimeout(() => {
                const tileColor = getTileColor(letter, index);
                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId);

                letterEl.classList.add("animantion");
                letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
            }, interval * index);
        });

        guessedWordCount += 1;

        //  Regra final do jogo
        if (currentWord === word) {
            setTimeout(() => alert("Você Venceu!!"), 50);
        }

        if (guessedWords.length === 6) {
            window.alert(`Você Perdeu! A Palavra é ${word}.`)
        }

        // Verifica se a palavra existe na base de dados (Array)
        var soma = 0;
        for (i = 0; i < wordList.length; i++) {
            if (currentWord !== wordList[i]) {
                soma++;
            }
        }

        if (soma === wordList.length) {
            window.alert("A palavra não encontrada!")
        }

        console.log(soma);

        guessedWords.push([]);

    }

    //Cria os quadros para as letras 
    function createSquares() {
        const gameBoard = document.getElementById("board");

        for (let i = 0; i < 30; i++) {
            let square = document.createElement("span");
            square.classList.add("square");
            square.setAttribute("id", i + 1);
            gameBoard.appendChild(square);
        }
    }

    //Deleta uma letra da palavra
    function DeleteLetter() {
        const currentWordArr = getCurrentWordArr();
        const removedLetter = currentWordArr.pop();

        guessedWords[guessedWords.length - 1] = currentWordArr;

        const lastLetterEl = document.getElementById(String(availableSpace - 1));

        lastLetterEl.textContent = "";
        availableSpace = availableSpace - 1;
    }

    //Utiliza as funções de deletar uma palavra e submeter a palavra a partir do Enter.
    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key");

            if (letter === "ENTER") {
                SubmitWord();
                return;
            }

            if (letter === "BACKSPACE") {
                DeleteLetter();
                return;
            }

            updateGuessedWords(letter);
        };
    }

}
);