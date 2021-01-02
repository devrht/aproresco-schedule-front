import React, { useState, useEffect } from 'react'
import { PageHeader, Button, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { enableDeleting, enableAssigning } from '../../Action-Reducer/Student/action'
import { bridgeManagement, persistManagement, bridgeStatus } from '../../services/Student'
import { getTeacherProfile } from '../../services/Teacher'
const { Option } = Select;

function Settings(props) {
  const dispatch = useDispatch();
  const [deleting, setDeleting] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [bridge, setBridge] = useState(false);
  const [persist, setPersist] = useState(false);
  const [teacher, setTeacher] = useState(null);
  const [tenant, setTenant] = useState(null);
  const deletingStatus = useSelector((state) => {
    return state.Student.enableDeleting;
  })
  const assigningStatus = useSelector((state) => {
    return state.Student.enableAssigning;
  })

  useEffect(() => {
    setTenant(JSON.parse(localStorage.getItem('tenant')));
    bridgeManagement(3).then(data => {
    });

    getTeacherProfile().then(data => {
      setTeacher(data);
    });
  }, []);

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
        title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px' }}>Settings</p>}
        extra={[
        ]}
      >

        <div style={{ display: "flex", flexDirection: "row", flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Button
            style={{ flex: 1, marginRight: "20px", height: "60px", color: "white", backgroundColor: "#1890ff" }}
            onClick={() => onEnableDeleting()}> {deletingStatus ? 'Disable' : 'Enable'} deleting </Button>

          <Button
            style={{ flex: 1, marginRight: "20px", height: "60px", color: "white", backgroundColor: "#1890ff" }}
            onClick={() => onEnableAssigning()}> {assigningStatus ? 'Disable' : 'Enable'} reassigning </Button>

          <Button
            style={{ flex: 1, marginRight: "20px", height: "60px", color: "white", backgroundColor: "#1890ff" }}
            onClick={() => onBridgeAction(bridge ? 0 : 1)}> {!bridge ? 'Open' : 'Close'} the bridge </Button>

          <Button
            style={{ flex: 1, marginRight: "20px", height: "60px", color: "white", backgroundColor: "#1890ff" }}
            onClick={() => onPersistAction(!persist)}> {!persist ? 'Enable' : 'Disable'} Persistence </Button>
        </div>
        {
          teacher != null ?
            <div style={{ display: "flex", flexDirection: "column", flex: 1, marginTop: '50px' }}>
              <h1>Tenants</h1>
              <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                <Select defaultValue={tenant} size={'large'} style={{ width: '100%' }} onChange={(e) => { setTenant(e); localStorage.setItem("tenant", JSON.stringify(e)) }}>
                  {teacher.tenants ? teacher.tenants.map(tenant => {
                    return (
                      <Option value={tenant.key}>{tenant.displayName}</Option>
                    )
                  }) : null
                  }
                </Select>
              </div>
            </div> : null}

      </PageHeader>
    </div>
  )
}

export default Settings;
