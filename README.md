# mock-log

Google Sheets를 데이터 소스로 사용하는 모의고사 시행 기록 웹앱입니다.

## 미리보기

수학/국어 과목별로 모의고사 기록을 관리하고, 유형(풀모의고사/하프모의고사) 및 장소(현장/집모)로 필터링할 수 있습니다.

## 기술 스택

- **React 18** + **Vite**
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

`.env.example`을 복사해 `.env` 파일을 만들고, 본인의 Google Sheets CSV URL을 입력합니다.

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

### 4. 스프레드시트 형식

시트의 첫 번째 행은 아래 헤더여야 합니다.

| 컬럼 | 설명 | 값 |
|------|------|----|
| `name` | 시험 이름 | 예: `6월 모의고사` |
| `date` | 날짜 | `YYYY-MM-DD` |
| `subject` | 과목 | `math` / `korean` |
| `type` | 유형 | `full` / `half` |
| `place` | 장소 | `live` / `home` |
| `score` | 점수 | 숫자 (선택) |
| `memo` | 메모 | 텍스트 (선택) |

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
