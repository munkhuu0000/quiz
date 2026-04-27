import { Login } from "./Login";

const QUIZ_PREVIEW = [
  {
    id: 1,
    question: "Монгол улсын нийслэл аль нь вэ?",
    answers: ["А. Эрдэнэт", "В. Дархан", "С. Улаанбаатар", "D. Ховд"],
    correctIndex: 2,
  },
  {
    id: 2,
    question: "Дэлхийн нарыг хэдэн өдөрт тойрдог вэ?",
    answers: ["А. 365 өдөр", "В. 24 цаг", "С. 30 өдөр", "D. 7 өдөр"],
    correctIndex: 0,
  },
  {
    id: 3,
    question: "Усны химийн томьёо аль вэ?",
    answers: ["А. CO₂", "В. H₂O", "С. O₂", "D. NaCl"],
    correctIndex: 1,
  },
  {
    id: 4,
    question: "Хүний биеийн хамгийн том эрхтэн аль вэ?",
    answers: ["А. Зүрх", "В. Уушиг", "С. Элэг", "D. Арьс"],
    correctIndex: 3,
  },
  {
    id: 5,
    question: "9 × 7 = ?",
    answers: ["А. 54", "В. 63", "С. 72", "D. 81"],
    correctIndex: 1,
  },
] as const;

const FEATURES = [
  {
    title: "Хурдан үүсгэнэ",
    description:
      "Сэдвээ оруулаад хэдхэн секундэд бэлэн 5 асуулттай quiz-ээ аваарай.",
    accent: "from-[#dcebff] to-[#f2f7ff]",
    icon: <LightningIcon className="text-[#2f68ff]" />,
  },
  {
    title: "5 асуулт автоматаар",
    description:
      "AI технологиор сэдэвт тохирсон 5 асуулт, сонголттойгоор автоматаар үүснэ.",
    accent: "from-[#ece9ff] to-[#f6f3ff]",
    icon: <ChecklistIcon className="text-[#6650ff]" />,
  },
  {
    title: "Хялбар ашиглах",
    description:
      "Энгийн, ойлгомжтой интерфэйс. Бүх насныханд тохиромжтой, ямар ч төхөөрөмжөөс ашиглана.",
    accent: "from-[#defced] to-[#eefcf5]",
    icon: <SmileIcon className="text-[#16b86d]" />,
  },
] as const;

export function HomeLanding() {
  return (
    <div className="min-h-screen px-4 py-5 sm:px-6 sm:py-6">
      <div className="mx-auto max-w-375">
        <header className="rounded-[28px] border border-white/80 bg-white/90 px-7 py-4 shadow-[0_20px_45px_rgba(40,66,150,0.08)] backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <p className="bg-[linear-gradient(135deg,#2d5cff_0%,#6246ff_100%)] bg-clip-text text-3xl font-black tracking-tight text-transparent">
              Quiz5
            </p>
            <Login />
          </div>
        </header>

        <main className="relative mt-7 overflow-hidden rounded-[36px] border border-white/70 bg-[linear-gradient(180deg,#ffffff_0%,#f7f9ff_100%)] shadow-[0_35px_80px_rgba(64,94,183,0.10)]">
          <div className="pointer-events-none absolute -left-18 bottom-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.12)_0%,rgba(99,102,241,0.03)_52%,transparent_72%)]" />
          <div className="pointer-events-none absolute -right-14 top-12 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(49,87,255,0.16)_0%,rgba(49,87,255,0.05)_48%,transparent_74%)]" />
          <div className="pointer-events-none absolute right-32 top-24 h-3 w-3 rotate-45 rounded-sm bg-[#cfd9ff]" />
          <div className="pointer-events-none absolute bottom-28 left-[45%] h-2.5 w-2.5 rounded-full bg-[#a78bfa]" />
          <div className="grid gap-10 px-5 py-7 sm:px-8 sm:py-9 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:px-12 lg:py-12">
            <section className="relative pl-2 lg:pl-1">
              <h1 className="max-w-2xl text-4xl font-black leading-[1.12] tracking-[-0.03em] text-[#0f1b52] sm:text-5xl lg:text-[4.25rem]">
                5 асуулттай <span className="text-[#3e57ff]">quiz-ээ</span>
                <br />
                хэдхэн секундэд <span className="text-[#4a5cff]">үүсгэнэ.</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-9 text-[#52608f] sm:text-[2rem] sm:leading-[1.7]">
                Хичээлийн сэдвээ оруулаад автоматаар 5 асуулттай quiz бэлдээрэй.
                Сурагч, багш, бие даан суралцагчдад тохиромжтой.
              </p>

              <div className="mt-14 flex items-end gap-6">
                <div className="relative">
                  <div className="absolute bottom-2 left-6 h-4 w-34 rounded-full bg-[#d9deff]" />
                  <div className="absolute bottom-6 left-2 h-9 w-28 -rotate-6 rounded-[1.1rem] bg-[linear-gradient(135deg,#6e61ff_0%,#8c6fff_100%)] shadow-[0_16px_28px_rgba(100,92,255,0.28)]" />
                  <div className="absolute bottom-8 left-6 h-7 w-24 rotate-6 rounded-2xl bg-[#8194ff]" />
                  <div className="relative ml-6 flex h-22 w-36 items-center justify-center rounded-[1.3rem] bg-[linear-gradient(180deg,#1645b9_0%,#112d74_100%)] shadow-[0_24px_42px_rgba(35,61,157,0.25)]">
                    <div className="absolute top-4 h-4 w-14 rounded-full bg-[#0b245f]" />
                    <div className="absolute bottom-4 h-5 w-18 rounded-full bg-[#0d2e7f]" />
                    <div className="h-0 w-0 border-l-22 border-r-22 border-t-16 border-l-transparent border-r-transparent border-t-[#f5b327]" />
                    <div className="absolute -right-2 top-10 h-12 w-1 rounded-full bg-[#f5b327]" />
                  </div>
                </div>
                <div className="mb-3 grid gap-10 text-[#8f97d8]">
                  <StarSparkle />
                  <StarSparkle />
                </div>
              </div>
            </section>

            <section className="relative">
              <div className="rounded-4xl border border-[#e6ebff] bg-white/95 p-4 shadow-[0_30px_70px_rgba(65,91,190,0.14)] sm:p-6">
                <div className="grid gap-4">
                  {QUIZ_PREVIEW.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-[22px] border border-[#e8ebf7] bg-white px-4 py-4 shadow-[0_8px_22px_rgba(72,97,168,0.06)] sm:px-5"
                    >
                      <div className="flex gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1f66ff] text-sm font-bold text-white">
                          {item.id}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-base font-bold leading-6 text-[#1b2955] sm:text-[1.08rem]">
                            {item.question}
                          </p>
                          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-[#485682] sm:grid-cols-4 sm:text-base">
                            {item.answers.map((answer, index) => (
                              <span
                                key={answer}
                                className={`rounded-full px-3 py-2 text-center ${
                                  index === item.correctIndex
                                    ? "bg-[#daf3df] text-[#2c6a32]"
                                    : "text-[#4f5c86]"
                                }`}
                              >
                                {answer}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="rounded-[28px] border border-white/80 bg-white/92 p-6 shadow-[0_20px_45px_rgba(40,66,150,0.08)]"
            >
              <div
                className={`flex h-18 w-18 items-center justify-center rounded-full bg-linear-to-br ${feature.accent}`}
              >
                {feature.icon}
              </div>
              <h2 className="mt-6 text-2xl font-black tracking-tight text-[#112257]">
                {feature.title}
              </h2>
              <p className="mt-4 text-lg leading-9 text-[#5a6791]">
                {feature.description}
              </p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

function LightningIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      fill="none"
      className={`h-9 w-9 ${className}`}
    >
      <path
        d="M18.4 3 8.9 17.1h6l-1.3 11.9 9.5-14h-6L18.4 3Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChecklistIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      fill="none"
      className={`h-9 w-9 ${className}`}
    >
      <rect
        x="7"
        y="5.5"
        width="18"
        height="21"
        rx="4.5"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <path
        d="M12 3.8h8M11.5 13h8m-8 6h8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="m11.4 13.1 1.5 1.5 2.2-2.5m-3.7 7.1 1.5 1.5 2.2-2.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SmileIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      fill="none"
      className={`h-9 w-9 ${className}`}
    >
      <circle
        cx="16"
        cy="16"
        r="10.5"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <path
        d="M12.5 19.2c.8 1.4 2.2 2.3 3.5 2.3s2.7-.9 3.5-2.3M12.6 13.4h.1m6.6 0h.1"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StarSparkle() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-7 w-7">
      <path
        d="M10 2.5 11.5 8 17 9.5l-5.5 1.5L10 16.5 8.5 11 3 9.5 8.5 8 10 2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
