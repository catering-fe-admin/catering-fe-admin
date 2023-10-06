// For Dummy Data
const createData = (
  id,
  category,
  productName,
  allergen,
  internalCapacity,
  unitPrice,
  stock,
  desiredDeliveryDate,
  quantity
) => {
  return { id, category, productName, allergen, internalCapacity, unitPrice, stock, desiredDeliveryDate, quantity }
}

const rows = [
  createData('1', '主菜', 'さわらハーブ衣焼き', '小麦・大豆', '１', '158', '有', new Date('2023/3/1'), '2'),
  createData('2', '主菜', 'さわらだし焼き', '小麦・大豆', '１', '158', '有', new Date('2023/3/2'), '2'),
  createData('3', '主菜', 'いわし梅醤油煮', '小麦・大豆', '１', '158', '有', new Date('2023/3/3'), '2')
]

export default rows
