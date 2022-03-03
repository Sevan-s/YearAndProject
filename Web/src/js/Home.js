import React, { useState } from "react";
import axios from 'axios'
import '../css/toggleSwitch.css';

var apiSave = []

function switchAction(name) {
    axios.post("http://localhost:8080/user/switchAction/", {"name": name});
}

function HomeWidget(props) {
    const [api, setApi] = useState(apiSave);
    props.api.then(data => {setApi(data); apiSave = data});

    return (   
        <div className="serviceWrapper" id="widgetParent">
            {api?.map(item => {
                if (item.activate === true) {
                    return (
                        <div className="widget">
                            <h3>{item.name}</h3>
                            <label class="switchToggle">
                                <input type="checkbox" onClick={() => {switchAction(item.name)} } checked/>
                                <span class="slider round"></span>
                            </label>
                            <p class="desc">{item.desc}</p>
                        </div>
                    )
                } else {
                    return (
                        <div className="widget">
                            <h3>{item.name}</h3>
                            <label class="switchToggle">
                                <input type="checkbox" onClick={() => switchAction(item.name) } />
                                <span class="slider round"></span>
                            </label>
                            <p class="desc">{item.desc}</p>
                        </div>
                    )}
                }
            )}
        </div>
    )
}

export default HomeWidget