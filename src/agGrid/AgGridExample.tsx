import {observer} from "mobx-react";
import {AgGridReact} from "ag-grid-react";
import {useCallback, useEffect, useMemo, useState} from "react";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import useFetch from "../hook/useFetch";
import Apis from "../Apis";

const AgGridExample = () => {
    const apis = Apis.instance;

    const [ data, stop, pageUp ] = useFetch(apis.getDataList);

    const [ lastRow, setLastRow ] = useState<Element | null>(null);

    const handleObserver = useCallback((entries: any) => {
        const target = entries[0];
        if (target.isIntersecting) {
            pageUp();
            setLastRow(null);
        }
    }, [lastRow]);

    useEffect(() => {
        if (lastRow) {
            const observer = new IntersectionObserver(handleObserver, { root: null });
            if (lastRow) observer.observe(lastRow);
        }
    }, [handleObserver, lastRow]);

    const handleScrollEnd = useCallback(() => {
        if(stop) return;
        const row = document.getElementsByClassName('ag-row-last')[1];
        if (row) {
            setLastRow(row);
        }
    },[])

    const colDefs = useMemo(() => {
        return ([
            { field: 'userId' },
            { field: 'id' },
            { field: 'title' },
            { field: 'completed' },
        ])
    }, []);

    const defaultColDefs = useMemo(() => {
        return {
            resizable: true,
        }
    },[])

    return (
    <div className="ag-theme-alpine" style={{height: 600, width: 800}}>
        <AgGridReact
            rowData={data}
            columnDefs={colDefs}
            defaultColDef={defaultColDefs}
            onBodyScrollEnd={handleScrollEnd}
            suppressScrollOnNewData={true}
        />
    </div>
    )
}

export default observer(AgGridExample);