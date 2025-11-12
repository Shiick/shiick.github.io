function importHTML(){
    let componentsPath = "./resources/views/components/";
    var toImport = document.querySelectorAll("[s-import]");
    toImport.forEach(async (imp) => {
        let component = componentsPath + imp.getAttribute("s-import");
        const response = await fetch(component);
        var content = await response.text();
        Array.from(imp.attributes).forEach((attr) => {
            if (!attr.nodeName.toLowerCase().startsWith("s-") && !attr.nodeName.toLowerCase() != "s-import") {
                return;
            }
            content = content.replaceAll("{{" + attr.nodeName.toLowerCase().replace("s-", "") + "}}", attr.nodeValue);
        });
        const element = createElementFromHTML(content);
        if (element.length > 1) {
            throw new Error("Only 1 top node is allowed when import HTML from another file!");
        }
        imp.replaceWith(element[0]);
    });
}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.childNodes;
}

/*function addCSS() { // only required if using Tailwind, if using regular CSS, just declare your stylesheet normally!
    fetch('./resources/css/index.css').then(response => response.text()).then(css => {
        const style = document.createElement('style');
        style.setAttribute('type', 'text/tailwindcss');
        style.textContent = css;
        document.head.appendChild(style);
    });
}*/

importHTML();
//addCSS();