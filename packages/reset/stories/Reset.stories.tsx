import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Reset, resetById, resetByGroup, triggerSync } from '../src';

// Counter component example
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
          Internal Reset
        </button>
      </div>
    </div>
  );
}

// Control Panel component
function ControlPanel() {
  return (
    <div style={{ 
      backgroundColor: "#e9ecef", 
      padding: "15px", 
      margin: "20px 0", 
      borderRadius: "8px" 
    }}>
      <h3 style={{ margin: "0 0 15px 0" }}>Reset Controls</h3>
      
      <div style={{ marginBottom: "15px" }}>
        <h4 style={{ margin: "0 0 8px 0" }}>Individual Reset:</h4>
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
          <button onClick={() => resetById("complete-counter1")} style={buttonStyle}>
            Complete Counter 1
          </button>
          <button onClick={() => resetById("complete-counter2")} style={buttonStyle}>
            Complete Counter 2
          </button>
          <button onClick={() => resetById("complete-form-field1")} style={buttonStyle}>
            Complete Form Field 1
          </button>
          <button onClick={() => resetById("complete-form-field2")} style={buttonStyle}>
            Complete Form Field 2
          </button>
          <button onClick={() => resetById("complete-sidebar-widget")} style={buttonStyle}>
            Complete Sidebar Widget
          </button>
        </div>
      </div>

      <div>
        <h4 style={{ margin: "0 0 8px 0" }}>Group Reset:</h4>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button 
            onClick={() => resetByGroup("form")} 
            style={{ ...buttonStyle, backgroundColor: "#e3f2fd" }}
          >
            Form Group
          </button>
          <button 
            onClick={() => resetByGroup("sidebar")} 
            style={{ ...buttonStyle, backgroundColor: "#f3e5f5" }}
          >
            Sidebar Group
          </button>
          <button 
            onClick={() => resetByGroup("all")} 
            style={{ ...buttonStyle, backgroundColor: "#ffebee" }}
          >
            Reset All
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
# Reset Component Examples

The Reset component is a library that allows you to reset the state of React components.

## Key Features

- **Individual Reset**: Reset components by specific ID
- **Group Reset**: Reset multiple components simultaneously by grouping them
- **TypeScript Support**: Provides autocomplete and type safety
- **Duplicate ID Error**: Automatically detects and prevents duplicate ID usage

## Usage

\`\`\`tsx
// With ID only
<Reset id="counter1">
  {(reset, key) => <MyComponent key={key} reset={reset} />}
</Reset>

// With ID + groups
<Reset id="form-field1" groups={["form", "all"]}>
  {(reset, key) => <MyComponent key={key} reset={reset} />}
</Reset>

// Individual reset
resetById("counter1")

// Group reset
resetByGroup("form")
\`\`\`

## Duplicate ID Error

When the same ID is used for multiple Reset components, an error occurs immediately:

\`\`\`tsx
// ❌ Error - Same ID usage
<Reset id="duplicate-id">
  {(reset, key) => <div key={key}>First Component</div>}
</Reset>

<Reset id="duplicate-id">  {/* Error! Same ID */}
  {(reset, key) => <div key={key}>Second Component</div>}
</Reset>

// ✅ Correct usage - Unique IDs
<Reset id="component-1">
  {(reset, key) => <div key={key}>First Component</div>}
</Reset>

<Reset id="component-2">
  {(reset, key) => <div key={key}>Second Component</div>}
</Reset>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Reset>;

export default meta;
type Story = StoryObj<typeof meta>;

// Example Story type (used without args)
type ExampleStory = {
  render: () => React.JSX.Element;
};

// Basic example
export const BasicExample: ExampleStory = {
  render: () => (
    <div>
      <h2>Basic Usage</h2>
      <p>Components with ID only.</p>
      
      <Reset id="counter1">
        {(reset, key) => <Counter key={key} reset={reset} label="Counter 1 (ID only)" />}
      </Reset>

      <Reset id="counter2">
        {(reset, key) => <Counter key={key} reset={reset} label="Counter 2 (ID only)" />}
      </Reset>

      <ControlPanel />
    </div>
  ),
};

// Group example
export const GroupExample: ExampleStory = {
  render: () => (
    <div>
      <h2>Group Functionality</h2>
      <p>Components with both ID and groups.</p>
      
      <h3>Form Group</h3>
      <Reset id="form-field1" groups={["form", "all"]}>
        {(reset, key) => <Counter key={key} reset={reset} label="Form Field 1 (form, all groups)" />}
      </Reset>

      <Reset id="form-field2" groups={["form", "all"]}>
        {(reset, key) => <Counter key={key} reset={reset} label="Form Field 2 (form, all groups)" />}
      </Reset>

      <h3>Sidebar Group</h3>
      <Reset id="sidebar-widget" groups={["sidebar", "all"]}>
        {(reset, key) => <Counter key={key} reset={reset} label="Sidebar Widget (sidebar, all groups)" />}
      </Reset>

      <ControlPanel />
    </div>
  ),
};

// Complete example
export const CompleteExample: ExampleStory = {
  render: () => (
    <div>
      <h2>Complete Example</h2>
      <p>Example including all features.</p>
      
      <h3>Individual ID Components</h3>
      <Reset id="complete-counter1">
        {(reset, key) => <Counter key={key} reset={reset} label="Counter 1 (ID only)" />}
      </Reset>

      <Reset id="complete-counter2">
        {(reset, key) => <Counter key={key} reset={reset} label="Counter 2 (ID only)" />}
      </Reset>

      <h3>Form Group Components</h3>
      <Reset id="complete-form-field1" groups={["form", "all"]}>
        {(reset, key) => <Counter key={key} reset={reset} label="Form Field 1 (form, all groups)" />}
      </Reset>

      <Reset id="complete-form-field2" groups={["form", "all"]}>
        {(reset, key) => <Counter key={key} reset={reset} label="Form Field 2 (form, all groups)" />}
      </Reset>

      <h3>Sidebar Group Component</h3>
      <Reset id="complete-sidebar-widget" groups={["sidebar", "all"]}>
        {(reset, key) => <Counter key={key} reset={reset} label="Sidebar Widget (sidebar, all groups)" />}
      </Reset>

      <ControlPanel />

      <div style={{ 
        backgroundColor: "#f8f9fa", 
        padding: "15px", 
        margin: "20px 0", 
        borderRadius: "8px",
        border: "1px solid #dee2e6"
      }}>
        <h3>Group Description</h3>
        <ul style={{ margin: "0", paddingLeft: "20px" }}>
          <li><strong>form group</strong>: form-field1, form-field2</li>
          <li><strong>sidebar group</strong>: sidebar-widget</li>
          <li><strong>all group</strong>: form-field1, form-field2, sidebar-widget</li>
        </ul>
      </div>
    </div>
  ),
};

// Duplicate ID Error Test
export const DuplicateIdErrorTest: ExampleStory = {
  render: () => {
    const [showDuplicate, setShowDuplicate] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const testDuplicateId = () => {
      setError(null);
      try {
        setShowDuplicate(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      }
    };

    return (
      <div>
        <h2>Duplicate ID Error Test</h2>
        <p>Test the duplicate ID error functionality by clicking the button below.</p>
        
        <button 
          onClick={testDuplicateId}
          style={{ 
            padding: "8px 16px", 
            backgroundColor: "#f44336", 
            color: "white", 
            border: "none", 
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: "20px"
          }}
        >
          Test Duplicate ID Error
        </button>
        
        {error && (
          <div style={{ 
            border: "2px solid #f44336", 
            padding: "15px", 
            margin: "10px 0", 
            borderRadius: "8px",
            backgroundColor: "#ffebee",
            color: "#d32f2f"
          }}>
            <h4>Error Occurred!</h4>
            <p>{error}</p>
          </div>
        )}
        
        {showDuplicate && !error && (
          <div>
            <div style={{ 
              border: "2px solid #ff9800", 
              padding: "15px", 
              margin: "10px 0", 
              borderRadius: "8px",
              backgroundColor: "#fff3e0"
            }}>
              <h4>Duplicate ID Test Running</h4>
              <p>Two components with the same ID will be rendered below. An error should occur on the second component.</p>
            </div>
            
            <div>
              <Reset id="duplicate-test">
                {(reset, key) => (
                  <div key={key} style={{ 
                    border: "1px solid #4caf50", 
                    padding: "10px", 
                    margin: "5px",
                    backgroundColor: "#e8f5e8"
                  }}>
                    <p>✅ First Component (ID: duplicate-test) - Normal Rendering</p>
                    <button onClick={reset}>Reset</button>
                  </div>
                )}
              </Reset>
              
              <Reset id="duplicate-test">
                {(reset, key) => (
                  <div key={key} style={{ 
                    border: "1px solid #f44336", 
                    padding: "10px", 
                    margin: "5px",
                    backgroundColor: "#ffebee"
                  }}>
                    <p>❌ Second Component (ID: duplicate-test) - Error Occurred!</p>
                    <button onClick={reset}>Reset</button>
                  </div>
                )}
              </Reset>
            </div>
            
            <button 
              onClick={() => {
                setShowDuplicate(false);
                setError(null);
              }}
              style={{ 
                padding: "6px 12px", 
                backgroundColor: "#6c757d", 
                color: "white", 
                border: "none", 
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "10px"
              }}
            >
              Reset Test
            </button>
          </div>
        )}
        
        <div style={{ 
          border: "2px solid #ff9800", 
          padding: "15px", 
          margin: "20px 0", 
          borderRadius: "8px",
          backgroundColor: "#fff3e0"
        }}>
          <h3>Error Example</h3>
          <p>The following code will cause an error:</p>
          <pre style={{ 
            backgroundColor: "#f5f5f5", 
            padding: "10px", 
            borderRadius: "4px",
            overflow: "auto"
          }}>
{`// ❌ Error - Same ID usage
<Reset id="duplicate-id">
  {(reset, key) => <div key={key}>First Component</div>}
</Reset>

<Reset id="duplicate-id">  {/* Error! Same ID */}
  {(reset, key) => <div key={key}>Second Component</div>}
</Reset>

// ✅ Correct usage - Unique IDs
<Reset id="component-1">
  {(reset, key) => <div key={key}>First Component</div>}
</Reset>

<Reset id="component-2">
  {(reset, key) => <div key={key}>Second Component</div>}
</Reset>`}
          </pre>
        </div>
      </div>
    );
  },
};

// Code examples
export const CodeExample: ExampleStory = {
  render: () => (
    <div>
      <h2>Code Examples</h2>
      
      <div style={{ 
        backgroundColor: "#f8f9fa", 
        padding: "15px", 
        margin: "20px 0", 
        borderRadius: "8px",
        border: "1px solid #dee2e6"
      }}>
        <h3>Basic Usage</h3>
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
      <button onClick={reset}>Reset</button>
    </div>
  );
}

// Usage
<Reset id="counter1">
  {(reset, key) => <MyComponent key={key} reset={reset} />}
</Reset>

// Reset
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
        <h3>Group Usage</h3>
        <pre style={{ 
          backgroundColor: "#fff", 
          padding: "15px", 
          borderRadius: "4px",
          overflow: "auto",
          fontSize: "14px",
          border: "1px solid #e9ecef"
        }}>
{`// Component belonging to multiple groups
<Reset id="form-field1" groups={["form", "all"]}>
  {(reset, key) => <MyComponent key={key} reset={reset} />}
</Reset>

// Group reset
resetByGroup("form");  // Reset all components in form group
resetByGroup("all");   // Reset all components in all group`}
        </pre>
      </div>
    </div>
  ),
};

// Synchronized re-rendering example
export const SyncExample: ExampleStory = {
  render: () => (
    <div style={{ padding: "20px" }}>
      <h2>Synchronized Re-rendering Example</h2>
      <p>When a specific component re-renders, other components also re-render together.</p>
      
      {/* Master component */}
      <Reset id="sync-master">
        {(reset, key) => (
          <div key={key} style={{ 
            border: "2px solid #007acc", 
            padding: "15px", 
            margin: "10px", 
            borderRadius: "8px",
            backgroundColor: "#e3f2fd"
          }}>
            <h3 style={{ margin: "0 0 10px 0" }}>Master Component</h3>
            <p style={{ margin: "5px 0" }}>When this component re-renders, other synchronized components also re-render together.</p>
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
                onClick={() => triggerSync("sync-master")}
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

      {/* Synchronized components */}
      <Reset id="sync-slave1" syncWith={["sync-master"]}>
        {(reset, key) => (
          <Counter key={key} reset={reset} label="Slave 1 (Counter)" />
        )}
      </Reset>

      <Reset id="sync-slave2" syncWith={["sync-master"]}>
        {(reset, key) => (
          <Counter key={key} reset={reset} label="Slave 2 (Counter)" />
        )}
      </Reset>

      <Reset id="sync-slave3" syncWith={["sync-master"]}>
        {(reset, key) => (
          <Counter key={key} reset={reset} label="Slave 3 (Counter)" />
        )}
      </Reset>

      {/* Independent component */}
      <Reset id="sync-independent">
        {(reset, key) => (
          <Counter key={key} reset={reset} label="Independent (Not Synced)" />
        )}
      </Reset>

      <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
        <h3>Usage:</h3>
        <ul>
          <li><strong>Master Reset</strong>: Reset only the master component</li>
          <li><strong>Trigger Sync</strong>: Trigger re-rendering of the master component to re-render all synchronized components together</li>
          <li><strong>Slave Reset</strong>: Individual reset of each slave component</li>
        </ul>
      </div>
    </div>
  ),
};

// Multi-sync example
export const MultiSyncExample: ExampleStory = {
  render: () => (
    <div style={{ padding: "20px" }}>
      <h2>Multi-Sync Example</h2>
      <p>Shows complex synchronization relationships between multiple components.</p>
      
      {/* Component A */}
      <Reset id="multi-component-a">
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
                onClick={() => triggerSync("multi-component-a")}
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

      {/* Component B - Synced with A */}
      <Reset id="multi-component-b" syncWith={["multi-component-a"]}>
        {(reset, key) => (
          <Counter key={key} reset={reset} label="Component B (Synced with A)" />
        )}
      </Reset>

      {/* Component C - Synced with both A and B */}
      <Reset id="multi-component-c" syncWith={["multi-component-a", "multi-component-b"]}>
        {(reset, key) => (
          <Counter key={key} reset={reset} label="Component C (Synced with A & B)" />
        )}
      </Reset>

      {/* Component D - Synced with B only */}
      <Reset id="multi-component-d" syncWith={["multi-component-b"]}>
        {(reset, key) => (
          <Counter key={key} reset={reset} label="Component D (Synced with B only)" />
        )}
      </Reset>

      <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
        <h3>Synchronization Relationships:</h3>
        <ul>
          <li><strong>A → B, C</strong>: When A re-renders, B and C also re-render together</li>
          <li><strong>B → C, D</strong>: When B re-renders, C and D also re-render together</li>
          <li><strong>C</strong>: Affected by both A and B</li>
          <li><strong>D</strong>: Affected only by B</li>
        </ul>
      </div>
    </div>
  ),
};

// Nested Reset component example
export const NestedResetExample: ExampleStory = {
  render: () => (
    <div style={{ padding: "20px" }}>
      <h2>Nested Reset Component Example</h2>
      <p>Tests the behavior when Reset components are nested inside other Reset components.</p>
      
      {/* Nested Reset example */}
      <Reset id="nested-parent-container">
        {(parentReset, parentKey) => (
          <div key={parentKey} style={{ 
            border: "3px solid #28a745", 
            padding: "20px", 
            margin: "15px", 
            borderRadius: "10px",
            backgroundColor: "#d4edda"
          }}>
            <h3 style={{ margin: "0 0 15px 0", color: "#155724" }}>Parent Container (Key: {parentKey})</h3>
            <p style={{ margin: "5px 0" }}>This container has multiple nested Reset components inside.</p>
            
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
                onClick={() => triggerSync("nested-parent-container")}
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

            {/* First nested Reset */}
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

            {/* Second nested Reset */}
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

            {/* Third nested Reset - with synchronization */}
            <Reset id="nested-child3" syncWith={["nested-parent-container"]}>
              {(child3Reset, child3Key) => (
                <div key={child3Key} style={{ 
                  border: "2px solid #e83e8c", 
                  padding: "15px", 
                  margin: "10px 0", 
                  borderRadius: "8px",
                  backgroundColor: "#fce4ec"
                }}>
                  <h4 style={{ margin: "0 0 10px 0", color: "#721c24" }}>Nested Child 3 (Key: {child3Key}) - Synced with Parent</h4>
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

            {/* Deep nesting example */}
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
                  
                  {/* 3-level nesting */}
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

      {/* Nested reset control panel */}
      <div style={{ 
        backgroundColor: "#fff3cd", 
        padding: "15px", 
        margin: "20px 0", 
        borderRadius: "8px",
        border: "1px solid #ffeaa7"
      }}>
        <h3 style={{ margin: "0 0 15px 0", color: "#856404" }}>Nested Reset Controls</h3>
        
        <div style={{ marginBottom: "15px" }}>
          <h4 style={{ margin: "0 0 8px 0" }}>Individual Nested Component Reset:</h4>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button onClick={() => resetById("nested-parent-container")} style={buttonStyle}>
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
          <h4 style={{ margin: "0 0 8px 0" }}>Group Reset:</h4>
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
        <h3 style={{ margin: "0 0 10px 0", color: "#0c5460" }}>Nested Reset Testing Methods:</h3>
        <ol style={{ margin: "0", paddingLeft: "20px" }}>
          <li><strong>Parent Reset</strong>: The entire container and all nested components are reset.</li>
          <li><strong>Individual Child Reset</strong>: Each nested component is reset individually.</li>
          <li><strong>Group Reset</strong>: Nested components belonging to specific groups are reset together.</li>
          <li><strong>Synchronization Test</strong>: Child 3 is synchronized with Parent, so when Parent is reset, it resets together.</li>
          <li><strong>Deep Nesting</strong>: You can check the behavior of 3-level nested components.</li>
          <li><strong>Key Value Check</strong>: Check if each component's Key value increases when reset.</li>
        </ol>
      </div>
    </div>
  ),
};