import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Reset, resetById, resetByGroup, triggerSync } from '../src';

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

// 동기화 리렌더링 예제
export const SyncExample: ExampleStory = {
  render: () => (
    <div style={{ padding: "20px" }}>
      <h2>동기화 리렌더링 예제</h2>
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
            <h3 style={{ margin: "0 0 10px 0" }}>Master Component</h3>
            <p style={{ margin: "5px 0" }}>이 컴포넌트가 리렌더링되면 다른 컴포넌트들도 함께 리렌더링됩니다.</p>
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
                Master Reset
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
                Trigger Sync
              </button>
            </div>
          </div>
        )}
      </Reset>

      {/* 동기화된 컴포넌트들 */}
      <Reset id="slave1" syncWith={["master"]}>
        {(reset, key) => (
          <Counter key={key} reset={reset} label="Slave 1 (Counter)" />
        )}
      </Reset>

      <Reset id="slave2" syncWith={["master"]}>
        {(reset, key) => (
          <Counter key={key} reset={reset} label="Slave 2 (Counter)" />
        )}
      </Reset>

      <Reset id="slave3" syncWith={["master"]}>
        {(reset, key) => (
          <Counter key={key} reset={reset} label="Slave 3 (Counter)" />
        )}
      </Reset>

      {/* 독립적인 컴포넌트 */}
      <Reset id="independent">
        {(reset, key) => (
          <Counter key={key} reset={reset} label="Independent (Not Synced)" />
        )}
      </Reset>

      <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
        <h3>사용법:</h3>
        <ul>
          <li><strong>Master Reset</strong>: 마스터 컴포넌트만 리셋</li>
          <li><strong>Trigger Sync</strong>: 마스터 컴포넌트의 리렌더링을 트리거하여 모든 동기화된 컴포넌트들도 함께 리렌더링</li>
          <li><strong>Slave Reset</strong>: 각 슬레이브 컴포넌트 개별 리셋</li>
        </ul>
      </div>
    </div>
  ),
};

// 다중 동기화 예제
export const MultiSyncExample: ExampleStory = {
  render: () => (
    <div style={{ padding: "20px" }}>
      <h2>다중 동기화 예제</h2>
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
            <h3 style={{ margin: "0 0 10px 0" }}>Component A</h3>
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
                Reset A
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
                Sync A
              </button>
            </div>
          </div>
        )}
      </Reset>

      {/* 컴포넌트 B - A와 동기화 */}
      <Reset id="component-b" syncWith={["component-a"]}>
        {(reset, key) => (
          <Counter key={key} reset={reset} label="Component B (Synced with A)" />
        )}
      </Reset>

      {/* 컴포넌트 C - A와 B 모두와 동기화 */}
      <Reset id="component-c" syncWith={["component-a", "component-b"]}>
        {(reset, key) => (
          <Counter key={key} reset={reset} label="Component C (Synced with A & B)" />
        )}
      </Reset>

      {/* 컴포넌트 D - B와만 동기화 */}
      <Reset id="component-d" syncWith={["component-b"]}>
        {(reset, key) => (
          <Counter key={key} reset={reset} label="Component D (Synced with B only)" />
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
    </div>
  ),
};

// 중첩된 Reset 컴포넌트 예제
export const NestedResetExample: ExampleStory = {
  render: () => (
    <div style={{ padding: "20px" }}>
      <h2>중첩된 Reset 컴포넌트 예제</h2>
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
                Parent Reset
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
                Parent Sync
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
                      Group Reset
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
                  <Counter reset={child2Reset} label="Child 2 Counter" />
                  
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
            <button onClick={() => resetById("parent-container")} style={buttonStyle}>
              Parent Container
            </button>
            <button onClick={() => resetById("nested-child1")} style={buttonStyle}>
              Nested Child 1
            </button>
            <button onClick={() => resetById("nested-child2")} style={buttonStyle}>
              Nested Child 2
            </button>
            <button onClick={() => resetById("nested-child3")} style={buttonStyle}>
              Nested Child 3
            </button>
            <button onClick={() => resetById("deeply-nested")} style={buttonStyle}>
              Deeply Nested
            </button>
            <button onClick={() => resetById("level3-nested")} style={buttonStyle}>
              Level 3 Nested
            </button>
          </div>
        </div>

        <div>
          <h4 style={{ margin: "0 0 8px 0" }}>그룹 리셋:</h4>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button 
              onClick={() => resetByGroup("nested-group")} 
              style={{ ...buttonStyle, backgroundColor: "#6f42c1" }}
            >
              Nested Group (Child 1, 2)
            </button>
            <button 
              onClick={() => resetByGroup("all-nested")} 
              style={{ ...buttonStyle, backgroundColor: "#dc3545" }}
            >
              All Nested (Child 2)
            </button>
            <button 
              onClick={() => resetByGroup("deep-nested")} 
              style={{ ...buttonStyle, backgroundColor: "#20c997" }}
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
    </div>
  ),
};