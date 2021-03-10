import React, {useState} from "react";

export default function Setting(props) {
    console.log(props.valueInputTime)

    let [getSettings, setSettings] = useState()
    if (localStorage.getItem('setting')){
        getSettings = JSON.parse(localStorage.getItem('setting'));
    } else {
        getSettings = props.valueInputTime
        localStorage.setItem('setting', JSON.stringify(getSettings))
    }
    return(
        <div>
        {console.log(getSettings)}

            <span>hi</span>
        </div>

    )
}

