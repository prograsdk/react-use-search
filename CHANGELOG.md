# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- Debouning of the event handler returned from `useSearch`.

## [0.2.1] - 2019-08-27

### Added

- `Predicate<T>` and `Options` types are now exported.

### Changed

- _Internal_: The actual collection filtering has been abstracted out into an internal helper function.

## [0.2.0] - 2019-08-20

### Added

- `useSearch` React hook for filtering collections of objects based on user input.
