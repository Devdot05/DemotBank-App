import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const DepositForm = ({ toAccountNumber, onTransactionComplete, onClose }) => {
  const [formData, setFormData] = useState({ amount: '', description: '' });
  const [step, setStep] = useState('form');
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("users"))
  const token = localStorage.tokens
  // console.log(token);
  
  const userId = user.userId
  console.log(userId);
  
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const nextStep = (e) => {
    e.preventDefault();
    setStep('confirm');
  };

  const handleDeposit = async () => {
    setLoading(true);
    try {
      const payload = {
        // userId,
        toAccountNumber,
        amount: Number(formData.amount),
        description: formData.description
      }
      console.log(payload);
      
      const res = await axios.post('https://demotbank-app-1.onrender.com/transaction/deposit', payload, {
        withCredentials: true
      }
        );
      console.log(res);
      
      alert('Deposit successful ✅');
      onTransactionComplete();
      onClose();
    } catch (err) {
      console.log(err);
      
      alert(err.response?.data?.message || 'Deposit failed ❌');
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
          <button type="submit" className="btn btn-primary">Next</button>
        </motion.form>
      )}

      {step === 'confirm' && (
        <motion.div
          key="confirm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <p><strong>Deposit To:</strong> {toAccountNumber}</p>
          <p><strong>Amount:</strong> ${formData.amount}</p>
          <p><strong>Description:</strong> {formData.description}</p>

          <button onClick={handleDeposit} className="btn btn-success me-2" disabled={loading}>
            {loading ? 'Processing...' : 'Confirm Deposit'}
          </button>
          <button onClick={() => setStep('form')} className="btn btn-secondary">Back</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DepositForm;
