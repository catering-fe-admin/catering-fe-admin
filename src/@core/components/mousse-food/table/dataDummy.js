// For Dummy Data
const createData = (id, orderToManufacture, category, productName, unitPrice, desiredDeliveryDate, quantity) => {
  return { id, orderToManufacture, category, productName, unitPrice, desiredDeliveryDate, quantity }
}

const rows = [
  createData('1', 'isChecked', '特別食', '＜ムース食＞1週目の1週間分セット', '5,460', new Date('2023/3/1'), '2'),
  createData('2', 'isChecked', '特別食', '＜ムース食＞1週目の1週間分セット', '5,460', new Date('2023/3/2'), '2'),
  createData('3', 'unChecked', '特別食', '＜ムース食＞1週目の1週間分セット', '5,460', new Date('2023/3/3'), '2')
]

export default rows
