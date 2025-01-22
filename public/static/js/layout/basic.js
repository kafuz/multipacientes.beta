const changeNav=()=>
{
    // Obtener la URL actual
    var currentUrl = window.location.pathname;
    // Obtener el elemento <a> correspondiente a la URL actual y añadirle una clase
    var linkElement = document.querySelector('a[href="' + currentUrl + '"]');
    if (linkElement) 
        linkElement.parentElement.classList.add('navOn');
}