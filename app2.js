const form = document.getElementById("formCaptura");
const lista = document.getElementById("listaCapturas");
const fotoInput = document.getElementById("foto");

let capturas = JSON.parse(localStorage.getItem("capturas")) || [];

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const fecha = document.getElementById("fecha").value;
    const lugar = document.getElementById("lugar").value;
    const especie = document.getElementById("especie").value;
    const peso = document.getElementById("peso").value;
    const clima = document.getElementById("clima").value;

    let fotoBase64 = "";

    if (fotoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            fotoBase64 = e.target.result;

            guardarCaptura(fecha, lugar, especie, peso, clima, fotoBase64);
        };
        reader.readAsDataURL(fotoInput.files[0]);
    } else {
        guardarCaptura(fecha, lugar, especie, peso, clima, null);
    }
});

function guardarCaptura(fecha, lugar, especie, peso, clima, foto) {
    const captura = { fecha, lugar, especie, peso, clima, foto };
    capturas.push(captura);
    localStorage.setItem("capturas", JSON.stringify(capturas));
    mostrarCapturas();
    form.reset();
}

function mostrarCapturas() {
    lista.innerHTML = "";

    capturas.forEach(captura => {
        const card = document.createElement("div");
        card.classList.add("captura");

        card.innerHTML = `
            <strong>📅 Fecha:</strong> ${captura.fecha}<br>
            <strong>📍 Lugar:</strong> ${captura.lugar}<br>
            <strong>🐟 Especie:</strong> ${captura.especie}<br>
            <strong>⚖️ Peso:</strong> ${captura.peso} kg<br>
            <strong>🌤 Clima:</strong> ${captura.clima}
        `;

        if (captura.foto) {
            const img = document.createElement("img");
            img.src = captura.foto;
            img.classList.add("foto-captura");
            card.appendChild(img);
        }

        lista.appendChild(card);
    });
}

mostrarCapturas();
