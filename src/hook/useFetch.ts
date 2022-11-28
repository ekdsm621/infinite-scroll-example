import {useCallback, useEffect, useState} from "react";
import {AxiosResponse} from "axios";
const useFetch = <T> (fetch:(offset:number, limit:number) => Promise<AxiosResponse<T[]>>):[T[], boolean, () => void] => {

    const [ data, setData ] = useState<T[]>([]);
    const [ stop, setStop ] = useState(false);
    const [ offset, setOffset ] = useState(0);
    const limit = 40;

    useEffect(() => {
        !stop && fetchData();
    },[offset]);

    const fetchData = useCallback(() => {
        fetch(offset, limit).then(res => {
            if( res.data.length < limit ) setStop(true);
            setData([...data, ...res.data]);
        });
    },[data, offset, limit]);

    const pageUp = useCallback(() => {
        if(!stop) {
            setOffset(offset + limit);
        }
    },[offset, limit, stop]);

    return [ data, stop, pageUp ];
}

export default useFetch;