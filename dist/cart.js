window.onload = () => {

    function addDropDown(index) {

        let parent = document.getElementById("items" + index);
        let amountDiv = document.createElement("div");
        amountDiv.classList.add("ammount");
        let select = document.createElement("select");
        select.name = "amount";
        select.classList.add("amount");

        for (let i = 0; i < 10; i++) {

            let option = document.createElement("option");
            option.value = i;
            option.innerHTML = i;
            select.appendChild(option);
        }
        amountDiv.appendChild(select)
        parent.appendChild(amountDiv);
        console.log(index);

    }

    function checkStorage() {
        if (!localStorage.hasOwnProperty("products")) {
            let parent = document.getElementById("cartItems");
            let message = document.createElement("p");
            message.innerHTML = "You don't have items in your shopping cart";
            parent.appendChild(message);
        } else {
            let data = JSON.parse(localStorage.getItem('products'));
            const ids = data.map(o => o.productId)
            const filtered = data.filter(({
                productId
            }, index) => !ids.includes(productId, index + 1))
            console.log(filtered);
            let i = 0;
            filtered.forEach(element => {

                let parent = document.getElementById("cartItems");
                let div = document.createElement("div");
                div.id = "items" + i;
                let article = document.createElement("article");
                let title = document.createElement("h3");
                let picture = document.createElement("img");
                let price = document.createElement("p");
                title.innerHTML = element.title;
                picture.src = `../img/${element.src}`;
                price.innerHTML = "€" + element.price;
                article.appendChild(title);
                article.appendChild(price);

                div.appendChild(article);
                div.appendChild(picture);
                parent.appendChild(div);
                addDropDown(i);
                i++;
            });
        }
    }

    checkStorage();
}