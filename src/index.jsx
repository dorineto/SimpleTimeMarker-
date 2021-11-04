import React, { useEffect, useState } from "react";
import { render, unstable_renderSubtreeIntoContainer } from "react-dom"
import { secondsToTimeString } from "./generalFucntions"


function TimerCounter(prop){
    let timeStr = secondsToTimeString(prop.totalSeconds);

    return (
        <p>{timeStr}</p>
    );
}

var _timerTimeoutId;

function Timer(prop){
    const [totalSeconds, setTotalSeconds] = useState(0);
    
    const [startedTimer, setStartedTimer] = useState(false);

    const [valueIndexSelMarkers, setValueIndexSelMarkers] = useState(0);

    const [currentIdMarkRegister, setCurrentIdMarkRegister] = useState(null);

    useEffect(() => {
        let selectMarker = prop.markers[valueIndexSelMarkers - 1];
        
        if(selectMarker === undefined){

            if(startedTimer){
                // TODO create a error/sucess component to show a message

                console.log(`Select a marker in order to start marking`);
                clearTimeout(_timerTimeoutId);
                setStartedTimer(false);
                setTotalSeconds(0);
            }
            
            return;
        }

        if(startedTimer){

            _timerTimeoutId = setTimeout(() => {
                                setTotalSeconds(totalSeconds + 1);
                              }, 1000);
            
            if(currentIdMarkRegister == null){
                // TODO API call to create new register with the marker and time stamp
                setCurrentIdMarkRegister(1);

                console.log(`Marker started a ${selectMarker.pause? "pause" : "task"} with`
                            +` ${selectMarker.description} (id=${selectMarker.id}) at ${(new Date()).toLocaleString()}`);
            }            

        }
        else if(!startedTimer){
            setTotalSeconds(0);

            if(currentIdMarkRegister != null){
                // TODO API call to mark the end of the open register 

                setCurrentIdMarkRegister(null);

                console.log(`Marker stoped the ${selectMarker.pause? "pause" : "task"}`
                           +` ${selectMarker.description} (id=${selectMarker.id}) at ${(new Date()).toLocaleString()}`);
            }
        }

    });

    let timerToggleHandle = () => {
        setStartedTimer(!startedTimer);
    }

    let selMarkerChangeHandle = () => {
        setValueIndexSelMarkers(document.querySelector("#selMakers").selectedIndex);
    }

    return (
        <div>
            <select id="selMakers" onChange={selMarkerChangeHandle}>
                <option value="">Value not select</option>
                {
                    prop.markers.map((val) => 
                        <option key={val.id} value={val.id}>{val.description}</option>
                    )
                }
            </select>
            <TimerCounter totalSeconds={totalSeconds} />
            <button id="btnTimerToggle" onClick={timerToggleHandle}>{startedTimer? "Pause" : "Start"}</button>
        </div>
    );
}

function TimeMarkerApp(){
    const [markers, setMarkers] = useState([]);

    if(markers.length === 0){
        let tempMarkersData = [
            {
                id: 1
                ,description: "OS1 - Teste 1"
                ,pause: false
            }
            ,{
                id: 2
                ,description: "Almoço"
                ,pause: true
            }
            ,{
                id: 3
                ,description: "OS2 - The quick brown fox jumps over the lazy dog"
                ,pause: false
            }
        ];

        // TODO API call to fatch the markers

        setMarkers(tempMarkersData);
    }

    return (
      <div>
          <Timer markers={markers}/>
      </div> 
    );
}

render(<TimeMarkerApp/>, document.querySelector("#app_root"));