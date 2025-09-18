<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { safeAreaInsets } from '@/utils/systemInfo'
import TechSupplementDrawer from './components/TechSupplementDrawer.vue'

// 页面配置
definePage({
  style: {
    navigationBarTitleText: '接单方信息注册',
    navigationBarBackgroundColor: '#FF6F00',
    navigationBarTextStyle: 'white'
  }
})

// 技术要求选项
const techOptions = ref([
  { label: '前端开发', value: 'frontend' },
  { label: '后端开发', value: 'backend' },
  { label: '移动开发', value: 'mobile' },
  { label: '全栈开发', value: 'fullstack' },
  { label: 'UI/UX设计', value: 'design' },
  { label: '数据分析', value: 'data' },
  { label: '人工智能', value: 'ai' },
  { label: '区块链', value: 'blockchain' }
])

// 表单数据
const formData = ref({
  avatar: '',
  techRequirementIndex: 0, // 技术要求索引，默认选择第一个
  selectedTechs: [] as string[], // 选中的技术数组
  tags: [] as string[]
})

// 控制wot-design-uni picker显示
const showTechPicker = ref(false)

// 新标签输入
const newTag = ref('')
const showTagInput = ref(false)

// 技术补充弹框控制
const showTechDrawer = ref(false)

// 页面加载
onLoad(() => {
  console.log('接单方信息注册页面加载')
})

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 选择头像
const chooseAvatar = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      formData.value.avatar = res.tempFilePaths[0]
    },
    fail: (err) => {
      console.error('选择头像失败:', err)
      uni.showToast({
        title: '选择头像失败',
        icon: 'none'
      })
    }
  })
}

// 技术要求选择
const onTechRequirementChange = (e: any) => {
  // e.detail.value 是数组
  const index =e.detail.value&& e.detail.value[0]
  formData.value.techRequirementIndex = index
  showTechPicker.value = false
}

// 显示技术要求选择器
const showTechRequirementPicker = () => {
  showTechPicker.value = true
}

// 添加标签
const addTag = () => {
  if (newTag.value.trim()) {
    if (!formData.value.tags.includes(newTag.value.trim())) {
      formData.value.tags.push(newTag.value.trim())
      newTag.value = ''
      showTagInput.value = false
    } else {
      uni.showToast({
        title: '标签已存在',
        icon: 'none'
      })
    }
  }
}

// 删除标签
const removeTag = (index: number) => {
  formData.value.tags.splice(index, 1)
}

// 显示添加标签输入框
const showAddTagInput = () => {
  showTagInput.value = true
}

// 取消添加标签
const cancelAddTag = () => {
  newTag.value = ''
  showTagInput.value = false
}

// 显示技术补充弹框
const showTechSupplementDrawer = () => {
  showTechDrawer.value = true
}

// 技术补充弹框确认
const onTechSupplementConfirm = (selectedTechs: string[]) => {
  formData.value.selectedTechs = selectedTechs
}
// 跳转到注册第二步
const gotoStepSecond = () => {
  uni.navigateTo({
    url: '/pages-register/accept-oneParty/StepSecond'
  })
}
// 提交表单
const submitForm = () => {
  // 表单验证
  if (!formData.value.avatar) {
    uni.showToast({
      title: '请选择头像',
      icon: 'none'
    })
    return
  }

  // 技术要求已有默认值，无需验证

  // 提交逻辑
  console.log('提交表单数据:', {
    ...formData.value,
    techRequirement: techOptions.value[formData.value.techRequirementIndex].label
  })
  uni.showToast({
    title: '信息已保存',
    icon: 'success'
  })

  // 延迟跳转到第二步
  setTimeout(() => {
    gotoStepSecond()
  }, 1500)
}


</script>

<template>
  <view class="bg-gray-50">
    <!-- 内容区域 -->
    <view class="px-4 py-6">
      <!-- 头像上传区域 -->
      <view class="flex justify-center mb-8">
        <view
          class="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden"
          @tap="chooseAvatar"
        >
          <image
            v-if="formData.avatar"
            :src="formData.avatar"
            class="w-full h-full object-cover"
            mode="aspectFill"
          />
          <view
            v-else
            class="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center"
          >
            <view class="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <view class="w-4 h-4 bg-gray-400 rounded-full"></view>
            </view>
            <view class="absolute mt-4">
              <view class="w-6 h-3 bg-white rounded-t-full"></view>
            </view>
          </view>
        </view>
      </view>

      <!-- 技术要求选择 -->
      <view class="mb-6">
        <view
          class="bg-white rounded-lg px-4 py-4 flex items-center justify-between shadow-sm"
          @tap="showTechRequirementPicker"
        >
          <view class="text-base text-gray-700">
            {{ techOptions[formData.techRequirementIndex].label }}
          </view>
          <view class="w-2 h-2 border-r-2 border-b-2 border-gray-400 transform rotate-45"></view>
        </view>

        <!-- 技术要求选择器 -->
         <wd-picker
           v-model="showTechPicker"
           :columns="[techOptions.map(item => item.label)]"
           :value="[formData.techRequirementIndex]"
           @confirm="onTechRequirementChange"
           @cancel="showTechPicker = false"
           title="请选择技术要求"
         />
      </view>

      <!-- 技术补充 Cell -->
      <view class="mb-6">
        <wd-cell-group>
          <wd-cell
            title="技术栈选择"
            :value="formData.selectedTechs.length > 0 ? `已选择 ${formData.selectedTechs.length} 项技术` : '点击选择技术栈'"
            :value-class="formData.selectedTechs.length === 0 ? 'text-gray-400' : 'text-blue-600'"
            is-link
            @tap="showTechSupplementDrawer"
          />
        </wd-cell-group>

        <!-- 显示已选择的技术标签 -->
        <view v-if="formData.selectedTechs.length > 0" class="mt-3 px-4">
          <view class="flex flex-wrap gap-2">
            <view
              v-for="tech in formData.selectedTechs"
              :key="tech"
              class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
            >
              {{ tech }}
            </view>
          </view>
        </view>
      </view>

      <!-- 添加标签区域 -->
      <view class="mb-6">
        <view class="bg-white rounded-lg px-4 py-4 shadow-sm">
          <!-- 添加标签按钮 -->
          <view
            v-if="!showTagInput"
            class="flex items-center text-gray-500 mb-3"
            @tap="showAddTagInput"
          >
            <view class="w-6 h-6 border border-gray-300 rounded flex items-center justify-center mr-3">
              <view class="w-3 h-0.5 bg-gray-400"></view>
              <view class="w-0.5 h-3 bg-gray-400 absolute"></view>
            </view>
            <view class="text-base">添加标签</view>
          </view>

          <!-- 标签输入框 -->
          <view
            v-if="showTagInput"
            class="flex items-center mb-3"
          >
            <wd-input
              v-model="newTag"
              placeholder="输入标签名称"
              maxlength="10"
              class="flex-1 mr-2"
              @confirm="addTag"
            />
            <wd-button
              type="primary"
              size="small"
              class="ml-0"
              @click="addTag"
            >
              确定
            </wd-button>
            <wd-button
              size="small"
              class="ml-2"
              @click="cancelAddTag"
            >
              取消
            </wd-button>
          </view>

          <!-- 已添加的标签 -->
          <view
            v-if="formData.tags.length > 0"
            class="flex flex-wrap gap-2"
          >
            <view
              v-for="(tag, index) in formData.tags"
              :key="index"
              class="flex items-center bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm"
            >
              <view class="mr-1">{{ tag }}</view>
              <view
                class="w-4 h-4 bg-orange-400 text-white rounded-full flex items-center justify-center text-xs"
                @tap="removeTag(index)"
              >
                ×
              </view>
            </view>
          </view>

          <!-- 提示文字 -->
          <view class="text-sm text-gray-400 mt-3">
            为方便搜索建议添加一种技术为一标签
          </view>
        </view>
      </view>
    </view>
    <!-- 底部按钮上移，避免页面滚动条 -->
    <view class="mt-8 mb-8 px-4">
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

  <!-- 技术补充弹框 -->
  <TechSupplementDrawer
    v-model:visible="showTechDrawer"
    v-model:selected-techs="formData.selectedTechs"
    @confirm="onTechSupplementConfirm"
  />
</template>

<style scoped>
/* 自定义样式 */
.rotate-45 {
  transform: rotate(45deg);
}

.rotate-n45deg {
  transform: rotate(-45deg);
}

/* 确保输入框样式一致 */
input, textarea {
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