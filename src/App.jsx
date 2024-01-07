import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {AirtableApiProvider} from './contexts/ImportContexts.jsx'
import {AllTablesPage, ErrorPage, HomePage, RouteNotFoundPage} from './pages/ImportPages.jsx'
import {allTablesPath, errorPath, homePath} from './globals/Routes.jsx'
import {SharedLayout} from './components/ImportComponents.jsx'

function App() {
    return (
        <BrowserRouter>
            <AirtableApiProvider>
                <Routes>
                    <Route path={homePath} element={<SharedLayout/>}>
                        <Route path={homePath} element={<HomePage/>}/>
                        <Route path={allTablesPath(':baseId')} element={<AllTablesPage/>}/>
                        <Route path={errorPath} element={<ErrorPage/>}/>
                        <Route path='*' element={<RouteNotFoundPage/>}/>
                    </Route>
                </Routes>
            </AirtableApiProvider>
        </BrowserRouter>
    )
}

export default App