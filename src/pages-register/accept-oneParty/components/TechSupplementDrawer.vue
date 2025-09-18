<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { systemInfo } from '@/utils/systemInfo'

interface Props {
  visible?: boolean
  selectedTechs?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  selectedTechs: () => []
})

const emit = defineEmits(['update:visible', 'update:selectedTechs', 'confirm'])

// 本地选中的技术数组
const localSelectedTechs = ref<string[]>([...props.selectedTechs])

// 使用computed来处理v-model
const visible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value)
})

// 监听外部传入的值变化
watch(() => props.selectedTechs, (newVal) => {
  localSelectedTechs.value = [...newVal]
}, { deep: true })

// 技术标签分类
const techCategories = [
  {
    name: '前端技术',
    techs: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Vue.js', 'React', 'Angular', 'jQuery', 'Bootstrap', 'Tailwind CSS', 'Sass/Less', 'Webpack', 'Vite', 'Nuxt.js', 'Next.js']
  },
  {
    name: '后端技术',
    techs: ['Node.js', 'Java', 'Python', 'PHP', 'C#', 'Go', 'Rust', 'Ruby', 'Spring Boot', 'Express.js', 'Django', 'Flask', 'Laravel', 'ASP.NET', 'Gin']
  },
  {
    name: '数据库',
    techs: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Oracle', 'SQL Server', 'Elasticsearch', 'InfluxDB', 'Cassandra']
  },
  {
    name: '移动开发',
    techs: ['微信小程序', 'uni-app', 'React Native', 'Flutter', 'Android', 'iOS', 'Ionic', 'Cordova', 'Taro', 'Kotlin', 'Swift']
  },
  {
    name: '云服务与部署',
    techs: ['Docker', 'Kubernetes', 'AWS', '阿里云', '腾讯云', 'Azure', 'Nginx', 'Apache', 'Jenkins', 'GitLab CI/CD', 'GitHub Actions']
  },
  {
    name: '开发工具',
    techs: ['Git', 'SVN', 'VS Code', 'IntelliJ IDEA', 'Postman', 'Figma', 'Sketch', 'Photoshop', 'Jira', 'Confluence']
  },
  {
    name: '其他技能',
    techs: ['RESTful API', 'GraphQL', 'WebSocket', '微服务架构', '分布式系统', '性能优化', '安全防护', '测试驱动开发', 'Agile开发', 'DevOps']
  }
]

// 切换技术选择状态
const toggleTech = (tech: string) => {
  const index = localSelectedTechs.value.indexOf(tech)
  if (index > -1) {
    localSelectedTechs.value.splice(index, 1)
  } else {
    localSelectedTechs.value.push(tech)
  }
}

// 检查技术是否被选中
const isTechSelected = (tech: string) => {
  return localSelectedTechs.value.includes(tech)
}

// 关闭弹框
const closeDrawer = () => {
  emit('update:visible', false)
}

// 确认提交
const confirmSubmit = () => {
  emit('update:selectedTechs', localSelectedTechs.value)
  emit('confirm', localSelectedTechs.value)
  closeDrawer()
}

// 清空选择
const clearSelection = () => {
  localSelectedTechs.value = []
}

// 计算内容区域高度，减去状态栏、导航栏、头部和统计区域的高度
const contentHeight = computed(() => {
  const statusBarHeight = systemInfo?.statusBarHeight || 0 // 状态栏高度
  const navigationBarHeight = 44 // 导航栏高度（uni-app默认44px）
  const drawerHeaderHeight = 64 // 抽屉头部高度
  const selectedCountHeight = 48 // 已选择统计区域高度
  // 注意：不减去底部按钮高度，因为底部按钮是固定定位的

  const totalReduceHeight = statusBarHeight + navigationBarHeight + drawerHeaderHeight + selectedCountHeight
  return `calc(100vh - ${totalReduceHeight}px)`
})</script>

<template>
  <wd-popup
    v-model="visible"
    position="right"
    :safe-area-inset-bottom="false"
    custom-style="width: 85vw; max-width: 450px; height: 100vh;"
  >
    <!-- 头部 -->
    <view class="drawer-header flex items-center justify-between p-4 border-b border-gray-200">
      <text class="text-lg font-semibold text-gray-800">选择技术栈</text>
      <view class="close-btn w-8 h-8 flex items-center justify-center" @tap="closeDrawer">
        <text class="text-gray-500 text-xl">×</text>
      </view>
    </view>

    <!-- 已选择的技术统计 -->
    <view class="selected-count p-3 bg-blue-50 border-b border-gray-200">
      <text class="text-sm text-blue-600">已选择 {{ localSelectedTechs.length }} 项技术</text>
    </view>

    <!-- 内容区域 -->
    <view class="drawer-content flex-1 overflow-y-auto" :style="{ height: contentHeight }">
      <view
        v-for="category in techCategories"
        :key="category.name"
        class="category-section p-4 border-b border-gray-100"
      >
        <!-- 分类标题 -->
        <view class="category-title mb-3">
          <text class="text-base font-medium text-gray-700">{{ category.name }}</text>
        </view>

        <!-- 技术标签 -->
        <view class="tech-tags flex flex-wrap gap-2">
          <view
            v-for="tech in category.techs"
            :key="tech"
            class="tech-tag px-3 py-2 rounded-full text-sm border transition-all duration-200"
            :class="isTechSelected(tech) ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-100 text-gray-700 border-gray-300'"
            @tap="toggleTech(tech)"
          >
            <text>{{ tech }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部操作按钮 -->
    <view class="drawer-footer p-4 border-t border-gray-200 bg-white">
      <view class="flex gap-3">
        <wd-button
          type="info"
          size="medium"
          custom-style="flex: 1;"
          @tap="clearSelection"
        >
          清空选择
        </wd-button>
        <wd-button
          type="primary"
          size="medium"
          custom-style="flex: 2;"
          @tap="confirmSubmit"
        >
          确认选择
        </wd-button>
      </view>
    </view>
  </wd-popup>
</template>

<style scoped>
.tech-tag {
  transition: all 0.2s ease;
  user-select: none;
}

.tech-tag:active {
  transform: scale(0.95);
}

.close-btn {
  transition: all 0.2s ease;
}

.close-btn:active {
  background-color: #f3f4f6;
  border-radius: 50%;
}

.category-section:last-child {
  border-bottom: none;
}

.drawer-content {
  background-color: #fafafa;
}

.drawer-footer {
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
}
</style>