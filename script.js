const Player = (name, mark) => {
    return {name, mark}
}

const GameBoard = (() => {
    let gameArray = []
    let player = null
    let computer = null
    let finished = false

    const initGame = () => {
        for (let x = 0; x < 3; x++) {
            gameArray.push([])
            for (let y = 0; y < 3; y++){
                gameArray[x][y] = ""
            }
        }
    }

    const render = () => {
        let content = document.querySelector(".game-board")
        content.innerText = ""
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++){
                let rect = document.createElement("div")
                rect.classList.add("game-rect")
                content.appendChild(rect)
                if (gameArray[x][y] === "X")
                {
                    rect.innerText = "X"
                }
                else if (gameArray[x][y] === "O")
                {
                    rect.innerText = "O"
                }

                rect.addEventListener("click", (event) => {
                    if (gameArray[x][y] === "" && !finished){
                        gameArray[x][y] = "X"
                        rect.innerText = "X"
                        if (judge() === false) {
                            computerMove()
                            judge()
                        }
                        
                    }
                    
                })

            }
        }
    }

    const setInitButton = () => {
        let startButton = document.querySelector("#submit")
        let getName = document.querySelector("#name")
        startButton.addEventListener("click", (event) => {
            event.preventDefault()
            if (getName.value == ""){
                alert("Please enter your name to start!")
            } else {
                var nameWindow = document.querySelector(".start-form")
                nameWindow.classList.toggle("start-form-hide")
                player = Player(getName.value, "X")
                computer = Player("Computer", "O")
                render()
            }
        })
    }

    const computerMove = () => {
        let ary = [0, 1, 2, 3, 4, 5, 6, 7, 8].filter(id => gameArray[Math.floor(id/3) % 3][id%3] === "")
        if (ary.length > 0){
            let x = ary[Math.floor(Math.random()*ary.length)]
            gameArray[Math.floor(x/3) % 3][x%3] = "O"
            let rect = document.querySelectorAll(".game-rect")
            rect[x].innerText = "O"
            console.log(rect[x])
        }
        else {
            finished = true
            finish(null)
        }
        
    }

    const judge = () => {
        let b = false
        if (positionAt([0,1,2], "X") || positionAt([3,4,5], "X")
        || positionAt([6,7,8], "X") || positionAt([0,3,6], "X")
        || positionAt([1,4,7], "X") || positionAt([2,5,8], "X")
        || positionAt([0,4,8], "X") || positionAt([6,4,2], "X")) {
            console.log(player.name + " has won!")
            b = true
            finished = true
            finish(player)
        } else if (positionAt([0,1,2], "O") || positionAt([3,4,5], "O")
        || positionAt([6,7,8], "O") || positionAt([0,3,6], "O")
        || positionAt([1,4,7], "O") || positionAt([2,5,8], "O")
        || positionAt([0,4,8], "O") || positionAt([6,4,2], "O")) {
            console.log(computer.name + " has won!")
            b = true
            finished = true
            finish(computer)
        }
        return b
    }

    const positionAt = (id, mark) => {
        let b = true
        id.forEach(element => {
            if (gameArray[Math.floor(element/3) % 3][element%3] !== mark){
                b = false
            }
        });
        return b
    }

    const finish = (winner) => {
        let content = document.querySelector(".finish-board")
        let button = document.createElement("button")
        button.classList.add("finish-button")
        button.innerText = "Restart"
        content.appendChild(button)
        content.classList.toggle("finish-hidden")
        if (winner !== null) {
            content.innerText = winner.name + " has won!"
        }
        else {
            content.innerText = "Draw!"
        }
        
        content.appendChild(button)

        button.addEventListener("click", (event) => {
            content.classList.toggle("finish-hidden")
            var nameWindow = document.querySelector(".start-form")
            nameWindow.classList.toggle("start-form-hide")
            var board = document.querySelector(".game-board")
            while (board.firstChild) {
                board.removeChild(board.firstChild);
            }
            gameArray = []
            finished = false
            initGame()
        })
    }

    

    return {initGame, gameArray, render, setInitButton}
})();

GameBoard.initGame()
//console.table(GameBoard.gameArray)
GameBoard.setInitButton()