// <RadioGroup onChange={setDataClass} value={value}>
//   <Stack>
//     {["text", "number", "date", "time", "date & time"].map((dataClassType) => {
//       return (
//         <Radio
//           key={`data-class-radio-${dataClassType}`}
//           size="lg"
//           value={dataClassType}
//           borderColor={ThemeColorCodes.SHADE_2}
//           color={ThemeColorCodes.BACKGROUND}
//           _checked={{
//             borderWidth: dataClassType === value ? "6px" : "2px",
//           }}
//         >
//           {dataClassType}
//         </Radio>
//       );
//     })}
//   </Stack>
// </RadioGroup>;

// {/* <NumberInput size="lg" defaultValue={1} min={1} max={3} value={fieldValue} onChange={field.onChange}>
//   <NumberInputField />
//   <NumberInputStepper>
//     <NumberIncrementStepper />
//     <NumberDecrementStepper />
//   </NumberInputStepper>
// </NumberInput> */}
// {/* <Slider defaultValue={1} min={1} max={3} step={1}>
//   <SliderTrack bg="red.100">
//     <Box position="relative" right={10} />
//     <SliderFilledTrack bg="tomato" />
//   </SliderTrack>
//   <SliderThumb boxSize={6} />
// </Slider> */}
