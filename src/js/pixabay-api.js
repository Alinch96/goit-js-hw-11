

const API_KEY = '44405804-89924783490777dc17a96fec8';
const API_URL = 'https://pixabay.com/api/?';


export function getImages(queryValue) {
const params = new URLSearchParams({
  key: API_KEY,
  q: queryValue,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
});

    return fetch(API_URL + params)
      .then(response => {
        if (!response.ok) throw new Error(response.status);
        return response.json();
      });
}