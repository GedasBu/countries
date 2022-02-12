import "./App.css";

import Layout from "./components/Layout/Layout";
import Header from "./components/Header/Header";
import CountriesListContainer from "./cointainer/CountriesListContainer/CountriesListContainer";

function App(): JSX.Element {
  return (
    <Layout header={<Header />}>
      <CountriesListContainer />
    </Layout>   
  );
}

export default App;
