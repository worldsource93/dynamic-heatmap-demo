```markdown
# Dynamic Heatmap Demo 🗺️

동적 히트맵 시각화 데모 프로젝트입니다. OpenLayers와 Vite를 활용하여 대용량 CSV 데이터를 효율적으로 처리하고 시각화합니다.

## 주요 기능

- 🚀 랭크 값 기반 동적 데이터 로딩
- 🎚️ 실시간 히트맵 업데이트 슬라이더
- ⚡ Debouncing을 통한 성능 최적화
- 📊 대용량 데이터 효율적 처리

## 설치 방법

### 사전 요구사항
- Node.js (v14 이상)
- npm 또는 yarn

### 설치 단계

1. 저장소 클론
```bash
git clone https://github.com/worldsource93/dynamic-heatmap-demo.git
cd dynamic-heatmap-demo
```

2. 의존성 설치
```bash
npm install
```

## 실행 방법

### 개발 서버 실행
```bash
npm start
```
브라우저에서 `http://localhost:5173` 접속

### 프로덕션 빌드
```bash
npm run build
```

### 빌드된 파일 미리보기
```bash
npm run serve
```

## CSV 데이터 설정

### CSV 파일 위치
CSV 파일은 `data/*.csv` 경로에 위치해야 합니다.

### CSV 형식
다음과 같은 형식을 따라야 합니다:

```csv
"st_x","st_y","bldg_deter_idx_rank"
128.8537549687778,35.50752583372233,0
126.96816353886915,37.71663752671158,0
126.6808307050483,37.214042139175135,0
```

#### 필드 설명
- `st_x`: 경도 (longitude)
- `st_y`: 위도 (latitude)  
- `bldg_deter_idx_rank`: 랭크 값 (0-100)

### 커스텀 데이터 사용
1. 위 형식에 맞춰 CSV 파일 준비
2. `data/*.csv`로 파일 교체
3. 필요시 `main.js`의 19번째 줄에서 파일 경로 수정

## 사용 방법

1. 애플리케이션 실행 후 지도가 로드됩니다
2. 상단 슬라이더를 조정하여 랭크 값 변경 (0-100)
3. 선택된 랭크에 해당하는 데이터만 히트맵으로 표시됩니다

## 예제 스크린샷

### 랭크 0 데이터
![랭크 0](screenshots/rank-0.png)
*랭크 값 0으로 필터링된 데이터*

### 랭크 50 데이터
![랭크 50](screenshots/rank-50.png)
*랭크 값 50으로 필터링된 데이터*

### 랭크 100 데이터
![랭크 100](screenshots/rank-100.png)
*랭크 값 100으로 필터링된 데이터*

## 프로젝트 구조

```
dynamic-heatmap-demo/
├── data/
│   └── test.csv          # 히트맵 데이터
├── screenshots/          # 스크린샷 이미지 (추가 필요)
├── index.html           # 메인 HTML
├── main.js              # 히트맵 로직
├── style.css            # 스타일시트
├── package.json         # 프로젝트 설정
└── vite.config.js       # Vite 설정
```

## 기술 스택

- [OpenLayers](https://openlayers.org/) - 웹 지도 라이브러리
- [Vite](https://vitejs.dev/) - 빌드 도구
- [PapaParse](https://www.papaparse.com/) - CSV 파싱 라이브러리

## 성능 최적화

- **동적 데이터 로딩**: 전체 데이터를 메모리에 로드하지 않고 필요한 데이터만 동적으로 가져옴
- **Debouncing**: 슬라이더 이벤트에 디바운싱 적용으로 불필요한 렌더링 방지

## 라이선스

MIT