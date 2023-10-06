const columns = [
  { id: 'code', label: '仕入先CD', align: 'left', width: 150, withSort: true },
  { id: 'name', label: '仕入先名', align: 'left', width: 300, withSort: true },
  { id: 'address', label: '住所', align: 'left', width: 300, withSort: true },
  { id: 'telephone', label: 'TEL', align: 'left', width: 300, withSort: true },
  { id: 'fax', label: 'Fax', align: 'left', width: 300, withSort: true },
  {
    id: 'manager',
    label: '担当者',
    align: 'left',
    width: 300,
    withSort: false
  },
  {
    id: 'mail',
    label: 'メールアドレス',
    align: 'left',
    width: 300,
    withSort: false
  },
  { id: 'action', label: 'アクション', align: 'right', width: 200 }
];

export default columns;
