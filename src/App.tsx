/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  Trophy,
  BookOpen,
  GraduationCap,
  Layout
} from 'lucide-react';

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: number;
  part: string;
  paragraph: string;
  options: Option[];
  correctAnswer: string;
}

const QUESTIONS: Question[] = [
  // Phần 1: Công nghệ & Khoa học
  {
    id: 1,
    part: "Phần 1: Công nghệ & Khoa học",
    paragraph: "The development of 5G technology is not just about faster smartphones. It is expected to revolutionize industries by enabling real-time data transmission for autonomous vehicles and remote surgery, which require near-zero latency.",
    options: [
      { id: "A", text: "The speed of mobile internet" },
      { id: "B", text: "Beyond personal communication" },
      { id: "C", text: "The risks of new technology" }
    ],
    correctAnswer: "B"
  },
  {
    id: 2,
    part: "Phần 1: Công nghệ & Khoa học",
    paragraph: "Algae-based biofuels are gaining traction as a sustainable alternative to fossil fuels. Unlike corn or sugarcane, algae can be grown on non-arable land and do not compete with food crops for resources.",
    options: [
      { id: "A", text: "A non-competitive energy source" },
      { id: "B", text: "The history of biofuels" },
      { id: "C", text: "Why algae is difficult to grow" }
    ],
    correctAnswer: "A"
  },
  {
    id: 3,
    part: "Phần 1: Công nghệ & Khoa học",
    paragraph: "In the early 19th century, the Luddites destroyed textile machinery in England. They weren't opposed to technology itself, but rather to the way it was used to bypass standard labor practices and reduce wages.",
    options: [
      { id: "A", text: "Technical failures in the 1800s" },
      { id: "B", text: "Misconceptions about a protest movement" },
      { id: "C", text: "The rise of the textile industry" }
    ],
    correctAnswer: "B"
  },
  // Phần 2: Môi trường & Thiên nhiên
  {
    id: 4,
    part: "Phần 2: Môi trường & Thiên nhiên",
    paragraph: "Rewilding involves restoring natural processes and wilderness areas. This often means reintroducing apex predators, such as wolves, to ecosystems where they have been extinct for decades to help balance the food chain.",
    options: [
      { id: "A", text: "Protecting endangered plants" },
      { id: "B", text: "Restoring balance through predators" },
      { id: "C", text: "The dangers of wild animals" }
    ],
    correctAnswer: "B"
  },
  {
    id: 5,
    part: "Phần 2: Môi trường & Thiên nhiên",
    paragraph: "Vertical farming allows crops to be grown in stacked layers within urban environments. This method uses 95% less water than traditional farming and eliminates the need for chemical pesticides.",
    options: [
      { id: "A", text: "Traditional vs. Modern farming" },
      { id: "B", text: "Resource efficiency in urban agriculture" },
      { id: "C", text: "The taste of indoor-grown food" }
    ],
    correctAnswer: "B"
  },
  {
    id: 6,
    part: "Phần 2: Môi trường & Thiên nhiên",
    paragraph: "The \"albedo effect\" refers to the ability of surfaces to reflect sunlight. As Arctic ice melts, the dark ocean water absorbs more heat, which in turn accelerates further melting in a dangerous feedback loop.",
    options: [
      { id: "A", text: "The cooling power of the ocean" },
      { id: "B", text: "A self-reinforcing warming process" },
      { id: "C", text: "Measuring sunlight reflection" }
    ],
    correctAnswer: "B"
  },
  // Phần 3: Tâm lý & Giáo dục
  {
    id: 7,
    part: "Phần 3: Tâm lý & Giáo dục",
    paragraph: "The \"Growth Mindset\" theory suggests that intelligence is not fixed. Students who believe they can improve through effort tend to perform better than those who think their abilities are innate.",
    options: [
      { id: "A", text: "The impact of belief on performance" },
      { id: "B", text: "Fixed IQ scores in children" },
      { id: "C", text: "Why some students fail" }
    ],
    correctAnswer: "A"
  },
  {
    id: 8,
    part: "Phần 3: Tâm lý & Giáo dục",
    paragraph: "Spaced repetition is a learning technique that involves reviewing information at increasing intervals. This exploits the psychological \"spacing effect,\" where the brain remembers information better when learning is spread out over time.",
    options: [
      { id: "A", text: "The importance of cramming" },
      { id: "B", text: "Timing reviews for better memory" },
      { id: "C", text: "How the brain forgets details" }
    ],
    correctAnswer: "B"
  },
  {
    id: 9,
    part: "Phần 3: Tâm lý & Giáo dục",
    paragraph: "Studies show that open-plan offices often lead to decreased productivity. Constant noise and lack of privacy can cause stress and prevent employees from entering a state of \"deep work.\"",
    options: [
      { id: "A", text: "The benefits of collaboration" },
      { id: "B", text: "Negative impacts of modern workspace design" },
      { id: "C", text: "Solving the noise problem" }
    ],
    correctAnswer: "B"
  },
  // Phần 4: Lịch sử & Khảo cổ
  {
    id: 10,
    part: "Phần 4: Lịch sử & Khảo cổ",
    paragraph: "The Rosetta Stone, discovered in 1799, was the key to deciphering Egyptian hieroglyphs. It featured the same decree written in three different scripts, allowing scholars to finally read ancient texts.",
    options: [
      { id: "A", text: "A breakthrough in ancient languages" },
      { id: "B", text: "The construction of Egyptian monuments" },
      { id: "C", text: "Hidden treasures of the Nile" }
    ],
    correctAnswer: "A"
  },
  {
    id: 11,
    part: "Phần 4: Lịch sử & Khảo cổ",
    paragraph: "The Silk Road was not a single path but a network of trade routes connecting East and West. It facilitated not only the exchange of goods like silk and spices but also the spread of religions and ideas.",
    options: [
      { id: "A", text: "Trading luxury items" },
      { id: "B", text: "A multi-faceted channel of exchange" },
      { id: "C", text: "The decline of ancient empires" }
    ],
    correctAnswer: "B"
  },
  {
    id: 12,
    part: "Phần 4: Lịch sử & Khảo cổ",
    paragraph: "Recent excavations in the Amazon have revealed massive geometric earthworks. These findings suggest that the region supported large, complex societies long before European arrival, challenging the image of a \"virgin\" forest.",
    options: [
      { id: "A", text: "The effects of deforestation" },
      { id: "B", text: "Evidence of advanced ancient civilizations" },
      { id: "C", text: "European explorers in the jungle" }
    ],
    correctAnswer: "B"
  },
  // Phần 5: Kinh tế & Xã hội
  {
    id: 13,
    part: "Phần 5: Kinh tế & Xã hội",
    paragraph: "The \"Gig Economy\" refers to a labor market characterized by short-term contracts or freelance work. While it offers flexibility, many workers struggle with a lack of job security and benefits like health insurance.",
    options: [
      { id: "A", text: "The end of traditional employment" },
      { id: "B", text: "Flexibility vs. Financial instability" },
      { id: "C", text: "How to become a freelancer" }
    ],
    correctAnswer: "B"
  },
  {
    id: 14,
    part: "Phần 5: Kinh tế & Xã hội",
    paragraph: "Urbanization is occurring at an unprecedented rate in Asia and Africa. By 2050, it is estimated that two-thirds of the world’s population will live in cities, putting massive strain on infrastructure.",
    options: [
      { id: "A", text: "The shift toward city living" },
      { id: "B", text: "Building better transport systems" },
      { id: "C", text: "The decline of rural populations" }
    ],
    correctAnswer: "A"
  },
  {
    id: 15,
    part: "Phần 5: Kinh tế & Xã hội",
    paragraph: "Circular economy models aim to eliminate waste by keeping products and materials in use for as long as possible. This contrasts with the traditional \"take-make-dispose\" linear model.",
    options: [
      { id: "A", text: "Recycling household trash" },
      { id: "B", text: "A new approach to production and waste" },
      { id: "C", text: "The cost of manufacturing" }
    ],
    correctAnswer: "B"
  },
  // Phần 6: Sức khỏe & Sinh học
  {
    id: 16,
    part: "Phần 6: Sức khỏe & Sinh học",
    paragraph: "Circadian rhythms are internal clocks that regulate the sleep-wake cycle. Disruption of these rhythms, often caused by blue light from screens, is linked to various health issues like obesity and depression.",
    options: [
      { id: "A", text: "The history of sleep research" },
      { id: "B", text: "Biological cycles and modern interference" },
      { id: "C", text: "Benefits of blue light technology" }
    ],
    correctAnswer: "B"
  },
  {
    id: 17,
    part: "Phần 6: Sức khỏe & Sinh học",
    paragraph: "Antibiotic resistance occurs when bacteria evolve to survive the drugs meant to kill them. This is largely driven by the overprescription of antibiotics in human medicine and their use in livestock.",
    options: [
      { id: "A", text: "Developing new medicines" },
      { id: "B", text: "Factors contributing to drug-resistant bacteria" },
      { id: "C", text: "The importance of hygiene" }
    ],
    correctAnswer: "B"
  },
  {
    id: 18,
    part: "Phần 6: Sức khỏe & Sinh học",
    paragraph: "The human microbiome consists of trillions of microbes living in our gut. These organisms play a crucial role in digestion, immune function, and even mental health through the gut-brain axis.",
    options: [
      { id: "A", text: "Microbes: Essential partners for health" },
      { id: "B", text: "Common digestive disorders" },
      { id: "C", text: "The evolution of human bacteria" }
    ],
    correctAnswer: "A"
  },
  // Phần 7: Văn hóa & Nghệ thuật
  {
    id: 19,
    part: "Phần 7: Văn hóa & Nghệ thuật",
    paragraph: "Minimalist architecture emphasizes simplicity and the use of natural light. By removing unnecessary ornamentation, architects aim to create spaces that evoke a sense of calm and clarity.",
    options: [
      { id: "A", text: "The cost of luxury housing" },
      { id: "B", text: "Aesthetic goals of a specific style" },
      { id: "C", text: "Lighting techniques in construction" }
    ],
    correctAnswer: "B"
  },
  {
    id: 20,
    part: "Phần 7: Văn hóa & Nghệ thuật",
    paragraph: "Traditional folk music is often passed down orally through generations. While it evolves over time, it remains a vital vessel for a community’s history, values, and identity.",
    options: [
      { id: "A", text: "The loss of cultural heritage" },
      { id: "B", text: "Music as a historical record" },
      { id: "C", text: "Recording techniques for folk songs" }
    ],
    correctAnswer: "B"
  },
  {
    id: 21,
    part: "Phần 7: Văn hóa & Nghệ thuật",
    paragraph: "The rise of digital art has sparked debates about authenticity and ownership. With NFTs (Non-Fungible Tokens), artists can now prove the uniqueness of a digital file, even if it can be easily copied.",
    options: [
      { id: "A", text: "Traditional painting vs. Digital art" },
      { id: "B", text: "Solving the problem of digital ownership" },
      { id: "C", text: "The high price of modern art" }
    ],
    correctAnswer: "B"
  },
  // Phần 8: Động vật học
  {
    id: 22,
    part: "Phần 8: Động vật học",
    paragraph: "Mimicry is a survival strategy where an animal resembles another species. For example, the harmless hoverfly has evolved yellow and black stripes to look like a wasp, deterring potential predators.",
    options: [
      { id: "A", text: "Defensive deception in nature" },
      { id: "B", text: "The hunting habits of wasps" },
      { id: "C", text: "Colors that attract mates" }
    ],
    correctAnswer: "A"
  },
  {
    id: 23,
    part: "Phần 8: Động vật học",
    paragraph: "Migration is a perilous journey for birds, requiring immense energy. Many species navigate using the Earth's magnetic field, stars, and even landmarks to travel thousands of miles to warmer climates.",
    options: [
      { id: "A", text: "The dangers of cold weather" },
      { id: "B", text: "Navigation tools of migratory species" },
      { id: "C", text: "Finding food in the winter" }
    ],
    correctAnswer: "B"
  },
  {
    id: 24,
    part: "Phần 8: Động vật học",
    paragraph: "Octopuses are incredibly intelligent, capable of solving puzzles and using tools. Unlike humans, two-thirds of their neurons are located in their arms, allowing them to \"think\" with their entire body.",
    options: [
      { id: "A", text: "Unique physical and mental structure" },
      { id: "B", text: "How octopuses hide from enemies" },
      { id: "C", text: "Training marine animals" }
    ],
    correctAnswer: "A"
  },
  // Phần 9: Du lịch & Đời sống
  {
    id: 25,
    part: "Phần 9: Du lịch & Đời sống",
    paragraph: "Ecotourism aims to provide travel experiences that minimize impact on the environment and support local communities. However, if not managed strictly, \"green\" travel can still lead to habitat destruction.",
    options: [
      { id: "A", text: "The popularity of luxury travel" },
      { id: "B", text: "Benefits and risks of sustainable tourism" },
      { id: "C", text: "Investing in local hotels" }
    ],
    correctAnswer: "B"
  },
  {
    id: 26,
    part: "Phần 9: Du lịch & Đời sống",
    paragraph: "Slow food is a movement that encourages people to eat locally grown, seasonal food. It started as a protest against the opening of a fast-food restaurant in Rome and has since spread globally.",
    options: [
      { id: "A", text: "A reaction to standardized eating" },
      { id: "B", text: "Cooking tips for busy families" },
      { id: "C", text: "The expansion of fast-food chains" }
    ],
    correctAnswer: "A"
  },
  {
    id: 27,
    part: "Phần 9: Du lịch & Đời sống",
    paragraph: "Remote work has changed the concept of \"home.\" Many \"digital nomads\" now move between countries, seeking better lifestyles or lower costs of living while working online.",
    options: [
      { id: "A", text: "The difficulty of finding internet abroad" },
      { id: "B", text: "A new lifestyle enabled by technology" },
      { id: "C", text: "Government regulations on work" }
    ],
    correctAnswer: "B"
  },
  // Phần 10: Tổng hợp & Tư duy
  {
    id: 28,
    part: "Phần 10: Tổng hợp & Tư duy",
    paragraph: "Standardized testing is often criticized for being too narrow. Critics argue that these exams measure memorization skills rather than critical thinking or creativity, which are more important in the real world.",
    options: [
      { id: "A", text: "Improving exam scores" },
      { id: "B", text: "Limitations of traditional assessment" },
      { id: "C", text: "The history of grading systems" }
    ],
    correctAnswer: "B"
  },
  {
    id: 29,
    part: "Phần 10: Tổng hợp & Tư duy",
    paragraph: "The Pareto Principle, or the 80/20 rule, suggests that 80% of results come from 20% of efforts. In business, this often means that a small number of customers generate the majority of revenue.",
    options: [
      { id: "A", text: "A formula for equal distribution" },
      { id: "B", text: "Identifying the most productive factors" },
      { id: "C", text: "Increasing the workload for staff" }
    ],
    correctAnswer: "B"
  },
  {
    id: 30,
    part: "Phần 10: Tổng hợp & Tư duy",
    paragraph: "Biomimicry is the practice of looking to nature for inspiration to solve human problems. For instance, the design of the Japanese Shinkansen train was inspired by the beak of the kingfisher to reduce noise.",
    options: [
      { id: "A", text: "Engineering inspired by biology" },
      { id: "B", text: "Speed records of modern trains" },
      { id: "C", text: "Protecting kingfishers from extinction" }
    ],
    correctAnswer: "A"
  }
];

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUESTIONS.length;

  const handleAnswerSelect = (optionId: string) => {
    if (showResults) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowResults(true);
  };

  const handleReset = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setShowResults(false);
    setCurrentQuestionIndex(0);
  };

  const score = useMemo(() => {
    let correctCount = 0;
    QUESTIONS.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    return (10 * correctCount) / totalQuestions;
  }, [userAnswers, totalQuestions]);

  const correctCount = useMemo(() => {
    return QUESTIONS.filter(q => userAnswers[q.id] === q.correctAnswer).length;
  }, [userAnswers]);

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#1A1A1A] font-sans p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-[#5A5A40]">
              IELTS Heading Master
            </h1>
            <p className="text-[#8E9299] mt-1 flex items-center gap-2">
              <BookOpen size={16} />
              Luyện tập cường độ cao - 30 bài tập
            </p>
          </div>
          
          {showResults && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-[#5A5A40]/10 flex items-center gap-4"
            >
              <div className="text-right">
                <p className="text-xs uppercase tracking-widest text-[#8E9299] font-bold">Điểm số</p>
                <p className="text-3xl font-serif font-black text-[#5A5A40]">{score.toFixed(1)}/10</p>
              </div>
              <div className="h-10 w-[1px] bg-[#5A5A40]/20" />
              <div className="text-left">
                <p className="text-xs uppercase tracking-widest text-[#8E9299] font-bold">Đúng</p>
                <p className="text-3xl font-serif font-black text-[#5A5A40]">{correctCount}/{totalQuestions}</p>
              </div>
            </motion.div>
          )}
        </header>

        {/* Main Quiz Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Question Card */}
          <main className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="bg-white rounded-3xl shadow-sm border border-black/5 overflow-hidden"
              >
                {/* Progress Bar */}
                <div className="h-1.5 w-full bg-[#E6E6E6]">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-[#5A5A40]"
                  />
                </div>

                <div className="p-6 md:p-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 bg-[#F5F5F0] text-[#5A5A40] text-xs font-bold uppercase tracking-wider rounded-full">
                      {currentQuestion.part}
                    </span>
                    <span className="text-sm font-mono text-[#8E9299]">
                      Câu {currentQuestionIndex + 1} / {totalQuestions}
                    </span>
                  </div>

                  <div className="mb-8">
                    <h2 className="text-xs uppercase tracking-widest text-[#8E9299] font-bold mb-4">Đoạn văn</h2>
                    <p className="text-lg md:text-xl leading-relaxed font-serif italic text-[#333]">
                      "{currentQuestion.paragraph}"
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-xs uppercase tracking-widest text-[#8E9299] font-bold mb-4">Chọn Heading</h2>
                    {currentQuestion.options.map((option) => {
                      const isSelected = userAnswers[currentQuestion.id] === option.id;
                      const isCorrect = option.id === currentQuestion.correctAnswer;
                      const showFeedback = showResults && isSelected;

                      return (
                        <button
                          key={option.id}
                          onClick={() => handleAnswerSelect(option.id)}
                          disabled={showResults}
                          className={`
                            w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between
                            ${isSelected 
                              ? 'bg-[#5A5A40] text-white border-[#5A5A40]' 
                              : 'bg-white text-[#1A1A1A] border-black/10 hover:border-[#5A5A40]/50'
                            }
                            ${showResults && isSelected && !isCorrect ? 'bg-red-500 border-red-500' : ''}
                            ${showResults && isSelected && isCorrect ? 'bg-emerald-600 border-emerald-600' : ''}
                          `}
                        >
                          <div className="flex items-center gap-4">
                            <span className={`
                              w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm
                              ${isSelected ? 'bg-white/20' : 'bg-[#F5F5F0] text-[#5A5A40]'}
                            `}>
                              {option.id}
                            </span>
                            <span className="font-medium">{option.text}</span>
                          </div>
                          
                          {showResults && isSelected && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                              {isCorrect ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                            </motion.div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {showResults && userAnswers[currentQuestion.id] && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-6 p-4 rounded-xl flex items-center gap-3 font-bold
                        ${userAnswers[currentQuestion.id] === currentQuestion.correctAnswer 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : 'bg-red-50 text-red-700'
                        }
                      `}
                    >
                      {userAnswers[currentQuestion.id] === currentQuestion.correctAnswer 
                        ? <><CheckCircle2 size={20} /> Câu này Đúng</>
                        : <><XCircle size={20} /> Câu này Sai</>
                      }
                    </motion.div>
                  )}
                </div>

                {/* Navigation Footer */}
                <div className="bg-[#F9F9F7] p-6 flex items-center justify-between border-t border-black/5">
                  <button
                    onClick={prevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center gap-2 text-sm font-bold text-[#5A5A40] disabled:opacity-30"
                  >
                    <ChevronLeft size={18} /> Trước
                  </button>

                  <div className="flex gap-2">
                    {!showResults && Object.keys(userAnswers).length === totalQuestions && (
                      <button
                        onClick={handleSubmit}
                        className="bg-[#5A5A40] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-[#5A5A40]/20 hover:scale-105 transition-transform"
                      >
                        Nộp bài
                      </button>
                    )}
                    {showResults && (
                      <button
                        onClick={handleReset}
                        className="bg-white border border-[#5A5A40] text-[#5A5A40] px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-[#F5F5F0]"
                      >
                        <RotateCcw size={16} /> Làm lại
                      </button>
                    )}
                  </div>

                  <button
                    onClick={nextQuestion}
                    disabled={currentQuestionIndex === totalQuestions - 1}
                    className="flex items-center gap-2 text-sm font-bold text-[#5A5A40] disabled:opacity-30"
                  >
                    Sau <ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Sidebar - Question Navigator */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-black/5">
              <h3 className="text-xs uppercase tracking-widest text-[#8E9299] font-bold mb-4 flex items-center gap-2">
                <Layout size={14} /> Danh sách câu hỏi
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {QUESTIONS.map((q, idx) => {
                  const isAnswered = !!userAnswers[q.id];
                  const isCurrent = idx === currentQuestionIndex;
                  const isCorrect = showResults && userAnswers[q.id] === q.correctAnswer;
                  const isWrong = showResults && userAnswers[q.id] && userAnswers[q.id] !== q.correctAnswer;

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`
                        w-full aspect-square rounded-lg text-xs font-bold transition-all
                        ${isCurrent ? 'ring-2 ring-[#5A5A40] ring-offset-2' : ''}
                        ${showResults 
                          ? (isCorrect ? 'bg-emerald-500 text-white' : (isWrong ? 'bg-red-500 text-white' : 'bg-[#E6E6E6] text-[#8E9299]'))
                          : (isAnswered ? 'bg-[#5A5A40] text-white' : 'bg-[#F5F5F0] text-[#8E9299]')
                        }
                      `}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-[#5A5A40] rounded-3xl p-6 text-white shadow-xl shadow-[#5A5A40]/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <GraduationCap size={20} />
                </div>
                <h3 className="font-bold">Mục tiêu luyện tập</h3>
              </div>
              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                  <span>Phân tích từ khóa trong đoạn văn</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                  <span>Loại trừ các Heading gây nhiễu</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                  <span>Rèn luyện khả năng đọc hiểu nhanh</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
