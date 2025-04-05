import React, { useEffect, useState } from 'react';
import InvoiceTable from '../components/InvoiceTable';
import InvoiceFilters from '../components/InvoiceFilters';
import Pagination from '../components/Pagination';
import CreditNoteModal from '../components/CreditNoteModal'
import {
  fetchInvoicesPaginated,
  fetchInvoiceByNumber,
  fetchInvoicesByStatus,
  fetchInvoicesByPaymentStatus,
  createCreditNote
} from '../services/InvoiceService';

const InvoicePage = () => {
  const [invoices, setInvoices] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceStatus, setInvoiceStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const [filterActive, setFilterActive] = useState(false);

  // Estados para el modal de nota de crédito
  const [showCreditNoteModal, setShowCreditNoteModal] = useState(false);
  const [selectedInvoiceNumber, setSelectedInvoiceNumber] = useState(null);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (!filterActive) {
      fetchInvoices();
    }
  }, [page, pageSize, filterActive]);

  const fetchInvoices = async () => {
    try {
      const data = await fetchInvoicesPaginated(page, pageSize);
      setInvoices(data.items);
      setTotalCount(data.totalCount);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const handleFilterByInvoiceNumber = async () => {
    try {
      setFilterActive(true);
      const data = await fetchInvoiceByNumber(invoiceNumber);
      setInvoices(Array.isArray(data) ? data : [data]);
      setTotalCount(1);
      setTotalPages(1);
    } catch (error) {
      console.error('Error filtering by invoice number:', error);
    }
  };

  const handleFilterByInvoiceStatus = async (status) => {
    try {
      setFilterActive(true);
      const data = await fetchInvoicesByStatus(status);
      setInvoices(data.items || data);
      if (data.totalPages) {
        setTotalPages(data.totalPages);
        setTotalCount(data.totalCount);
      }
    } catch (error) {
      console.error('Error filtering by invoice status:', error);
    }
  };

  const handleFilterByPaymentStatus = async (status) => {
    try {
      setFilterActive(true);
      const data = await fetchInvoicesByPaymentStatus(status);
      setInvoices(data.items || data);
      if (data.totalPages) {
        setTotalPages(data.totalPages);
        setTotalCount(data.totalCount);
      }
    } catch (error) {
      console.error('Error filtering by payment status:', error);
    }
  };

  const handleResetFilters = () => {
    setInvoiceNumber('');
    setInvoiceStatus('');
    setPaymentStatus('');
    setFilterActive(false);
    setPage(1);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const handleOpenCreditNoteModal = (invoiceNum) => {
    setSelectedInvoiceNumber(invoiceNum);
    setShowCreditNoteModal(true);
  };

  const handleCloseCreditNoteModal = () => {
    setShowCreditNoteModal(false);
    setSelectedInvoiceNumber(null);
    fetchInvoices();
  };

  const handleSubmitCreditNote = async (invoiceNum, creditNote) => {
    try {
      const result = await createCreditNote(invoiceNum, creditNote);
      if (result.status === 200) {
        setNotification({
          message: result.message || "Nota de crédito creada exitosamente",
          type: 'success'
        });
      } else {
        setNotification({
          message: result.message || "Error al crear la nota de crédito",
          type: 'error'
        });
      }
      handleCloseCreditNoteModal();
    } catch (error) {
      console.error("Error al crear la nota de crédito:", error);
      setNotification({
        message: "Error al crear la nota de crédito",
        type: 'error'
      });
    }
  };


  return (
    <div>
      <h1>Gestión de Facturas</h1>

      {notification && (
        <div
          style={{
            background: notification.type === 'success' ? '#d4edda' : '#f8d7da',
            padding: '1rem',
            marginBottom: '1rem'
          }}
        >
          {notification.message}
        </div>
      )}

      <InvoiceFilters
        invoiceNumber={invoiceNumber}
        setInvoiceNumber={setInvoiceNumber}
        handleFilterByInvoiceNumber={handleFilterByInvoiceNumber}
        invoiceStatus={invoiceStatus}
        setInvoiceStatus={setInvoiceStatus}
        handleFilterByInvoiceStatus={handleFilterByInvoiceStatus}
        paymentStatus={paymentStatus}
        setPaymentStatus={setPaymentStatus}
        handleFilterByPaymentStatus={handleFilterByPaymentStatus}
        handleResetFilters={handleResetFilters}
      />
      {!filterActive && (
        <Pagination
          page={page}
          totalPages={totalPages}
          pageSize={pageSize}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          handlePageSizeChange={handlePageSizeChange}
        />
      )}
      <InvoiceTable
        invoices={invoices}
        onOpenCreditNoteModal={handleOpenCreditNoteModal}
      />
      <div style={{ marginTop: '1rem' }}>
        <small>Total de Facturas: {totalCount}</small>
      </div>

      <CreditNoteModal
        invoiceNumber={selectedInvoiceNumber}
        isOpen={showCreditNoteModal}
        onClose={handleCloseCreditNoteModal}
        onSubmit={handleSubmitCreditNote}
      />
    </div>
  );
};

export default InvoicePage;
