import Countup from './components/CountUp/CountUp';
 
function App() {
  return (
    <div className="app">
      <Countup
        value={1_000_000_000}
        interval={1000}
        billionsUnit='bi'
        millionsUnit='mi'
        trillionsUnit='tri'
      />
    </div>
  );
}

export default App;
