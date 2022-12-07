import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30609342-292210cfdd781fb5e072ce5d7';
// const filter = '&image_type=photo&orientation=horizontal&per_page=12';

// function fetchPhotos(photoName, page = 1) {
//   return fetch(
//     `${BASE_URL}?q=${photoName}&page=${page}&key=${API_KEY}${filter}`
//   ).then(response => response.json());
// }
//////////////////////////////////////////////////////

async function fetchPhotos(photoName, page = 1) {
  try {
    const params = new URLSearchParams({
      key: API_KEY,
      page: `${page}`,
      per_page: 12,
      q: `${photoName}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    });
    const response = await axios.get(`${BASE_URL}?${params}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default fetchPhotos;
