## 상위 폴더 구조

```
└── src/
    ├── context/                # 전역 Context API 관련 파일
    ├── hooks/                  # 전역 커스텀 훅
    └── pages/
        └── RecordsPage         # 회원 목록 페이지
```

RecordsPage 내부에서 코드 응집도를 높이기 위해 관련 파일을 구성하였습니다.

## 추가한 라이브러리

- `styled-components`: AntD 컴포넌트의 스타일을 커스터마이징하기 위해 추가하였습니다.
- `dayjs`: Antd의 DatePicker와 통합 및 날짜 관리를 위해 추가하였습니다.
- `react-router`: 코드 응집도 높이기 위하여 관련파일을 모았습니다.

## 저장 기능

- Storage 인터페이스를 기반으로, **메모리에 저장하는 InMemoryStorage**와 **로컬 스토리지를 사용하는 LocalStorage**를 구현하였습니다.
- 환경 변수 VITE_STORAGE의 값에 따라 저장 방식을 선택하며, 기본값은 'local-storage'입니다. ('in-memory' 또는 'local-storage' 중 선택 가능)

## context: `ModalOverlayProvider`, hooks: `useModalOverlay`

> 기존 Ant Design의 Modal은 컴포넌트 내부에서 useState로 열고 닫는 방식이 일반적이지만, 컴포넌트 외부에서 제어하기 어렵고 여러 페이지에서 동일한 모달을 공유하거나 재사용하기 번거로웠습니다.

`ModalOverlayProvider`와 `useModalOverlay` 훅을 구현하여
전역에서 모달을 열고 닫을 수 있는 Overlay 구조를 구성하였습니다.

## hooks: `useRecordFormModal`

- "회원 추가(add)/수정(edit) 모달"을 컴포넌트 외부에서 선언형처럼 호출할 수 있도록 만들어진 훅입니다.
- mode 및 record props를 활용하여 `add`, `edit` 상황에 따라 초기값 설정 및 업데이트 처리 로직을 분기하였습니다.

## context: `RecordProvider`

회원 레코드 데이터를 중앙에서 관리하기 위해 구현된 전역 상태 관리 컨텍스트입니다.

### 상태 구성 (State)

- `records`: 전체 레코드 목록
- `selectedRowKeys`: 테이블 선택 상태 (체크박스)

### 주요 기능 (Actions)

- `addRecord`: 새로운 레코드 추가 (UUID 자동 생성)
- `deleteRecord`: 특정 ID의 레코드 삭제
- `deleteSelectedRecords`: 선택된 레코드 일괄 삭제
- `updateRecord`: 레코드 수정
- `setRecords`, `setSelectedRowKeys`: 상태 설정

## 커스텀 필드 대비

- `defaultFields` 내부 값 토대로 필드를 구성할수 있게 하였습니다.
- 각 필드별로 key, type, label, require, max, width를 설정 할 수 있습니다.
