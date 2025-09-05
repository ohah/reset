# @ohah/reset

A React component reset library with full TypeScript support. Reset individual components by ID or multiple components by group.

## ✨ Features

- 🎯 **Individual Reset**: Reset specific components by ID
- 👥 **Group Reset**: Reset multiple components simultaneously by group
- 🔧 **TypeScript Support**: Full type safety and autocomplete
- ⚡ **Lightweight**: Minimal dependencies for fast performance
- 🌐 **Universal**: Works with any React component
- 📱 **React Native Support**: Works on mobile platforms

## 📦 Installation

```bash
npm install @ohah/reset
```

```bash
yarn add @ohah/reset
```

```bash
pnpm add @ohah/reset
```

## 🚀 Basic Usage

### Individual Reset

```tsx
import React, { useState } from 'react';
import { Reset, resetById } from '@ohah/reset';

function Counter({ reset }: { reset: () => void }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

function App() {
  return (
    <div>
      <Reset id="counter1">
        {(reset, key) => <Counter key={key} reset={reset} />}
      </Reset>
      
      <button onClick={() => resetById("counter1")}>
        Reset from outside
      </button>
    </div>
  );
}
```

### Group Reset

```tsx
import React, { useState } from 'react';
import { Reset, resetByGroup } from '@ohah/reset';

function App() {
  return (
    <div>
      {/* Form group */}
      <Reset id="form-field1" groups={["form", "all"]}>
        {(reset, key) => <MyComponent key={key} reset={reset} />}
      </Reset>
      
      <Reset id="form-field2" groups={["form", "all"]}>
        {(reset, key) => <MyComponent key={key} reset={reset} />}
      </Reset>
      
      {/* Sidebar group */}
      <Reset id="sidebar-widget" groups={["sidebar", "all"]}>
        {(reset, key) => <MyComponent key={key} reset={reset} />}
      </Reset>
      
      {/* Group reset buttons */}
      <button onClick={() => resetByGroup("form")}>
        Reset Form Group
      </button>
      <button onClick={() => resetByGroup("sidebar")}>
        Reset Sidebar Group
      </button>
      <button onClick={() => resetByGroup("all")}>
        Reset All
      </button>
    </div>
  );
}
```

## 📚 API Documentation

### Reset Component

```tsx
<Reset id="unique-id" groups={["group1", "group2"]}>
  {(reset, key) => <YourComponent key={key} reset={reset} />}
</Reset>
```

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | ✅ | Unique identifier for the component |
| `groups` | `string[]` | ❌ | Groups the component belongs to |
| `children` | `(reset: () => void, key: number) => ReactNode` | ✅ | Render function |

### resetById Function

```tsx
resetById(id: string): void
```

Resets a component with the specified ID.

### resetByGroup Function

```tsx
resetByGroup(groupId: string): void
```

Resets all components that belong to the specified group.

## 🎯 Use Cases

### Form Reset

```tsx
function ContactForm() {
  return (
    <form>
      <Reset id="name-field" groups={["contact-form"]}>
        {(reset, key) => <NameInput key={key} reset={reset} />}
      </Reset>
      
      <Reset id="email-field" groups={["contact-form"]}>
        {(reset, key) => <EmailInput key={key} reset={reset} />}
      </Reset>
      
      <Reset id="message-field" groups={["contact-form"]}>
        {(reset, key) => <MessageInput key={key} reset={reset} />}
      </Reset>
      
      <button onClick={() => resetByGroup("contact-form")}>
        Clear Form
      </button>
    </form>
  );
}
```

### Dashboard Widget Reset

```tsx
function Dashboard() {
  return (
    <div>
      <Reset id="chart-widget" groups={["dashboard", "all"]}>
        {(reset, key) => <ChartWidget key={key} reset={reset} />}
      </Reset>
      
      <Reset id="stats-widget" groups={["dashboard", "all"]}>
        {(reset, key) => <StatsWidget key={key} reset={reset} />}
      </Reset>
      
      <Reset id="table-widget" groups={["dashboard", "all"]}>
        {(reset, key) => <TableWidget key={key} reset={reset} />}
      </Reset>
      
      <button onClick={() => resetByGroup("dashboard")}>
        Refresh Dashboard
      </button>
    </div>
  );
}
```

## 🔧 TypeScript Support

This library provides full TypeScript support:

```tsx
import { Reset, resetById, resetByGroup } from '@ohah/reset';

// Autocomplete support
resetById("counter1"); // ✅ Autocomplete
resetByGroup("form");  // ✅ Autocomplete

// Type safety
<Reset id="counter1" groups={["form"]}>
  {(reset, key) => <MyComponent key={key} reset={reset} />}
</Reset>
```

## 🌐 React Native Support

Works seamlessly with React Native:

```tsx
import { Reset, resetById } from '@ohah/reset';

function NativeApp() {
  return (
    <View>
      <Reset id="native-counter">
        {(reset, key) => <NativeCounter key={key} reset={reset} />}
      </Reset>
      
      <TouchableOpacity onPress={() => resetById("native-counter")}>
        <Text>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}
```

## 📖 Examples

Check out more examples in our [Storybook](https://github.com/ohah/reset).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [GitHub Repository](https://github.com/ohah/reset)
- [npm Package](https://www.npmjs.com/package/@ohah/reset)
- [Issues](https://github.com/ohah/reset/issues)

---

Made with ❤️ by [ohah](https://github.com/ohah)