# mock-log

Google Sheets를 데이터 소스로 사용하는 모의고사 기록 + 컨텐츠 후기 웹앱입니다.

## 기능

- **모의고사 시행표**: 수학/국어 과목별 기록, 유형·장소 필터, 이름 검색
- **컨텐츠 후기**: 책·강의 후기를 티어(S/A/B/C/D)별 섹션으로 표시, 이름 검색
- **URL 라우팅**: `/exam`, `/review`로 직접 접근 및 새로고침 유지

## 기술 스택

- **React 18** + **Vite** + **React Router v6**
- 데이터: Google Sheets (CSV 공개 게시)

## 시작하기

### 1. 저장소 클론

```bash
git clone https://github.com/velo1203/mock-log.git
cd mock-log
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경변수 설정

`.env.example`을 복사해 `.env` 파일을 만들고 Google Sheets CSV URL을 입력합니다.

```bash
cp .env.example .env
```

```env
VITE_CSV_URL=https://docs.google.com/spreadsheets/d/e/YOUR_SHEET_ID/pub?output=csv
```

> **Google Sheets CSV URL 얻는 방법**
> 1. Google Sheets 열기
> 2. 파일 → 공유 → 웹에 게시
> 3. 형식을 **쉼표로 구분된 값(.csv)** 으로 선택 후 게시
> 4. 생성된 URL을 `VITE_CSV_URL`에 입력

### 4. 스프레드시트 구조

하나의 스프레드시트에 **시트 2개**를 만듭니다.

#### 시트 1 — 모의고사

| 컬럼 | 필수 | 설명 | 값 |
|------|------|------|----|
| `name` | ✅ | 시험 이름 | 예: `6월 모의고사` |
| `date` | ✅ | 날짜 | `YYYY-MM-DD` |
| `subject` | ✅ | 과목 | `math` / `korean` |
| `type` | ✅ | 유형 | `full` / `half` |
| `place` | ✅ | 장소 | `live` / `home` |
| `score` | ❌ | 점수 | 숫자 |
| `memo` | ❌ | 메모 | 텍스트 |

#### 시트 2 — 컨텐츠 후기

| 컬럼 | 필수 | 설명 | 값 |
|------|------|------|----|
| `title` | ✅ | 책/강의 이름 | 예: `현우진 수분감` |
| `subject` | ✅ | 과목 | `수학` / `국어` (또는 `math` / `korean`) |
| `category` | ✅ | 분류 | `강의` / `문제집` 등 자유 텍스트 |
| `tier` | ✅ | 추천 등급 | `S` / `A` / `B` / `C` / `D` |
| `review` | ❌ | 후기 | 텍스트 |

> 시트 2는 `VITE_CSV_URL`에서 자동으로 파생됩니다. 별도 환경변수 불필요.

### 5. 개발 서버 실행

```bash
npm run dev
```

### 6. 빌드

```bash
npm run build
```

## 라이선스

MIT
