<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 页面配置
definePage({
  style: {
    navigationBarTitleText: '接单方信息注册',
    navigationBarBackgroundColor: '#FF6F00',
    navigationBarTextStyle: 'white'
  }
})

// 表单数据
const formData = ref({
  company: '',
  contactPerson: '',
  phoneNumber: '',
  verificationCode: ''
})

// 验证码相关
const isCodeSending = ref(false)
const codeCountdown = ref(0)
const codeTimer = ref<NodeJS.Timeout | null>(null)

// 页面加载
onLoad(() => {
  console.log('注册第二步页面加载')
})

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 发送验证码
const sendVerificationCode = () => {
  if (!formData.value.phoneNumber) {
    uni.showToast({
      title: '请输入手机号码',
      icon: 'none'
    })
    return
  }

  // 手机号码格式验证
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phoneRegex.test(formData.value.phoneNumber)) {
    uni.showToast({
      title: '请输入正确的手机号码',
      icon: 'none'
    })
    return
  }

  // 开始倒计时
  isCodeSending.value = true
  codeCountdown.value = 60
  
  codeTimer.value = setInterval(() => {
    codeCountdown.value--
    if (codeCountdown.value <= 0) {
      isCodeSending.value = false
      if (codeTimer.value) {
        clearInterval(codeTimer.value)
        codeTimer.value = null
      }
    }
  }, 1000)

  // 模拟发送验证码
  uni.showToast({
    title: '验证码已发送',
    icon: 'success'
  })
}

// 跳转到项目大厅
const gotoProjectHall = () => {
  uni.switchTab({
    url: '/pages/index/project-hall'
  })
}

// 提交表单
const submitForm = () => {
  // 表单验证
  if (!formData.value.company.trim()) {
    uni.showToast({
      title: '请输入公司名称',
      icon: 'none'
    })
    return
  }

  if (!formData.value.contactPerson.trim()) {
    uni.showToast({
      title: '请输入联系人',
      icon: 'none'
    })
    return
  }

  if (!formData.value.phoneNumber) {
    uni.showToast({
      title: '请输入手机号码',
      icon: 'none'
    })
    return
  }

  // 手机号码格式验证
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phoneRegex.test(formData.value.phoneNumber)) {
    uni.showToast({
      title: '请输入正确的手机号码',
      icon: 'none'
    })
    return
  }

  if (!formData.value.verificationCode) {
    uni.showToast({
      title: '请输入验证码',
      icon: 'none'
    })
    return
  }

  // 提交逻辑
  console.log('提交表单数据:', formData.value)
  uni.showToast({
    title: '注册成功',
    icon: 'success'
  })

  // 延迟跳转到项目大厅
  setTimeout(() => {
    gotoProjectHall()
  }, 1500)
}

// 页面销毁时清理定时器
onUnmounted(() => {
  if (codeTimer.value) {
    clearInterval(codeTimer.value)
  }
})
</script>

<template>
  <view class="bg-gray-50 min-h-screen">
    <!-- 内容区域 -->
    <view class="px-4 py-6">
      <!-- 头像显示区域 -->
      <view class="flex justify-center mb-8">
        <view class="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
          <view class="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
            <view class="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <view class="w-4 h-4 bg-gray-400 rounded-full"></view>
            </view>
            <view class="absolute mt-4">
              <view class="w-6 h-3 bg-white rounded-t-full"></view>
            </view>
          </view>
        </view>
      </view>

      <!-- 表单区域 -->
      <wd-cell-group>
        <!-- 公司名称输入 -->
        <wd-cell title="公司名称">
          <input
            v-model="formData.company"
            placeholder="请输入公司名称"
            class="w-full text-base text-gray-700"
            maxlength="50"
          />
        </wd-cell>
        
        <!-- 联系人输入 -->
        <wd-cell title="联系人">
          <input
            v-model="formData.contactPerson"
            placeholder="请输入联系人姓名"
            class="w-full text-base text-gray-700"
            maxlength="20"
          />
        </wd-cell>

        <!-- 手机号码输入 -->
        <wd-cell title="手机号码">
          <input
            v-model="formData.phoneNumber"
            placeholder="请输入手机号码"
            type="number"
            class="w-full text-base text-gray-700"
            maxlength="11"
          />
        </wd-cell>

        <!-- 验证码输入 -->
        <wd-cell title="验证码">
          <view class="flex items-center w-full">
            <input
              v-model="formData.verificationCode"
              placeholder="请输入验证码"
              type="number"
              class="flex-1 text-base text-gray-700 mr-3"
              maxlength="6"
            />
            <wd-button
              :disabled="isCodeSending"
              size="small"
              type="primary"
              @click="sendVerificationCode"
            >
              {{ isCodeSending ? `${codeCountdown}s` : '获取验证码' }}
            </wd-button>
          </view>
        </wd-cell>
      </wd-cell-group>
    </view>

    <!-- 底部按钮 -->
    <view class="fixed bottom-0 left-0 right-0 bg-white px-4 py-4 shadow-lg">
      <wd-button
        type="primary"
        block
        size="large"
        custom-class="w-full"
        @click="submitForm"
      >
        下一步
      </wd-button>
    </view>
  </view>
</template>

<style scoped>
/* 自定义样式 */
.rotate-45 {
  transform: rotate(45deg);
}

/* 确保输入框样式一致 */
input {
  outline: none;
  border: none;
  background: transparent;
}

/* 按钮样式重置 */
button {
  border: none;
  outline: none;
  background: transparent;
}

button::after {
  border: none;
}
</style>