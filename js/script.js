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

const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles";

function generateTitleLinks() {
  const titleList = document.querySelector(optTitleListSelector);

  function clearMessages() {
    titleList.innerHTML = "";
  }

  clearMessages();
  /* remove contents of titleList */
  /* Done */

  const articles = document.querySelectorAll(optArticleSelector);
  /* find all the articles and save them to variable: articles */
  /* Done */

  let html = "";

  for (let article of articles) {
    const articleId = article.getAttribute("id");
    /* get the article id */
    /* Done */

    const articleTitleElement = article.querySelector(optTitleSelector);
    /* find the title element */
    /* ... */

    const articleTitle = articleTitleElement.innerHTML;
    /* get the title from the title element */
    /* Done */

    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      "</span></a></li>";
    /* create HTML of the link */
    /* Done */

    html = html + linkHTML;
    /* insert link into html variable */
  }

  titleList.innerHTML = html;
  const links = document.querySelectorAll(".titles a");

  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}

generateTitleLinks();
