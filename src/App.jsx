import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {AirtableApiProvider} from './contexts/ImportContexts.jsx'
import {AllTablesPage, ErrorPage, HomePage, RouteNotFoundPage, TableDetailsPage} from './pages/ImportPages.jsx'
import {allTablesPath, errorPath, homePath, tableDetailsPath} from './globals/Routes.jsx'
import {SharedLayout} from './components/ImportComponents.jsx'
import {DialogProvider} from './contexts/DialogContext.jsx'

function App() {
    return (
        <BrowserRouter>
            <DialogProvider>
                <AirtableApiProvider>
                    <Routes>
                        <Route path={homePath} element={<SharedLayout/>}>
                            <Route path={homePath} element={<HomePage/>}/>
                            <Route path={allTablesPath(':baseId')} element={<AllTablesPage/>}/>
                            <Route path={tableDetailsPath(':baseId', ':tableId')} element={<TableDetailsPage/>}/>
                            <Route path={errorPath} element={<ErrorPage/>}/>
                            <Route path='*' element={<RouteNotFoundPage/>}/>
                        </Route>
                    </Routes>
                </AirtableApiProvider>
            </DialogProvider>
        </BrowserRouter>
    )
}

export default App