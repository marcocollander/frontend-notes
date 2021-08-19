const nav = document.querySelector('.nav');
const btn = document.querySelector('.bar__btn-icon');

btn.addEventListener('click', () => {
  nav.classList.toggle('nav--active');
})

nav.addEventListener('click', () => {
  nav.classList.toggle('nav--active');
})


const optArticleSelector = '.post';
const optTitleSelector = '.post__title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post__tags .list';
const optArticleAuthorSelector = '.post__author';

function generateTitleLinks(customSelector = '') {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let linkHtml = '';

  for (const article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');
    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* create HTML of the link */
    linkHtml += `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
  }
  /* insert link into titleList */
  titleList.innerHTML = linkHtml;
}

function titleClickHandler(event) {
  event.preventDefault();
  // The following line of code is used as a learning aid to avoid error
  // and increase the readability of the code
  const clickedElement = this; // Now "this" has a friendly name

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (const activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  // console.log('clckedElement:', clickedElement);
  clickedElement.classList.add('active');

  /*  [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .post.active');
  for (const activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const valueHrefAtribute = clickedElement.getAttribute('href');

  const idArticle = valueHrefAtribute.slice(1);

  /* find the correct article using the selector (value of 'href' attribute) */

  const article = document.getElementById(idArticle);

  /* add class 'active' to the correct article */
  article.classList.add('active');
}

function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (const article of articles) {
    /* find tags wrapper */
    const tagWrapperg = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (const tag of articleTagsArray) {
      /* generate HTML of the link */
      /* add generated code to html variable */
      html += `<li><a href="#tag-${tag}">${tag}</a></li> `;
    }
    /* END LOOP: for each tag */
    /* insert HTML of all the links into the tags wrapper */
    tagWrapperg.innerHTML = html;
  }
  /* END LOOP: for every article: */
}

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (const tag of activeTags) {
    /* remove class active */
    tag.classList.remove('active');
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tags = document.querySelectorAll(`a[href="#tag-${tag}"]`);

  /* START LOOP: for each found tag link */
  for (const tag of tags) {
    /* add class active */
    tag.classList.add('active');
  }
  /* END LOOP: for each found tag link */
  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks(`[data-tags~="${tag}"]`);
  addClickListenersToLinks();
}

function addClickListenersToLinks() {
  const links = document.querySelectorAll('.titles a');

  for (const link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

function addClickListenersToTags() {
  /* find all links to tags */
  const linksToTags = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (const link of linksToTags) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */
}

function generateAutors() {
  const articles = document.querySelectorAll(optArticleSelector);

  let html = '';
  const authorNames = [];

  for (const article of articles) {
    const author = article.getAttribute('data-author');
    authorNames.push(author);
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    html = `<a href="#tag-${author}">by ${author}</a>`;
    authorWrapper.innerHTML = html;
  }

  const setAuthors = new Set(authorNames);
  const arrayAuthorNames = [...setAuthors];

  html = '';

  for (const name of arrayAuthorNames) {
    html += `<li><a href="#tag-${name}">${name}</a></li>`;
  }

  const authorsList = document.querySelector('.list.authors');
  authorsList.innerHTML = html;
}

function authorClickHandler(event) {
  event.preventDefault();
  const clickElement = this;
  const href = clickElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (const tag of activeTags) {
    /* remove class active */
    tag.classList.remove('active');
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tags = document.querySelectorAll(`a[href="#tag-${tag}"]`);

  /* START LOOP: for each found tag link */
  for (const tag of tags) {
    /* add class active */
    tag.classList.add('active');
  }

  generateTitleLinks(`[data-author="${tag}"]`);
  addClickListenersToLinks();
}

function addClickListenersToAuthors() {
  /* find all links to tags */
  const linksToTags = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (const link of linksToTags) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
  }
  /* END LOOP: for each link */
}

generateTitleLinks();
generateTags();
addClickListenersToLinks();
addClickListenersToTags();
generateAutors();
addClickListenersToAuthors();


