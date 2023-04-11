import { load } from 'cheerio';
import { BookType } from '../types/book.types';
import * as qs from 'node:querystring';
import { AxiosInstance } from 'axios';
import { HttpException, HttpStatus } from '@nestjs/common';

export async function findBookFromInternet(
  isbn: string,
  axios: AxiosInstance,
): Promise<BookType | { found: false }> {
  return Promise.any([
    searchBookFromOpenLibrary(isbn, axios),
    searchBookFromBooksCouter(isbn, axios),
    searchFromBookFinder(isbn, axios),
    searchBookFromAbeBooks(isbn, axios),
  ])
    .then((data) => data)
    .catch((_) => ({ found: false }));
}

async function searchBookFromAbeBooks(
  isbn: string,
  axios: AxiosInstance,
): Promise<BookType> {
  const url = `https://www.abebooks.com/servlet/SearchResults?kn=${isbn}&sts=t&cm_sp=SearchF-_-topnav-_-Results`;

  const { data } = await axios.get(url, { timeout: 30 * 1000 });

  const $ = load(data);
  const title = $('.title').first().text().trim();
  const authors = $('.author').first().text().trim();
  const image = $('div[data-cy=listing-image] img').first().attr('src');
  if (!title) return Promise.reject();

  console.log('searched book from Abe books');
  return { image, title, authors, isbn, summary: '' };
}

async function searchBookFromBooksCouter(isbn: string, axios: AxiosInstance) {
  const url = `https://api.bookscouter.com/v4/prices/sell/${isbn}?base64=1`;

  const { data } = await axios.get(url, {
    timeout: 30 * 1000,
    headers: {
      'content-type': 'application/ld+json; charset=utf-8',
    },
  });
  if (!data.book || !data.book.title.length) return Promise.reject();

  console.log('searched book from books counter');

  return {
    isbn,
    title: data.book.title,
    image: data.book.image,
    authors: data.book.author + '',
    summary: '',
  } as BookType;
}

export async function searchBookFromBookFinder4U(
  isbn: string,
  axios: AxiosInstance,
) {
  const url = `http://www.bookfinder4u.com/IsbnSearch.aspx?isbn=${isbn}&mode=direct&second_search=true`;

  try {
    const data = await axios.get(url, { timeout: 500 * 1000 });
    const $ = load(data.data);
    const image = $('.solid_box_large_font img').attr('src');
    console.log('searched book from finder 4u');
  } catch (err) {
    return Promise.reject();
  }
}

async function searchFromBookFinder(isbn: string, axios: AxiosInstance) {
  const options = {
    keywords: isbn,
    currency: 'USD',
    destination: 'np',
    mode: 'isbn',
    lang: 'en',
    st: 'sh',
    ac: 'qr',
    submit: true,
  };
  const query = qs.stringify(options);
  try {
    const url = 'https://www.bookfinder.com/search?' + query;
    // eslint-disable-next-line no-var
    var data = await axios.get(url, {
      timeout: 20 * 1000, // 20 sec
    });
    console.log('searched book from books finder');
  } catch (err) {
    if (err.code === 'ECONNABORTED') {
      throw new HttpException(
        'ERROR.AXIOS_TIMEOUT',
        HttpStatus.REQUEST_TIMEOUT,
      );
    }
    throw new HttpException('ERROR.UNKNOWN', HttpStatus.SERVICE_UNAVAILABLE);
  }
  const $ = load(data.data);
  const title = $('#describe-isbn-title').text().trim();
  const summary = $('#bookSummary').text().trim();
  const authors = $('span[itemprop=author]').text();
  const image = $('img[id=coverImage]').attr('src');
  const error = $('p[align=center]').text();
  const found = !error;
  if (!found || !title.length) {
    return Promise.reject();
  }
  return {
    isbn,
    title,
    image,
    summary,
    authors,
  } as BookType;
}

async function searchBookFromOpenLibrary(
  isbn: string,
  axios: AxiosInstance,
): Promise<BookType> {
  function generateImageUri(image: string) {
    const imagePlaceholder = `https://covers.openlibrary.org/b/id/${image}-M.jpg`;
    return imagePlaceholder;
  }

  const searchByIsbn = `https://openlibrary.org/isbn/${isbn}.json`;

  const { data } = await axios.get(searchByIsbn, { timeout: 30 * 1000 });
  const title = data.title;
  const image = generateImageUri(data.covers[0]);

  const authors =
    (await Promise.all(
      data.authors.map(async (each: { key: string }) => {
        return axios
          .get(`https://openlibrary.org/authors/${each.key}.json`)
          .then((res) => {
            return res.data.name;
          });
      }),
    )) + '';
  return { title, isbn, authors, image, summary: '' };
}
