import axios from "axios";
const baseUrl = "https://v42-bears-team-35-production.up.railway.app/";

const fetchItem = async () => {
  const url = `${baseUrl}/items`;
  const response = await axios.get(url);
  console.log(response.data);
};



