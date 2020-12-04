import { Drawer, Button,Toggle } from 'rsuite';
export default function Settings({show, setShowSettings}){
    return (
        <Drawer className="Settings" show={show} onHide={()=>setShowSettings(false)}>
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
            <Button onClick={()=>setShowSettings(false)} appearance="primary">Confirm</Button>
            <Button onClick={()=>setShowSettings(false)} appearance="subtle">Cancel</Button>
          </Drawer.Footer>
        </Drawer>
    )
}