import axios from "axios";
import { useEffect,  } from "react";

export default function Connect() {

   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/book/getbooks");
                
                console.log(response.data);
            } catch (error) {
                console.error(error);
                alert("Spring Boot API is not connected");
            }
        };

        fetchData();
    }, []);

    return (
        
            <h1>Backend Connectivity</h1>
           
    );
}