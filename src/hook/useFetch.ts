import {useCallback, useEffect, useState} from "react";
import {TodoType} from "../agGrid/TodoType";
import Apis from "../Apis";
// FIXME TodoType 뿐만 아니라 다양한 모델에 재사용 가능하도록 하는 방안을 고민해보면 좋을 것 같아요. (generic + fetcher 함수를 인자로 받기 등)
const useFetch = ():[TodoType[], boolean, () => void, () => void] => {

    const apis = Apis.instance;

    const [ data, setData ] = useState<TodoType[]>([]);
    const [ stop, setStop ] = useState(false);
    const [ offset, setOffset ] = useState(0);
    const limit = 40;

    useEffect(() => {
        !stop && fetchData();
    },[offset]);
    // FIXME initData와 중복코드,
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