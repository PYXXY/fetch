const container = document.createElement("div");
container.classList.add("container");
document.body.appendChild(container);

const columns = ["ID", "KIND", "BODY"];

columns.forEach((title) => {
  const yellowDiv = document.createElement("div");
  yellowDiv.classList.add("yellow");

  const header = document.createElement("div");
  header.classList.add("header");
  const h1 = document.createElement("h1");
  h1.textContent = title;
  header.appendChild(h1);

  const blueDiv = document.createElement("div");
  blueDiv.classList.add("blue");

  yellowDiv.appendChild(header);
  yellowDiv.appendChild(blueDiv);
  container.appendChild(yellowDiv);
});

const requestURL = "https://www.googleapis.com/books/v1/volumes?q=harry+potter"
const request = async() => {
    try {
        const response = await fetch(requestURL)
        if (!response.ok) {
            throw new Error("Error fetching the data")
        } else {
            const convertor = await response.json();
            const blue = document.querySelectorAll(".blue");
            const firstDiv = blue[0];
            const secondDiv = blue[1];
            const thirdDiv = blue[2];
            const data = convertor.items[0].volumeInfo;

            convertor.items.forEach((item) => {
                console.log("convertor", item);
                const paragrafID = document.createElement("p");
                const paragrafKind  = document.createElement("p");
                paragrafID.textContent = item.id[0];
                paragrafKind.textContent = item.kind[0];
                firstDiv.appendChild(paragrafID);
                secondDiv.appendChild(paragrafKind);
            });

            const bodyElement = [{label: "Language", value: data.language},
                {label: "Title", value: data.title},
                {label: "Saleability", value: convertor.items[0].saleInfo.saleability},
                {label: "Description", value: data.description},
                {label: "PageCount", value: data.pageCount},
                {label: "PublishedDate", value: data.publishedDate},
                {label: "Thumbnail", value: `<img src = "${data.imageLinks.thumbnail}" alt = "Book" />`},
                {label: "Authors", value: data.authors},
                {label: "Country", value: convertor.items[0].saleInfo.country}];
            const list = document.createElement("ol");
            bodyElement.forEach((item) => {
                const li = document.createElement("li");
                li.textContent = `${item.label}: ${item.value}`;
                list.appendChild(li);
            })
            thirdDiv.appendChild(list);
        }
    } catch (error) {
        console.error("Error has occured", error)
    }

}
request()