import React from 'react';
import {Modal, Icon, Table, message, Button} from 'antd';
import axios from 'axios';
import moment from 'moment';
import {Typography} from 'antd';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const {Text} = Typography;


class InstallmentPaymentsHistoryModal extends React.Component {

   state = {
      loading: true,
      visible: false,
      paymentTransactions: []
   };

   componentDidMount() {
      this.getPaymentTransactions();
   }

   getPaymentTransactions() {
      this.setState({loading: true});
      axios.get(`/api/paymentTransactions/${this.props.treatmentId}`)
      .then((response) => {
         if(response.status === 200) {
            this.setState({paymentTransactions: response.data.paymentTransactions});
            setTimeout(() => {
               this.setState({loading: false});
            },500);
         }
      })
      .catch((err) => {
         console.log(err);
         message.error('Something went wrong! Please, try again.');
      });
   }

   showModal = () => {
      this.getPaymentTransactions();
      this.setState({visible: true});
   }

   hideModal = () => {
      this.setState({visible: false});
   }
   

   handlePrintPaymentReceipt = (details) => {
      console.log(details);
      const doc = new jsPDF({
         format: [612, 792]
      });

      const pageSize = doc.internal.pageSize;
      const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
      const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();

      doc.setFontSize(10);
      doc.setFontStyle('bold');
      doc.text('Andres Dental Clinic', 15, 10);
      doc.setFontSize(8);
      doc.setTextColor(53, 53, 53);
      doc.setFontStyle('normal');
      doc.text('One.O.5ive Department Store', 15, 13);
      doc.text('J. P. Rizal Street, Barangay 18', 15, 16);
      doc.text('Laoag City, 2900 Ilocos Norte', 15, 19);
      doc.text('09212451903', 15, 22);
      doc.setTextColor(0,0,0);
      doc.setFontSize(11);
      doc.text(`Receipt #: ${details.id+'00'}`, 15, 28);
      doc.text(`Date: ${moment(details.date_paid).format('MMMM DD, YYYY')}`, 15, 32);
      doc.text(`Payment Type: ${details.payment_type}`, 15, 36);
      doc.text(`For: ${details.description}`, 15, 40);
      doc.setFontStyle('bold');

      doc.line(15, 42, 100, 42); // horizontal line 
      doc.text(`Total Amount Due: P${details.total_amount_to_pay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, 28, 46);
      doc.text(`Current Balance Due: P${details.current_balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, 23, 50);
      doc.text(`Amount Paid: P${details.amount_paid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, 37, 54);
      doc.line(15, 56, 100, 56); // horizontal line 
      doc.text(`New Balance Due: P${details.new_balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, 29, 60);

      doc.autoPrint();
      window.open(doc.output('bloburl'), '_blank'); 
      
   }

   render() {


      const columns = [
         {
            title: <Text strong>Date Paid</Text>,
            dataIndex: 'date_paid',
            render: (text, record) => {
               return moment(record.date_paid).format('MMMM DD, YYYY');
            }
         },
         {
            title: <Text strong>Amount Paid</Text>,
            dataIndex: 'amount_paid',
            render: (text, record) => {
               return '₱'+record.amount_paid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
         },
         {
            title: <Text strong>Current Balance</Text>,
            dataIndex: 'current_balance_before',
            render: (text, record) => {
               return '₱'+record.current_balance_before.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
         },
         {
            title: <Text strong>New Balance</Text>,
            dataIndex: 'new_balance_after',
            render: (text, record) => {
               return record.new_balance_after === 0 ? 'Fully Paid' : '₱'+record.new_balance_after.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
         },
         {
            title: <Text strong>Received By</Text>,
            dataIndex: 'received_by',
            render: (text, record) => {
               return record.received_by;
            }
         },
         {
            title: <Text strong>Actions</Text>,
            dataIndex: 'actions',
            render: (text, record) => {
               return <Button 
                  onClick={() => this.handlePrintPaymentReceipt(
                     {
                        id: this.props.treatment.id,
                        date_paid: record.date_paid,
                        payment_type: this.props.treatment.payment_type,
                        description: this.props.treatment.description,
                        total_amount_to_pay: this.props.treatment.total_amount_to_pay,
                        current_balance: record.current_balance_before,
                        amount_paid: record.amount_paid,
                        new_balance: record.new_balance_after
                     }
                  )}
               >
               <Icon type="printer" /> Print Receipt</Button>
            }
         }
      ];


      return (
         <React.Fragment>
            <a onClick={this.showModal} target="_blank" rel="noopener noreferrer">View Installment Payment Transactions</a>
            <Modal
               title="Installment Payment Transactions"
               visible={this.state.visible}
               okButtonProps={{style:{display: 'none'}}}
               cancelText={<React.Fragment><Icon type="close" />Close</React.Fragment>}
               onCancel={this.hideModal}
               width={650}
            >
               <Table
                  bordered
                  loading={this.state.loading}
                  dataSource={this.state.paymentTransactions}
                  size="small"
                  columns={columns}
                  scroll={{x: 300}}
                  rowKey={(record) => record.id}
                  pagination={
                     {
                        showSizeChanger: true,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} payments history`,
                        defaultCurrent: 1,
                        pageSize: 5,
                        onChange: (page, pageSize) => {
                        
                        }
                     }
                  }
               />
            </Modal>
         </React.Fragment>
      );
   }
}




export default InstallmentPaymentsHistoryModal;