import React, {useEffect} from 'react';
import './App.css';
import Pages from "pages/Pages";
import {useAppDispatch} from "common/hooks/hooks";

function App() {

    const dispatch = useAppDispatch()

    return (
        <div className="App">
            <Pages/>
        </div>
    );
}

export default App;
