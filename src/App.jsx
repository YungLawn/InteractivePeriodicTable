import { Route, Routes } from "react-router-dom"
import React, {Suspense, useState, useRef} from 'react';
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import { elements } from "./components/data/Elements";
// import StarRating from "./components/StarRating";
import EleLocByIndex from "./components/Activities/EleLocByIndex";
import ControlPanel from "./components/PeriodicTableControlPanel";
import PeriodicSandbox from "./components/PeriodicSandbox";
// import PeriodicSandbox from "./components/PeriodicSandboxNoButt";
import IsotopeActivity from "./components/Activities/IsotopeActivity";
import ElementLocation from "./components/Activities/ElementLocation";
import SortingActivity from "./components/Activities/SortingActivity";
import Acivity from './components/DragandDrop/Activity'
import './styles/controls.css'
import ElementLocation from "./components/Activities/ElementLocation";

function App() {
  const activityKey = new Array(elements.length).fill(false);
  const [sortedKey, setSortedKey] = useState(activityKey)

  const [elementIndex, setElementIndex] = useState(1);

  const [buttons, setButtons] = useState(
    Array.from({ length: elements.length }, (_, i) => ({
        id: elements[i].id,
        isOn: false,
        x: elements[i].x,
        y: elements[i].y,
    }))
  );
  const handleButtonState = newButtons => {setButtons(newButtons);};

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/testing" element={<SortingActivity elementIndex={elementIndex}/>} />
          <Route path="/table" element={
            <>
              <div className='controls'>
                <div className='controlpanel'>
                    <ControlPanel elements={elements} handleButtonState={handleButtonState}/>
                </div>
              </div>
              {/* <PeriodicSandbox buttons={buttons}/> */}
              <ElementLocation buttons={buttons}/>
            </>
          }/> */}
          {/* <Route path="/activity1" element={
            <>
              <div className='controls'>
                <div className='controlpanel'>
                    <ControlPanel elements={elements} handleButtonState={handleButtonState}/>
                </div>
              </div>
              <ElementLocation buttons={buttons}/>
            </>
          }/> */}
          <Route path="/activity1" element={ <EleLocByIndex elementIndex={elementIndex}/> }/>
          <Route path="/activity2" element={<Acivity sortedKey={sortedKey} setSortedKey={setSortedKey} elementIndex={elementIndex}/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
