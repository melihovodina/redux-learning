import React, { useEffect } from 'react';
import './index.css';
import PostContainer from './components/PostContainer';
import UsersContainer from './components/UsersContainer';

function App() {
  return (
    <div className="App">
      <UsersContainer/>
      <PostContainer/>
    </div>
  );
}

export default App;
