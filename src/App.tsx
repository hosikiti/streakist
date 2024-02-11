import React from 'react';
import './App.css';
import IndexPage from './pages';
import AppProvider from './providers/app';

function App() {
    return (
        <AppProvider>
            <IndexPage />
        </AppProvider>
    );
}

export default App;
