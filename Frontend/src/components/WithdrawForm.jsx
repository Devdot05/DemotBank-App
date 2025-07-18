import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const WithdrawForm = ({ fromAccountNumber, onTransactionComplete, onClose }) => {
  const [formData, setFormData] = useState({ amount: '', description: '' });
  const [step, setStep] = useState('form');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const nextStep = (e) => {
    e.preventDefault();
    setStep('confirm');
  };

  const user = JSON.parse(localStorage.getItem("users"))
  let userId = user.userId
  const handleWithdraw = async () => {
    setLoading(true);
    try {
      await axios.post('https://demotbank-app-1.onrender.com/transaction/withdraw', 
        {
          userId,
          fromAccountNumber,
          amount: Number(formData.amount),
          description: formData.description
        },
        {
          withCredentials: true
        }
      );

      alert('Withdrawal successful ✅');
      onTransactionComplete();
      onClose();
    } catch (err) {
      console.log(err);
      
      alert(err.response?.data?.message || 'Withdrawal failed ❌');
    }
    setLoading(false);
  };

  return (
    <AnimatePresence mode="wait">
      {step === 'form' && (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={nextStep}
        >
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
          <button type="submit" className="btn btn-warning">Next</button>
        </motion.form>
      )}

      {step === 'confirm' && (
        <motion.div
          key="confirm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <p><strong>Withdraw From:</strong> {fromAccountNumber}</p>
          <p><strong>Amount:</strong> ₦{formData.amount}</p>
          <p><strong>Description:</strong> {formData.description}</p>
          <div className='d-flex justify-content-end gap-2'>
            <button onClick={() => setStep('form')} className="btn btn-secondary">Back</button>
            <button onClick={handleWithdraw} className="btn btn-success me-2" disabled={loading}>
              {loading ? 'Processing...' : 'Confirm Withdrawal'}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WithdrawForm;
