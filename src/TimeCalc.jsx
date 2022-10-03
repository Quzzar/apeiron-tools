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

import {
  convertTimeToSeconds,
  convertSecondsToCleanTime,
  precisionRoundMod,
  SPEED_OF_LIGHT,
} from './Utils.js';

function TimeCalc() {
  const [SoL, setSoL] = useState(50)
  const [timeUTC, setTimeUTC] = useState(0)
  const [timeUnit, setTimeUnit] = useState('seconds')

  const [timeToYou, setTimeToYou] = useState(0)
  const [timeUnitToYou, setTimeUnitToYou] = useState('seconds')
  const [dilationMod, setDilationMod] = useState(0)

  function calcTimeToYou() {

    let secondsUTC = convertTimeToSeconds(timeUTC, timeUnit);

    let result = secondsUTC * Math.sqrt(1 - Math.pow(((SoL / 100) * SPEED_OF_LIGHT) / SPEED_OF_LIGHT, 2))

    setDilationMod(secondsUTC / result);

    let cleanTime = convertSecondsToCleanTime(result);
    setTimeToYou(cleanTime.amount);
    setTimeUnitToYou(cleanTime.unit);
    
  };

  return (
    <div>

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

export default TimeCalc;
