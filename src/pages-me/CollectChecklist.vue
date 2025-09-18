<script setup lang="ts">
import { ref, computed } from 'vue'

definePage({
  style: {
    navigationBarTitleText: '个人信息收集清单',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black'
  },
})

// 信息收集项目的类型定义
interface CollectItem {
  id: string
  category: string
  name: string
  description: string
  purpose: string
  isRequired: boolean
  isCollected: boolean
  collectTime?: string
  dataType: 'basic' | 'sensitive' | 'behavioral'
  retention: string
}

// 信息收集清单数据
const collectItems = ref<CollectItem[]>([
  // 基础信息
  {
    id: '1',
    category: '基础信息',
    name: '手机号码',
    description: '用于账户注册和登录验证',
    purpose: '账户验证、安全登录、找回密码',
    isRequired: true,
    isCollected: true,
    collectTime: '2024-01-15 10:30:00',
    dataType: 'basic',
    retention: '账户注销后30天内删除'
  },
  {
    id: '2',
    category: '基础信息',
    name: '用户昵称',
    description: '用于个性化显示和社交互动',
    purpose: '个人资料展示、用户识别',
    isRequired: false,
    isCollected: true,
    collectTime: '2024-01-15 10:35:00',
    dataType: 'basic',
    retention: '账户注销后立即删除'
  },
  {
    id: '3',
    category: '基础信息',
    name: '头像图片',
    description: '用于个人资料展示',
    purpose: '个性化展示、用户识别',
    isRequired: false,
    isCollected: false,
    dataType: 'basic',
    retention: '账户注销后立即删除'
  },
  // 设备信息
  {
    id: '4',
    category: '设备信息',
    name: '设备型号',
    description: '用于适配不同设备的显示效果',
    purpose: '界面适配、功能优化',
    isRequired: true,
    isCollected: true,
    collectTime: '2024-01-15 10:30:00',
    dataType: 'behavioral',
    retention: '收集后90天内删除'
  },
  {
    id: '5',
    category: '设备信息',
    name: '操作系统版本',
    description: '用于兼容性检测和功能适配',
    purpose: '系统兼容、功能适配',
    isRequired: true,
    isCollected: true,
    collectTime: '2024-01-15 10:30:00',
    dataType: 'behavioral',
    retention: '收集后90天内删除'
  },
  {
    id: '6',
    category: '设备信息',
    name: '设备标识符',
    description: '用于设备识别和安全验证',
    purpose: '设备识别、安全防护',
    isRequired: true,
    isCollected: true,
    collectTime: '2024-01-15 10:30:00',
    dataType: 'sensitive',
    retention: '收集后180天内删除'
  },
  // 位置信息
  {
    id: '7',
    category: '位置信息',
    name: '地理位置',
    description: '用于提供基于位置的服务',
    purpose: '位置服务、内容推荐',
    isRequired: false,
    isCollected: false,
    dataType: 'sensitive',
    retention: '收集后30天内删除'
  },
  {
    id: '8',
    category: '位置信息',
    name: 'IP地址',
    description: '用于网络连接和安全防护',
    purpose: '网络连接、安全防护、地区识别',
    isRequired: true,
    isCollected: true,
    collectTime: '2024-01-15 10:30:00',
    dataType: 'behavioral',
    retention: '收集后30天内删除'
  },
  // 使用行为
  {
    id: '9',
    category: '使用行为',
    name: '应用使用记录',
    description: '记录应用的使用情况和操作行为',
    purpose: '功能优化、用户体验改进',
    isRequired: false,
    isCollected: true,
    collectTime: '2024-01-15 10:30:00',
    dataType: 'behavioral',
    retention: '收集后60天内删除'
  },
  {
    id: '10',
    category: '使用行为',
    name: '页面访问记录',
    description: '记录用户访问的页面和停留时间',
    purpose: '用户行为分析、产品优化',
    isRequired: false,
    isCollected: true,
    collectTime: '2024-01-15 10:30:00',
    dataType: 'behavioral',
    retention: '收集后30天内删除'
  }
])

// 当前选中的分类
const selectedCategory = ref('全部')

// 获取所有分类
const categories = computed(() => {
  const cats = ['全部', ...new Set(collectItems.value.map(item => item.category))]
  return cats
})

// 根据分类筛选数据
const filteredItems = computed(() => {
  if (selectedCategory.value === '全部') {
    return collectItems.value
  }
  return collectItems.value.filter(item => item.category === selectedCategory.value)
})

// 统计信息
const statistics = computed(() => {
  const total = collectItems.value.length
  const collected = collectItems.value.filter(item => item.isCollected).length
  const required = collectItems.value.filter(item => item.isRequired).length
  const sensitive = collectItems.value.filter(item => item.dataType === 'sensitive').length
  
  return { total, collected, required, sensitive }
})

// 切换分类
const switchCategory = (category: string) => {
  selectedCategory.value = category
}

// 获取数据类型标签样式
const getDataTypeClass = (dataType: string) => {
  const classMap = {
    'basic': 'data-type-basic',
    'sensitive': 'data-type-sensitive',
    'behavioral': 'data-type-behavioral'
  }
  return classMap[dataType] || 'data-type-basic'
}

// 获取数据类型文本
const getDataTypeText = (dataType: string) => {
  const textMap = {
    'basic': '基础',
    'sensitive': '敏感',
    'behavioral': '行为'
  }
  return textMap[dataType] || '基础'
}

// 导出数据
const exportData = () => {
  uni.showToast({
    title: '导出功能开发中',
    icon: 'none'
  })
}

// 管理权限
const managePermissions = () => {
  uni.showToast({
    title: '权限管理功能开发中',
    icon: 'none'
  })
}
</script>

<template>
  <view class="collect-checklist-page">
    <!-- 统计概览 -->
    <view class="statistics-section">
      <view class="stats-card">
        <view class="stats-item">
          <text class="stats-number">{{ statistics.total }}</text>
          <text class="stats-label">收集项目</text>
        </view>
        <view class="stats-item">
          <text class="stats-number">{{ statistics.collected }}</text>
          <text class="stats-label">已收集</text>
        </view>
        <view class="stats-item">
          <text class="stats-number">{{ statistics.required }}</text>
          <text class="stats-label">必需项</text>
        </view>
        <view class="stats-item">
          <text class="stats-number">{{ statistics.sensitive }}</text>
          <text class="stats-label">敏感信息</text>
        </view>
      </view>
    </view>

    <!-- 分类筛选 -->
    <view class="category-section">
      <scroll-view scroll-x class="category-scroll">
        <view class="category-list">
          <view 
            v-for="category in categories" 
            :key="category"
            class="category-item"
            :class="{ active: selectedCategory === category }"
            @click="switchCategory(category)"
          >
            <text class="category-text">{{ category }}</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 信息收集清单 -->
    <view class="list-section">
      <view class="section-header">
        <text class="section-title">收集清单</text>
        <view class="header-actions">
          <button class="action-btn" @click="exportData">导出</button>
          <button class="action-btn primary" @click="managePermissions">管理</button>
        </view>
      </view>

      <view class="collect-list">
        <view 
          v-for="item in filteredItems" 
          :key="item.id"
          class="collect-item"
        >
          <view class="item-header">
            <view class="item-title-row">
              <text class="item-name">{{ item.name }}</text>
              <view class="item-tags">
                <text class="data-type-tag" :class="getDataTypeClass(item.dataType)">
                  {{ getDataTypeText(item.dataType) }}
                </text>
                <text v-if="item.isRequired" class="required-tag">必需</text>
              </view>
            </view>
            <view class="collect-status">
              <view class="status-indicator" :class="{ collected: item.isCollected }"></view>
              <text class="status-text">{{ item.isCollected ? '已收集' : '未收集' }}</text>
            </view>
          </view>

          <view class="item-content">
            <view class="content-row">
              <text class="content-label">描述：</text>
              <text class="content-text">{{ item.description }}</text>
            </view>
            <view class="content-row">
              <text class="content-label">用途：</text>
              <text class="content-text">{{ item.purpose }}</text>
            </view>
            <view class="content-row">
              <text class="content-label">保存期限：</text>
              <text class="content-text">{{ item.retention }}</text>
            </view>
            <view v-if="item.collectTime" class="content-row">
              <text class="content-label">收集时间：</text>
              <text class="content-text">{{ item.collectTime }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部说明 -->
    <view class="footer-section">
      <text class="footer-text">
        我们严格按照隐私政策收集和使用您的个人信息，您可以随时查看、修改或删除相关信息。
      </text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.collect-checklist-page {
  min-height: 100vh;
  background-color: #f8f8f8;
  padding-bottom: 40rpx;
}

/* 统计概览 */
.statistics-section {
  padding: 30rpx 20rpx;
  background-color: white;
  margin-bottom: 20rpx;
}

.stats-card {
  display: flex;
  justify-content: space-around;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20rpx;
  padding: 40rpx 20rpx;
}

.stats-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stats-number {
  font-size: 48rpx;
  font-weight: 600;
  color: white;
  margin-bottom: 10rpx;
}

.stats-label {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.8);
}

/* 分类筛选 */
.category-section {
  background-color: white;
  padding: 20rpx 0;
  margin-bottom: 20rpx;
}

.category-scroll {
  white-space: nowrap;
}

.category-list {
  display: flex;
  padding: 0 20rpx;
}

.category-item {
  flex-shrink: 0;
  padding: 16rpx 32rpx;
  margin-right: 20rpx;
  background-color: #f5f5f5;
  border-radius: 50rpx;
  transition: all 0.3s ease;

  &.active {
    background-color: #007aff;
    
    .category-text {
      color: white;
    }
  }
}

.category-text {
  font-size: 28rpx;
  color: #666;
}

/* 列表区域 */
.list-section {
  background-color: white;
  margin: 0 20rpx;
  border-radius: 20rpx;
  overflow: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  border-bottom: 2rpx solid #f0f0f0;
}

.section-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
}

.header-actions {
  display: flex;
  gap: 20rpx;
}

.action-btn {
  padding: 12rpx 24rpx;
  font-size: 26rpx;
  border-radius: 20rpx;
  border: 2rpx solid #e0e0e0;
  background-color: white;
  color: #666;

  &.primary {
    background-color: #007aff;
    border-color: #007aff;
    color: white;
  }
}

/* 收集项目列表 */
.collect-list {
  padding: 0 30rpx;
}

.collect-item {
  padding: 30rpx 0;
  border-bottom: 2rpx solid #f8f8f8;

  &:last-child {
    border-bottom: none;
  }
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20rpx;
}

.item-title-row {
  flex: 1;
}

.item-name {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
  margin-bottom: 10rpx;
  display: block;
}

.item-tags {
  display: flex;
  gap: 10rpx;
}

.data-type-tag {
  padding: 4rpx 12rpx;
  font-size: 22rpx;
  border-radius: 12rpx;
  color: white;

  &.data-type-basic {
    background-color: #52c41a;
  }

  &.data-type-sensitive {
    background-color: #ff4d4f;
  }

  &.data-type-behavioral {
    background-color: #1890ff;
  }
}

.required-tag {
  padding: 4rpx 12rpx;
  font-size: 22rpx;
  border-radius: 12rpx;
  background-color: #fa8c16;
  color: white;
}

.collect-status {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.status-indicator {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background-color: #d9d9d9;

  &.collected {
    background-color: #52c41a;
  }
}

.status-text {
  font-size: 26rpx;
  color: #666;
}

/* 项目内容 */
.item-content {
  background-color: #fafafa;
  border-radius: 12rpx;
  padding: 20rpx;
}

.content-row {
  display: flex;
  margin-bottom: 12rpx;

  &:last-child {
    margin-bottom: 0;
  }
}

.content-label {
  font-size: 26rpx;
  color: #666;
  width: 140rpx;
  flex-shrink: 0;
}

.content-text {
  font-size: 26rpx;
  color: #333;
  flex: 1;
  line-height: 1.5;
}

/* 底部说明 */
.footer-section {
  padding: 40rpx 30rpx;
  text-align: center;
}

.footer-text {
  font-size: 26rpx;
  color: #999;
  line-height: 1.6;
}

/* 响应式适配 */
@media (max-width: 750rpx) {
  .stats-card {
    padding: 30rpx 15rpx;
  }
  
  .stats-number {
    font-size: 42rpx;
  }
  
  .section-header {
    padding: 20rpx;
  }
  
  .collect-list {
    padding: 0 20rpx;
  }
  
  .collect-item {
    padding: 20rpx 0;
  }
}
</style>