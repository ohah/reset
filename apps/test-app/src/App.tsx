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

      <h2>8. 중첩된 Reset 컴포넌트 테스트</h2>
      <p>Reset 컴포넌트 안에 다른 Reset 컴포넌트가 중첩된 경우의 동작을 테스트합니다.</p>
      
      {/* 중첩된 Reset 예제 */}
      <Reset id="parent-container">
        {(parentReset, parentKey) => (
          <div key={parentKey} style={{ 
            border: "3px solid #28a745", 
            padding: "20px", 
            margin: "15px", 
            borderRadius: "10px",
            backgroundColor: "#d4edda"
          }}>
            <h3 style={{ margin: "0 0 15px 0", color: "#155724" }}>Parent Container (Key: {parentKey})</h3>
            <p style={{ margin: "5px 0" }}>이 컨테이너 안에 여러 개의 중첩된 Reset 컴포넌트들이 있습니다.</p>
            
            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
              <button 
                onClick={parentReset}
                style={{ 
                  padding: "10px 20px", 
                  backgroundColor: "#28a745", 
                  color: "white", 
                  border: "none", 
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                Parent Reset (전체 리셋)
              </button>
              <button 
                onClick={() => triggerSync("parent-container")}
                style={{ 
                  padding: "10px 20px", 
                  backgroundColor: "#17a2b8", 
                  color: "white", 
                  border: "none", 
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Parent Sync Only
              </button>
            </div>

            {/* 첫 번째 중첩된 Reset */}
            <Reset id="nested-child1" groups={["nested-group"]}>
              {(child1Reset, child1Key) => (
                <div key={child1Key} style={{ 
                  border: "2px solid #007bff", 
                  padding: "15px", 
                  margin: "10px 0", 
                  borderRadius: "8px",
                  backgroundColor: "#e7f3ff"
                }}>
                  <h4 style={{ margin: "0 0 10px 0", color: "#004085" }}>Nested Child 1 (Key: {child1Key})</h4>
                  <Counter reset={child1Reset} label="Child 1 Counter" />
                  
                  <div style={{ marginTop: "10px" }}>
                    <button 
                      onClick={child1Reset}
                      style={{ 
                        padding: "8px 16px", 
                        backgroundColor: "#007bff", 
                        color: "white", 
                        border: "none", 
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginRight: "8px"
                      }}
                    >
                      Child 1 Reset
                    </button>
                    <button 
                      onClick={() => resetByGroup("nested-group")}
                      style={{ 
                        padding: "8px 16px", 
                        backgroundColor: "#6f42c1", 
                        color: "white", 
                        border: "none", 
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    >
                      Nested Group Reset
                    </button>
                  </div>
                </div>
              )}
            </Reset>

            {/* 두 번째 중첩된 Reset */}
            <Reset id="nested-child2" groups={["nested-group", "all-nested"]}>
              {(child2Reset, child2Key) => (
                <div key={child2Key} style={{ 
                  border: "2px solid #fd7e14", 
                  padding: "15px", 
                  margin: "10px 0", 
                  borderRadius: "8px",
                  backgroundColor: "#fff3e0"
                }}>
                  <h4 style={{ margin: "0 0 10px 0", color: "#8b4513" }}>Nested Child 2 (Key: {child2Key})</h4>
                  <Timer reset={child2Reset} label="Child 2 Timer" />
                  
                  <div style={{ marginTop: "10px" }}>
                    <button 
                      onClick={child2Reset}
                      style={{ 
                        padding: "8px 16px", 
                        backgroundColor: "#fd7e14", 
                        color: "white", 
                        border: "none", 
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginRight: "8px"
                      }}
                    >
                      Child 2 Reset
                    </button>
                    <button 
                      onClick={() => resetByGroup("all-nested")}
                      style={{ 
                        padding: "8px 16px", 
                        backgroundColor: "#dc3545", 
                        color: "white", 
                        border: "none", 
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    >
                      All Nested Reset
                    </button>
                  </div>
                </div>
              )}
            </Reset>

            {/* 세 번째 중첩된 Reset - 동기화 포함 */}
            <Reset id="nested-child3" syncWith={["parent-container"]}>
              {(child3Reset, child3Key) => (
                <div key={child3Key} style={{ 
                  border: "2px solid #e83e8c", 
                  padding: "15px", 
                  margin: "10px 0", 
                  borderRadius: "8px",
                  backgroundColor: "#fce4ec"
                }}>
                  <h4 style={{ margin: "0 0 10px 0", color: "#721c24" }}>Nested Child 3 (Key: {child3Key}) - Parent와 동기화</h4>
                  <Counter reset={child3Reset} label="Child 3 Counter (Parent Synced)" />
                  
                  <div style={{ marginTop: "10px" }}>
                    <button 
                      onClick={child3Reset}
                      style={{ 
                        padding: "8px 16px", 
                        backgroundColor: "#e83e8c", 
                        color: "white", 
                        border: "none", 
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    >
                      Child 3 Reset
                    </button>
                  </div>
                </div>
              )}
            </Reset>

            {/* 깊은 중첩 예제 */}
            <Reset id="deeply-nested" groups={["deep-nested"]}>
              {(deepReset, deepKey) => (
                <div key={deepKey} style={{ 
                  border: "2px solid #20c997", 
                  padding: "15px", 
                  margin: "10px 0", 
                  borderRadius: "8px",
                  backgroundColor: "#d1ecf1"
                }}>
                  <h4 style={{ margin: "0 0 10px 0", color: "#0c5460" }}>Deeply Nested (Key: {deepKey})</h4>
                  
                  {/* 3단계 중첩 */}
                  <Reset id="level3-nested">
                    {(level3Reset, level3Key) => (
                      <div key={level3Key} style={{ 
                        border: "1px solid #6c757d", 
                        padding: "10px", 
                        margin: "8px 0", 
                        borderRadius: "5px",
                        backgroundColor: "#f8f9fa"
                      }}>
                        <h5 style={{ margin: "0 0 8px 0" }}>Level 3 Nested (Key: {level3Key})</h5>
                        <Counter reset={level3Reset} label="Level 3 Counter" />
                        
                        <div style={{ marginTop: "8px" }}>
                          <button 
                            onClick={level3Reset}
                            style={{ 
                              padding: "6px 12px", 
                              backgroundColor: "#6c757d", 
                              color: "white", 
                              border: "none", 
                              borderRadius: "3px",
                              cursor: "pointer",
                              fontSize: "12px"
                            }}
                          >
                            Level 3 Reset
                          </button>
                        </div>
                      </div>
                    )}
                  </Reset>
                  
                  <div style={{ marginTop: "10px" }}>
                    <button 
                      onClick={deepReset}
                      style={{ 
                        padding: "8px 16px", 
                        backgroundColor: "#20c997", 
                        color: "white", 
                        border: "none", 
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginRight: "8px"
                      }}
                    >
                      Deep Reset
                    </button>
                    <button 
                      onClick={() => resetByGroup("deep-nested")}
                      style={{ 
                        padding: "8px 16px", 
                        backgroundColor: "#6f42c1", 
                        color: "white", 
                        border: "none", 
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    >
                      Deep Group Reset
                    </button>
                  </div>
                </div>
              )}
            </Reset>
          </div>
        )}
      </Reset>

      {/* 중첩 리셋 컨트롤 패널 */}
      <div style={{ 
        backgroundColor: "#fff3cd", 
        padding: "15px", 
        margin: "20px 0", 
        borderRadius: "8px",
        border: "1px solid #ffeaa7"
      }}>
        <h3 style={{ margin: "0 0 15px 0", color: "#856404" }}>중첩 Reset 컨트롤</h3>
        
        <div style={{ marginBottom: "15px" }}>
          <h4 style={{ margin: "0 0 8px 0" }}>개별 중첩 컴포넌트 리셋:</h4>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button onClick={() => resetById("parent-container")} style={nestedButtonStyle}>
              Parent Container
            </button>
            <button onClick={() => resetById("nested-child1")} style={nestedButtonStyle}>
              Nested Child 1
            </button>
            <button onClick={() => resetById("nested-child2")} style={nestedButtonStyle}>
              Nested Child 2
            </button>
            <button onClick={() => resetById("nested-child3")} style={nestedButtonStyle}>
              Nested Child 3
            </button>
            <button onClick={() => resetById("deeply-nested")} style={nestedButtonStyle}>
              Deeply Nested
            </button>
            <button onClick={() => resetById("level3-nested")} style={nestedButtonStyle}>
              Level 3 Nested
            </button>
          </div>
        </div>

        <div>
          <h4 style={{ margin: "0 0 8px 0" }}>그룹 리셋:</h4>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button 
              onClick={() => resetByGroup("nested-group")} 
              style={{ ...nestedButtonStyle, backgroundColor: "#6f42c1" }}
            >
              Nested Group (Child 1, 2)
            </button>
            <button 
              onClick={() => resetByGroup("all-nested")} 
              style={{ ...nestedButtonStyle, backgroundColor: "#dc3545" }}
            >
              All Nested (Child 2)
            </button>
            <button 
              onClick={() => resetByGroup("deep-nested")} 
              style={{ ...nestedButtonStyle, backgroundColor: "#20c997" }}
            >
              Deep Nested
            </button>
          </div>
        </div>
      </div>

      <div style={{ 
        backgroundColor: "#d1ecf1", 
        padding: "15px", 
        margin: "20px 0", 
        borderRadius: "8px",
        border: "1px solid #bee5eb"
      }}>
        <h3 style={{ margin: "0 0 10px 0", color: "#0c5460" }}>중첩 Reset 테스트 방법:</h3>
        <ol style={{ margin: "0", paddingLeft: "20px" }}>
          <li><strong>Parent Reset</strong>: 전체 컨테이너와 모든 중첩된 컴포넌트들이 리셋됩니다.</li>
          <li><strong>개별 Child Reset</strong>: 각 중첩된 컴포넌트만 개별적으로 리셋됩니다.</li>
          <li><strong>Group Reset</strong>: 특정 그룹에 속한 중첩된 컴포넌트들이 함께 리셋됩니다.</li>
          <li><strong>동기화 테스트</strong>: Child 3은 Parent와 동기화되어 Parent가 리셋되면 함께 리셋됩니다.</li>
          <li><strong>깊은 중첩</strong>: 3단계 중첩된 컴포넌트의 동작을 확인할 수 있습니다.</li>
          <li><strong>Key 값 확인</strong>: 각 컴포넌트의 Key 값이 리셋 시 증가하는지 확인하세요.</li>
        </ol>
      </div>

      <h2>9. 사용법 설명</h2>
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

// 중첩된 Reset
<Reset id="parent">
  {(parentReset, parentKey) => (
    <div key={parentKey}>
      <Reset id="child" groups={["child-group"]}>
        {(childReset, childKey) => (
          <MyComponent key={childKey} reset={childReset} />
        )}
      </Reset>
    </div>
  )}
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

// 중첩 버튼 스타일
const nestedButtonStyle = {
  padding: "6px 12px",
  backgroundColor: "#6c757d",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "12px"
};