const apiFull = 'https://api.thecatapi.com/v1/breeds';
const apiSearch = 'https://api.thecatapi.com/v1/images/search';
const API_KEY =
  'live_J1c3ReKXpbII84HmPX4RyPejOXkcqD0fyEejmLwc7SlwdX9GizKFc0O7vazMR0yY';

  export function fetchBreeds() {
  return fetch(apiFull, {
    headers: {
      'x-api-key': API_KEY,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.warn(error);
    });
}

export function fetchCatByBreed(breedId) {
  return fetch(`${apiSearch}?breed_ids=${breedId}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.warn(error);
    });
}
