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
  MessageOutlined,
  LogoutOutlined,
  CalendarOutlined,
  BookOutlined
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

const rootSubmenuKeys = ['teachers', 'students'];

function LayoutOfApp({ children }, props) {

  const history = useHistory();
  const [pathName, setPathName] = useState(window.location.pathname);
  const [logged, setLogged] = useState(true);
  const [openKeys, setOpenKeys] = React.useState(['sub1']);

  useEffect(() => {

    if (!logged) {
      document.body.classList.remove("img-bg");
      document.body.classList.remove("min-height-full");
      document.body.style.backgroundImage = null;
    }

    document.getElementById('root').style.height = '100%';

    let today = new Date();
    today.setDate(today.getDate() - 1)
    let day = today.getDate() < 10 ? '0' + (today.getDate()) : (today.getDate())
    let month = today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
    let year = today.getFullYear();
    console.log('Date: ' + year + '-' + month + '-' + day)
    if (localStorage.getItem('startDate') == null || localStorage.getItem('toStart') == null) {
      localStorage.setItem('startDate', year + '-' + month + '-' + day)
      localStorage.setItem('toStart', month + '%2F' + day + '%2F' + year + '%2000:00:00 -0500')
    }

    today = new Date();
    today.setDate(today.getDate() + 1);
    day = today.getDate() < 10 ? '0' + (today.getDate()) : (today.getDate())
    month = today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
    year = today.getFullYear();

    if (localStorage.getItem('endDate') == null || localStorage.getItem('toEnd') == null) {
      localStorage.setItem('endDate', year + '-' + month + '-' + day)
      localStorage.setItem('toEnd', month + '%2F' + day + '%2F' + year + '%2000:00:00 -0500')

    }

    let expireAt = new Date(localStorage.getItem("expireAt"));

    if (localStorage.getItem("expireAt") == null) {
      setLogged(false);
      history.push('/login');
    } else
      if (localStorage.getItem("expireAt").length > 0)
        if (today.getTime() <= expireAt.getTime()) {
          setLogged(true);
          if (window.location.pathname == '/login')
            history.push('/teacherlist');
        } else {
          setLogged(false);
          history.push('/login');
        }
      else {
        setLogged(false);
        history.push('/login');
      }

    setPathName(window.location.pathname);
    console.log(pathName);
  }, [window.location.pathname])

  const logout = () => {
    setLogged(false);
    localStorage.removeItem("token");
    localStorage.removeItem("expireAt");
    window.location.reload();
  }

  const handleClick = e => {
    setPathName(e.key);
  };

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Layout>
      {
        logged ?
          <Sider className="sider">
            <h1>Appui Scolaire</h1>
            <Menu theme="dark" onClick={handleClick} selectedKeys={[pathName]} openKeys={openKeys} onOpenChange={onOpenChange} defaultSelectedKeys={['1']} mode="inline" style={{ width: '900px' }}>
              <SubMenu key="teachers" icon={<BookOutlined />} title="Teachers">
                <Menu.Item key="1" onClick={() => { history.push('/teacherprofiles') }}>Profiles</Menu.Item>
                <Menu.Item key="2" onClick={() => { history.push('/teacherlist') }}>Availabilities</Menu.Item>
                <Menu.Item key="3" onClick={() => { history.push('/short-messages') }}>Messages</Menu.Item>
              </SubMenu>
              <SubMenu key="students" icon={<UserOutlined />} title="Students">
                <Menu.Item key="4" onClick={() => { history.push('/studentprofiles') }}>Profiles</Menu.Item>
                <Menu.Item key="5" onClick={() => { history.push('/studentlist') }}>Bookings</Menu.Item>
                <Menu.Item key="6" onClick={() => { history.push('/short-messages') }}>Messages</Menu.Item>
                <Menu.Item key="7">Parents</Menu.Item>
              </SubMenu>
              <Menu.Item key="schedules" icon={<CalendarOutlined />} onClick={() => { history.push('/schedules') }}>
                Schedules
              </Menu.Item>
            </Menu>
          </Sider> : null
      }
      <Layout className="childLayout" style={{ marginLeft: !logged ? 0 : '200px' }}>
        <Content className="content">
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            padding: '15px',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            paddingRight: '50px'
          }}>
            <SettingOutlined style={{ fontSize: '30px', marginRight: '20px'}} onClick={() => { history.push('/settings') }}/>
            <LogoutOutlined style={{ fontSize: '30px'}} onClick={() => { logout(); }} />
          </div>
          <div className="content-div" style={{ padding: 0 }}>{children}</div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutOfApp
