import axios from "axios";


export default axios.create({
    baseURL:"https://text-translator2.p.rapidapi.com",
    headers: {
        'x-rapidapi-key': '0d8e5a56admsh3ab38ef73bdc313p13f45ejsnbb73a6966989',
        'x-rapidapi-host': 'text-translator2.p.rapidapi.com'
      },
});