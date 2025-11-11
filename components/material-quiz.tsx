"use client"

import { useState } from "react"

export default function MaterialQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [answered, setAnswered] = useState(false)

  const questions = [
    {
      question: "Vật liệu nào được sử dụng lâu nhất trong lịch sử nhân loại?",
      options: ["Nhựa", "Gỗ", "Kim loại", "Đá"],
      correct: 3,
      explanation: "Đá được con người sử dụng từ hơn 3 triệu năm trước, là vật liệu lâu đời nhất.",
    },
    {
      question: "Phương pháp Bessemer được phát minh để làm gì?",
      options: ["Sản xuất nhựa", "Sản xuất thép hàng loạt", "Khai thác đá", "Xử lý gỗ"],
      correct: 1,
      explanation: "Phương pháp Bessemer cho phép sản xuất thép hàng loạt với chi phí thấp, cách mạng hóa công nghiệp.",
    },
    {
      question: "Kỷ nguyên Nhựa bắt đầu vào năm nào?",
      options: ["1900", "1950", "1980", "2000"],
      correct: 1,
      explanation: "Nhựa tổng hợp bắt đầu được sử dụng rộng rãi từ những năm 1950.",
    },
    {
      question: "Graphene là vật liệu gì?",
      options: ["Một loại nhựa", "Một loại kim loại", "Một dạng của carbon", "Một loại đá"],
      correct: 2,
      explanation: "Graphene là một dạng của carbon với tính chất vượt trội, được coi là vật liệu của tương lai.",
    },
    {
      question: "Vật liệu nào có chi phí sản xuất thấp nhất?",
      options: ["Đá", "Kim loại", "Gỗ", "Nhựa"],
      correct: 3,
      explanation: "Nhựa có chi phí sản xuất thấp nhất, điều này giúp nó trở nên phổ biến trong tiêu dùng.",
    },
  ]

  const handleAnswer = (index: number) => {
    if (answered) return

    setAnswered(true)
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setAnswered(false)
    } else {
      setShowResult(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setAnswered(false)
  }

  if (showResult) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto relative z-10">
        <div className="bg-card border border-border rounded-lg p-8 text-center animate-scale-up">
          <div className="text-6xl font-bold text-primary mb-4">
            {score}/{questions.length}
          </div>
          <h2 className="text-3xl font-bold mb-4">
            {score === questions.length
              ? "Tuyệt vời! Bạn là chuyên gia lịch sử vật liệu!"
              : score >= 3
                ? "Rất tốt! Bạn hiểu rất nhiều về lịch sử vật liệu."
                : "Tốt! Hãy tìm hiểu thêm về lịch sử vật liệu."}
          </h2>
          <button
            onClick={resetQuiz}
            className="mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition"
          >
            Làm lại
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto relative z-10">
      <div className="bg-card border border-border rounded-lg p-8 animate-scale-up">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-muted-foreground">
              Câu {currentQuestion + 1}/{questions.length}
            </span>
            <div className="w-32 h-2 bg-border rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">{questions[currentQuestion].question}</h2>

        <div className="space-y-3 mb-8">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={answered}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all transform hover:scale-105 ${
                answered
                  ? index === questions[currentQuestion].correct
                    ? "border-green-500 bg-green-500/10"
                    : index === (answered ? questions[currentQuestion].correct : -1)
                      ? "border-red-500 bg-red-500/10"
                      : "border-border"
                  : "border-border hover:border-primary"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option}</span>
                {answered && index === questions[currentQuestion].correct && <span>✓</span>}
              </div>
            </button>
          ))}
        </div>

        {answered && (
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6 animate-scale-up">
            <p className="text-sm text-foreground">{questions[currentQuestion].explanation}</p>
          </div>
        )}

        {answered && (
          <button
            onClick={handleNext}
            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition"
          >
            {currentQuestion === questions.length - 1 ? "Xem kết quả" : "Câu tiếp theo"}
          </button>
        )}
      </div>
    </section>
  )
}
