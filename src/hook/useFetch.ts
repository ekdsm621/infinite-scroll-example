import {useCallback, useEffect, useState} from "react";
import {TodoType} from "../agGrid/TodoType";
import Apis from "../Apis";

const useFetch = ():[TodoType[], boolean, () => void, () => void] => {

    const apis = Apis.instance;

    const [ data, setData ] = useState<TodoType[]>([]);
    const [ stop, setStop ] = useState(false);
    const [ offset, setOffset ] = useState(0);
    const limit = 40;

    useEffect(() => {
        !stop && fetchData();
    },[offset]);

    const fetchData = useCallback(() => {
        apis.getDataList(offset, limit).then(res => {
            if( res.data.length < limit ) setStop(true);
            setData([...data, ...res.data]);
        });
    },[data, offset, limit]);

    const pageUp = useCallback(() => {
        if(!stop) {
            setOffset(offset + limit);
            console.log(offset);
        }
    },[offset, limit, stop]);

    const initData = useCallback(() => {
        apis.getDataList(offset, limit).then(res => {
            if( res.data.length < limit ) setStop(true);
            setData([...res.data]);
        });
    },[offset, limit]);

    return [ data, stop, pageUp, initData ];
}

export default useFetch;