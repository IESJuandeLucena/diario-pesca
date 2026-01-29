let pescas = JSON.parse(localStorage.getItem("pescas")) || [];

function guardarPesca(){
    const data = {
        fecha: fecha.value,
        lugar: lugar.value,
        pez: pez.value,
        cebo: cebo.value,
        clima: clima.value,
        tamano: tamano.value
    };

    pescas.push(data);
    localStorage.setItem("pescas", JSON.stringify(pescas));

    limpiar();
    render();
}

function limpiar(){
    fecha.value="";
    lugar.value="";
    pez.value="";
    cebo.value="";
    clima.value="";
    tamano.value="";
}

function render(){
    lista.innerHTML="";
    pescas.forEach((p,index)=>{
        const div = document.createElement("div");
        div.className="item";
        div.innerHTML=`
            <strong>${p.pez}</strong>
            <small>📍 ${p.lugar}</small>
            <small>📅 ${p.fecha}</small>
            <small>🎯 Cebo: ${p.cebo}</small>
            <small>☁️ Clima: ${p.clima}</small>
            <small>📏 Tamaño: ${p.tamano}</small>
            <button class="deleteBtn" onclick="borrarPesca(${index})">🗑️ Borrar</button>
        `;
        lista.appendChild(div);
    });
}


function borrarPesca(index){
    if(confirm("¿Seguro que quieres borrar esta jornada?")){
        pescas.splice(index,1);
        localStorage.setItem("pescas", JSON.stringify(pescas));
        render();
    }
}
