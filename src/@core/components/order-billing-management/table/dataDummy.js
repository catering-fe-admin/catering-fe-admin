// For Dummy Data
const createData = (id, company, billing, month, carryOver, sales, billed, deposit, carryOverNext, invoice) => {
  return { id, company, billing, month, carryOver, sales, billed, deposit, carryOverNext, invoice }
}

const rows = [
  createData(
    '1',
    '株式会社リールステージ',
    '株式会社リールステージ経理本部',
    ['3月', '2月', '1月'],
    [0, 0, 0],
    [1200000, 1200000, 1200000],
    [1200000, 1200000, 1200000],
    [1200000, 1200000, 1200000],
    [0, 0, 0]
  ),
  createData(
    '2',
    '社会福祉法人　百楽福祉会',
    '特別養護老人ホーム　百楽園',
    ['3月', '2月', '1月'],
    [0, 0, 0],
    [1200000, 1200000, 1200000],
    [1200000, 1200000, 1200000],
    [],
    [0, 0, 0]
  ),
  createData(
    '3',
    'プレシャス合同会社',
    'サービス付き高齢者向け住宅　コスモス',
    ['3月', '2月', '1月'],
    [0, 0, 0],
    [1200000, 1200000, 1200000],
    [1200000, 1200000, 1200000],
    [1200000, 1200000, 1200000],
    [0, 0, 0]
  )
]

export default rows
