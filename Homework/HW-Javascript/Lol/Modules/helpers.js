function $c(element){
    return document.createElement(element)
}

function $g(element){
    let el = document.querySelectorAll(element)
    return el.length == 1 ? el[0] : el
}

export {$c , $g}