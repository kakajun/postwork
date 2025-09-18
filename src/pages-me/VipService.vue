<script setup lang="ts">
import { ref } from 'vue'

definePage({
  style: {
    navigationBarTitleText: '终身VIP购买',
    navigationBarBackgroundColor: '#ff6b35',
    navigationBarTextStyle: 'white',
  },
})

// 当前选中的标签
const activeTab = ref(2) // 默认选中终身VIP

// 标签数据
const tabs = ref([
  { id: 0, name: '功能' },
  { id: 1, name: '普通注册' },
  { id: 2, name: '终身VIP' }
])

// 功能对比数据
const featureComparison = ref([
  {
    feature: '项目关厅',
    free: '5个/月',
    vip: '不限'
  },
  {
    feature: '接收项目',
    free: '5个/月',
    vip: '不限'
  }
])

// 用户协议同意状态
const agreeTerms = ref(false)

// 切换标签
const switchTab = (tabId: number) => {
  activeTab.value = tabId
}

// 购买VIP
const buyVip = () => {
  if (!agreeTerms.value) {
    uni.showToast({
      title: '请先同意用户协议',
      icon: 'none'
    })
    return
  }
  
  console.log('购买VIP')
  // 这里可以实现支付逻辑
  uni.showToast({
    title: '跳转支付页面',
    icon: 'success'
  })
}

// 查看用户协议
const viewTerms = () => {
  console.log('查看相关条款')
  // 这里可以跳转到用户协议页面
}
</script>

<template>
  <view class="vip-container">
    <!-- 顶部渐变背景 -->
    <view class="header-bg">
      <!-- 标签切换 -->
      <view class="tabs-container">
        <view 
          class="tab-item" 
          :class="{ active: activeTab === tab.id }"
          v-for="tab in tabs" 
          :key="tab.id"
          @click="switchTab(tab.id)"
        >
          <text class="tab-text">{{ tab.name }}</text>
        </view>
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="content-container">
      <!-- 功能对比表格 -->
      <view class="comparison-table" v-if="activeTab === 0 || activeTab === 2">
        <!-- 表头 -->
        <view class="table-header">
          <view class="header-cell feature-col">功能</view>
          <view class="header-cell">普通注册</view>
          <view class="header-cell">终身VIP</view>
        </view>
        
        <!-- 分隔线 -->
        <view class="table-divider"></view>
        
        <!-- 表格内容 -->
        <view class="table-body">
          <view 
            class="table-row" 
            v-for="(item, index) in featureComparison" 
            :key="index"
          >
            <view class="table-cell feature-col">{{ item.feature }}</view>
            <view class="table-cell">{{ item.free }}</view>
            <view class="table-cell">{{ item.vip }}</view>
          </view>
        </view>
      </view>

      <!-- 普通注册内容 -->
      <view class="normal-content" v-if="activeTab === 1">
        <view class="normal-info">
          <text class="normal-title">普通注册功能</text>
          <text class="normal-desc">免费使用基础功能，每月限额使用</text>
        </view>
      </view>

      <!-- 购买按钮和协议 -->
      <view class="bottom-section" v-if="activeTab === 2">
        <view class="buy-button" @click="buyVip">
          <text class="buy-text">99元永久购买</text>
        </view>
        
        <view class="agreement-section">
          <view class="checkbox-container" @click="agreeTerms = !agreeTerms">
            <view class="checkbox" :class="{ checked: agreeTerms }">
              <text class="check-icon" v-if="agreeTerms">✓</text>
            </view>
            <text class="agreement-text">
              勾选代表阅读并同意
              <text class="terms-link" @click.stop="viewTerms">《相关条款》</text>
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.vip-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #ff8a50 0%, #ff6b35 50%, #f5f5f5 50%, #f5f5f5 100%);
}

.header-bg {
  background: linear-gradient(135deg, #ff8a50 0%, #ff6b35 100%);
  padding: 40rpx 20rpx 60rpx;
  position: relative;
}

.tabs-container {
  display: flex;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12rpx;
  padding: 8rpx;
  backdrop-filter: blur(10rpx);
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 20rpx 0;
  border-radius: 8rpx;
  transition: all 0.3s ease;
}

.tab-item.active {
  background: white;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.tab-text {
  font-size: 28rpx;
  font-weight: 500;
  color: white;
}

.tab-item.active .tab-text {
  color: #ff6b35;
  font-weight: 600;
}

.content-container {
  background: white;
  margin: -40rpx 20rpx 0;
  border-radius: 20rpx 20rpx 0 0;
  min-height: calc(100vh - 200rpx);
  padding: 40rpx 30rpx;
  box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.comparison-table {
  margin-bottom: 60rpx;
}

.table-header {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
}

.header-cell {
  flex: 1;
  text-align: center;
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
}

.feature-col {
  text-align: left !important;
}

.table-divider {
  height: 2rpx;
  background: #f0f0f0;
  margin: 10rpx 0 20rpx;
}

.table-body {
  
}

.table-row {
  display: flex;
  align-items: center;
  padding: 24rpx 0;
  border-bottom: 1rpx solid #f8f9fa;
}

.table-row:last-child {
  border-bottom: none;
}

.table-cell {
  flex: 1;
  text-align: center;
  font-size: 26rpx;
  color: #666;
  line-height: 1.4;
}

.normal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80rpx 0;
}

.normal-info {
  text-align: center;
}

.normal-title {
  display: block;
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 20rpx;
}

.normal-desc {
  font-size: 26rpx;
  color: #666;
  line-height: 1.5;
}

.bottom-section {
  margin-top: 60rpx;
}

.buy-button {
  background: linear-gradient(135deg, #ff8a50 0%, #ff6b35 100%);
  border-radius: 50rpx;
  padding: 28rpx 0;
  text-align: center;
  margin-bottom: 40rpx;
  box-shadow: 0 8rpx 24rpx rgba(255, 107, 53, 0.3);
}

.buy-text {
  font-size: 32rpx;
  font-weight: 600;
  color: white;
}

.agreement-section {
  display: flex;
  justify-content: center;
}

.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox {
  width: 32rpx;
  height: 32rpx;
  border: 2rpx solid #ddd;
  border-radius: 6rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16rpx;
  transition: all 0.3s ease;
}

.checkbox.checked {
  background: #ff6b35;
  border-color: #ff6b35;
}

.check-icon {
  color: white;
  font-size: 20rpx;
  font-weight: bold;
}

.agreement-text {
  font-size: 24rpx;
  color: #666;
  line-height: 1.4;
}

.terms-link {
  color: #ff6b35;
  text-decoration: underline;
}

/* 响应式调整 */
@media (max-width: 750rpx) {
  .header-cell,
  .table-cell {
    font-size: 24rpx;
  }
  
  .tab-text {
    font-size: 26rpx;
  }
  
  .buy-text {
    font-size: 30rpx;
  }
}
</style>