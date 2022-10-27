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
  optTitleListSelector = ".titles",
  optArticleTagsSelector = ".post-tags .list",
  optArticleAuthorSelector = ".post-author";

function generateTitleLinks(customSelector = "") {
  const titleList = document.querySelector(optTitleListSelector);

  function clearMessages() {
    titleList.innerHTML = "";
  }

  clearMessages();
  /* remove contents of titleList */
  /* Done */

  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  console.log(optArticleSelector + customSelector);
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

    generateAuthors(article);
    addClickListenersToAuthors();
  }

  titleList.innerHTML = html;
  const links = document.querySelectorAll(".titles a");

  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}

generateTitleLinks();

function generateTags() {
  const articles = document.querySelectorAll(optArticleSelector);
  /* find all articles */
  for (let article of articles) {
    /* START LOOP: for every article: */

    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    /* find tags wrapper */

    const articleTags = article.getAttribute("data-tags");
    /* get tags from data-tags attribute */

    const articleTagsArray = articleTags.split(" ");
    /* split tags into array */

    let html = "";
    /* make html variable with empty string */

    for (let tag of articleTagsArray) {
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + "</a></li>";
      /* create HTML of the link */
      /* generate HTML of the link */
      /* Done */

      html = html + linkHTML;
      /* add generated code to html variable */
    }

    tagsWrapper.innerHTML = html;
    /* insert HTML of all the links into the tags wrapper */
  }
}
generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  const clickedElement = this;
  console.log("Link was clicked!");
  /* make new constant named "clickedElement" and give it the value of "this" */
  const href = clickedElement.getAttribute("href");
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const tag = href.replace("#tag-", "");
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tags = document.querySelectorAll('a.active[href^="#tag-"]');
  /* find all tag links with class active */

  for (let tagArticle of tags) {
    /* START LOOP: for each active tag link */
    tagArticle.classList.remove("active");
    /* remove class active */
  }
  /* END LOOP: for each active tag link */
  const tagArticles = document.querySelectorAll('a[href^="' + href + '"]');
  // const tagArticle = document.querySelectorAll('a.active[href^="#tag-"]');
  /* find all tag links with "href" attribute equal to the "href" constant */
  for (let tag of tagArticles) {
    /* START LOOP: for each found tag link */
    tag.classList.add("active");
    /* add class active */
  }
  /* END LOOP: for each found tag link */

  generateTitleLinks('[data-tags~="' + tag + '"]');
  /* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToTags() {
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  /* find all links to tags */

  for (let link of tagLinks) {
    /* START LOOP: for each link */

    link.addEventListener("click", tagClickHandler);
    /* add tagClickHandler as event listener for that link */
  }

  /* END LOOP: for each link */
}

addClickListenersToTags();

function generateAuthors(article) {
  const articleAuthor = article.getAttribute('data-author');
  const authorTitleElement = article.querySelector(optArticleAuthorSelector);
  const authorHTML = '<a href="#author-' + articleAuthor + '">by ' + articleAuthor + '</a>'

  authorTitleElement.innerHTML = authorHTML;
}

function authorClickHandler(event) {
  const clickedElement = this;

  const href = clickedElement.getAttribute('href');

  const author = href.replace("#author-", "");

  /* make a new constant "tag" and extract tag from the "href" constant */
  const authors = document.querySelectorAll('a.active[href^="#author-"]');
  /* find all tag links with class active */

  for (let author of authors) {
    /* START LOOP: for each active tag link */
    author.classList.remove("active");
    /* remove class active */
  }
  /* END LOOP: for each active tag link */
  const authorArticles = document.querySelectorAll('a[href^="' + href + '"]');
  // const tagArticle = document.querySelectorAll('a.active[href^="#tag-"]');
  /* find all tag links with "href" attribute equal to the "href" constant */
  for (let author of authorArticles) {
    /* START LOOP: for each found tag link */
    author.classList.add("active");
    /* add class active */
  }
  /* END LOOP: for each found tag link */

  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  console.log(authorLinks);
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}
