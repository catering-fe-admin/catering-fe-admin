const columns = [
  { id: 'date', label: '日付', align: 'left', width: 300, withSort: true },
  {
    id: 'timeSection.name',
    label: '時間帯',
    align: 'left',
    width: 300,
    withSort: true
  },
  {
    id: 'items.item.course.name',
    label: 'カテゴリー',
    align: 'left',
    width: 300,
    withSort: true
  },
  {
    id: 'items.item.name',
    label: '品名',
    align: 'left',
    width: 300,
    withSort: true
  },
  {
    id: 'items.item.allergens.allergen.name',
    label: 'アレルゲン',
    align: 'left',
    width: 300,
    withSort: true
  },
  {
    id: 'items.item.cookMethod',
    label: '調理方法',
    align: 'left',
    width: 300,
    withSort: false
  },
  { id: 'action', label: 'アクション', align: 'right', width: 200 }
];

export default columns;
