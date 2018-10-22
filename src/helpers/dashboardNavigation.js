document.addEventListener("readystatechange", () => {
  if (document.readyState === "complete") {
    console.log("dash nav2");
    Object.values(document.getElementsByClassName("menu--item")).forEach(
      item => {
        item.addEventListener("click", ev => {
          // remove class "active" from all summary divs
          Object.values(document.getElementsByClassName("menu--item")).forEach(
            item => {
              item.parentElement.classList.remove("active");
            }
          );
          // remove class "active" from all chart divs
          Object.values(document.getElementsByClassName("chart")).forEach(
            item => {
              item.classList.remove("active");
            }
          );
          // add class "active" to targeted summary div
          item.parentElement.classList.add("active");
          // add class "active" to corresponding chart div
          let chart;
          if ((chart = document.querySelector(".chart." + item.dataset.type))) {
            chart.classList.add("active");
          }
        });
      }
    );
  }
});
