function mejorParidad (num){
    if (num%2==0){
        return "El numero " + num + " es par"
    }else{
        return "El numero " + num + " no es par"
    }
}

console.log(mejorParidad(12))