import React from 'react';

const InvoiceFilters = ({
  invoiceNumber,
  setInvoiceNumber,
  handleFilterByInvoiceNumber,
  invoiceStatus,
  setInvoiceStatus,
  handleFilterByInvoiceStatus,
  paymentStatus,
  setPaymentStatus,
  handleFilterByPaymentStatus,
  handleResetFilters
}) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div>
        <label>
          Número de Factura:
          <input
            type="text"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            placeholder="Ingrese el número de factura"
          />
        </label>
        <button onClick={handleFilterByInvoiceNumber}>Buscar</button>
      </div>
      <div>
        <label>
          Estado de Factura:
          <select
            value={invoiceStatus}
            onChange={(e) => {
              const selectedValue = e.target.value;
              setInvoiceStatus(selectedValue);
              handleFilterByInvoiceStatus(selectedValue);
              setPaymentStatus("");
            }}
          >
            <option value="">-</option>
            <option value="Issued">Issued</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Partial">Partial</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Estado de Pago:
          <select
            value={paymentStatus}
            onChange={(e) => {
              const selectedValue = e.target.value;
              setPaymentStatus(selectedValue);
              handleFilterByPaymentStatus(selectedValue);
              setInvoiceStatus("");
            }}
          >
            <option value="">-</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
            <option value="Paid">Paid</option>
          </select>
        </label>
      </div>
      <button onClick={handleResetFilters}>Resetear Filtros</button>
    </div>
  );
};

export default InvoiceFilters;
