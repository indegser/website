# AGENTS.md

## 목적

이 문서는 Codex가 이 저장소에서 안정적으로 작업하기 위한 최소 규칙입니다.
기본 원칙은 "바닐라하게 시작하고, 실패 패턴만 문서로 축적"입니다.

## 프로젝트 요약

- 스택: Next.js(App Router), React, TypeScript, TailwindCSS, Sanity
- 패키지 매니저: `pnpm` (`pnpm-lock.yaml` 기준)
- Node 버전: `22.x` (`package.json > engines.node`)

## 시작 명령

- 의존성 설치: `pnpm install`
- 개발 서버: `pnpm dev`
- 프로덕션 모드 개발 서버: `pnpm dev:prod`
- 빌드: `pnpm build`
- 실행: `pnpm start`

## 검증 명령

- 린트: `pnpm lint`
- 테스트: `pnpm test`
- 포맷: `pnpm prettier`
- 포맷 체크: `pnpm prettier:check`

## 핵심 운영 원칙

1. 기본 우선: 커스텀 프롬프트/복잡한 자동화를 먼저 늘리지 말고 기본 Codex 흐름으로 시작한다.
2. 계획 우선: 코드 수정 전에 변경 계획(파일, 영향 범위, 검증 방법)을 먼저 명시한다.
3. 작은 단위 실행: 한 번에 크게 바꾸지 말고, 작게 수정하고 바로 검증한다.
4. 검증 강제: 최소 `pnpm lint`는 항상 실행하고, 동작 영향이 있으면 `pnpm test`까지 실행한다.
5. 규칙은 사후 추가: 같은 실수가 반복되거나 품질 이슈가 재발할 때만 이 문서에 새 규칙을 추가한다.

## PR/큰 변경 작업 순서

1. 요구사항을 한 줄로 재정의한다.
2. 관련 파일을 좁힌다 (`rg --files`, `rg "<keyword>"`).
3. 변경 계획을 먼저 작성한다.
4. 구현 후 `pnpm lint` 실행.
5. 필요 시 `pnpm test` 실행.
6. 결과 보고 시 "변경 파일 / 동작 영향 / 검증 결과 / 남은 리스크"를 명시한다.

## 주요 디렉터리

- `app/`: Next.js App Router 페이지/레이아웃
- `components/`: 재사용 UI 컴포넌트
- `lib/`: 유틸리티 및 도메인 로직
- `public/`: 정적 리소스
- `fonts/`: 폰트 파일

## Sanity 관련

- Sanity 개발 서버: `pnpm sanity:dev`
- Sanity 시작: `pnpm sanity:start`
- Sanity 빌드: `pnpm sanity:build`
- Sanity 배포: `pnpm sanity:deploy`

## 변경 안전 규칙

- 기존 코드 스타일과 구조를 우선 유지한다.
- 요청 범위를 벗어나는 광범위 리팩터링은 하지 않는다.
- `.env.local`의 비밀값은 절대 커밋하지 않는다.
- 사용자의 기존 변경사항은 되돌리지 않고, 요청 변경만 추가한다.
