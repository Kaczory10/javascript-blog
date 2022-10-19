"use strict";
const titleClickHandler = function (event) {
  event.preventDefault();

  const clickedElement = this;
  const clickedElementActive = clickedElement.classList.contains("active");
  console.log("Link was clicked!");

  const activeLinks = document.querySelectorAll(".titles a.active");

  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  console.log("clickedElement:", clickedElement);

  const activeArticles = document.querySelectorAll("article.post.active");

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }

  const href = clickedElement.getAttribute("href");

  const article = document.querySelector(href);

  if (clickedElementActive == false) {
    article.classList.add("active");
    clickedElement.classList.add("active");
  }
};

const links = document.querySelectorAll(".titles a");

for (let link of links) {
  link.addEventListener("click", titleClickHandler);
}
