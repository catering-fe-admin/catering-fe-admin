import { useRouter } from 'next/router'
import MenuDetail from 'src/@core/components/menu/MenuDetail'
import Notfound from 'src/@core/components/shared/Notfound'
import FallbackSpinner from 'src/@core/components/spinner'
import { useGetAdminMenusDetail } from 'src/hooks/api/useAdminMenus'

import { v4 as uuidv4 } from 'uuid'

const EditSupplier = () => {
  const router = useRouter()

  const id = router.query.id

  const { data, isFetching } = useGetAdminMenusDetail(id, {
    enabled: !!id
  })

  const detailData = data?.data

  const defaultValues = {
    ...detailData,
    date: new Date(detailData?.date?.split('/').join('-')),
    items: detailData?.items?.map(item => {
      return {
        uuid: uuidv4(),
        item: item?.item,
        course: item?.item?.course
      }
    })
  }

  return isFetching ? (
    <div style={{ marginTop: '-150px' }}>
      <FallbackSpinner />
    </div>
  ) : detailData ? (
    <MenuDetail isEdit defaultValues={defaultValues} />
  ) : (
    <Notfound />
  )
}

export default EditSupplier
