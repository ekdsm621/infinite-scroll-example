import {useCallback, useEffect, useState} from "react";
import Apis from "../Apis";
const useFetch = <T>():[T[], boolean, () => void] => {

    const apis = Apis.instance;

    const [ data, setData ] = useState<T[]>([]);
    const [ stop, setStop ] = useState(false);
    const [ offset, setOffset ] = useState(0);
    const limit = 40;

    useEffect(() => {
        !stop && fetchData();
    },[offset]);

    const fetchData = useCallback(() => {
        apis.getDataList<T>(offset, limit).then(res => {
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