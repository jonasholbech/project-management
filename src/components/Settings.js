import {useContext} from "react";
import { Drawer, Button,Toggle } from 'rsuite';
import { store } from "../models/store.js";
export default function Settings(){
  const { globalState, dispatch } = useContext(store);
    return (
        <Drawer size="xs" className="Settings" show={globalState.showSettings} onHide={()=>dispatch({type:"TOGGLE_SETTINGS"})}>
          <Drawer.Header>
            <Drawer.Title>Settings</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
              <fieldset><legend>Preferences</legend>
                <div className="setting">
                     Send me an email when I'm assigned to a task <Toggle />
                </div>
                <div className="setting">
                     Dark Mode <Toggle />
                </div>
                </fieldset>
          </Drawer.Body>
          <Drawer.Footer>
            <Button onClick={()=>dispatch({type:"TOGGLE_SETTINGS"})} appearance="primary">Confirm</Button>
            <Button onClick={()=>dispatch({type:"TOGGLE_SETTINGS"})} appearance="subtle">Cancel</Button>
          </Drawer.Footer>
        </Drawer>
    )
}