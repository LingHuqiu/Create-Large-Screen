import { getSessionStorage } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'
import { ChartEditStorage } from '@/store/modules/chartEditStore/chartEditStore.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { get } from '@/api/http'

const chartEditStore = useChartEditStore()

export interface ChartEditStorageType extends ChartEditStorage {
  id: string
}

// 根据路由 id 获取存储数据的信息
export const getSessionStorageInfo = () => {
  const urlHash = document.location.hash
  const toPathArray = urlHash.split('/')
  const id = toPathArray && toPathArray[toPathArray.length - 1]
  // const storageList: ChartEditStorageType[] = getSessionStorage(
  //   StorageEnum.GO_CHART_STORAGE_LIST
  // )

  return new Promise(function (resolve, reject) {
    get('data-service/api/byId', {
      largeScreenID: id.toString()
    }).then(res => {
      if (res.code == 0) {
        let dataSource = JSON.parse(res.data.source[0].data_source)
        const { editCanvasConfig, requestGlobalConfig, componentList } = dataSource
        chartEditStore.editCanvasConfig = editCanvasConfig
        chartEditStore.requestGlobalConfig = requestGlobalConfig
        chartEditStore.componentList = componentList
        resolve(dataSource)
      }
    })
  })

  // console.log('storageList', id.toString())
  // for (let i = 0; i < storageList.length; i++) {
  //   if (id.toString() === storageList[i]['large_screen_iD']) {
  //     const { editCanvasConfig, requestGlobalConfig, componentList } = storageList[i]
  //     chartEditStore.editCanvasConfig = editCanvasConfig
  //     chartEditStore.requestGlobalConfig = requestGlobalConfig
  //     chartEditStore.componentList = componentList
  //     return storageList[i]
  //   }
  // }

}