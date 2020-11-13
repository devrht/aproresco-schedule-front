import React, { useState, useEffect } from 'react'
import { PageHeader, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { enableDeleting, enableAssigning } from '../../Action-Reducer/Student/action'
import { bridgeManagement, persistManagement, bridgeStatus } from '../../services/Student'

function Settings(props) {
    const dispatch = useDispatch();
    const [deleting, setDeleting] = useState(false);
    const [assigning, setAssigning] = useState(false);
    const [bridge, setBridge] = useState(false);
    const [persist, setPersist] = useState(false);
    const deletingStatus = useSelector((state) => {
      return state.Student.enableDeleting;
    })
    const assigningStatus = useSelector((state) => {
      return state.Student.enableAssigning;
    })

    useEffect(()=>{

        bridgeStatus().then(data => {
          console.log(data)
          setBridge(data.bridge);
          setPersist(data.persist);
        });
    }, [] );

    const onEnableDeleting = () => {
        setDeleting(!deleting);
        dispatch(enableDeleting(!deleting))
      }
    
      const onEnableAssigning = () => {
        setAssigning(!assigning);
        dispatch(enableAssigning(!assigning))
      }
    
      const onBridgeAction = (status) => {
        bridgeManagement(status).then(data => {
          console.log(data);
          setBridge(status);
        });
      }
    
      const onPersistAction = (status) => {
        persistManagement(status).then(data => {
          console.log(data);
          setPersist(status);
        });
      }

    return (
        <div>
            <PageHeader
                ghost={false}
                title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px'}}>Settings</p>}
                extra={[
                ]}
            >

                <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                    <Button 
                        style={{ flex: 1, marginRight: "20px", height: "60px", color: "white", backgroundColor: "#1890ff" }} 
                        onClick={() => onEnableDeleting() }> { deletingStatus ? 'Disable' : 'Enable' } deleting </Button>

                    <Button 
                        style={{ flex: 1, marginRight: "20px", height: "60px", color: "white", backgroundColor: "#1890ff" }} 
                        onClick={() => onEnableAssigning() }> { assigningStatus ? 'Disable' : 'Enable' } reassigning </Button>

                    <Button 
                        style={{ flex: 1, marginRight: "20px", height: "60px", color: "white", backgroundColor: "#1890ff" }} 
                        onClick={() => onBridgeAction(!bridge) }> { !bridge ? 'Open' : 'Close' } the bridge </Button>

                    <Button 
                        style={{ flex: 1, marginRight: "20px", height: "60px", color: "white", backgroundColor: "#1890ff" }} 
                        onClick={() => onPersistAction(!persist) }> { !persist ? 'Enable' : 'Disable' } Persistence </Button>
                </div>

            </PageHeader>
        </div>
    )
}

export default Settings;
