import { ThemeProvider } from '@/components/theme-provider';
import SupFinder from '@/components/SupFinder';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SupFinder />
    </ThemeProvider>
  );
}

export default App;
