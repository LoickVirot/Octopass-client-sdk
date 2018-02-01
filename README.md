# Octopass Client SDK

## Compile
This SDK uses TypeScript. To get JS file, you need to compile the src folder.
First, install TypeScript
```bash
npm install -g typescript
```
Then, you just add to compile project
```bash
tsc
```

## Run tests
Unit tests are managed with Mocha.
```bash
npm install -g mocha
```
Run tests :
```bash
mocha
```

## Troubleshooting
### Test failed: Timeout
Check if webservice is working and good configured (example : database)