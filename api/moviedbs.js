import { apiKey } from "../constants";

const baseURL = `api_App/customer`

const loginURL = `${apiKey}/${baseURL}/login.php`;
const movieURL = `${apiKey}/${baseURL}/movie.php`;
const favouriteURL = `${apiKey}/${baseURL}/favourite.php`;
const isFavouriteURL = `${apiKey}/${baseURL}/isFavourite.php`;
const getFavouriteURL = `${apiKey}/${baseURL}/getfavourite.php`;
const searchURL = `${apiKey}/${baseURL}/search.php`;


export {loginURL,movieURL,favouriteURL,isFavouriteURL,getFavouriteURL,searchURL};