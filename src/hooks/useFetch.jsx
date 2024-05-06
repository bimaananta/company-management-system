import Api from "../config/Api";

export default async function fetchData(method, url, callback, id){
    try{
        const response = await Api.get(`${method === "index" ? `v1/${url}` : `v1/${url}/${id}`}`, {
            headers: {
                "Authorization": `Bearer ${localStorage["token"]}`,
            }
        });
        callback(prevState => {
            if(!response.data.data){
                return prevState;
            }

            return response.data.data;
        });
    }catch(err){
        console.log(`Error while fetching ${url} data : ${err.message}`);
    }
}