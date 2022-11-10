import { load } from 'cheerio';
import { BookType } from '../types/book.types';
import * as qs from 'node:querystring';
import { AxiosInstance } from 'axios';
import { HttpException, HttpStatus } from '@nestjs/common';
export async function findBookFromInternet(isbn: string, axios: AxiosInstance) {
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
    const url = 'https://www.bookfinder.com/search/?' + query;
    // eslint-disable-next-line no-var
    var data = await axios.get(url, {
      timeout: 20 * 1000, // 20 sec
    });
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
  return {
    isbn,
    title,
    image,
    summary,
    authors,
  } as BookType;
}
