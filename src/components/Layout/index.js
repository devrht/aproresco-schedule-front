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
    setPathName(window.location.pathname);
    console.log(pathName);
  },[window.location.pathname])

  return (
    <Layout>
      {
        logged ? 
        <Sider className="sider">
          <h1>Student-Schedular</h1>
          {console.log("inner pathename:", pathName)}
          <Menu theme="dark" mode="inline" selectedKeys={[pathName]}>
            <Menu.Item key="/teacherlist" icon={<VideoCameraOutlined />} onClick={() => { history.push('/teacherlist') }}>
              Teacher List
              </Menu.Item>
            <Menu.Item key="/studentlist" icon={<UserOutlined />} onClick={() => { history.push('/studentlist') }}>
              Student List
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
