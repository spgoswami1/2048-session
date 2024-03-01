// Left shift 2 2 2 0, 2 0 0 2, 0 0 2 2
// Left move (merge) 2 2 2 2, 2 0 2 2, 2 2 0 2, 0 0 2 2
// same right

// Let's first create the board. We have a grid container and we need to render 16 small block in that grid 
// with an initial value of 0 and give a function name 
// createBoard

function createBoard(){
    let grid = document.querySelector('.grid')
    for (let i = 0; i < 16; i++){
        let div = document.createElement('div')
        div.setAttribute("id",`id_${i}`)
        div.textContent = 0
        grid.appendChild(div)
    }
}
createBoard()

// Now in all zeros, let's randomly pop-up one number at a random zero location with a 2 or 4 with 
// p(2) = 0.9 and p(4) = 0.1
// generate


// 
function generate(){
    let optionArray = [2, 2, 2, 2, 2, 2, 2, 2, 2, 4]
    let allBlocks = document.querySelectorAll('.grid > div') // NodeList, can't directly apply filter
    // convert to a valid array which has filter available, ways to do it
    // [...allBlocks]
    // Array.from(allBlocks)
    let emptyBlocks = Array.from(allBlocks).filter((a) => a.textContent == 0)
    // What if there are not empty blocks, change this code to generate only when empty blocks
    if (emptyBlocks.length == 0){
        return
    }
    let randomNumber = optionArray[Math.floor((Math.random() * 10))] // a value between 0 and 9 
    let randomBlock = emptyBlocks[Math.floor((Math.random() * emptyBlocks.length))] // select a random empty block
    randomBlock.textContent = randomNumber
}
// alert(Math.random()) gives a number between 0 and 1
// generate()
// generate()
// generate()
// generate()

let totalScore = 0
// Write a function to move all non-zero elements to the left without merging, just shift to left
// shiftLeft

function shiftArrayLeft(valueArray){
    let finalArray = valueArray.filter((a) => a != 0)
    let index = finalArray.length
    while (index < 4){
        finalArray.push(0)
        index++
    }
    return finalArray
}
// console.log(shiftArrayLeft([0, 2, 4, 0]))
// console.log(shiftArrayLeft([0, 0, 0, 4]))

// combine method
function combineArrayLeft(valueArray){
    let index = 1
    while (index < 4){
        if (valueArray[index] == valueArray[index - 1]){
            valueArray[index - 1] = valueArray[index] * 2
            totalScore += (valueArray[index] * 2)
            document.querySelector("#score").textContent = totalScore
            valueArray[index] = 0
        }
        index++
    }
    return valueArray
}
// console.log(combineArrayLeft([2,2,2,2]))

// direct merge method -- homework
// function mergeArrayLeft(valueArray){
// }

// Write a function to move all non-zero elements to the right without merging, just shift to left
// shiftLeft
function shiftArrayRight(valueArray){
    let finalArray = valueArray.filter((a) => a != 0)
    let index = finalArray.length
    while (index < 4){
        finalArray.unshift(0)
        index++
    }
    return finalArray
}
// console.log(shiftArrayRight([0, 2, 4, 0]))
// console.log(shiftArrayRight([0, 0, 0, 4]))

// combine method
function combineArrayRight(valueArray){
    let index = valueArray.length - 1
    while (index > 0){
        if (valueArray[index] == valueArray[index - 1]){
            totalScore += (valueArray[index] * 2)
            document.querySelector("#score").textContent = totalScore
            valueArray[index] = valueArray[index] * 2
            valueArray[index - 1] = 0
        }
        index--
    }
    return valueArray
}
// console.log(combineArrayRight([2,2,2,2]))

function getRowValues(rowNumber){
    let rowValues = []
    for (let i = 4 * (rowNumber - 1); i < 4 * rowNumber; i++){
        rowValues.push(Number(document.querySelector(`#id_${i}`).textContent))
    }
    return rowValues
}
// Shift a given row's elements to given direction Left or Right
function moveRow(rowNumber, direction){
    let rowValues = getRowValues(rowNumber)
    if (direction == 'L'){
        // Method 1
        rowValues = shiftArrayLeft(rowValues)
        rowValues = combineArrayLeft(rowValues)
        rowValues = shiftArrayLeft(rowValues)

        // Method 2
        // Do it as homework
    }
    if (direction == 'R'){
        rowValues = shiftArrayRight(rowValues)
        rowValues = combineArrayRight(rowValues)
        rowValues = shiftArrayRight(rowValues)
    }
    for (let i = 4 * (rowNumber - 1); i < 4 * rowNumber; i++){
        document.querySelector(`#id_${i}`).textContent = rowValues[i % 4]
    }
}

// shiftRow(1, 'L')
// shiftRow(2, 'L')
// shiftRow(3, 'L')
// shiftRow(4, 'L')

// Shift all rows to left
function moveLeft(){
    for (let i of [1, 2, 3, 4]){
        moveRow(i, 'L')
    }
}

// Shift all rows to right
function moveRight(){
    for (let i of [1, 2, 3, 4]){
        moveRow(i, 'R')
    }
}

// Shift a given column's elements to given direction Left or Right
// a column can be thought of as a row transpose, so same left right function will work
// for a column as well to move them up and down

function getColumnValues(colNumber){
    let colValues = []
    
    for (let i = colNumber - 1; i < 16; i+= 4){
        colValues.push(Number(document.querySelector(`#id_${i}`).textContent))
    }
    return colValues
}

function moveColumn(colNumber, direction){
    let colValues = getColumnValues(colNumber)
    if (direction == 'U'){
        colValues = shiftArrayLeft(colValues)
        colValues = combineArrayLeft(colValues)
        colValues = shiftArrayLeft(colValues)
    }
    if (direction == 'D'){
        colValues = shiftArrayRight(colValues)
        colValues = combineArrayRight(colValues)
        colValues = shiftArrayRight(colValues)
    }
    
    let counter = 0
    for (let i = colNumber - 1; i < 16; i+= 4){
        document.querySelector(`#id_${i}`).textContent = colValues[counter]
        counter++ 
    }
}

// Shift all columns to up
function moveUp(){
    for (let i of [1, 2, 3, 4]){
        moveColumn(i, 'U')
    }
}

// Shift all rows to right
function moveDown(){
    for (let i of [1, 2, 3, 4]){
        moveColumn(i, 'D')
    }
}
// shiftLeft()
// shiftRight()
// shiftUp()
// shiftDown()

// Now this will work for us till question 6 without any changes at all.

// Now let's make some wholesale changes to our code to implement the later portions 
// of the questions

// Now we need to write logic to mergeLeft and mergeRight and also change the names
// shift functions to move functions. Move will also combine merge
// Now there could be two ways to move
// 1. shift combine shift -- the already made function can be used
// 2. Direct merge -- preferred and better way

// moveLeft()
// moveUp()
// moveRight()
// moveDown()

// Add event listener to move these things with arrow keys
// we gather an event and from the event keyCode, we decide what key was pressed and 
// we take action accordingly
// 37 Left arrow
// 38 Up arrow
// 39 Right arrow
// 40 Down arrow

function keyupHandler(event){
    switch(event.keyCode){
        case 37:
            moveLeft()
            break;
        case 38:
            moveUp()
            break;
        case 39:
            moveRight()
            break;
        case 40:
            moveDown()
            break;
    }

    generate()
    if (checkForWin()){
        document.body.removeEventListener('keyup', keyupHandler);
        document.querySelector('#result').textContent = "YOU WIN!"
    }
    else if (isGameOver()){
        document.body.removeEventListener('keyup', keyupHandler);
        document.querySelector('#result').innerText = "Game Over"
    }
}

document.body.addEventListener('keyup', keyupHandler);

// Till this Q no. 7 + our main logic for the questions is done

// Let's add logic for 
// 1. Score Update --> changes in code above
// 2. Game Over -- when no more possible moves
// 3. Game Win -- when any one of the blocks is equal to 2048
// 4. Game Re-start -- reset the game Board

function checkAdjacent(values){
    let index = values.length - 1
    while (index > 0) {
        if (values[index] === values[index - 1]) {
            return true
        }
        index--;
    }
    return false
}

function isGameOver(){
    let allBlocks = document.querySelectorAll('.grid > div') 
    let emptyBlocks = Array.from(allBlocks).filter((a) => a.textContent == 0)
    if (emptyBlocks.length != 0){
        return false
    }

    for (let rowNumber of [1, 2, 3, 4]){
        let rowValues = []
        for (let i = 4 * (rowNumber - 1); i < 4 * rowNumber; i++){
            rowValues.push(Number(document.querySelector(`#id_${i}`).textContent))
            if (rowValues.length > 1 && (rowValues[i % 4] == rowValues[i % 4 - 1])){
                return false
            }
        }
    }

    for (let colNumber of [1, 2, 3, 4]){
        let colValues = []
        let count = 0
        for (let i = (colNumber - 1); i < 16; i+=4){
            colValues.push(Number(document.querySelector(`#id_${i}`).textContent))
            if (colValues.length > 1 && (colValues[count] == colValues[count - 1])){
                return false
            }
        count++
        }
    }
    return true
}

function checkForWin(){
    let allBlocks = document.querySelectorAll('.grid > div') 
    let winningBlocks = Array.from(allBlocks).filter((a) => a.textContent == 2048)
    return winningBlocks.length != 0
}

document.querySelector('#restart-button').addEventListener('click', () => {
    document.querySelector('.grid').innerHTML = ''
    totalScore = 0
    document.querySelector("#score").textContent = totalScore
    document.querySelector('#result').innerText = "Join the numbers and get to the 2048 tile!"
    createBoard()
    generate()
    generate()
    document.body.addEventListener('keyup', keyupHandler);
})
