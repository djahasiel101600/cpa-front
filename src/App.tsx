import { useBankReconData } from './services/helpers/GetBankrecon'
import IARForm from './forms/IARForm';
import IARTablePage from './components/table/IAR/page';

function App() {
  return (
    <>
      <IARForm />
      <IARTablePage />
    </>
  )
}

export default App
