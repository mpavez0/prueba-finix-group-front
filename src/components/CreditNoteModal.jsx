import React, { useState } from 'react';

const CreditNoteModal = ({ invoiceNumber, isOpen, onClose, onSubmit }) => {
  const [creditNoteNumber, setCreditNoteNumber] = useState('');
  const [creditNoteAmount, setCreditNoteAmount] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const creditNote = {
      credit_note_number: Number(creditNoteNumber),
      credit_note_amount: Number(creditNoteAmount)
    };
    onSubmit(invoiceNumber, creditNote);
    
    setCreditNoteNumber('');
    setCreditNoteAmount('');
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Agregar Nota de Crédito para Factura #{invoiceNumber}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Número de Nota de Crédito:
              <input
                type="number"
                value={creditNoteNumber}
                onChange={(e) => setCreditNoteNumber(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Monto de Nota de Crédito:
              <input
                type="number"
                value={creditNoteAmount}
                onChange={(e) => setCreditNoteAmount(e.target.value)}
                required
              />
            </label>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <button type="submit">Enviar</button>
            <button type="button" onClick={onClose} style={{ marginLeft: '1rem' }}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    background: '#fff',
    padding: '20px',
    borderRadius: '5px',
    width: '300px'
  }
};

export default CreditNoteModal;
