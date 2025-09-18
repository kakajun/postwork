<script setup lang="ts">
import { ref } from 'vue'

definePage({
  style: {
    navigationBarTitleText: '隐私政策',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black'
  },
})

// 最后更新时间
const lastUpdateTime = ref('2024年1月15日')
</script>

<template>
  <view class="privacy-policy-page">
    <scroll-view scroll-y class="content-scroll">
      <view class="content-container">
        <!-- 标题和更新时间 -->
        <view class="header-section">
          <text class="main-title">隐私政策</text>
          <text class="update-time">最后更新时间：{{ lastUpdateTime }}</text>
        </view>

        <!-- 引言 -->
        <view class="section">
          <text class="section-content">
            欢迎使用我们的应用程序！我们非常重视您的隐私权，并致力于保护您的个人信息。本隐私政策旨在向您说明我们如何收集、使用、存储和保护您的个人信息，以及您对这些信息享有的权利。
          </text>
        </view>

        <!-- 第一部分：信息收集 -->
        <view class="section">
          <text class="section-title">1. 我们收集的信息</text>
          <text class="section-subtitle">1.1 您主动提供的信息</text>
          <text class="section-content">
            • 注册信息：当您注册账户时，我们会收集您的手机号码、用户名等基本信息
            • 个人资料：您可以选择提供头像、昵称、个人简介等信息
            • 联系信息：为了提供客户服务，我们可能收集您的联系方式
          </text>
          
          <text class="section-subtitle">1.2 自动收集的信息</text>
          <text class="section-content">
            • 设备信息：设备型号、操作系统版本、设备标识符等
            • 使用信息：应用使用情况、功能使用频率、操作日志等
            • 位置信息：在您授权的情况下，我们可能收集您的地理位置信息
          </text>
        </view>

        <!-- 第二部分：信息使用 -->
        <view class="section">
          <text class="section-title">2. 信息使用目的</text>
          <text class="section-content">
            我们收集和使用您的个人信息主要用于以下目的：
            
            • 提供和改进服务：为您提供应用的核心功能和服务
            • 账户管理：创建和管理您的用户账户
            • 客户支持：响应您的咨询和提供技术支持
            • 安全保障：保护应用和用户的安全，防范欺诈行为
            • 法律合规：遵守适用的法律法规要求
          </text>
        </view>

        <!-- 第三部分：信息共享 -->
        <view class="section">
          <text class="section-title">3. 信息共享与披露</text>
          <text class="section-content">
            我们承诺不会出售、出租或以其他方式向第三方披露您的个人信息，除非：
            
            • 获得您的明确同意
            • 为提供您要求的服务而必需
            • 遵守法律法规或政府部门的要求
            • 保护我们的合法权益或其他用户的安全
            • 在企业重组、合并或收购时，按照法律要求进行信息转移
          </text>
        </view>

        <!-- 第四部分：信息存储 -->
        <view class="section">
          <text class="section-title">4. 信息存储与安全</text>
          <text class="section-subtitle">4.1 存储期限</text>
          <text class="section-content">
            我们仅在实现收集目的所必需的期间内保留您的个人信息。当您删除账户或不再使用我们的服务时，我们将在合理期限内删除或匿名化处理您的个人信息。
          </text>
          
          <text class="section-subtitle">4.2 安全措施</text>
          <text class="section-content">
            我们采用行业标准的安全措施来保护您的个人信息：
            • 数据加密：对敏感信息进行加密存储和传输
            • 访问控制：严格限制对个人信息的访问权限
            • 安全监控：持续监控系统安全状况
            • 定期审计：定期进行安全评估和漏洞修复
          </text>
        </view>

        <!-- 第五部分：用户权利 -->
        <view class="section">
          <text class="section-title">5. 您的权利</text>
          <text class="section-content">
            根据适用的法律法规，您对自己的个人信息享有以下权利：
            
            • 访问权：您有权了解我们收集和使用您个人信息的情况
            • 更正权：您有权要求我们更正不准确或不完整的个人信息
            • 删除权：在特定情况下，您有权要求我们删除您的个人信息
            • 限制处理权：您有权要求我们限制对您个人信息的处理
            • 数据可携权：您有权要求我们以结构化、常用的格式提供您的个人信息
          </text>
        </view>

        <!-- 第六部分：第三方服务 -->
        <view class="section">
          <text class="section-title">6. 第三方服务</text>
          <text class="section-content">
            我们的应用可能包含第三方服务或链接到第三方网站。这些第三方服务有自己的隐私政策，我们不对其隐私做法负责。我们建议您在使用第三方服务时仔细阅读其隐私政策。
          </text>
        </view>

        <!-- 第七部分：未成年人保护 -->
        <view class="section">
          <text class="section-title">7. 未成年人保护</text>
          <text class="section-content">
            我们非常重视未成年人的隐私保护。如果您是未成年人，请在监护人的指导下使用我们的服务。我们不会故意收集未成年人的个人信息，如果我们发现收集了未成年人的个人信息，将会立即删除。
          </text>
        </view>

        <!-- 第八部分：政策更新 -->
        <view class="section">
          <text class="section-title">8. 隐私政策更新</text>
          <text class="section-content">
            我们可能会不时更新本隐私政策。当我们对隐私政策进行重大变更时，我们会通过应用内通知、邮件或其他适当方式通知您。请您定期查看本隐私政策以了解最新信息。
          </text>
        </view>

        <!-- 第九部分：联系我们 -->
        <view class="section">
          <text class="section-title">9. 联系我们</text>
          <text class="section-content">
            如果您对本隐私政策有任何疑问、意见或建议，或者需要行使您的权利，请通过以下方式联系我们：
            
            • 邮箱：privacy@example.com
            • 电话：400-123-4567
            • 地址：北京市朝阳区xxx街道xxx号
            
            我们将在收到您的请求后尽快回复并处理。
          </text>
        </view>

        <!-- 生效时间 -->
        <view class="section">
          <text class="effective-date">
            本隐私政策自{{ lastUpdateTime }}起生效。
          </text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.privacy-policy-page {
  height: 100vh;
  background-color: #f8f8f8;
}

.content-scroll {
  height: 100%;
}

.content-container {
  padding: 40rpx 30rpx;
  background-color: white;
  margin: 20rpx;
  border-radius: 20rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

/* 头部区域 */
.header-section {
  text-align: center;
  margin-bottom: 60rpx;
  padding-bottom: 40rpx;
  border-bottom: 2rpx solid #f0f0f0;
}

.main-title {
  display: block;
  font-size: 48rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 20rpx;
}

.update-time {
  display: block;
  font-size: 28rpx;
  color: #666;
}

/* 章节样式 */
.section {
  margin-bottom: 50rpx;
}

.section-title {
  display: block;
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 30rpx;
  line-height: 1.4;
}

.section-subtitle {
  display: block;
  font-size: 32rpx;
  font-weight: 500;
  color: #444;
  margin: 25rpx 0 20rpx 0;
  line-height: 1.4;
}

.section-content {
  display: block;
  font-size: 30rpx;
  color: #555;
  line-height: 1.8;
  margin-bottom: 20rpx;
  text-align: justify;
  white-space: pre-line;
}

/* 生效时间 */
.effective-date {
  display: block;
  font-size: 28rpx;
  color: #888;
  text-align: center;
  font-style: italic;
  margin-top: 40rpx;
  padding-top: 40rpx;
  border-top: 2rpx solid #f0f0f0;
}

/* 响应式适配 */
@media (max-width: 750rpx) {
  .content-container {
    margin: 10rpx;
    padding: 30rpx 20rpx;
  }
  
  .main-title {
    font-size: 42rpx;
  }
  
  .section-title {
    font-size: 32rpx;
  }
  
  .section-subtitle {
    font-size: 30rpx;
  }
  
  .section-content {
    font-size: 28rpx;
  }
}
</style>