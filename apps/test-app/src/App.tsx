import React, { useEffect } from "react";
import { Reset, resetById, resetByGroup, triggerSync } from "@ohah/reset";
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

function Timer({ reset, label }: { reset: () => void; label: string }) {
  const [time, setTime] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h3>{label}</h3>
      <p>Time: {time}s</p>
      <button onClick={reset}>내부에서 리셋</button>
    </div>
  );
}

function InteractiveComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [color, setColor] = useState("#007acc");

  return (
    <Reset id={`interactive`}>
      {(reset, key) => {

        return (
          <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
            <h3>Master Component (상태 변경 시 자동 동기화)</h3>
            <p>Count: {count}</p>
            <p>Text: {text || "(empty)"}</p>
            <p>Reset Key: {key}</p>
            <div style={{ 
              width: "50px", 
              height: "20px", 
              backgroundColor: color, 
              margin: "5px 0",
              border: "1px solid #000"
            }}></div>
            
            <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
              <button onClick={() => setCount(c => c + 1)}>Count +1</button>
              <button onClick={() => setText(t => t + "A")}>Add A</button>
              <button onClick={() => setColor(c => c === "#007acc" ? "#ff6b6b" : "#007acc")}>
                Toggle Color
              </button>
              <button onClick={reset}>Manual Reset</button>
            </div>
          </div>
        );
      }}
    </Reset>
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

      <h2>5. 동기화 리렌더링 예제</h2>
      <p>특정 컴포넌트가 리렌더링될 때 다른 컴포넌트들도 함께 리렌더링됩니다.</p>
      
      {/* 마스터 컴포넌트 */}
      <Reset id="master">
        {(reset, key) => (
          <div key={key} style={{ 
            border: "2px solid #007acc", 
            padding: "15px", 
            margin: "10px", 
            borderRadius: "8px",
            backgroundColor: "#e3f2fd"
          }}>
            <h3>Master Component</h3>
            <p>이 컴포넌트가 리렌더링되면 다른 컴포넌트들도 함께 리렌더링됩니다.</p>
            <div style={{ display: "flex", gap: "8px" }}>
              <button 
                onClick={reset}
                style={{ 
                  padding: "8px 16px", 
                  backgroundColor: "#007acc", 
                  color: "white", 
                  border: "none", 
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Master Reset (자동 동기화)
              </button>
              <button 
                onClick={() => triggerSync("master")}
                style={{ 
                  padding: "8px 16px", 
                  backgroundColor: "#28a745", 
                  color: "white", 
                  border: "none", 
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Sync Only (리셋 없이)
              </button>
            </div>
          </div>
        )}
      </Reset>

      {/* 동기화된 컴포넌트들 */}
      <Reset id="slave1" syncWith={["master"]}>
        {(reset, key) => (
          <Counter key={key} reset={reset} label="Slave 1 (Counter) - Master와 동기화" />
        )}
      </Reset>

      <Reset id="slave2" syncWith={["master"]}>
        {(reset, key) => (
          <Timer key={key} reset={reset} label="Slave 2 (Timer) - Master와 동기화" />
        )}
      </Reset>

      <Reset id="slave3" syncWith={["master"]}>
        {(reset, key) => (
          <Counter key={key} reset={reset} label="Slave 3 (Counter) - Master와 동기화" />
        )}
      </Reset>

      {/* 독립적인 컴포넌트 */}
      <Reset id="independent">
        {(reset, key) => (
          <Counter key={key} reset={reset} label="Independent (동기화되지 않음)" />
        )}
      </Reset>

      <h2>6. 상태 변경으로 인한 동기화 테스트</h2>
      <p>컴포넌트가 reset() 함수가 아닌 다른 상태 변경으로 리렌더링될 때도 동기화가 작동하는지 테스트합니다.</p>
      
      {/* 테스트용 마스터 컴포넌트 */}
      <InteractiveComponent />
    
      {/* 동기화된 테스트 컴포넌트들 */}
      <Reset id="state-test-slave1" syncWith={["interactive"]}>
        {(reset, key) => (
          <Timer
            key={key}
            reset={reset}
            label="Slave 1 (Master와 동기화)"
          />
        )}
      </Reset>      

      <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
        <h3>테스트 방법:</h3>
        <ol>
          <li><strong>Master Component</strong>에서 "Count +1", "Add A", "Toggle Color" 버튼을 클릭</li>
          <li>상태 변경 시 <code>useEffect</code>가 <code>reset()</code> 함수를 호출하여 동기화 트리거</li>
          <li>Slave 1 컴포넌트의 <strong>Reset Key</strong> 값이 증가하는지 확인</li>
          <li>각 Slave 컴포넌트의 내부 상태는 초기화되지 않고, 컴포넌트 자체만 리렌더링됨</li>
          <li><strong>Manual Reset</strong>: 수동으로 리셋하여 동기화 트리거</li>
        </ol>
      </div>

      <h2>7. 다중 동기화 예제</h2>
      <p>여러 컴포넌트 간의 복잡한 동기화 관계를 보여줍니다.</p>
      
      {/* 컴포넌트 A */}
      <Reset id="component-a">
        {(reset, key) => (
          <div key={key} style={{ 
            border: "2px solid #ff6b6b", 
            padding: "15px", 
            margin: "10px", 
            borderRadius: "8px",
            backgroundColor: "#ffe6e6"
          }}>
            <h3>Component A</h3>
            <div style={{ display: "flex", gap: "8px" }}>
              <button 
                onClick={reset}
                style={{ 
                  padding: "8px 16px", 
                  backgroundColor: "#ff6b6b", 
                  color: "white", 
                  border: "none", 
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Reset A (자동 동기화)
              </button>
              <button 
                onClick={() => triggerSync("component-a")}
                style={{ 
                  padding: "8px 16px", 
                  backgroundColor: "#28a745", 
                  color: "white", 
                  border: "none", 
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Sync A Only (리셋 없이)
              </button>
            </div>
          </div>
        )}
      </Reset>

      {/* 컴포넌트 B - A와 동기화 */}
      <Reset id="component-b" syncWith={["component-a"]}>
        {(reset, key) => (
          <Counter key={key} reset={reset} label="Component B (A와 동기화)" />
        )}
      </Reset>

      {/* 컴포넌트 C - A와 B 모두와 동기화 */}
      <Reset id="component-c" syncWith={["component-a", "component-b"]}>
        {(reset, key) => (
          <Timer key={key} reset={reset} label="Component C (A & B와 동기화)" />
        )}
      </Reset>

      {/* 컴포넌트 D - B와만 동기화 */}
      <Reset id="component-d" syncWith={["component-b"]}>
        {(reset, key) => (
          <Counter key={key} reset={reset} label="Component D (B와만 동기화)" />
        )}
      </Reset>

      <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
        <h3>동기화 관계:</h3>
        <ul>
          <li><strong>A → B, C</strong>: A가 리렌더링되면 B와 C도 함께 리렌더링</li>
          <li><strong>B → C, D</strong>: B가 리렌더링되면 C와 D도 함께 리렌더링</li>
          <li><strong>C</strong>: A와 B 모두의 영향을 받음</li>
          <li><strong>D</strong>: B의 영향만 받음</li>
        </ul>
      </div>

      <h2>8. 사용법 설명</h2>
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

// 동기화가 있는 경우
<Reset id="slave" syncWith={["master"]}>
  {(reset, key) => <MyComponent key={key} reset={reset} />}
</Reset>

// 개별 리셋
resetById("counter1")

// 그룹 리셋
resetByGroup("form")

// 동기화 트리거
triggerSync("master")`}
        </pre>
      </div>
    </div>
  );
}