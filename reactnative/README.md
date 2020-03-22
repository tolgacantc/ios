# ios

# How to create a new project?


## Using expo client
* Run `npm install -g expo-cli`
* Run `expo init <project-name>`
* Run `npm start`. This will open web browser with an QR code (code also avaliable at command line)
* Scan QR code by camera and open Expo app

## Using React Native
https://reactnative.dev/docs/getting-started
To run with xcode
* Install node and watchman if not exists already
```
brew install node
brew install watchman
```
* Run `npx react-native init <project-name>`
* Go to directory
* Run `npx react-native run-ios`. This will run the app on a simulator.

# Uncooked

* How to install a new package. This will also update package.json
```
	npm i <package-name> 
	or
	 npm install --save <package-name>
```
* Clean up
```
	watchman watch-del-all && rm -rf $TMPDIR/react-* && rm -rf node_modules/ && rm -f package-lock.json && rm -f yarn.lock && npm cache verify && npm install && expo r -c
```
* How to log
```
onPress={console.log(JSON.stringify(this.props))}
```

# Links

* https://reactnative.dev/docs/tutorial
* https://hackernoon.com/react-native-for-beginners-fb3095968acf
	* https://github.com/drex44/QR-Scanner
* https://www.instamobile.io/react-native-tutorials/react-native-app-ideas-beginners/
* https://reactnative.dev/docs/getting-started

