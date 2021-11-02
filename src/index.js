import SweetAlert from "sweetalert2";

window.onload = () => {

    let GlobalData;
    let GlobalId;

    async function getData() {
        let request = await fetch("./data.json");
        return await request.json();
    }

    function makeDataGlobal(data) {
        GlobalData = data;
        console.log(GlobalData);
        createElements();
    }

    function createElements() {
        GlobalData.shoes.forEach(element => {
            let container = document.createElement("div");
            let content = document.createElement("div");
            let link = document.createElement("a");
            let content_overlay = document.createElement("div");
            let img = document.createElement("img");
            let content_details = document.createElement("div");
            let h3 = document.createElement("h3");
            let price = document.createElement("p");

            link.href = '';
            link.addEventListener('click', function () {
                showMoreInfo(event);
            });
            img.src = `../img/${element.src}`;
            h3.innerHTML = element.title;
            price.innerHTML = `€${element.price}`;

            container.classList.add("container");
            container.classList.add("toggle");
            content.classList.add("content");
            content_overlay.classList.add("content-overlay");
            img.classList.add("content-image");
            content_details.classList.add('content-details');
            link.setAttribute("id", element.id);

            link.appendChild(content_overlay);
            link.appendChild(img);
            content_details.appendChild(h3);
            content_details.appendChild(price);
            link.appendChild(content_details);
            content.appendChild(link);
            container.appendChild(content);
            document.getElementById("items").appendChild(container);

        });
    }

    function showMoreInfo(event) {
        event.preventDefault();
        hideAllContent();
        let currentClicked = event.currentTarget.id;
        GlobalId = currentClicked;
        console.log(GlobalId);
        let parent = document.getElementById("clicked");
        let img = document.createElement("img");
        let title, price, source;
        for (let i of GlobalData.shoes) {
            if (currentClicked == i.id) {
                source = i.src;
                title = i.title;
                price = i.price;
                console.log(source);
            }
        }
        img.src = `../img/${source}`;
        parent.appendChild(img);
        createText(title, price);
    }

    function createText(title, price) {
        let parent = document.getElementById("clicked");
        let div = document.createElement("div");
        let priceTag = document.createElement("h3");
        priceTag.innerHTML = `€${price}`;
        priceTag.classList.add("price");
        let text = `Shank dolor tri-tip tongue filet mignon nisi culpa nostrud leberkas chicken shoulder jowl burgdoggen.  
        Pastrami sint culpa landjaeger magna.  Incididunt sed beef chicken, cupim occaecat do porchetta boudin.  Occaecat excepteur pastrami 
        id voluptate.  Hamburger bacon mollit, elit eiusmod alcatra et tongue corned beef short ribs venison laboris shoulder.`;
        div.classList.add("content-clicked");
        let name = document.createElement("h3");
        name.innerHTML = title;
        let p = document.createElement("p");
        p.innerHTML = text;
        let addToCart = document.createElement("button");
        addToCart.classList.add("cartButton");
        addToCart.innerHTML = 'add to cart';
        addToCart.addEventListener('click', addItemToCart);

        div.appendChild(priceTag);
        div.appendChild(name);
        div.appendChild(p);
        div.appendChild(addToCart);
        parent.appendChild(div);
        document.getElementById("clicked").scrollIntoView();//scroll to below so the item is more in the middle

    }

    function addItemToCart() {
        for (let i of GlobalData.shoes) {
            if (GlobalId == i.id) {
                let products = [];
                if (localStorage.getItem('products')) {
                    products = JSON.parse(localStorage.getItem('products'));
                }
                products.push({
                    'productId': i.id,
                    'title': i.title,
                    'src': i.src,
                    'price': i.price
                });
                localStorage.setItem('products', JSON.stringify(products));
                showSuccesPopup();
            }
        }
    }

    function showSuccesPopup() {
        SweetAlert.fire({
            icon: 'success',
            title: 'succes',
            text: 'Succesfully added to cart!'
        });
    }


    function hideAllContent() {
        document.getElementById("items").replaceChildren();
    }

  

    getData().then(data => makeDataGlobal(data));
}