const PLAN_ITEMS = [
  {
    label: '연구주제',
    value: 'Google Sheets CSV를 데이터베이스처럼 활용하는 개인 모의고사 기록 웹앱 개발',
  },
  {
    label: '선정이유',
    value: '모의고사 성적과 풀이 메모가 여러 곳에 흩어져 있으면 복습 흐름을 다시 잡기 어렵다. 직접 기록을 쌓고, 과목과 응시 방식에 따라 빠르게 찾아볼 수 있는 웹앱을 만들면 공부 과정을 더 객관적으로 확인할 수 있다고 판단했다.',
  },
  {
    label: '연구내용',
    value: 'React와 Vite로 단일 페이지 앱을 구성하고, Google Sheets 공개 CSV를 불러와 카드 목록, 필터, 검색, 상세 모달을 구현했다. 라우팅과 배포 새로고침 대응까지 포함하여 실제로 계속 사용할 수 있는 형태를 목표로 했다.',
  },
  {
    label: '연구방법',
    value: 'React 공식 문서, Vite 문서, Google Sheets CSV 공개 방식, MDN Web Docs를 참고했다. 구현 중에는 작은 컴포넌트 단위로 화면을 나누고, 실제 데이터 구조에 맞추어 필터링과 정렬 로직을 검증했다.',
  },
]

const SCHEDULE = [
  ['3월', '아이디어 선정, 데이터 컬럼 설계, React/Vite 프로젝트 생성, 기본 화면 구조 작성'],
  ['4월', 'CSV 로딩 훅 제작, 모의고사 목록 카드, 과목 전환, 필터와 검색 기능 구현'],
  ['5월', '상세 모달, 반응형 CSS, 배포 환경의 라우팅 처리, 사용하면서 발견한 UI 문제 개선'],
  ['6월', '보고서 페이지 정리, 발표 자료 준비, 최종 시연과 결과물 제출'],
]

const METHOD_ITEMS = [
  ['멘토', '프로젝트 방향은 학교 수업과 주변 피드백을 기준으로 점검했다.'],
  ['도서', '별도 교재보다는 공식 문서와 예제를 중심으로 필요한 부분을 찾아 적용했다.'],
  ['강좌', 'React 상태 관리, Vite 개발 서버, SPA 배포 관련 온라인 강좌와 문서형 자료를 참고했다.'],
  ['인터넷', 'MDN, React, Vite, Google Sheets 게시 기능 문서를 확인하며 문제 해결에 활용했다.'],
  ['기타 참고자료', '기존 개인 기록 방식, 실제 모의고사 데이터, 배포 후 사용 경험을 개선 근거로 삼았다.'],
]

function ReportSection({ eyebrow, title, children }) {
  return (
    <section className="report-section">
      {eyebrow && <span className="report-eyebrow">{eyebrow}</span>}
      <h2 className="report-section-title">{title}</h2>
      {children}
    </section>
  )
}

function TimelineItem({ month, children }) {
  return (
    <div className="report-timeline-item">
      <span className="report-month">{month}</span>
      <p>{children}</p>
    </div>
  )
}

export default function ReportPage() {
  return (
    <article className="report-page">
      <div className="report-hero">
        <div>
          <span className="report-kicker">2026학년도 1학기 1인1프로젝트</span>
          <h2>호성의 공부기록 프로젝트 보고서</h2>
          <p>
            모의고사 기록을 한곳에 모으고, 과목별 학습 흐름을 다시 확인하기 위해 만든
            개인 학습 기록 웹앱의 계획서와 결과보고서입니다.
          </p>
        </div>
        <div className="report-meta-card">
          <span>연구자</span>
          <strong>3311심호성</strong>
          <span>결과물</span>
          <strong>React 웹앱</strong>
        </div>
      </div>

      <ReportSection eyebrow="자기계발계획서" title="1. 간략히 자기소개하기">
        <p className="report-lead">
          저는 웹 기술을 활용해 실제 생활의 불편함을 해결하는 데 관심이 있다. 이번
          연구에서는 공부 기록이라는 개인적인 문제를 주제로 삼아, 모의고사 응시 기록과
          복습 메모를 더 쉽게 관리할 수 있는 웹 서비스를 직접 설계하고 구현했다. 진로와
          연결해 보면, 이 프로젝트는 프론트엔드 개발, 데이터 활용, 사용자 경험 설계를
          함께 연습한 결과물이다.
        </p>
      </ReportSection>

      <ReportSection eyebrow="연구계획" title="2. 연구계획">
        <div className="report-plan-grid">
          {PLAN_ITEMS.map(item => (
            <div className="report-plan-item" key={item.label}>
              <h3>{item.label}</h3>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
        <div className="report-subsection">
          <h3>연구일정</h3>
          <div className="report-timeline">
            {SCHEDULE.map(([month, text]) => (
              <TimelineItem key={month} month={month}>{text}</TimelineItem>
            ))}
          </div>
        </div>
      </ReportSection>

      <ReportSection eyebrow="연구결과보고서" title="3. 연구 과정과 결과물 설명">
        <div className="report-two-column">
          <div>
            <h3>연구 과정 설명</h3>
            <p>
              처음에는 기록 데이터를 어디에 저장할지부터 정했다. 별도 서버를 만들면
              유지보수가 커지기 때문에 Google Sheets를 입력 도구로 사용하고, 웹앱에서는
              공개 CSV를 가져와 화면에 표시하도록 설계했다. 이후 React 컴포넌트를
              Header, FilterBar, ExamTable, ExamCard, DetailModal로 나누어 구현했다.
            </p>
          </div>
          <div>
            <h3>연구 과정에서 느낀 점</h3>
            <p>
              단순한 기록 앱도 실제로 쓰려면 데이터 구조, 빈 상태, 로딩, 모바일 화면,
              배포 환경까지 함께 고려해야 한다는 점을 배웠다. 특히 작은 기능이라도
              사용 흐름을 기준으로 다듬으면 결과물의 완성도가 크게 달라진다는 것을
              느꼈다.
            </p>
          </div>
        </div>
      </ReportSection>

      <ReportSection eyebrow="연구평가" title="4. 연구평가">
        <div className="report-evaluation">
          <div>
            <h3>결과물내용</h3>
            <p>
              발표자료와 함께 제출할 결과물은 모의고사 기록 웹앱, 프로젝트 보고서 페이지,
              그리고 코드 포트폴리오이다. 사용자는 메인 화면에서 기록을 조회하고, 필터와
              검색으로 원하는 시험을 빠르게 찾을 수 있다.
            </p>
          </div>
          <div>
            <h3>블로그주소</h3>
            <p>
              보고서 페이지는 이 사이트의 보고서 섹션으로 구성했으며, 실제 시연은 사이트
              메인페이지에서 진행한다.
            </p>
          </div>
        </div>
        <div className="report-subsection">
          <h3>연구방법 및 활용노하우</h3>
          <div className="report-method-list">
            {METHOD_ITEMS.map(([label, text]) => (
              <div key={label}>
                <strong>{label}</strong>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="report-score-card">
          <div>
            <span className="report-score-label">자기평가</span>
            <strong>A+</strong>
          </div>
          <p>
            실제로 사용할 수 있는 결과물을 만들기 위해 데이터 연동, 필터링, 상세 보기,
            반응형 화면, 배포 대응까지 스스로 구현했다. 계획한 핵심 기능을 완성했고,
            프로젝트 주제와 결과물이 명확하게 연결되므로 A+로 평가한다.
          </p>
        </div>
        <div className="report-teacher-note">
          <h3>교과특이사항</h3>
          <p>
            웹 서비스 개발에 관심과 흥미가 높고, 프론트엔드 개발에 대한 구체적인 목표를
            가지고 있음. 1인1프로젝트에서 Google Sheets 기반 모의고사 기록 웹앱을
            성실하게 연구하여, 개인 학습 데이터를 체계적으로 관리하는 우수한 결과물을
            구현하고 발표함. 자기주도적 연구를 통하여 React 컴포넌트 설계, CSV 데이터
            처리, 반응형 UI 구현 실력을 향상시키고 발전시킴.
          </p>
        </div>
      </ReportSection>

      <ReportSection eyebrow="포트폴리오" title="5. 결과물 제출 파일 자료 설명">
        <div className="report-demo">
          <div>
            <span className="report-eyebrow">시연</span>
            <h3>사이트 메인페이지로 이동</h3>
            <p>
              최종 시연은 별도 영상이나 외부 페이지 대신, 실제 서비스의 메인 화면으로
              이동해 필터, 검색, 상세 보기 흐름을 바로 확인하는 방식으로 구성했다.
            </p>
          </div>
          <a className="report-demo-button" href="/">
            메인페이지 열기
            <i className="fa-solid fa-arrow-right" />
          </a>
        </div>
      </ReportSection>
    </article>
  )
}
