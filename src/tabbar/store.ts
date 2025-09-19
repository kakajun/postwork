import type { CustomTabBarItem, CustomTabBarItemBadge } from './config'
import { reactive } from 'vue'

import { FG_LOG_ENABLE } from '@/router/interceptor'
import { tabbarList as _tabbarList, customTabbarEnable, postTabbarList, receiveTabbarList } from './config'

// TODO 1/2: 中间的鼓包tabbarItem的开关
const BULGE_ENABLE = false

// 获取用户角色对应的tabbar列表
async function getRoleBasedTabbarList() {
  // 动态导入避免循环依赖
  const { useUserStore } = await import('@/store/user')
  const userStore = useUserStore()
  const role = userStore.userInfo.role

  console.log('getRoleBasedTabbarList called, role:', role)

  if (role === 'post') {
    console.log('Returning post tabbar list')
    return postTabbarList
  }
  else if (role === 'receive') {
    console.log('Returning receive tabbar list')
    return receiveTabbarList
  }

  // 默认返回原始配置
  console.log('Returning default tabbar list')
  return _tabbarList
}

/** tabbarList 里面的 path 从 pages.config.ts 得到 */
const tabbarList = reactive<CustomTabBarItem[]>([])

// 初始化tabbar列表
async function initTabbarList() {
  console.log('initTabbarList called')
  const roleBasedList = await getRoleBasedTabbarList()
  console.log('Got role based list:', roleBasedList)
  const processedList = roleBasedList.map(item => ({
    ...item,
    pagePath: item.pagePath.startsWith('/') ? item.pagePath : `/${item.pagePath}`,
  }))
  tabbarList.splice(0, tabbarList.length, ...processedList)
  console.log('Initialized tabbarList:', tabbarList)

  if (customTabbarEnable && BULGE_ENABLE) {
    if (tabbarList.length % 2) {
      console.error('有鼓包时 tabbar 数量必须是偶数，否则样式很奇怪！！')
    }
    tabbarList.splice(tabbarList.length / 2, 0, {
      isBulge: true,
    } as CustomTabBarItem)
  }
}

// 延迟初始化，确保用户 store 已经初始化
setTimeout(() => {
  initTabbarList().catch(err => {
    console.error('Failed to initialize tabbar list:', err)
  })
}, 100)

export function isPageTabbar(path: string) {
  const _path = path.split('?')[0]
  return tabbarList.some(item => item.pagePath === _path)
}

/**
 * 自定义 tabbar 的状态管理，原生 tabbar 无需关注本文件
 * tabbar 状态，增加 storageSync 保证刷新浏览器时在正确的 tabbar 页面
 * 使用reactive简单状态，而不是 pinia 全局状态
 */
const tabbarStore = reactive({
  curIdx: uni.getStorageSync('app-tabbar-index') || 0,
  prevIdx: uni.getStorageSync('app-tabbar-index') || 0,
  setCurIdx(idx: number) {
    this.curIdx = idx
    uni.setStorageSync('app-tabbar-index', idx)
  },
  setTabbarItemBadge(idx: number, badge: CustomTabBarItemBadge) {
    if (tabbarList[idx]) {
      tabbarList[idx].badge = badge
    }
  },
  setAutoCurIdx(path: string) {
    // '/' 当做首页
    if (path === '/') {
      this.setCurIdx(0)
      return
    }
    const index = tabbarList.findIndex(item => item.pagePath === path)
    FG_LOG_ENABLE && console.log('index:', index, path)
    // console.log('tabbarList:', tabbarList)
    if (index === -1) {
      const pagesPathList = getCurrentPages().map(item => item.route.startsWith('/') ? item.route : `/${item.route}`)
      // console.log(pagesPathList)
      const flag = tabbarList.some(item => pagesPathList.includes(item.pagePath))
      if (!flag) {
        this.setCurIdx(0)
        return
      }
    }
    else {
      this.setCurIdx(index)
    }
  },
  restorePrevIdx() {
    if (this.prevIdx === this.curIdx)
      return
    this.setCurIdx(this.prevIdx)
    this.prevIdx = uni.getStorageSync('app-tabbar-index') || 0
  },
})

// 更新tabbar列表（当用户角色改变时调用）
async function updateTabbarListByRole() {
  // 动态导入避免循环依赖
  const { useUserStore } = await import('@/store/user')
  const userStore = useUserStore()
  const role = userStore.userInfo.role

  console.log('updateTabbarListByRole called, current role:', role)

  let newList
  if (role === 'post') {
    newList = postTabbarList
    console.log('Loading post tabbar list:', newList)
  }
  else if (role === 'receive') {
    newList = receiveTabbarList
    console.log('Loading receive tabbar list:', newList)
  }
  else {
    newList = _tabbarList
    console.log('Loading default tabbar list:', newList)
  }

  // 清空原数组并添加新项
  tabbarList.splice(0, tabbarList.length, ...newList.map(item => ({
    ...item,
    pagePath: item.pagePath.startsWith('/') ? item.pagePath : `/${item.pagePath}`,
  })))
  
  console.log('Updated tabbarList:', tabbarList)
}

export { tabbarList, tabbarStore, updateTabbarListByRole }
