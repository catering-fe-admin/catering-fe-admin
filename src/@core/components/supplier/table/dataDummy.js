// For Dummy Data
const createData = (id, code, type, name) => {
  return { id, code, type, name }
}

const rows = [
  createData('1', 'A011100001', '主菜', 'さけチーズ衣焼き'),
  createData('2', 'A011100002', '主菜', 'さわらハーブ衣焼き'),
  createData('3', 'A011100003', '主菜', 'さわらだし焼き')
]

export default rows
