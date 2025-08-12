window.addEventListener("mousemove", function(event) {
    var navbar = document.getElementById("navbar");

    // Quando o mouse está a menos de 50px do topo, mostrar a navbar
    if (event.clientY < 50) {
        navbar.style.top = "0"; // Desce a navbar
    } else {
        navbar.style.top = "-60px"; // Esconde a navbar novamente
    }
});