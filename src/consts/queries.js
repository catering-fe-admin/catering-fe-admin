import { createQueryKeyStore } from '@lukemorales/query-key-factory';

const queries = createQueryKeyStore({
  todos: {
    list: (params) => [params],
    detail: (id) => [id]
  },
  adminBulletins: {
    list: (params) => [params],
    detail: (bulletinId) => [bulletinId]
  },
  adminPrefectures: {
    list: (params) => [params],
    detail: (id) => [id]
  },
  adminItems: {
    list: (params) => [params],
    export: (params) => [params],
    detail: (id) => [id]
  },
  adminCourses: {
    list: (params) => [params],
    detail: (id) => [id]
  },
  adminSuppliers: {
    list: (params) => [params],
    detail: (id) => [id],
    holiday: (id) => [id]
  },
  adminAllergens: {
    list: (params) => [params],
    detail: (id) => [id]
  },
  adminItemPacks: {
    list: (params) => [params],
    export: (params) => [params],
    detail: (id) => [id]
  },
  adminItemPacksInventories: {
    list: (params) => [params]
  },
  adminItemPackLogs: {
    list: (params) => [params]
  },
  adminMenus: {
    list: (params) => [params],
    detail: (id) => [id]
  },
  adminTimeSections: {
    list: (params) => [params],
    detail: (id) => [id]
  },
  adminCustomers: {
    list: (params) => [params],
    export: (params) => [params],
    detail: (id) => [id]
  },
  adminSupplierPurchases: {
    list: (params) => [params],
    export: (params) => [params],
    detail: (id) => [id]
  },
  adminSupplierPurchaseMonthlies: {
    list: (params) => [params],
    detail: (id) => [id]
  },
  adminCustomersFacilities: {
    list: (params) => [params],
    detail: (id) => [id]
  },
  facilityKinds: {
    list: (params) => [params],
    detail: (id) => [id]
  },
  adminWarehouses: {
    list: (params) => [params],
    detail: (id) => [id]
  },
  adminSupplierInvoiceMonthlies: {
    list: (params) => [params],
    export: (params) => [params],
    detail: (id) => [id]
  },
  adminCustomerInvoiceMonthlies: {
    list: (params) => [params],
    export: (params) => [params],
    detail: (id) => [id]
  },
  adminCustomerPurchaseMenus: {
    list: (params) => [params],
    detail: (id) => [id]
  },
  adminCustomerPurchaseSingles: {
    list: (params) => [params],
    detail: (id) => [id]
  },
  adminCustomerPurchaseMousses: {
    list: (params) => [params],
    detail: (id) => [id]
  },
  adminCustomerPurchaseRices: {
    list: (params) => [params],
    detail: (id) => [id]
  },
  adminServes: {
    list: (params) => [params],
    detail: (id) => [id]
  },
  adminCustomerPurchaseMonthlies: {
    list: (params) => [params],
    detail: (id) => [id]
  },
  adminItemDeliveries: {
    list: (params) => [params]
  },
  adminCustomerDeliveries: {
    list: (params) => [params],
    deliver: (params) => [params],
    exportDeliverySlip: (params) => [params]
  },
  adminCustomerDeliveriesGenerate: {
    list: (params) => [params],
    detail: (id) => [id]
  },
  adminCustomerDeliveriesExportDeliverySlip: {
    list: (params) => [params]
  },
  adminCustomerDeliveriesDeliver: {
    list: (params) => [params]
  },

  // Public Api
  publicTemperature: {
    list: (params) => [params]
  },
  publicClosingType: {
    list: (params) => [params]
  },
  publicPaymentType: {
    list: (params) => [params]
  },
  publicTimezoneType: {
    list: (params) => [params]
  },
  publicDeliveryFrequency: {
    list: (params) => [params]
  }

  // Add More Key Here...
});

export default queries;
