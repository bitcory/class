# 작업 인수인계 (세션 기록)

이 문서는 이 프로젝트를 만들며 나눈 대화의 맥락·결정·이유를 남긴 것입니다.
다른 컴퓨터에서 이어서 작업할 때 이 문서 + [DESIGN.md](./DESIGN.md) + [README.md](./README.md)를
읽으면 전체 그림이 잡힙니다.

작성 시점: 2026-07-24

---

## 1. 무엇을 만들었나

**AI 활용과정** — 생성형 AI 활용 실무 4주 과정의 강의 웹페이지.

- **대상**: 사회복지 전공 대학원생(50대 중심), AI 입문
- **핵심 요구**: 모바일 반응형 + PPT형 강의 화면 + 프롬프트 복사 + 강사 소개,
  화이트 테마, **50대가 혼자 봐도 안 막히게** 아주 쉽게
- **참조 UX/UI**: `/Users/toolb/dev/dev/tbacademy` (AICREW 아카데미) — 디자인 토큰·
  Paperlogy 폰트·shadcn 컴포넌트 감각만 계승, 다크테마·초대형 영문 헤드라인·메가
  드롭다운은 버림
- **강의 원본**: `~/Downloads/1주차_강사대본.docx` → 1주차 14장 슬라이드로 옮김
  (대본 전문이 `src/content/week-1.ts`에 강사 노트로 들어가 있음)

## 2. 기술 스택 / 환경 메모

- Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + Paperlogy 폰트
- 슬라이드는 MDX가 아니라 **TypeScript 데이터 파일**(`src/content/*.ts`)로 관리
- **이 맥에는 원래 Node가 없어서** `brew install node`(v26) + `npm i -g pnpm`으로 설치함.
  다른 컴퓨터에도 Node 20+ 와 pnpm이 필요.
- 검증용으로 `playwright`(devDependency) 설치 — Chrome 채널 사용
- Cloudflare 배포 설정은 아직 안 붙임 (tbacademy처럼 `@opennextjs/cloudflare` 예정)

## 3. 화면 / 파일

| 주소 | 파일 | 내용 |
|---|---|---|
| `/` | `src/app/page.tsx` | 홈 (히어로·준비물·4주 커리큘럼·바로가기) |
| `/week/[week]` | `src/app/week/[week]/page.tsx` + `components/deck/*` | 슬라이드 덱 |
| `/prompts` | `src/app/prompts/page.tsx` | 프롬프트 복사 카드 모음 |
| `/instructor` | `src/app/instructor/page.tsx` | 강사 소개 |
| `/help` | `src/app/help/page.tsx` | 자주 막히는 지점 도움말 |

콘텐츠 데이터: `src/content/{course,week-1,instructor,help}.ts`
슬라이드 렌더러: `src/components/deck/slides/{basic,practice}.tsx` (타입 11종)

## 4. 핵심 결정과 이유 (대화에서 나온 것)

- **한 화면 한 가지 / 큰 글씨 / 위아래 스크롤 / 큰 버튼** — 50대 눈높이. 대본의
  "같이 한 칸씩" 원칙을 화면 규칙으로 옮김.
- **프롬프트 빈칸 채우기** — `{{주제}}` → 노란 입력칸. 고친 값이 복사 결과에 반영.
  복사는 `navigator.clipboard` → `execCommand` → "길게 눌러 복사" 3단 폴백.
  한글 폭 계산을 직접 해서 빈칸이 잘리지 않게 함(`ch` 단위 버그 수정).
- **강사 모드** — 헤더 오른쪽 아이콘(또는 `?teacher=1`). 켜면 슬라이드에 진행 대본이
  붙고 진행바에 시간·발표화면 버튼이 생김. 수강생 화면엔 흔적 없음.
- **발표(프로젝터) 화면** — 문서 전체 전체화면 + 사이트 헤더/푸터 숨김 + 글자 확대.
  전체화면이 막힌 임베디드 브라우저에서도 넓은 모드로 fallback. 강사 대본은
  발표 화면에선 숨김(수강생이 보는 화면이므로).
- **글씨 크기 3단계 토글**(18/20/22px), 이어보기 배너, 목차 시트, 키보드 이동.

## 5. 반복 수정하며 실제로 잡은 문제들 (재발 방지 기록)

1. 스크롤 스냅이 로드 직후 자동 스크롤을 유발 → 스냅 제거, 정렬은 버튼이 담당
2. 헤더 높이가 모바일/데스크톱 달라 진행바 겹침 → 런타임 측정 `--deck-offset`
3. 빈칸 폭을 `ch`로 잡아 한글이 잘림 → 한글 1em·라틴 0.55em 가중 계산
4. 목차에서 먼 장 이동 시 부드러운 스크롤이 느림 → 멀리 뛸 땐 즉시 이동
5. 발표 화면에서 덱 컨테이너만 전체화면 → 헤더 자리 빈 띠 + 상단 잘림 → 문서 전체
   전체화면 + CSS로 헤더 숨김
6. 발표 화면 본문 폭이 `max-w-3xl`에 묶임 → 규칙을 `@layer` **밖**에 둬서 utilities를
   이기게, 글자도 rem 기반으로 확대
7. **강의 페이지에서 사이트 헤더가 세로를 잡아먹음** → 강의 화면에선 헤더를
   `relative`(비고정)로 바꿔 스크롤하면 사라지고 진행바만 top:0에 남게 함 → 92px 회수
8. 슬라이드가 화면보다 길어 하단 고정 바에 가림 → 상단 정렬 + 여백/섹션 간격 축소 +
   프롬프트 카드 2단 배치로 높이 절반
9. 발표 화면 표 4줄이 안 들어옴 → 발표 글자 22→20px, 표 행 촘촘하게 → 1080p에서 한 화면
10. Claude "이미지 생성은 안 됩니다" 뱃지 2줄 깨짐 → `whitespace-nowrap` + 표 칸 폭 확대
11. 본문 좌우 여백 과다 → 페이지 폭을 헤더와 같은 `max-w-6xl`로 넓히고 카드들을 그리드로
12. 강사 사진 원형 → 둥근 모서리 사각형(`rounded-3xl`)

## 6. 검증 방법

`pnpm dev`를 띄운 상태에서:

```bash
node scripts/check-layout.mjs      # 모바일/데스크톱 캡처 + 가로 넘침·콘솔 오류
node scripts/check-behavior.mjs    # 복사·이동·목차·강사모드·글씨크기 동작
node scripts/check-projector.mjs   # 발표 화면 레이아웃
```

캡처 위치는 `SHOT_DIR` 환경변수로 지정. playwright는 설치된 Chrome(`channel:"chrome"`)을 씀.

## 7. 남은 일 (TODO)

- [ ] **강사 프로필을 실제 정보로 교체** — 지금은 tbacademy의 툴비 프로필/사진이
      자리표시자. `src/content/instructor.ts` + `public/instructor.jpg`
- [ ] 가입 절차 스크린샷 4장 (10번 슬라이드) — 현재 텍스트만
- [ ] 2~4주차 대본 나오면 `src/content/week-2.ts` 추가 (형식은 week-1.ts 그대로,
      `course.ts`의 `weeks`에 넣고 `status: "ready"`)
- [ ] 브랜드 로고·정확한 과정명/주관 기관 표기 확정
- [ ] 단톡방 링크·문의 연락처
- [ ] Cloudflare 배포 설정

## 8. 다른 컴퓨터에서 이어서 하기

```bash
# 1) Node 20+ 와 pnpm 준비 (없으면)
brew install node
npm i -g pnpm

# 2) 이 저장소를 받은 뒤
cd tbclass
pnpm install        # node_modules 복원 (저장소에는 포함 안 됨)
pnpm dev            # http://localhost:3000
```

git 원격(GitHub 등)에 올려두면 `git clone`으로 바로 받을 수 있습니다.
