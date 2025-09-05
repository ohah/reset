import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Reset, resetById, resetByGroup } from '../src';

// Counter 컴포넌트 예제
function Counter({ reset, label }: { reset: () => void; label: string }) {
  const [count, setCount] = useState(0);
  return (
    <div style={{ 
      border: "1px solid #ccc", 
      padding: "15px", 
      margin: "10px", 
      borderRadius: "8px",
      backgroundColor: "#f9f9f9"
    }}>
      <h4 style={{ margin: "0 0 10px 0" }}>{label}</h4>
      <p style={{ margin: "5px 0" }}>Count: <strong>{count}</strong></p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button 
          onClick={() => setCount((c) => c + 1)}
          style={{ 
            padding: "5px 10px", 
            backgroundColor: "#007bff", 
            color: "white", 
            border: "none", 
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          +1
        </button>
        <button 
          onClick={reset}
          style={{ 
            padding: "5px 10px", 
            backgroundColor: "#dc3545", 
            color: "white", 
            border: "none", 
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          내부 리셋
        </button>
      </div>
    </div>
  );
}

// Control Panel 컴포넌트
function ControlPanel() {
  return (
    <div style={{ 
      backgroundColor: "#e9ecef", 
      padding: "15px", 
      margin: "20px 0", 
      borderRadius: "8px" 
    }}>
      <h3 style={{ margin: "0 0 15px 0" }}>리셋 컨트롤</h3>
      
      <div style={{ marginBottom: "15px" }}>
        <h4 style={{ margin: "0 0 8px 0" }}>개별 리셋:</h4>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button onClick={() => resetById("counter1")} style={buttonStyle}>
            Counter 1
          </button>
          <button onClick={() => resetById("counter2")} style={buttonStyle}>
            Counter 2
          </button>
          <button onClick={() => resetById("form-field1")} style={buttonStyle}>
            Form Field 1
          </button>
          <button onClick={() => resetById("form-field2")} style={buttonStyle}>
            Form Field 2
          </button>
          <button onClick={() => resetById("sidebar-widget")} style={buttonStyle}>
            Sidebar Widget
          </button>
        </div>
      </div>

      <div>
        <h4 style={{ margin: "0 0 8px 0" }}>그룹 리셋:</h4>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button 
            onClick={() => resetByGroup("form")} 
            style={{ ...buttonStyle, backgroundColor: "#e3f2fd" }}
          >
            Form 그룹
          </button>
          <button 
            onClick={() => resetByGroup("sidebar")} 
            style={{ ...buttonStyle, backgroundColor: "#f3e5f5" }}
          >
            Sidebar 그룹
          </button>
          <button 
            onClick={() => resetByGroup("all")} 
            style={{ ...buttonStyle, backgroundColor: "#ffebee" }}
          >
            전체 리셋
          </button>
        </div>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: "8px 12px",
  backgroundColor: "#6c757d",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "12px"
};

const meta = {
  title: 'Reset/Examples',
  component: Reset,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Reset 컴포넌트 예제

Reset 컴포넌트는 React 컴포넌트의 상태를 리셋할 수 있는 라이브러리입니다.

## 주요 기능

- **개별 리셋**: 특정 ID로 컴포넌트 리셋
- **그룹 리셋**: 여러 컴포넌트를 그룹으로 묶어서 동시 리셋
- **TypeScript 지원**: 자동완성과 타입 안전성 제공

## 사용법

\`\`\`tsx
// ID만 있는 경우
<Reset id="counter1">
  {(reset, key) => <MyComponent key={key} reset={reset} />}
</Reset>

// ID + 그룹이 있는 경우
<Reset id="form-field1" groups={["form", "all"]}>
  {(reset, key) => <MyComponent key={key} reset={reset} />}
</Reset>

// 개별 리셋
resetById("counter1")

// 그룹 리셋
resetByGroup("form")
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Reset>;

export default meta;
type Story = StoryObj<typeof meta>;

// 예제용 Story 타입 (args 없이 사용)
type ExampleStory = {
  render: () => React.JSX.Element;
};

// 기본 예제
export const BasicExample: ExampleStory = {
  render: () => (
    <div>
      <h2>기본 사용법</h2>
      <p>ID만 있는 컴포넌트들입니다.</p>
      
      <Reset id="counter1">
        {(reset, key) => <Counter key={key} reset={reset} label="Counter 1 (ID만)" />}
      </Reset>

      <Reset id="counter2">
        {(reset, key) => <Counter key={key} reset={reset} label="Counter 2 (ID만)" />}
      </Reset>

      <ControlPanel />
    </div>
  ),
};

// 그룹 예제
export const GroupExample: ExampleStory = {
  render: () => (
    <div>
      <h2>그룹 기능</h2>
      <p>ID와 그룹이 모두 있는 컴포넌트들입니다.</p>
      
      <h3>Form 그룹</h3>
      <Reset id="form-field1" groups={["form", "all"]}>
        {(reset, key) => <Counter key={key} reset={reset} label="Form Field 1 (form, all 그룹)" />}
      </Reset>

      <Reset id="form-field2" groups={["form", "all"]}>
        {(reset, key) => <Counter key={key} reset={reset} label="Form Field 2 (form, all 그룹)" />}
      </Reset>

      <h3>Sidebar 그룹</h3>
      <Reset id="sidebar-widget" groups={["sidebar", "all"]}>
        {(reset, key) => <Counter key={key} reset={reset} label="Sidebar Widget (sidebar, all 그룹)" />}
      </Reset>

      <ControlPanel />
    </div>
  ),
};

// 전체 예제
export const CompleteExample: ExampleStory = {
  render: () => (
    <div>
      <h2>완전한 예제</h2>
      <p>모든 기능을 포함한 예제입니다.</p>
      
      <h3>개별 ID 컴포넌트들</h3>
      <Reset id="counter1">
        {(reset, key) => <Counter key={key} reset={reset} label="Counter 1 (ID만)" />}
      </Reset>

      <Reset id="counter2">
        {(reset, key) => <Counter key={key} reset={reset} label="Counter 2 (ID만)" />}
      </Reset>

      <h3>Form 그룹 컴포넌트들</h3>
      <Reset id="form-field1" groups={["form", "all"]}>
        {(reset, key) => <Counter key={key} reset={reset} label="Form Field 1 (form, all 그룹)" />}
      </Reset>

      <Reset id="form-field2" groups={["form", "all"]}>
        {(reset, key) => <Counter key={key} reset={reset} label="Form Field 2 (form, all 그룹)" />}
      </Reset>

      <h3>Sidebar 그룹 컴포넌트</h3>
      <Reset id="sidebar-widget" groups={["sidebar", "all"]}>
        {(reset, key) => <Counter key={key} reset={reset} label="Sidebar Widget (sidebar, all 그룹)" />}
      </Reset>

      <ControlPanel />

      <div style={{ 
        backgroundColor: "#f8f9fa", 
        padding: "15px", 
        margin: "20px 0", 
        borderRadius: "8px",
        border: "1px solid #dee2e6"
      }}>
        <h3>그룹 설명</h3>
        <ul style={{ margin: "0", paddingLeft: "20px" }}>
          <li><strong>form 그룹</strong>: form-field1, form-field2</li>
          <li><strong>sidebar 그룹</strong>: sidebar-widget</li>
          <li><strong>all 그룹</strong>: form-field1, form-field2, sidebar-widget</li>
        </ul>
      </div>
    </div>
  ),
};

// 코드 예제
export const CodeExample: ExampleStory = {
  render: () => (
    <div>
      <h2>코드 예제</h2>
      
      <div style={{ 
        backgroundColor: "#f8f9fa", 
        padding: "15px", 
        margin: "20px 0", 
        borderRadius: "8px",
        border: "1px solid #dee2e6"
      }}>
        <h3>기본 사용법</h3>
        <pre style={{ 
          backgroundColor: "#fff", 
          padding: "15px", 
          borderRadius: "4px",
          overflow: "auto",
          fontSize: "14px",
          border: "1px solid #e9ecef"
        }}>
{`import { Reset, resetById, resetByGroup } from '@ohah/reset';

function MyComponent({ reset }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
      <button onClick={reset}>리셋</button>
    </div>
  );
}

// 사용
<Reset id="counter1">
  {(reset, key) => <MyComponent key={key} reset={reset} />}
</Reset>

// 리셋
resetById("counter1");`}
        </pre>
      </div>

      <div style={{ 
        backgroundColor: "#f8f9fa", 
        padding: "15px", 
        margin: "20px 0", 
        borderRadius: "8px",
        border: "1px solid #dee2e6"
      }}>
        <h3>그룹 사용법</h3>
        <pre style={{ 
          backgroundColor: "#fff", 
          padding: "15px", 
          borderRadius: "4px",
          overflow: "auto",
          fontSize: "14px",
          border: "1px solid #e9ecef"
        }}>
{`// 여러 그룹에 속하는 컴포넌트
<Reset id="form-field1" groups={["form", "all"]}>
  {(reset, key) => <MyComponent key={key} reset={reset} />}
</Reset>

// 그룹 리셋
resetByGroup("form");  // form 그룹의 모든 컴포넌트 리셋
resetByGroup("all");   // all 그룹의 모든 컴포넌트 리셋`}
        </pre>
      </div>
    </div>
  ),
};
