import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css';
import '../../Assets/Layout.css'
import { useHistory } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { GoogleLogout } from 'react-google-login';
const { Sider, Content } = Layout;

function LayoutOfApp({ children }, props) {
  //const { path, params } = props.match;
  const history = useHistory();
  const [pathName,setPathName]=useState(window.location.pathname);
  const [logged, setLogged] = useState(true);
  useEffect(()=>{
    if(localStorage.getItem('startDate') == null || localStorage.getItem('toStart') == null) {
      localStorage.setItem('startDate', '1900-01-01')
      localStorage.setItem('toStart', '01/01/1900%2000:00:00')
    }

    if(localStorage.getItem('endDate') == null || localStorage.getItem('toEnd') == null) {
      localStorage.setItem('endDate', '2030-01-01')
      localStorage.setItem('toEnd', '01/01/2030%2000:00:00')

    }

    setPathName(window.location.pathname);
    console.log(pathName);
  },[window.location.pathname])

  return (
    <Layout>
      {
        logged ? 
        <Sider className="sider">
          <h1>Appui Scolaire</h1>
          <Menu theme="dark" mode="inline" selectedKeys={[pathName]}>
            <Menu.Item key="/studentlist" icon={<UserOutlined />} onClick={() => { history.push('/studentlist') }}>
              Student List
            </Menu.Item>
            <Menu.Item key="/teacherlist" icon={<VideoCameraOutlined />} onClick={() => { history.push('/teacherlist') }}>
              Teacher List
              </Menu.Item>
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
