import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {AgGridExample} from "./agGrid";
import GridExample from "./grid/GridExample";

function App() {
  const [count, setCount] = useState(0)

  return (
    <GridExample />
  )
}

export default App
