
import {
  Box
} from '@mantine/core';

import TimeCalc from './TimeCalc';
import DistanceCalc from './DistanceCalc';

function App() {

  return (
    <div className="App">

      <Box sx={(theme) => ({
        padding: theme.spacing.xl,
        marginBottom: '20px',
        borderRadius: theme.radius.md,
        border: '2px solid '+theme.colors.dark[6],
      })}>
        <TimeCalc />
      </Box>

      <Box sx={(theme) => ({
        padding: theme.spacing.xl,
        marginBottom: '20px',
        borderRadius: theme.radius.md,
        border: '2px solid '+theme.colors.dark[6],
      })}>
        <DistanceCalc />
      </Box>

    </div>
  )
}

export default App
