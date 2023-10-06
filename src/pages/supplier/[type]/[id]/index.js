import { useRouter } from 'next/router'
import { useState } from 'react'
import Notfound from 'src/@core/components/shared/Notfound'
import FallbackSpinner from 'src/@core/components/spinner'
import SupplierDetail from 'src/@core/components/supplier/SupplierDetail'
import { closingTypeDictionary, paymentTypeDictionary } from 'src/@core/utils/helper'
import { useGetAdminSuppliersDetail } from 'src/hooks/api/useAdminSuppliers'

const EditSupplier = () => {
  const [detailData, setDetailData] = useState(null)

  const router = useRouter()

  const id = router.query.id

  const { isFetching } = useGetAdminSuppliersDetail(id, {
    enabled: !!id,
    onSuccess: data => {
      const newDetailData = {
        ...data?.data,
        closingType: {
          name: closingTypeDictionary[data?.data?.closingType],
          id: data?.data?.closingType
        },
        paymentType: {
          name: paymentTypeDictionary[data?.data?.paymentType],
          id: data?.data?.paymentType
        }
      }

      setDetailData(newDetailData)
    }
  })

  return isFetching ? (
    <div style={{ marginTop: '-150px' }}>
      <FallbackSpinner />
    </div>
  ) : detailData ? (
    <SupplierDetail isEdit defaultValues={detailData} />
  ) : (
    <Notfound />
  )
}

export default EditSupplier
