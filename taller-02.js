function findMax(lista) {
    if (lista.lenght === 1) {
        return lista[0]
    }

    let mayor = lista[0]

    for (let index = 1; index < lista.length; index++) {
        if (lista[index] > mayor) {
            mayor = lista[index]
        }
        
    }

    return mayor
}

function includes(lista,numero) {

    for (let index = 0; index < lista.length; index++) {
        if (lista[index] === numero) {
            return true
        }
        
    }
    return false
}

function sum(lista) {
    let suma = lista[0]
    for (let index = 1; index < lista.length; index++) {
        suma = suma + lista[index]
    }
    return suma
}

function missingNumbers(lista) {
    min = findMin(lista)
    max = findMax(lista)
    let missing = []

    for (let index = min; index < max; index++) {
        numero = index
        if (!includes(lista, numero)) {
            missing.push(numero)
        }
    }
    return missing
}
a = [1,5,10,15,-20,255,30,40,50,60,-310]
b = [3,17,-1,4,-19]
c = [7,2,4,6,3,9]

console.log(missingNumbers(c))


//auxiliar
function findMin(lista) {
    if (lista.lenght === 1) {
        return lista[0]
    }

    let menor = lista[0]

    for (let index = 1; index < lista.length; index++) {
        if (lista[index] < menor) {
            menor = lista[index]
        }
        
    }

    return menor
}

