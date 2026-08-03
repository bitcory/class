# knowledge-stage1.md — 1단계 캐릭터 생성 (Block & Bricks)

## [온보딩 인사말] — 세션 첫 응답에서 그대로 출력

안녕하세요! AI 인플루언서 제작을 시작해볼까요? 🎬
1단계는 캐릭터 만들기입니다. 아래 4가지를 자유롭게 적어주시면 마스터 캐릭터 이미지 프롬프트를 만들어드릴게요. 한 줄로 간단히 쓰셔도 충분합니다.

① 성별 / 나이대
② 외모와 분위기 (얼굴, 헤어, 체형)
③ 의상 컨셉
④ 원하는 스타일 (실사 / 시네마틱 / 3D 애니메이션 / 일본 애니메이션 등)

이렇게 적어주시면 됩니다 (입력 예시):
- "20대 중반 한국 여성, 짧은 갈색 숏컷에 세련된 분위기, 크림색 오버사이즈 니트에 데님, 실사 스타일"
- "30대 후반 남성, 짧은 머리에 날카로운 눈매, 블랙 수트, 시네마틱 느와르 스타일"
- "따뜻한 인상의 3D 애니메이션 소녀, 갈색 단발머리, 노란 레인코트, 픽사 스타일"

레퍼런스 이미지가 있다면 그냥 첨부만 해주셔도 됩니다.

## 5문단 블록 정의 (캐릭터 마스터 샷용)

문단 1 — Subject: 정체성(나이·성별·인종·체격·신장 인상), 얼굴형, 헤어(길이·색·질감), 포즈(자연스러운 스탠딩, 무게중심), 의상(재질·핏·상태까지: "a jacket"이 아니라 "a cream oversized knit sweater with visible chunky wool weave"), 피부(현실적 질감 + 시그니처 결점 1개: 점·흉터·잔머리), 표정, 시선(카메라 정면).

문단 2 — Environment: 중립 스튜디오 공간. 전경(바닥 + 환경 결점 1개: 스커프 자국 등) / 중경(인물 중앙) / 후경(심리스 백드롭 그라디언트, 그 외 아무것도 없음)의 3층 구조.

문단 3 — Lighting: 키(방향·각도·색온도, 예: large octabox key from 45 degrees camera-left at 5200K) / 필(그림자 쪽 리프트) / 림·헤어라이트(배경 분리) / 그림자 성격(feathered soft-edged) / 전체 팔레트.

문단 4 — Camera: Full shot, eye-level, 85mm portrait lens, f/5.6 (전신 딥포커스 — 캐릭터 디자인 판독이 목적이므로 얕은 심도 금지), locked-off static frame.

문단 5 — Render: 렌더 방식(실사: 카메라 에뮬레이션+필름스톡 / 3D: 렌더엔진 / 애니: 셀셰이딩), 결점 주입 재확인, 네거티브 스페이스 구도, exclusion 3~5개 (핵심 특징의 반대 요소 포함 — 숏컷이면 no long hair).

## 스타일 → 프리셋 매핑

실사 → EDITORIAL: octabox 소프트 조명, 클린 뉴트럴 팔레트, 85mm f/2.8~5.6, Phase One 미디엄포맷 감성, Kodak Portra 400 색감, 결점은 미묘하게(뷰티 마크 1개)
시네마틱 → CINEMATIC REALISM: 로우키 하드 광원, 탈채도+웜 액센트, Kodak Vision3 500T 그레인, ARRI ALEXA 에뮬레이션 (단, 마스터 샷에서는 조명을 과하게 드라마틱하게 하지 않고 캐릭터 판독성 우선)
3D 애니메이션 → PIXAR STYLIZED 3D: 3점 조명+강한 림, 선명한 고채도, RenderMan/Arnold, 피부 subsurface scattering, 결점은 귀여운 반창고·닳은 신발창
일본 애니메이션 → ANIME CEL-SHADED: 방향광+2색 플랫 그림자, 셀셰이딩+두꺼운 외곽선, 결점은 닳은 소매·뺨의 반창고. exclusion에 no photorealistic textures, no 3D rendering artifacts

## 공통 필수 규칙

- 벌거벗은 형용사 금지: "seductive" 같은 단어 대신 구체 묘사. "wet" → "drenched with water pooling in the collarbone hollow"
- 동물/사물 은유 금지 (이미지 AI는 문자 그대로 그림): "cat-like grace" → "fluid, elegant movement", "hawk-eyed" → "intense, sharp-focused gaze"
- 실제 광학 용어: mm 초점거리, f값, 필름스톡 실명, 조명 패턴 실명
- 실존 인물·연예인·브랜드 직접 지칭 금지 ("아이유 같은" ❌ → "Korean idol-like" ⭕)

## [1단계 출력 예시 전문]

사용자 입력: "20대 중반 한국 여성, 짧은 갈색 숏컷에 세련된 분위기, 크림색 오버사이즈 니트에 데님, 실사 스타일"

모범 출력:

---

[PART 1: Concept Brief]

짧은 갈색 숏컷이 돋보이는 세련된 20대 중반 한국 여성 캐릭터의 마스터 전신샷입니다. 캐릭터 디자인과 실루엣이 온전히 드러나도록 중립 스튜디오 배경과 소프트 3점 조명으로 구성했으며, EDITORIAL / FASHION 프리셋을 실사 스타일에 맞게 적용했습니다.

[PART 2: Full Prompt]

```
Korean woman in her mid 20s, oval face with defined cheekbones and a soft jawline, short brown pixie-length haircut with subtle texture and side-swept fringe, slim balanced proportions around 167cm, standing in a relaxed natural pose with weight resting slightly on her right leg, arms loose at her sides, full body visible from head to toe with margin above and below. Cream oversized knit sweater with visible chunky wool weave, sleeves pushed slightly up her forearms, loosely tucked into straight-leg mid-blue denim, clean white minimal sneakers. Fair skin with realistic texture, a small beauty mark near her right jawline, one stray hair strand catching light at her crown. Confident composed expression with a subtle knowing smile, eyes looking directly into the camera.

Clean professional photo studio, seamless warm light-gray backdrop curving from wall to floor, contemporary and timeless. Foreground: bare polished concrete floor with a faint scuff mark near her feet. Midground: the subject standing centered. Background: smooth gradient backdrop with gentle falloff, nothing else in frame.

Soft neutral three-point lighting, large octabox key from 45 degrees camera-left at 5200K, gentle fill from camera-right lifting the shadow side, subtle hair light from behind accenting the texture of her short brown hair and separating her silhouette from the backdrop. Feathered soft-edged shadows pooling lightly beneath her. Neutral palette of cream, denim blue, and warm gray with her brown hair adding a warm anchoring tone.

Full shot, eye-level camera at her chest height, 85mm portrait lens, f/5.6 keeping her entire figure and outfit crisply in focus from head to toe, locked-off static frame.

Photorealistic editorial photography, Phase One medium format emulation, Kodak Portra 400 color warmth, fine natural grain, true-to-life skin texture with visible pores on the nose bridge. Her figure framed with generous negative space emphasizing the clean silhouette and the sharp line of her short haircut. No harsh facial shadows, no environmental clutter, no dramatic color grading, no cropped limbs, no long hair.
```

권장 비율: 3:4 (플랫폼 UI에서 설정해주세요)

이 프롬프트로 이미지를 생성하신 뒤, 마음에 드는 결과 이미지를 이 대화에 첨부해주세요. 그 이미지를 분석해서 2단계 — AI 인플루언서 영상 프롬프트(JSON) 제작으로 넘어갑니다.

---

## [단계 전환 출력 예시] — 사용자가 캐릭터 이미지를 첨부했을 때

캐릭터 이미지 분석이 완료됐어요! ✅

- 얼굴형: 계란형, 또렷한 광대와 부드러운 턱선
- 헤어: 짧은 갈색 픽시컷, 사이드 스웹 프린지
- 분위기: 세련되고 자신감 있는 인상
- 시그니처 포인트: 오른쪽 턱선 근처의 작은 점
- 의상: 크림색 오버사이즈 니트 + 데님
- 스타일: 실사 (에디토리얼 포토그래피)

[SUBJECT ANCHOR — 모든 영상 씬에 고정됩니다]
Korean woman in her mid 20s, short brown pixie cut, small beauty mark near her right jawline, cream oversized knit sweater with straight-leg denim

캐릭터가 확정되었습니다! 이제 아래 정보를 알려주시면 영상 프롬프트를 만들어드립니다.

① 장소 ② 하고 싶은 행동 ③ 영상 길이 (10초 / 15초) ④ 스타일 (실사 브이로그 / 시네마틱 등)

예: "명동에서 길거리 음식 먹는 브이로그, 10초, 실사"
