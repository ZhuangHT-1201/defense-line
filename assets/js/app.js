"use strict";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const domains = [
  {
    id: 1,
    name: "政治安全",
    symbol: "政",
    category: "society",
    categoryName: "政治与制度",
    short: "国家主权、政权与意识形态安全的根基。",
    summary: "政治安全是总体国家安全观的根本。对青年学生而言，它体现为尊重事实、理解制度语境、抵制失真的极端叙事，而不是把正常的学术讨论与风险简单画等号。",
    connection: "国际热点、社交平台争论与跨境信息传播会影响公共认知。转发之前，先问信息来源是否可核验、叙述是否完整。",
    action: "遇到未经证实却要求“立即站队”的信息，先暂停传播；从权威信源交叉核对，保留事实与观点之间的边界。",
    tip: "强烈的情绪并不等于可靠的事实。越是催促你马上转发的消息，越值得再看一遍。"
  },
  {
    id: 2,
    name: "军事安全",
    symbol: "军",
    category: "society",
    categoryName: "国防与领土",
    short: "防范军事秘密泄露，维护国防活动安全。",
    summary: "军事安全关系国家主权、领土完整与国防能力。大学生可能通过兼职、摄影、航拍或网络社交接触到军事设施与部队活动相关信息。",
    connection: "随手拍、定位打卡、航拍“求点赞”都可能无意暴露设施位置、装备细节或活动规律。",
    action: "不拍摄、发布或转发涉军事敏感区域与活动信息；遇到高价收购照片、坐标或观察记录，停止沟通并向学校或国家安全机关反映。",
    tip: "一张普通照片中的门牌、地形、车辆和时间，组合起来可能形成超出想象的信息。"
  },
  {
    id: 3,
    name: "国土安全",
    symbol: "土",
    category: "society",
    categoryName: "国防与领土",
    short: "维护领土完整、国家统一与边疆稳定。",
    summary: "国土安全不仅指地理边界，也包括国家统一、边疆稳定和对分裂活动的防范。网络空间中的地图错误、历史叙事扭曲也是需要辨识的问题。",
    connection: "社团活动、国际交流、自媒体创作中，地图标注、区域称谓与历史表述都必须准确。",
    action: "发布地图或开展国际传播时，使用权威标准地图；发现明显错误，不扩散，通过正规渠道提醒或报告。",
    tip: "表达立场需要事实支撑，也需要遵守地图、出版物和网络信息内容的相关规范。"
  },
  {
    id: 4,
    name: "经济安全",
    symbol: "经",
    category: "society",
    categoryName: "发展基础",
    short: "维护产业链供应链与经济体系稳定。",
    summary: "经济安全是国家安全的基础。关键产业、供应链、重要数据与市场秩序相互关联，风险和个体并不遥远。",
    connection: "实习与科研中可能出现内部成本、供应商名单、未公开交易等非公开经营信息。",
    action: "不把企业未公开经营数据作为竞赛素材或社交谈资；获取、使用数据前确认授权范围和脱敏要求。",
    tip: "“只发到小群”不是安全边界，信息一旦离开受控系统，就可能被继续复制和传播。"
  },
  {
    id: 5,
    name: "金融安全",
    symbol: "金",
    category: "society",
    categoryName: "发展基础",
    short: "防范系统性金融风险与违法金融活动。",
    summary: "金融安全关系金融体系稳健运行和群众财产权益。校园中较常见的是兼职刷单、虚假投资、账户出借和“跑分”等风险。",
    connection: "出租银行卡、电话卡或支付账户，可能被用于洗钱与诈骗，也会让账户持有人承担法律风险。",
    action: "不出租、出借、出售个人账户；陌生投资强调“稳赚不赔”时立即退出；发现异常资金往来保存证据并报警。",
    tip: "任何要求你用个人账户替陌生人收款、转账的“兼职”，都应被视为高风险信号。"
  },
  {
    id: 6,
    name: "文化安全",
    symbol: "文",
    category: "society",
    categoryName: "精神与共识",
    short: "维护文化主权、价值认同与精神家园。",
    summary: "文化安全关注国家文化主权、文化认同和社会精神状态。它不意味着拒绝交流，而是保持文化主体性，辨别有意扭曲。",
    connection: "短视频、游戏、动漫与国际交流都可能承载价值观。创作者需要在借鉴与原创之间保持清晰判断。",
    action: "引用资料时标明来源，避免传播刻意篡改历史或污名化群体的内容；面对文化差异，先理解语境再做判断。",
    tip: "文化自信来自理解与创造，而不是对任何外来内容简单复制或情绪化排斥。"
  },
  {
    id: 7,
    name: "社会安全",
    symbol: "社",
    category: "society",
    categoryName: "公共秩序",
    short: "维护公共秩序、社会稳定与公众安全。",
    summary: "社会安全关系治安、反恐、矛盾纠纷与公共事件应对。网络谣言可能放大恐慌，让局部事件演变为公共风险。",
    connection: "校园群聊中的突发传闻、未经核实的“事故现场”图片，可能影响公共秩序与个人名誉。",
    action: "突发情况以学校和官方发布为准；不围观、不传播待核信息；遇到现实危险先确保自身安全并报警。",
    tip: "帮助他人的第一步是提供准确、可执行的求助信息，而不是让未经核实的消息继续加速。"
  },
  {
    id: 8,
    name: "科技安全",
    symbol: "科",
    category: "digital",
    categoryName: "创新与数据",
    short: "保护科技体系、关键技术与创新活动。",
    summary: "科技安全涉及科研数据、关键技术、人才安全与创新生态。不是所有学术合作都有风险，但敏感技术的交流、数据交换与设备连接需要边界。",
    connection: "课题代码、实验参数、设备拓扑、未公开成果若进入个人网盘或陌生外链，可能造成不可逆扩散。",
    action: "遵循实验室数据分类与访问控制；跨境合作先走审批与合规流程；陌生“学术邀请”先核验身份。",
    tip: "最有价值的信息，常常不是一份带“机密”字样的文件，而是大量看似普通的细节。"
  },
  {
    id: 9,
    name: "网络安全",
    symbol: "网",
    category: "digital",
    categoryName: "创新与数据",
    short: "防范网络攻击、漏洞利用与账号失守。",
    summary: "网络安全保护网络系统、基础设施与数据免遭攻击和破坏。多数校园安全事件从弱密码、钓鱼链接和陌生软件开始。",
    connection: "一封仿冒学校的邮件、一个附带宏代码的压缩包，就可能窃取账号或控制设备。",
    action: "账号使用独立强密码并开启双重验证；不点陌生链接、不运行来源不明附件；发现异常立即断网并联系管理员。",
    tip: "网址长得像官网，不等于就是官网。登录前先检查域名和证书，不把验证码发给任何人。"
  },
  {
    id: 10,
    name: "数据安全",
    symbol: "数",
    category: "digital",
    categoryName: "创新与数据",
    short: "保障数据全流程安全与合法利用。",
    summary: "数据已成为重要生产要素。数据安全强调分类分级、最小必要、授权使用和全程保护。",
    connection: "课程项目、志愿活动与实习都可能接触到个人信息、企业数据和实验记录。",
    action: "只收集完成任务所必需的信息；公开前匿名化并检查组合识别风险；使用学校或单位批准的存储工具。",
    tip: "删掉姓名并不一定完成匿名化。时间、地点、专业和设备信息的组合仍可能识别到个人。"
  },
  {
    id: 11,
    name: "人工智能安全",
    symbol: "智",
    category: "frontier",
    categoryName: "新型领域",
    short: "治理算法风险、内容滥用与模型安全。",
    summary: "人工智能带来的风险包括虚假信息、深度合成、数据与模型安全、算法偏差和不当使用。技术能力不等于用途正当。",
    connection: "AI 可以快速生成录音、图片、论文和代码，也可能把不存在的事实包装得非常可信。",
    action: "对高冲击内容做来源核验；不生成、传播伪造他人身份或事件的材料；使用 AI 时保护输入中的敏感数据。",
    tip: "AI 输出的是概率结果，不是天然证据。涉及事实、法律与安全的判断，必须回到原始来源。"
  },
  {
    id: 12,
    name: "生物安全",
    symbol: "生",
    category: "frontier",
    categoryName: "健康与生态",
    short: "防控传染病、生物技术与实验室风险。",
    summary: "生物安全涵盖传染病防控、生物技术研究、实验室管理、生物资源与外来物种入侵等。",
    connection: "生命科学实验、野外采样和健康数据研究都需要规范操作与信息保护。",
    action: "遵守实验室准入与废弃物管理规范；未经审批不携带活体材料；健康信息最小范围流转。",
    tip: "规范不是流程负担，而是让创新可持续、让风险可追溯的底线。"
  },
  {
    id: 13,
    name: "生态安全",
    symbol: "态",
    category: "frontier",
    categoryName: "健康与生态",
    short: "维护自然生态系统稳定与可持续。",
    summary: "生态安全关注生态系统完整性、环境质量与资源承载能力，关系长期发展与公共健康。",
    connection: "社会实践、户外科考与校园活动可能涉及自然保护区、物种记录和环境数据。",
    action: "不采集、购买或放生受保护动植物；敏感生态坐标不随意公开；活动结束后带走垃圾与设备。",
    tip: "保护自然也包括克制公开精确位置，避免让“打卡热度”伤害脆弱生境。"
  },
  {
    id: 14,
    name: "资源安全",
    symbol: "资",
    category: "frontier",
    categoryName: "生存与发展",
    short: "保障能源、矿产、水等资源稳定供给。",
    summary: "资源安全关系国家发展所需重要资源的可获得性、可靠性与可持续性。",
    connection: "研究地图、产业数据和野外调查结果可能包含重要设施与资源分布信息。",
    action: "公开地图前做敏感性审查；避免上传精确设施位置、储运路线或未公开资源数据。",
    tip: "研究价值与公开边界需要同时考虑。一张可交互地图，可能比一段文字表达更多敏感关联。"
  },
  {
    id: 15,
    name: "粮食安全",
    symbol: "粮",
    category: "frontier",
    categoryName: "生存与发展",
    short: "保障粮食供给、质量与产业链韧性。",
    summary: "粮食安全关系基本民生与稳定发展，涉及耕地、种业、生产、储备、流通和消费等环节。",
    connection: "农业调研、种质资源、产量与库存数据可能成为需要保护的信息。",
    action: "调研前明确数据发布授权；对样本、地块、产量和供应链信息进行分级脱敏。",
    tip: "看似普通的乡村调研数据，叠加后可能反映区域生产与储备能力。"
  },
  {
    id: 16,
    name: "核安全",
    symbol: "核",
    category: "frontier",
    categoryName: "高风险领域",
    short: "防范核材料、核设施与放射性风险。",
    summary: "核安全是国家安全的重要组成，强调设施、材料、放射源和核技术应用的全链条安全管理。",
    connection: "普通学生通常不会直接接触核设施，但可能看到虚构内容、谣言或异常信息索取。",
    action: "不尝试探测、拍摄或传播核设施敏感信息；遇到异常询问，拒绝回应并报告。",
    tip: "好奇心不能越过法律与安全边界。对高风险设施，最恰当的距离就是安全距离。"
  },
  {
    id: 17,
    name: "海外利益安全",
    symbol: "外",
    category: "society",
    categoryName: "全球交往",
    short: "保护海外公民、机构与项目的正当权益。",
    summary: "海外利益安全关乎境外人员、机构、资产和合作项目的安全，也与国际环境变化密切联系。",
    connection: "留学、交换、国际竞赛和出境调研会涉及行程、证件、研究数据和当地联系信息。",
    action: "通过官方渠道登记、了解使领馆与校方应急联系方式；只向必要对象提供最小范围信息。",
    tip: "出门在外，信息发布的延迟与模糊有时是一种保护。避免实时公开行程和住宿细节。"
  },
  {
    id: 18,
    name: "太空安全",
    symbol: "空",
    category: "frontier",
    categoryName: "新型领域",
    short: "维护太空资产、活动秩序与相关数据安全。",
    summary: "太空安全涉及卫星系统、空间基础设施、轨道资源与相关数据。航天教育同样需要保护敏感信息。",
    connection: "航天社团、观测活动与开源轨迹数据可能形成有安全含义的关联。",
    action: "关注公开尺度，不擅自发布任务细节、精确设施位置或未授权测控信息。",
    tip: "科普可以公开，但务必区分公开知识与内部任务信息。"
  },
  {
    id: 19,
    name: "深海安全",
    symbol: "海",
    category: "frontier",
    categoryName: "新型领域",
    short: "保障深海资源、设施与活动安全。",
    summary: "深海是战略新疆域，涉及海洋资源、探测、基础设施和海洋权益。新型领域安全需要兼顾科研与保密。",
    connection: "海洋调研、航行记录与设备部署数据可能具有非公开敏感性。",
    action: "出海实践和数据发布遵循项目审批；不在公开平台实时共享船位、设备参数与采样坐标。",
    tip: "在海量公开数据中建立关联，同样可能暴露不应公开的信息。"
  },
  {
    id: 20,
    name: "极地安全",
    symbol: "极",
    category: "frontier",
    categoryName: "新型领域",
    short: "维护极地科考、环境与活动相关利益。",
    summary: "极地安全涉及科学考察、环境保护、国际合作和规则参与，强调长期、规范与可持续。",
    connection: "科考宣传、国际合作和遥感数据处理需要把握公开边界与原始数据安全。",
    action: "对科考项目内容先审批后发布；共享数据前确认授权、精度与用途，保留来源记录。",
    tip: "越偏远的地方，越需要可靠的联络机制与清晰的数据管理规则。"
  }
];

const scenarios = {
  intern: {
    code: "情境一 · 异常接触",
    title: "一份报酬丰厚的“远程调研”",
    start: 30,
    intro: [
      { from: "other", avatar: "K", text: "同学你好，我们在做一个高校科创生态调研，想邀请你远程兼职。每周整理少量公开资料，月薪 3000 元。", time: "今天 19:42" }
    ],
    steps: [
      {
        message: { text: "为了确认你符合条件，先发一下学生证、校园卡和导师姓名吧。过程很简单。", time: "19:44" },
        choices: [
          { text: "先追问对方机构全称、官网、项目负责人，并通过学校核实。", score: 15, tone: "good", feedback: "你保留了身份核验的主动权。异常兼职的第一步，不是证明自己，而是确认对方。" },
          { text: "只发姓名，学生证照片稍后再说。", score: 2, tone: "warn", feedback: "姓名看似不重要，但可与学校、专业和社交公开信息交叉关联。仍未解决对方身份未知的问题。" },
          { text: "觉得待遇不错，立刻发送学生证和校园卡照片。", score: -12, tone: "bad", feedback: "学生证与校园卡含有院校、学号和照片等身份信息，容易被用于伪造身份或进一步套取信息。" }
        ]
      },
      {
        message: { text: "身份没问题。再麻烦拍几张实验室门口、门禁和走廊照片，我们想做“校园场景配图”。不用进去，拍外面就行。", time: "20:06" },
        choices: [
          { text: "拒绝拍摄，并询问为什么正规调研需要门禁与实验室环境照片。", score: 15, tone: "good", feedback: "“拍外面”不等于低风险。门牌、门禁布局、周边环境和时间信息可能形成敏感测绘信息。" },
          { text: "拍一张远景，不出现门牌和人员，应该没问题。", score: 1, tone: "warn", feedback: "远景也可能通过建筑轮廓、地形和设备定位。没有明确授权的拍摄请求，优先拒绝。" },
          { text: "顺手多拍几张，报酬可能还能增加。", score: -15, tone: "bad", feedback: "对方的需求已经偏离“公开资料整理”，而转向场所内部细节。增加报酬往往是在测试你的边界。" }
        ]
      },
      {
        message: { text: "最后一个任务：安装这个“调研插件”，它会自动采集你访问的网页。再把你参与项目的文件目录截图发来，方便结算。", time: "20:31" },
        choices: [
          { text: "不安装、不截图，保存聊天和文件信息并通过正规渠道报告。", score: 15, tone: "good", feedback: "这是更稳妥的处置：终止异常接触，保留证据，通过学校相关部门或国家安全机关反映可疑线索。" },
          { text: "先下载但不安装，问清楚软件来源。", score: -2, tone: "warn", feedback: "来源不明的软件即使未运行也存在风险。更稳妥的是直接拒绝下载，并通过官方渠道核验。" },
          { text: "插件看起来很专业，先装上试试。", score: -18, tone: "bad", feedback: "未知插件可能读取浏览记录、账号页面与本地文件。不要用真实设备测试陌生人提供的软件。" }
        ]
      },
      {
        message: { text: "别紧张，我们只是商业公司。你现在退出会违约，需要先转 200 元“资料保管费”，否则我们会联系学校。", time: "20:53" },
        choices: [
          { text: "不转账、不继续争辩，截图保存并停止对话。", score: 15, tone: "good", feedback: "恐吓和倒收费用是高风险信号。你没有与对方签署合法协议，不必通过私下转账解决问题。" },
          { text: "解释自己没有违约，希望对方删除个人信息。", score: 3, tone: "warn", feedback: "明确要求删除可以保留，但不应在身份不明的对话中持续暴露更多信息或用转账“止损”。" },
          { text: "害怕影响学校，马上转 200 元私了。", score: -18, tone: "bad", feedback: "转账会暴露支付信息，也可能被继续勒索。正确做法是保留证据并向可信的校方人员求助。" }
        ]
      },
      {
        message: { text: "我把“合同链接”发你，点进去签个字就能结束。链接是：secure-buaa-research.example。", time: "21:08" },
        choices: [
          { text: "不点击陌生链接，标记并报告此账号。", score: 15, tone: "good", feedback: "域名包含熟悉词汇并不代表真实。停止交互、保留记录、向平台与学校报告，是完整的收尾。" },
          { text: "复制链接后在沙箱里打开看看。", score: -3, tone: "warn", feedback: "钓鱼风险不需要用真实环境验证。即使谨慎打开，也可能触发恶意跳转或身份猜测。" },
          { text: "点开链接，反正只是签字。", score: -15, tone: "bad", feedback: "陌生登录页可能窃取学校账号与密码。凡涉及登录，都应从官方入口进入并检查域名。" }
        ]
      }
    ],
    resultHigh: "你识破了逐步升级的异常索取，并完成“停止接触、保留证据、正规报告”的闭环。",
    resultMid: "你已经识别出部分风险，但某些环节仍在用让步换取“尽快结束”。记住，异常接触中不应以更多信息或转账止损。",
    resultLow: "这组情境提示你：当请求从公开资料逐步转向身份、场所与设备信息时，应立即停止，而不是继续证明自己的诚意。"
  },
  voice: {
    code: "情境二 · 合成内容",
    title: "群聊里突然出现的“内部录音”",
    start: 38,
    intro: [
      { from: "other", avatar: "群", text: "听一下这段录音，说是学校今晚要出大事，音频很真，我已经转到三个群了。", time: "22:17" }
    ],
    steps: [
      {
        message: { text: "群里没人知道录音从哪来。有人说是“内部人士”，还有一张没有出处的聊天截图。", time: "22:19" },
        choices: [
          { text: "先不转发，查看学校官方账号和通知渠道。", score: 15, tone: "good", feedback: "突发信息先看权威来源。官方渠道没有发布时，不转发本身就是对公共秩序的贡献。" },
          { text: "问群里有没有更完整的录音。", score: 2, tone: "warn", feedback: "继续追索“更完整版本”会扩大未经证实内容的传播，也无法真正证明其真实性。" },
          { text: "听起来很急，先转到年级群提醒大家。", score: -14, tone: "bad", feedback: "紧急感是谣言常用的传播策略。未经核实的信息可能放大恐慌，也给当事人带来伤害。" }
        ]
      },
      {
        message: { text: "发语音的人补充说：“这是 AI 合成的反面例子，你转发一下帮我测测辨识率。”", time: "22:23" },
        choices: [
          { text: "仍然不扩散，提醒发布者说明来源并删除原消息。", score: 15, tone: "good", feedback: "“测试辨识率”不能替代知情同意与传播审核。涉及真实机构或个人的合成音频，即使以测试为名也不应随意扩散。" },
          { text: "只发给一两个熟悉的朋友判断。", score: 0, tone: "warn", feedback: "“小范围”会不断扩展。判断内容真伪不需要先转发给更多人。" },
          { text: "标注“疑似 AI”后转发，反正已经提醒了。", score: -10, tone: "bad", feedback: "加上“疑似”并不能阻止二次传播。截图和转发会脱离原始语境，仍可能造成误导。" }
        ]
      },
      {
        message: { text: "十几分钟后，有人把录音剪辑成 12 秒短视频，配上了更醒目的标题。", time: "22:37" },
        choices: [
          { text: "不对短视频继续加工，向平台举报可疑合成内容。", score: 15, tone: "good", feedback: "举报能帮助平台和发布者阻断扩散，也保留了传播链证据。不要通过二创扩大影响。" },
          { text: "发评论说“这肯定是假的”，但不解释。", score: 2, tone: "warn", feedback: "简短反驳可能被理解为立场争吵。更有效的是提供官方信息、时间线或可信来源。" },
          { text: "做一张反转海报，用同一段音频再传播一次。", score: -9, tone: "bad", feedback: "辟谣内容如果嵌入了原始误导信息，仍可能造成误解和二次扩散。" }
        ]
      },
      {
        message: { text: "学校随后发布说明：网传音频系拼接伪造，请师生不信谣、不传谣。", time: "23:04" },
        choices: [
          { text: "只转发官方说明，删除自己此前保存的未核实版本。", score: 15, tone: "good", feedback: "权威信息出现后，主动清理未核实内容是负责任的收尾，也能防止以后被截取误用。" },
          { text: "保留原音频“留作证据”。", score: 2, tone: "warn", feedback: "确需证据时可由平台或学校留存。普通学生继续保存和传播，只会增加外泄风险。" },
          { text: "在群里说“我早就知道是假的”。", score: 0, tone: "warn", feedback: "这没有继续放大谣言，但也没有提供可验证的事实。公共讨论更需要来源和行动建议。" }
        ]
      }
    ],
    resultHigh: "你没有被“紧急”和“内部消息”带走，而是让事实先于传播。高安全素养也包括克制二次创作。",
    resultMid: "你意识到信息可能失真，但还需要更坚定地切断转发链。小范围流传仍然属于传播。",
    resultLow: "这组情境提醒你：夸张标题、紧迫语气和匿名来源不能替代证据。AI 时代，先核验再转发是一条基本边界。"
  },
  map: {
    code: "情境三 · 数据边界",
    title: "一个很酷的校园“数据可视化”",
    start: 34,
    intro: [
      { from: "other", avatar: "队", text: "比赛要一个校园交通可视化。我们把门禁刷卡时间、宿舍位置、校车轨迹都叠到地图上吧，肯定很炸。", time: "14:10" }
    ],
    steps: [
      {
        message: { text: "队友说数据是“内部朋友发来的”，只有十几万行，已经删掉姓名列了。", time: "14:13" },
        choices: [
          { text: "暂停使用，先确认数据来源、授权范围和学校数据管理要求。", score: 15, tone: "good", feedback: "先确认合法来源与授权。删除姓名并不等于完成去标识化，轨迹与时间信息极易重新识别个人。" },
          { text: "只用一天的数据，样本少一点应该安全。", score: -2, tone: "warn", feedback: "减少样本不能解决未经授权的问题，也可能让少量个体的轨迹更突出。" },
          { text: "数据看起来很有趣，先做完图再处理授权。", score: -15, tone: "bad", feedback: "先使用后补授权本身就扩大了数据暴露面。涉及门禁与轨迹的数据尤其需要严格边界。" }
        ]
      },
      {
        message: { text: "为了比赛效果，可以把数据上传到免费在线图表工具，公开链接也方便评委查看。", time: "14:21" },
        choices: [
          { text: "使用学校批准的本地或校内平台，并设置最小范围访问。", score: 15, tone: "good", feedback: "对个人信息和非公开数据，优先选择受控环境。公开链接即便“只有评委知道”，仍然不受控。" },
          { text: "只上传聚合后的统计数，不上传明细。", score: 8, tone: "warn", feedback: "聚合数据比明细更稳妥，但仍需确认聚合粒度、重识别风险与外发授权。" },
          { text: "上传到免费工具，省时间最重要。", score: -18, tone: "bad", feedback: "免费平台可能保存、分析甚至公开数据。个人信息与非公开业务数据不应以效率为由离开受控环境。" }
        ]
      },
      {
        message: { text: "第二天，一个陌生“评委助理”私信你，说需要原始数据和校车摄像头截图核验作品。", time: "10:06" },
        choices: [
          { text: "通过比赛官方通知核实，不向个人账号发送原始材料。", score: 15, tone: "good", feedback: "核验渠道必须来自官方。所谓“评委助理”的身份需要由赛事组织方确认，个人私信不具备权威性。" },
          { text: "发一份脱敏样例，看看对方下一步要什么。", score: 1, tone: "warn", feedback: "在身份未核实前发送任何样例，都可能暴露业务结构或不必要的个人数据。" },
          { text: "对方说得很专业，把原始压缩包发过去。", score: -20, tone: "bad", feedback: "专业话术不是身份证明。原始数据与监控截图一旦外发，就无法可靠收回。" }
        ]
      },
      {
        message: { text: "作品完成后，队友想把包含精确点位和数据的源码设置成公开仓库，方便展示“技术能力”。", time: "18:52" },
        choices: [
          { text: "检查敏感信息，改用合成或公开数据，并移除个人与内部业务字段。", score: 15, tone: "good", feedback: "开源展示应当先做数据与代码审查。使用合成数据既保留演示效果，也避开敏感信息。" },
          { text: "只删除数据文件，不检查代码与提交历史。", score: -3, tone: "warn", feedback: "敏感信息也可能留在注释、环境变量、样例响应和 Git 历史中。删除单个文件往往不彻底。" },
          { text: "直接公开，反正仓库访问量不会很大。", score: -12, tone: "bad", feedback: "低访问量不能降低风险。公开仓库可被自动抓取，且历史提交可能保留已删除内容。" }
        ]
      }
    ],
    resultHigh: "你把“能做出来”与“可以公开”区分开来，并考虑了数据最小化、受控环境和来源核验。",
    resultMid: "你已经具备一定的数据边界意识，但需要把“脱敏”“授权”“受控环境”落到每个传播节点。",
    resultLow: "技术展示不应以牺牲数据边界为代价。个人信息、轨迹和内部数据即使被聚合或去掉姓名，也可能重新识别。"
  }
};

const cases = {
  photo: {
    kicker: "案例 A-01 / 场所与设备",
    title: "“帮我拍一下实验室门口”",
    scene: "一位只在网上联系过的“摄影师”请你拍摄实验楼外观、门牌和门禁区域，说是用于“高校科创专题”。对方愿意按张付费，并表示不进入室内就没有问题。",
    look: "对方身份是否能通过学校、项目官网或公开联系方式核实？照片中的门牌、设备、地形和拍摄时间是否可能被组合出场所布局？",
    do: "拒绝未经批准的拍摄请求，不在公开平台发布实验室环境细节。如察觉对方持续索取场所或设备信息，保存记录并向学校相关部门或国家安全机关反映。",
    principle: "安全边界不由“是否进门”决定，而由场所信息的敏感程度决定。"
  },
  data: {
    kicker: "案例 A-02 / 数据与云端",
    title: "“免费网盘传一下就好”",
    scene: "小组想把课程项目数据发给外校合作者，里面有成员名单、实验室采样点、未公开设备参数和一份企业试用数据。有人建议上传到免费网盘，生成公开链接。",
    look: "这些信息是否已获得对外提供授权？哪些字段可以删除或聚合？网盘服务条款允许怎样的数据使用？公开链接是否设置访问期限与范围？",
    do: "使用学校或单位批准的传输与共享工具，按最小必要原则分类脱敏，确保只向获授权的具体人员开放。涉密或内部材料不得进入个人网盘。",
    principle: "方便不是合规的替代品；“只发给合作者”也无法保证链接不会被继续转发。"
  },
  ai: {
    kicker: "案例 A-03 / 合成内容",
    title: "“这段爆料录音是真的”",
    scene: "一段带有学校名称的录音在群聊里快速传播。视频只有十几秒，配有强烈情绪的字幕，但没有采访对象、原始出处和完整上下文。",
    look: "首条发布者是谁？能否找到录音原始文件和完整语境？学校官方账号、媒体或当事方是否回应？标题是否在刻意制造紧迫感？",
    do: "先暂停转发，核对权威来源。若确认是合成或误导内容，向平台举报并转发官方说明；保留必要证据，不进行再次加工传播。",
    principle: "“听起来像真的”不是真实性证明。AI 时代的公共责任，包括不把未经核实的内容继续交给算法。"
  },
  overseas: {
    kicker: "案例 A-04 / 跨境交往",
    title: "“出国前把名单都发给我”",
    scene: "准备参加国际交流前，一位新认识的“活动协调人”要求你提供完整人员名单、护照信息、每日行程、住宿地点和课题组研究内容，称这是“统一安排”。",
    look: "对方是否属于主办方的正式联系人？请求是否符合活动手册和学校审批流程？护照、住址和完整行程是否真的必要？",
    do: "通过学校国际合作部门和主办方官方渠道核实，只提供任务所需的必要信息。提前记录使领馆与校方应急联系方式，出现异常索取及时报告。",
    principle: "跨境交往更需要“最少披露”原则。正式身份应由正式渠道证明。"
  }
};

const checkQuestions = [
  { title: "我为学校与企业账号设置了不同密码，并开启了双重验证。", tag: "账号边界" },
  { title: "我不会在公开平台实时发布宿舍、实验室或精确行程信息。", tag: "发布边界" },
  { title: "涉密或内部材料只进入批准的设备与系统，不使用个人网盘。", tag: "数据边界" },
  { title: "陌生附件、插件和下载链接，我会先核验来源再处理。", tag: "设备边界" },
  { title: "分享数据或照片前，我会检查门牌、定位、屏幕内容和文件属性。", tag: "内容边界" },
  { title: "面对高薪兼职或异常学术邀请，我会先核实对方机构与联系人。", tag: "交往边界" },
  { title: "看到突发事件或疑似 AI 合成内容时，我会等待权威信息再转发。", tag: "信息边界" },
  { title: "我知道遇到可疑国家安全线索时，应保存证据并通过正规渠道报告。", tag: "报告意识" }
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setupHeader() {
  const header = document.querySelector(".site-header");
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const progress = document.getElementById("page-progress");
  const desktopLinks = [...document.querySelectorAll(".desktop-nav a")];
  const sections = desktopLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);

  const updateScroll = () => {
    const scrollTop = window.scrollY;
    header?.classList.toggle("is-fixed", scrollTop > 70);
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${scrollable > 0 ? Math.min(100, (scrollTop / scrollable) * 100) : 0}%`;

    let activeId = "";
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= window.innerHeight * .34) {
        activeId = section.id;
      }
    }
    desktopLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${activeId}`));
  };

  window.addEventListener("scroll", updateScroll, { passive: true });
  updateScroll();

  menuToggle?.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!open));
    mobileMenu?.classList.toggle("is-open", !open);
  });

  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle?.setAttribute("aria-expanded", "false");
      mobileMenu.classList.remove("is-open");
    });
  });
}

let toastTimer;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

function setupReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12, rootMargin: "0px 0px -6% 0px" });
  elements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 3, 2) * 80}ms`;
    observer.observe(element);
  });

  const timeline = document.querySelector(".timeline-section");
  if (timeline) {
    const timelineObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        timeline.classList.add("is-visible");
        timelineObserver.disconnect();
      }
    }, { threshold: .2 });
    timelineObserver.observe(timeline);
  }
}

function setupCounters() {
  const counters = [...document.querySelectorAll("[data-count]")];
  if (prefersReducedMotion || !("IntersectionObserver" in window)) return;
  const animate = (element) => {
    const target = Number(element.dataset.count || 0);
    const start = performance.now();
    const duration = 1100;
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      element.textContent = String(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .7 });
  counters.forEach((counter) => {
    counter.textContent = "0";
    observer.observe(counter);
  });
}

function setupNetworkCanvas() {
  const canvas = document.getElementById("network-canvas");
  if (!canvas) return;
  const context = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let points = [];
  let pointerX = 0;
  let pointerY = 0;
  let animationFrame = 0;

  const createPoints = () => {
    const count = Math.min(72, Math.max(34, Math.floor(width / 22)));
    points = Array.from({ length: count }, (_, index) => ({
      x: (Math.sin(index * 89.13) * .5 + .5) * width,
      y: (Math.sin(index * 37.71 + 1.8) * .5 + .5) * height,
      vx: (Math.sin(index * 17.3) || .2) * .12,
      vy: (Math.cos(index * 11.7) || -.1) * .12,
      radius: index % 7 === 0 ? 1.7 : .8,
      bright: index % 5 === 0
    }));
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    createPoints();
  };

  const draw = () => {
    context.clearRect(0, 0, width, height);
    points.forEach((point) => {
      if (!prefersReducedMotion) {
        point.x += point.vx;
        point.y += point.vy;
        if (point.x < 0 || point.x > width) point.vx *= -1;
        if (point.y < 0 || point.y > height) point.vy *= -1;
      }
    });

    for (let i = 0; i < points.length; i += 1) {
      const a = points[i];
      const dxPointer = a.x - pointerX;
      const dyPointer = a.y - pointerY;
      const pointerDistance = Math.hypot(dxPointer, dyPointer);
      for (let j = i + 1; j < points.length; j += 1) {
        const b = points[j];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        if (distance < 125) {
          const pointerBoost = Math.max(0, 1 - pointerDistance / 340) * .13;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.strokeStyle = `rgba(111, 212, 207, ${(.035 + pointerBoost) * (1 - distance / 125)})`;
          context.lineWidth = .7;
          context.stroke();
        }
      }
    }

    points.forEach((point) => {
      context.beginPath();
      context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
      context.fillStyle = point.bright ? "rgba(255, 201, 124, .5)" : "rgba(114, 234, 215, .25)";
      context.fill();
    });

    if (!prefersReducedMotion) animationFrame = requestAnimationFrame(draw);
  };

  window.addEventListener("resize", () => {
    window.cancelAnimationFrame(animationFrame);
    resize();
    draw();
  }, { passive: true });
  window.addEventListener("pointermove", (event) => {
    const rect = canvas.getBoundingClientRect();
    pointerX = event.clientX - rect.left;
    pointerY = event.clientY - rect.top;
  }, { passive: true });
  window.addEventListener("pagehide", () => window.cancelAnimationFrame(animationFrame));
  resize();
  draw();
}

function setupAmbientCursor() {
  const cursor = document.getElementById("ambient-cursor");
  if (!cursor || prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) return;
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  window.addEventListener("pointermove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
  }, { passive: true });
  const update = () => {
    currentX += (targetX - currentX) * .08;
    currentY += (targetY - currentY) * .08;
    cursor.style.left = `${currentX}px`;
    cursor.style.top = `${currentY}px`;
    requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

function setupDomains() {
  const grid = document.getElementById("domain-grid");
  if (!grid) return;
  grid.innerHTML = domains.map((domain) => `
    <button class="domain-card" type="button" data-domain="${domain.id}" data-category="${escapeHtml(domain.category)}">
      <span class="domain-card-top"><span>${String(domain.id).padStart(2, "0")}</span><span>${escapeHtml(domain.categoryName)}</span></span>
      <h3>${escapeHtml(domain.name)}</h3>
      <p>${escapeHtml(domain.short)}</p>
    </button>
  `).join("");

  document.querySelectorAll(".filter-chip").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      document.querySelectorAll(".filter-chip").forEach((chip) => chip.classList.toggle("is-active", chip === button));
      document.querySelectorAll(".domain-card").forEach((card) => {
        const shouldShow = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });

  grid.addEventListener("click", (event) => {
    const card = event.target.closest(".domain-card");
    if (!card) return;
    openDomain(Number(card.dataset.domain));
  });
}

function openModal(modal) {
  modal.hidden = false;
  document.body.classList.add("modal-open");
  const focusable = modal.querySelector("button, a, input");
  window.setTimeout(() => focusable?.focus(), 30);
}

function closeModal(modal) {
  modal.hidden = true;
  if (!document.querySelector(".modal:not([hidden])")) document.body.classList.remove("modal-open");
}

function openDomain(id) {
  const domain = domains.find((item) => item.id === id);
  const modal = document.getElementById("domain-modal");
  if (!domain || !modal) return;
  document.getElementById("modal-index").textContent = String(domain.id).padStart(2, "0");
  document.getElementById("modal-code").textContent = String(domain.id).padStart(2, "0");
  document.getElementById("modal-category").textContent = domain.categoryName.toUpperCase();
  document.getElementById("modal-title").textContent = domain.name;
  document.getElementById("modal-summary").textContent = domain.summary;
  document.getElementById("modal-connection").textContent = domain.connection;
  document.getElementById("modal-action").textContent = domain.action;
  document.getElementById("modal-tip").textContent = domain.tip;
  document.getElementById("modal-symbol").textContent = domain.symbol;
  openModal(modal);
}

function setupCaseModals() {
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest(".case-open");
    if (trigger) {
      const row = trigger.closest(".case-row");
      const item = cases[row?.dataset.case];
      if (!item) return;
      document.getElementById("case-modal-kicker").textContent = item.kicker;
      document.getElementById("case-modal-title").textContent = item.title;
      document.getElementById("case-modal-scene").textContent = item.scene;
      document.getElementById("case-modal-look").textContent = item.look;
      document.getElementById("case-modal-do").textContent = item.do;
      document.getElementById("case-modal-principle").textContent = item.principle;
      openModal(document.getElementById("case-modal"));
    }
    if (event.target.closest("[data-close-case]")) closeModal(document.getElementById("case-modal"));
    if (event.target.closest("[data-close-modal]")) closeModal(document.getElementById("domain-modal"));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    document.querySelectorAll(".modal:not([hidden])").forEach(closeModal);
  });
}

function setupRadarCanvas() {
  const canvas = document.getElementById("radar-canvas");
  if (!canvas) return;
  const context = canvas.getContext("2d");
  const host = canvas.parentElement;
  let width = 0;
  let height = 0;
  let angle = 0;
  let animationFrame = 0;

  const resize = () => {
    const rect = host.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = () => {
    context.clearRect(0, 0, width, height);
    const cx = width / 2;
    const cy = height * .47;
    const radius = Math.min(width, height) * .36;

    context.strokeStyle = "rgba(114,234,215,.14)";
    context.lineWidth = 1;
    for (let i = 1; i <= 4; i += 1) {
      context.beginPath();
      context.arc(cx, cy, radius * (i / 4), 0, Math.PI * 2);
      context.stroke();
    }
    for (let i = 0; i < 12; i += 1) {
      const theta = (Math.PI * 2 * i) / 12;
      context.beginPath();
      context.moveTo(cx, cy);
      context.lineTo(cx + Math.cos(theta) * radius, cy + Math.sin(theta) * radius);
      context.stroke();
    }
    for (let i = 0; i < 20; i += 1) {
      const theta = i * 2.399;
      const r = radius * (.2 + ((i * .47) % 1) * .72);
      const x = cx + Math.cos(theta) * r;
      const y = cy + Math.sin(theta) * r;
      context.beginPath();
      context.arc(x, y, i % 5 === 0 ? 2.1 : 1.2, 0, Math.PI * 2);
      context.fillStyle = i % 5 === 0 ? "rgba(255,201,124,.75)" : "rgba(114,234,215,.42)";
      context.fill();
    }

    if (!prefersReducedMotion) {
      const gradient = context.createLinearGradient(cx, cy, cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
      gradient.addColorStop(0, "rgba(114,234,215,.42)");
      gradient.addColorStop(1, "rgba(114,234,215,0)");
      context.beginPath();
      context.moveTo(cx, cy);
      context.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
      context.strokeStyle = gradient;
      context.lineWidth = 1.2;
      context.stroke();
      angle += .009;
    }
    animationFrame = requestAnimationFrame(draw);
  };

  window.addEventListener("resize", () => {
    window.cancelAnimationFrame(animationFrame);
    resize();
    draw();
  }, { passive: true });
  window.addEventListener("pagehide", () => window.cancelAnimationFrame(animationFrame));
  resize();
  draw();
}

let currentScenario = "intern";
let scenarioState = null;

function initializeScenario(key = currentScenario) {
  const data = scenarios[key];
  if (!data) return;
  currentScenario = key;
  scenarioState = { step: 0, score: data.start, busy: false, completed: false };
  document.getElementById("scenario-code").textContent = data.code;
  document.getElementById("scenario-title").textContent = data.title;
  document.getElementById("safety-score").textContent = String(data.start);
  document.getElementById("safety-bar").style.width = `${data.start}%`;
  document.querySelectorAll(".scenario-tab").forEach((tab) => {
    const active = tab.dataset.scenario === key;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  const chat = document.getElementById("scenario-chat");
  chat.innerHTML = "";
  data.intro.forEach((message) => appendChat(message));
  renderChoices();
}

function appendChat(message) {
  const chat = document.getElementById("scenario-chat");
  if (!chat) return;
  const row = document.createElement("div");
  row.className = `chat-row${message.from === "user" ? " is-user" : ""}`;
  row.innerHTML = `
    <span class="chat-avatar">${escapeHtml(message.avatar || (message.from === "user" ? "我" : "?"))}</span>
    <div class="chat-bubble">${escapeHtml(message.text)}<small>${escapeHtml(message.time || "")}</small></div>
  `;
  chat.appendChild(row);
  chat.scrollTo({ top: chat.scrollHeight, behavior: prefersReducedMotion ? "auto" : "smooth" });
}

function appendFeedback(choice) {
  const chat = document.getElementById("scenario-chat");
  if (!chat) return;
  const feedback = document.createElement("div");
  feedback.className = `feedback-bubble ${choice.tone === "bad" ? "is-danger" : choice.tone === "warn" ? "is-warning" : ""}`;
  feedback.textContent = `${choice.score > 0 ? "+" : ""}${choice.score} 防护值 · ${choice.feedback}`;
  chat.appendChild(feedback);
  chat.scrollTo({ top: chat.scrollHeight, behavior: prefersReducedMotion ? "auto" : "smooth" });
}

function renderChoices() {
  const data = scenarios[currentScenario];
  const area = document.getElementById("scenario-choices");
  if (!data || !area || !scenarioState) return;
  area.innerHTML = "";
  if (scenarioState.completed) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.innerHTML = `<span>↺</span><p>重新开始这条情境线</p><svg viewBox="0 0 20 20"><path d="M4 10h11M11 5l5 5-5 5"/></svg>`;
    button.addEventListener("click", () => initializeScenario(currentScenario));
    area.appendChild(button);
    return;
  }
  const step = data.steps[scenarioState.step];
  step.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.innerHTML = `<span>0${index + 1}</span><p>${escapeHtml(choice.text)}</p><svg viewBox="0 0 20 20"><path d="M4 10h11M11 5l5 5-5 5"/></svg>`;
    button.addEventListener("click", () => selectChoice(choice));
    area.appendChild(button);
  });
}

function selectChoice(choice) {
  if (!scenarioState || scenarioState.busy || scenarioState.completed) return;
  scenarioState.busy = true;
  appendChat({ from: "user", text: choice.text, avatar: "我", time: "刚刚" });
  appendFeedback(choice);
  scenarioState.score = Math.max(0, Math.min(100, scenarioState.score + choice.score));
  document.getElementById("safety-score").textContent = String(scenarioState.score);
  document.getElementById("safety-bar").style.width = `${scenarioState.score}%`;

  const blocks = document.querySelectorAll(".choice-button");
  blocks.forEach((button) => button.setAttribute("disabled", "true"));
  window.setTimeout(() => {
    if (!scenarioState) return;
    scenarioState.step += 1;
    const data = scenarios[currentScenario];
    if (scenarioState.step < data.steps.length) {
      appendChat({ from: "other", avatar: "K", text: data.steps[scenarioState.step].message.text, time: data.steps[scenarioState.step].message.time });
      scenarioState.busy = false;
      renderChoices();
    } else {
      finishScenario();
    }
  }, prefersReducedMotion ? 10 : 520);
}

function finishScenario() {
  const data = scenarios[currentScenario];
  const score = scenarioState.score;
  const result = score >= 82 ? data.resultHigh : score >= 55 ? data.resultMid : data.resultLow;
  const grade = score >= 82 ? "稳健处置" : score >= 55 ? "基本识别" : "需要补强";
  const bucket = score >= 82 ? "high" : score >= 55 ? "mid" : "low";
  appendChat({ from: "other", avatar: "✓", text: `推演结束。防护值 ${score} / 100，判定：${grade}。`, time: "判定" });
  const area = document.getElementById("scenario-choices");
  area.innerHTML = `
    <div class="result-badge" data-level="${bucket}">
      <span>练习完成 / ${score} 分</span>
      <strong>${grade}</strong>
      <p>${escapeHtml(result)}</p>
    </div>
  `;
  scenarioState.completed = true;
  scenarioState.busy = false;
  const reset = document.createElement("button");
  reset.type = "button";
  reset.className = "choice-button";
  reset.innerHTML = `<span>↺</span><p>换一种选择，再推演一次</p><svg viewBox="0 0 20 20"><path d="M4 10h11M11 5l5 5-5 5"/></svg>`;
  reset.addEventListener("click", () => initializeScenario(currentScenario));
  area.appendChild(reset);
  document.querySelector(".scenario-status span").textContent = "已完成";
}

function setupScenario() {
  const tabs = document.querySelectorAll(".scenario-tab");
  tabs.forEach((tab) => tab.addEventListener("click", () => initializeScenario(tab.dataset.scenario)));
  document.getElementById("reset-scenario")?.addEventListener("click", () => initializeScenario(currentScenario));
  initializeScenario("intern");
}

function setupCheck() {
  const list = document.getElementById("check-list");
  if (!list) return;
  list.innerHTML = checkQuestions.map((question, index) => `
    <label class="check-item">
      <input type="checkbox" value="${index}">
      <span class="custom-check" aria-hidden="true"></span>
      <span class="check-item-copy"><strong>${escapeHtml(question.title)}</strong><small>${escapeHtml(question.tag)}</small></span>
    </label>
  `).join("");

  const inputs = [...list.querySelectorAll('input[type="checkbox"]')];
  const scoreNode = document.getElementById("check-score");
  const labelNode = document.getElementById("check-label");
  const update = () => {
    const score = inputs.filter((input) => input.checked).length;
    scoreNode.textContent = String(score);
    labelNode.textContent = score === 0 ? "等待检测" : score <= 2 ? "边界正在建立" : score <= 4 ? "基础意识形成" : score <= 6 ? "习惯趋于稳定" : score <= 7 ? "较有韧性" : "高韧性状态";
  };
  inputs.forEach((input) => input.addEventListener("change", update));

  document.getElementById("check-submit")?.addEventListener("click", () => {
    const score = inputs.filter((input) => input.checked).length;
    const missing = checkQuestions.filter((_, index) => !inputs[index].checked);
    const result = document.getElementById("check-result");
    const percent = Math.round((score / 8) * 100);
    const title = score >= 8 ? "良好习惯已经形成" : score >= 6 ? "补上一处关键边界" : score >= 3 ? "从一个场景开始改善" : "先建立最小安全闭环";
    const priority = missing.length ? missing[0] : null;
    const body = priority
      ? `建议优先补强「${priority.tag}」：${priority.title} 你可以从今天一次具体操作开始，并在完成后再次自测。`
      : "你已勾选全部八项习惯。下一步是定期复查账号权限、数据外发与异常接触记录，并把方法分享给身边的人。";
    result.innerHTML = `
      <div class="result-ring"><span>安全韧性</span><strong>${percent}%</strong></div>
      <div class="result-copy">
        <p class="panel-label">下一步</p>
        <h3>${title}</h3>
        <p>${escapeHtml(body)}</p>
      </div>
    `;
    showToast(`下一步建议已生成：优先关注${priority ? priority.tag : "持续复查"}`);
  });
  update();
}

function drawPledgeCard(name) {
  const canvas = document.createElement("canvas");
  const width = 1600;
  const height = 900;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#f3ede1";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(31,42,37,.08)";
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 80) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 80) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Left cover panel
  ctx.fillStyle = "#cf6748";
  ctx.fillRect(0, 0, 550, height);
  ctx.fillStyle = "#e7b655";
  ctx.beginPath();
  ctx.arc(385, 120, 170, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#1f2a25";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(385, 120, 170, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "#fffdf7";
  ctx.font = "700 28px 'Microsoft YaHei', 'Noto Sans CJK SC', sans-serif";
  ctx.fillText("防线  /  校园读本", 82, 105);
  ctx.font = "500 16px Consolas, monospace";
  ctx.fillText("NATIONAL SECURITY · 2026", 82, 142);

  // Shield illustration
  ctx.save();
  ctx.translate(138, 300);
  ctx.fillStyle = "#fffdf7";
  ctx.strokeStyle = "#1f2a25";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(135, 0);
  ctx.lineTo(262, 48);
  ctx.lineTo(262, 150);
  ctx.bezierCurveTo(262, 248, 205, 318, 135, 355);
  ctx.bezierCurveTo(65, 318, 8, 248, 8, 150);
  ctx.lineTo(8, 48);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(68, 175);
  ctx.lineTo(122, 118);
  ctx.lineTo(158, 158);
  ctx.lineTo(222, 78);
  ctx.strokeStyle = "#cf6748";
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();
  [[68, 175], [122, 118], [158, 158], [222, 78]].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.fillStyle = "#1f2a25";
    ctx.fill();
  });
  ctx.restore();

  ctx.fillStyle = "#fffdf7";
  ctx.font = "600 32px 'Microsoft YaHei', 'Noto Sans CJK SC', sans-serif";
  ctx.fillText("在每一次选择中", 82, 745);
  ctx.fillText("守住边界。", 82, 792);
  ctx.font = "400 16px Consolas, monospace";
  ctx.fillText("A STUDENT FIELD NOTE / 01", 82, 845);

  // Right editorial content
  ctx.fillStyle = "#cf6748";
  ctx.fillRect(620, 92, 90, 11);
  ctx.fillStyle = "#1f2a25";
  ctx.font = "700 22px 'Microsoft YaHei', sans-serif";
  ctx.fillText("我的安全承诺", 620, 154);
  ctx.font = "600 66px 'Songti SC', 'SimSun', 'Noto Serif CJK SC', serif";
  ctx.fillText("先核验，再相信；", 620, 245);
  ctx.fillText("守边界，再行动。", 620, 325);

  ctx.strokeStyle = "#1f2a25";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(620, 370);
  ctx.lineTo(1490, 370);
  ctx.stroke();

  const lines = [
    ["01", "不随意拍摄、上传涉密或内部信息；"],
    ["02", "核验陌生请求，保护个人与科研数据；"],
    ["03", "面对可疑线索，及时向正规渠道报告；"],
    ["04", "让每一次克制，成为安全防线的一环。"]
  ];
  lines.forEach(([number, line], index) => {
    const y = 430 + index * 88;
    ctx.fillStyle = index === 3 ? "#e7b655" : index === 1 ? "#d8e4de" : "#fffdf7";
    ctx.fillRect(620, y - 31, 870, 61);
    ctx.strokeStyle = "#1f2a25";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(620, y - 31, 870, 61);
    ctx.fillStyle = "#cf6748";
    ctx.font = "700 16px Consolas, monospace";
    ctx.fillText(number, 640, y + 2);
    ctx.fillStyle = "#1f2a25";
    ctx.font = "500 27px 'Microsoft YaHei', 'Noto Sans CJK SC', sans-serif";
    ctx.fillText(line, 695, y + 4);
  });

  ctx.fillStyle = "#6e756d";
  ctx.font = "700 15px Consolas, monospace";
  ctx.fillText("署名", 620, 806);
  ctx.fillStyle = "#1f2a25";
  ctx.font = "600 38px 'Microsoft YaHei', 'Noto Sans CJK SC', sans-serif";
  ctx.fillText(name, 695, 810);
  ctx.fillStyle = "#6e756d";
  ctx.font = "400 14px Consolas, monospace";
  ctx.textAlign = "right";
  ctx.fillText("课程学生实践作品 · 2026", 1490, 810);
  ctx.textAlign = "left";
  return canvas;
}

function setupPledge() {
  const button = document.getElementById("generate-card");
  const input = document.getElementById("pledge-name");
  if (!button || !input) return;
  button.addEventListener("click", () => {
    const name = input.value.trim() || "北航学子";
    const canvas = drawPledgeCard(name.slice(0, 12));
    const link = document.createElement("a");
    link.download = `defense-line-pledge-${name}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    showToast("承诺卡已生成并开始下载");
  });
}

function setupInitialFocus() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      const modal = document.querySelector(".modal:not([hidden])");
      if (!modal) return;
      const focusable = [...modal.querySelectorAll('button, a[href], input, [tabindex]:not([tabindex="-1"])')]
        .filter((element) => !element.hidden && element.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
}

function init() {
  setupHeader();
  setupReveal();
  setupCounters();
  setupNetworkCanvas();
  setupAmbientCursor();
  setupDomains();
  setupCaseModals();
  setupRadarCanvas();
  setupScenario();
  setupCheck();
  setupPledge();
  setupInitialFocus();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
