if ("speechSynthesis" in window) {
    let demo = document.getElementById("tts");
    demo.onclick = () => {
      let msg = new SpeechSynthesisUtterance("Woof-woof.");
      speechSynthesis.speak(msg);
    };
    demo.disabled = false;
  }