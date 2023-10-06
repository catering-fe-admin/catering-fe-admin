const columns = [
  { id: 'requireAt', label: '献立日', withSort: false, width: 200 },
  { id: 'timeSection.name', label: '時間帯', withSort: false, width: 200 },
  { id: 'items.item.course.name', label: 'カテゴリー', align: 'center', withSort: false, width: 250 },
  { id: 'items.item.name', label: '品名', align: 'center', withSort: false, width: 250 },
  { id: 'totalServeQtyGlobal', label: '注文数', align: 'center', withSort: false, width: 200 },
  { id: 'action', label: '', align: 'center', withSort: false, width: 100 }
]

export default columns
