# Score Card CLI Tool

###
This is a CLI tool that parses a given text file which holds scoring information about teams on a soccer league. This tool was built using Javascript, specifically with the [Node.js](https://nodejs.org/en/about/) environment. Testing was done using the [Jest](https://jestjs.io/) testing suite. 


### Instructions
* [Install Node](https://nodejs.org/en/download/) on your machine if it is not already.
* Once Node is installed, navigate to the root of this directory in your preferred terminal platform.
* Type `npm i` in your terminal to install the necessary dependencies. Your previous Node installation should have already included NPM.
* Type `npm run start sample-input.txt`. This command should output the following text on your terminal screen:

```
1. Tarantulas, 6 pts
2. Lions, 5 pts
3. FC Awesome, 1 pt
3. Snakes, 1 pt
5. Grouches, 0 pts
```

### Adding Custom Text Files
* You may add new text files and type their file names to see their respective outputs.
* Navigate to `src/assets`, either via your terminal, or your GUI of choice, and add a new `.txt` file into the `assets` directory
* The format of this text file should match the following. Team names and scores can be different, but the spacing, commas, new lines should be the same for this tool to work accurately.
```
Lions 3, Snakes 3
Tarantulas 1, FC Awesome 0
Lions 1, FC Awesome 1
Tarantulas 3, Snakes 1
Lions 4, Grouches 0
```
* The `assets` directory already containts another text file called `test-input.txt` that is mildly different from `sample-input.txt`. Type `npm run start test-input.txt` to see the different output. 
* `expected-output.txt` is just an example of what the expected output on the console should be. This file is for reference only and can be ignored in regard to the functionality of this tool. 

### Tests
* Type `npm run test` to run the provided tests (`text-reader.test.js` and `utils.test.js`)
  * You should see 2 test suites with a total of **13 passing tests**.
  * If you wish to run one testing suite (i.e. one test file), you may type `npm run test <name of specific test file>`, e.g. `npm run test text-reader.test` (the `.js` extension does not need to be included).
* When in your test environment, the CLI tool will look into the `src/__test__/mock-assets` directory for the text file to parse insated of reading command line arguments. It is currently testing a file called `test-input.txt`.
* If you wish run tests on a different test asset: 
  * Add a new text file into `src/__test__/mock-assets`, which matches the specified format previously mentioned above. 
  * Go to `__test__/text-reader.test.js` and go to `Line 5`. Change the `mockText` variable to the name of the new text file you added. 

