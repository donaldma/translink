# TransLink React App

This project was bootstrapped with <a href="https://github.com/facebook/create-react-app" target="_blank">Create React App</a>.

Web App built with react/redux front end and node, express back end.

<a href="https://donaldma-translink.herokuapp.com/" target="_blank">Deployed Version</a>

## Development

Want to contribute? Great!

#### Getting started
```
git clone git@github.com:donaldma/translink.git
git checkout -b [your feature branch name]
```

To start the express server:
```
cp .env.example .env
npm install
npm start
```

To start the client server:
```
cd client
npm install
npm start

npm run build - creates production ready build
```

You are all set, open the web app on your browser: <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>

#### Pushing code

Make sure your branch is up to date with master branch and has no conflicts, if there are conflicts please resolve your conflicts locally before pushing

```
git checkout master
git pull origin master
git checkout [your feature branch name]
git merge master
git push origin [your feature branch name]
```

Go on the <a href="https://github.com/donaldma/translink" target="_blank">Github Repository</a>
<br>
Create a new pull request
<br>
base: master
<br>
compare: [your feature branch]

Have at least one approved review, then merge into master.