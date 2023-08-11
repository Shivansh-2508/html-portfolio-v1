const options = document.querySelectorAll('.option');
const resultElement = document.getElementById('result');

function computerPlay() {
    const choices = ['👊 Rock', '✋ Paper', '✌ Scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function playRound(playerSelection, computerSelection) {
   
    if (playerSelection === computerSelection) {
        resultElement.textContent = 'Its a Tie 💕' ;
        resultElement.classList.remove('lost'); // Remove losing animation class
        resultElement.classList.remove('won')
        resultElement.classList.add('tie');
    } else if (
        (playerSelection === '👊 Rock' && computerSelection === '✌ Scissors') ||
        (playerSelection === '✋ Paper' && computerSelection === '👊 Rock') ||
        (playerSelection === '✌ Scissors' && computerSelection === '✋ Paper')
    ) {
        resultElement.textContent = 'You win!🎉\n Computer chose' + computerSelection + ' which looses to ' + playerSelection ;
        resultElement.classList.remove('lost'); // Remove losing animation class
        resultElement.classList.add('won'); // Add winning animation class
        /*var snd = new Audio('images/win.mp3')//wav is also supported
        snd.play()*/
    } else {
        resultElement.textContent = 'You lose! 🤣🤣🤣 \n Computer chose' + computerSelection + 'which beats ' + playerSelection;
        resultElement.classList.remove('won'); // Remove winning animation class
        resultElement.classList.add('lost'); // Add losing animation class
        //var snd = new Audio('images/fail1.mp3')//wav is also supported
        /*snd.play()*/
    }

}

options.forEach(option => {
    option.addEventListener('click', function () {
        const playerSelection = this.textContent;
        const computerSelection = computerPlay();
        const result = playRound(playerSelection, computerSelection);
    });
});
