import React, {useState} from "react";
import SettingModal from "./Header/SettingsModal";
import Time from "./Time";


export default function Setting(props) {
    console.log(props.valueInputTime)
    let userTime = props.valueInputTime

    // let [getSettings, isGetSettings] = useState()
    // let [setSettings, isSetSettings] = useState()
    const [getSettings, setSettings] = useState(2)
    if (localStorage.getItem('userTime')){
        getSettings = JSON.parse(localStorage.getItem('setting'));
    } else{
        localStorage.setItem('userTime', JSON.stringify(setSettings))
    }
    return(
        <div>
        {console.log(setSettings)}
            <span>test</span>
            <SettingModal setSettings={setSettings} />
            <Time />

        </div>
    

    )
}

