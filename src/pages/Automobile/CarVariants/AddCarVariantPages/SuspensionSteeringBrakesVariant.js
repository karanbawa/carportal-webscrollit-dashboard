import React, { useEffect, useState } from "react"

import {
    Container,
    Row,
    Col,
    Table,
    Input,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Card,
    Form,
    FormGroup,
    Label,
    CardBody,
    CardTitle,
    CardSubtitle,
    FormFeedback,
    Button,
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

const SuspensionSteeringBrakesVariant = ({ onFormSubmit }) => {

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
            fontSuspension: (carVariant && carVariant.suspensionAndSteeringAndBrakes && carVariant.suspensionAndSteeringAndBrakes.fontSuspension) || "",
            rearSuspension: (carVariant && carVariant.suspensionAndSteeringAndBrakes && carVariant.suspensionAndSteeringAndBrakes.rearSuspension) || "",
            steeringType: (carVariant && carVariant.suspensionAndSteeringAndBrakes && carVariant.suspensionAndSteeringAndBrakes.steeringType) || "",
            steeringColumn: (carVariant && carVariant.suspensionAndSteeringAndBrakes && carVariant.suspensionAndSteeringAndBrakes.steeringColumn) || "",
            turningRadius: (carVariant && carVariant.suspensionAndSteeringAndBrakes && carVariant.suspensionAndSteeringAndBrakes.turningRadius) || "",
            frontBrakeType: (carVariant && carVariant.suspensionAndSteeringAndBrakes && carVariant.suspensionAndSteeringAndBrakes.frontBrakeType) || "",
            rearBrakeType: (carVariant && carVariant.suspensionAndSteeringAndBrakes && carVariant.suspensionAndSteeringAndBrakes.rearBrakeType) || "",
            emissionNormCompliance: (carVariant && carVariant.suspensionAndSteeringAndBrakes && carVariant.suspensionAndSteeringAndBrakes.emissionNormCompliance) || "",
            tyreSize: (carVariant && carVariant.suspensionAndSteeringAndBrakes && carVariant.suspensionAndSteeringAndBrakes.tyreSize) || "",
            tyreType: (carVariant && carVariant.suspensionAndSteeringAndBrakes && carVariant.suspensionAndSteeringAndBrakes.tyreType) || "",
            wheelSize: (carVariant && carVariant.suspensionAndSteeringAndBrakes && carVariant.suspensionAndSteeringAndBrakes.wheelSize) || "",
            alloyWheelSize: (carVariant && carVariant.suspensionAndSteeringAndBrakes && carVariant.suspensionAndSteeringAndBrakes.alloyWheelSize) || "",
            alloyWheelSizeFront: (carVariant && carVariant.suspensionAndSteeringAndBrakes && carVariant.suspensionAndSteeringAndBrakes.alloyWheelSizeFront) || "",
            alloyWheelSizeRear: (carVariant && carVariant.suspensionAndSteeringAndBrakes && carVariant.suspensionAndSteeringAndBrakes.alloyWheelSizeRear) || "",
            bootSpace: (carVariant && carVariant.suspensionAndSteeringAndBrakes && carVariant.suspensionAndSteeringAndBrakes.bootSpace) || "",
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
            console.log('values ', values);
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
                <CardTitle>Suspension and Steering</CardTitle>
                <p className="card-title-desc">
                    Fill all information below
                </p>
                <Form onSubmit={validation.handleSubmit}>
                    <FormGroup className="mb-4" row>
                        <Label
                            htmlFor="fontSuspension"
                            md="2"
                            className="col-form-label"
                        >
                            Font Suspension <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Col md="10">
                            <Input
                                type="text"
                                className="form-control"
                                name="fontSuspension"
                                id="fontSuspension"
                                placeholder="Enter your Font Suspension"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.fontSuspension}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                        <Label
                            htmlFor="rearSuspension"
                            md="2"
                            className="col-form-label"
                        >
                            Rear Suspension <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Col md="10">
                            <Input
                                type="text"
                                className="form-control"
                                name="rearSuspension"
                                id="rearSuspension"
                                placeholder="Enter your Rear Suspension"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.rearSuspension}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                        <Label
                            htmlFor="steeringType"
                            md="2"
                            className="col-form-label"
                        >
                            Steering Type <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Col md="10">
                            <Input
                                type="text"
                                className="form-control"
                                name="steeringType"
                                id="steeringType"
                                placeholder="Enter your Steering Type"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.steeringType}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                        <Label
                            htmlFor="steeringColumn"
                            md="2"
                            className="col-form-label"
                        >
                            Steering Column <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Col md="10">
                            <Input
                                type="text"
                                className="form-control"
                                name="steeringColumn"
                                id="steeringColumn"
                                placeholder="Enter your Steering Type"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.steeringColumn}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                        <Label
                            htmlFor="turningRadius"
                            md="2"
                            className="col-form-label"
                        >
                            Turning Radius <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Col md="10">
                            <Input
                                type="text"
                                className="form-control"
                                name="turningRadius"
                                id="turningRadius"
                                placeholder="Enter your Turning Radius"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.turningRadius}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                        <Label
                            htmlFor="frontBrakeType"
                            md="2"
                            className="col-form-label"
                        >
                            Front Brake Type <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Col md="10">
                            <Input
                                type="text"
                                className="form-control"
                                name="frontBrakeType"
                                id="frontBrakeType"
                                placeholder="Enter your Front Brake Type"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.frontBrakeType}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                        <Label
                            htmlFor="rearBrakeType"
                            md="2"
                            className="col-form-label"
                        >
                            Rear Brake Type <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Col md="10">
                            <Input
                                type="text"
                                className="form-control"
                                name="rearBrakeType"
                                id="rearBrakeType"
                                placeholder="Enter your Rear Brake Type"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.rearBrakeType}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                        <Label
                            htmlFor="emissionNormCompliance"
                            md="2"
                            className="col-form-label"
                        >
                            Emission Norm Compliance <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Col md="10">
                            <Input
                                type="text"
                                className="form-control"
                                name="emissionNormCompliance"
                                id="emissionNormCompliance"
                                placeholder="Enter your Emission Norm Compliance"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.emissionNormCompliance}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                        <Label
                            htmlFor="tyreSize"
                            md="2"
                            className="col-form-label"
                        >
                            Tyre Size <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Col md="10">
                            <Input
                                type="text"
                                className="form-control"
                                name="tyreSize"
                                id="tyreSize"
                                placeholder="Enter your Tyre Size"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.tyreSize}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                        <Label
                            htmlFor="tyreType"
                            md="2"
                            className="col-form-label"
                        >
                            Tyre Type <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Col md="10">
                            <Input
                                type="text"
                                className="form-control"
                                name="tyreType"
                                id="tyreType"
                                placeholder="Enter your Tyre Type"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.tyreType}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                        <Label
                            htmlFor="wheelSize"
                            md="2"
                            className="col-form-label"
                        >
                            Wheel Size <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Col md="10">
                            <Input
                                type="text"
                                className="form-control"
                                name="wheelSize"
                                id="wheelSize"
                                placeholder="Enter your Wheel Size"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.wheelSize}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                        <Label
                            htmlFor="alloyWheelSize"
                            md="2"
                            className="col-form-label"
                        >
                            Alloy Wheel Size <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Col md="10">
                            <Input
                                type="text"
                                className="form-control"
                                name="alloyWheelSize"
                                id="alloyWheelSize"
                                placeholder="Enter your Alloy Wheel Size"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.alloyWheelSize}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                        <Label
                            htmlFor="alloyWheelSizeFront"
                            md="2"
                            className="col-form-label"
                        >
                            Alloy Wheel Size Front <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Col md="10">
                            <Input
                                type="text"
                                className="form-control"
                                name="alloyWheelSizeFront"
                                id="alloyWheelSizeFront"
                                placeholder="Enter your Alloy Wheel Size Front"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.alloyWheelSizeFront}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                        <Label
                            htmlFor="alloyWheelSizeFront"
                            md="2"
                            className="col-form-label"
                        >
                            Alloy Wheel Size Front <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Col md="10">
                            <Input
                                type="text"
                                className="form-control"
                                name="alloyWheelSizeFront"
                                id="alloyWheelSizeFront"
                                placeholder="Enter your Alloy Wheel Size Front"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.alloyWheelSizeFront}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                        <Label
                            htmlFor="alloyWheelSizeRear"
                            md="2"
                            className="col-form-label"
                        >
                            Alloy Wheel Size Rear <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Col md="10">
                            <Input
                                type="text"
                                className="form-control"
                                name="alloyWheelSizeRear"
                                id="alloyWheelSizeRear"
                                placeholder="Enter your Alloy Wheel Size Rear"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.alloyWheelSizeRear}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                        <Label
                            htmlFor="bootSpace"
                            md="2"
                            className="col-form-label"
                        >
                            Boot Space <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Col md="10">
                            <Input
                                type="text"
                                className="form-control"
                                name="bootSpace"
                                id="bootSpace"
                                placeholder="Enter your Boot Space"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.bootSpace}
                            />
                        </Col>
                    </FormGroup>
                    <Button type="submit" color="primary">Next</Button>
                </Form>
            </div>
        </React.Fragment>
    )
}

export default SuspensionSteeringBrakesVariant
