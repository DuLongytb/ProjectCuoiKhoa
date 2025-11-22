fetch("ttps://cors-anywhere.herokuapp.com/https://ghibliapi.vercel.app/films")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    document.body.innerHTML = data
      .map(
        (film) => `
      <div style="border:1px solid #ccc; padding:10px; margin:10px;">
        <h2>${film.title}</h2>
        <p>${film.description}</p>
      </div>
    `
      )
      .join("");
  })
  .catch((err) => console.error(err));
