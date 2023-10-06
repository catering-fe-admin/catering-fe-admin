const columns = [
  { id: 'manufacture', label: 'メーカーへ発注', withSort: false, width: 200 },
  { id: 'category', label: 'カテゴリ', withSort: false, width: 200 },
  { id: 'items.item.name', label: '品名', withSort: false, width: 250 },
  { id: 'internalVolume', label: '内容量', withSort: false, width: 250 },
  { id: 'unitPrice', label: '単価', withSort: false, width: 250 },
  { id: 'date', label: '希望納品日', withSort: false, width: 200 },
  { id: 'order', label: '注文数', withSort: false, width: 200 },
  { id: 'action', label: '', withSort: false, width: 100 }
]

export default columns
