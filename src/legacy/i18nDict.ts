/**
 * Complete i18n dictionary.
 * Keys are Simplified Chinese (the default language in the DOM).
 * Values per locale are the translated text.
 */

type Dict = Record<string, string>;

export const I18N: Record<string, Dict> = {
  'zh-Hant': {
    // ── Landing ──
    全球华人: '全球華人',
    连接: '連接',
    的财富世界: '的財富世界',
    '懂金融，更懂华人': '懂金融，更懂華人',
    港美双重上市: '港美雙重上市',
    全球布局: '全球佈局',
    城: '城',
    '年+': '年+',
    稳健经营: '穩健經營',
    开始开户: '開始開戶',
    立即开户: '立即開戶',
    简体中文: '簡體中文',
    繁体中文: '繁體中文',
    财富: '財富',
    证券: '證券',
    开户: '開戶',
    资讯: '資訊',
    我的: '我的',

    // ── Noya AI ──
    '有什么可以帮忙的？': '有什麼可以幫忙的？',
    '有问题，随时可以问我': '有問題，隨時可以問我',
    '乱世买黄金还有效吗？2026 年黄金还能涨吗？': '亂世買黃金還有效嗎？2026 年黃金還能漲嗎？',
    '在 AI 时代，普通家庭应该如何参与全球资产配置？': '在 AI 時代，普通家庭應該如何參與全球資產配置？',
    '现在适合把虚拟资产纳入长期资产配置吗？': '現在適合把虛擬資產納入長期資產配置嗎？',
    '📊 证券组合': '📊 證券組合',
    '💬 聊聊CIO': '💬 聊聊CIO',
    证券组合: '證券組合',
    聊聊CIO: '聊聊CIO',
    AI解读仅供参考: 'AI解讀僅供參考',

    // ── Shared buttons ──
    上一步: '上一步',
    确认并下一步: '確認並下一步',
    签署开户文件: '簽署開戶文件',
    提交开户: '提交開戶',
    重写: '重寫',
    修改: '修改',
    立即开通: '立即開通',
    入金: '入金',
    请选择: '請選擇',
    请填写: '請填寫',
    是: '是',
    否: '否',

    // ── Identity ──
    选择您的身份信息: '選擇您的身份資訊',
    香港居民: '香港居民',
    '持有香港永久/非永久居民身份证': '持有香港永久/非永久居民身份證',
    澳门居民: '澳門居民',
    '持有澳门永久/非永久居民身份证': '持有澳門永久/非永久居民身份證',
    '其他国家/地区': '其他國家/地區',

    // ── ID Verify ──
    身份信息验证: '身份資訊驗證',
    '证件签发国/地区': '證件簽發國/地區',
    开户证件: '開戶證件',
    上传希腊永久居留卡: '上傳希臘永久居留卡',
    '希腊永久居留卡-人像面': '希臘永久居留卡-人像面',
    该信息仅限审核部门确认身份: '該資訊僅限審核部門確認身份',
    拍摄时请避免证件反光: '拍攝時請避免證件反光',

    // ── OCR ──
    证件照片预览: '證件照片預覽',
    增加OCR识别失败的提示: '增加OCR識別失敗的提示',
    姓名: '姓名',
    姓: '姓',
    名: '名',
    查看示例: '查看示例',
    证件号码: '證件號碼',
    证件有效期: '證件有效期',
    其他信息: '其他資訊',
    出生日期: '出生日期',
    性别: '性別',
    男: '男',

    // ── Address ──
    居住地址: '居住地址',
    '国家/地区': '國家/地區',
    详细地址: '詳細地址',
    '请填写一个居住地址，需要具体到xx号楼xx单元xx室，如 浅水湾1号楼1203室':
      '請填寫一個居住地址，需要具體到xx號樓xx單元xx室，如 淺水灣1號樓1203室',
    邮寄地址与居住地址相同: '郵寄地址與居住地址相同',
    出生地址与居住地址相同: '出生地址與居住地址相同',

    // ── Personal ──
    个人信息: '個人資訊',
    'Email 邮箱': 'Email 郵箱',
    '通过此邮箱接收对账单 (请注意填写正确)': '通過此郵箱接收對賬單 (請注意填寫正確)',
    教育程度: '教育程度',
    高等教育: '高等教育',
    中学教育: '中學教育',
    小学教育: '小學教育',
    就业状况: '就業狀況',
    全职: '全職',
    兼职: '兼職',
    自雇: '自僱',
    退休: '退休',
    学生: '學生',
    待业: '待業',
    公司全称: '公司全稱',
    '业务性质（可多选）': '業務性質（可多選）',
    '通讯、商业服务': '通訊、商業服務',
    金融服务: '金融服務',
    科技: '科技',
    制造业: '製造業',
    零售业: '零售業',
    '您是否为任何（上市）公司的高管、董事或控股股东？': '您是否為任何（上市）公司的高管、董事或控股股東？',
    资金来源: '資金來源',
    薪金: '薪金',
    投资收益: '投資收益',
    经营收入: '經營收入',
    '遗产/赠与': '遺產/贈與',
    其他: '其他',
    '仅用于投资风险能力评估，不做任何背调核查': '僅用於投資風險能力評估，不做任何背調核查',

    // ── Account type ──
    '您即将开通的是理财账户+证券账户': '您即將開通的是理財賬戶+證券賬戶',
    请问您是否: '請問您是否',
    开通证券融资交易功能: '開通證券融資交易功能',

    // ── Financial ──
    财务状况: '財務狀況',
    投资目标: '投資目標',
    成长: '成長',
    收入: '收入',
    保值: '保值',
    投机: '投機',
    可支配年度收入: '可支配年度收入',
    '< 10万港元': '< 10萬港元',
    '10万 ~ 50万港元': '10萬 ~ 50萬港元',
    '50万 ~ 100万港元': '50萬 ~ 100萬港元',
    '100万 ~ 350万港元': '100萬 ~ 350萬港元',
    '> 350万港元': '> 350萬港元',
    流动资产总值: '流動資產總值',
    '< 50万港元': '< 50萬港元',
    '50万 ~ 200万港元': '50萬 ~ 200萬港元',
    '200万 ~ 500万港元': '200萬 ~ 500萬港元',
    '500万 ~ 800万港元': '500萬 ~ 800萬港元',
    '> 800万港元': '> 800萬港元',

    // ── Investment experience ──
    投资经验: '投資經驗',
    债券: '債券',
    外汇: '外匯',
    衍生性产品: '衍生性產品',
    贵金属: '貴金屬',
    结构性产品: '結構性產品',
    基金: '基金',
    虚拟资产: '虛擬資產',
    无经验: '無經驗',
    少于一年: '少於一年',
    一至三年: '一至三年',
    五年以上: '五年以上',

    // ── Tax ──
    税务信息: '稅務資訊',
    '税务管辖区（CRS & W-8BEN）': '稅務管轄區（CRS & W-8BEN）',
    税务编码: '稅務編碼',
    可以提供税务编码: '可以提供稅務編碼',
    无法提供税务编码: '無法提供稅務編碼',
    解释说明: '解釋說明',
    '+ 添加税务信息': '+ 添加稅務資訊',
    希腊: '希臘',
    新加坡: '新加坡',
    美国: '美國',

    // ── Other disclosures ──
    其他资料披露: '其他資料披露',
    '您是否为联合交易所参与者或者证监会的持牌人或注册人的董事、雇员或认可人士？':
      '您是否為聯合交易所參與者或者證監會的持牌人或註冊人的董事、僱員或認可人士？',
    '您是否和Ark HK或其关联公司的董事或雇员有关关系？':
      '您是否和Ark HK或其關聯公司的董事或僱員有關關係？',
    '您或您的直系亲属是否担任重要公职，例如重要政客或高级政府官员、司法军事官员、国有企业高级行政人员或其家人或有密切联络人士？':
      '您或您的直系親屬是否擔任重要公職，例如重要政客或高級政府官員、司法軍事官員、國有企業高級行政人員或其家人或有密切聯絡人士？',

    // ── Bank ──
    银行账户信息: '銀行賬戶資訊',
    '银行所在国家/地区': '銀行所在國家/地區',
    银行名称: '銀行名稱',
    银行户名: '銀行戶名',
    银行账户号码: '銀行賬戶號碼',
    支持币种: '支持幣種',
    全部币种: '全部幣種',
    港元: '港元',
    美元: '美元',
    人民币: '人民幣',
    '003 渣打银行(香港)': '003 渣打銀行(香港)',
    '004 汇丰银行': '004 匯豐銀行',
    '012 中国银行(香港)': '012 中國銀行(香港)',
    '016 恒生银行': '016 恒生銀行',
    '024 花旗银行': '024 花旗銀行',

    // ── Confirm ──
    信息确认: '資訊確認',
    身份信息: '身份資訊',
    '居民身份所属国家/地区': '居民身份所屬國家/地區',
    香港: '香港',
    香港身份证: '香港身份證',
    证件信息: '證件資訊',
    中文姓名: '中文姓名',
    英文姓名: '英文姓名',
    希腊永久居留卡: '希臘永久居留卡',
    希腊护照: '希臘護照',

    // ── Declaration ──
    声明: '聲明',
    '本人确认：': '本人確認：',
    '1）本人确认在开户文件录入的电子签名为真实意愿的表示。本人理解、确认并同意受上述开户文件、所附条款及任何所附文件的约束；':
      '1）本人確認在開戶文件錄入的電子簽名為真實意願的表示。本人理解、確認並同意受上述開戶文件、所附條款及任何所附文件的約束；',
    '2）我已阅读并同意所附条款中个人资料收集声明，并同意 Ark HK 可按该声明目的或《隐私条例》允许的其他用途，使用我提供的所有个人信息；':
      '2）我已閱讀並同意所附條款中個人資料收集聲明，並同意 Ark HK 可按該聲明目的或《隱私條例》允許的其他用途，使用我提供的所有個人資訊；',
    '3）我同意授权 Ark HK 依法向联交所及证监会传输个人资料，以符合香港投资者识别码及汇报制度要求。':
      '3）我同意授權 Ark HK 依法向聯交所及證監會傳輸個人資料，以符合香港投資者識別碼及匯報制度要求。',

    // ── Signature ──
    '✍ 请在此签写您的中文名': '✍ 請在此簽寫您的中文名',
    开户文件: '開戶文件',
    本人已阅读: '本人已閱讀',
    '，理解并同意电子签名等同于本人的手写签名': '，理解並同意電子簽名等同於本人的手寫簽名',

    // ── Result pages ──
    '已收到您的资料，正在审核中': '已收到您的資料，正在審核中',
    入金准备: '入金準備',
    '·入金1万港元(或等值货币)激活iARK香港账户': '·入金1萬港元(或等值貨幣)激活iARK香港賬戶',
    '·入金15万美元享受全球私行级财富管理服务': '·入金15萬美元享受全球私行級財富管理服務',
    '最后一步：入金激活账户': '最後一步：入金激活賬戶',
    入金1万港元: '入金1萬港元',
    或等值货币: '或等值貨幣',
    激活iARK香港账户: '激活iARK香港賬戶',
    入金15万美元: '入金15萬美元',
    享受全球私行级: '享受全球私行級',
    财富管理服务: '財富管理服務',
    是否开通专业投资者: '是否開通專業投資者',
    '解锁私募基金、结构性产品等投资产品种类': '解鎖私募基金、結構性產品等投資產品種類',

    // ── Country modal ──
    常用地区: '常用地區',
    中国内地: '中國內地',
    中国香港: '中國香港',
    中国澳门: '中國澳門',
    中国台湾: '中國台灣',
    澳大利亚: '澳大利亞',
    加拿大: '加拿大',
    马来西亚: '馬來西亞',
    土耳其: '土耳其',
    新西兰: '新西蘭',
    英国: '英國',
    日本: '日本',
    韩国: '韓國',
    '请输入国家/地区': '請輸入國家/地區',
    澳门: '澳門',
  },

  en: {
    // ── Landing ──
    全球华人: 'Global Chinese',
    连接: 'Connecting',
    的财富世界: 'Wealth World',
    '懂金融，更懂华人': 'Finance expertise that understands you',
    港美双重上市: 'Dual-listed HK & US',
    全球布局: 'Global presence',
    城: ' cities',
    '年+': '+ yrs',
    稳健经营: 'Established',
    开始开户: 'Get Started',
    立即开户: 'Open Account',
    简体中文: '简体中文',
    繁体中文: '繁體中文',
    财富: 'Wealth',
    证券: 'Trade',
    开户: 'Open',
    资讯: 'News',
    我的: 'Me',

    // ── Noya AI ──
    '有什么可以帮忙的？': 'How can I help?',
    '有问题，随时可以问我': 'Ask me anytime',
    '乱世买黄金还有效吗？2026 年黄金还能涨吗？':
      'Is gold still a safe haven? Will it rise in 2026?',
    '在 AI 时代，普通家庭应该如何参与全球资产配置？':
      'How should families allocate global assets in the AI era?',
    '现在适合把虚拟资产纳入长期资产配置吗？':
      'Should virtual assets be part of your long-term portfolio?',
    '📊 证券组合': '📊 Portfolio',
    '💬 聊聊CIO': '💬 Ask CIO',
    证券组合: 'Portfolio',
    聊聊CIO: 'Ask CIO',
    AI解读仅供参考: 'AI insights for reference only',

    // ── Shared buttons ──
    上一步: 'Back',
    确认并下一步: 'Confirm & Next',
    签署开户文件: 'Sign Documents',
    提交开户: 'Submit',
    重写: 'Rewrite',
    修改: 'Edit',
    立即开通: 'Activate',
    入金: 'Deposit',
    请选择: 'Select',
    请填写: 'Enter',
    是: 'Yes',
    否: 'No',

    // ── Identity ──
    选择您的身份信息: 'Select Your Identity',
    香港居民: 'Hong Kong Resident',
    '持有香港永久/非永久居民身份证': 'Hong Kong permanent/non-permanent ID card holder',
    澳门居民: 'Macau Resident',
    '持有澳门永久/非永久居民身份证': 'Macau permanent/non-permanent ID card holder',
    '其他国家/地区': 'Other Countries/Regions',

    // ── ID Verify ──
    身份信息验证: 'Identity Verification',
    '证件签发国/地区': 'Issuing Country/Region',
    开户证件: 'ID Document',
    上传希腊永久居留卡: 'Upload Greece Permanent Residence Card',
    '希腊永久居留卡-人像面': 'Greece Residence Card - Photo Side',
    该信息仅限审核部门确认身份: 'This information is for identity verification only',
    拍摄时请避免证件反光: 'Avoid glare when photographing your ID',

    // ── OCR ──
    证件照片预览: 'ID Photo Preview',
    增加OCR识别失败的提示: 'OCR recognition failed',
    姓名: 'Name',
    姓: 'Last Name',
    名: 'First Name',
    查看示例: 'View Example',
    证件号码: 'ID Number',
    证件有效期: 'Expiry Date',
    其他信息: 'Other Info',
    出生日期: 'Date of Birth',
    性别: 'Gender',
    男: 'Male',

    // ── Address ──
    居住地址: 'Residential Address',
    '国家/地区': 'Country/Region',
    详细地址: 'Detailed Address',
    '请填写一个居住地址，需要具体到xx号楼xx单元xx室，如 浅水湾1号楼1203室':
      'Please enter your full address, e.g. Repulse Bay, Building 1, Unit 1203',
    邮寄地址与居住地址相同: 'Mailing address same as residential',
    出生地址与居住地址相同: 'Birth address same as residential',

    // ── Personal ──
    个人信息: 'Personal Info',
    'Email 邮箱': 'Email',
    '通过此邮箱接收对账单 (请注意填写正确)': 'Receive statements via this email (please verify)',
    教育程度: 'Education',
    高等教育: 'Higher Education',
    中学教育: 'Secondary',
    小学教育: 'Primary',
    就业状况: 'Employment',
    全职: 'Full-time',
    兼职: 'Part-time',
    自雇: 'Self-employed',
    退休: 'Retired',
    学生: 'Student',
    待业: 'Unemployed',
    公司全称: 'Company Name',
    '业务性质（可多选）': 'Business Nature (multi-select)',
    '通讯、商业服务': 'Communication & Business',
    金融服务: 'Financial Services',
    科技: 'Technology',
    制造业: 'Manufacturing',
    零售业: 'Retail',
    '您是否为任何（上市）公司的高管、董事或控股股东？':
      'Are you a director, officer, or major shareholder of any listed company?',
    资金来源: 'Source of Funds',
    薪金: 'Salary',
    投资收益: 'Investment Returns',
    经营收入: 'Business Income',
    '遗产/赠与': 'Inheritance/Gift',
    其他: 'Other',
    '仅用于投资风险能力评估，不做任何背调核查':
      'For risk assessment only, no background check',

    // ── Account type ──
    '您即将开通的是理财账户+证券账户': 'You are opening a Wealth + Securities account',
    请问您是否: 'Would you like to',
    开通证券融资交易功能: 'Enable margin trading',

    // ── Financial ──
    财务状况: 'Financial Status',
    投资目标: 'Investment Goal',
    成长: 'Growth',
    收入: 'Income',
    保值: 'Capital Preservation',
    投机: 'Speculation',
    可支配年度收入: 'Annual Disposable Income',
    '< 10万港元': '< HK$100K',
    '10万 ~ 50万港元': 'HK$100K – 500K',
    '50万 ~ 100万港元': 'HK$500K – 1M',
    '100万 ~ 350万港元': 'HK$1M – 3.5M',
    '> 350万港元': '> HK$3.5M',
    流动资产总值: 'Total Liquid Assets',
    '< 50万港元': '< HK$500K',
    '50万 ~ 200万港元': 'HK$500K – 2M',
    '200万 ~ 500万港元': 'HK$2M – 5M',
    '500万 ~ 800万港元': 'HK$5M – 8M',
    '> 800万港元': '> HK$8M',

    // ── Investment experience ──
    投资经验: 'Investment Experience',
    债券: 'Bonds',
    外汇: 'Forex',
    衍生性产品: 'Derivatives',
    贵金属: 'Precious Metals',
    结构性产品: 'Structured Products',
    基金: 'Funds',
    虚拟资产: 'Virtual Assets',
    无经验: 'None',
    少于一年: '< 1 year',
    一至三年: '1–3 years',
    五年以上: '5+ years',

    // ── Tax ──
    税务信息: 'Tax Information',
    '税务管辖区（CRS & W-8BEN）': 'Tax Jurisdiction (CRS & W-8BEN)',
    税务编码: 'Tax ID',
    可以提供税务编码: 'I can provide a Tax ID',
    无法提供税务编码: 'I cannot provide a Tax ID',
    解释说明: 'Learn More',
    '+ 添加税务信息': '+ Add Tax Info',
    希腊: 'Greece',
    新加坡: 'Singapore',
    美国: 'United States',

    // ── Other disclosures ──
    其他资料披露: 'Other Disclosures',
    '您是否为联合交易所参与者或者证监会的持牌人或注册人的董事、雇员或认可人士？':
      'Are you a director, employee, or accredited person of an SEHK participant or SFC licensee?',
    '您是否和Ark HK或其关联公司的董事或雇员有关关系？':
      'Are you related to any director or employee of Ark HK or its affiliates?',
    '您或您的直系亲属是否担任重要公职，例如重要政客或高级政府官员、司法军事官员、国有企业高级行政人员或其家人或有密切联络人士？':
      'Are you or your immediate family a PEP (politically exposed person), e.g. a senior government, judicial, military, or state-owned enterprise official?',

    // ── Bank ──
    银行账户信息: 'Bank Account Info',
    '银行所在国家/地区': 'Bank Country/Region',
    银行名称: 'Bank Name',
    银行户名: 'Account Holder',
    银行账户号码: 'Account Number',
    支持币种: 'Supported Currency',
    全部币种: 'All Currencies',
    港元: 'HKD',
    美元: 'USD',
    人民币: 'CNY',
    '003 渣打银行(香港)': '003 Standard Chartered (HK)',
    '004 汇丰银行': '004 HSBC',
    '012 中国银行(香港)': '012 Bank of China (HK)',
    '016 恒生银行': '016 Hang Seng Bank',
    '024 花旗银行': '024 Citibank',

    // ── Confirm ──
    信息确认: 'Review Information',
    身份信息: 'Identity',
    '居民身份所属国家/地区': 'Residence Country/Region',
    香港: 'Hong Kong',
    香港身份证: 'HK ID Card',
    证件信息: 'ID Details',
    中文姓名: 'Chinese Name',
    英文姓名: 'English Name',
    希腊永久居留卡: 'Greece Permanent Residence Card',
    希腊护照: 'Greece Passport',

    // ── Declaration ──
    声明: 'Declaration',
    '本人确认：': 'I hereby confirm:',
    '1）本人确认在开户文件录入的电子签名为真实意愿的表示。本人理解、确认并同意受上述开户文件、所附条款及任何所附文件的约束；':
      '1) I confirm that the electronic signature entered in the account opening documents is a genuine expression of my intent. I understand, confirm and agree to be bound by the above documents, attached terms and any attached documents;',
    '2）我已阅读并同意所附条款中个人资料收集声明，并同意 Ark HK 可按该声明目的或《隐私条例》允许的其他用途，使用我提供的所有个人信息；':
      '2) I have read and agree to the Personal Information Collection Statement in the attached terms, and consent to Ark HK using all personal information I provide for the purposes stated or as permitted under the Privacy Ordinance;',
    '3）我同意授权 Ark HK 依法向联交所及证监会传输个人资料，以符合香港投资者识别码及汇报制度要求。':
      '3) I authorize Ark HK to transmit personal data to SEHK and SFC as required under Hong Kong investor identification and reporting regulations.',

    // ── Signature ──
    '✍ 请在此签写您的中文名': '✍ Sign your Chinese name here',
    开户文件: 'account opening documents',
    本人已阅读: 'I have read the ',
    '，理解并同意电子签名等同于本人的手写签名':
      ' and understand that electronic signature equals my handwritten signature',

    // ── Result pages ──
    '已收到您的资料，正在审核中': 'Your information is under review',
    入金准备: 'Deposit Preparation',
    '·入金1万港元(或等值货币)激活iARK香港账户': '· Deposit HK$10K (or equivalent) to activate iARK HK account',
    '·入金15万美元享受全球私行级财富管理服务': '· Deposit US$150K for global private banking services',
    '最后一步：入金激活账户': 'Last Step: Deposit to Activate',
    入金1万港元: 'Deposit HK$10K',
    或等值货币: 'or equivalent',
    激活iARK香港账户: 'Activate iARK HK Account',
    入金15万美元: 'Deposit US$150K',
    享受全球私行级: 'Enjoy global private',
    财富管理服务: 'wealth management',
    是否开通专业投资者: 'Become a Professional Investor?',
    '解锁私募基金、结构性产品等投资产品种类': 'Unlock PE funds, structured products and more',

    // ── Country modal ──
    常用地区: 'Popular Regions',
    中国内地: 'Mainland China',
    中国香港: 'Hong Kong, China',
    中国澳门: 'Macau, China',
    中国台湾: 'Taiwan, China',
    澳大利亚: 'Australia',
    加拿大: 'Canada',
    马来西亚: 'Malaysia',
    土耳其: 'Turkey',
    新西兰: 'New Zealand',
    英国: 'United Kingdom',
    日本: 'Japan',
    韩国: 'South Korea',
    '请输入国家/地区': 'Search country/region',
    澳门: 'Macau',
  },
};
