/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Form, Input, Button,  message} from "antd";



import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({setCheck}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const onFinish = (values) => {
    setLoading(true)
    
    fetch('https://api.dezinfeksiyatashkent.uz/api/auth/signin' ,
      {
        method:"POST",
        body:JSON.stringify({
          phone_number:values.number,
          password:values.password
        }),
        headers:{
          'Content-type' : "application/json; charset=UTF-8",
        }
      }
    ).then((res) => res.json()).then((data)=> {
      console.log(data);
      if(data?.success === true){
        setLoading(false)
        message.info("success")
        setCheck(true)
        localStorage.setItem("token" , data?.data?.tokens?.accessToken?.token)
        navigate('/home')
      }else{
        setLoading(false)
       message.error("error")
      }
    }).catch((err)=> console.log(err) )
  };

  return (
    <div className="h-screen ">
      
      <main className="text-black  flex justify-center items-start mt-[100px] h-full">
        <Form
          name="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
          className="w-[85%] md:max-w-md p-8 bg-white  rounded-lg shadow-2xl flex flex-col gap-4"
        >
          <h2 className="text-2xl font-semibold mb-4 ">
            Login
          </h2>
          <Form.Item 
            className=""
            label="User name"
            name="number"
            rules={[
              {
                required: true,
                message: "Iltimos, user name kiriting!",
              },
              {
                type: "text",
                message: "Iltimos, haqiqiy user name  kiriting!",
              },
            ]}
            validateStatus={error ? "error" : "success"}
          >
            <Input autoFocus={true} />
          </Form.Item>

          <Form.Item
            className="dark:text-[var(--white-text)]"
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please, input your password!",
              },
            ]}
            validateStatus={error ? "error" : "success"}
          >
            <Input.Password />
          </Form.Item>

          <div className="text-red-500">{error}</div>

          <Form.Item className="dark:text-[var(--white-text)]">
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              block
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </main>
    </div>
  );
}