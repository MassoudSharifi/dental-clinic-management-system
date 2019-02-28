import React from 'react';
import {Modal, Form, Input,Row, Col, DatePicker, Select, Button} from 'antd';
const {Option} = Select;

const CreateAccountModalForm = Form.create()(
   class extends React.Component {

      state = {
         confirmDirty: false
       };

      handleConfirmBlur = (e) => {
         const value = e.target.value;
         this.setState({ confirmDirty: this.state.confirmDirty || !!value });
       }

      compareToFirstPassword = (rule, value, callback) => {
         const form = this.props.form;
         if (value && value !== form.getFieldValue('password')) {
           callback('Two passwords that you enter is inconsistent!');
         } else {
           callback();
         }
       }
     

      validateToNextPassword = (rule, value, callback) => {
         const form = this.props.form;
         if (value && this.state.confirmDirty) {
           form.validateFields(['confirm_password'], { force: true });
         }
         callback();
      }

      handleSubmit = (e) => {
         e.preventDefault();
         this.props.onCreate();
      }
     

      render() {
         const {visible, onCancel, form} = this.props;
         const { getFieldDecorator } = form;
         return (
            <Modal
               visible={visible}
               title="Create a new account"
               okText="Create"
               onCancel={onCancel}
               onOk={this.handleSubmit}
            >
            <Form layout="vertical" onSubmit={this.handleSubmit}>
               <Row gutter={8}>
                  <Col span={8}>
                     <Form.Item label="Firstname">
                        {getFieldDecorator('first_name', {
                           rules: [{ required: true, message: 'Firstname is required' }],
                        })(
                        <Input />
                        )}
                     </Form.Item>
                  </Col>
                  <Col span={8}>
                     <Form.Item label="Middlename">
                        {getFieldDecorator('middle_name')(
                        <Input />
                        )}
                     </Form.Item>
                  </Col>
                  <Col span={8}>
                     <Form.Item label="Lastname">
                        {getFieldDecorator('last_name', {
                           rules: [{ required: true, message: 'Lastname is required' }],
                        })(
                        <Input />
                        )}
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={8}>
                  <Col span={12}>
                     <Form.Item label="Address">
                        {getFieldDecorator('address', {
                           rules: [{ required: true, message: 'Address is required' }],
                        })(
                        <Input />
                        )}
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item label="Birthday">
                        {getFieldDecorator('birthday', {
                           rules: [{ required: true, message: 'Birthday is required' }],
                        })(
                        <DatePicker format="MMMM DD, YYYY" style={{width: '100%'}} />
                        )}
                     </Form.Item>
                  </Col>
               </Row>      
                
               <Row gutter={8}>
                  <Col span={12}>
                     <Form.Item label="Username">
                        {getFieldDecorator('username', {
                           rules: [{ required: true, message: 'Username is required' }],
                        })(
                        <Input />
                        )}
                     </Form.Item>
                  </Col>

                  <Col span={12}>
                     <Form.Item label="Role">
                        {getFieldDecorator('role', {
                           rules: [{ required: true, message: 'Role is required' }],
                           initialValue: 'dentalaide'
                        })(
                        <Select>
                           <Option value="dentalaide">Dental Aide</Option>
                           <Option value="dentist">Dentist</Option>
                        </Select>
                        )}
                     </Form.Item>
                  </Col>
               </Row>       
               <Row gutter={8}>
                  <Col span={12}>
                     <Form.Item label="Password">
                        {getFieldDecorator('password', {
                           rules: [
                              { required: true, message: 'Password is required' },
                              {validator: this.validateToNextPassword}
                           ],
                        })(
                        <Input.Password />
                        )}
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item label="Confirm Password">
                        {getFieldDecorator('confirm_password', {
                           rules: [
                              { required: true, message: 'Please confirm your password' },
                              { validator: this.compareToFirstPassword}
                           ],
                        })(
                        <Input.Password />
                        )}
                     </Form.Item>
                  </Col>
               </Row>
               <Button hidden htmlType="submit"></Button>
            </Form>
            </Modal>
         );
      }
   }
);

export default CreateAccountModalForm;

