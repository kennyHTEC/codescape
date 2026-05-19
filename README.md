# codescape

Interactive programming concepts explorer built with Expo Router and TypeScript.

## Project structure

- `app/` - Expo Router routes (`app/[section]/[concept].tsx` for dynamic concept pages)
- `src/data/` - hardcoded JSON content for sections and concepts
- `src/theme/colors.ts` - dark mode color palette
- `src/components/` - reusable UI components
- `__tests__/` - Jest + React Native Testing Library tests

## Scripts

- `npm start` - start Expo
- `npm run android` - open Android
- `npm run ios` - open iOS
- `npm run web` - open web
- `npm test` - run tests
