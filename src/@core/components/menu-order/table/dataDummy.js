// For Dummy Data
const createData = (id, menuDate, timeZone, category, productName, quantity) => {
  return { id, menuDate, timeZone, category, productName, quantity }
}

const rows = [
  createData('1', '2023/04/01（火）', '朝A', ['副菜', '副菜'], ['カニかま入り炒り玉子', '洋梨ダイスカット'], '20'),
  createData(
    '2',
    '2023/04/01（火）',
    '昼',
    ['主菜', '副菜', '副菜'],
    ['サワラだし焼き', 'カニかま入り炒り玉子', 'じゃが芋の土佐煮'],
    '20'
  )
]

export default rows
