function peorParidad(num){
    const numeros = [0,1,2,3,4,5,6,7,8,9,10]
    const salidas = [
        "El numero 0 es par",
        "El numero 1 no es par",
        "El numero 2 es par",
        "El numero 3 no es par",
        "El numero 4 es par",
        "El numero 5 no es par",
        "El numero 6 es par",
        "El numero 7 no es par",
        "El numero 8 es par",
        "El numero 9 no es par",
        "El numero 10 es par"
    ]

    let encontrado = 0
    for (let index = 0; index < numeros.length; index++) {
       if (numeros[index] === num) {
         encontrado = 1
       }
    }

    if (encontrado === 1) {
        for (let index = 0; index < numeros.length; index++) {
            if (numeros[index] === num) {
                return salidas[index]
            } 
        }
    }else{
        return "El numero tiene que estar entre 0 y 10"
    }
}

console.log(peorParidad(4))