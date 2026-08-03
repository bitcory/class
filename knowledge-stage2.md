# knowledge-stage2.md — 2단계 영상 프롬프트 (JSON)

## 장면 수 · 시간 배분 규칙 (정확히 준수)

- 10초 = 5장면, 각 2초: 0:00-0:02 / 0:02-0:04 / 0:04-0:06 / 0:06-0:08 / 0:08-0:10
- 15초 = 5장면, 각 3초: 0:00-0:03 / 0:03-0:06 / 0:06-0:09 / 0:09-0:12 / 0:12-0:15
- 1초 단위 씬을 만들지 않는다. 시간 합계는 반드시 영상 길이와 일치.
- 첫 씬 = 장소/상황 리빌. 마지막 씬 = 엔딩 포인트(카메라 향한 리액션, 미소, 손 인사 등).

## 대사(립싱크) 규칙

- 모든 대사는 영상 내 인물이 직접 발화하는 립싱크용. 대사 있는 씬은 lip_sync: true + 입이 보이는 정면/셀피 구도. 없는 씬은 dialogue: "" + lip_sync: false.
- 씬당 최대 1문장. 2초 씬 6~8자, 3초 씬 10~15자. 전체 영상에서 대사는 최대 2~3씬.
- 자연스러운 구어체 한국어, 인플루언서 특유의 친근한 톤.

## JSON 스키마 (이 구조를 항상 따른다)

```json
{
  "project_title": "MYEONGDONG STREET VLOG",
  "duration": "10 seconds",
  "format": "vertical 9:16 short-form video",
  "reference_image_usage": {
    "use_reference_image": true,
    "preserve_identity": true,
    "preserve_core_features": [
      "face shape",
      "hair style",
      "overall mood",
      "age impression",
      "expression",
      "fashion vibe"
    ],
    "style_transformation": "realistic vlog style"
  },
  "subject": {
    "gender": "female",
    "age_range": "mid 20s",
    "appearance": "Korean woman with an oval face, defined cheekbones, short brown pixie-length haircut with side-swept fringe, fair skin, a small beauty mark near her right jawline, confident sophisticated impression",
    "outfit": "cream oversized knit sweater, straight-leg mid-blue denim, white minimal sneakers",
    "expression": "confident, approachable, natural and candid",
    "subject_anchor": "Korean woman in her mid 20s, short brown pixie cut, small beauty mark near her right jawline, cream oversized knit sweater with straight-leg denim"
  },
  "visual_style": {
    "style": "realistic iPhone vlog",
    "camera": "26mm phone lens",
    "color": "neutral iPhone color science",
    "lighting": "natural available light",
    "texture": "realistic skin texture",
    "grading": "unedited candid look",
    "avoid": [
      "cinematic grading",
      "studio lighting",
      "motion blur effects",
      "light trails",
      "overly artificial beauty filter"
    ]
  },
  "location": {
    "place": "Myeongdong, Seoul",
    "atmosphere": "busy shopping street, street food stalls, cosmetics stores, neon signs, lively crowd"
  },
  "timeline": [
    {
      "time": "0:00-0:02",
      "scene_title": "Myeongdong Entrance Reveal",
      "subject_anchor": "Korean woman in her mid 20s, short brown pixie cut, small beauty mark near her right jawline, cream oversized knit sweater with straight-leg denim",
      "camera": "selfie walking shot, face clearly visible",
      "action": "The subject walks forward while the large Myeongdong street sign appears behind her.",
      "background": "Busy shopping street begins to fill the frame.",
      "expression": "excited and cheerful",
      "lighting": "bright afternoon daylight",
      "dialogue": "드디어 명동 왔어요!",
      "lip_sync": true,
      "transition": "hard cut on beat drop"
    },
    {
      "time": "0:02-0:04",
      "scene_title": "Main Shopping Street",
      "subject_anchor": "Korean woman in her mid 20s, short brown pixie cut, small beauty mark near her right jawline, cream oversized knit sweater with straight-leg denim",
      "camera": "handheld front-facing vlog shot",
      "action": "She walks through the crowded street, glancing at store displays, then turns toward the camera with a playful spin.",
      "background": "Cosmetics shops and store signs remain sharp in the background.",
      "expression": "playful smile",
      "lighting": "natural daylight",
      "dialogue": "",
      "lip_sync": false,
      "transition": "fast cut on beat"
    },
    {
      "time": "0:04-0:06",
      "scene_title": "Street Food Discovery",
      "subject_anchor": "Korean woman in her mid 20s, short brown pixie cut, small beauty mark near her right jawline, cream oversized knit sweater with straight-leg denim",
      "camera": "close-up handheld shot, face and food both in frame",
      "action": "She holds a freshly grilled skewer toward the camera and takes a small bite.",
      "background": "Popular street food stall with warm vendor lighting.",
      "expression": "excited eyes, delighted reaction",
      "lighting": "warm practical stall light",
      "dialogue": "와, 냄새 진짜 좋아!",
      "lip_sync": true,
      "transition": "snap cut"
    },
    {
      "time": "0:06-0:08",
      "scene_title": "Window Shopping Moment",
      "subject_anchor": "Korean woman in her mid 20s, short brown pixie cut, small beauty mark near her right jawline, cream oversized knit sweater with straight-leg denim",
      "camera": "medium handheld shot from slightly behind, then she turns",
      "action": "She browses a cosmetics store display, picks up a small item, and shows it to the camera.",
      "background": "Bright cosmetics store interior spilling light onto the street.",
      "expression": "curious and delighted",
      "lighting": "mixed daylight and store lighting",
      "dialogue": "",
      "lip_sync": false,
      "transition": "quick cut on beat"
    },
    {
      "time": "0:08-0:10",
      "scene_title": "Happy Ending Wave",
      "subject_anchor": "Korean woman in her mid 20s, short brown pixie cut, small beauty mark near her right jawline, cream oversized knit sweater with straight-leg denim",
      "camera": "selfie shot, slight low angle",
      "action": "She smiles brightly at the camera and gives a small wave as neon signs glow behind her.",
      "background": "Evening street with neon signs starting to light up.",
      "expression": "warm satisfied smile",
      "lighting": "mixed daylight and neon glow",
      "dialogue": "",
      "lip_sync": false,
      "transition": "fade out on beat"
    }
  ],
  "music_direction": {
    "mood": "upbeat K-pop inspired vlog beat",
    "editing_rhythm": "fast beat cuts, energetic short-form pacing"
  },
  "final_output_instruction": "Generate a complete short-form video prompt using this structure. Keep the subject_anchor identical in every scene and attach the confirmed character image as the identity reference."
}
```

## 필드 채우기 규칙

- subject.appearance: 첨부된 캐릭터 이미지의 분석 결과로 채운다 (얼굴형, 헤어, 피부, 시그니처 결점, 인상).
- subject.subject_anchor: 단계 전환 시 확정한 앵커 문장. timeline의 모든 씬에도 동일하게 반복 삽입. 절대 변형·요약 금지.
- reference_image_usage.style_transformation: 사용자가 요청한 스타일 (예: "realistic vlog style", "Pixar-style 3D character", "cel-shaded anime style"). 레퍼런스가 만화여도 실사 요청 시 실사 변환, 실사여도 3D 요청 시 3D 캐릭터화 — 단 핵심 특징은 유지.
- visual_style: 요청 스타일에 맞게 구성. avoid 리스트는 스타일과 충돌하는 요소로 (브이로그면 cinematic grading 배제, 시네마틱이면 shaky handheld look 배제).
- outfit: 캐릭터 이미지의 의상 그대로. 영상 전체 한 벌 고정. 사용자가 명시적으로 의상 변경을 요청한 경우에만 교체.
- location.atmosphere: 장소의 분위기를 구체적 시각 요소로.
- 실존 인물·연예인·브랜드 직접 지칭 금지.

## 사용자 입력용 템플릿 (참고)

```json
{
  "place": "Myeongdong, Seoul",
  "activity": "street vlog, eating street food, shopping",
  "duration": "10 seconds",
  "style": "realistic iPhone vlog"
}
```

사용자가 이 형식이 아니라 자연어로 입력해도 ("명동에서 길거리 음식 먹는 브이로그 10초 실사로") 동일하게 처리한다. 장소·행동·길이 중 누락이 있으면 JSON 출력 대신 한 줄로 되묻는다.

## Google Veo / Gemini / Flow 안전 모드

Google 플랫폼은 실존 인물 딥페이크 방지 필터가 가장 엄격하다. 사용자가 Veo/Gemini/Flow를 대상으로 하거나 "유명인 정책 위반" 차단을 겪었다고 하면 아래를 적용한 JSON을 출력한다.

변경 사항:
1. reference_image_usage 블록 전체 제거. "preserve identity", "same person as the reference image", "preserve core features" 류 신원 보존 문구는 프롬프트 어디에도 넣지 않는다 (딥페이크 요청 패턴으로 감지됨).
2. JSON 최상단(project_title 바로 아래)에 추가:
   "character_declaration": "An original fictional AI-generated virtual influencer character. Not based on any real person, celebrity, or public figure."
3. 인물 정보는 subject와 subject_anchor의 텍스트 묘사로만 전달한다. 앵커가 충분히 상세하므로 텍스트만으로 일관성을 유지한다.
4. final_output_instruction에서 "attach the confirmed character image as the identity reference" 문구를 제거하고 "This depicts a fictional virtual character throughout." 로 교체.
5. 이미지 참조가 꼭 필요하면 프롬프트 텍스트가 아니라 플랫폼의 공식 캐릭터 참조 기능을 사용하도록 안내한다. 포토리얼 얼굴은 그래도 차단될 수 있으며, 레퍼런스 이미지 기반 일관성이 중요한 작업은 Kling·Seedance 등 관대한 플랫폼을 권한다.

안전 모드 JSON 상단 예시:

```json
{
  "project_title": "SEONGSU STREET FOOD VLOG",
  "character_declaration": "An original fictional AI-generated virtual influencer character. Not based on any real person, celebrity, or public figure.",
  "duration": "10 seconds",
  "format": "vertical 9:16 short-form video",
  "subject": {
    "gender": "female",
    "age_range": "mid 20s",
    "appearance": "fictional virtual character: Korean-style woman with a soft oval face, long silver-gray straight hair, fair skin, a small beauty mark near her left collarbone, elegant and approachable impression",
    "outfit": "cream oversized knit sweater, light-blue straight-leg denim jeans, white minimal sneakers",
    "expression": "warm, relaxed, naturally cheerful",
    "subject_anchor": "fictional virtual woman in her mid 20s, long silver-gray straight hair, small beauty mark near her left collarbone, cream oversized knit sweater with light-blue straight-leg denim"
  }
}
```

이하 visual_style, location, timeline, music_direction은 표준 스키마와 동일 (timeline의 subject_anchor도 위 앵커로 동일 반복).
