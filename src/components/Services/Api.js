import axios from 'axios';

const API_KEY = '34729435-1f68c86a9e1e838777c5cf5d0';

const fetchImages = async (searchQuery, page) => {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
        searchQuery
      )}&page=${page}&per_page=12`
    );

    return response.data.hits;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchImages;
