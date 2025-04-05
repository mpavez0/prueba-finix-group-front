# Backoffice Gestor de Facturas

## Descripción
Backoffice para gestión de facturas. Las principales funcionalidades son:

- Búsqueda de facturas por número, estado de la factura y estado de pago de la factura.
- Gestión de notas de crédito, pudiendo añadir notas de crédito a facturas existentes.

## Instalación y ejecución del proyecto

- **Clonar el repositorio:**
  ```bash
  git clone https://github.com/mpavez0/prueba-finix-group-front

- **Ejecutar solución**

  Estando en la raíz del proyecto, ejecutar

  ````bash 
  docker build -t gestor-facturas-front .
  docker run --rm -p 5173:5173 gestor-facturas-front

Así, para acceder al backoffice se debe consultar el enlace

http://localhost:5173

## Características del proyecto

- El proyecto separa sus componentes por responsabilidad. Así, existen las carpetas "components", "pages" y "services"
- InvoicePage.jsx actúa como un container que centraliza varias funciones:
    - Hace llamados a la API (a través de InvoiceService.jsx)
    - Haciendo uso de custom hooks, maneja el estado y pasa esos datos/funciones a componentes más pequeños, como "InvoiceTable.jsx", "InvoiceFilters.jsx", "Pagination.jsx" y "CreditNoteModal.jsx"

## Pendientes

- Integrarse desde el frontend a la API para usar un CRUD completo
- Integrar e implementar la paginación en todos los endpoints que retornen listas de facturas dispuestos por la API
- Agregar una feature que permita ver las notas de crédito asociadas a cada factura. Por ejemplo, que al hacer click en algún "Número (ID)" de la tabla, se desplieguen las NC asociadas a esa factura
