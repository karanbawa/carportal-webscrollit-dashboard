import React, { useEffect, useState } from "react"

import {
    Col,
    Form,
    FormGroup,
    Label,
    CardTitle,
    Button,
    Input,
} from "reactstrap"
import Select from "react-select"
import { Link } from "react-router-dom"
import * as Yup from "yup";

import classnames from "classnames"


import { useSelector, useDispatch } from "react-redux"
import { getCarModels } from "store/automobiles/carModels/actions"
import { useFormik } from "formik"
import Switch from "react-switch";

const Offsymbol = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 12,
                color: "#fff",
                paddingRight: 2
            }}
        >
            {" "}
            No
        </div>
    );
};

const OnSymbol = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 12,
                color: "#fff",
                paddingRight: 2
            }}
        >
            {" "}
            Yes
        </div>
    );
};

const SafetyVariant = ({ onFormSubmit }) => {

    //meta title
    document.title = "Add Car Variant | Scrollit";

    const dispatch = useDispatch();

    const [activeTab, setactiveTab] = useState("1")
    const [selectedGroup, setselectedGroup] = useState(null)

    const [carVariant, setCarVariant] = useState([]);
    const [switch1, setswitch1] = useState(true);
    // const [carModelsList, setCarModelsList] = useState([]);

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            antiLockBrakingSystem: (carVariant && carVariant.safety && carVariant.safety.antiLockBrakingSystem) || false,
            breakAssist: (carVariant && carVariant.exterior && carVariant.exterior.breakAssist) ? carVariant.exterior.breakAssist : false,
            centralLocking: (carVariant && carVariant.safety && carVariant.safety.centralLocking) || false,
            powerDoorLocks: (carVariant && carVariant.safety && carVariant.safety.powerDoorLocks) || false,
            antiTheftAlarm: (carVariant && carVariant.safety && carVariant.safety.antiTheftAlarm) || false,
            noOfAirbags: (carVariant && carVariant.safety && carVariant.safety.noOfAirbags) || "",
            driverAirbag: (carVariant && carVariant.safety && carVariant.safety.driverAirbag) || false,
            passengerAirbag: (carVariant && carVariant.safety && carVariant.safety.passengerAirbag) || false,
            sideAirbagFront: (carVariant && carVariant.safety && carVariant.safety.sideAirbagFront) || false,
            dayNightRearViewMirror: (carVariant && carVariant.safety && carVariant.safety.dayNightRearViewMirror) || false,
            passengerSideRearViewMirror: (carVariant && carVariant.safety && carVariant.safety.passengerSideRearViewMirror) || false,
            halogenHeadlamps: (carVariant && carVariant.safety && carVariant.safety.halogenHeadlamps) || false,
            rearSeatBelts: (carVariant && carVariant.safety && carVariant.safety.rearSeatBelts) || false,
            seatBeltWarning: (carVariant && carVariant.safety && carVariant.safety.seatBeltWarning) || false,
            sideImpactBeams: (carVariant && carVariant.safety && carVariant.safety.sideImpactBeams) || false,
            adjustableeats: (carVariant && carVariant.safety && carVariant.safety.adjustableeats) || false,
            tyrePressureMonitor: (carVariant && carVariant.safety && carVariant.safety.tyrePressureMonitor) || false,
            vehicletabilityControlSystem: (carVariant && carVariant.safety && carVariant.safety.vehicletabilityControlSystem) || false,
            engineImmobilizer: (carVariant && carVariant.safety && carVariant.safety.engineImmobilizer) || false,
            crashSensor: (carVariant && carVariant.safety && carVariant.safety.crashSensor) || false,
            ebd: (carVariant && carVariant.safety && carVariant.safety.ebd) || false,
            electronicStabilityControl: (carVariant && carVariant.safety && carVariant.safety.electronicStabilityControl) || false,
            advanceSafetyFeature: (carVariant && carVariant.safety && carVariant.safety.advanceSafetyFeature) || "",
            rearCamera: (carVariant && carVariant.safety && carVariant.safety.rearCamera) || false,
            antiPinchPowerWindows: (carVariant && carVariant.safety && carVariant.safety.antiPinchPowerWindows) || false,
            speedAlert: (carVariant && carVariant.safety && carVariant.safety.speedAlert) || false,
            speedSensingAutoDoorLock: (carVariant && carVariant.safety && carVariant.safety.speedSensingAutoDoorLock) || false,
            isoFixChildSeatMounts: (carVariant && carVariant.safety && carVariant.safety.isoFixChildSeatMounts) || false,
            pretensionersAndForceLimiterSeatbelts: (carVariant && carVariant.safety && carVariant.safety.pretensionersAndForceLimiterSeatbelts) || false,
            hillDescentControl: (carVariant && carVariant.safety && carVariant.safety.hillDescentControl) || false,
            hillAssist: (carVariant && carVariant.safety && carVariant.safety.hillAssist) || false
        },
        // validationSchema: Yup.object({
        //     modelName: Yup.string().required(
        //         "Please Enter Your Brand Name"
        //     ),
        //     carBrand: Yup.string().required(
        //         "Please Enter Your CarBrand"
        //     ),
        //     description: Yup.string().required(
        //         "Please Enter Your description"
        //     ),
        //     year: Yup.string().required(
        //         "Please Enter Your Year"
        //     ),
        //     status: Yup.string().required(
        //         "Please Enter Your Status"
        //     )
        // }),
        onSubmit: values => {
            if (onFormSubmit) {
                onFormSubmit(values);
            }
            // if (isEdit) {
            //     const updCarModel = new FormData();
            //     updCarModel.append("modelName", values["modelName"]);
            //     updCarModel.append("description", values["description"]);
            //     updCarModel.append("year", values["year"]);
            //     updCarModel.append("status", values["status"] === 'Active' ? true : false);
            //     updCarModel.append("image", modelImage ? modelImage : "broken!");
            //     dispatch(updateCarModel(carModel._id, values['carBrand'], updCarModel));

            //     validation.resetForm();
            // } else {
            //     const newCarModel = new FormData();
            //     newCarModel.append("modelName", values["modelName"]);
            //     newCarModel.append("description", values["description"]);
            //     newCarModel.append("year", values["year"]);
            //     newCarModel.append("status", values["status"] === 'Active' ? true : false);
            //     newCarModel.append("image", modelImage ? modelImage : "broken!");
            //     dispatch(addNewCarModel(values['carBrand'], newCarModel));
            //     validation.resetForm();
            // }
            toggle();
        },
        handleError: e => { },
    });

    function handleSelectGroup(selectedGroup) {
        setselectedGroup(selectedGroup)
    }

    const { carBrands, countries, carModels } = useSelector(state => ({
        carModels: state.CarModel.carModels
    }));

    useEffect(() => {
        if (carModels && !carModels.length) {
            dispatch(getCarModels());
        }
    }, [dispatch]);

    // useEffect(() => {
    //     setCarModelsList(carModels);
    // }, [carModels]);

    return (
        <React.Fragment>
            <div>
                <CardTitle>Exterior</CardTitle>
                <p className="card-title-desc">
                    Fill all information below
                </p>
                <Form onSubmit={validation.handleSubmit}>
                    <FormGroup className="mb-4" row>
                            <Label
                                htmlFor="tachometer"
                                md="2"
                                className="col-form-label"
                            >
                                Anti Lock Braking System
                            </Label>
                            <Col md="10">
                                <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    className="me-1 mb-sm-8 mb-2"
                                    onColor="#626ed4"
                                    onChange={(checked) => {
                                        validation.setFieldValue("antiLockBrakingSystem", checked);
                                    }}
                                    checked={validation.values.antiLockBrakingSystem}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup className="mb-4" row>
                            <Label
                                htmlFor="breakAssist"
                                md="2"
                                className="col-form-label"
                            >
                                Break Assist
                            </Label>
                            <Col md="10">
                                <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    className="me-1 mb-sm-8 mb-2"
                                    onColor="#626ed4"
                                    onChange={(checked) => {
                                        validation.setFieldValue("breakAssist", checked);
                                    }}
                                    checked={validation.values.breakAssist}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup className="mb-4" row>
                            <Label
                                htmlFor="centralLocking"
                                md="2"
                                className="col-form-label"
                            >
                                Central Locking
                            </Label>
                            <Col md="10">
                                <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    className="me-1 mb-sm-8 mb-2"
                                    onColor="#626ed4"
                                    onChange={(checked) => {
                                        validation.setFieldValue("centralLocking", checked);
                                    }}
                                    checked={validation.values.centralLocking}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup className="mb-4" row>
                            <Label
                                htmlFor="powerDoorLocks"
                                md="2"
                                className="col-form-label"
                            >
                                Power Door Locks
                            </Label>
                            <Col md="10">
                                <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    className="me-1 mb-sm-8 mb-2"
                                    onColor="#626ed4"
                                    onChange={(checked) => {
                                        validation.setFieldValue("powerDoorLocks", checked);
                                    }}
                                    checked={validation.values.powerDoorLocks}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup className="mb-4" row>
                            <Label
                                htmlFor="antiTheftAlarm"
                                md="2"
                                className="col-form-label"
                            >
                                Anti Theft Alarm
                            </Label>
                            <Col md="10">
                                <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    className="me-1 mb-sm-8 mb-2"
                                    onColor="#626ed4"
                                    onChange={(checked) => {
                                        validation.setFieldValue("antiTheftAlarm", checked);
                                    }}
                                    checked={validation.values.antiTheftAlarm}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup className="mb-4" row>
                            <Label
                                htmlFor="noOfAirbags"
                                md="2"
                                className="col-form-label"
                            >
                                NO of Airbags
                            </Label>
                            <Col md="10">
                                <Input
                                type="text"
                                className="form-control"
                                name="noOfAirbags"
                                id="noOfAirbags"
                                placeholder="Enter your No Of Airbags"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.noOfAirbags}
                            />
                            </Col>
                        </FormGroup>
                        <FormGroup className="mb-4" row>
                            <Label
                                htmlFor="driverAirbag"
                                md="2"
                                className="col-form-label"
                            >
                                Driver Airbags
                            </Label>
                            <Col md="10">
                                <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    className="me-1 mb-sm-8 mb-2"
                                    onColor="#626ed4"
                                    onChange={(checked) => {
                                        validation.setFieldValue("driverAirbag", checked);
                                    }}
                                    checked={validation.values.driverAirbag}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                            <Label
                                htmlFor="passengerAirbag"
                                md="2"
                                className="col-form-label"
                            >
                                Passenger Airbags
                            </Label>
                            <Col md="10">
                                <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    className="me-1 mb-sm-8 mb-2"
                                    onColor="#626ed4"
                                    onChange={(checked) => {
                                        validation.setFieldValue("passengerAirbag", checked);
                                    }}
                                    checked={validation.values.passengerAirbag}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup className="mb-4" row>
                            <Label
                                htmlFor="sideAirbagFront"
                                md="2"
                                className="col-form-label"
                            >
                                Side Airbag Front
                            </Label>
                            <Col md="10">
                                <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    className="me-1 mb-sm-8 mb-2"
                                    onColor="#626ed4"
                                    onChange={(checked) => {
                                        validation.setFieldValue("sideAirbagFront", checked);
                                    }}
                                    checked={validation.values.sideAirbagFront}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                            <Label
                                htmlFor="dayNightRearViewMirror"
                                md="2"
                                className="col-form-label"
                            >
                                Day Night Rear View Mirror
                            </Label>
                            <Col md="10">
                                <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    className="me-1 mb-sm-8 mb-2"
                                    onColor="#626ed4"
                                    onChange={(checked) => {
                                        validation.setFieldValue("dayNightRearViewMirror", checked);
                                    }}
                                    checked={validation.values.dayNightRearViewMirror}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                            <Label
                                htmlFor="passengerSideRearViewMirror"
                                md="2"
                                className="col-form-label"
                            >
                                Passenger Side Rear View Mirror
                            </Label>
                            <Col md="10">
                                <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    className="me-1 mb-sm-8 mb-2"
                                    onColor="#626ed4"
                                    onChange={(checked) => {
                                        validation.setFieldValue("passengerSideRearViewMirror", checked);
                                    }}
                                    checked={validation.values.passengerSideRearViewMirror}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>    
                            <Label
                                htmlFor="halogenHeadlamps"
                                md="2"
                                className="col-form-label"
                            >
                                Halogen Head Lamps
                            </Label>
                            <Col md="10">
                                <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    className="me-1 mb-sm-8 mb-2"
                                    onColor="#626ed4"
                                    onChange={(checked) => {
                                        validation.setFieldValue("halogenHeadlamps", checked);
                                    }}
                                    checked={validation.values.halogenHeadlamps}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>    
                            <Label
                                htmlFor="rearSeatBelts"
                                md="2"
                                className="col-form-label"
                            >
                                Rear Seat Belts
                            </Label>
                            <Col md="10">
                                <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    className="me-1 mb-sm-8 mb-2"
                                    onColor="#626ed4"
                                    onChange={(checked) => {
                                        validation.setFieldValue("rearSeatBelts", checked);
                                    }}
                                    checked={validation.values.rearSeatBelts}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>    
                            <Label
                                htmlFor="seatBeltWarning"
                                md="2"
                                className="col-form-label"
                            >
                                Seat Belt Warning
                            </Label>
                            <Col md="10">
                                <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    className="me-1 mb-sm-8 mb-2"
                                    onColor="#626ed4"
                                    onChange={(checked) => {
                                        validation.setFieldValue("seatBeltWarning", checked);
                                    }}
                                    checked={validation.values.seatBeltWarning}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>    
                            <Label
                                htmlFor="sideImpactBeams"
                                md="2"
                                className="col-form-label"
                            >
                                Side Impact Beams
                            </Label>
                            <Col md="10">
                                <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    className="me-1 mb-sm-8 mb-2"
                                    onColor="#626ed4"
                                    onChange={(checked) => {
                                        validation.setFieldValue("sideImpactBeams", checked);
                                    }}
                                    checked={validation.values.sideImpactBeams}
                                />
                            </Col>
                        </FormGroup>


                        <FormGroup className="mb-4" row>
                            <Label
                                htmlFor="adjustableeats"
                                md="2"
                                className="col-form-label"
                            >
                               Adjustable Eats
                            </Label>
                            <Col md="10">
                                <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    className="me-1 mb-sm-8 mb-2"
                                    onColor="#626ed4"
                                    onChange={(checked) => {
                                        validation.setFieldValue("adjustableeats", checked);
                                    }}
                                    checked={validation.values.adjustableeats}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                            <Label
                                htmlFor="tyrePressureMonitor"
                                md="2"
                                className="col-form-label"
                            >
                               Tyre Pressure Monitor
                            </Label>
                            <Col md="10">
                                <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    className="me-1 mb-sm-8 mb-2"
                                    onColor="#626ed4"
                                    onChange={(checked) => {
                                        validation.setFieldValue("tyrePressureMonitor", checked);
                                    }}
                                    checked={validation.values.tyrePressureMonitor}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                            <Label
                                htmlFor="vehicletabilityControlSystem"
                                md="2"
                                className="col-form-label"
                            >
                               Vehicle Ability Control System
                            </Label>
                            <Col md="10">
                                <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    className="me-1 mb-sm-8 mb-2"
                                    onColor="#626ed4"
                                    onChange={(checked) => {
                                        validation.setFieldValue("vehicletabilityControlSystem", checked);
                                    }}
                                    checked={validation.values.vehicletabilityControlSystem}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                            <Label
                                htmlFor="engineImmobilizer"
                                md="2"
                                className="col-form-label"
                            >
                               Engine Immobilizer
                            </Label>
                            <Col md="10">
                                <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    className="me-1 mb-sm-8 mb-2"
                                    onColor="#626ed4"
                                    onChange={(checked) => {
                                        validation.setFieldValue("engineImmobilizer", checked);
                                    }}
                                    checked={validation.values.engineImmobilizer}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                            <Label
                                htmlFor="crashSensor"
                                md="2"
                                className="col-form-label"
                            >
                               Crash Sensor
                            </Label>
                            <Col md="10">
                                <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    className="me-1 mb-sm-8 mb-2"
                                    onColor="#626ed4"
                                    onChange={(checked) => {
                                        validation.setFieldValue("crashSensor", checked);
                                    }}
                                    checked={validation.values.crashSensor}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                            <Label
                                htmlFor="ebd"
                                md="2"
                                className="col-form-label"
                            >
                               EBD
                            </Label>
                            <Col md="10">
                                <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    className="me-1 mb-sm-8 mb-2"
                                    onColor="#626ed4"
                                    onChange={(checked) => {
                                        validation.setFieldValue("ebd", checked);
                                    }}
                                    checked={validation.values.ebd}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                            <Label
                                htmlFor="electronicStabilityControl"
                                md="2"
                                className="col-form-label"
                            >
                               Electronic Stability Control
                            </Label>
                            <Col md="10">
                                <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    className="me-1 mb-sm-8 mb-2"
                                    onColor="#626ed4"
                                    onChange={(checked) => {
                                        validation.setFieldValue("electronicStabilityControl", checked);
                                    }}
                                    checked={validation.values.electronicStabilityControl}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                            <Label
                                htmlFor="advanceSafetyFeature"
                                md="2"
                                className="col-form-label"
                            >
                               Advance Safety Feature
                            </Label>
                            <Col md="10">
                            <textarea
                                    className="form-control"
                                    name="advanceSafetyFeature"
                                    id="advanceSafetyFeature"
                                    placeholder="Enter your Advance Safety Feature"
                                    rows="3"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.advanceSafetyFeature}
                                  ></textarea>
                            </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                            <Label
                                htmlFor="rearCamera"
                                md="2"
                                className="col-form-label"
                            >
                               Rear Camera
                            </Label>
                            <Col md="10">
                                  <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    className="me-1 mb-sm-8 mb-2"
                                    onColor="#626ed4"
                                    onChange={(checked) => {
                                        validation.setFieldValue("rearCamera", checked);
                                    }}
                                    checked={validation.values.rearCamera}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                            <Label
                                htmlFor="antiPinchPowerWindows"
                                md="2"
                                className="col-form-label"
                            >
                               Anti Punch Power Windows
                            </Label>
                            <Col md="10">
                                  <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    className="me-1 mb-sm-8 mb-2"
                                    onColor="#626ed4"
                                    onChange={(checked) => {
                                        validation.setFieldValue("antiPinchPowerWindows", checked);
                                    }}
                                    checked={validation.values.antiPinchPowerWindows}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                            <Label
                                htmlFor="speedAlert"
                                md="2"
                                className="col-form-label"
                            >
                               Speed Alert
                            </Label>
                            <Col md="10">
                                  <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    className="me-1 mb-sm-8 mb-2"
                                    onColor="#626ed4"
                                    onChange={(checked) => {
                                        validation.setFieldValue("speedAlert", checked);
                                    }}
                                    checked={validation.values.speedAlert}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                            <Label
                                htmlFor="speedSensingAutoDoorLock"
                                md="2"
                                className="col-form-label"
                            >
                               Speed Sensing Auto Door Lock
                            </Label>
                            <Col md="10">
                                  <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    className="me-1 mb-sm-8 mb-2"
                                    onColor="#626ed4"
                                    onChange={(checked) => {
                                        validation.setFieldValue("speedSensingAutoDoorLock", checked);
                                    }}
                                    checked={validation.values.speedSensingAutoDoorLock}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                            <Label
                                htmlFor="isoFixChildSeatMounts"
                                md="2"
                                className="col-form-label"
                            >
                               Isofix Child Seat Mounts
                            </Label>
                            <Col md="10">
                            <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    className="me-1 mb-sm-8 mb-2"
                                    onColor="#626ed4"
                                    onChange={(checked) => {
                                        validation.setFieldValue("isoFixChildSeatMounts", checked);
                                    }}
                                    checked={validation.values.isoFixChildSeatMounts}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                            <Label
                                htmlFor="pretensionersAndForceLimiterSeatbelts"
                                md="2"
                                className="col-form-label"
                            >
                               Pretensioners And Force Limiter Seatbeats
                            </Label>
                            <Col md="10">
                            <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    className="me-1 mb-sm-8 mb-2"
                                    onColor="#626ed4"
                                    onChange={(checked) => {
                                        validation.setFieldValue("pretensionersAndForceLimiterSeatbelts", checked);
                                    }}
                                    checked={validation.values.pretensionersAndForceLimiterSeatbelts}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                            <Label
                                htmlFor="hillDescentControl"
                                md="2"
                                className="col-form-label"
                            >
                               Hill Descent Control
                            </Label>
                            <Col md="10">
                            <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    className="me-1 mb-sm-8 mb-2"
                                    onColor="#626ed4"
                                    onChange={(checked) => {
                                        validation.setFieldValue("hillDescentControl", checked);
                                    }}
                                    checked={validation.values.hillDescentControl}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                            <Label
                                htmlFor="hillAssist"
                                md="2"
                                className="col-form-label"
                            >
                               Hill Assist
                            </Label>
                            <Col md="10">
                            <Switch
                                    uncheckedIcon={<Offsymbol />}
                                    checkedIcon={<OnSymbol />}
                                    className="me-1 mb-sm-8 mb-2"
                                    onColor="#626ed4"
                                    onChange={(checked) => {
                                        validation.setFieldValue("hillAssist", checked);
                                    }}
                                    checked={validation.values.hillAssist}
                                />
                            </Col>
                        </FormGroup>



                    <Button type="submit" color="primary">Submit</Button>
                </Form>
            </div>
        </React.Fragment>
    )
}

export default SafetyVariant
