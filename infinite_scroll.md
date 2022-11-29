# Infinite Scroll
- [Infinite Scroll](#infinite-scroll)
  - [IntersectionObserver](#intersectionobserver)
  - [In AgGrid](#in-aggrid)
  - [useFetch(): 데이터 로드](#usefetch-데이터-로드)

## IntersectionObserver
```javascript
const observer = new IntersectionObserver(handleObserver, options);
observer.observe(lastRow);
```
- 뷰포트와 설정한 타겟 요소가 교차하는지 관찰하는 기능
- 교차할 경우, callback 함수를 실행 
  
</br>

**마지막 행과 뷰포트가 교차되는 순간 데이터를 로드 하도록 하여 구현**
</br>

---
## In AgGrid
**1. 관찰 대상이 될 마지막 행 찾기**  
```javascript
const handleScrollEnd = useCallback(() => {
    if(stop) return;
    const row = document.getElementsByClassName('ag-row-last')[1];
    if (row) {
        setLastRow(row);
    }
},[])

<AgGridReact
    rowData={data}
    columnDefs={colDefs}
    defaultColDef={defaultColDefs}
    onBodyScrollEnd={handleScrollEnd}
    suppressScrollOnNewData={true}
/>
```
스크롤 위치에 따라 마지막 행(ag-row-last)이 존재하지 않는 경우에 대비해서 이벤트 발생시 가져오도록 함  
<h5>* BodyScrollEnd Event: 스크롤이 멈추면 발생하는 이벤트 </h5>

</br>


**2. IntersectionObserver 생성하여 교차 관찰** 
```javascript
useEffect(() => {
    if (lastRow) {
        const observer = new IntersectionObserver(handleObserver, { root: null });
        observer.observe(lastRow);
    }
}, [handleObserver, lastRow]);
```
lastRow와 뷰포트가 교차하는 순간 handleObserver 실행
 * root: 뷰포트, 기본적으로는 브라우저 뷰포트가 설정된다
 * 의미를 명확히 하기 위해 {root: document.querySelector('.ag-body-viewport')}로도 사용 가능

</br>


**3. 교차 순간, 데이터 로드** 
```javascript
const handleObserver = useCallback((entries: any) => {
    const target = entries[0];
    if (target.isIntersecting) {
        pageUp();
        setLastRow(null);
    }
}, [lastRow]);
```
---
## useFetch(): 데이터 로드
- data: grid에 사용될 데이터
- stop: 데이터를 모두 받아왔을 경우, true 리턴
- pageUp(): useFetch 내 state인 offset의 값을 증가시키고, 다음 데이터 묶음을 가져와 data에 추가 시킴

