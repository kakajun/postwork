import type { IUserInfoRes } from '@/api/types/login'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import {
  getUserInfo,
} from '@/api/login'
import { updateTabbarListByRole } from '@/tabbar/store'

// 初始化状态
const userInfoState: IUserInfoRes = {
  userId: -1,
  role: '', // post 项目发布者 receive 项目接收者
  username: '',
  nickname: '',
  avatar: '/static/images/default-avatar.png',
}

export const useUserStore = defineStore(
  'user',
  () => {
    // 定义用户信息
    const userInfo = ref<IUserInfoRes>({ ...userInfoState })
    // 设置用户信息
    const setUserInfo = (val: IUserInfoRes) => {
      console.log('设置用户信息', val)
      // 若头像为空 则使用默认头像
      if (!val.avatar) {
        val.avatar = userInfoState.avatar
      }
      userInfo.value = val
    }
    const setUserAvatar = (avatar: string) => {
      userInfo.value.avatar = avatar
      console.log('设置用户头像', avatar)
      console.log('userInfo', userInfo.value)
    }
    // 删除用户信息
    const clearUserInfo = () => {
      userInfo.value = { ...userInfoState }
      uni.removeStorageSync('user')
    }

    /**
     * 获取用户信息
     */
    const fetchUserInfo = async () => {
      const res = await getUserInfo()
      setUserInfo(res)
      return res
    }

    // 监听角色变化，更新tabbar
    watch(() => userInfo.value.role, async (newRole) => {
      if (newRole) {
        // 延迟执行，避免初始化时的循环依赖
        setTimeout(async () => {
          await updateTabbarListByRole()
        }, 0)
      }
    })

    return {
      userInfo,
      clearUserInfo,
      fetchUserInfo,
      setUserInfo,
      setUserAvatar,
    }
  },
  {
    persist: true,
  },
)
