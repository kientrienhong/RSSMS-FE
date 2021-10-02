import axios from "axios";

export default axios.create({
  baseUrl: "https://localhost:44304/api/v1",
});
