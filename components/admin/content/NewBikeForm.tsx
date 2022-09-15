import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BikeSelector from "../../form/BikeSelector";
import BikeBasicDetails from "../../form/BikeBasicDetails";
import UploadBox from "../../form/UploadBox";
import { useDispatch, useSelector } from 'react-redux';
import { addCustomerBikes } from "../../../store/customer-bikes/action";
import { customerDetailSelector } from "../../../store/customer-detail/reducer";
import { storeInfoSelector } from "../../../store/store-info/reducer";

export const extraFunctionForSubmitOnClick = React.createRef();

export const BackNextButtonsForStepper = ({
  activeStep,
  disabled,
  nextStep,
  prevStep,
  submitOnClick,
  submitBike
}) => {
  return (
    <Box sx={{display: "flex", flexDirection: "row", pt: 2}}>
      <Button
        color="inherit"
        disabled={activeStep === 0}
        onClick={() => {
          submitOnClick.current && submitOnClick.current();
          prevStep();
        }}
        sx={{mr: 1}}>
        Back
      </Button>
      <Box sx={{flex: "1 1 auto"}} />
      <Button
        variant={activeStep === steps.length - 1 ? "contained" : ""}
        color={activeStep === steps.length - 1 ? "secondary" : ""}
        onClick={() => {
          if (activeStep === steps.length - 1) {
            submitBike();
            return;
          }
          submitOnClick.current && submitOnClick.current();
          nextStep();
        }}
        disabled={disabled}>
        {activeStep === steps.length - 1 ? "Finish" : "Next"}
      </Button>
    </Box>
  );
};

const steps = ["Select model", "Add details", "Add an image"];

export default function NewBikeForm({closeForm}) {
  const dispatch = useDispatch();
  const [currentSelectedModel, setCurrentSelectedModel] =
    React.useState<string>("");
  const [bikeDetails, setBikeDetails] = React.useState<any>({});
  const [activeStep, setActiveStep] = React.useState(0);
  const { identifier } = useSelector(customerDetailSelector);

  const submitBike = () => {
    closeForm()
    dispatch(addCustomerBikes({...bikeDetails, model: currentSelectedModel, customerIdentifier: identifier }));
  }

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{width: "80%", margin: "0 auto"}}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: {completed?: boolean} = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <React.Fragment>
        {
          [
            <BikeSelector
              setCurrentSelectedModel={setCurrentSelectedModel}
              currentSelectedModel={currentSelectedModel}
            />,
            <BikeBasicDetails
              bikeDetails={bikeDetails}
              setBikeDetails={setBikeDetails}
            />,
            <UploadBox />,
          ][activeStep]
        }
        <BackNextButtonsForStepper
          activeStep={activeStep}
          submitBike={submitBike}
          disabled={currentSelectedModel === ""}
          nextStep={nextStep}
          prevStep={prevStep}
          submitOnClick={extraFunctionForSubmitOnClick}
        />
      </React.Fragment>
    </Box>
  );
}
