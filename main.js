const contenedor = document.getElementById("contenedor");
const formulario = document.getElementById("formulario");
const formulario2 = document.getElementById("formulario2");
const parrafo = document.createElement("p");
const aceptar = document.createElement("button");
aceptar.innerHTML="Aceptar"
const cancelar = document.createElement("button");
cancelar.innerHTML="Cancelar Turno"
const confirmar = document.createElement("button");
confirmar.innerHTML="Confirmar"
const consultar = document.createElement("button");
consultar.innerHTML="Consultar Turno"
const finalizar = document.createElement("button");
finalizar.innerHTML="Finalizar"
const reservar = document.createElement("button");
reservar.innerHTML="Reservar Turno"
const volver = document.createElement("button");
volver.innerHTML="Volver"
aceptar.className = "btn btn-outline-secondary";
cancelar.className = "btn btn-outline-secondary";
confirmar.className = "btn btn-outline-secondary";
consultar.className = "btn btn-outline-secondary";
finalizar.className = "btn btn-outline-secondary";
reservar.className = "btn btn-outline-secondary";
volver.className = "btn btn-outline-secondary";
formulario2.remove();
//Lo de abajo no funciona, quise llamar a todos los botones juntos pero no anduvo... 
//const botones=document.getElementsByTagName("button");
//botones.className="rojo";

class Alumno {
    constructor(nombre, apellido, email,clases_reservadas) {
        this.nombre = nombre; 
        this.apellido = apellido;
        this.email = email;
        this.clases_reservadas=clases_reservadas;
    }
}

class Clase {
    constructor(dia, horario,alumnos) {
        this.dia = dia; 
        this.horario = horario;
        this.alumnos=alumnos;
    }
}

let array_alumnos_estudio= []
let array_clases=[]

function actualizar_alumnos_estudio(un_alumno){
    if (array_alumnos_estudio.some(alumno=>alumno.email==un_alumno.email)){
        return array_alumnos_estudio;
    }
    array_alumnos_estudio.push(un_alumno);
    return array_alumnos_estudio;
}

function actualizar_clase(una_clase){
    let clases_del_dia=array_clases.filter(clase=>clase.dia==una_clase.dia)
    if (clases_del_dia.some(clase=>clase.horario==una_clase.horario)){
        return array_clases;
    }
        array_clases.push(una_clase);
        return array_clases;
}

function cancelar_reserva(clase){
    clase.alumnos.pop();
    alumno1.clases_reservadas.pop();
    alumno_molesto=array_alumnos_estudio.find(alumno=>alumno.email==email)
    alumno_molesto.clases_reservadas.pop()
    return clase;
}

function consulta_clases_alumno(alumno){
    return alumno.clases_reservadas;
}

function alumnos_en_la_clase(dia,horario){
    let clases_del_dia_de_la_consulta=array_clases.filter(clase=>clase.dia==dia);  
    if (!(clases_del_dia_de_la_consulta.some(clase=>clase.horario==horario))){
        return ("no hay alumnos en la clase!");
        }
    let clase_consultada=clases_del_dia_de_la_consulta.find(clase=>clase.horario==horario);
    if (clase_consultada.alumnos.length>0){
        return clase_consultada.alumnos;
        }
        return ("no hay alumnos en la clase!");
        }

function remover(){
    aceptar.remove();
    cancelar.remove();
    confirmar.remove();
    consultar.remove();
    parrafo.remove();
    finalizar.remove();
    formulario2.remove();
    reservar.remove();
    volver.remove();
}

function crear_botones(){
remover();
contenedor.appendChild(reservar);
contenedor.appendChild(consultar);
contenedor.appendChild(cancelar);
contenedor.appendChild(finalizar);
}

function salir(){
    remover()
    parrafo.innerText="Gracias por usar nuestro sistema de gestión de turnos!";
    contenedor.appendChild(parrafo);      
    console.log("Clases de la semana:");
    console.log(array_clases);

    console.log("Alumnos del Estudio:");
    console.log(array_alumnos_estudio);

    array_alumnos_estudio.forEach(alumno => console.log("Las clases reservadas por", alumno.nombre, alumno.apellido, "son:", consulta_clases_alumno(alumno)));
    array_clases.forEach(clase => console.log("Alumnos en la clase del", clase.dia, "a las", clase.horario, ":", alumnos_en_la_clase(clase.dia,clase.horario)));
    localStorage.removeItem("alumno1");
}

function cancelo(){
    let clase1 = JSON.parse(localStorage.getItem("clase1"))
    let alumno1 = JSON.parse(localStorage.getItem("alumno1"))
    clase1.alumnos.pop();
    alumno1.clases_reservadas.pop();
    alumno_molesto=array_alumnos_estudio.find(alumno=>alumno.email==alumno1.email)
    alumno_molesto.clases_reservadas.pop()
    remover()
    parrafo.innerText="Su turno ha sido cancelado.";
    contenedor.appendChild(parrafo);
    localStorage.removeItem("fecha clase");
    localStorage.removeItem("horario clase");
    contenedor.appendChild(aceptar);
    aceptar.addEventListener("click", crear_botones);
  }

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email=document.getElementById("email").value;
    if (localStorage.getItem("email")!=email){
        localStorage.removeItem("fecha clase");
        localStorage.removeItem("horario clase");
    }
    localStorage.setItem("nombre", nombre)
    localStorage.setItem("apellido", apellido)
    localStorage.setItem("email", email)
    let alumno1 = new Alumno(nombre,apellido,email,[]);
    actualizar_alumnos_estudio (alumno1)
    const alumno1JSON = JSON.stringify(alumno1);
    localStorage.setItem("alumno1", alumno1JSON);
    formulario.remove();
    welcome.remove();
    crear_botones();
})

reservar.addEventListener("click", () => {
    let alumno1 = JSON.parse(localStorage.getItem("alumno1"));
    remover();
    parrafo.innerText=`Por favor, complete los datos del turno que desea reservar.`
    contenedor.appendChild(parrafo);
    contenedor.appendChild(formulario2);
    contenedor.appendChild(volver); 
    volver.addEventListener("click", crear_botones)
    formulario2.addEventListener("submit", (e) => {
        e.preventDefault();
        const dia = document.getElementById("fecha_clase").value;
        const horario = document.getElementById("horario_clase").value;
        const clase1 = new Clase(dia, horario,[])
        actualizar_clase(clase1)
        let clases_del_dia_de_la_reserva=array_clases.filter(clase=>clase.dia==dia)
        let clase_a_reservar=clases_del_dia_de_la_reserva.find(clase=>clase.horario==horario)  
        clase1.alumnos=clase_a_reservar.alumnos;
        clase1.alumnos.push(alumno1);
        let alumno=array_alumnos_estudio.find(alumno=>alumno.email==alumno1.email)
        alumno.clases_reservadas.push(clase1)
        //Acá hubiera necesitado actualizar el JSON, pero el stringify me tira un error de circularidad si pongo este código:
    //     main.js:187 Uncaught TypeError: Converting circular structure to JSON
    // --> starting at object with constructor 'Object'
    // |     property 'clases_reservadas' -> object with constructor 'Array'
    // |     index 0 -> object with constructor 'Clase'
    // |     property 'alumnos' -> object with constructor 'Array'
    // --- index 0 closes the circle
    // at JSON.stringify (<anonymous>)
    // at HTMLFormElement.<anonymous> (main.js:187:30)
    //    Esta sería la línea en cuestión: alumno1.clases_reservadas=alumno.clases_reservadas

        let alumno1JSON=JSON.stringify(alumno1)
        localStorage.setItem("alumno1",alumno1JSON)
        const clase1JSON = JSON.stringify(clase1);
        localStorage.setItem("clase1", clase1JSON);
        localStorage.setItem("fecha clase", dia);
        localStorage.setItem("horario clase", horario);
        remover();
        parrafo.innerText = `${localStorage.getItem("nombre")}, su clase ha sido reservada para el ${dia} a las ${horario}!`;
        contenedor.appendChild(parrafo);
        contenedor.appendChild(aceptar);
        aceptar.addEventListener("click", salir);  
})    
})

  consultar.addEventListener("click", () => {
    remover()
    if (!localStorage.getItem("fecha clase")){
        parrafo.innerText=`${localStorage.getItem("nombre")}, Ud. aún no tiene turnos reservados!`;
    }
    else{
    parrafo.innerText=`${localStorage.getItem("nombre")}, Ud. tiene un turno reservado para el ${localStorage.getItem("fecha clase")} a las ${localStorage.getItem("horario clase")}.`}
    contenedor.appendChild(parrafo);
    contenedor.appendChild(aceptar); 
    aceptar.addEventListener("click", crear_botones)  
})

cancelar.addEventListener("click", () => {
    remover()
    if (!localStorage.getItem("fecha clase")){
        parrafo.innerText=`${localStorage.getItem("nombre")}, Ud. aún no tiene turnos reservados!`;
        contenedor.appendChild(parrafo);
        contenedor.appendChild(aceptar); 
        aceptar.addEventListener("click", crear_botones) 
    }
    else{
    
    parrafo.innerText=`${localStorage.getItem("nombre")}, Ud. cancelará el turno reservado para el ${localStorage.getItem("fecha clase")} a las ${localStorage.getItem("horario clase")}.`
    contenedor.appendChild(parrafo);
    contenedor.appendChild(confirmar); 
    contenedor.appendChild(volver); 
    volver.addEventListener("click", crear_botones);
    confirmar.addEventListener("click", cancelo);}  
})

finalizar.addEventListener("click", () => {
    remover();
    salir();
  })  

