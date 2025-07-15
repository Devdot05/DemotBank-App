import React from 'react'

const ConfirmTransaction = () => {
  return (
    <>
        <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">To Account ID</label>
        <input type="text" className="form-control" value={toAccountNumber} onChange={(e) => setToAccountNumber(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Amount</label>
        <input type="number" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-success">Transfer</button>
    </form>
    </>
  )
}

export default ConfirmTransaction