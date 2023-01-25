import axios from "axios";
const baseUrl = "https://v42-bears-team-35-production.up.railway.app/";

const callItems = () => {
  axios 
  .get (`https://v42-bears-team-35-production.up.railway.app/items`)
  .then (response => {
    console.log('Response:', response);
  })
  .catch (error => {
    console.log('Error:', error) 
  })
}


