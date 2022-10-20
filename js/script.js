"use strict";
const titleClickHandler = function (event) {
  event.preventDefault();
  
  const clickedElement = this;
  console.log("Link was clicked!");

  const activeLinks = document.querySelectorAll(".titles a.active");

  if (!clickedElement.classList.contains("active")) {
    clickedElement.classList.add("active");
  }

  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  console.log("clickedElement:", clickedElement);

  const activeArticles = document.querySelectorAll("article.post.active");
  const href = clickedElement.getAttribute("href");
  const article = document.querySelector(href);

  if (!article.classList.contains("active")) {
    article.classList.add("active");
  }

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }
};

const links = document.querySelectorAll(".titles a");

for (let link of links) {
  link.addEventListener("click", titleClickHandler);
}
