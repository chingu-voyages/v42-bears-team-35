import axios from "axios";
const baseUrl = "https://v42-bears-team-35-production.up.railway.app/";

const getItems = async () => {
  const getResponse = await axios
    .get(`${baseUrl}/items`)
    .then((response) => console.log('Response:', response))
    .catch((err) => console.log('Error:', err) );
  return getResponse;
};

 module.export = { getItems }