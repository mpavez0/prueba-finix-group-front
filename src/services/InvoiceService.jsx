const authHeader = "Basic " + btoa("admin:password");

export const fetchInvoicesPaginated = async (page, pageSize) => {
  const response = await fetch(`http://localhost:5084/api/invoices?page=${page}&pageSize=${pageSize}`, {
    headers: {
      "Authorization": authHeader,
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    throw new Error('Error en la respuesta del servidor');
  }
  return response.json();
};

export const fetchInvoiceByNumber = async (invoiceNumber) => {
  const response = await fetch(`http://localhost:5084/api/invoices/invoiceNumber?invoiceNumber=${invoiceNumber}`, {
    headers: {
      "Authorization": authHeader,
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    throw new Error('Error en la respuesta del servidor');
  }
  return response.json();
};

export const fetchInvoicesByStatus = async (status) => {
  const response = await fetch(`http://localhost:5084/api/invoices/status?status=${status}`, {
    headers: {
      "Authorization": authHeader,
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    throw new Error('Error en la respuesta del servidor');
  }
  return response.json();
};

export const fetchInvoicesByPaymentStatus = async (paymentStatus) => {
  const response = await fetch(`http://localhost:5084/api/invoices/paymentStatus?paymentStatus=${paymentStatus}`, {
    headers: {
      "Authorization": authHeader,
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    throw new Error('Error en la respuesta del servidor');
  }
  return response.json();
};

export const createCreditNote = async (invoiceNumber, creditNote) => {
  const response = await fetch(`http://localhost:5084/api/invoices/creditNote?invoiceNumber=${invoiceNumber}`, {
    method: 'POST',
    headers: {
      "Authorization": authHeader,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(creditNote)
  });
  // if (!response.ok) {
  //   throw new Error("Error al crear la nota de crédito");
  // }
  // return response.json();

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};
  return { status: response.status, message: data.message };
};
