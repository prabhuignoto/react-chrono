import { TimelineItemModel } from '@models/TimelineItemModel';

export const technologyEvolutionTimeline: TimelineItemModel[] = [
  {
    title: '1971',
    url: 'https://en.wikipedia.org/wiki/Intel_4004',
    cardTitle: 'The First Microprocessor',
    cardSubtitle: 'Intel 4004 - The Birth of Modern Computing',
    // media: {
    //   type: 'IMAGE',
    //   source: {
    //     url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Intel_C4004.jpg/800px-Intel_C4004.jpg',
    //   },
    //   name: 'Intel 4004 Microprocessor',
    // },
    cardDetailedText: [
      'The Intel 4004 was the first commercially available microprocessor, marking the beginning of the personal computer revolution. Designed by Federico Faggin, Ted Hoff, and Stanley Mazor at Intel, this 4-bit processor contained 2,300 transistors and operated at a clock speed of 740 kHz.',
      'Originally developed for Busicom calculator company, the 4004 was revolutionary because it put the central processing unit (CPU) of a computer onto a single integrated circuit chip. This miniaturization made it possible to create smaller, more affordable computers.',
      'The 4004 could execute 60,000 operations per second and had a 4-bit data bus with a 12-bit address bus, allowing it to address 4,096 4-bit memory locations. Despite its limitations by today\'s standards, it laid the foundation for all modern processors.',
      'This breakthrough opened the door for personal computers, embedded systems, and the digital revolution that would transform every aspect of human life over the following decades.',
    ],
    items: [
      {
        cardTitle: 'Technical Specifications',
        cardDetailedText: 'Clock Speed: 740 kHz, Transistors: 2,300, Process: 10 μm, Architecture: 4-bit',
      },
      {
        cardTitle: 'Key Innovation',
        cardDetailedText: 'First CPU on a single chip, enabling miniaturization of computing devices',
      },
      {
        cardTitle: 'Market Impact',
        cardDetailedText: 'Launched the microprocessor industry, leading to $500+ billion semiconductor market',
      },
    ],
  },
  {
    title: '1973',
    url: 'https://en.wikipedia.org/wiki/Ethernet',
    cardTitle: 'Ethernet Networking',
    cardSubtitle: 'Robert Metcalfe Invents Ethernet at Xerox PARC',
    // media: {
    //   type: 'IMAGE',
    //   source: {
    //     url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Ethernet_RJ45_connector_p1160054.jpg/800px-Ethernet_RJ45_connector_p1160054.jpg',
    //   },
    //   name: 'Ethernet Cable Connector',
    // },
    cardDetailedText: [
      'Robert Metcalfe invented Ethernet while working at Xerox Palo Alto Research Center (PARC), creating the foundation for modern computer networking. The original Ethernet operated at 2.94 Mbps and used coaxial cables to connect computers in a local area network.',
      'Ethernet was inspired by ALOHAnet, a radio-based networking system used in Hawaii. Metcalfe improved upon this concept by using collision detection and exponential backoff algorithms to manage network traffic more efficiently.',
      'The first Ethernet network connected over 100 computers at Xerox PARC, demonstrating the viability of packet-switched networking for office environments. This technology enabled file sharing, email, and distributed computing across multiple machines.',
      'Ethernet became the dominant LAN technology and evolved to support speeds from 10 Mbps to 400 Gbps today. It remains the backbone of internet infrastructure and corporate networks worldwide.',
    ],
  },
  {
    title: '1981',
    url: 'https://en.wikipedia.org/wiki/IBM_Personal_Computer',
    cardTitle: 'IBM Personal Computer',
    cardSubtitle: 'IBM PC Standardizes Personal Computing Architecture',
    // media: {
    //   type: 'IMAGE',
    //   source: {
    //     url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IBM_PC_5150.jpg/800px-IBM_PC_5150.jpg',
    //   },
    //   name: 'IBM PC 5150',
    // },
    cardDetailedText: [
      'The IBM Personal Computer (model 5150) established the standard architecture that dominated personal computing for decades. Unlike previous proprietary systems, IBM chose to use off-the-shelf components and publish technical specifications, creating an open platform.',
      'The IBM PC featured an Intel 8088 processor running at 4.77 MHz, 16-64 KB of RAM (expandable to 256 KB), and optional 5.25-inch floppy disk drives. It ran PC DOS (developed by Microsoft) and supported a wide range of expansion cards through its ISA bus slots.',
      'IBM\'s decision to use an open architecture inadvertently created the "PC clone" market, as other manufacturers could build compatible systems. This competition drove down prices and accelerated innovation, making personal computers accessible to businesses and consumers.',
      'The IBM PC\'s success established the x86 instruction set, ISA bus architecture, and DOS operating system as industry standards. This compatibility ecosystem enabled a thriving software industry and made the IBM PC the foundation of modern Windows-based computing.',
    ],
  },
  {
    title: '1989',
    url: 'https://en.wikipedia.org/wiki/World_Wide_Web',
    cardTitle: 'World Wide Web',
    cardSubtitle: 'Tim Berners-Lee Creates the Web at CERN',
    // media: {
    //   type: 'IMAGE',
    //   source: {
    //     url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/First_Web_Server.jpg/800px-First_Web_Server.jpg',
    //   },
    //   name: 'First Web Server at CERN',
    // },
    cardDetailedText: [
      'Tim Berners-Lee invented the World Wide Web while working at CERN, the European physics research laboratory. His vision was to create a universal information space where documents could be linked together through hypertext, making information easily accessible to researchers worldwide.',
      'The original Web consisted of three fundamental technologies: HTML (HyperText Markup Language) for creating web pages, HTTP (HyperText Transfer Protocol) for transferring data between servers and browsers, and URLs (Uniform Resource Locators) for addressing web resources.',
      'Berners-Lee created the first web browser (called WorldWideWeb, later renamed Nexus), the first web server software, and the first website (info.cern.ch). He made the crucial decision to make the Web free and open, refusing to patent his invention.',
      'By 1991, the Web was made available to the public, and by the mid-1990s, it had transformed from a tool for scientists to a global platform for commerce, communication, and entertainment. Today, over 4.6 billion people use the Web daily.',
    ],
    items: [
      {
        cardTitle: 'First Website',
        cardDetailedText: 'info.cern.ch - explained what the Web was and how to use it',
        url: 'http://info.cern.ch/hypertext/WWW/TheProject.html',
      },
      {
        cardTitle: 'Core Technologies',
        cardDetailedText: 'HTML, HTTP, URLs - still the foundation of the Web today',
      },
    ],
  },
  {
    title: '1995',
    url: 'https://en.wikipedia.org/wiki/JavaScript',
    cardTitle: 'JavaScript Programming Language',
    cardSubtitle: 'Brendan Eich Creates JavaScript in 10 Days',
    // media: {
    //   type: 'IMAGE',
    //   source: {
    //     url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png',
    //   },
    //   name: 'JavaScript Logo',
    // },
    cardDetailedText: [
      'Brendan Eich created JavaScript in just 10 days while working at Netscape Communications. Originally called "Mocha" and later "LiveScript," it was renamed JavaScript to capitalize on Java\'s popularity, despite having little in common with that language.',
      'JavaScript was designed to make web pages interactive and dynamic. Unlike server-side languages, JavaScript runs in the browser, allowing developers to respond to user actions, manipulate web page content, and create rich user interfaces without server round-trips.',
      'Despite its rushed creation, JavaScript became the lingua franca of web development. Its flexible, prototype-based object model and first-class functions made it surprisingly powerful, though its quirks and inconsistencies initially gave it a poor reputation among programmers.',
      'Today, JavaScript has evolved far beyond its original scope. With Node.js, it runs on servers; with React Native and Electron, it powers mobile and desktop applications. JavaScript is now one of the most popular programming languages in the world, essential for modern web development.',
    ],
  },
  {
    title: '1998',
    url: 'https://en.wikipedia.org/wiki/Google_Search',
    cardTitle: 'Google Search Engine',
    cardSubtitle: 'Larry Page and Sergey Brin Launch Google',
    // media: {
    //   type: 'IMAGE',
    //   source: {
    //     url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_Homepage.svg/800px-Google_Homepage.svg.png',
    //   },
    //   name: 'Google Homepage',
    // },
    cardDetailedText: [
      'Larry Page and Sergey Brin founded Google while PhD students at Stanford University. Their breakthrough was the PageRank algorithm, which ranked web pages based on their authority and relevance, determined by analyzing the links between pages.',
      'Unlike earlier search engines that primarily relied on keyword matching, PageRank considered the quality and quantity of links pointing to a page as indicators of its importance. This approach produced significantly more relevant search results than competitors like AltaVista and Yahoo.',
      'Google\'s clean, minimalist interface contrasted sharply with the cluttered portals that dominated the web. The company\'s focus on search quality and user experience, combined with its "Don\'t be evil" motto, quickly made it the preferred search engine for millions of users.',
      'From search, Google expanded into email (Gmail), maps (Google Maps), mobile operating systems (Android), cloud computing (Google Cloud), and artificial intelligence. Today, Google processes over 8.5 billion searches daily and has become synonymous with finding information online.',
    ],
  },
  {
    title: '2001',
    url: 'https://en.wikipedia.org/wiki/Wikipedia',
    cardTitle: 'Wikipedia Launch',
    cardSubtitle: 'Jimmy Wales and Larry Sanger Create Collaborative Encyclopedia',
    // media: {
    //   type: 'IMAGE',
    //   source: {
    //     url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/800px-Wikipedia-logo-v2.svg.png',
    //   },
    //   name: 'Wikipedia Logo',
    // },
    cardDetailedText: [
      'Wikipedia was launched by Jimmy Wales and Larry Sanger as a free, collaborative encyclopedia that anyone could edit. Built on wiki software, it allowed users to create and modify articles collaboratively, with all changes tracked and reversible.',
      'The project began as a complement to Nupedia, a more traditional expert-written encyclopedia. However, Wikipedia\'s open editing model proved far more successful, rapidly accumulating content from volunteers worldwide and eventually replacing Nupedia entirely.',
      'Wikipedia challenged traditional notions of authority and expertise in knowledge creation. Its "neutral point of view" policy and requirement for reliable sources created a new model for collaborative knowledge production that has proven remarkably effective.',
      'Today, Wikipedia contains over 60 million articles in more than 300 languages and is one of the world\'s most visited websites. It has become an essential reference tool and demonstrated the power of crowdsourced content creation.',
    ],
  },
  {
    title: '2004',
    url: 'https://en.wikipedia.org/wiki/Facebook',
    cardTitle: 'Facebook Social Network',
    cardSubtitle: 'Mark Zuckerberg Launches "The Facebook" at Harvard',
    // media: {
    //   type: 'IMAGE',
    //   source: {
    //     url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/800px-Facebook_Logo_%282019%29.png',
    //   },
    //   name: 'Facebook Logo',
    // },
    cardDetailedText: [
      'Mark Zuckerberg launched "The Facebook" from his Harvard dormitory room as a social networking site for college students. Initially limited to Harvard students, it quickly expanded to other universities and then to the general public in 2006.',
      'Facebook pioneered the concept of the social media timeline, where users could share updates, photos, and interact with friends\' content. The platform\'s real-name policy and focus on connecting people with their actual social networks distinguished it from anonymous forums and chat rooms.',
      'The introduction of the News Feed in 2006 revolutionized how people consumed information online, creating a personalized stream of content from friends and pages they followed. This algorithmic curation model became the template for most social media platforms.',
      'Facebook\'s impact extends far beyond social networking. It has influenced political campaigns, social movements, and global communication patterns. With nearly 3 billion monthly active users, Facebook (now Meta) has become one of the most powerful companies in the world.',
    ],
  },
  {
    title: '2007',
    url: 'https://en.wikipedia.org/wiki/IPhone_(1st_generation)',
    cardTitle: 'Apple iPhone',
    cardSubtitle: 'Steve Jobs Unveils the iPhone, Revolutionizing Mobile Computing',
    // media: {
    //   type: 'IMAGE',
    //   source: {
    //     url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/IPhone_1st_Gen.svg/400px-IPhone_1st_Gen.svg.png',
    //   },
    //   name: 'Original iPhone',
    // },
    cardDetailedText: [
      'Steve Jobs introduced the iPhone at the Macworld Conference, describing it as "three revolutionary products in one": an iPod, a phone, and a breakthrough internet communications device. The iPhone combined these functions into a single device with an intuitive touchscreen interface.',
      'The iPhone eliminated the physical keyboard and stylus that characterized smartphones of the era, instead relying on a multi-touch display and innovative software keyboard. Its iOS operating system provided a smooth, responsive user experience that set new standards for mobile interfaces.',
      'Beyond hardware innovation, the iPhone introduced the concept of mobile apps through the App Store (launched in 2008). This created a new economy for mobile software and enabled developers to reach millions of users directly through Apple\'s platform.',
      'The iPhone sparked the smartphone revolution, inspiring competitors and establishing the template for modern mobile devices. It transformed industries from photography to transportation (enabling services like Uber) and made powerful computing accessible to billions worldwide.',
    ],
    items: [
      {
        cardTitle: 'Launch Impact',
        cardDetailedText: 'Apple stock rose 8% on launch day, validating the revolutionary design',
      },
      {
        cardTitle: 'Industry Disruption',
        cardDetailedText: 'Displaced BlackBerry, Palm, and Windows Mobile within five years',
      },
    ],
  },
  {
    title: '2008',
    url: 'https://en.wikipedia.org/wiki/Android_(operating_system)',
    cardTitle: 'Google Android OS',
    cardSubtitle: 'Open-Source Mobile Operating System Launches',
    // media: {
    //   type: 'IMAGE',
    //   source: {
    //     url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Android_robot.svg/800px-Android_robot.svg.png',
    //   },
    //   name: 'Android Robot Logo',
    // },
    cardDetailedText: [
      'Google released Android as an open-source mobile operating system, providing an alternative to Apple\'s closed iOS ecosystem. Built on the Linux kernel, Android was designed to run on a variety of hardware from different manufacturers.',
      'The first Android device, the T-Mobile G1 (HTC Dream), featured a physical keyboard and trackball, reflecting the early uncertainty about touchscreen-only interfaces. However, Android quickly evolved to embrace the touchscreen paradigm established by the iPhone.',
      'Android\'s open-source nature allowed manufacturers like Samsung, LG, and HTC to customize the operating system and compete on hardware innovation. This approach led to rapid adoption and diverse device options at various price points.',
      'Today, Android powers over 70% of smartphones worldwide, making it the most widely used mobile operating system. Its success democratized smartphone technology and created a competitive ecosystem that continues to drive innovation.',
    ],
  },
  {
    title: '2010',
    url: 'https://en.wikipedia.org/wiki/Cloud_computing',
    cardTitle: 'Cloud Computing Mainstream',
    cardSubtitle: 'Amazon Web Services and Microsoft Azure Transform IT',
    // media: {
    //   type: 'IMAGE',
    //   source: {
    //     url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Cloud_computing.svg/800px-Cloud_computing.svg.png',
    //   },
    //   name: 'Cloud Computing Diagram',
    // },
    cardDetailedText: [
      'Cloud computing reached mainstream adoption around 2010, with Amazon Web Services (AWS) leading the transformation from traditional data centers to on-demand computing resources. Microsoft Azure and Google Cloud Platform soon followed, creating a competitive cloud services market.',
      'The cloud computing model shifted IT from capital expenditures (buying servers) to operational expenditures (renting computing power). This change enabled startups to access enterprise-grade infrastructure without massive upfront investments, accelerating innovation and entrepreneurship.',
      'Key cloud services like Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS) allowed businesses to focus on their core competencies while outsourcing IT infrastructure management to specialized providers.',
      'Cloud computing enabled the mobile app ecosystem, big data analytics, and artificial intelligence applications by providing scalable, cost-effective computing resources. It fundamentally changed how software is developed, deployed, and consumed.',
    ],
  },
  {
    title: '2012',
    url: 'https://en.wikipedia.org/wiki/Deep_learning',
    cardTitle: 'Deep Learning Breakthrough',
    cardSubtitle: 'AlexNet Wins ImageNet, Sparking AI Renaissance',
    // media: {
    //   type: 'IMAGE',
    //   source: {
    //     url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Colored_neural_network.svg/800px-Colored_neural_network.svg.png',
    //   },
    //   name: 'Neural Network Diagram',
    // },
    cardDetailedText: [
      'The AlexNet deep learning model, developed by Alex Krizhevsky, dramatically won the ImageNet Large Scale Visual Recognition Challenge in 2012, reducing the error rate from 26% to 15%. This breakthrough demonstrated the power of deep neural networks and GPU computing.',
      'AlexNet\'s success reinvigorated artificial intelligence research after decades of limited progress. The model used techniques like ReLU activation functions, dropout regularization, and data augmentation that became standard in deep learning.',
      'The breakthrough was enabled by several factors: the availability of large labeled datasets (ImageNet), powerful GPU hardware for parallel computation, and refined neural network architectures with multiple layers of artificial neurons.',
      'This moment marked the beginning of the current AI boom, leading to rapid advances in computer vision, natural language processing, and machine learning. Deep learning now powers applications from smartphone cameras to autonomous vehicles.',
    ],
  },
  {
    title: '2016',
    url: 'https://en.wikipedia.org/wiki/AlphaGo',
    cardTitle: 'AlphaGo Defeats Go Champion',
    cardSubtitle: 'DeepMind\'s AI Achieves Historic Victory in Complex Game',
    // media: {
    //   type: 'IMAGE',
    //   source: {
    //     url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Go_board_empty.svg/800px-Go_board_empty.svg.png',
    //   },
    //   name: 'Go Game Board',
    // },
    cardDetailedText: [
      'Google DeepMind\'s AlphaGo defeated Lee Sedol, one of the world\'s strongest Go players, in a five-game match that captured global attention. Go was considered the last board game bastion of human superiority due to its astronomical number of possible positions.',
      'AlphaGo combined deep neural networks with Monte Carlo tree search, learning from millions of human games and then improving through self-play. The AI made several moves that initially seemed questionable but proved brilliant, demonstrating creative problem-solving.',
      'The victory was significant because Go requires intuition, pattern recognition, and long-term strategic thinking—cognitive abilities once thought uniquely human. AlphaGo\'s success suggested that AI could master complex, abstract reasoning tasks.',
      'This achievement accelerated investment in AI research and development, with applications expanding from games to drug discovery, protein folding, and scientific research. It marked a turning point in public perception of AI capabilities.',
    ],
  },
  {
    title: '2020',
    url: 'https://en.wikipedia.org/wiki/GPT-3',
    cardTitle: 'GPT-3 Language Model',
    cardSubtitle: 'OpenAI Releases Revolutionary Language AI',
    // media: {
    //   type: 'IMAGE',
    //   source: {
    //     url: 'https://logos-world.net/wp-content/uploads/2023/02/ChatGPT-Symbol.png',
    //   },
    //   name: 'OpenAI Logo',
    // },
    cardDetailedText: [
      'OpenAI released GPT-3 (Generative Pre-trained Transformer 3), a language model with 175 billion parameters that demonstrated unprecedented ability to understand and generate human-like text. GPT-3 could write essays, answer questions, translate languages, and even generate code.',
      'Unlike previous AI systems designed for specific tasks, GPT-3 showed remarkable versatility through "few-shot learning"—performing new tasks with just a few examples. This general-purpose capability suggested a path toward artificial general intelligence.',
      'GPT-3\'s training on diverse internet text gave it broad knowledge across many domains, but also highlighted challenges around bias, misinformation, and the responsible deployment of powerful AI systems. These concerns became central to AI ethics discussions.',
      'The model\'s capabilities sparked a new wave of AI applications, from writing assistants to code generators. GPT-3 democratized access to advanced AI through OpenAI\'s API, enabling countless developers to build AI-powered applications.',
    ],
  },
  {
    title: '2022',
    url: 'https://en.wikipedia.org/wiki/ChatGPT',
    cardTitle: 'ChatGPT Public Release',
    cardSubtitle: 'Conversational AI Reaches 100 Million Users in 2 Months',
    // media: {
    //   type: 'IMAGE',
    //   source: {
    //     url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/800px-ChatGPT_logo.svg.png',
    //   },
    //   name: 'ChatGPT Logo',
    // },
    cardDetailedText: [
      'OpenAI released ChatGPT to the public in November 2022, making advanced conversational AI accessible to millions of users worldwide. The system could engage in detailed discussions, answer complex questions, and assist with various tasks from writing to problem-solving.',
      'ChatGPT achieved unprecedented adoption, reaching 100 million monthly active users in just two months—faster than any consumer application in history. This rapid uptake demonstrated massive public appetite for AI assistance in daily tasks.',
      'The release sparked global conversations about AI\'s impact on education, work, and society. Students used it for homework, professionals for writing assistance, and developers for code generation, leading to new policies and ethical considerations.',
      'ChatGPT\'s success triggered an "AI arms race" among technology companies, with Google, Microsoft, Meta, and others rushing to develop competitive AI assistants. This competition accelerated AI development and integration across numerous industries.',
    ],
  },
  {
    title: '2024',
    url: 'https://en.wikipedia.org/wiki/Artificial_general_intelligence',
    cardTitle: 'The Future of AI',
    cardSubtitle: 'Toward Artificial General Intelligence and Beyond',
    // media: {
    //   type: 'IMAGE',
    //   source: {
    //     url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Artificial_Intelligence_%26_AI_%26_Machine_Learning_-_30212411048.jpg/800px-Artificial_Intelligence_%26_AI_%26_Machine_Learning_-_30212411048.jpg',
    //   },
    //   name: 'AI and Machine Learning Concept',
    // },
    cardDetailedText: [
      'As we progress through 2024, artificial intelligence continues to advance rapidly toward more general capabilities. Large language models are becoming more capable, multimodal AI can process text, images, and audio together, and AI agents are beginning to perform complex multi-step tasks.',
      'The integration of AI into everyday tools—from smartphones to productivity software—is transforming how people work, learn, and create. AI assistance is becoming as common as internet search, fundamentally changing human-computer interaction patterns.',
      'Major challenges remain, including AI safety, alignment with human values, job displacement concerns, and the need for robust governance frameworks. The race to develop AGI (Artificial General Intelligence) intensifies while researchers work to ensure beneficial outcomes.',
      'Looking ahead, AI promises to accelerate scientific discovery, enable new forms of creativity, and solve complex global challenges. The next decade may see AI systems that match or exceed human capability across most cognitive tasks, ushering in a new era of human-AI collaboration.',
    ],
    items: [
      {
        cardTitle: 'Current Capabilities',
        cardDetailedText: 'Multimodal AI, advanced reasoning, code generation, creative writing, scientific research assistance',
      },
      {
        cardTitle: 'Key Challenges',
        cardDetailedText: 'AI safety, alignment, governance, economic disruption, misinformation, privacy concerns',
      },
      {
        cardTitle: 'Future Potential',
        cardDetailedText: 'Scientific breakthroughs, personalized education, healthcare advances, climate solutions',
      },
    ],
  },
];