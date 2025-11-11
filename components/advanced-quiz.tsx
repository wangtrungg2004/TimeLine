"use client"

import { useState } from "react"

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
  difficulty: "easy" | "medium" | "hard"
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Vật liệu nào được con người sử dụng đầu tiên?",
    options: ["Đá", "Gỗ", "Kim loại", "Nhựa"],
    correct: 0,
    explanation: "Đá là vật liệu đầu tiên được con người sử dụng từ hàng triệu năm trước để tạo công cụ.",
    difficulty: "easy",
  },
  {
    id: 2,
    question: "Thời Đồng được gọi như thế vì lý do gì?",
    options: [
      "Vì có rất nhiều đồng tiền",
      "Vì đồng là vật liệu chủ yếu được sử dụng",
      "Vì giá vàng cao",
      "Vì phát triển tiền tệ",
    ],
    correct: 1,
    explanation: "Thời Đồng gọi như vậy vì đồng là vật liệu được sử dụng chủ yếu để tạo công cụ và vũ khí.",
    difficulty: "easy",
  },
  {
    id: 3,
    question: "Sắt mạnh hơn đồng như thế nào?",
    options: ["Sắt mềm hơn", "Sắt cứng hơn và chịu lực tốt hơn", "Sắt rẻ hơn thôi", "Chúng như nhau"],
    correct: 1,
    explanation: "Sắt có độ cứng và khả năng chịu lực vượt trội hơn đồng, giúp tạo ra công cụ tốt hơn.",
    difficulty: "easy",
  },
  {
    id: 4,
    question: "Thép là gì?",
    options: [
      "Một loại sắt nguyên chất",
      "Hợp kim của sắt và carbon",
      "Kim loại được tìm thấy tự nhiên",
      "Một loại nhựa",
    ],
    correct: 1,
    explanation: "Thép là hợp kim được tạo bằng cách trộn sắt với carbon, mạnh mẽ hơn sắt thuần chủng.",
    difficulty: "easy",
  },
  {
    id: 5,
    question: "Quy trình Bessemer (1856) giúp gì?",
    options: ["Tăng đạo đức xã hội", "Giảm chi phí sản xuất thép", "Phát minh ra kẽm", "Không giúp gì cả"],
    correct: 1,
    explanation: "Quy trình Bessemer cho phép sản xuất thép hàng loạt, giảm giá thép xuống 90% trong 30 năm.",
    difficulty: "medium",
  },
  {
    id: 6,
    question: "Nhựa được phát minh vào thế kỷ nào?",
    options: ["Thế kỷ 18", "Thế kỷ 19", "Thế kỷ 20", "Thế kỷ 21"],
    correct: 2,
    explanation: "Nhựa được phát minh và phát triển rộng rãi vào thế kỷ 20, cách mạng hóa cách chúng ta sống.",
    difficulty: "easy",
  },
  {
    id: 7,
    question: "Silicon được sử dụng chủ yếu trong lĩnh vực nào?",
    options: ["Nông nghiệp", "Công nghệ điện tử", "Xây dựng", "Dệt may"],
    correct: 1,
    explanation: "Silicon là nền tảng của tất cả các thiết bị điện tử hiện đại, từ máy tính đến điện thoại.",
    difficulty: "medium",
  },
  {
    id: 8,
    question: "Graphene có tính chất gì đặc biệt?",
    options: [
      "Rất nặng và dày",
      "Mạnh hơn thép 200 lần nhưng mỏng bằng nguyên tử",
"Rất dễ nứt",
      "Không có gì đặc biệt",
    ],
    correct: 1,
    explanation: "Graphene mạnh hơn thép 200 lần nhưng lại mỏng chỉ bằng một lớp nguyên tử duy nhất.",
    difficulty: "medium",
  },
  {
    id: 9,
    question: "Vật liệu sinh học có tác dụng gì?",
    options: [
      "Tăng giá thành sản phẩm",
      "Giảm phát thải carbon và có thể phân hủy",
      "Làm sản phẩm chắc chắn hơn",
      "Không có tác dụng",
    ],
    correct: 1,
    explanation: "Vật liệu sinh học từ nấm, tảo, rơm rạ có thể phân hủy hoàn toàn, giúp bảo vệ môi trường.",
    difficulty: "medium",
  },
  {
    id: 10,
    question: "Phát triển vật liệu ảnh hưởng đến kinh tế như thế nào?",
    options: [
      "Không ảnh hưởng",
      "Tăng chi phí sản xuất",
      "Tạo ra những ngành công nghiệp mới, tạo việc làm",
      "Làm giảm nền kinh tế",
    ],
    correct: 2,
    explanation: "Mỗi lần có vật liệu mới, nó tạo ra các ngành công nghiệp mới, tạo việc làm, và phát triển kinh tế.",
    difficulty: "medium",
  },
  {
    id: 11,
    question: "Rìu đá đầu tiên được tạo từ những vật liệu gì?",
    options: ["Chỉ từ đá", "Đá và gỗ", "Kim loại và gỗ", "Nhựa và sắt"],
    correct: 1,
    explanation: "Rìu đá được tạo bằng cách buộc một mảnh đá vào một cây gỗ, là công cụ đầu tiên của con người.",
    difficulty: "easy",
  },
  {
    id: 12,
    question: "Vũ khí nào được tạo từ đồng?",
    options: ["Kiếm thép", "Kiếm đồng", "Súng AK", "Dù"],
    correct: 1,
    explanation: "Kiếm đồng được sử dụng rộng rãi trong thời Đồng, là loại vũ khí phổ biến nhất của thời kỳ đó.",
    difficulty: "easy",
  },
  {
    id: 13,
    question: "Công nghệ nào sử dụng silicon?",
    options: ["Xe ngựa", "Máy tính", "Cánh buồm", "Lò sưởi"],
    correct: 1,
    explanation: "Silicon là thành phần chính trong bán dẫn, được sử dụng trong tất cả máy tính và thiết bị điện tử.",
    difficulty: "easy",
  },
  {
    id: 14,
    question: "Tương lai vật liệu sẽ đi về hướng nào?",
    options: [
      "Quay lại sử dụng đá",
      "Vật liệu bền vững và thân thiện môi trường",
      "Bỏ sử dụng vật liệu",
      "Chỉ dùng nhựa",
    ],
    correct: 1,
    explanation: "Tương lai vật liệu hướng tới các vật liệu bền vững, có thể tái chế, và thân thiện với môi trường.",
    difficulty: "medium",
  },
  {
    id: 15,
    question: "Điều gì là chìa khóa của tiến bộ nhân loại?",
    options: ["Tiền bạc", "Vũ khí", "Sự phát triển của vật liệu", "Thời tiết"],
    correct: 2,
explanation: "Sự phát triển của vật liệu là chìa khóa của tiến bộ nhân loại, từ thời đá đến thời công nghệ.",
    difficulty: "medium",
  },
]


export default function AdvancedQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizComplete, setQuizComplete] = useState(false)

  const question = quizQuestions[currentQuestion]

  const handleAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex)
    setAnswered(true)

    if (optionIndex === question.correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setAnswered(false)
      setSelectedAnswer(null)
    } else {
      setQuizComplete(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setScore(0)
    setAnswered(false)
    setSelectedAnswer(null)
    setQuizComplete(false)
  }

  if (quizComplete) {
    const percentage = (score / quizQuestions.length) * 100

    return (
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-card/30 to-background">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-card to-background border-2 border-primary rounded-2xl p-12 text-center animate-scale-up">
            <div className="text-6xl mb-6">
              {percentage === 100 ? "🏆" : percentage >= 80 ? "🎉" : percentage >= 60 ? "👍" : "📚"}
            </div>

            <h2 className="text-4xl font-bold mb-4">Hoàn Thành!</h2>
            <p className="text-2xl text-primary font-bold mb-2">
              {score}/{quizQuestions.length} Câu Đúng
            </p>
            <p className="text-xl text-muted-foreground mb-8">{percentage.toFixed(0)}%</p>

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-8 text-left">
              <p className="font-bold mb-3">Đánh Giá:</p>
              {percentage === 100 && <p>Tuyệt vời! Bạn là chuyên gia lịch sử vật liệu!</p>}
              {percentage >= 80 && percentage < 100 && <p>Rất tốt! Bạn hiểu rõ về lịch sử vật liệu.</p>}
              {percentage >= 60 && percentage < 80 && <p>Tốt! Bạn có kiến thức cơ bản tốt.</p>}
              {percentage < 60 && <p>Hãy xem lại các phần để hiểu rõ hơn!</p>}
            </div>

            <button
              onClick={handleRestart}
              className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all hover:scale-105"
            >
              Làm Lại
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background to-card/20">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-balance">Quiz Nâng Cao</h2>
        <p className="text-center text-muted-foreground mb-12 text-balance">
          Kiểm tra kiến thức của bạn về lịch sử vật liệu
        </p>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">
              Câu {currentQuestion + 1}/{quizQuestions.length}
            </span>
            <span className="text-sm font-medium text-primary">
              {question.difficulty === "easy" && "Dễ"}
              {question.difficulty === "medium" && "Trung Bình"}
              {question.difficulty === "hard" && "Khó"}
            </span>
          </div>
          <div className="w-full bg-card rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-gradient-to-br from-card to-background border-2 border-border rounded-2xl p-8 mb-8 animate-scale-up">
          <h3 className="text-2xl font-bold mb-8">{question.question}</h3>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => !answered && handleAnswer(idx)}
                disabled={answered}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  selectedAnswer === idx
                    ? idx === question.correct
                      ? "border-green-500 bg-green-500/10"
                      : "border-red-500 bg-red-500/10"
                    : answered && idx === question.correct
                      ? "border-green-500 bg-green-500/10"
                      : "border-border hover:border-primary/50"
                } ${answered ? "cursor-default" : "cursor-pointer hover:scale-105"}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {answered && idx === question.correct && <span className="text-green-500">✓</span>}
                  {answered && selectedAnswer === idx && idx !== question.correct && (
                    <span className="text-red-500">✗</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Explanation */}
          {answered && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-8 animate-scale-up">
              <p className="font-bold mb-2">Giải Thích:</p>
              <p className="text-sm">{question.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {answered && (
            <button
              onClick={handleNext}
              className="w-full py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all hover:scale-105 animate-scale-up"
            >
              {currentQuestion === quizQuestions.length - 1 ? "Hoàn Thành" : "Câu Tiếp Theo"}
            </button>
          )}
        </div>

        {/* Score Display */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Điểm hiện tại: <span className="text-primary font-bold">{score}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
