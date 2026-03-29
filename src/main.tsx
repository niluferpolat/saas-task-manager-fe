import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTheme, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';
import './styles/mantine-dates.css';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient()
const theme = createTheme({
  primaryColor: 'indigo',
   fontFamily: 'Inter, Open Sans, sans-serif',
   black: '#1c1c1e',
   
})
createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme='light'>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
)
