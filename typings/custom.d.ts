declare interface IBaseObject {
  [key: string]: unknown
}

declare module "*.js"

declare interface Window {
  /**
   * 微信 js bridge
   */
  WeixinJSBridge: {
    on: (name: string, cb?: (res?: IBaseObject) => void) => void
    invoke: (
      name: string,
      options?: IBaseObject,
      cb?: (res?: IBaseObject) => void
    ) => void
  }
  cardLotties: IBaseObject
  cardLottiesLoadedKeys: string[]
  lowfps: boolean
  fps: number
  androidAndLowFps: boolean
  isPageNavigating: boolean
}

/**
 * 后台返回的每个广告数据的类型
 */
declare interface AdInfo {
  // aid
  aid: number
  // cardname
  cardname: string
  // cid
  cid: number
  // 当前用户是否已投票
  creative: {
    crt_size: number
  }
  desc: string
  has_upvoted: boolean
  heart: string
  name: string
  quarter: number
  subtitle: string
  title: string
  // 已对该广告投票的人数
  upvote_cnt: 222222
  votename: string
  // interact 的数字类型代表用户曾经和这个广告如何交互过，包含点赞、分享、评论、看过，但由于用户隐私的考虑，前端已不再展示这些信息
  interact: number
  // 点赞后，对广告的四个 aspects 进行投票
  key_word_list: {
    // 当前用户是否对该 aspect 投过票
    has_upvoted: boolean
    // 第几个 aspect
    index: 0 | 1 | 2 | 3
    // 已对该 aspect 投票的人数
    upvote_cnt: number
  }[]
  // 已不再使用，某年（2021？）做一个名次和上一轮相比，是否上升/下降的判断，后台以 n 分钟的间隔更新一次
  upvote_cnt_last_round: 0
}

/**
 * 进入活动后首先拉取的数据类型，其中包含了用户信息、本次活动相关的所有数据
 */
declare interface IGetAdListRes {
  data: {
    adinfos: Adinfo[]
    // 红包封面是否已被领取 0 表示未被领取， 1 表示已被领取
    cover_has_received: 0 | 1
    // 0 表示不发， 1 表示已经发放过，如果有 reward 则一定为 0
    cover_status: 0 | 1
    // 红包封面的 url
    cover_url: string
    // 目前已参与投票的人数
    cur_voted_num: number
    // 当前用户头像
    headimg: string
    // 指上一次年度活动用户的相关前端数据，去年为 interest_static_data_2022，今年应为 interest_static_data_2023
    interest_static_data_2023: string
    // 评选结果订阅：0 表示未订阅， 1 表示已订阅
    is_book_msg: 0 | 1
    // 当前用户昵称
    nickname: string
    // 未用字段，分页拉取相关
    offset: 40
    // 未用字段
    reserved: string
    // 红包数字，需 / 100
    reward: number
    // 生成评委卡后，会生成一个 seq，用以判断是否生成评委卡
    seq: number
    // 过去三次活动的 seq
    seq_2021: number
    // 过去三次活动的 seq
    seq_2022: number
    // 过去三次活动的 seq
    seq_2023: number
    // 当前用户 uin
    uin: string
    // 该次年度活动用户的相关前端数据，这个 string 一般是 json stringify 的结果，用以存储任何我们希望后台存储的额外数据，一般和评委卡的一些生成数据相关，往这里塞就完事儿了
    interest_static_data: string
  }
  errcode: number
  msg: "succeed" | "error"
  ret: number
}

/**
 * 生成评委卡接口 getUserInfo 返回的数据类型
 */
declare interface IGetUserInfoRes {
  // 可能获得的红包金额，注意需 / 100
  reward: number
  // 生成评委卡后，会生成一个 seq，用以判断是否生成评委卡
  seq: number
  // 红包封面发放情况， 0 表示不发， 1 表示已经发放过，如果有 reward 则一定为 0
  cover_status: 0 | 1
  // 红包封面的领取 url
  cover_url: string
}

interface IHeartItem {
  name_en: string
  name: string
  hole: string
  number: string
  light: string
  shadow: string
  buttonBg: string
  voteBg: string
  lottie: string
  fullCardBg: string
  bgColor: string
  cardVotedNumColor: string
  cardDesc: string
  cardTitles: string[]
  lottieFirstFrame: string
  pickBtnColor: string
  linearBgColor: string
  canvasBg: string
  cardDeco: string
  cardTextBg: string
}

interface IHeartItemSorted extends IHeartItem {
  order: number
  title_index: number
}
