import { ContentData } from './types';

export const DATA: ContentData = {
  timeline: [
    {
      year: "1950",
      title_en: "Turing Test",
      title_cn: "图灵测试",
      description_en: "Alan Turing proposes the 'Imitation Game' to test machine intelligence.",
      description_cn: "艾伦·图灵提出“模仿游戏”来测试机器智能。"
    },
    {
      year: "1956",
      title_en: "Dartmouth Workshop",
      title_cn: "达特茅斯会议",
      description_en: "The birth of AI as a field. The term 'Artificial Intelligence' is coined.",
      description_cn: "人工智能作为一门学科诞生。“人工智能”一词被创造出来。"
    },
    {
      year: "1966",
      title_en: "ELIZA",
      title_cn: "ELIZA",
      description_en: "The first chatbot, simulating a psychotherapist.",
      description_cn: "第一个聊天机器人，模拟心理治疗师。"
    },
    {
      year: "1986",
      title_en: "Backpropagation",
      title_cn: "反向传播",
      description_en: "Hinton et al. popularize backpropagation, enabling multi-layer neural networks.",
      description_cn: "Hinton等人普及了反向传播算法，使多层神经网络成为可能。"
    },
    {
      year: "1997",
      title_en: "Deep Blue",
      title_cn: "深蓝",
      description_en: "IBM's Deep Blue defeats world chess champion Garry Kasparov.",
      description_cn: "IBM的深蓝击败了世界国际象棋冠军加里·卡斯帕罗夫。"
    },
    {
      year: "2012",
      title_en: "AlexNet",
      title_cn: "AlexNet",
      description_en: "A deep CNN wins ImageNet, sparking the modern Deep Learning boom.",
      description_cn: "深度卷积神经网络赢得ImageNet竞赛，引发了现代深度学习热潮。"
    },
    {
      year: "2016",
      title_en: "AlphaGo",
      title_cn: "AlphaGo",
      description_en: "Google's AlphaGo defeats Lee Sedol in the game of Go.",
      description_cn: "谷歌的AlphaGo在围棋比赛中击败李世石。"
    },
    {
      year: "2017",
      title_en: "Transformer",
      title_cn: "Transformer架构",
      description_en: "Google introduces the Transformer architecture ('Attention Is All You Need').",
      description_cn: "谷歌推出Transformer架构（论文《Attention Is All You Need》）。"
    },
    {
      year: "2020",
      title_en: "GPT-3",
      title_cn: "GPT-3",
      description_en: "OpenAI releases GPT-3, demonstrating few-shot learning capabilities.",
      description_cn: "OpenAI发布GPT-3，展示了少样本学习能力。"
    },
    {
      year: "2022",
      title_en: "ChatGPT & Diffusion",
      title_cn: "ChatGPT 与 扩散模型",
      description_en: "Generative AI goes mainstream with ChatGPT and Stable Diffusion.",
      description_cn: "生成式AI通过ChatGPT和Stable Diffusion进入主流视野。"
    },
    {
      year: "2024",
      title_en: "Multimodal Gemini",
      title_cn: "多模态 Gemini",
      description_en: "Models aiming for native multimodal understanding across text, audio, and video.",
      description_cn: "旨在实现跨文本、音频和视频的原生多模态理解的模型。"
    }
  ],
  acronyms: [
    { abbr: "AI", full: "Artificial Intelligence", meaning_en: "Simulation of human intelligence by machines.", meaning_cn: "机器对人类智能的模拟。" },
    { abbr: "ML", full: "Machine Learning", meaning_en: "Algorithms that improve through experience.", meaning_cn: "通过经验改进的算法。" },
    { abbr: "DL", full: "Deep Learning", meaning_en: "ML using multi-layered neural networks.", meaning_cn: "使用多层神经网络的机器学习。" },
    { abbr: "NLP", full: "Natural Language Processing", meaning_en: "Interaction between computers and human language.", meaning_cn: "计算机与人类语言之间的交互。" },
    { abbr: "LLM", full: "Large Language Model", meaning_en: "Deep learning algorithms that recognize, summarize, translate, predict and generate text.", meaning_cn: "能够识别、总结、翻译、预测和生成文本的深度学习算法。" },
    { abbr: "GPT", full: "Generative Pre-trained Transformer", meaning_en: "A type of LLM developed by OpenAI.", meaning_cn: "OpenAI开发的一种大型语言模型。" },
    { abbr: "CNN", full: "Convolutional Neural Network", meaning_en: "Network architecture mainly used for image processing.", meaning_cn: "主要用于图像处理的网络架构。" },
    { abbr: "RNN", full: "Recurrent Neural Network", meaning_en: "Network aimed at processing sequential data.", meaning_cn: "旨在处理序列数据的网络。" },
    { abbr: "GAN", full: "Generative Adversarial Network", meaning_en: "Two neural networks contesting with each other to create new data.", meaning_cn: "两个神经网络相互对抗以生成新数据。" },
    { abbr: "RL", full: "Reinforcement Learning", meaning_en: "Learning by trial and error using rewards/punishments.", meaning_cn: "利用奖惩机制通过试错进行学习。" },
    { abbr: "RLHF", full: "Reinforcement Learning from Human Feedback", meaning_en: "Training AI with human guidance to align values.", meaning_cn: "通过人类反馈训练AI以对齐价值观。" },
    { abbr: "AGI", full: "Artificial General Intelligence", meaning_en: "Hypothetical AI matching human intellect across all tasks.", meaning_cn: "假设中在所有任务上匹敌人类智慧的AI。" },
    { abbr: "ASI", full: "Artificial Super Intelligence", meaning_en: "AI surpassing human intellect.", meaning_cn: "超越人类智慧的AI。" },
    { abbr: "CV", full: "Computer Vision", meaning_en: "Enabling computers to 'see' and interpret images.", meaning_cn: "使计算机能够“看”并解释图像。" },
    { abbr: "SGD", full: "Stochastic Gradient Descent", meaning_en: "Optimization algorithm for training neural networks.", meaning_cn: "用于训练神经网络的优化算法。" },
    { abbr: "ReLU", full: "Rectified Linear Unit", meaning_en: "A common activation function.", meaning_cn: "一种常见的激活函数。" },
    { abbr: "SVM", full: "Support Vector Machine", meaning_en: "Supervised learning model for classification.", meaning_cn: "用于分类的监督学习模型。" },
    { abbr: "KNN", full: "K-Nearest Neighbors", meaning_en: "Simple algorithm for classification based on proximity.", meaning_cn: "基于邻近度的简单分类算法。" },
    { abbr: "LSTM", full: "Long Short-Term Memory", meaning_en: "A type of RNN capable of learning long-term dependencies.", meaning_cn: "一种能够学习长期依赖关系的RNN。" },
    { abbr: "BERT", full: "Bidirectional Encoder Representations from Transformers", meaning_en: "Transformer-based technique for NLP pre-training.", meaning_cn: "基于Transformer的NLP预训练技术。" },
    { abbr: "MoE", full: "Mixture of Experts", meaning_en: "Architecture using multiple specialized sub-models.", meaning_cn: "使用多个专用子模型的架构。" }
  ],
  concepts: [
    {
      id: "nn",
      title_en: "Neural Network",
      title_cn: "神经网络",
      description_en: "A series of algorithms that endeavor to recognize underlying relationships in a set of data through a process that mimics the way the human brain operates.",
      description_cn: "一系列模仿人脑运作方式的算法，试图通过该过程识别数据集中潜在关系。",
      type: "neural-net"
    },
    {
      id: "gradient",
      title_en: "Gradient Descent",
      title_cn: "梯度下降",
      description_en: "An optimization algorithm used to minimize some function by iteratively moving in the direction of steepest descent.",
      description_cn: "一种优化算法，通过迭代地向最陡下降方向移动来最小化某个函数。",
      type: "gradient"
    },
    {
      id: "diffusion",
      title_en: "Diffusion Model",
      title_cn: "扩散模型",
      description_en: "Generative models that destroy training data by adding noise and then learn to recover the data by reversing this process.",
      description_cn: "一种生成模型，通过添加噪声破坏训练数据，然后学习通过逆转此过程来恢复数据。",
      type: "diffusion"
    },
    {
      id: "attention",
      title_en: "Attention Mechanism",
      title_cn: "注意力机制",
      description_en: "A technique that mimics cognitive attention, allowing models to focus on specific parts of input data while processing.",
      description_cn: "一种模仿认知注意力的技术，允许模型在处理时关注输入数据的特定部分。",
      type: "attention"
    },
    {
      id: "activation",
      title_en: "Activation Function",
      title_cn: "激活函数",
      description_en: "Mathematical equations that determine the output of a neural network model, introducing non-linearity.",
      description_cn: "决定神经网络模型输出的数学方程，引入了非线性。",
      type: "generic"
    },
    {
      id: "overfitting",
      title_en: "Overfitting",
      title_cn: "过拟合",
      description_en: "When a model learns the detail and noise in the training data to the extent that it negatively impacts the performance on new data.",
      description_cn: "当模型过度学习训练数据中的细节和噪声，以至于负面影响了在某些新数据上的表现。",
      type: "generic"
    },
    {
      id: "embeddings",
      title_en: "Embeddings",
      title_cn: "嵌入",
      description_en: "Representing words or data as vectors in a continuous vector space where similar items are closer together.",
      description_cn: "在连续向量空间中将词或数据表示为向量，其中相似的项目彼此更接近。",
      type: "generic"
    },
    {
      id: "loss_function",
      title_en: "Loss Function",
      title_cn: "损失函数",
      description_en: "A method of evaluating how well your algorithm models your dataset.",
      description_cn: "一种评估算法对数据集建模效果的方法。",
      type: "generic"
    }
  ]
};