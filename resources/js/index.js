function importHTML(){
    let componentsPath = "./resources/views/components/";
    var toImport = document.querySelectorAll("[data-import]");
    console.log(toImport);
    toImport.forEach(async (imp) => {
        let component = componentsPath + imp.getAttribute("data-import");
        console.log(component);
        const response = await fetch(component);
        const content = await response.text();
        imp.insertAdjacentText('beforeend', content);
    });
}

importHTML();