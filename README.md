
# React Starter with NRedux 

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Add NRedux to store

```
import { useNReduxDispatcher,useNReduxState } from "../nredux";

function Main(){
}

export default connect(useNReduxState, useNReduxDispatcher)(Main);
```

