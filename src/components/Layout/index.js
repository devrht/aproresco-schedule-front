import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css';
import '../../Assets/Layout.css'
import { useHistory } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import {
  UserOutlined,
  VideoCameraOutlined,
  SettingOutlined,
  MessageOutlined
} from '@ant-design/icons';
import { enableDeleting, enableAssigning } from '../../Action-Reducer/Student/action'
import { bridgeManagement, persistManagement, bridgeStatus } from '../../services/Student'

const { Sider, Content } = Layout;

function LayoutOfApp({ children }, props) {


  const dispatch = useDispatch();
  const history = useHistory();
  const [pathName,setPathName]=useState(window.location.pathname);
  const [logged, setLogged] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
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

    let today =  new Date();
    today.setDate(today.getDate() - 1 )
    let day = today.getDate() < 10 ? '0'+(today.getDate()) : (today.getDate())
    let month = today.getMonth()+1 < 10 ? '0'+(today.getMonth()+1) : (today.getMonth()+1);
    let year = today.getFullYear();
    console.log('Date: '+year+'-'+month+'-'+day)
    if(localStorage.getItem('startDate') == null || localStorage.getItem('toStart') == null) {
      localStorage.setItem('startDate', year+'-'+month+'-'+day)
      localStorage.setItem('toStart', month+'/'+day+'/'+year+'%2000:00:00')
    }

    today =  new Date();
    today.setDate(today.getDate() + 1);
    day = today.getDate() < 10 ? '0'+(today.getDate()) : (today.getDate())
    month = today.getMonth()+1 < 10 ? '0'+(today.getMonth()+1) : (today.getMonth()+1);
    year = today.getFullYear();

    if(localStorage.getItem('endDate') == null || localStorage.getItem('toEnd') == null) {
      localStorage.setItem('endDate', year+'-'+month+'-'+day)
      localStorage.setItem('toEnd', month+'/'+day+'/'+year+'%2000:00:00')

    }

    setPathName(window.location.pathname);
    console.log(pathName);
  },[window.location.pathname])

  const onShowSettings = () => {
    setShowSettings(!showSettings);
  }

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
    <Layout>
      {
        logged ? 
        <Sider className="sider">
          <h1>Appui Scolaire</h1>
          <Menu theme="dark" mode="inline" selectedKeys={[pathName]} style={{ width: '900px' }}>
            <Menu.Item key="/studentlist" icon={<UserOutlined />} onClick={() => { history.push('/studentlist') }}>
              Student List
            </Menu.Item>
            <Menu.Item key="/teacherlist" icon={<VideoCameraOutlined />} onClick={() => { history.push('/teacherlist') }}>
              Teacher List
            </Menu.Item>
            <Menu.Item key="/settings" icon={<SettingOutlined />} onClick={() => { history.push('/settings') }}>
              Settings
            </Menu.Item>
            <Menu.Item key="/shortmessages" icon={<MessageOutlined />} onClick={() => { history.push('/short-messages') }}>
              Short Messages
            </Menu.Item>
            {/* <div style={{ marginLeft: '40px', lineHeight: '30px', display: showSettings ? 'block' : 'none'}}>
              <p onClick={() => { onEnableDeleting() }} style={{ cursor: "pointer" }}>
                { deletingStatus ? 'Disable' : 'Enable' } deleting
              </p>
              <p onClick={() => { onEnableAssigning() }} style={{ cursor: "pointer" }}>
                { assigningStatus ? 'Disable' : 'Enable' } reassigning
              </p>
              <p onClick={() => { onBridgeAction(!bridge) }} style={{ cursor: "pointer" }}>
                { !bridge ? 'Open' : 'Close' } the bridge
              </p>
              <p onClick={() => { onPersistAction(!persist) }} style={{ cursor: "pointer" }}>
                { !persist ? 'Enable' : 'Disable' } Persistence
              </p>
            </div> */}
          </Menu>
        </Sider> : null
      }
      <Layout className="childLayout">
        <Content className="content">
          <div className="content-div">{children}</div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutOfApp
