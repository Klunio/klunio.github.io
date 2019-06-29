var store = [{
        "title": "Index",
        "excerpt":"      github:https://github.com/sysu-gfs-3     Doc:https://sysu-gfs-3.github.io/Dashboard/       帅气的使用终端，程序员利器 —— Tmux   ","categories": [],
        "tags": [],
        "url": "http://localhost:4000/LeiEarn/Index/",
        "teaser":null},{
        "title": "Tmux",
        "excerpt":"帅气的使用终端，程序员利器 —— Tmux   ​\t在这次的项目开发中，我主要是进行架构设计与后台开发，我们的服务器部署在阿里云的云平台上所以少不了与Terminal打交道，对命令行下的开发速率要求较高   ​\t虽然在mac下使用iterm2极大的优化了terminal的使用体验（例如历史输入补全等功能),然而还是避免不了在与前端进行交互测试的时候，为了同时修改代码、启动程序、提交代码…等等操作，需要开启一堆terminal窗口，而Tmux的 Session恰好实现了这样的功能！   What’s Tmux   Tmux(termianl multiplexer) 是一个BSD协议发布的终端复用软件，用来在服务器端托管同时运行的Shell。使用该工具，用户可以连接或断开会话，而保持终端在后台运行。   Install   首先进行安装   brew install tmux       # OSX pacman -S tmux          # archlinux apt-get install tmux    # Ubuntu yum install tmux        # Centos   Usage   tmux的基本结构   ​\ttmux的结构包括会话(session)、窗口(window)、窗格(pane)三部分，会话的实质是伪终端的集合，每个窗格表示一个伪终端，多个窗格显示在一个屏幕上，这一屏幕就叫窗口。如图：      tmux的基本操作   ​\ttmux的基本操作，无非就是用会话、窗口、窗格进行管理，包括创建、关闭、重命名、连接、分离、选择等等。   Session 操作   创建session   tmux new -s {session_name}   使用&lt;prefix&gt; $可以重命名当前的Session，其中&lt;prefix&gt;指的是tmux中的前缀键，默认值是Ctrl+b。   显示会话列表   tmux ls   连接上一个会话   tmux a or tmux attach   连接指定会话   tmux a -t {session_name}   关闭指定会话   tmux kill-session -t {session_name}   在&lt;会话中列出所有session并切换   &lt;prefix&gt; s   以上的指令都是对session的操作，涵盖了基本的session操作，在本次项目中已经很够用了。接下来是进入到会话后的一些使用的快捷键。   window 操作   创建一个新窗口   &lt;prefix&gt; c   列出所有窗口，并切换   &lt;prefix&gt; w   pane 操作   在项目的过程中，我对窗口的操作并不频繁，主要运用的还是窗口分割成多个pane的技术   水平方向创建窗格   &lt;prefix&gt; %   垂直方向创建窗格   &lt;prefix&gt; \"   切换窗格   &lt;prefix&gt; Up|Down|Left|Rgith  #方向键   关闭当前窗格   &lt;prefix&gt; x   重新排列当前窗口下的所有窗格   &lt;prefix&gt; space \t\t#\t空格键   总的来说，上面这5个操作简直是神器，极大的提高了开发和测试的效率，比如说可以分出一个窗格看Flask服务器的输出，另一个窗格用于查看数据库内容，另一个窗格用来修改代码，或者甚至还可以分出一个窗格用crul指令自己对服务器进行测试。   滚动窗格   &lt;prefix&gt; [   这个快捷键也非常重要，因为在tmux会话中无法使用滚轮或上下键来滚动显示之前的terminal内容，使用该快捷键可以冻结当前的面板内容，查看之前的全部内容，按Ctrl + c退出。   其他命令   列出所有命令   tmux list-command   使用UTF-8   tmux -u   显示时钟   &lt;prefix&gt; t   MORE      TMUX与Screen的区别   使用Vim和Tmux搭建一个IDE   Mac 下的Tmux配置   引用：           tmux基本操作            Tmux使用手册| louis blog            优雅地使用命令行：Tmux 终端复用       ","categories": [],
        "tags": [],
        "url": "http://localhost:4000/LeiEarn/Tmux/",
        "teaser":null},{
        "title": "Welcome to Jekyll!",
        "excerpt":"You’ll find this post in your _posts directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run jekyll serve, which launches a web server and auto-regenerates your site when a file is updated.   To add new posts, simply add a file in the _posts directory that follows the convention YYYY-MM-DD-name-of-post.ext and includes the necessary front matter. Take a look at the source for this post to get an idea about how it works.   Jekyll also offers powerful support for code snippets:   def print_hi(name)   puts \"Hi, #{name}\" end print_hi('Tom') #=&gt; prints 'Hi, Tom' to STDOUT.  Check out the Jekyll docs for more info on how to get the most out of Jekyll. File all bugs/feature requests at Jekyll’s GitHub repo. If you have questions, you can ask them on Jekyll Talk.   ","categories": ["jekyll","update"],
        "tags": [],
        "url": "http://localhost:4000/jekyll/update/2019/05/06/welcome-to-jekyll.html",
        "teaser":null},{
        "title": "Software System Analysis And Design",
        "excerpt":"Software System Analysis and Design      系统分析与设计 - 潘茂林     Supporting Site         软件的本质与软件工程科学   软件项目与知识团队管理   软件项目过程模型与规划   Inception 实践指南   组织第一次迭代   用例建模-绘制用例图   用例建模-用例编写   业务建模   领域建模-概念与数据建模   领域建模-模型验证与面向资源的API设计   功能建模-设计RPC风格API   ","categories": [],
        "tags": [],
        "url": "http://localhost:4000/swsad/Software-System-Analysis-and-Design/",
        "teaser":null},{
        "title": "Page",
        "excerpt":"使用 UMLet 建模：           1、根据订旅馆建模文档，Asg-RH.pdf：              绘制用例图模型（到子用例）                         给出 make reservation 用例的活动图                       2、根据课程练习“投递员使用投递箱给收件人快递包裹”的业务场景                       分别用多泳道图建模三个场景的业务过程                      场景1                                         场景2                                         场景3                                           根据上述流程，给出快递柜系统最终的用例图模型             用正常色彩表示第一个业务流程反映的用例       用绿色背景表述第二个业务场景添加或修改的用例，以及支持 Actor       用黄色背景表述第三个业务场景添加或修改的用例，以及支持 Actor              ","categories": [],
        "tags": [],
        "url": "http://localhost:4000/swsad/%E7%94%A8%E4%BE%8B%E5%BB%BA%E6%A8%A1-%E7%94%A8%E4%BE%8B%E7%BC%96%E5%86%99/page/",
        "teaser":null},{
        "title": "用例建模-绘制用例图",
        "excerpt":"1、简答题           用例的概念       用例（Use Case）：是一种通过用户的使用场景来获取需求的技术。一个用例定义了外部执行者和被考虑的系统之间的交互来实现一个业务目标，用例描述了满足业务目标的业务活动，没有涉及特定的实现寓言并且要求合适的细节级别。            用例和场景的关系？什么是主场景或 happy path？       每个用例提供一个或多个场景，该场景说明了系统是如何和最终用户或其他系统互动，也就是谁可以用系统做什么。 参与者在用例中所遵循的主逻辑路径，描述了各项工作都正常进行时用例的工作方式，所以通常称为主场景或happy path            用例有哪些形式？                       Brief：           提供一段通过关于主要的happy path总结。可以快速构建，在需求的早期提供主题和范围的快速了解。                        Casual：           非正式的段落格式，包含多种场景的多个段落，比brief use case相比具有更多的细节，但无法被用作正式的用例文本。                        Fully：           所有的步骤和变化都详细的写出，并且有支持部分，例如先决条件和成功保证。                        对于复杂业务，为什么编制完整用例非常难？       因为复杂的业务涉及到的场景非常多，并且各个场景之间也有彼此的关联，因此这给编制一个完整的用例带来了很大的困难，业务人员不仅要熟悉各种业务场景的流程，分析构建一个场景的细节也至关重要。            什么是用例图？       是用户与系统交互的最简表示形式，展现了用户和与他相关的用例之间的关系。通过用例图，人们可以获知系统不同种类的用户和用例。            用例图的基本符号与元素？              参与者(Actor),表示的是一个系统用户，也就是与应用程序进行交互的用户、组织或者外部系统。       用例(Use Case)：表示的是对系统提供功能、服务的一种描述。       用例关系：                    包含关系(include)：表示用例可以简单地包含其他用例所具有的行为           泛化关系(Generalization)：值一个父用例可以被特化形成多个子用例           关联关系(Association)：表示的是参与者与用例之间的关系           扩展/延伸关系(Extend)：表示在一定条件下，把新的行为加入到已有的用例中，获得的新用例叫做扩展用例。                                用例图的画法与步骤              确定研讨的系统、系统的参与者；哪些人会使用这个系统、系统需要从哪些人或其他系统中获得数据….       确定用例，根据参与者来确定系统的用例，主要是看各参与者需要系统提供什么样的服务，或者说参与者是如何使用系统的。       描述用例规约，描述每一个有例的详细信息，这些信息包含在用例规约中，用例模型是由用例图和每一个用例的详细描述――用例规约所组成的。       检查用例模型，用例模型完成之后，可以对用例模型进行检查，看看是否有遗漏或错误之处。                用例图给利益相关人与开发者的价值有哪些？              对于利益相关人：                    可以直观的反应系统的功能结构，保证系统按照需求进行设计           用例通常使用结构化模板编写，辅以可视化UML图标，促进利益相关人与开发者进行的沟通，根据需求的复杂程度对程序进行细节上的增减调节，及时响应用户。                       对于开发者：                    用例图为开发者提供了一个清晰的开发蓝图，提高系统的开发效率和质量           用例图可以指导开发和测试，在整个过程中对工作流起指导作用                           2、建模练习题（用例模型）      选择2-3个你熟悉的类似业务的在线服务系统（或移动 APP），如定旅馆（携程、去哪儿等）、定电影票、背单词APP等，分别绘制它们用例图。并满足以下要求：            请使用用户的视角，描述用户目标或系统提供的服务       粒度达到子用例级别，并用 include 和 exclude 关联它们       请用色彩标注出你认为创新（区别于竞争对手的）用例或子用例       尽可能识别外部系统和服务                   携程：                   订电影票：                      然后，回答下列问题：                       为什么相似系统的用例图是相似的？           因为相似的系统，面对的参与者和用例是相似的，用例之间的关系也是同构的。用户预期的功能也是接近的。即使不同的同类系统具有不一样的拓展功能，在用例图上所体现的结构框架也是相似的。                        如果是定旅馆业务，请对比 Asg_RH 用例图，简述如何利用不同时代、不同地区产品的用例图，展现、突出创新业务和技术           在用例图上添加创新业务，满足不同时代、不同地区用户的不同需求，突出创新和与时俱进；替换老旧功能，淘汰落后、不受欢迎的业务。                        如何利用用例图定位创新思路（业务创新、或技术创新、或商业模式创新）在系统中的作用           通过创新点在图中的位置来判断。如果创新位于较高的父级，则作用比较大。如果是子类或者是被包括的关系，则作用相对较小。                        请使用 SCRUM 方法，选择一个用例图，编制某定旅馆开发的需求（backlog）开发计划表                                                  ID               Name               Imp               Est               Itern               How to demo                                                               1               find hotel               10               16               4               find the thoel by location, data, name or type                                         2               make reservation               7               12               6               determine the room type , time of the hotel                                         3               manage basket               5               8               1               confirm or cancel                                         4               payment               5               8               4               make payment using outside paying system                                                        根据任务4，参考 使用用例点估算软件成本，给出项目用例点的估算                                  用例       #事务       #计算       原因       UC权重                       find hotel       7       6       框架       平均                 make reservation       5       4               简单                 manage basket       1       1               简单                 payment       4       2               简单           ","categories": ["jekyll","update"],
        "tags": [],
        "url": "http://localhost:4000/swsad/%E7%94%A8%E4%BE%8B%E5%BB%BA%E6%A8%A1-%E7%BB%98%E5%88%B6%E7%94%A8%E4%BE%8B%E5%9B%BE/page/",
        "teaser":null},{
        "title": "Page",
        "excerpt":"1.软件工程的定义   Software engineering is:      the application of a systematic, disciplined, quantifiable approach to the develpment, operation, and maintenace of software, that is, the application of engineering to software   the study of approaches in (1)1   2. 解释导致 software crisis 本质原因、表现，述说克服软件危机的方法   本质原因：   The software crisis was due to the rapid increases in computer power and the complexity of the problems that could not be tackled. With the increase in the complexity of the software, many software problems arose because existing methods were in sufficient.   表现：      Project running over-budget   Project running over-time   Software was very inefficient   Software was of low quality   Softwaree often did not meet requirements   Projects were unmanageable and code difficult to maintain   Software was never delivered   2   克服方法:   Build the methods and knowledge system of software preduciton, systematic and up-to-date software engineering methods are also needed to avoid software crisis.   3. 软件生命周期   A software development life cycle is the process of dividing software development work into disinct phases to improve design, product management, and project management. Most modern develpment processes ca be vaguely described as agile. Other methodologies include waterfall, prototyping, iterative and incremental development, spiral development, rapid application development, and extreme programming.   4. SWEBoK 的 15 个知识域（An Overview of the SWEBOK Guide 请中文翻译其名称与简短说明）   v3      Software Requirements：软件需求。软件需求涉及到引出、协商、分析、规范和验证，软件需求表达了对软件产品的需求和约束，这些需求和约束有助于解决一些实际问题。   Software Design：软件设计。软件设计被定义位系统或组件的体系结构、组件、接口和其他特征的过程，以及改过程的结果。软件设计过程是软件工程生命周期活动，在该活动中，软件需求被分析，以产生对软件内部结构及其行为的描述，这些描述将作为软件构建的基础。   Software Construction：软件构建。软件构建是知通过详细设计、编码、单元测试、集成测试、调试和验证相结合，对工作软件进行详细创建。   Software Testing：软件测试。测试是对产品质量进行评估并通过识别缺陷来改进产品质量的活动。软件测试涉及到在一组有限的测试用例上根据预期行为动态地验证程序的行为。这些测试用例是从(通常非常大的)执行域中选择的。   Software Maintenance：软件维护。软件维护包括增强现有的功能，使软件适应新的和修改的操作环境，以及纠正缺陷。这些类别被称为完善的、自适应的和纠正的软件维护。   Software Configuration Management：软件配置管理。系统的配置是硬件、固件、软件或它们的组合的功能和/或物理特征。它还可以看作是硬件、固件或软件项目的特定版本的集合，这些版本根据特定的构建过程组合在一起，以服务于特定的目的。因此，软件配置管理(SCM)是在不同的时间点识别系统配置的规程，以便系统地控制配置的更改，并在整个软件生命周期中维护配置的完整性和可追溯性。   Software Engineering Management：软件工程管理。软件工程管理包括计划、协调、测量、报告和控制一个项目或程序，以确保软件的开发和维护是系统的、有纪律的和量化的。   Software Engineering Process：软件工程过程。涉及软件生命周期过程的定义、实现、评估、度量、管理和改进。所涵盖的主题包括过程实现和变更(过程基础结构、过程实现和变更的模型以及软件过程管理);过程定义(软件生命周期模型和过程，过程定义、过程适应和过程自动化的符号);过程评估模型和方法;测量(过程测量、产品测量、测量技术、测量结果质量);以及软件过程工具。   Software Engineering Models and Methods：软件工程模型和方法。软件工程模型和方法解决了包含多个生命周期阶段的方法。所涵盖的主题包括建模(软件工程模型的原理和属性;语法、语义、不变量;(前置条件、后置条件和不变量);模型的类型(信息、结构和行为模型);分析(对正确性、完整性、一致性、质量和交互进行分析;可追溯性;和权衡分析);以及软件开发方法(启发式方法、正式方法、原型方法和敏捷方法)。   Software Quality：软件质量。软件质量是一个普遍存在的软件生命周期问题，包括软件质量的基础(软件工程文化、软件质量特征、软件质量的价值和成本、软件质量改进);软件质量管理过程(软件质量保证、验证和验证、评审和审计);以及实际的考虑(缺陷特性、软件质量度量和软件质量工具)。   Software Engineering Professional Practice：软件工程专业实践。软件工程专业实践是指软件工程师必须具备的知识、技能和态度，以一种专业、负责和道德的方式来实践软件工程。它涵盖专业(专业行为、专业协会、软件工程标准、雇佣合同、法律问题)、伦理准则、团队动态(在团队中工作，认知问题的复杂性，与利益相关者的互动，处理不确定性和模糊性，处理多元文化环境)和沟通能力。   Software Engineering Economics：软件工程经济学。软件工程经济学关注于在业务上下文中做出决策，以使技术决策与组织的业务目标保持一致。所涵盖的主题包括软件工程经济学的基本原理(建议、现金流量、金钱的时间价值、规划期限、通货膨胀、折旧、重置和退休决定);非营利性决策(成本效益分析、优化分析);评估、经济风险和不确定性(评估技术、风险和不确定性下的决策);以及多属性决策(值和度量尺度、补偿和非补偿技术)。   Computing Foundations：计算基础。计算基础涵盖了为软件工程实践提供必要的计算背景的基本主题。主题包括问题解决技术、抽象、算法和复杂性、编程基础、并行和分布式计算的基础、计算机组织、操作系统和网络通信。   Mathematical Foundations：数学基础。数学基础涵盖了为软件工程实践提供必要数学背景的基本主题。主题包括集合、关系和函数;基本命题逻辑和谓词逻辑;证明技术;图表和树木;离散型概率;语法和有限状态机;和数论。   Engineering Foundations：工程基础。工程基础涵盖了为软件工程实践提供必要的工程背景的基本主题。所涵盖的主题包括实证方法和实验技术;统计分析;测量和度量;工程设计;仿真和建模;以及根本原因分析。   5. 简单解释 CMMI 的五个级别。例如：Level 1 - Initial：无序，自发生产模式。      Level 1 - Initial 企业对项目的目标与要做的努力很清晰，项目的目标得以实现。但是由于任务的完成带有很大的偶然性，企业无法保证在实施同类项目的时候仍然能够完成任务。企业在一级上的项目实施对实施人员有很大的依赖性。   Level 2 - Managed 企业在项目实施上能够遵守既定的计划与流程，有资源准备，权责到人，对相关的项目实施人员有相应的培训，对整个流程有监测与控制，并与上级单位对项目与流程进行审查。   Level 3 - Deined 企业不仅能够对项目的实施有一整套的管理措施，并保障项目的完成；而且，企业能够根据自身的特殊情况以及自己的标准流程，将这套管理体系与流程予以制度化这样，企业不仅能够在同类的项目上生到成功的实施，在不同类的项目上一样能够得到成功的实施。科学的管理成为企业的一种文化，企业的组织财富。   Level 4 - Quantiatively Managed 在量化管理级水平上，企业的项目管理不仅形成了一种制度，而且要实现数字化的管理。对管理流程要做到量化与数字化。通过量化技术来实现流程的稳定性，实现管理的精度，降低项目实施在质量上的波动。   Level 5 - Optimizing 在优化级水平上，企业的项目管理达到了最高的境界。企业不仅能够通过信息手段与数字化手段来实现对项目的管理，而且能够充分利用信息资料，对企业在项目实施的过程中可能出现的次品予以预防。能够主动地改善流程，运用新技术，实现流程的优化。   6. 用自己语言简述 SWEBok 或 CMMI （约200字）   能力成熟度模型集成(Capability Maturity Model Integration, CMMI)是CMM模型的最新版本，是应用于软件业项目的管理方法，SEI在部分国家和地区开始推广和试用。CMMI用阶段式的表现方法将过程区域分成了5个成熟度级别，帮助实施CMMI的组织建议一条比较容易实现的过程改进发展道路。CMMI为改进一个组织的各种过程提供了一个单一的集成化框架，新的集成模型框架消除了各个模型的不一致性，减少了模型间的重复，增加透明度和理解，建立了一个自动的、可扩展的框架。因而能够从总体上改进组织的质量和效率。CMMI主要关注点就是成本效益、明确重点、过程集中和灵活性四个方面。                  Software engineering &#8617;                  Software crisis &#8617;           ","categories": [],
        "tags": [],
        "url": "http://localhost:4000/swsad/%E8%BD%AF%E4%BB%B6%E7%9A%84%E6%9C%AC%E8%B4%A8%E4%B8%8E%E8%BD%AF%E4%BB%B6%E5%B7%A5%E7%A8%8B%E7%A7%91%E5%AD%A6/page/",
        "teaser":null},{
        "title": "Page",
        "excerpt":"1、简答题      用简短的语言给出对分析、设计的理解。            分析：在研究程序或需求的过程中，把事务、概念分解成较简单的组成部分，分别加以考察，找出各自的本质属性和彼此间的联系       设计：指预先描绘出工作结果的样式、结构及形貌。           用一句话描述面向对象的分析与设计的优势。            面向对象的分析利用面向对象的信息建模概念，将对象作为程序的基本单元，将程序和数据封装其中，提高软件的重用性、灵活性和扩展性           简述 UML（统一建模语言）的作用。考试考哪些图？            UML是一种开放的方法，用于说明、可视化、构建和编写一个正在开发的、面向对象的、软件密集系统的制品的开放方法。       Structure diagrams（结构图）、Behavior diagrams（行为图）、Interaction diagrams（交互图）           从软件本质的角度，解释软件范围（需求）控制的可行性            虽然软件本身的复杂性、不可见性、不一致性、可变性，在软件开发的过程，软件开发者围绕客户目标，发现并满足客户感兴趣的内容，实现软件最具创造价值的功能，因此软件范围控制是可行的。           2、项目管理实践           看板使用练习（提交看板执行结果贴图，建议使用 Git project）              使用截图工具（png格式输出），展现你团队的任务 Kanban       每个人的任务是明确的。必须一周后可以看到具体结果       每个人的任务是1-2项       至少包含一个团队活动任务                       UML绘图工具练习（提交贴图，必须使用 UMLet）              请在 参考书2 或 教材 中选择一个类图（给出参考书页码图号）              From 《UML和模式应用》P193 图16-16   ","categories": [],
        "tags": [],
        "url": "http://localhost:4000/swsad/%E8%BD%AF%E4%BB%B6%E9%A1%B9%E7%9B%AE%E4%B8%8E%E7%9F%A5%E8%AF%86%E5%9B%A2%E9%98%9F%E7%AE%A1%E7%90%86%E5%9F%BA%E7%A1%80/page/",
        "teaser":null},{
        "title": "Page",
        "excerpt":"1、简单题           简述瀑布模型、增量模型、螺旋模型（含原型方法）的优缺点              从项目特点、风险特征、人力资源利用角度思考           瀑布模型：              优点：定义了软件开发基本流程和活动；为项目提供了按阶段划分的检查点；当前一阶段完成后，只需要去关注后续阶段。它提供了一个模板，这个模板使得分析、设计、编码、测试和支持的方法可以在该模板下有一个共同的指导。       缺点：各个阶段的划分固定；很难给出清晰的需求，对后期工作也造成阻碍；不同阶段所需要的知识技术不同，对人员要求不同，产生资源配置的问题。           增量模型：              优点：人员分配灵活；可以分批次提交软件产品，使用户及时的了解项目的进程；可以灵活的调节组件的开发顺序、优先级       缺点：要求待开发的软件系统可以被模块化；如果增量之间存在相交的情况且未能很好处理，则必须做全盘系统分析。           螺旋模型：             优点：设计上更加灵活，可以在项目的各个阶段进行变更；客户始终参与每个阶段的开发，保证了项目不偏离正确的方向以及项目的可控性；在每个迭代阶段植入软件测试，使每个阶段的质量得到保证。       缺点：迭代次数难以控制，可能超出预算或工期；周期过长导致软件技术发展与当前的差距，无法满足市场需求。           简述统一过程三大特点，与面向对象的方法有什么关系？            三大特点：                    用例驱动(use case driven)：从用户角度表达，既能被开发人员看懂也能被客户看懂           以体系结构为核心(architecture centric)：软件体系结构提供了所有其他发展演变的中心点，提供系统的”大局”，为发展提供组织框架           迭代及增量(iterative and evolutionary)：迭代和增量方法允许开发以不完整、不完美的知识开始，并且迭代和增量会逐步趋向稳定，能有效的管理需求变化。                           简述统一过程四个阶段的划分准则是什么？每个阶段关键的里程碑是什么？            划分准则是在每个阶段的结尾执行一次评估以确定这个阶段的目标是否已经满足。如果评估结果令人满意的话，可以允许项目进入下一个阶段。       四大阶段：                    初始阶段：生命周期目标(Lifecycle Objective)里程碑，评价项目基本的生存能力。           细化阶段：生命周期结构(LifecycleArchitecture)里程碑，为系统的结构建立了管理基准并使项目小组能够在构建阶段中进行衡量。此刻，要检验详细的系统目标和范围、结构的选择以及主要风险的解决方案。           构造阶段：初始功能(Initial Operational)里程碑，决定了产品是否可以在测试环境中进行部署。此刻，要确定软件、环境、用户是否可以开始系统的运作。           交付阶段：产品发布(Product Release)里程碑，确定目标是否实现，是否应该开始另一个开发周期。                           软件企业为什么能按固定节奏生产、固定周期发布软件产品？它给企业项目管理带来哪些好处？            因为根据统一过程模型，各个阶段的生命周期是固定的，在软件开发的过程中有健胃明确的时间限制。这种生命周期方法为发布软件产品提供了依据。因此，软件企业能够按照固定的节奏生产、固定周期发布软件产品。       它可以让企业更加高效的把控软件开发的进度和预算，更加灵活的调配人力物力资源，提高效益           ","categories": [],
        "tags": [],
        "url": "http://localhost:4000/swsad/%E8%BD%AF%E4%BB%B6%E9%A1%B9%E7%9B%AE%E8%BF%87%E7%A8%8B%E6%A8%A1%E5%9E%8B%E4%B8%8E%E8%A7%84%E5%88%92/page/",
        "teaser":null},{
        "title": "Page",
        "excerpt":"   1、使用类图，分别对 Asg_RH 文档中 Make Reservation 用例以及 Payment 用例开展领域建模。然后，根据上述模型，给出建议的数据表以及主要字段，特别是主键和外键            注意事项：                    对象必须是名词、特别是技术名词、报表、描述类的处理；           关联必须有多重性、部分有名称与导航方向           属性要注意计算字段                       数据建模，为了简化描述仅需要给出表清单，例如：                    Hotel（ID/Key，Name，LoctionID/Fkey，Address…..）                           邻域建模：         数据建模：            Hotel(name,star,addr,loc id,brief intro,favorite,price,rating,max-discount-off)       Room(type,date,isAvailable,reserved,price,reserved num,total num)       Reservation(check in date,check out date,number of nights)       traveler(name,email)       Payment (ID/PrimeryKey, ReservationID/ForeignKey, Date, Time, Total)       CreditCard (ID/PrimeryKey, TravelerID/ForeignKey, PaymentID/ForeignKey, Number, SecurityCode, ExpiryDate)           对payment用例开张领域建模         2、使用 UML State Model，对每个订单对象生命周期建模            建模对象： 参考 Asg_RH 文档， 对 Reservation/Order 对象建模。       建模要求： 参考练习不能提供足够信息帮助你对订单对象建模，请参考现在 定旅馆 的旅游网站，尽可能分析围绕订单发生的各种情况，直到订单通过销售事件（柜台销售）结束订单。              ","categories": [],
        "tags": [],
        "url": "http://localhost:4000/swsad/%E9%A2%86%E5%9F%9F%E5%BB%BA%E6%A8%A1-%E6%A6%82%E5%BF%B5%E4%B8%8E%E6%95%B0%E6%8D%AE%E5%BB%BA%E6%A8%A1/page/",
        "teaser":null}]
