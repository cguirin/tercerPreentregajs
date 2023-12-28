
class Persona {
    constructor(nombre, apellido, peso, altura) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.peso = peso;
        this.altura = altura;
        this.imc = peso / ((altura / 100) * (altura / 100));
    }

    getNombreCompleto() {
        return `${this.nombre} ${this.apellido}`;
    }
}


// con esta funcion obtengo los datos del localStorage al recargar la página

const personasJSON = localStorage.getItem("personas");
const personas = personasJSON ? JSON.parse(personasJSON) : [];
console.log('Datos del localStorage:', personas);

document.querySelector('#calcular').addEventListener("click", function () {
    const nombre = document.querySelector("#nombre").value;
    const apellido = document.querySelector("#apellido").value;
    const peso = parseFloat(document.querySelector("#peso").value);
    const altura = parseFloat(document.querySelector("#altura").value);
    const persona = new Persona(nombre, apellido, peso, altura);
    personas.push(persona);
    console.log('Datos de la persona:', persona);


    // Guardo los datos en el localStorage y los convierto en Json 

    localStorage.setItem("personas", JSON.stringify(personas));
    console.log('Datos guardados en el localStorage:', personas);

    // en la siguiente funcion reemplace el uso de condicionales if y else por e uso de operador ternario para simplificar la funcion


    const imc = persona.imc;
    const resultado =
        imc < 18.5 ? "Bajo peso" :
            imc < 25 ? "Peso Normal" :
                imc < 30 ? "Sobrepeso" :
                    imc <= 40 ? "Obesidad" :
                        "Obesidad Mórbida";
    console.log('IMC y resultado:', imc, resultado);

    document.querySelector("#resultado").innerText = `Tu IMC es: ${imc} - ${resultado}`;
    document.querySelector("#datos-persona").innerHTML = `Nombre completo: ${persona.getNombreCompleto()}, peso: ${persona.peso} kg, altura: ${persona.altura} cm`;
});

function generarPlanNutricional(personas) {
    return function () {
        personas.forEach(persona => {
            console.log(`Plan nutricional para ${persona.getNombreCompleto()}, ${persona.peso} kg y ${persona.altura} cm de altura:`);
        });
    };
}

const obesidadMorbida = personas.filter(persona => persona.imc > 40);
console.log("Personas con obesidad mórbida:", obesidadMorbida);
generarPlanNutricional(obesidadMorbida)();

