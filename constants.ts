import { Sector, Insight, Event } from './types';

export const SECTORS: Sector[] = [
  {
    id: '1',
    title: 'AI & Automation',
    iconName: 'BrainCircuit',
    description: 'Autonomous agents and generative intelligence frameworks.',
  },
  {
    id: '2',
    title: 'Cyber Defense',
    iconName: 'ShieldCheck',
    description: 'Next-gen threat hunting and zero-trust architecture.',
  },
  {
    id: '3',
    title: 'Green Tech',
    iconName: 'Leaf',
    description: 'Sustainable energy grids and carbon capture innovation.',
  },
  {
    id: '4',
    title: 'FinTech',
    iconName: 'Banknote',
    description: 'Blockchain ledgers and decentralized finance protocols.',
  },
  {
    id: '5',
    title: 'Quantum Computing',
    iconName: 'Cpu',
    description: 'Post-silicon processing and cryptographic resilience.',
  },
  {
    id: '6',
    title: 'Digital Media',
    iconName: 'Radio',
    description: 'Immersive AR/VR experiences and synthetic media.',
  },
];

export const INSIGHTS: Insight[] = [
  {
    id: '101',
    title: 'Mitigating Supply Chain Attacks in 2024',
    category: 'Security Alert',
    date: 'Oct 12, 2023',
    readTime: '5 min read',
    summary: 'An in-depth analysis of the latest vectors used by state-sponsored actors to infiltrate upstream dependencies.',
    image: 'https://picsum.photos/800/600?random=1',
  },
  {
    id: '102',
    title: 'Implementing RAG for Enterprise Knowledge',
    category: 'How-to',
    date: 'Oct 10, 2023',
    readTime: '8 min read',
    summary: 'A step-by-step guide to deploying Retrieval-Augmented Generation for internal corporate data silos.',
    image: 'https://picsum.photos/800/600?random=2',
  },
  {
    id: '103',
    title: 'The Rise of Sovereign AI Models',
    category: 'Market Trend',
    date: 'Oct 05, 2023',
    readTime: '6 min read',
    summary: 'Why nations are investing billions in building domestic large language models to ensure data sovereignty.',
    image: 'https://picsum.photos/800/600?random=3',
  },
  {
    id: '104',
    title: 'Quantum-Safe Encryption Standards',
    category: 'Market Trend',
    date: 'Sep 28, 2023',
    readTime: '7 min read',
    summary: 'Preparing your infrastructure for the post-quantum era with NIST-approved algorithms.',
    image: 'https://picsum.photos/800/600?random=4',
  },
];

export const EVENTS: Event[] = [
  {
    id: '201',
    title: 'Global CISO Summit 2024',
    date: 'Nov 15-17, 2024',
    location: 'London, UK',
    themes: ['Risk Management', 'Boardroom Strategy', 'Crisis Response'],
    isExclusive: true,
    description: 'The premier gathering for Chief Information Security Officers. This closed-door summit focuses on high-level strategy, navigating geopolitical cyber risks, and communicating security posture to the board.',
    targetAudience: 'Global CISOs, CROs, and Government Cyber Officials.'
  },
  {
    id: '202',
    title: 'Future Tech Expo',
    date: 'Dec 05, 2024',
    location: 'Singapore',
    themes: ['AI Integration', 'Smart Cities', 'IoT Security'],
    isExclusive: false,
    description: 'An open forum exploring the intersection of rapid urbanization and smart technologies. Showcasing the latest in AI-driven infrastructure and securing the IoT mesh.',
    targetAudience: 'CTOs, Smart City Planners, Tech Investors, and IoT Architects.'
  },
  {
    id: '203',
    title: 'Davos Cyber Retreat',
    date: 'Jan 20, 2025',
    location: 'Davos, Switzerland',
    themes: ['Geopolitics', 'Cyber Warfare', 'International Policy'],
    isExclusive: true,
    description: 'Held in parallel with the WEF, this retreat provides a secure environment for discussing state-level cyber warfare, international treaties, and the ethical implications of autonomous cyber defense systems.',
    targetAudience: 'Policy Makers, Defense Contractors, and Fortune 500 CEOs.'
  },
];