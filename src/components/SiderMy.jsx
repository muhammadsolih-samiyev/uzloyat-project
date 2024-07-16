import { useEffect, useState } from "react";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
function SiderMY({ children, setCheck }) {
  const myToken = localStorage.getItem("token");
  const [locationPath, setLocationPath] = useState("");
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (location.pathname == "/home") {
      setLocationPath("1");
    } else if (location.pathname == "/Faqs") {
      setLocationPath("2");
    } else if (location.pathname == "/Blogs") {
      setLocationPath("3");
    } else if (location.pathname == "/News") {
      setLocationPath("4");
    } else if (location.pathname == "/Services") {
      setLocationPath("5");
    } else if (location.pathname == "/Sources") {
      setLocationPath("6");
    }
  }, []);

  return (
    <Layout className='h-screen'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='text-white text-center mt-5 text-2xl font-bold pb-10'>
          <span
            className={`${
              !collapsed
                ? "logo1 bg-[#152f4d] "
                : "logo2 bg-[#254195b3] text-xl p-1 rounded-md"
            }   `}
          >
            Uzloyal Admin
          </span>
        </div>
        <Menu
          theme='dark'
          mode='inline'
          selectedKeys={locationPath}
          items={[
            {
              key: "1",
              icon: (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  width={20}
  height={20}
                >
                  <path d='M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6ZM7 11H13V13H7V11ZM7 15H13V17H7V15Z'></path>
                </svg>
              ),
              label: "Categories",
              onClick: () => {
                setLocationPath("1");
                navigate("/");
              },
            },
            {
              key: "2",
              icon: (
                <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor"
  width={20}
  height={20}
>
  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.61 3.13 8.45 7.5 9.64V22c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-1.04C18.87 20.45 22 16.61 22 12c0-5.52-4.48-10-10-10zm1 17.93c-1.7-.36-3.26-1.07-4.55-2.03-.19-.14-.44-.21-.7-.21-.14 0-.28.02-.41.06-.68.18-1.35.39-1.92.62-.41.16-.68.57-.68 1.02V20c0 .55.45 1 1 1 .13 0 .25-.02.37-.05 1.06-.29 2.1-.65 3.06-1.08 1.23-.53 2.37-1.24 3.39-2.1-.68-.45-1.26-.99-1.76-1.6-.52-.63-.9-1.34-1.15-2.1-.25-.78-.38-1.59-.38-2.43C5 6.48 8.48 3 12 3s7 3.48 7 7-3.48 7-7 7z"></path>
  <path d="M12.01 8c-1.16 0-2.1.94-2.1 2.1 0 .55-.45 1-1 1s-1-.45-1-1C7.91 7.87 9.95 6 12.01 6s4.1 1.87 4.1 4.1c0 2.05-1.61 3.74-3.71 3.97-.28.03-.54-.2-.54-.5V13.1c0-.28.22-.5.5-.5 1.13-.12 2-.96 2-2.1 0-1.16-.94-2.1-2.1-2.1z"></path>
  <circle cx="12" cy="17" r="1"></circle>
</svg>

              ),
              label: "Faqs",
              onClick: () => {
                setLocationPath("2");
                navigate("/Faqs");
              },
            },

            {
              key: "4",
              icon: (
                <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor"
  width={20}
  height={20}
>
  <path d="M21 3H3C2.44772 3 2 3.44772 2 4V18C2 19.6569 3.34315 21 5 21H19C20.6569 21 22 19.6569 22 18V4C22 3.44772 21.5523 3 21 3ZM20 17C20 17.5523 19.5523 18 19 18H5C4.44772 18 4 17.5523 4 17V5H20V17Z"></path>
  <path d="M6 7H14V9H6V7Z"></path>
  <path d="M6 11H14V13H6V11Z"></path>
  <path d="M6 15H10V17H6V15Z"></path>
  <path d="M16 15H18V17H16V15Z"></path>
</svg>

              ),
              label: "News",
              onClick: () => {
                setLocationPath("4");
                navigate("/News");
              },
            },

            {
              key: "3",
              icon: (
                <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor"
  width={20}
  height={20}
>
  <path d="M4 21H20C20.5523 21 21 20.5523 21 20V4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21ZM5 19V5H19V19H5Z"></path>
  <path d="M17 7H7V9H17V7Z"></path>
  <path d="M13 11H7V13H13V11Z"></path>
  <path d="M10 15H7V17H10V15Z"></path>
</svg>

              ),
              label: "Blogs",
              onClick: () => {
                setLocationPath("3");
                navigate("/Blogs");
              },
            },
            
            {
              key: "5",
              icon: (
                <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor"
  width={20}
  height={20}
>
  <path d="M19.43 12.98C19.47 12.66 19.5 12.34 19.5 12C19.5 11.66 19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.8 8.95 21.72 8.71L19.94 4.94C19.85 4.7 19.61 4.56 19.36 4.63L16.85 5.35C16.35 4.95 15.78 4.63 15.15 4.39L14.83 1.72C14.8 1.32 14.46 1 14.05 1H9.95C9.54 1 9.2 1.32 9.17 1.72L8.85 4.39C8.22 4.63 7.65 4.95 7.15 5.35L4.64 4.63C4.39 4.56 4.15 4.7 4.06 4.94L2.28 8.71C2.2 8.95 2.27 9.22 2.46 9.37L4.57 11.02C4.53 11.34 4.5 11.66 4.5 12C4.5 12.34 4.53 12.66 4.57 12.98L2.46 14.63C2.27 14.78 2.2 15.05 2.28 15.29L4.06 19.06C4.15 19.3 4.39 19.44 4.64 19.37L7.15 18.65C7.65 19.05 8.22 19.37 8.85 19.61L9.17 22.28C9.2 22.68 9.54 23 9.95 23H14.05C14.46 23 14.8 22.68 14.83 22.28L15.15 19.61C15.78 19.37 16.35 19.05 16.85 18.65L19.36 19.37C19.61 19.44 19.85 19.3 19.94 19.06L21.72 15.29C21.8 15.05 21.73 14.78 21.54 14.63L19.43 12.98ZM12 15.5C10.07 15.5 8.5 13.93 8.5 12C8.5 10.07 10.07 8.5 12 8.5C13.93 8.5 15.5 10.07 15.5 12C15.5 13.93 13.93 15.5 12 15.5Z"/>
</svg>

              ),
              label: "Services",
              onClick: () => {
                setLocationPath("5");
                navigate("/Services");
              },
            },
            {
              key: "6",
              icon: (
                <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor"
  width={20}
  height={20}
>
  <path d="M19 3H5C3.897 3 3 3.897 3 5V19C3 20.103 3.897 21 5 21H19C20.103 21 21 20.103 21 19V5C21 3.897 20.103 3 19 3zM19 19H5V5H19V19zM17.293 8.293L15 10.586 13.707 9.293 12.293 10.707 15 13.414 18.707 9.707 17.293 8.293zM12 14H7V12H12V14z"></path>
</svg>

              ),
              label: "Sources",
              onClick: () => {
                setLocationPath("6");
                navigate("/Sources");
              },
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className='flex items-center justify-between'
          style={{ padding: 0, background: colorBgContainer }}
        >
          <Button
            type='text'
            icon={
              collapsed ? (
                <MenuUnfoldOutlined />
              ) : (
                <MenuFoldOutlined />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Button
            onClick={() => {
              setCheck(false);
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className='mr-5'
          >
            Logout
            <LogoutOutlined />
          </Button>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            height: "100%",
            overflowY: "auto",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default SiderMY;