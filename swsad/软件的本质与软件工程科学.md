#### 1.软件工程的定义

**Software engineering is**:

1. the application of a systematic, disciplined, quantifiable approach to the develpment, operation, and maintenace of software, that is, the application of engineering to software
2. the study of approaches in (1)[^1]



#### 2. 解释导致 software crisis 本质原因、表现，述说克服软件危机的方法

##### 本质原因： 

The software crisis was due to the rapid increases in computer power and the complexity of the problems that could not be tackled. With the increase in the complexity of the software, many software problems arose because existing methods were in sufficient.

##### 表现： 

- Project running over-budget
- Project running over-time
- Software was very inefficient
- Software was of low quality
- Softwaree often did not meet requirements
- Projects were unmanageable and code difficult to maintain
- Software was never delivered

[^2]



##### 克服方法:

Build the methods and knowledge system of software preduciton, systematic and up-to-date software engineering methods are also needed to avoid software crisis.

#### 3. 软件生命周期

A software development life cycle is the process of dividing software development work into disinct phases to improve design, product management, and project management. Most modern develpment processes ca be vaguely described as agile. Other methodologies include waterfall, prototyping, iterative and incremental development, spiral development, rapid application development, and extreme programming.

#### 4. SWEBoK 的 15 个知识域（[An Overview of the SWEBOK Guide](https://www.sebokwiki.org/wiki/An_Overview_of_the_SWEBOK_Guide) 请中文翻译其名称与简短说明）

[v3](https://www.sebokwiki.org/wiki/An_Overview_of_the_SWEBOK_Guide)

1. Software Requirements：软件需求。软件需求涉及到引出、协商、分析、规范和验证，软件需求表达了对软件产品的需求和约束，这些需求和约束有助于解决一些实际问题。
2. Software Design：软件设计。软件设计被定义位系统或组件的体系结构、组件、接口和其他特征的过程，以及改过程的结果。软件设计过程是软件工程生命周期活动，在该活动中，软件需求被分析，以产生对软件内部结构及其行为的描述，这些描述将作为软件构建的基础。
3. Software Construction：软件构建。软件构建是知通过详细设计、编码、单元测试、集成测试、调试和验证相结合，对工作软件进行详细创建。
4. Software Testing：软件测试。测试是对产品质量进行评估并通过识别缺陷来改进产品质量的活动。软件测试涉及到在一组有限的测试用例上根据预期行为动态地验证程序的行为。这些测试用例是从(通常非常大的)执行域中选择的。
5. Software Maintenance：软件维护。软件维护包括增强现有的功能，使软件适应新的和修改的操作环境，以及纠正缺陷。这些类别被称为完善的、自适应的和纠正的软件维护。
6. Software Configuration Management：软件配置管理。系统的配置是硬件、固件、软件或它们的组合的功能和/或物理特征。它还可以看作是硬件、固件或软件项目的特定版本的集合，这些版本根据特定的构建过程组合在一起，以服务于特定的目的。因此，软件配置管理(SCM)是在不同的时间点识别系统配置的规程，以便系统地控制配置的更改，并在整个软件生命周期中维护配置的完整性和可追溯性。
7. Software Engineering Management：软件工程管理。软件工程管理包括计划、协调、测量、报告和控制一个项目或程序，以确保软件的开发和维护是系统的、有纪律的和量化的。
8. Software Engineering Process：软件工程过程。涉及软件生命周期过程的定义、实现、评估、度量、管理和改进。所涵盖的主题包括过程实现和变更(过程基础结构、过程实现和变更的模型以及软件过程管理);过程定义(软件生命周期模型和过程，过程定义、过程适应和过程自动化的符号);过程评估模型和方法;测量(过程测量、产品测量、测量技术、测量结果质量);以及软件过程工具。
9. Software Engineering Models and Methods：软件工程模型和方法。软件工程模型和方法解决了包含多个生命周期阶段的方法。所涵盖的主题包括建模(软件工程模型的原理和属性;语法、语义、不变量;(前置条件、后置条件和不变量);模型的类型(信息、结构和行为模型);分析(对正确性、完整性、一致性、质量和交互进行分析;可追溯性;和权衡分析);以及软件开发方法(启发式方法、正式方法、原型方法和敏捷方法)。
10. Software Quality：软件质量。软件质量是一个普遍存在的软件生命周期问题，包括软件质量的基础(软件工程文化、软件质量特征、软件质量的价值和成本、软件质量改进);软件质量管理过程(软件质量保证、验证和验证、评审和审计);以及实际的考虑(缺陷特性、软件质量度量和软件质量工具)。
11. Software Engineering Professional Practice：软件工程专业实践。软件工程专业实践是指软件工程师必须具备的知识、技能和态度，以一种专业、负责和道德的方式来实践软件工程。它涵盖专业(专业行为、专业协会、软件工程标准、雇佣合同、法律问题)、伦理准则、团队动态(在团队中工作，认知问题的复杂性，与利益相关者的互动，处理不确定性和模糊性，处理多元文化环境)和沟通能力。
12. Software Engineering Economics：软件工程经济学。软件工程经济学关注于在业务上下文中做出决策，以使技术决策与组织的业务目标保持一致。所涵盖的主题包括软件工程经济学的基本原理(建议、现金流量、金钱的时间价值、规划期限、通货膨胀、折旧、重置和退休决定);非营利性决策(成本效益分析、优化分析);评估、经济风险和不确定性(评估技术、风险和不确定性下的决策);以及多属性决策(值和度量尺度、补偿和非补偿技术)。
13. Computing Foundations：计算基础。计算基础涵盖了为软件工程实践提供必要的计算背景的基本主题。主题包括问题解决技术、抽象、算法和复杂性、编程基础、并行和分布式计算的基础、计算机组织、操作系统和网络通信。
14. Mathematical Foundations：数学基础。数学基础涵盖了为软件工程实践提供必要数学背景的基本主题。主题包括集合、关系和函数;基本命题逻辑和谓词逻辑;证明技术;图表和树木;离散型概率;语法和有限状态机;和数论。
15. Engineering Foundations：工程基础。工程基础涵盖了为软件工程实践提供必要的工程背景的基本主题。所涵盖的主题包括实证方法和实验技术;统计分析;测量和度量;工程设计;仿真和建模;以及根本原因分析。

#### 5. 简单解释 CMMI 的五个级别。例如：Level 1 - Initial：无序，自发生产模式。

- Level 1 - Initial 企业对项目的目标与要做的努力很清晰，项目的目标得以实现。但是由于任务的完成带有很大的偶然性，企业无法保证在实施同类项目的时候仍然能够完成任务。企业在一级上的项目实施对实施人员有很大的依赖性。
- Level 2 - Managed 企业在项目实施上能够遵守既定的计划与流程，有资源准备，权责到人，对相关的项目实施人员有相应的培训，对整个流程有监测与控制，并与上级单位对项目与流程进行审查。
- Level 3 - Deined 企业不仅能够对项目的实施有一整套的管理措施，并保障项目的完成；而且，企业能够根据自身的特殊情况以及自己的标准流程，将这套管理体系与流程予以制度化这样，企业不仅能够在同类的项目上生到成功的实施，在不同类的项目上一样能够得到成功的实施。科学的管理成为企业的一种文化，企业的组织财富。
- Level 4 - Quantiatively Managed 在量化管理级水平上，企业的项目管理不仅形成了一种制度，而且要实现数字化的管理。对管理流程要做到量化与数字化。通过量化技术来实现流程的稳定性，实现管理的精度，降低项目实施在质量上的波动。
- Level 5 - Optimizing 在优化级水平上，企业的项目管理达到了最高的境界。企业不仅能够通过信息手段与数字化手段来实现对项目的管理，而且能够充分利用信息资料，对企业在项目实施的过程中可能出现的次品予以预防。能够主动地改善流程，运用新技术，实现流程的优化。

#### 6. 用自己语言简述 SWEBok 或 CMMI （约200字）

能力成熟度模型集成(Capability Maturity Model Integration, CMMI)是CMM模型的最新版本，是应用于软件业项目的管理方法，SEI在部分国家和地区开始推广和试用。CMMI用阶段式的表现方法将过程区域分成了5个成熟度级别，帮助实施CMMI的组织建议一条比较容易实现的过程改进发展道路。**CMMI**为改进一个组织的各种过程提供了一个单一的集成化框架，新的集成模型框架消除了各个模型的不一致性，减少了模型间的重复，增加透明度和理解，建立了一个自动的、可扩展的框架。因而能够从总体上改进组织的质量和效率。**CMMI**主要关注点就是成本效益、明确重点、过程集中和灵活性四个方面。

[^1]: [Software engineering](https://en.wikipedia.org/wiki/Software_engineering#cite_note-BoDu04-1)
[^2]:[Software crisis](https://en.wikipedia.org/wiki/Software_crisis)



