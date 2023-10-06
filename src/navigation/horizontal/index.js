const navigation = () => {
  return [
    // BULLETIN MANAGEMENT
    {
      sectionTitle: '掲示板管理'
    },
    {
      title: '掲示板',
      path: '/bulletins',
      icon: 'entypo:dot-single'
    },

    // Customer Management
    {
      sectionTitle: '顧客管理'
    },
    {
      title: '顧客一覧',
      path: '/customers',
      icon: 'entypo:dot-single'
    },
    {
      title: '施設一覧',
      path: '/facilities',
      icon: 'entypo:dot-single'
    },
    {
      title: '売上/請求管理',
      path: '/order-billing-management',
      icon: 'entypo:dot-single'
    },

    // ORDER MANAGEMENT
    {
      sectionTitle: '注文管理'
    },
    {
      title: '献立メニュー注文一覧',
      path: '/menu-order',
      icon: 'entypo:dot-single'
    },
    {
      title: '単品メニュー注文一覧',
      path: '/single-order/normal',
      icon: 'entypo:dot-single'
    },
    {
      title: 'ムース食注文一覧',
      path: '/single-order/mousse',
      icon: 'entypo:dot-single'
    },
    {
      title: 'お米注文一覧',
      path: '/single-order/rice',
      icon: 'entypo:dot-single'
    },

    // SUPPLIER MANAGEMENT
    {
      sectionTitle: '仕入先管理'
    },
    {
      title: '仕入先一覧',
      path: '/supplier/normal',
      icon: 'entypo:dot-single'
    },
    {
      title: 'ムース食仕入先一覧',
      path: '/supplier/mousse',
      icon: 'entypo:dot-single'
    },
    {
      title: 'お米仕入先一覧',
      path: '/supplier/rice',
      icon: 'entypo:dot-single'
    },
    {
      title: '仕入発注一覧',
      path: '/purchase-order',
      icon: 'entypo:dot-single'
    },
    {
      title: '仕入/支払管理',
      path: '/purchase-payment',
      icon: 'entypo:dot-single'
    },

    // INVENTORY MANAGEMENT
    {
      sectionTitle: '在庫管理'
    },
    {
      title: '注文パック数確認',
      path: '/item-deliveries',
      icon: 'entypo:dot-single'
    },
    {
      title: '在庫管理ページ',
      path: '/inventory-list',
      icon: 'entypo:dot-single'
    },
    {
      title: 'Customer Delivery',
      path: '/shipping-list',
      icon: 'entypo:dot-single'
    },

    // MASTER MANAGEMENT
    {
      sectionTitle: 'Master Management'
    },
    {
      title: '品目マスター',
      path: '/items',
      icon: 'entypo:dot-single'
    },
    {
      title: '品目パックマスター',
      path: '/item-packs',
      icon: 'entypo:dot-single'
    },
    {
      title: '献立マスター',
      path: '/menu',
      icon: 'entypo:dot-single'
    },
    {
      title: '都道府県マスター',
      path: '/prefectures',
      icon: 'entypo:dot-single'
    },
    {
      title: '品目カテゴリーマスター',
      path: '/courses',
      icon: 'entypo:dot-single'
    }
  ];
};

export default navigation;
