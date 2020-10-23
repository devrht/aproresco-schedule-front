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
