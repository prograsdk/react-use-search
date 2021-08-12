# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.0] - 2021-08-12

### Added

 - `useSearch` now returns a `setQuery` function for programmatically updating the query string.

## [0.2.8] - 2021-08-11

### Added

 - Basically the same as below.

## [0.2.7] - 2021-08-11

### Added

 - The event handler type introduced in v0.2.6 is now actually reflected in the return type of `useSearch`.

## [0.2.6] - 2021-08-11

### Added

 - The input event handler return by `useSearch` is now typed to handle the `onChangeText` event (`(text: string) => void`) in React Native.

## [0.2.5] - 2020-08-17

### Added

 - Published package now includes `.es.js` and `.d.ts` files.

## [0.2.4] - 2020-08-17

### Changed

- All development dependencies updated.

## [0.2.3] - 2019-09-03

### Removed

- `console.log` statement in internal effect in `useSearch`.

## [0.2.2] - 2019-08-29

### Added

- A `debounce` (`number`) value can now be passed to the `useSearch` options.

## [0.2.1] - 2019-08-27

### Added

- `Predicate<T>` and `Options` types are now exported.

### Changed

- _Internal_: The actual collection filtering has been abstracted out into an internal helper function.

## [0.2.0] - 2019-08-20

### Added

- `useSearch` React hook for filtering collections of objects based on user input.
