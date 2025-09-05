import React from "react";
import { Reset, resetById, resetByGroup } from "@ohah/reset";
import { useState } from "react";

function Counter({ reset, label }: { reset: () => void; label: string }) {
  const [count, setCount] = useState(0);
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h3>{label}</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
      <button onClick={reset}>내부에서 리셋</button>
    </div>
  );
}

export function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Reset 라이브러리 예제</h1>
      
      <h2>1. 개별 ID만 있는 컴포넌트들</h2>
      <Reset id="counter1"> 
        {(reset, key) => <Counter key={key} reset={reset} label="Counter 1 (ID만)" />}
      </Reset>

      <Reset id="counter2">
        {(reset, key) => <Counter key={key} reset={reset} label="Counter 2 (ID만)" />}
      </Reset>

      <h2>2. ID + 그룹이 있는 컴포넌트들</h2>
      <Reset id="form-field1" groups={["form", "all"]}>
        {(reset, key) => <Counter key={key} reset={reset} label="Form Field 1 (form, all 그룹)" />}
      </Reset>

      <Reset id="form-field2" groups={["form", "all"]}>
        {(reset, key) => <Counter key={key} reset={reset} label="Form Field 2 (form, all 그룹)" />}
      </Reset>

      <Reset id="sidebar-widget" groups={["sidebar", "all"]}>
        {(reset, key) => <Counter key={key} reset={reset} label="Sidebar Widget (sidebar, all 그룹)" />}
      </Reset>

      <h2>3. 개별 리셋 버튼들</h2>
      <div style={{ margin: "10px 0" }}>
        <button onClick={() => resetById("counter1")} style={{ margin: "5px" }}>
          Counter 1 리셋
        </button>
        <button onClick={() => resetById("counter2")} style={{ margin: "5px" }}>
          Counter 2 리셋
        </button>
        <button onClick={() => resetById("form-field1")} style={{ margin: "5px" }}>
          Form Field 1 리셋
        </button>
        <button onClick={() => resetById("form-field2")} style={{ margin: "5px" }}>
          Form Field 2 리셋
        </button>
        <button onClick={() => resetById("sidebar-widget")} style={{ margin: "5px" }}>
          Sidebar Widget 리셋
        </button>
      </div>

      <h2>4. 그룹 리셋 버튼들</h2>
      <div style={{ margin: "10px 0" }}>
        <button 
          onClick={() => resetByGroup("form")} 
          style={{ margin: "5px", backgroundColor: "#e3f2fd" }}
        >
          Form 그룹 리셋 (form-field1, form-field2)
        </button>
        <button 
          onClick={() => resetByGroup("sidebar")} 
          style={{ margin: "5px", backgroundColor: "#f3e5f5" }}
        >
          Sidebar 그룹 리셋 (sidebar-widget)
        </button>
        <button 
          onClick={() => resetByGroup("all")} 
          style={{ margin: "5px", backgroundColor: "#ffebee" }}
        >
          전체 리셋 (form-field1, form-field2, sidebar-widget)
        </button>
      </div>

      <h2>5. 사용법 설명</h2>
      <div style={{ backgroundColor: "#f5f5f5", padding: "15px", borderRadius: "5px" }}>
        <h3>기본 사용법:</h3>
        <pre style={{ backgroundColor: "#fff", padding: "10px", borderRadius: "3px" }}>
{`// ID만 있는 경우
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
resetByGroup("form")`}
        </pre>
      </div>
    </div>
  );
}