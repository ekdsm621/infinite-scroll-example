import {observer} from "mobx-react";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import useFetch from "../hook/useFetch";

const GridExample = () => {

    const [ data, stop, pageUp, initData ] = useFetch();

    const ref = useRef(null);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        initData();
    }, []);

    const handleObserver = useCallback((entries: any) => {
        const target = entries[0];
        console.log(target);
        if (!stop && !loading && target.isIntersecting) {
            setLoading(true);
            pageUp();
        }
    }, [ref.current, loading, pageUp]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, { root: null });
        if (ref.current) observer.observe(ref.current);
    }, [handleObserver, data]);

    const renderList = useMemo(() => {
        const list = data?.map((d, index) => (
            <div key={index} ref={data.length - 1 === index? ref : null}>
                <span style={{width:'30px', display:'inline-block'}}>{d.id}</span>
                <span style={{width:'30px', display:'inline-block'}}>{d.userId}</span>
                <span style={{width:'500px', display:'inline-block'}}>{d.title}</span>
                <span style={{width:'100px', display:'inline-block'}}>{d.completed?'completed':''}</span>
            </div>
        ))
        setLoading(false);
        return list;
    },[data]);

    return (
        <div className={'container'}>
            {renderList}
        </div>
    )
}

export default observer(GridExample);