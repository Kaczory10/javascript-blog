const templates = {
  articleLink: Handlebars.compile(
    document.querySelector('#template-article-link').innerHTML
  ),
  articleLinkInline: Handlebars.compile(
    document.querySelector('#template-article-link-inline').innerHTML
  ),
  tagCloudLink: Handlebars.compile(
    document.querySelector('#template-tag-cloud-link').innerHTML
  ),
  authorCloudLink: Handlebars.compile(
    document.querySelector('#template-author-cloud-link').innerHTML
  ),
};
('use strict'); //plik w strick mode"zie
const titleClickHandler = function (event) {
  //argument parametr funcji event
  event.preventDefault(); //usuwam domyslne działanie

  const clickedElement = this;
  console.log('Link was clicked!');

  const activeLinks = document.querySelectorAll('.titles a.active');

  clickedElement.classList.add('active');
  /* [DONE] add class 'active' to the clicked link */

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* [DONE] remove class 'active' from all article links  */

  console.log('clickedElement:', clickedElement);

  const activeArticles = document.querySelectorAll('article.post.active');
  const href = clickedElement.getAttribute('href');
  /* get 'href' attribute from the clicked link */
  const article = document.querySelector(href);
  /* find the correct article using the selector (value of 'href' attribute) */

  article.classList.add('active');
  /* add class 'active' to the correct article */

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optTagsListSelector = '.list.tags',
  optAuthorsListSelector = '.list.authors';

function generateTitleLinks(customSelector = '') {
  const titleList = document.querySelector(optTitleListSelector);

  function clearMessages() {
    titleList.innerHTML = '';
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

  let html = '';

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    /* get the article id */
    /* Done */

    const articleTitleElement = article.querySelector(optTitleSelector);
    /* find the title element */
    /* ... */

    const articleTitle = articleTitleElement.innerHTML;
    /* get the title from the title element */
    /* Done */

    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);
    /* create HTML of the link */
    /* Done */

    html = html + linkHTML;
    /* insert link into html variable */
  }

  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags() {
  let allTags = {};
  /* [NEW] create a new variable allTags with an empty object */
  const articles = document.querySelectorAll(optArticleSelector);
  /* find all articles */
  for (let article of articles) {
    /* START LOOP: for every article: */

    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    /* find tags wrapper */

    const articleTags = article.getAttribute('data-tags'); // "cat cactus scissors"
    /* get tags from data-tags attribute */

    const articleTagsArray = articleTags.split(' '); // ["cat", "cactus", "scissors"]
    /* split tags into array */

    let html = '';
    /* make html variable with empty string */

    for (let tag of articleTagsArray) {
      const linkHTMLData = { id: tag, title: tag };
      const linkHTML = templates.articleLink(linkHTMLData);

      /* create HTML of the link */
      /* generate HTML of the link */
      /* Done */

      html = html + linkHTML;
      /* add generated code to html variable */

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1; // jeżeli nie ma np klucza scissors to nadajesz mu klucz o wartości 1
      } else {
        allTags[tag]++; // np wartość scissors z 1 robi się 2
      }
    }

    /* END LOOP: for each tag */
    tagsWrapper.innerHTML = html;
    /* insert HTML of all the links into the tags wrapper */

    const tagList = document.querySelector(optTagsListSelector);
    /* [NEW] find list of tags in right column */

    const allTagsData = { tags: [] };
    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams),
      });
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    console.log(allTagsData);
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
  }
}
generateTags();
generateAuthors();

function tagClickHandler(event) {
  event.preventDefault();
  /* prevent default action for this event */
  const clickedElement = this;
  console.log('Link was clicked!');
  /* make new constant named "clickedElement" and give it the value of "this" */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const tag = href.replace('#tag-', '');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tags = document.querySelectorAll('a.active[href^="#tag-"]');
  /* find all tag links with class active */

  for (let tagArticle of tags) {
    /* START LOOP: for each active tag link */
    tagArticle.classList.remove('active');
    /* remove class active */
  }
  /* END LOOP: for each active tag link */
  const tagArticles = document.querySelectorAll('a[href^="' + href + '"]');
  // const tagArticle = document.querySelectorAll('a.active[href^="#tag-"]');
  /* find all tag links with "href" attribute equal to the "href" constant */
  for (let tag of tagArticles) {
    /* START LOOP: for each found tag link */
    tag.classList.add('active');
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

    link.addEventListener('click', tagClickHandler);
    /* add tagClickHandler as event listener for that link */
  }

  /* END LOOP: for each link */
}

addClickListenersToTags();
addClickListenersToAuthors();

function generateAuthors() {
  const allAuthors = {};

  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const authorsWrapper = article.querySelector(optArticleAuthorSelector);
    const articleAuthor = article.getAttribute('data-author');
    const linkHTMLData = { id: articleAuthor, title: articleAuthor };
    const linkHTML = templates.articleLinkInline(linkHTMLData);
    authorsWrapper.innerHTML = 'by ' + linkHTML;

    if (!allAuthors[articleAuthor]) {
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
  }

  console.log(allAuthors);

  const authorsList = document.querySelector(optAuthorsListSelector);

  // let allAuthorsHTML = "";
  const allAuthorsData = { authors: [] };

  const authorsParams = calculateAuthorsParams(allAuthors);
  console.log('authorsParams:', authorsParams);

  for (let author in allAuthors) {
    // const authorLink = '<li><a href="#author-' + author + '" class="' + calculateAuthorsClass(allAuthors[author], authorsParams) + '">' + author + ' (' + allAuthors[author] + ') ' + '</a></li>';

    // allAuthorsHTML += authorLink;
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
    });
  }

  authorsList.innerHTML = templates.authorCloudLink(allAuthorsData);
  // authorsList.innerHTML = allAuthorsHTML;
}

function authorClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;

  const href = clickedElement.getAttribute('href');

  const author = href.replace('#author-', '');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const authors = document.querySelectorAll('a.active[href^="#author-"]');
  /* find all tag links with class active */

  for (let author of authors) {
    /* START LOOP: for each active tag link */
    author.classList.remove('active');
    /* remove class active */
  }
  /* END LOOP: for each active tag link */
  const authorArticles = document.querySelectorAll('a[href^="' + href + '"]');
  /* find all tag links with "href" attribute equal to the "href" constant */
  for (let author of authorArticles) {
    /* START LOOP: for each found tag link */
    author.classList.add('active');
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
function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };
  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateAuthorsParams(authors) {
  const params = { max: 0, min: 999999 };
  for (let author in authors) {
    if (authors[author] > params.max) {
      params.max = authors[author];
    }
    if (authors[author] < params.min) {
      params.min = authors[author];
    }
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  console.log(normalizedCount, normalizedMax);
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  return optCloudClassPrefix + classNumber;
}

// function calculateAuthorsClass(count, params) {
//   const normalizedCount = count - params.min;
//   const normalizedMax = params.max - params.min;
//   console.log(normalizedCount, normalizedMax);
//   const percentage = normalizedCount / normalizedMax;
//   const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

//   return optCloudClassPrefix + classNumber;
// }
