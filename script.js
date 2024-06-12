const fetchBooks = () => {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      console.log(response);
      //contollo che la risposta sia positiva tramite lettura della proprietà .ok
      if (response.ok) {
        //restituiamo una nuova promise che è l'operazione svolta dal .json()
        return response.json();
      } else {
        //lanciamo un errore per fare in modo che il programma salti il prossimo .then() per andare a finire nel .catch()
        throw new Error("Errore nel reperire i dati");
      }
    })
    .then((booksObj) => {
      //qui siamo sicuri di essere sincronizzati con l'arrivo dei dati, perche questo .then() scatterà solo dopo la risoluzione del .json()
      //quindi adesso si può usare il dato contentuto nel parametro come ci pare per la DOM MANIPULATION
      console.log(booksObj);

      const row = document.getElementById("cardContainer");

      booksObj.forEach((book) => {
        const col = document.createElement("div");
        col.classList.add("col");

        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = book.img;
        img.alt = book.title;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.innerText = book.title;

        const cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.innerText = `${book.price} €`;

        const buttonscarta = document.createElement("a");
        buttonscarta.classList.add("btn");
        buttonscarta.classList.add("btn-danger");
        buttonscarta.innerText = "Scarta";
        buttonscarta.addEventListener("click", () => {
          col.remove();
        });

        const buttonCart = document.createElement("a");
        buttonCart.classList.add("btn");
        buttonCart.classList.add("btn-success");
        buttonCart.classList.add("ms-1");
        buttonCart.innerText = "Compra ora";

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(buttonscarta);
        cardBody.appendChild(buttonCart);

        card.appendChild(img);
        card.appendChild(cardBody);

        col.appendChild(card);
        row.appendChild(col);
      });
    })
    .catch((err) => console.log(err));
};

window.addEventListener("DOMContentLoaded", () => {
  fetchBooks();
});
