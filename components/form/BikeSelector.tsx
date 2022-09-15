import React from "react";
import {
  Form,
  Field,
  FormSpy,
  FieldRenderProps,
  FormApi,
} from "react-final-form";
import RFTextField from "./RFTextField";
import Box, {BoxProps} from "@mui/material/Box";
import LinearIndeterminate from "../elements/Spinner";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import FormFeedback from "./FormFeedback";
import Collapse from "@mui/material/Collapse";
import Chip from "@mui/material/Chip";
import Typography from "../elements/Typography";

const url = "https://motorcycle-models-api.herokuapp.com/api/";

export enum MfgNames {
  null = 0,
  "bmw" = 1,
  "ducati" = 2,
  "ktm" = 3,
  "moto_guzzi" = 4,
  "triumph" = 5,
  "harley-davidson" = 6,
  "kawasaki" = 7,
  "honda" = 8,
  "yamaha" = 9,
  "beta" = 10,
  "aprilia" = 11,
  "suzuki" = 12,
  "husqvarna" = 13,
  "ural" = 14,
  "indian" = 15,
}

const mfgArr = [
  "bmw",
  "ducati",
  "ktm",
  "moto_guzzi",
  "triumph",
  "harley-davidson",
  "kawasaki",
  "honda",
  "yamaha",
  "beta",
  "aprilia",
  "suzuki",
  "husqvarna",
  "ural",
  "indian",
];

interface BikeSelectorDataState {
  year: number;
  mfg: number;
  model: string;
}

const yearsArr = new Array(100).fill().map((_, i) => 2022 - i);

const BikeSelector = ({setCurrentSelectedModel, currentSelectedModel}) => {
  const prevFormRefData: React.MutableRefObject<FormApi> = React.useRef({
    year: NaN,
    mfg: NaN,
  });
  const formRef: React.MutableRefObject<FormApi> = React.useRef(null);
  const [bikeSelectorData, setBikeSelectorData] =
    React.useState<BikeSelectorDataState>({});
  const [isFetching, setIsFetching] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<boolean>("");
  const [modelsResults, setModelsResults] = React.useState<any>([]);

  const getModels = async () => {
    const {values, ...formState} = await formRef.current.getState();
    if (values.model) {
      setCurrentSelectedModel(values.year + " " + values.model);
    }
    if (values.year && values.mfg) {
      if (
        values.year !== prevFormRefData.current.year ||
        values.mfg !== prevFormRefData.current.mfg
      ) {
        setIsFetching(true);
        setErrorMessage("");

        try {
          const {data} = await axios.get(
            url + "?year=" + values.year + "&mfg=" + values.mfg
          );

          setModelsResults(data);
          if (data.length === 0) {
            throw new Error("No bikes found!");
          }
          setCurrentSelectedModel("");
          formRef.current.change("model", "");
        } catch (error) {
          setErrorMessage(error.message);
        }
        setIsFetching(false);
        prevFormRefData.current.year = values.year;
        prevFormRefData.current.mfg = values.mfg;
      }
    }
  };

  const validate = () => {
    return false;
  };

  const onSubmit = ({year, model}) => {
    setCurrentSelectedModel(year + " " + model);
  };

  const resetForm = (e) => {
    console.log(formRef.current);
  };
  return (
    <>
      <LinearIndeterminate show={isFetching} />
      {errorMessage && (
        <FormFeedback error sx={{mt: 2}}>
          {errorMessage}
        </FormFeedback>
      )}
      <Form
        initialData={bikeSelectorData}
        onSubmit={onSubmit}
        render={({handleSubmit, form, submitting, pristine, values}) => {
          formRef.current = form;
          return (
            <>
              <Collapse in={currentSelectedModel !== ""}>
                <Box
                  m={5}
                  sx={{
                    gap: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Typography variant="h5">{currentSelectedModel}</Typography>
                  <Chip label="Change" onClick={resetForm} />
                </Box>
              </Collapse>
              <Collapse in={currentSelectedModel === ""}>
                <Box onSubmit={handleSubmit} component="form" noValidate>
                  <>
                    <Field
                      sx={{marginTop: "15px"}}
                      select
                      disabled={isFetching}
                      fullWidth
                      name="year"
                      label="Year"
                      size="medium"
                      inputOnChange={getModels}
                      required
                      component={RFTextField}>
                      {yearsArr.map((year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </Field>

                    <Field
                      sx={{marginTop: "15px"}}
                      select
                      fullWidth
                      name="mfg"
                      disabled={isFetching}
                      inputOnChange={getModels}
                      label="Manufacturer"
                      size="medium"
                      required
                      component={RFTextField}>
                      {mfgArr.map((mfg, index) => (
                        <MenuItem key={index + 1} value={index + 1}>
                          {mfg.toUpperCase()}
                        </MenuItem>
                      ))}
                    </Field>
                    <Field
                      sx={{marginTop: "15px"}}
                      select
                      fullWidth
                      name="model"
                      label="Model"
                      size="medium"
                      placeholder="Please select model"
                      disabled={modelsResults.length === 0 || isFetching}
                      required
                      component={RFTextField}
                      inputOnChange={handleSubmit}>
                      {modelsResults.map(({model}, index) => (
                        <MenuItem key={index + 1} value={model}>
                          {model}
                        </MenuItem>
                      ))}
                    </Field>
                  </>
                </Box>
              </Collapse>
            </>
          );
        }}
      />
    </>
  );
};

export default BikeSelector;
