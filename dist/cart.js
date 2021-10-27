window.onload = () => {

    function getCartItems(){
        let data = JSON.parse(localStorage.getItem("products"));
        createCartItems(data);
    }

    function createCartItems(data){
        let cartItems = document.querySelector("#cartItems");
        data.forEach(element => {
            console.log(element)
            let section = document.createElement("section");
            section.classList.add('OneItem');
            let titel = document.createElement("h3");
            let img = document.createElement("img");
            titel.innerHTML = element.title;
            img.src = `../img/${element.src}`;
            section.appendChild(titel);
            section.appendChild(img);
            cartItems.appendChild(section);

        });
    }

    getCartItems();
}