# TransLink React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

Web App built with react/redux front end and node, express back end.

[Deployed Version](https://donaldma-translink.herokuapp.com/)

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
npm run dev
```

To start the client server:
```
cd client
npm install
npm start

npm run build - creates production ready build
```

You are all set, open the web app on your browser: [http://localhost:3000](http://localhost:3000)

#### Pushing code

Make sure your branch is up to date with master branch and has no conflicts, if there are conflicts please resolve your conflicts locally before pushing

```
git checkout master
git pull origin master
git checkout [your feature branch name]
git merge master
git push origin [your feature branch name]
```

Go on the [Github Repository](https://github.com/donaldma/translink)
<br>
Create a new pull request
<br>
base: master
<br>
compare: [your feature branch]

Have at least one approved review, then merge into master.