function resolvedor (a,b,c,positivo){
    let operacion = b**2 - 4*a*c
    if(positivo == 1){
        return (-b + operacion**(1/2)) / 2*a
    }else{
        return (-b - operacion**(1/2)) / 2*a
    }
}

console.log(resolvedor(1,5,4,1))