<script setup lang="ts">
import { ref } from 'vue'

definePage({
  style: {
    navigationBarTitleText: '我的资料',
    navigationBarBackgroundColor: '#ff6b35',
    navigationBarTextStyle: 'white',
  },
})

// 基本信息数据
const basicInfo = ref({
  company: '深圳市工程科技有限公司',
  contact: '段师昌',
  phone: '13922814007',
  verified: true
})

// 增长技术数据
const techInfo = ref({
  os: 'linux',
  languages: 'C/C++, shell, python',
  direction: '嵌入式应用'
})

// 技能标签数据
const skillTags = ref([
  '深圳标签',
  '为力做理想的企业级一体化木工标签',
  '音视频解码',
  'linux嵌入系统构建',
  'MakeFile',
  '项目管理',
  '熟练ffmpeg',
  'DVR开发'
])

// 编辑功能
const handleEdit = (section: string) => {
  console.log('编辑', section)
  // 这里可以跳转到编辑页面或打开编辑弹窗
}

// 验证手机号
const handleVerifyPhone = () => {
  console.log('验证手机号')
  // 这里可以实现手机号验证逻辑
}
</script>

<template>
  <view class="mydata-container">
    <!-- 基本信息模块 -->
    <view class="section">
      <view class="section-header">
        <view class="section-title">
          <view class="title-icon"></view>
          <text class="title-text">基本信息</text>
        </view>
        <view class="edit-btn" @click="handleEdit('basic')">
          <text class="edit-text">编辑</text>
        </view>
      </view>
      
      <view class="info-list">
        <view class="info-item">
          <text class="info-label">公司：</text>
          <text class="info-value">{{ basicInfo.company }}</text>
        </view>
        
        <view class="info-item">
          <text class="info-label">联系人：</text>
          <text class="info-value">{{ basicInfo.contact }}</text>
        </view>
        
        <view class="info-item">
          <text class="info-label">手机号码/微信：</text>
          <text class="info-value">{{ basicInfo.phone }}</text>
          <view class="verify-icon" v-if="basicInfo.verified" @click="handleVerifyPhone">
            <text class="verify-text">✓</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 增长技术模块 -->
    <view class="section">
      <view class="section-header">
        <view class="section-title">
          <view class="title-icon"></view>
          <text class="title-text">增长技术</text>
        </view>
        <view class="edit-btn" @click="handleEdit('tech')">
          <text class="edit-text">编辑</text>
        </view>
      </view>
      
      <view class="info-list">
        <view class="info-item">
          <text class="info-label">操作系统：</text>
          <text class="info-value">{{ techInfo.os }}</text>
        </view>
        
        <view class="info-item">
          <text class="info-label">编程语言：</text>
          <text class="info-value">{{ techInfo.languages }}</text>
        </view>
        
        <view class="info-item">
          <text class="info-label">开发方向：</text>
          <text class="info-value">{{ techInfo.direction }}</text>
        </view>
      </view>
    </view>

    <!-- 技能标签模块 -->
    <view class="section">
      <view class="section-header">
        <view class="section-title">
          <view class="title-icon"></view>
          <text class="title-text">技能标签</text>
        </view>
      </view>
      
      <view class="tags-container">
        <view 
          class="skill-tag" 
          v-for="(tag, index) in skillTags" 
          :key="index"
        >
          <text class="tag-text">{{ tag }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.mydata-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;
}

.section {
  background: white;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx 30rpx 20rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.section-title {
  display: flex;
  align-items: center;
}

.title-icon {
  width: 6rpx;
  height: 32rpx;
  background: linear-gradient(135deg, #ff8a50 0%, #ff6b35 100%);
  border-radius: 3rpx;
  margin-right: 16rpx;
}

.title-text {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.edit-btn {
  padding: 8rpx 16rpx;
}

.edit-text {
  font-size: 28rpx;
  color: #666;
}

.info-list {
  padding: 20rpx 30rpx 30rpx;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
  min-height: 44rpx;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-label {
  font-size: 28rpx;
  color: #666;
  min-width: 160rpx;
  flex-shrink: 0;
}

.info-value {
  font-size: 28rpx;
  color: #333;
  flex: 1;
  line-height: 1.4;
}

.verify-icon {
  width: 32rpx;
  height: 32rpx;
  background: #4CAF50;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 16rpx;
  flex-shrink: 0;
}

.verify-text {
  color: white;
  font-size: 20rpx;
  font-weight: bold;
}

.tags-container {
  padding: 20rpx 30rpx 30rpx;
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.skill-tag {
  background: #f8f9fa;
  border: 1rpx solid #e9ecef;
  border-radius: 20rpx;
  padding: 12rpx 20rpx;
  display: inline-flex;
  align-items: center;
}

.tag-text {
  font-size: 24rpx;
  color: #495057;
  line-height: 1.2;
}

/* 响应式调整 */
@media (max-width: 750rpx) {
  .info-label {
    min-width: 140rpx;
  }
  
  .title-text {
    font-size: 30rpx;
  }
  
  .info-value {
    font-size: 26rpx;
  }
}
</style>