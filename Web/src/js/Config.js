import React, { useState } from "react";
import axios from 'axios'
import '../css/toggleSwitch.css';

var apiSave = []

function switchReaction(act, reac) {
    axios.post("http://localhost:8080/user/switchReaction/", {"action": act, "reaction": reac});
}

function ConfigWidget(props) {
    const [api, setApi] = useState(apiSave);
    props.api.then(data => {setApi(data); apiSave = data});

    return (   
        <div>
            {api?.map(item => {
                return (
                    <div className="widgetReaction">
                        <h3>{item.name}</h3>
                        {item.reaction_allow.map(reac => {
                            if (item.reaction.includes(reac))
                                return (
                                    <div>
                                        <p>{reac}</p>
                                        <label class="switchToggle">
                                            <input type="checkbox" onClick={() => {switchReaction(item.name, reac)}} checked/>
                                            <span class="slider round"></span>
                                        </label>
                                    </div>
                                )
                            return (
                                <div>
                                    <p>{reac}</p>
                                    <label class="switchToggle">
                                        <input type="checkbox" onClick={() => {switchReaction(item.name, reac)}}/>
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                )}
            )}
        </div>
    )
}

export default ConfigWidget