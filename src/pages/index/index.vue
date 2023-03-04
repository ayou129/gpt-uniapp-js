<template>
	<view class="index">
		<view class="search-box">
			<input type="text" v-model.trim="searchValue" class="search-input" placeholder="搜索你感兴趣的人" />
			<button class="search-btn" @click="onSearch">搜索</button>
		</view>
		<swiper class="swiper" indicator-dots indicator-active-color="#FF4081" autoplay interval="5000" duration="1000">
			<swiper-item v-for="(item, index) in bannerList" :key="index">
				<image :src="item.img" mode="widthFix" class="swiper-img" />
			</swiper-item>
		</swiper>
		<view class="nav">
			<view class="nav-item" @click="goToMatch">
				<image src="/static/images/nav_match.png" mode="widthFix" />
				<text class="nav-text">匹配</text>
			</view>
			<view class="nav-item" @click="goToCommunity">
				<image src="/static/images/nav_community.png" mode="widthFix" />
				<text class="nav-text">社区</text>
			</view>
			<view class="nav-item" @click="goToFriend">
				<image src="/static/images/nav_friend.png" mode="widthFix" />
				<text class="nav-text">好友</text>
			</view>
			<view class="nav-item" @click="goToMoment">
				<image src="/static/images/nav_moment.png" mode="widthFix" />
				<text class="nav-text">朋友圈</text>
			</view>
		</view>
		<view class="card-list">
			<view class="card-item" v-for="(card, index) in cardList" :key="index">
				<view class="card-header">
					<image :src="card.avatar" mode="aspectFill" class="header-avatar" />
					<text class="header-nickname">{{ card.nickname }}</text>
				</view>
				<view class="card-content">
					<image :src="card.img" mode="aspectFill" class="content-img" />
				</view>
				<view class="card-footer">
					<text class="footer-time">{{ card.time }}</text>
					<view class="footer-btn-group">
						<view class="footer-btn" @click="onLike(card)">
							<image :src="card.like ? '/static/images/icon_like_red.png' : '/static/images/icon_like.png'"
								mode="aspectFit" />
							<text class="btn-text">{{ card.like ? '已赞' : '赞' }}</text>
						</view>
						<view class="footer-btn" @click="onComment(card)">
							<image src="/static/images/icon_comment.png" mode="aspectFit" />
							<text class="btn-text">评论</text>
						</view>
						<view class="footer-btn">
							<image src="/static/images/icon_share.png" mode="aspectFit" />
							<text class="btn-text">分享</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getBannerList, getCardList } from '@/api/common'
import { navigateTo } from '@/common/router'
import showToast
 from '@/common/toast'

export default ({
	name: 'Index',
	data() {
		return {
			bannerList: [],
			cardList: [],
			searchValue: ''
		}
	},
	mounted() {
		this.getBannerList()
		this.getCardList()
	}, methods: {
		async getBannerList() {
			try {
				const res = await getBannerList()
				this.bannerList = res.data
			} catch (error) {
				showToast('获取轮播图失败，请稍后再试')
			}
		},
		async getCardList() {
			try {
				const res = await getCardList()
				this.cardList = res.data
			} catch (error) {
				showToast('获取卡片列表失败，请稍后再试')
			}
		},
		onSearch() {
			if (!this.searchValue.trim()) {
				showToast('请输入搜索内容')
				return
			}
			navigateTo(`/search?value=${this.searchValue}`)
		},
		goToMatch() {
			navigateTo('/match')
		},
		goToCommunity() {
			navigateTo('/community')
		},
		goToFriend() {
			navigateTo('/friend')
		},
		goToMoment() {
			navigateTo('/moment')
		},
		onLike(card) {
			// 根据card.id进行点赞操作，具体实现略
			card.like = !card.like
		},
		onComment(card) {
			// 根据card.id进入对应的评论页面，具体实现略
		}
	}
})
</script>
<style>
.index {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-bottom: 16px;
}

.search-box {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
}

.search-input {
	flex: 1;
	height: 50px;
	font-size: 16px;
	padding: 0 12px;
	background-color: #ffffff;
	border: 1px solid #e5e5e5;
	border-radius: 25px;
	margin-right: 8px;
}

.search-btn {
	width: 60px;
	height: 50px;
	font-size: 16px;
	color: #ffffff;
	background-color: #ff4081;
	border-radius: 25px;
}

.swiper {
	width: 100%;
	height: 140px;
	margin-top: 20px;
}

.swiper-img {
	width: 100%;
	height: 100%;
}

.nav {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
	margin-top: 20px;
	padding: 0 8px;
}

.nav-item {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 25%;
}

.nav-text {
	margin-top: 8px;
	font-size: 12px;
	color: #666666;
}

.header-avatar {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	margin-right: 8px;
}

.header-nickname {
	font-size: 16px;
	color: #333333;
}

.content-img {
	width: 100%;
	height: 220px;
}

.footer-time {
	font-size: 12px;
	color: #999999;
}

.footer-btn-group {
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
}

.footer-btn {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-left: 20px;
}

.btn-text {
	margin-left: 4px;
	font-size: 12px;
	color: #666666;
}
</style>