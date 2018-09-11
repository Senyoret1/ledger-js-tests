# ledger-js-tests

## Configuration

Before you can perform tests with this repository, it is necessary to execute `npm install` both in the root directory and in `/src`.
After that, After that, you must also run `./node_modules/.bin/electron-rebuild` (if you are using the windows command console you
will have to run `.\node_modules\.bin\electron-rebuild.cmd` instead) in the `/src` folder.

## Compile the test app

To perform the tests you must simply open the executable file. However, before this it is necessary to compile the application.
Depending on your operating system, you must run some of the following commands:

Windows: `npm run dist-win64`

Linux: `npm run dist-linux`

Mac: `npm run dist-mac`

The compiled files are saved in the `release` folder. The executable file should be called `ledger-js-tests` and be inside a folder
whose name depends on the operating system, but part of its name contains `unpacked`.

When you run the application, it displays a series of error dialogs with information obtained from the hardware wallet. The last
dialog should have the title `Address response` and contain the first address obtained from the hardware wallet.

To run the tests again, it is necessary to close the app and run it again.

## Update the "ledger js" library

The repository includes a compiled version of the relevant elements of the ledger js library. If you want to use a different version,
you must replace the contents of the `packages` folder with the updated versions you want to use.

## Test code

The test code can be found in the `/src/electron-main.js` file. The file contains a large amount of base code for the operation of
the application, which has nothing to do with the tests as such. The test code is among the comments `Testig code start` and
`Testig code end`.
