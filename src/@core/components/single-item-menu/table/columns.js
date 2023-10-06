import compact from 'lodash/compact';

const getColumns = (type, isCreate, showCreateConfirmation) => {
  const columnsPreview = {
    normal: [
      { id: 'category', label: 'カテゴリ', width: 150 },
      { id: 'product-name', label: '品名', width: 250 },
      { id: 'allergen', label: 'アレルゲン', width: 250 },
      { id: 'internal-capacity', label: '内容量', width: 150 },
      { id: 'unit-price', label: '単価', width: 100 },
      { id: 'stock', label: '在庫', width: 100 },
      {
        id: 'desired-delivery-date',
        label: '希望納品日',
        width: 250
      },
      { id: 'quantity', label: '注文数', width: 200 },
      {
        id: 'total',
        label: '小計',
        width: 200
      }
    ],
    mousse: [
      { id: 'category', label: 'カテゴリ', withSort: false, width: 200 },
      { id: 'items.item.name', label: '品名', withSort: false, width: 250 },
      { id: 'internalVolume', label: '内容量', withSort: false, width: 250 },
      { id: 'unitPrice', label: '単価', withSort: false, width: 250 },
      { id: 'date', label: '希望納品日', withSort: false, width: 200 },
      { id: 'order', label: '注文数', withSort: false, width: 200 },
      { id: 'action', label: '', withSort: false, width: 100 }
    ],
    rice: [
      { id: 'items.item.name', label: '品名', withSort: false, width: 250 },
      { id: 'internalVolume', label: 'キロ価格', withSort: false, width: 250 },
      { id: 'date', label: '希望納品日', withSort: false, width: 200 },
      { id: 'order', label: '注文数', withSort: false, width: 200 },
      {
        id: 'total',
        label: '小計',
        width: 200
      }
    ]
  };

  const columns = {
    normal: compact([
      { id: 'category', label: 'カテゴリ', width: 150 },
      { id: 'product-name', label: '品名', width: 250 },
      { id: 'allergen', label: 'アレルゲン', width: 250 },
      { id: 'internal-capacity', label: '内容量', width: 150 },
      { id: 'unit-price', label: '単価', width: 100 },
      { id: 'stock', label: '在庫', width: 100 },
      {
        id: 'desired-delivery-date',
        label: '希望納品日',
        width: 250
      },
      { id: 'quantity', label: '注文数', width: 200 },
      { id: 'action', label: '', width: 100 },
      isCreate && { id: 'action', label: '', width: 100 }
    ]),
    mousse: compact([
      !isCreate && {
        id: 'manufacture',
        label: 'メーカーへ発注',
        withSort: false,
        width: 200
      },
      { id: 'category', label: 'カテゴリ', withSort: false, width: 200 },
      { id: 'items.item.name', label: '品名', withSort: false, width: 250 },
      { id: 'internalVolume', label: '内容量', withSort: false, width: 250 },
      { id: 'unitPrice', label: '単価', withSort: false, width: 250 },
      { id: 'date', label: '希望納品日', withSort: false, width: 200 },
      { id: 'order', label: '注文数', withSort: false, width: 200 },
      { id: 'action', label: '', withSort: false, width: 100 },
      isCreate && { id: 'action', label: '', width: 100 }
    ]),
    rice: compact([
      !isCreate && {
        id: 'manufacture',
        label: 'メーカーへ発注',
        withSort: false,
        width: 200
      },
      { id: 'items.item.name', label: '品名', withSort: false, width: 250 },
      { id: 'internalVolume', label: 'キロ価格', withSort: false, width: 250 },
      { id: 'date', label: '希望納品日', withSort: false, width: 200 },
      { id: 'order', label: '注文数', withSort: false, width: 200 },
      { id: 'action', label: '', withSort: false, width: 100 },
      isCreate && { id: 'action', label: '', width: 100 }
    ])
  };

  return showCreateConfirmation ? columnsPreview[type] : columns[type];
};

export default getColumns;
