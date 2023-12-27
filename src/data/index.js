import {url,base} from '../api/Url'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
const verifikasi = async () => 
{
    await axios.get(url + "user", {
        headers: {
            'Authorization': 'Bearer ' + Cookies.get('token')
        }
    }).then(() => {   
          return true
    }).catch((error) => {
        if (error.request.status == 401) {
           return false
        }
    })
}

export { verifikasi }