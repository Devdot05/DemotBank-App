import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const TransferForm = ({ fromAccountNumber, onTransactionComplete, onClose }) => {
  let user = JSON.parse(localStorage.getItem("users"))
  let userId = user.userId
  const [formData, setFormData] = useState({
    toAccountNumber: '',
    amount: '',
    description: ''
  });
  const [step, setStep] = useState('form');
  const [recipientName, setRecipientName] = useState('');
  const [loading, setLoading] = useState(false);

 
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const nextStep = (e) => {
    e.preventDefault();
    setStep('confirm');
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(`https://demotbank-app-1.onrender.com/account/verify/${formData.toAccountNumber}`);
      setRecipientName(res.data.fullName);
      setStep('confirm');
      console.log(res);
      
    } catch (err) {
      alert("Invalid account number, Can't transfer to an external bank, You can only transfer within demot bank. Create more than one account to enjoy your transactions. Thank you!");
      console.log(err);
      
    }
    setLoading(false);
  };

  const handleTransfer = async () => {
    setLoading(true);
    try {
      const res = await axios.post('https://demotbank-app-1.onrender.com/transaction/transfer', 
        {
          userId,
          fromAccountNumber,
          toAccountNumber: formData.toAccountNumber,
          amount: Number(formData.amount),
          description: formData.description
        }, 
        {
          withCredentials: true
        }
      );
      const data = res.data.transaction
      let txId = data._id
      localStorage.setItem('txId', JSON.stringify(txId))
      console.log(txId);

      alert('Transfer successful');
      onTransactionComplete();  // Refresh balance
      onClose();                // Close modal
    } catch (err) {
      alert(err.response?.data?.message || 'Transfer failed');
      console.log(err);
      
    }
    setLoading(false);
  };

  return (
    <>
      <AnimatePresence mode='wait'>
        {step === 'form' && (
          <motion.form 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleVerify}
          >
             
            <div className="mb-3">
              <label>To Account Number</label>
              <input
                name="toAccountNumber"
                className="form-control"
                value={formData.toAccountNumber}
                onChange={handleChange}
                required
              />
              </div>
            <div className="mb-3">
              <label>Amount</label>
              <input
                name="amount"
                type="number"
                className="form-control"
                value={formData.amount}
                onChange={handleChange}
                required
              />
              </div>
            <div className="mb-3">
              <label>Description (Optional)</label>
              <input
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
              />
              </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Verifying...' : 'Next'}
            </button>
             
          </motion.form>
        )}

        {step === 'confirm' && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div>
              <p><strong>Recipient:</strong> {recipientName}</p>
              <p><strong>To Account:</strong> {formData.toAccountNumber}</p>
              <p><strong>Amount:</strong> ₦{formData.amount}</p>
              <p><strong>Description:</strong> {formData.description}</p>

              <button onClick={handleTransfer} className="btn btn-success me-2" disabled={loading}>
                {loading ? 'Processing...' : 'Confirm Transfer'}
              </button>
              <button onClick={() => setStep('form')} className="btn btn-secondary">Back</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TransferForm;
