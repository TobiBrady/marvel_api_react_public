import './App.css';
import React from 'react';

import { Helmet } from 'react-helmet';

import { MarvelList } from "./Components/MarvelPull"
import { Banner } from "./Components/Banner"
import { Footer } from "./Components/Footer"
import favicon from "./Components/favicon.ico"

function App() {

    return (
        <div className="App">
            <Helmet>
                <title>MARVEL | Random Character</title>
                <link rel="icon" type="image/*" href={favicon} />
            </Helmet>
            
            <Banner />
            <MarvelList />
            <Footer />
        </div>
    )
}

export default App;
