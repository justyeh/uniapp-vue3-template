import { ref } from 'vue'
import type { Ref } from 'vue'

interface ListFunctionParams {
  pageNum: number
  pageSize: number
}

type ListFunction<T> = (params: ListFunctionParams) => Promise<PaginatedResponseData<T>>
type GetParamsFunction = () => AnyObject

export default function usePaginatedList<T>(listFn: ListFunction<T>, getParamsFn?: GetParamsFunction) {
  const listData: Ref<T[]> = ref([])
  const listLoading = ref(false)
  const listFinished = ref(false)
  const pageSize = ref(10)
  const pageNum = ref(0)

  const getList = async (): Promise<void> => {
    if (listFinished.value) {
      return
    }

    listLoading.value = true
    try {
      pageNum.value++
      const res = await listFn({
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        ...(getParamsFn ? getParamsFn() : {})
      })
      const list = res.body?.list || []
      const total = res.body?.total || list.length || 0

      if (pageNum.value === 1) {
        listData.value = list
      } else {
        listData.value = [...listData.value, ...list]
      }

      listFinished.value = listData.value.length >= total || list.length < pageSize.value
    } catch (error) {
      console.error(error)
      listFinished.value = true
    }
    listLoading.value = false
  }

  const doSearch = (): void => {
    pageNum.value = 0
    listFinished.value = false
    listData.value = []
    getList()
  }

  return {
    listData,
    listLoading,
    listFinished,
    pageSize,
    pageNum,
    getList,
    doSearch
  }
}
