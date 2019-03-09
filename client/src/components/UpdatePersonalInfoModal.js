import React from 'react';
import {Form, Modal, Row, Col, Input, Button, Icon, DatePicker, Select} from 'antd';
import moment from 'moment';

const {Option} = Select;

const UpdatePersonalInfoModal = Form.create()(
   class extends React.Component {

      state = {
         visible: false
       };

      handleSubmit = (e) => {
         e.preventDefault();
         this.props.form.validateFields((err, values) => {
            if(err)
               return
            this.props.onUpdate(this.props.patient.code, values);
            this.hideModal();
         });
      }

      showModal = () => {
         this.setState({visible: true});
      }

      hideModal = () => {
         this.setState({visible: false});
         this.props.form.resetFields();
      }

      render() {
         const {form, account} = this.props;
         const { getFieldDecorator } = form;
         return (
            <React.Fragment>
               <a onClick={this.showModal}><Icon type="edit"/>Update</a>
               <Modal
                  visible={this.state.visible}
                  title="Update Patient's Personal Info"
                  okText="Update"
                  onCancel={this.hideModal}
                  onOk={this.handleSubmit}
               >
               <Form layout="vertical" onSubmit={this.handleSubmit}>
               <Row gutter={8}>
                     <Col span={12}>
                        <Form.Item label="Name">
                           {getFieldDecorator('name', {
                              rules: [{ required: true, message: 'Name is required' }],
                              initialValue: this.props.patient.name
                           })(
                           <Input />
                           )}
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item label="Birthday">
                           {getFieldDecorator('birthday', {
                              rules: [{ required: true, message: 'Birthday is required' }],
                              initialValue: moment(this.props.patient.birthday)
                           })(
                           <DatePicker format="MMMM DD, YYYY" style={{width: '100%'}} />
                           )}
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item label="Occupation">
                           {getFieldDecorator('occupation', {
                              initialValue: this.props.patient.occupation
                           })(
                           <Input />
                           )}
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item label="Civil Status">
                           {getFieldDecorator('civil_status', {
                              initialValue: this.props.patient.civil_status
                           })(
                           <Select>
                              <Option value="single">Single</Option>
                              <Option value="married">Married</Option>
                              <Option value="widowed">Widowed</Option>
                              <Option value="separated">Separated</Option>
                           </Select>
                           )}
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item label="Address">
                           {getFieldDecorator('address', {
                              rules: [{ required: true, message: 'Address is required' }],
                              initialValue: this.props.patient.address
                           })(
                           <Input />
                           )}
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item label="Contact Number">
                           {getFieldDecorator('contact_number', {
                              initialValue: this.props.patient.cotact_number
                           })(
                              <Input />
                           )}
                        </Form.Item>
                     </Col>        
                  </Row>
                  <Button hidden htmlType="submit"></Button>
               </Form>
               </Modal>
            </React.Fragment>
         );
      }
   }
);

export default UpdatePersonalInfoModal;