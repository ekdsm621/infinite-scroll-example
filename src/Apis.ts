import axios from "axios";

class Apis {
    static _instance: Apis;

    static get instance() {
        if(!Apis._instance){
            Apis._instance = new Apis();
        }
        return Apis._instance;
    }

    async getDataList<T>(offset:number, limit:number):Promise<T[]> {
        return axios({
            url:'http://localhost:8000/todo/',
            method:'get',
            params: {
                _columnName: 'id',
                _start: offset,
                _limit: limit,
            }
        }).then(res => res.data)
    }
}

export default Apis;