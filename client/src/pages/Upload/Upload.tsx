import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import "./upload.css";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import url from "../../config";

const UploadPage: React.FC = () => {
    const [form] = Form.useForm();
    const history = useNavigate();
    // const blogStateObj = useSelector((state: RootState) => state.blogReducer);
    // const authStateObj = useSelector((state: RootState) => state.authReducer)
    // const dispatch = useDispatch<AppDispatch>();
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
      messageApi.open({
        type: 'success',
        content: 'Video Uploaded Successfully',
      });
    };
  
    const error = () => {
      messageApi.open({
        type: 'error',
        content: 'There is an error',
      });
    };
    const onFinish = (values: any) => {
        console.log('Success:', values);
        axios.post(`${url}/video/upload`, values, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then(res => { console.log(res); success();form.resetFields(); })
        .catch(e => { console.log(e); success(); form.resetFields();});
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const props = {
        name: "file",
        beforeUpload: () => {
            return false;
        },
        // onRemove: questionRemove,
    };

    return (<>
    {contextHolder}
    <div className="form-wrapper">
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="File Name"
                name="name"
                rules={[{ required: true, message: 'PLease enter file name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Video"
                name="file"
                rules={[{ required: true, message: 'Please input your Video File!' }]}
            >
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
        </div>
    </>)
}
export default UploadPage;