import type { Week } from "@/lib/deck-types";

// 출처: 1주차 강사 대본 (생성형 AI·LLM의 이해 + AI로 문서 작성)
// 수강생 화면 문구는 쉬운 한국어, 강사 대본은 notes 에만 담는다.

export const week1: Week = {
  week: 1,
  title: "AI와 처음 만나기",
  summary:
    "AI가 무엇인지 감을 잡고, 챗지피티에 가입해서, 오늘 안에 보고서 한 편을 만들어 봅니다.",
  duration: "3시간 30분 (210분)",
  status: "ready",
  slides: [
    {
      id: "cover",
      nav: "표지",
      tone: "concept",
      type: "cover",
      label: "1주차",
      title: "AI와 처음 만나기",
      subtitle:
        "AI는 어렵지 않습니다. 말만 걸 줄 알면 됩니다.",
      meta: ["3시간", "생성형 AI·LLM의 이해 + AI로 문서 작성"],
      notes: {
        time: "0~10분",
        say: [
          "여러분, AI 어렵지 않습니다. 오늘 딱 하나만 기억하세요 — AI는 '말이 통하는 아주 똑똑한 조수'입니다.",
          "컴퓨터 잘 몰라도 됩니다. 말만 걸 줄 알면 돼요. 오늘 끝나면 여러분 손으로 보고서 한 편이 만들어져 있을 겁니다.",
          "그리고 오늘 배우는 건 손주 자랑거리가 아니라, 여러분 논문과 실무에 진짜 쓰는 도구입니다.",
        ],
        tip: [
          "먼저 \"스마트폰으로 검색해보신 적 있죠?\"처럼 익숙한 것에서 출발하면 문턱이 낮아집니다.",
          "새 화면은 반드시 '같이 한 칸씩' — 강사 시연 후 따라 하게 합니다.",
        ],
      },
    },
    {
      id: "hello",
      nav: "강사 인사",
      tone: "concept",
      type: "story",
      title: "저도 처음부터 AI를 알던 사람이 아닙니다",
      lead:
        "혹시 '씨티폰' 기억하세요? 공중전화 부스 옆에 딱 붙어야만 터지던 그 전화기요. 저는 삐삐를 거쳐 씨티폰까지 다 써 봤습니다.",
      steps: [
        {
          era: "그때",
          title: "삐삐, 그리고 씨티폰",
          desc: "부스 옆에 붙어 있어야 겨우 통화가 됐습니다.",
        },
        {
          era: "그다음",
          title: "애니콜, 접는 폴더폰",
          desc: "전화와 문자가 전부였습니다.\n그마저도 처음엔 어려웠죠.",
        },
        {
          era: "지금",
          title: "스마트폰",
          desc: "카카오톡도 하시고 유튜브도 보십니다. \n어느새 익숙해졌습니다.",
        },
        {
          era: "이제",
          title: "AI",
          desc: "다음 차례는 이것 하나뿐입니다. \n오늘부터 같이 배우시면 됩니다.",
          highlight: true,
        },
      ],
      quote:
        "처음 스마트폰을 사드렸을 때 아버지는 \"불편하고 답답해서 안 쓴다\"고 하셨습니다. \n그런데 지금은 AI와 대화하시고, 사진도 만드시고, 영상도 만드십니다.",
      point:
        "스마트폰도 처음엔 다 어려웠지만 지금은 잘 쓰시죠? AI도 똑같습니다.",
      notes: {
        time: "0~10분",
        say: [
          "안녕하십니까? 여러분의 AI 활용 능력을 확 끌어올려 드릴 강사 김진욱입니다.",
          "사실 저도 처음부터 AI를 잘 안 게 아닙니다. AI를 만나고 나서야 제 일과 삶이 크게 바뀌었어요. 오늘 여러분께 그 변화를 그대로 전해드리려고 합니다.",
          "그 전에 하나 여쭤볼게요. 혹시 '씨티폰' 기억하세요? 공중전화 부스 옆에 딱 붙어야만 터지던 그 전화기요. 저도 삐삐를 거쳐 씨티폰까지 다 써봤습니다.",
          "그다음 애니콜, 접는 폴더폰… 기억나시죠? 그땐 전화랑 문자가 전부였죠. 그런데 지금 여러분은 스마트폰으로 카카오톡도 하고 유튜브도 보시잖아요.",
          "저의 아버지는 처음 스마트폰 사드렸을 때 불편하고 답답하다고 안 쓰신다고 하시더라고요. 그런데 지금은 아버지가 AI랑 대화하고, 사진도 만들고, 영상도 만드십니다.",
          "제가 드리고 싶은 말은 이겁니다 — 스마트폰도 처음엔 다 어려웠지만 지금 잘 쓰시죠? AI도 똑같습니다. 오늘부터 하나씩 저와 함께 배우시면 됩니다.",
        ],
        tip: [
          "삐삐·씨티폰에서 손을 들게 하면 웃음이 터지면서 분위기가 풀립니다. \"기억나시는 분?\" 한 번 물어보세요.",
          "여기서 기술 이야기로 넘어가지 말 것. 이 장의 목적은 '나도 할 수 있겠다'는 마음 하나입니다.",
        ],
      },
    },
    {
      id: "who",
      nav: "이렇게 가르칩니다",
      tone: "concept",
      type: "gallery",
      title: "이미 342분이 이렇게 배우고 계십니다",
      lead:
        "저는 'AICREW' 아카데미를 운영하며, 보조강사 4명과 함께 342명의 수강생을 직접 가르치고 있습니다. EBS에서 경기영상고 학생들도 가르쳤습니다.",
      stats: [
        { value: "342명", label: "직접 가르치고 있는 수강생" },
        { value: "4명", label: "함께하는 보조강사" },
        { value: "EBS", label: "경기영상고 3학년 특강 진행" },
      ],
      photos: [
        {
          src: "/moments/ebs-special.jpg",
          alt: "EBS 특강에서 경기영상고 학생들과 함께 찍은 단체 사진",
          caption: "EBS 특강 · 경기영상고 3학년 영상 제작 수업",
        },
        {
          src: "/moments/class-roundtable.jpg",
          alt: "수강생들이 노트북으로 영상 편집을 실습하는 모습",
          caption: "AICREW 아카데미 · 영상 편집 실습 시간",
        },
        {
          src: "/moments/class-studyroom.jpg",
          alt: "도서관 스터디룸에서 수강생들이 엄지를 들어 보이는 모습",
          caption: "도서관 스터디룸 수업 · 첫 AI 영상을 완성한 날",
        },
        {
          src: "/moments/class-storyboard.jpg",
          alt: "화면을 가리키며 스토리보드를 설명하는 강의 장면",
          caption: "한 화면씩 같이 · 스토리보드 만들기 실습",
        },
      ],
      footer:
        "그러니 \"이거 어렵겠다\" 걱정은 내려놓으셔도 됩니다.",
      notes: {
        time: "0~10분",
        say: [
          "현재 저는 'AICREW'라는 AI 아카데미를 운영하고 있습니다.",
          "EBS에서 경기영상고 학생들을 강의했고, 현재 보조강사 4명과 함께 342명의 수강생을 직접 가르치고 있습니다.",
          "그러니 \"이거 어렵겠다\" 걱정은 내려놓으셔도 됩니다.",
          "이제 여러분은 저와 함께, 사회복지 실무와 여러분의 일상에서 AI로 시간을 아끼고 더 잘 해내는 법을 하나씩 익혀 나가실 겁니다. 자, 그럼 지금부터 시작하겠습니다.",
        ],
        tip: [
          "사진은 한 장씩 짚으며 \"이분들도 처음엔 다 못 하셨어요\" 한마디를 붙이면 효과가 큽니다.",
          "숫자 자랑으로 끝내지 말고 바로 '오늘의 목표'로 넘어가세요. 여기서 길어지면 지칩니다.",
        ],
      },
    },
    {
      id: "goal",
      nav: "오늘의 목표",
      tone: "concept",
      type: "goal",
      title: "오늘 이후에 여러분은 이렇게 변합니다.",
      lead: "세 가지만 하면 오늘은 성공입니다.",
      items: [
        {
          text: "AI가 무엇인지 감을 잡습니다.",
          sub: "원리를 어려운 말 없이, 머리로 이해합니다.",
        },
        {
          text: "실제 많이 활용되는 도구 4가지를 배워봅니다.",
          sub: "챗지피티 · 제미나이 · 클로드 · 노트북LM",
        },
        {
          text: "AI로 보고서를 한 편 만들어 봅니다.",
          sub: "여러분이 직접 생각하고, 물어보고, 결과물을 만들어냅니다.",
        },
      ],
      notes: {
        time: "0~10분",
        tip: [
          "'설명 → 예시 → 바로 실습'을 한 세트로. 머리로 듣고 손으로 확인하게 합니다.",
          "못 따라오는 분이 있으면 옆 사람과 짝꿍으로. 절대 다그치지 않기.",
        ],
      },
    },
    {
      id: "what-is-ai",
      nav: "AI는 똑똑한 조수",
      tone: "concept",
      type: "point",
      title: "AI는 '말이 통하는 아주 똑똑한 조수'",
      lead: "오늘 딱 하나만 기억하시면 됩니다.",
      body: [
        "컴퓨터는 잘 모르셔도 괜찮습니다. 말만 잘 걸어주면 됩니다.",
        "스마트폰으로 검색해 보신 적 있으시죠? 그것보다 쉽습니다.\n검색은 단어를 넣지만, AI는 그냥 말을 걸면 됩니다.",
      ],
      quote: "\"오늘 이후 여러분이 직접 만드신 AI결과물을 보실 수 있습니다.\"",
      notes: {
        time: "10~30분",
        say: [
          "칠판이나 화면에 그림을 그려가며 아주 쉽게 설명합니다.",
        ],
      },
    },
    {
      id: "llm",
      nav: "LLM이란?",
      tone: "concept",
      type: "analogy",
      title: "LLM = 엄청나게 많은 책을 읽은 사람",
      lead: "어려운 영어 단어지만, 뜻은 아주 단순합니다.",
      pairs: [
        {
          term: "L . L . M",
          means: "(Large Language Model) - 엄청나게 많은 책을 읽은 사람",
          caption:
            "인터넷의 방대한 글을 학습해서, 다음에 올 말을 예측하며 문장을 만들어 냅니다.",
        },
        {
          term: "생성형 AI",
          means: "그 지식으로 새로 만들어 주는 것",
          caption: "글도 쓰고, 요약도 하고, 그림도 그립니다.",
        },
      ],
      notes: {
        time: "10~30분",
        say: [
          "사람이 대화하듯 물어보면, 그 방대한 독서량으로 답을 지어내는 겁니다.",
        ],
      },
    },
    {
      id: "generative",
      nav: "무엇을 해주나",
      tone: "concept",
      type: "point",
      title: "그래서 무엇을 해주나요?",
      lead: "말로 부탁하면, 글을 만들어 줍니다.",
      body: [
        "긴 자료를 짧게 요약해 줍니다.",
        "보고서 목차를 잡아 주고, 문장을 다듬어 줍니다.",
        "그림도 만들어 주고, 표로 정리도 해 줍니다.",
        "우리말로 물어보면 우리말로 답합니다.",
      ],
      notes: {
        time: "10~30분",
        tip: ["용어는 쉽게 풀어서. 어려운 영어·전문용어는 최소화합니다."],
      },
    },
    {
      id: "hallucination",
      nav: "⚠️ 환각 주의",
      tone: "warning",
      type: "warning",
      title: "딱 하나만 조심하세요 — 환각",
      lead: "AI는 '틀린 것도 자신 있게' 말합니다.",
      points: [
        "이것을 '환각(할루시네이션)'이라고 부릅니다.",
        "없는 논문, 없는 저자를 진짜처럼 지어내기도 합니다.",
        "그래서 AI가 준 것을 그대로 내면 안 됩니다. 꼭 확인해야 합니다.",
        "'AI가 그랬어요'는 근거가 되지 않습니다.",
        "검증하는 방법은 2주차에 제대로 배웁니다.",
      ],
      notes: {
        time: "10~30분",
        tip: [
          "대학원생에게 이건 특히 중요. 'AI가 그랬어요'는 근거가 안 된다는 점을 미리 심어둡니다.",
        ],
      },
    },
    {
      id: "why-many",
      nav: "도구가 왜 여러 개?",
      tone: "concept",
      type: "analogy",
      title: "도구가 왜 여러 개일까요?",
      lead: "식당도 한식··일식이 있듯, AI도 저마다 잘하는 게 다릅니다.",
      pairs: [
        {
          term: "한식·중식·일식",
          means: "골라서 먹습니다",
          caption: "오늘 뭐가 먹고 싶은지에 따라 고르시죠.",
        },
        {
          term: "AI 도구 4가지",
          means: "골라서 씁니다",
          caption: "무슨 일을 시킬지에 따라 고르면 됩니다.",
        },
      ],
      notes: {
        time: "30~60분",
        say: [
          "식당도 한식·중식·일식이 있듯, AI도 저마다 잘하는 게 다릅니다. 그래서 골라 쓸 줄 알아야 합니다.",
        ],
      },
    },
    {
      id: "toolkit",
      nav: "다양한 도구들",
      tone: "concept",
      type: "toolkit",
      title: "이렇게 다양한 도구들이 있어요",
      lead: "다 몰라도 됩니다. 필요할 때 하나씩 알아가면 됩니다.",
      items: [
        {
          name: "챗지피티",
          group: "LLM",
          icon: "GPT",
          category: "대화·글쓰기",
          blurb: "가장 만능인 조수입니다.",
          color: "bg-emerald-600",
          logo: "https://www.google.com/s2/favicons?domain=chatgpt.com&sz=128",
        },
        {
          name: "제미나이",
          group: "LLM",
          icon: "Gem",
          category: "구글 연동",
          blurb: "검색·메일·문서에 강합니다.",
          color: "bg-blue-500",
          logo: "https://www.gstatic.com/lamda/images/gemini_sparkle_aurora_33f86dc0c0257da337c63.svg",
        },
        {
          name: "클로드",
          group: "LLM",
          icon: "Cl",
          category: "긴 글 분석",
          blurb: "논문처럼 긴 글을 차분히 읽고 씁니다.",
          color: "bg-orange-500",
          logo: "https://www.google.com/s2/favicons?domain=claude.ai&sz=128",
        },
        {
          name: "미드저니",
          group: "이미지 생성",
          icon: "Mj",
          category: "예술 이미지",
          blurb: "완성도 높은 이미지를 만듭니다.",
          color: "bg-neutral-900",
          logo: "https://www.google.com/s2/favicons?domain=midjourney.com&sz=128",
        },
        {
          name: "챗지피티",
          group: "이미지 생성",
          icon: "GPT",
          category: "대화형 이미지",
          blurb: "대화하면서 이미지를 만들고 수정합니다.",
          color: "bg-emerald-600",
          logo: "https://www.google.com/s2/favicons?domain=chatgpt.com&sz=128",
        },
        {
          name: "FLOW",
          group: "이미지 생성",
          icon: "Fl",
          category: "장면 이미지",
          blurb: "장면을 만들고 영상으로 이어갑니다.",
          color: "bg-blue-600",
          logo: "https://www.google.com/s2/favicons?domain=labs.google&sz=128",
        },
        {
          name: "클링",
          group: "영상 생성",
          icon: "Kl",
          category: "영상 생성",
          blurb: "글자를 짧은 동영상으로 만들어 줍니다.",
          color: "bg-violet-500",
          logo: "https://s16-kling.klingai.com/kos/s101/nlav112918/kling-homepage-aio/logo-180x180.png",
        },
        {
          name: "드리미나",
          group: "영상 생성",
          icon: "Dr",
          category: "이미지·영상",
          blurb: "사진과 영상을 그림처럼 그려 줍니다.",
          color: "bg-rose-500",
          logo: "https://p16-seeyou-sg.ibyteimg.com/tos-alisg-i-2zwwjm3azk-sg/40fed40e0bd1411292155e446a0f3a30~tplv-2zwwjm3azk-compress:q90.image",
        },
        {
          name: "런웨이",
          group: "영상 생성",
          icon: "Rw",
          category: "영상 편집·생성",
          blurb: "AI로 영상을 만들고 편집합니다.",
          color: "bg-green-600",
          logo: "https://www.google.com/s2/favicons?domain=runwayml.com&sz=128",
        },
        {
          name: "수노",
          group: "음악 생성",
          icon: "Su",
          category: "음악 생성",
          blurb: "가사만 주면 노래를 만들어 줍니다.",
          color: "bg-neutral-800",
          logo: "https://cdn-o.suno.com/favicon-512x512.png",
        },
        {
          name: "유디오",
          group: "음악 생성",
          icon: "Ud",
          category: "노래 생성",
          blurb: "설명만으로 음악을 만듭니다.",
          color: "bg-purple-600",
          logo: "https://www.google.com/s2/favicons?domain=udio.com&sz=128",
        },
        {
          name: "일레븐랩스",
          group: "음악 생성",
          icon: "11",
          category: "음성·효과음",
          blurb: "목소리와 효과음을 생성합니다.",
          color: "bg-neutral-900",
          logo: "https://www.google.com/s2/favicons?domain=elevenlabs.io&sz=128",
        },
      ],
      footer: "겁먹지 마세요. 오늘은 이 중 '챗지피티' 하나만 제대로 배웁니다.",
      notes: {
        time: "30~60분",
        say: [
          "요즘은 대화형 AI 말고도 슬라이드를 만들어주는 도구, 영상을 만들어주는 도구, 노래까지 만들어주는 도구가 있습니다.",
          "다 알 필요 없습니다. 필요할 때 이름만 검색해서 하나씩 배우시면 됩니다. 오늘은 가장 기본인 챗지피티부터 갑니다.",
        ],
        tip: [
          "이름을 다 외우게 하지 말 것. '이렇게 많다'는 인상만 주고 바로 다음 장(4가지 비교)으로 넘어갑니다.",
        ],
      },
    },
    {
      id: "tools",
      nav: "도구 4가지 비교",
      tone: "concept",
      type: "compare",
      title: "도구 4가지, 뭘 잘하나요?",
      lead: "이름과 역할만 기억하시면 됩니다. 오늘 쓰는 건 챗지피티 하나입니다.",
      tools: [
        {
          name: "챗지피티",
          good: "대화·글쓰기의 기본. 이미지도 만들어 줍니다.",
          say: "가장 만능인 조수. 질문·글쓰기·보고서에 두루 쓰고, 이미지도 '글자까지' 잘 만들어요.",
          note: "오늘 우리가 씁니다",
        },
        {
          name: "제미나이",
          good: "구글 연동. 검색·Gmail·문서·대용량 자료.",
          say: "구글을 많이 쓰시면 편해요. 검색·메일·긴 문서 정리에 강합니다.",
        },
        {
          name: "클로드",
          good: "긴 문서 이해·정교한 글쓰기·문헌 분석.",
          say: "글을 차분하고 깊게 씁니다. 긴 논문·자료 읽고 분석하는 데 강해요.",
          note: "이미지 생성은 안 됩니다",
        },
        {
          name: "노트북LM",
          good: "내 자료(PDF)만 근거로 요약·인용. 연구에 특화.",
          say: "내가 올린 논문 안에서만 답합니다. 그래서 '없는 내용'을 덜 지어내요.",
          note: "2주차 핵심 도구",
        },
      ],
      notes: {
        time: "30~60분",
        tip: ["표는 화면에 띄워 놓고, 하나씩 손으로 짚어가며 읽어 줍니다."],
      },
    },
    {
      id: "one-line",
      nav: "한 줄 요약",
      tone: "concept",
      type: "summary",
      title: "이 네 줄만 외우세요",
      lines: [
        { label: "글 · 보고서 · 이미지", value: "챗지피티" },
        { label: "구글 연동 · 검색", value: "제미나이" },
        { label: "긴 글 · 분석", value: "클로드" },
        { label: "내 자료 연구", value: "노트북LM" },
      ],
      footer: "오늘은 챗지피티로 시작합니다. 나머지는 이름과 역할만 기억하세요.",
      notes: {
        time: "30~60분",
        say: [
          "오늘은 챗지피티로 시작합니다. 나머지는 이름과 역할만 기억하세요.",
        ],
      },
    },
    {
      id: "signup",
      nav: "가입하기",
      tone: "practice",
      type: "steps",
      title: "같이 해봐요 — 가입하기",
      lead: "한 칸씩 같이 갑니다. 앞사람 화면을 보고 천천히 따라오세요.",
      storageKey: "week1-signup",
      steps: [
        {
          label: "chatgpt.com 에 들어갑니다",
          detail:
            "스마트폰이면 앱을 설치하셔도 됩니다. 인터넷 주소창에 chatgpt.com 을 그대로 치세요.",
        },
        {
          label: "'가입(Sign up)'을 누릅니다",
          detail: "화면 가운데나 오른쪽 위에 있습니다.",
        },
        {
          label: "'구글 계정으로 계속하기'를 누릅니다",
          detail:
            "새 비밀번호를 만들 필요가 없어 가장 쉽습니다. 학교 지메일을 권합니다.",
        },
        {
          label: "채팅 입력창과 마이크 버튼을 확인합니다",
          detail:
            "화면 아래 긴 네모칸이 말을 거는 곳입니다. 옆의 마이크 버튼을 누르면 말로 입력할 수 있어요. 타자가 힘드시면 말로 하세요.",
        },
      ],
      notes: {
        time: "60~85분",
        say: ["강사가 화면을 띄우고 아주 천천히 시연한 뒤 따라 하게 합니다."],
        watch: [
          "구글 계정 비밀번호를 잊은 분 → 미리 종이에 적어오도록 공지하면 좋습니다.",
          "이메일 인증 문자를 못 찾는 분 → 스팸함·문자 확인 안내.",
          "화면이 영어로 뜨는 분 → 한국어로 질문하면 한국어로 답한다고 안심시키기.",
        ],
      },
    },
    {
      id: "toy-figure",
      nav: "미니어처 피규어",
      tone: "practice",
      type: "photo-prompt",
      title: "잠깐, 재미로 하나만 — 우리 사진으로 미니어처 피규어 만들기",
      lead: "얼굴과 옷차림이 잘 보이는 사진 한두 장만 있으면 됩니다. 사진을 올린 뒤, 아래 글을 그대로 복사해서 같이 보내보세요.",
      image: {
        src: "/photo-prompts/couple-figure.jpg",
        alt: "귀여운 3D 미니어처 피규어로 만들어진 커플 사진 예시",
        caption: "실제로 이렇게 만들어집니다",
      },
      prompt: {
        id: "w1-toy-figure",
        label: "실습",
        title: "우리 커플 미니어처 피규어",
        hint: "얼굴과 옷차림이 잘 보이는 사진을 먼저 올리고, 이 글을 그대로 복사해서 함께 보내세요.",
        template: `Use the attached reference images as references for facial identity and clothing details. Preserve the facial features, likeness, and outfit designs from the reference images, adapting them into a cute 3D rendered miniature style. Do not change the person's identity. A high-angle 3D rendered portrait of the couple depicted as cute, realistic miniature figurines.

Pose & Composition:
High-angle overhead shot (bird's-eye view) looking down at the subjects. The couple features oversized heads and small bodies (chibi proportions) while looking up at the camera.

Lighting & Color Palette:
Soft, diffused studio lighting creating a toy-photography aesthetic. Bright, warm illumination with realistic shadowing that highlights the 3D textures.

Subject Details:
The faces retain a photorealistic appearance with high-quality skin textures and realistic expressions, blended with a 3D rendered finish. The bodies are small and cute, wearing the exact outfits from the provided reference photos, resized to fit the miniature proportions. Skin is flawless, smooth, and evenly toned.

Background & Atmosphere:
A clean, macro-style background with a strong tilt-shift effect (blurred edges) to emphasize the small scale of the figures. The mood is charming, polished, and artistic.

Style Keywords:
3D render, Octane render, C4D, photorealistic miniature, chibi style, high angle, tilt-shift, macro photography, cute character design, volumetric lighting, 8k, sharp details. --ar 3:4`,
        result: "커플 사진을 귀여운 3D 미니어처 피규어로 바꿔줍니다.",
      },
      notes: {
        time: "10~15분",
        say: [
          "오늘 배운 걸로 이런 것도 됩니다 — 재미로 보여주는 코너입니다.",
        ],
        tip: [
          "사진(개인정보)이 부담스러운 분에게는 강요하지 않습니다. 예시 사진만 봐도 충분합니다.",
        ],
      },
    },
    {
      id: "profile-photo",
      nav: "프로필 사진",
      tone: "practice",
      type: "photo-prompt",
      title: "프로필 사진 만들기 — 더 이상 사진관 갈 필요가 없습니다",
      lead: "정면이 잘 보이는 사진 한 장이면 충분합니다. 사진을 올린 뒤, 아래 글을 그대로 복사해서 같이 보내보세요.",
      image: {
        src: "/photo-prompts/profile-photo.jpg",
        alt: "전문 스튜디오풍으로 만들어진 프로필 사진 예시",
        caption: "실제로 이렇게 만들어집니다",
      },
      prompt: {
        id: "w1-profile-photo",
        label: "실습",
        title: "전문 스튜디오 프로필 사진",
        hint: "정면이 잘 보이는 사진을 먼저 올리고, 이 글을 그대로 복사해서 함께 보내세요.",
        template: `첨부된 모델 이미지를 참고하여 얼굴과 신체적 특징을 표현해 주세요. 맞춤 제작된 검은색 블레이저 안에 흰색 셔츠를 입은 모델을 담은 전문 스튜디오 미디엄 숏 인물 사진입니다. 모델은 팔짱을 끼고 정면을 바라보며 부드럽고 자신감 있는 미소를 짓고 있습니다. 전체적으로 전문적이고 우아한 분위기를 자아냅니다. 시선은 카메라를 똑바로 향하며 유능하고 세련된 인상을 전달합니다. 참고 이미지에 나타난 얼굴의 특징과 골격, 머리카락의 질감, 체형을 정확하게 유지해 주세요.

배경: 짙은 파란색과 적갈색이 얼룩덜룩하게 어우러진 어둡고 질감 있는 스튜디오 배경으로, 분위기 있고 세련된 느낌을 연출합니다.

조명: 전문 스튜디오 조명을 사용해 보는 사람을 기준으로 왼쪽의 머리카락과 어깨를 밝힙니다. 동시에 정면 왼쪽에서 부드럽고 은은한 키 라이트를 비춰 얼굴의 특징과 의상 소재의 질감을 돋보이게 합니다.

포즈: 팔짱을 끼고 몸을 살짝 기울인 자신감 있고 전문적인 자세로 권위와 우아함을 강조합니다.

카메라: 눈높이 앵글과 미디엄 숏 구도를 사용해 오직 인물에게만 초점을 맞추고, 의상과 액세서리의 세부적인 표현을 담아냅니다. Canon EOS R5 풀프레임 미러리스 카메라와 85mm f/1.8 렌즈를 사용한 듯한 선명한 디테일과 부드러운 보케 효과를 구현합니다.

스타일: 고급 스튜디오 사진처럼 풍부한 컬러로 촬영하며, 한 명의 인물을 화면 중앙에 배치해 전문적이고 우아한 분위기를 담아냅니다.

가로세로비율 3:4 사이즈로 출력합니다.`,
        result: "본인 사진을 전문 스튜디오풍 프로필 사진으로 바꿔줍니다.",
      },
      notes: {
        time: "10~15분",
        say: [
          "취업 준비생, 이력서용 사진이 필요한 분들에게 특히 반응이 좋습니다.",
        ],
        tip: [
          "사진(개인정보)이 부담스러운 분에게는 강요하지 않습니다. 예시 사진만 봐도 충분합니다.",
        ],
      },
    },
    {
      id: "first-chat",
      nav: "첫 대화",
      tone: "practice",
      type: "prompt",
      title: "첫 대화를 걸어봅시다",
      lead: "아래 '복사하기'를 누르고, 챗지피티 입력창에 붙여넣고, 보내기만 하면 됩니다.",
      prompts: [
        {
          id: "w1-intro",
          label: "실습 1",
          title: "나를 소개해 달라고 하기",
          hint: "노란 칸은 눌러서 본인 것으로 바꾸셔도 됩니다.",
          template:
            // 빈칸 값에 받침이 있든 없든 자연스럽도록 '분야를'을 붙여 쓴다.
            "안녕? 나는 {{전공}} 분야를 공부하는 대학원생이야. 내 소개를 정중하게 3줄로 써줘.",
          blanks: { 전공: "사회복지" },
          result: "나를 소개하는 문장 3줄이 바로 나옵니다.",
        },
        {
          id: "w1-lunch",
          label: "실습 2",
          title: "가볍게 말 걸어보기",
          hint: "'말이 통한다'를 느껴보는 게 목적입니다.",
          template: "오늘 점심 메뉴 3개만 추천해줘.",
          result: "메뉴 세 가지를 이유와 함께 추천해 줍니다.",
        },
      ],
      notes: {
        time: "85~100분",
        say: [
          "\"어, 진짜 답하네?\"가 나오면 성공입니다. 옆 사람과 결과를 비교하게 하세요.",
        ],
        tip: ["가볍게 웃으며 진행. 성공 경험을 먼저 주는 구간입니다."],
      },
    },
    {
      id: "good-question",
      nav: "좋은 질문의 비밀",
      tone: "practice",
      type: "rules",
      title: "좋은 질문의 비밀 3가지",
      lead: "같은 질문도 이렇게 물으면 답이 확 좋아집니다. 오늘의 핵심 기술입니다.",
      rules: [
        {
          title: "① 역할을 준다",
          desc: "누구처럼 답해 달라고 정해 줍니다.",
          example: "\"너는 사회복지 전문가야.\"",
        },
        {
          title: "② 조건을 준다",
          desc: "얼마나, 어떤 말투로 쓸지 알려 줍니다.",
          example: "\"초보도 알기 쉽게, 3가지로.\"",
        },
        {
          title: "③ 예시를 준다",
          desc: "원하는 모양을 하나 보여 줍니다.",
          example: "\"이런 식으로 써줘: …\"",
        },
      ],
      versus: {
        before: {
          text: "노인복지에 대해 알려줘",
          note: "너무 넓어서 뻔한 답이 옵니다.",
        },
        after: {
          text: "너는 사회복지 전문가야. 노인복지의 핵심을 초보도 알기 쉽게 3가지로 정리해줘.",
          note: "역할 + 조건을 줬더니 답이 확 좋아집니다.",
        },
      },
      notes: {
        time: "100~120분",
        say: [
          "같은 질문도 이렇게 물으면 답이 확 좋아집니다. 이게 오늘의 핵심 기술이에요.",
        ],
        tip: ["칠판에 ①역할 ②조건 ③예시 세 단어만 크게 적어 둡니다."],
      },
    },
    {
      id: "report",
      nav: "보고서 만들기",
      tone: "practice",
      type: "prompt",
      title: "실전 — 보고서 한 편 만들기",
      lead: "1단계부터 순서대로. 노란 칸만 본인 주제로 바꾸시면 됩니다. 2단계까지만 하셔도 성공입니다.",
      prompts: [
        {
          id: "w1-report-1",
          label: "1단계",
          title: "뼈대 잡기 (목차)",
          template:
            "너는 {{분야}} 전문가야. '{{주제}}'로 보고서를 쓸 거야. 목차를 5개로 잡아줘.",
          blanks: { 분야: "사회복지", 주제: "사회복지사의 장래 전망" },
          result: "보고서 목차 5개가 나옵니다.",
        },
        {
          id: "w1-report-2",
          label: "2단계",
          title: "살 붙이기",
          template: "위 목차 중 1번을 300자로, 대학원 보고서 말투로 써줘.",
          result: "본문 한 꼭지가 완성됩니다. 여기까지만 해도 오늘은 성공입니다.",
        },
        {
          id: "w1-report-3",
          label: "3단계",
          title: "다듬기",
          template: "내용을 더 쉽게, 예시를 하나 넣어 다시 써줘.",
          result: "읽기 편한 문장으로 바뀝니다.",
        },
        {
          id: "w1-report-4",
          label: "4단계",
          title: "정리하기",
          template: "전체를 표로 요약해줘.",
          result: "한눈에 보이는 표가 만들어집니다.",
        },
      ],
      notes: {
        time: "120~155분",
        say: [
          "AI가 준 걸 그대로 내지 마세요. 내 말로 고치고, 사실인지 확인해야 합니다. (2주차 검증 예고)",
        ],
        tip: [
          "잘 안 나오면 → 질문을 더 구체적으로. 1부의 역할·조건·예시를 다시 적용하게 합니다.",
          "수강생이 관심 있는 주제로 바꿔도 됩니다.",
        ],
        watch: [
          "시간은 반 정도만 채운다는 마음으로. 50대 대상은 예상보다 느립니다.",
          "못 끝내면 4단계 중 2단계까지만 해도 성공. 완주보다 '한 사람도 안 놓치기'가 우선.",
        ],
      },
    },
    {
      id: "paper-db",
      nav: "논문 DB 검색",
      tone: "practice",
      type: "compare",
      title: "논문은 여기서 찾습니다",
      lead: "학교 도서관 사이트에서도 연결됩니다. 이름만 기억해 두세요.",
      tools: [
        {
          name: "RISS",
          good: "학위논문 + 학술지를 한 번에 검색",
          say: "가장 먼저 검색해 보시면 됩니다. 국내 논문 대부분이 여기 있습니다.",
          note: "오늘 우리가 씁니다",
          url: "https://www.riss.kr",
        },
        {
          name: "DBpia",
          good: "국내 학회지 논문 원문 제공",
          say: "학회에서 낸 논문을 찾을 때 강합니다.",
          url: "https://www.dbpia.co.kr",
        },
        {
          name: "KISS",
          good: "한국학술정보 학술지 검색",
          say: "RISS·DBpia에 없는 논문이 있을 때 확인해 보세요.",
          url: "https://kiss.kstudy.com",
        },
        {
          name: "KCI",
          good: "등재지 여부 확인",
          say: "이 논문이 믿을 만한 학술지에 실렸는지 확인할 때 씁니다.",
          url: "https://www.kci.go.kr",
        },
      ],
      notes: {
        time: "155~170분",
        say: [
          "오늘부터는 AI 없이, 우리가 직접 논문을 찾아보는 연습을 합니다.",
          "국내 논문은 RISS에서 대부분 찾을 수 있습니다. 학위논문이든 학술지 논문이든 여기서 검색이 됩니다.",
          "DBpia·KISS·KCI는 RISS에 없을 때, 또는 이 논문이 믿을 만한지 확인할 때 씁니다.",
        ],
        tip: [
          "화면을 공유해 RISS 검색창에 직접 검색어를 쳐서 결과가 뜨는 걸 보여주면 좋습니다.",
          "사회복지 연구는 클라이언트·취약계층 정보를 다루므로, AI에 실제 사례를 그대로 붙여넣지 않도록 미리 짚어줍니다.",
        ],
      },
    },
    {
      id: "topic-homework",
      nav: "주제 정하기 · 숙제",
      tone: "practice",
      type: "steps",
      title: "오늘의 주제를 정하고, 다음 주까지 이걸 해옵니다",
      lead: "다음 주에는 이 주제로 AI 검색을 해봅니다. 그 전에 먼저 손으로 찾아보는 연습입니다.",
      storageKey: "week1-topic-homework",
      steps: [
        {
          label: "관심 있는 사회복지 주제를 한 줄로 정합니다",
          detail:
            "예: \"치매노인 돌봄자 소진\", \"청소년 자립준비청년 지원정책\"처럼 구체적으로 적어보세요.",
        },
        {
          label: "RISS나 DBpia에서 그 주제로 직접 검색해 봅니다",
          detail: "AI 없이 검색어만으로 찾는 연습입니다. 오늘 배운 이름을 그대로 써 보시면 됩니다.",
        },
        {
          label: "[숙제] 다음 주까지 관련 논문 5편을 찾아 목록으로 정리해 옵니다",
          detail: "제목만 적어 와도 됩니다. 다음 주에 AI로 검색한 결과와 직접 비교해 봅니다.",
        },
      ],
      notes: {
        time: "170~190분",
        say: [
          "오늘 정한 주제는 다음 주까지 그대로 가져갑니다. 이번 주엔 손으로, 다음 주엔 AI로 같은 주제를 검색해서 차이를 비교할 겁니다.",
          "숙제는 논문 5편 찾아오기입니다. 원문을 다 읽어올 필요는 없고, 제목과 저자만 정리해 오시면 됩니다.",
        ],
        tip: [
          "주제가 너무 넓으면 옆에서 좁혀주세요. \"노인복지\" 보다는 \"치매노인 돌봄자 소진\"처럼요.",
          "숙제를 어려워하면 '검색해서 5개 목록만 캡처해 와도 된다'고 부담을 낮춰 주세요.",
        ],
      },
    },
    {
      id: "wrap-up",
      nav: "오늘 정리 · 다음 주",
      tone: "done",
      type: "next",
      title: "오늘 정리하고 마칩니다",
      lead: "첫날에 이 정도면 훌륭합니다.",
      done: [
        "AI가 무엇인지 이해했습니다",
        "챗지피티에 가입하고 첫 대화를 나눴습니다",
        "좋은 질문의 3가지 비밀을 배웠습니다",
        "보고서를 한 편 만들었습니다",
        "논문 검색 DB(RISS 등)를 알아보고 오늘의 주제를 정했습니다",
      ],
      preview: {
        title: "2주차 — 자료 모으기와 검증하기",
        desc: "오늘 손으로 찾은 논문과 비교하며, AI로 진짜 논문 자료를 모으고 그게 진짜인지 확인하는 법을 배웁니다. AI를 연구 조수로 쓰는 진짜 기술이에요.",
      },
      reminders: [
        "오늘 만든 보고서는 저장하거나 화면을 캡처해 두세요.",
        "다음 주까지 오늘 정한 주제로 논문 5편을 찾아 목록으로 정리해 오세요.",
        "궁금한 점은 단톡방에 편하게 올려 주세요.",
      ],
      notes: {
        time: "190~210분",
        say: [
          "오늘 여러분은 AI가 뭔지 이해했고, 가입했고, 보고서를 한 편 만들었고, 논문 검색 DB까지 알아봤습니다. 첫날에 이 정도면 훌륭합니다.",
          "다음 시간엔 오늘 손으로 찾은 논문과 비교하며, AI로 '진짜 논문 자료를 모으고, 그게 진짜인지 검증하는 법'을 배웁니다.",
        ],
        tip: [
          "오늘 만든 보고서를 저장·캡처하도록 꼭 안내합니다.",
          "숙제(논문 5편 찾기)를 다시 한번 짚어주고 마칩니다.",
        ],
      },
    },
  ],
};
