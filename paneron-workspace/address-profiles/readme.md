# Address Profiles Dev Readme
This is an extension from **@riboseinc/paneron** 
## Installation
1. clone this address-profiles into your comfortable destination and cd into.
2. install the modules
```
yarn install
```
3. build the extension for Paneron
```
yarn build
```
4. copy the dist folder into the app data location 
```
#MacOS
cp -R dist/ /Users/<mac-os-user-name>/Library/Application\ Support/Electron/plugins/@riboseinc/paneron-extension-address-profiles

#Windows
cp -R dist/ C:\Users\<windows-user-name>\AppData\Roaming\Electron\plugins\@riboseinc\paneron-extension-address-profiles
```
5. cd into Paneron application
6. run Paneron with local extension
```
env PANERON_DEV_PLUGIN=address-profiles yarn dev
```
7. Done