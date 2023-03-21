import { useState, useEffect } from "react";
import axios from "axios";


 const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: { ...query },
    headers: {
      "X-RapidAPI-Key": '8f568ae783msh88250340ff3e8c6p18b000jsn7acdb396a544',
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await axios.request(options);
      // console.log(response)
      // const response = { data : { data : [1,2,3,4,5,6,7,8,9,0]}}

      setData(response.data.data);
    } catch (error) {
    console.log(error)
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const reFetchData = () =>{
  setIsLoading(true)
  fetchData();
  setIsLoading(false)
  
  }
  
  return { data , isLoading , error , reFetchData}
};

export default useFetch