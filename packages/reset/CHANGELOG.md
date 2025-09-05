# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-09-06

### Added
- Initial release of @ohah/reset
- `Reset` component for wrapping components that need reset functionality
- `resetById` function for resetting individual components by ID
- `resetByGroup` function for resetting multiple components by group
- Full TypeScript support with type definitions
- React Native support
- ESM and CommonJS build outputs
- Comprehensive documentation and examples
- Storybook integration for interactive examples

### Features
- Individual component reset by unique ID
- Group-based reset for multiple components
- TypeScript autocomplete and type safety
- Lightweight with minimal dependencies
- Universal compatibility with any React component
- React Native support for mobile development

### Technical Details
- Built with rslib for optimal bundle size
- Uses mitt for event bus functionality
- Supports both ESM and CommonJS module systems
- Includes TypeScript declaration files
- Compatible with React 16.9+ and React Native
