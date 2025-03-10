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



const requestURL = "http://127.0.0.1:5500/index.html"
const request = async() => {
    const response = await fetch(requestURL)
    try {
        if (!response.ok) {
            throw new Error("Error fetching the data")
        } else {
            const convertor = await response .json()
            console.log(convertor.items);
            convertor.items.forEach(items => {
                console.log("convertor", items);
            });
        }
    } catch (error) {
        console.error("Error has occured", error)
    }

}
request()