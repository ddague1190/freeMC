import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import hashPassword from "../../utils/auth";

interface markInterface {
  value: number;
  time: number;
  label: string;
}

const labelMarks = [
  {
    label: "12:00am",
    value: 0,
  },
  {
    label: "09:00am",
    value: 18,
  },
  {
    label: "05:00pm",
    value: 34,
  },
  {
    label: "11:59pm",
    value: 48,
  },
];
export function generateMarksForClock() {
  let marks: markInterface[] = [];
  let hours: numbers[] = Array(24)
    .fill()
    .map((_, i) => i * 100);
  hours.forEach((el, index) => {
    marks.push({value: index * 2, time: el});
    marks.push({value: index * 2 + 1, time: el + 30});
  });
  marks.push({time: 2400});

  marks = marks.map((el) => {
    switch (el.time) {
      case 0:
        return {...el, label: "12am"};
      case 900:
        return {...el, label: "9am"};
      case 1700:
        return {...el, label: "5pm"};
      case 2300:
        return {...el, label: "11pm"};
      default:
        return {...el, label: ""};
    }
  });

  return marks;
}

function valuetext(value: number) {
  return `${value}hours`;
}

export default function RangeSlider({
  input: {name, value, onChange, ...restInput},
  meta,
  label,
  formControlProps,
  ...rest
}) {
  const [marks, _] = React.useState<markInterface[]>(generateMarksForClock());

  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  function whichTime(value: number) {
    let curr = new String(marks[value].time);
    switch (curr.length) {
      case 1:
        curr = "000" + curr;
        break;
      case 3:
        curr = "0" + curr;
        break;
      case 2:
        curr = "00" + curr;
        break;

      default:
        curr;
    }
    let tmp = curr.slice(0, 2);
    curr =
      (tmp > 12 ? tmp - 12 : tmp === "00" ? "12" : tmp) +
      ":" +
      curr.slice(2) +
      (tmp > 11 ? "pm" : "am");

    return `${curr}`;
  }

  return (
    <Box sx={{width: 300, marginLeft: 4}}>
      <Slider
        min={0}
        max={48}
        scale={whichTime}
        step={1}
        marks={labelMarks}
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={onChange}
        valueLabelDisplay="auto"
        // getAriaValueText={valuetext}
        {...rest}
      />
    </Box>
  );
}
