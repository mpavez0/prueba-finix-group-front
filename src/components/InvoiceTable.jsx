import React from 'react';

const InvoiceTable = ({ invoices, onOpenCreditNoteModal }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Número (ID)</th>
          <th>Cliente</th>
          <th>Rechazada</th>
          <th>Fecha de Factura</th>
          <th>Fecha de Vencimiento</th>
          <th>Fecha de Pago</th>
          <th>Estado de Pago</th>
          <th>Estado de Factura</th>
          <th>Monto Total</th>
          <th>Monto nota de crédito</th>
          <th>Agregar nota de crédito</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => (
          <tr key={invoice.invoice_number}>
            <td>{invoice.invoice_number}</td>
            <td>{invoice.customer?.customer_name}</td>
            <td>{invoice.rejected ? "Si" : "No"}</td>
            <td>{invoice.invoice_date}</td>
            <td>{invoice.payment_due_date}</td>
            <td>{invoice.invoice_payment.payment_date || "Sin pago registrado"}</td>
            <td>{invoice.payment_status}</td>
            <td>{invoice.invoice_status}</td>
            <td>{invoice.total_amount}</td>
            <td>{invoice.invoice_credit_note && invoice.invoice_credit_note.length > 0
              ? invoice.invoice_credit_note.reduce((total, note) => total + note.credit_note_amount, 0)
              : "Sin notas de crédito"
            }</td>
            <td><button onClick={() => onOpenCreditNoteModal(invoice.invoice_number)}>
              +
            </button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InvoiceTable;
