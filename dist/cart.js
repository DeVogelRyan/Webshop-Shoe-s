window.onload = () => {


   function checkStorage(){
       if(!localStorage.hasOwnProperty("products")){
           let parent = document.getElementById("cartItems");
           let message = document.createElement("p");
           message.innerHTML = "You don't have items in your shopping cart";
           parent.appendChild(message);
       }
       else {
        let data = JSON.parse(localStorage.getItem('products'));
        data.forEach(element => {
            let parent = document.getElementById("cartItems");
            let div = document.createElement("div");
            let article = document.createElement("article");
            let title = document.createElement("h3");
            let picture = document.createElement("img");
            let price = document.createElement("p");
            title.innerHTML = element.title;
            picture.src = `../img/${element.src}`;
            price.innerHTML = "€" + element.price;
            article.appendChild(title);
            article.appendChild(price)
            div.appendChild(article);
            div.appendChild(picture);
            parent.appendChild(div);
            console.log(element.src)
            
           });
       }
   }

   checkStorage();
}