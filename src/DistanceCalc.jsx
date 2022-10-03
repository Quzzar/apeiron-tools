import { useState } from 'react'

import {
  Button,
  NumberInput,
  Group,
  Center,
  Stack,
  Title,
  Container,
} from '@mantine/core';

import {
  convertTimeToSeconds,
  convertSecondsToCleanTime,
  precisionRoundMod,
  SPEED_OF_LIGHT,
} from './Utils.js';

function DistanceCalc() {
  const [SoL, setSoL] = useState(50);
  const [distance, setDistance] = useState(0);

  const [timeToYou, setTimeToYou] = useState(0);
  const [timeUnitToYou, setTimeUnitToYou] = useState('seconds');
  const [timeToOthers, setTimeToOthers] = useState(0);
  const [timeUnitToOthers, setTimeUnitToOthers] = useState('seconds');
  const [dilationMod, setDilationMod] = useState(0);

  function calcTimeToYou() {
    
    let secondsUTC = convertTimeToSeconds(distance / (SoL/100), 'years');

    let result = secondsUTC * Math.sqrt(1 - Math.pow(((SoL / 100) * SPEED_OF_LIGHT) / SPEED_OF_LIGHT, 2))

    setDilationMod(secondsUTC / result);

    let cleanTimeYou = convertSecondsToCleanTime(result);
    setTimeToYou(cleanTimeYou.amount);
    setTimeUnitToYou(cleanTimeYou.unit);

    let cleanTimeOthers = convertSecondsToCleanTime(secondsUTC);
    setTimeToOthers(cleanTimeOthers.amount);
    setTimeUnitToOthers(cleanTimeOthers.unit);
    
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
              precision={2}
              defaultValue={distance}
              placeholder="Distance"
              label="Distance (in Light-Years)"
              onChange={(val) => setDistance(val)}
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
          <Title align="center" order={3}>{precisionRoundMod(timeToOthers, 2)} {timeUnitToOthers} to universal time</Title>
          <Title align="center" order={5}>Dilation Modifier: x{precisionRoundMod(dilationMod, 2)}</Title>

        </Container>

      </Stack>

    </div>
  )
}

export default DistanceCalc;
