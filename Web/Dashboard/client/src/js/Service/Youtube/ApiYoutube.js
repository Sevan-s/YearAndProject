import axios from "axios";
const KEY = "AIzaSyAe5El0mTZIJrl5p4g9gccyE_P03G4iCEY";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 5,
    key: KEY
  },
  headers: {}
});