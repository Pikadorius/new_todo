import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "store/store";
import {fetchTodosTC} from "features/todolists/todolistsSlice";

function App() {

    const dispatch = useAppDispatch()
    const todolists = useAppSelector(state => state.todolists)

    useEffect(() => {
        dispatch(fetchTodosTC())
    })

    return (
        <div className="App">
            <ul>
                {todolists.map(t=><li key={t.id}>{t.title}</li>)}
            </ul>
        </div>
    );
}

export default App;
