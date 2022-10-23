"use strict";
const titleClickHandler = function (event) {
  event.preventDefault();

  const clickedElement = this;
  console.log("Link was clicked!");

  const activeLinks = document.querySelectorAll(".titles a.active");

  clickedElement.classList.add("active");
  /* [DONE] add class 'active' to the clicked link */

  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }
  /* [DONE] remove class 'active' from all article links  */

  console.log("clickedElement:", clickedElement);

  const activeArticles = document.querySelectorAll("article.post.active");
  const href = clickedElement.getAttribute("href");
  /* get 'href' attribute from the clicked link */
  const article = document.querySelector(href);
  /* find the correct article using the selector (value of 'href' attribute) */

  article.classList.add("active");
  /* add class 'active' to the correct article */

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }
};

const links = document.querySelectorAll(".titles a");

for (let link of links) {
  link.addEventListener("click", titleClickHandler);
}
