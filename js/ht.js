function flipCoin() {
  const coin = document.getElementById("coin");
  coin.classList.add("flip");
  var snd = new Audio('images/coin-flip-88793.mp3')
  snd.play()

  setTimeout(() => {
    const result = Math.random() < 0.5 ? "Heads" : "Tails";
    document.getElementById("result").innerText = "Result: " + result;
    
    const front = document.querySelector(".front");
    const back = document.querySelector(".back");
    if (result === "Heads") {
      front.style.transform = "rotateX(0)";
      back.style.transform = "rotateX(-180deg)";
    } else {
      front.style.transform = "rotateX(180deg)";
      back.style.transform = "rotateX(0)";
    }
    coin.classList.remove("flip");
  }, 1000);

}
