import React from 'react';
import {Modal, Form, Input, InputNumber, Row, Col, DatePicker, Select, Button, Icon, Radio} from 'antd';
import axios from 'axios';
import moment from 'moment';

const AddTreatmentModal = Form.create()(
   class extends React.Component {

      state = {
         visible: false,
         treatedBySelectOptions: [],
         paymentType: ''
       };

      componentDidMount() {
         axios.get('/api/users')
         .then((response) => {
            if(response.status === 200)
               this.setState({treatedBySelectOptions: response.data.users});
         })
         .catch((err) => {
            console.log(err);
         });
      }

      handleSubmit = (e) => {
         e.preventDefault();
         this.props.form.validateFields((err, values) => {
            if(err)
               return
            this.props.onAdd(values);
            this.hideModal();
         });
      }

      handlePaymentTypeChange = (e) => {
         this.setState({paymentType: e.target.value});
      }

      checkTotalAmount = (rule, value, callback) => {
         const {form} = this.props;
         const totalAmountToPay = form.getFieldValue('total_amount_to_pay');
         if( (value > totalAmountToPay) || (value < 1 && totalAmountToPay)) 
            callback('Not lower or greater than Total Amount to pay');
         else
            callback();
      }

      showModal = () => {
         this.setState({visible: true});
      }

      hideModal = () => {
         this.setState({visible: false, totalAmountToPay: '', paymentType: ''});
         this.props.form.resetFields();
      }

      render() {
         const {form} = this.props;
         const { getFieldDecorator } = form;
         return (
            <React.Fragment>
               <Button onClick={this.showModal} type="primary"><Icon type="plus" /> Add New Treatment</Button>
               <Modal
                  visible={this.state.visible}
                  title="Add New Treatment"
                  okText="Add"
                  onCancel={this.hideModal}
                  onOk={this.handleSubmit}
               >
               <Form layout="vertical" onSubmit={this.handleSubmit}>
                  <Row gutter={8}>
                     <Col span={12}>
                        <Form.Item label="Description">
                           {getFieldDecorator('description', {
                              rules: [{ required: true, message: 'Description is required.' }],
                           })(
                           <Input />
                           )}
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item label="Tooth Affected No.">
                           {getFieldDecorator('tooth_affected_no', {
                              initialValue: ''
                           })(
                              <Select>
                                 <Select.Option value=''>N/A</Select.Option>
                                 <Select.OptGroup label="Adult Teeth">
                                    <Select.Option value="LR_32">LR_32</Select.Option>
                                    <Select.Option value="LR_31">LR_31</Select.Option>
                                    <Select.Option value="LR_30">LR_30</Select.Option>
                                    <Select.Option value="LR_29">LR_29</Select.Option>
                                    <Select.Option value="LR_28">LR_28</Select.Option>
                                    <Select.Option value="LR_27">LR_27</Select.Option>
                                    <Select.Option value="LR_26">LR_26</Select.Option>
                                    <Select.Option value="LR_25">LR_25</Select.Option>
                                    <Select.Option value="LL_24">LL_24</Select.Option>
                                    <Select.Option value="LL_23">LL_23</Select.Option>
                                    <Select.Option value="LL_22">LL_22</Select.Option>
                                    <Select.Option value="LL_21">LL_21</Select.Option>
                                    <Select.Option value="LL_20">LL_20</Select.Option>
                                    <Select.Option value="LL_19">LL_19</Select.Option>
                                    <Select.Option value="LL_18">LL_18</Select.Option>
                                    <Select.Option value="LL_17">LL_17</Select.Option>
                                    <Select.Option value="UL_16">UL_16</Select.Option>
                                    <Select.Option value="UL_15">UL_15</Select.Option>
                                    <Select.Option value="UL_14">UL_14</Select.Option>
                                    <Select.Option value="UL_13">UL_13</Select.Option>
                                    <Select.Option value="UL_12">UL_12</Select.Option>
                                    <Select.Option value="UL_11">UL_11</Select.Option>
                                    <Select.Option value="UL_10">UL_10</Select.Option>
                                    <Select.Option value="UL_9">UL_9</Select.Option>
                                    <Select.Option value="UR_8">UR_8</Select.Option>
                                    <Select.Option value="UR_7">UR_7</Select.Option>
                                    <Select.Option value="UR_6">UR_6</Select.Option>
                                    <Select.Option value="UR_5">UR_5</Select.Option>
                                    <Select.Option value="UR_4">UR_4</Select.Option>
                                    <Select.Option value="UR_3">UR_3</Select.Option>
                                    <Select.Option value="UR_2">UR_2</Select.Option>
                                    <Select.Option value="UR_1">UR_1</Select.Option>                                   
                                 </Select.OptGroup>
                                 <Select.OptGroup label="Child Teeth">
                                    <Select.Option value="LR_T">LR_T</Select.Option>
                                    <Select.Option value="LR_S">LR_S</Select.Option>
                                    <Select.Option value="LR_R">LR_R</Select.Option>
                                    <Select.Option value="LR_Q">LR_Q</Select.Option>
                                    <Select.Option value="LR_P">LR_P</Select.Option>
                                    <Select.Option value="LL_O">LL_O</Select.Option>
                                    <Select.Option value="LL_N">LL_N</Select.Option>
                                    <Select.Option value="LL_M">LL_M</Select.Option>
                                    <Select.Option value="LL_L">LL_L</Select.Option>
                                    <Select.Option value="LL_K">LL_K</Select.Option>
                                    <Select.Option value="UL_J">UL_J</Select.Option>
                                    <Select.Option value="UL_I">UL_I</Select.Option>
                                    <Select.Option value="UL_H">UL_H</Select.Option>
                                    <Select.Option value="UL_G">UL_G</Select.Option>
                                    <Select.Option value="UL_F">UL_F</Select.Option>
                                    <Select.Option value="UR_E">UR_E</Select.Option>
                                    <Select.Option value="UR_D">UR_D</Select.Option>
                                    <Select.Option value="UR_C">UR_C</Select.Option>
                                    <Select.Option value="UR_B">UR_B</Select.Option>
                                    <Select.Option value="UR_A">UR_A</Select.Option>
                                 </Select.OptGroup>
                              </Select>
                           )}
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item label="Date Treated">
                           {getFieldDecorator('date_treated', {
                              rules: [{required: true, message: 'Date Treated is required.'}]
                           })(
                              <DatePicker disabledDate={(current) => current && current > moment()} format="MMMM DD, YYYY" style={{width: '100%'}} />
                           )}
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item label="Treated By">
                           {getFieldDecorator('user_id', {
                              rules: [{required: true, message: 'Treated By is required.'}]
                           })(
                              <Select>
                                 {
                                    this.state.treatedBySelectOptions.map((user) => {
                                       return <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>
                                    })
                                 }
                                 
                              </Select>
                           )}
                        </Form.Item>
                     </Col>
                     <Col span={24}>
                        <Form.Item label="Payment Type">
                           {getFieldDecorator('payment_type', {
                              rules: [{required: true, message: 'Payment Type is required.'}]
                           })(
                              <Radio.Group onChange={this.handlePaymentTypeChange}>
                                 <Radio value="in-full">In-full</Radio>
                                 <Radio value="installment">Installment</Radio>
                                 <Radio value="no-charge">No Charge</Radio>
                              </Radio.Group>
                           )}
                        </Form.Item>
                     </Col>

                     {
                        this.state.paymentType === 'in-full' ? (
                           <Col span={24}>
                              <Form.Item label="Total Amount To Pay">
                                 {getFieldDecorator('total_amount_to_pay', {
                                    rules: [{ required: true, message: 'Total Amount To Pay is required.' }],
                                 })(
                                 <InputNumber min={1} style={{width: '100%'}} />
                                 )}
                              </Form.Item>
                           </Col> ) 
                           : this.state.paymentType === 'installment' ? (
                              <React.Fragment>
                              <Col span={12}>
                                 <Form.Item label="Total Amount To Pay">
                                    {getFieldDecorator('total_amount_to_pay', {
                                       rules: [{ required: true, message: 'Total Amount To Pay is required.' }],
                                    })(
                                    <InputNumber style={{width: '100%'}} min={1} />
                                    )}
                                 </Form.Item>
                              </Col> 
                              <Col span={12}>
                                 <Form.Item label="Initial Payment">
                                    {getFieldDecorator('amount_paid', {
                                       rules: [
                                          { required: true, message: 'Initial Payment is required.' },
                                          { validator: this.checkTotalAmount}
                                       ],
                                       
                                    })(
                                    <InputNumber style={{width: '100%'}} />
                                    )}
                                 </Form.Item>
                              </Col> 
                           </React.Fragment>) : null
                     }


                  </Row>
                  <Button hidden htmlType="submit"></Button>
               </Form>
               </Modal>
            </React.Fragment>
         );
      }
   }
);

export default AddTreatmentModal;