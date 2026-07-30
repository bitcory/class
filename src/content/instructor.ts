// 강사 정보 — 이력서(resume-site/index.html) 기준.
// 사진은 public/instructor.jpg 로 넣으면 바로 반영됩니다.

export const instructor = {
  name: "김진욱",
  nickname: "툴비",
  role: "생성형 AI 활용 실무 · 담당 강사",
  headline:
    "AI에 끌려다니지 않고, 'AI를 다루는 사람'이 되도록 돕습니다.",
  // 얼굴이 크게 보이도록 상반신만 잘라 쓴다. 원본 전신 사진은 /instructor.jpg
  photo: "/instructor-portrait.jpg",
  // 자세한 경력은 아래 '걸어온 길'에 있으니, 여기서는 세 문장만.
  intro: [
    "AI 교육 브랜드 '아이크루(AICREW)'를 운영합니다. 보조강사 4명과 함께 342명을 가르치고 있고, EBS 특강에서는 경기영상고 학생들을 만났습니다.",
    "저는 컴퓨터공학 전공자가 아닙니다. 5년째 AI에게 말을 걸어서 프로그램을 만듭니다. 지금 보고 계신 이 사이트도 그렇게 만들었습니다.",
    "\"저는 컴퓨터를 잘 몰라서요\" — 가장 많이 듣는 말입니다. 괜찮습니다. 이 수업은 컴퓨터를 잘하는 법이 아니라, AI에게 말 거는 법을 배우는 시간입니다.",
  ],
  teaches: [
    {
      title: "어려운 말을 쓰지 않습니다",
      desc: "전문 용어는 반드시 비유로 바꿔서 설명합니다. 모르는 단어가 나오면 그 자리에서 물어보세요.",
    },
    {
      title: "저와 함께 하나씩 배워봅니다.",
      desc: "새 화면이 나오면 먼저 시연하고, 다 같이 따라 한 뒤 다음으로 넘어갑니다.",
    },
    {
      title: "손에 결과물이 남습니다",
      desc: "설명만 듣고 끝나지 않습니다. 매 시간 직접 만든 것이 하나씩 남습니다.",
    },
    {
      title: "한 사람도 안 놓칩니다",
      desc: "진도보다 사람이 먼저입니다. 못 따라오시면 손만 들어 주세요.",
    },
  ],
  career: [
    {
      year: "현재",
      text: "(주)알앤픽 대표이사 — 렌탈 유통 사업 총괄 및 경영 전반",
    },
    {
      year: "현재",
      text: "아이크루(AICREW) 대표 — AI 영상 제작, 기업·기관 대상 AI 강의 기획·진행",
    },
    {
      year: "5년째",
      text: "AI 개발자 — 바이브코딩으로 웹서비스·업무 도구를 직접 제작",
    },
    {
      year: "이전",
      text: "스테이지파이브(카카오 계열사) 부사장 — 통신·플랫폼 사업 경영 참여",
    },
    {
      year: "이전",
      text: "(주)제이콥소프트 영업대표 — 소프트웨어 개발 사업 영업 총괄",
    },
    { year: "이전", text: "씨에스렌탈 대표 — 렌탈 사업 경영 총괄" },
    {
      year: "이전",
      text: "농협 · 동부캐피탈 · 웰컴저축은행 등 금융기관 영업·여신 실무",
    },
  ],
  lectures: [
    "EBS 특강 — 경기영상고등학교 3학년 대상 영상 제작 강의",
    "기업·기관 강의 — AI 기초 입문 · 코딩 · 영상 제작",
    "당근 소모임 기반 오프라인 AI 강의 (누적 280명)",
    "오픈채팅방 기반 온라인 AI 강의 (누적 113명)",
    "아이크루 아카데미 운영 — 제로 · 업 · 프로 · 마스터 4단계 과정",
    "대학원 생성형 AI 활용 실무 4주 과정 — 지금 이 수업입니다",
  ],
  /** 수업에서 실제로 다루는 도구들 */
  tools: [
    "챗지피티",
    "제미나이",
    "클로드",
    "노트북LM",
    "Midjourney",
    "Kling AI",
    "Higgsfield",
  ],
  contact: [
    {
      label: "수업 단톡방 들어가기",
      value: "카카오톡 오픈채팅",
      href: "https://open.kakao.com/o/gqDZndGi",
      icon: "chat" as const,
      className: "bg-[#FEE500] text-[#391B1B] hover:bg-[#FEE500]/90",
    },
    {
      label: "이메일로 문의하기",
      value: "aitoolbee79@gmail.com",
      href: "mailto:aitoolbee79@gmail.com",
      icon: "mail" as const,
      className: "bg-[#3B82F6] text-white hover:bg-[#3B82F6]/90",
    },
    {
      label: "아이크루 아카데미",
      value: "aicrew.rnpick.com",
      href: "https://aicrew.rnpick.com",
      icon: "link" as const,
      className: "bg-primary text-primary-foreground hover:bg-primary/90",
    },
  ],
};
