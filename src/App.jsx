import { useState } from 'react'

import {
  Button,
  NumberInput,
  Group,
  Center,
  Stack,
  Title,
  Container,
  Select,
} from '@mantine/core';

const SPEED_OF_LIGHT = 299792458; // in m/s

const TIME_MOD_MINUTES = 60;
const TIME_MOD_HOURS = TIME_MOD_MINUTES * 60;
const TIME_MOD_DAYS = TIME_MOD_HOURS * 24;
const TIME_MOD_MONTHS = TIME_MOD_DAYS * 30;
const TIME_MOD_YEARS = TIME_MOD_MONTHS * 12;

function App() {
  const [SoL, setSoL] = useState(50)
  const [timeUTC, setTimeUTC] = useState(0)
  const [timeUnit, setTimeUnit] = useState('seconds')

  const [timeToYou, setTimeToYou] = useState(0)
  const [timeUnitToYou, setTimeUnitToYou] = useState('seconds')
  const [dilationMod, setDilationMod] = useState(0)

  function convertTimeToSeconds(amount, currentUnit){
    switch (currentUnit) {
      case 'seconds': return amount;
      case 'minutes': return amount * TIME_MOD_MINUTES;
      case 'hours': return amount * TIME_MOD_HOURS;
      case 'days': return amount * TIME_MOD_DAYS;
      case 'months': return amount * TIME_MOD_MONTHS;
      case 'years': return amount * TIME_MOD_YEARS;
      default: return 0;
    }
  }
  function convertSecondsToCleanTime(amount){
    if(amount > TIME_MOD_YEARS){
      return { amount: amount / TIME_MOD_YEARS, unit: 'years' };
    }
    if(amount > TIME_MOD_MONTHS){
      return { amount: amount / TIME_MOD_MONTHS, unit: 'months' };
    }
    if(amount > TIME_MOD_DAYS){
      return { amount: amount / TIME_MOD_DAYS, unit: 'days' };
    }
    if(amount > TIME_MOD_HOURS){
      return { amount: amount / TIME_MOD_HOURS, unit: 'hours' };
    }
    if(amount > TIME_MOD_MINUTES){
      return { amount: amount / TIME_MOD_MINUTES, unit: 'minutes' };
    }
    return { amount: amount, unit: 'seconds' };
  }

  function calcTimeToYou() {

    let secondsUTC = convertTimeToSeconds(timeUTC, timeUnit);

    let result = secondsUTC * Math.sqrt(1 - Math.pow(((SoL / 100) * SPEED_OF_LIGHT) / SPEED_OF_LIGHT, 2))

    setDilationMod(secondsUTC / result);

    let cleanTime = convertSecondsToCleanTime(result);
    setTimeToYou(cleanTime.amount);
    setTimeUnitToYou(cleanTime.unit);
    
  };

  function precisionRoundMod(number, precision) {
    var factor = Math.pow(10, precision);
    var n = precision < 0 ? number : 0.01 / factor + number;
    return Math.round(n * factor) / factor;
  }


  return (
    <div className="App">

      <Stack>

        <Center>
          <Group>

            <NumberInput
              max={100}
              min={0}
              step={1}
              precision={2}
              defaultValue={SoL}
              placeholder="Percent: 0 - 100"
              label="Your % of Light-Speed"
              onChange={(val) => setSoL(val)}
            />

            <NumberInput
              min={0}
              defaultValue={timeUTC}
              placeholder="Time"
              label="Universal Time to Pass"
              onChange={(val) => setTimeUTC(val)}
            />

            <Select
              placeholder="UTC Unit"
              label="Unit of Time"
              defaultValue={timeUnit}
              onChange={(val) => setTimeUnit(val)}
              data={[
                { value: 'seconds', label: 'Seconds' },
                { value: 'minutes', label: 'Minutes' },
                { value: 'hours', label: 'Hours' },
                { value: 'days', label: 'Days' },
                { value: 'months', label: 'Months' },
                { value: 'years', label: 'Years' },
              ]}
            />


          </Group>
        </Center>

        <Center>
          <Group>

            <Button
              variant="outline"
              onClick={calcTimeToYou}
              compact>
              Calculate Time
            </Button>

          </Group>
        </Center>

        <Container>

          <Title align="center" order={3}>{precisionRoundMod(timeToYou, 2)} {timeUnitToYou} to you</Title>
          <Title align="center" order={5}>Dilation Modifier: x{precisionRoundMod(dilationMod, 2)}</Title>

        </Container>

      </Stack>

    </div>
  )
}

export default App
